const multer = require("multer");
const XLSX = require("xlsx");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const importConfig = require("../utils/bulkImportConfig");
const { validateRow } = require("../utils/bulkImportValidator");

// ---- Upload middleware -----------------------------------------------------
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const okType = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ].includes(file.mimetype);
    const okExt = /\.(csv|xlsx|xls)$/i.test(file.originalname);
    if (okType || okExt) return cb(null, true);
    cb(new AppError("Please upload a CSV or Excel (.xlsx) file", 400));
  },
});

exports.uploadBulkFile = upload.single("file");

// ---- Main handler -----------------------------------------------------------
exports.bulkImportAll = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("Please upload a CSV or Excel file", 400));
  }

  let workbook;
  try {
    workbook = XLSX.read(req.file.buffer, { type: "buffer" });
  } catch (err) {
    return next(
      new AppError(
        "Could not read the uploaded file. Is it a valid CSV/Excel file?",
        400,
      ),
    );
  }

  const results = {};
  const skippedSheets = [];

  for (const sheetName of workbook.SheetNames) {
    const config = importConfig[sheetName];

    if (!config) {
      skippedSheets.push(sheetName);
      continue; // eslint-disable-line no-continue
    }

    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const sheetResult = {
      totalRows: rows.length,
      validCount: 0,
      errorCount: 0,
      created: [],
      errors: [],
    };

    if (rows.length === 0) {
      results[sheetName] = sheetResult;
      continue; // eslint-disable-line no-continue
    }

    // --- Pass 1: validate every row, write nothing yet ---
    const validatedRows = [];
    for (let i = 0; i < rows.length; i += 1) {
      const rowNum = i + 2; // header row + 1-indexing
      // eslint-disable-next-line no-await-in-loop
      const { cleaned, errors } = await validateRow(
        rows[i],
        config.fields,
        req,
      );
      const identifier =
        cleaned[config.identifyBy] || rows[i][config.identifyBy] || "(missing)";

      if (errors.length > 0) {
        sheetResult.errorCount += 1;
        sheetResult.errors.push({ row: rowNum, identifier, messages: errors });
      } else {
        validatedRows.push({ rowNum, identifier, cleaned });
      }
    }

    // --- Pass 2: only now write the rows that passed validation ---
    for (const { rowNum, identifier, cleaned } of validatedRows) {
      try {
        const autoFields = config.autoFields
          ? config.autoFields(cleaned, req)
          : {};
        // eslint-disable-next-line no-await-in-loop
        const doc = await config.model.create({ ...cleaned, ...autoFields });
        sheetResult.validCount += 1;
        sheetResult.created.push({ row: rowNum, id: doc._id, identifier });
      } catch (err) {
        // Schema-level validation Mongoose catches that our config didn't
        // (e.g. a unique-index collision) lands here instead of crashing
        // the whole import.
        sheetResult.errorCount += 1;
        sheetResult.errors.push({
          row: rowNum,
          identifier,
          messages: [err.message],
        });
      }
    }

    results[sheetName] = sheetResult;
  }

  const totalErrors = Object.values(results).reduce(
    (sum, r) => sum + r.errorCount,
    0,
  );

  res.status(207).json({
    status: totalErrors === 0 ? "success" : "partial",
    skippedSheets,
    results,
  });
});
