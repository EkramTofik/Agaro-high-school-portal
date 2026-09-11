const URL_REGEX = /^https?:\/\/[^\s]+$/i;
const TRUTHY = ["true", "1", "yes"];
const FALSY = ["false", "0", "no"];

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function resolveReference(trimmed, cfg, fieldName, req, errors) {
  if (trimmed === "" || trimmed === undefined || trimmed === null) {
    if (cfg.defaultFromUser && req.user[cfg.defaultFromUser]) {
      return req.user[cfg.defaultFromUser];
    }
    if (cfg.required) {
      errors.push(
        `${fieldName} is required and no default is available for this user`,
      );
    }
    return undefined;
  }

  const lookupField = cfg.refLookupField || "name";
  const doc = await cfg.refModel
    .findOne({
      [lookupField]: new RegExp(`^${escapeRegex(String(trimmed))}$`, "i"),
    })
    .select("_id");

  if (!doc) {
    errors.push(
      `${fieldName} "${trimmed}" was not found (matched by ${lookupField})`,
    );
    return undefined;
  }
  return doc._id;
}

/**
 * Validate + clean a single row against a model's field config.
 * Returns { cleaned: {...}, errors: [...] }
 */
async function validateRow(row, fieldsConfig, req) {
  const cleaned = {};
  const errors = [];

  for (const [fieldName, cfg] of Object.entries(fieldsConfig)) {
    const raw = row[fieldName] !== undefined ? row[fieldName] : "";
    const trimmed = typeof raw === "string" ? raw.trim() : raw;
    const isEmpty = trimmed === "" || trimmed === undefined || trimmed === null;

    // Reference fields have their own empty/default/required handling
    // (default comes from req.user, not a static config value).
    if (cfg.kind === "reference") {
      // eslint-disable-next-line no-await-in-loop
      const resolved = await resolveReference(
        trimmed,
        cfg,
        fieldName,
        req,
        errors,
      );
      if (resolved !== undefined) cleaned[fieldName] = resolved;
      continue; // eslint-disable-line no-continue
    }

    if (isEmpty) {
      if (cfg.required) {
        errors.push(`${fieldName} is required`);
      } else if (cfg.default !== undefined) {
        cleaned[fieldName] = cfg.default;
      }
      continue; // eslint-disable-line no-continue
    }

    switch (cfg.kind) {
      case "text": {
        cleaned[fieldName] = trimmed;
        break;
      }

      case "number": {
        const num = Number(trimmed);
        if (Number.isNaN(num) || !Number.isFinite(num)) {
          errors.push(`${fieldName} must be a valid number (got "${trimmed}")`);
        } else if (cfg.min !== undefined && num < cfg.min) {
          errors.push(`${fieldName} must be at least ${cfg.min} (got ${num})`);
        } else {
          cleaned[fieldName] = num;
        }
        break;
      }

      case "boolean": {
        const val = String(trimmed).toLowerCase();
        if (TRUTHY.includes(val)) cleaned[fieldName] = true;
        else if (FALSY.includes(val)) cleaned[fieldName] = false;
        else
          errors.push(
            `${fieldName} must be TRUE/FALSE, yes/no, or 1/0 (got "${trimmed}")`,
          );
        break;
      }

      case "date": {
        const parsed = new Date(trimmed);
        if (Number.isNaN(parsed.getTime())) {
          errors.push(
            `${fieldName} must be a valid date, e.g. 2026-09-20 (got "${trimmed}")`,
          );
        } else {
          cleaned[fieldName] = parsed;
        }
        break;
      }

      case "url": {
        if (!URL_REGEX.test(String(trimmed))) {
          errors.push(
            `${fieldName} must be a valid http(s) URL (got "${trimmed}")`,
          );
        } else {
          cleaned[fieldName] = trimmed;
        }
        break;
      }

      case "enum": {
        if (!cfg.values.includes(trimmed)) {
          errors.push(
            `${fieldName} must be one of: ${cfg.values.join(", ")} (got "${trimmed}")`,
          );
        } else {
          cleaned[fieldName] = trimmed;
        }
        break;
      }

      default:
        errors.push(
          `Unknown validation kind "${cfg.kind}" for ${fieldName} — check bulkImportConfig.js`,
        );
    }
  }

  return { cleaned, errors };
}

module.exports = { validateRow };
