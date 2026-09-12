const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const News = require("../models/newsModel");
const Staff = require("../models/staffModel");
const Event = require("../models/eventModel");
const Department = require("../models/departmentModel");
const Club = require("../models/clubModel");
const School = require("../models/schoolModel");
const HonorRoll = require("../models/honorRollModel");
const AcademicPerformance = require("../models/academicPerformanceModel");
const Alumni = require("../models/alumniModel");
const Team = require("../models/teamModel");
const StudentVoice = require("../models/studentVoiceModel");
const Resource = require("../models/resourceModel");
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const SYNONYM_PATTERNS = [
  [/\bvp\b/g, "vice president"],
  [/\bprez\b/g, "president"],
  [/\bpres\b/g, "president"],
  [/\bgpa\b/g, "grade point average"],
  [/\bhonour roll\b/g, "honor roll"],
  [/\bprincipal\b/g, "president"],
];

function normalizeQuestion(question) {
  let q = question.toLowerCase();
  for (const [pattern, replacement] of SYNONYM_PATTERNS) {
    q = q.replace(pattern, replacement);
  }
  return q;
}

function isCountQuery(question) {
  return /how many|number of|count of/.test(question);
}

function askedRole(question) {
  if (question.includes("vice president")) return "vicePresident";
  if (question.includes("president")) return "president";
  return null;
}

const ORDINAL_WORDS = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5,
  sixth: 6,
  seventh: 7,
  eighth: 8,
  ninth: 9,
  tenth: 10,
};

const NUMBER_WORDS = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
};

// Detects "top 3", "top three" style requests for a list of N items.
function parseTopN(question) {
  const digitMatch = question.match(/top\s+(\d+)/);
  if (digitMatch) return parseInt(digitMatch[1], 10);
  for (const [word, num] of Object.entries(NUMBER_WORDS)) {
    if (question.includes(`top ${word}`)) return num;
  }
  return null;
}

function parseOrdinal(question) {
  if (parseTopN(question)) return null;

  const suffixMatch = question.match(/\b(\d+)(st|nd|rd|th)\b/);
  if (suffixMatch) return parseInt(suffixMatch[1], 10);

  const hashMatch = question.match(/#\s*(\d+)/);
  if (hashMatch) return parseInt(hashMatch[1], 10);

  const rankMatch = question.match(/rank\s+(\d+)/);
  if (rankMatch) return parseInt(rankMatch[1], 10);

  for (const [word, num] of Object.entries(ORDINAL_WORDS)) {
    if (question.includes(word)) return num;
  }

  if (question.includes("top")) return 1;

  return null;
}

function findMatchingEntity(items, question, nameField) {
  return items.find((item) => {
    const name = item[nameField];
    return name && question.includes(String(name).toLowerCase());
  });
}

async function classifyViaPython(req, question) {
  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
  const host = req.headers.host;
  const url = `${protocol}://${host}/api/classify`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error(`Classifier returned status ${response.status}`);
  }

  return response.json();
}

const handlers = {
  async news() {
    const items = await News.find({ status: "published" })
      .select("title summary publishedAt")
      .sort("-publishedAt")
      .limit(3);
    if (items.length === 0) return "There's no published news at the moment.";
    const lines = items.map(
      (n) =>
        `• ${n.title} (${formatDate(n.publishedAt)})${n.summary ? ` — ${n.summary}` : ""}`,
    );
    return `Here's the latest news:\n${lines.join("\n")}`;
  },

  async events(question) {
    if (isCountQuery(question)) {
      const count = await Event.countDocuments();
      return `There ${count === 1 ? "is" : "are"} ${count} event${count === 1 ? "" : "s"} in total.`;
    }
    const items = await Event.find({ eventDate: { $gte: new Date() } })
      .select("title eventDate location")
      .sort("eventDate")
      .limit(3);
    if (items.length === 0)
      return "There are no upcoming events scheduled right now.";
    const lines = items.map(
      (e) =>
        `• ${e.title} — ${formatDate(e.eventDate)}${e.location ? ` at ${e.location}` : ""}`,
    );
    return `Here are the upcoming events:\n${lines.join("\n")}`;
  },

  async staff(question) {
    const role = askedRole(question);

    if (role === "president") {
      const president = await Staff.findOne({ isPresident: true }).select(
        "fullName title",
      );
      if (!president)
        return "I don't have president information available right now.";
      return `President: ${president.fullName}`;
    }

    if (role === "vicePresident") {
      const vp = await Staff.findOne({ isVicePresident: true }).select(
        "fullName title",
      );
      if (!vp)
        return "I don't have vice president information available right now.";
      return `Vice President: ${vp.fullName}`;
    }

    if (isCountQuery(question)) {
      const count = await Staff.countDocuments({ isActive: true });
      return `There ${count === 1 ? "is" : "are"} ${count} staff member${count === 1 ? "" : "s"}.`;
    }

    const items = await Staff.find({ isActive: true })
      .select("fullName title bio isPresident isVicePresident isLeadership")
      .limit(20);
    if (items.length === 0)
      return "I don't have staff information available right now.";

    const matched = findMatchingEntity(items, question, "fullName");
    if (matched) {
      const parts = [`${matched.fullName} — ${matched.title}`];
      if (matched.bio) parts.push(matched.bio);
      return parts.join(". ");
    }

    const president = items.find((s) => s.isPresident);
    const vp = items.find((s) => s.isVicePresident);
    const lines = [];
    if (president) lines.push(`President: ${president.fullName}`);
    if (vp) lines.push(`Vice President: ${vp.fullName}`);
    const others = items
      .filter((s) => !s.isPresident && !s.isVicePresident)
      .slice(0, 5)
      .map((s) => `${s.fullName} — ${s.title}`);
    if (others.length) lines.push(...others);

    return lines.length
      ? lines.join("\n")
      : "I don't have staff information available right now.";
  },

  async departments(question) {
    const items = await Department.find().select("name description headName");
    if (items.length === 0)
      return "I don't have department information available right now.";

    if (isCountQuery(question)) {
      return `There ${items.length === 1 ? "is" : "are"} ${items.length} department${items.length === 1 ? "" : "s"}.`;
    }

    const matched = findMatchingEntity(items, question, "name");
    if (matched) {
      const parts = [matched.name];
      if (matched.description) parts.push(matched.description);
      if (matched.headName) parts.push(`Head: ${matched.headName}`);
      return parts.join(" — ");
    }

    const lines = items.map(
      (d) => `• ${d.name}${d.headName ? ` (Head: ${d.headName})` : ""}`,
    );
    return `Our departments:\n${lines.join("\n")}`;
  },

  async clubs(question) {
    const items = await Club.find().select("name description coordinatorName");
    if (items.length === 0)
      return "I don't have club information available right now.";

    if (isCountQuery(question)) {
      return `There ${items.length === 1 ? "is" : "are"} ${items.length} club${items.length === 1 ? "" : "s"}.`;
    }

    const matched = findMatchingEntity(items, question, "name");
    if (matched) {
      const parts = [matched.name];
      if (matched.description) parts.push(matched.description);
      if (matched.coordinatorName)
        parts.push(`Coordinator: ${matched.coordinatorName}`);
      return parts.join(" — ");
    }

    const lines = items.map(
      (c) => `• ${c.name}${c.description ? ` — ${c.description}` : ""}`,
    );
    return `Available clubs:\n${lines.join("\n")}`;
  },

  async school_info() {
    const school = await School.findOne().select(
      "name motto foundingYear address city region",
    );
    if (!school) return "I don't have school information available right now.";
    const parts = [];
    if (school.name) parts.push(school.name);
    if (school.foundingYear) parts.push(`founded in ${school.foundingYear}`);
    if (school.motto) parts.push(`motto: "${school.motto}"`);
    const location = [school.address, school.city, school.region]
      .filter(Boolean)
      .join(", ");
    if (location) parts.push(`located at ${location}`);
    return parts.join(", ") + ".";
  },

  async contact() {
    const school = await School.findOne().select("phone email address");
    if (!school || (!school.phone && !school.email)) {
      return "Please use the Contact page on our website to reach us.";
    }
    const parts = [];
    if (school.phone) parts.push(`Phone: ${school.phone}`);
    if (school.email) parts.push(`Email: ${school.email}`);
    if (school.address) parts.push(`Address: ${school.address}`);
    return parts.join("\n");
  },

  async honor_roll(question) {
    const topN = parseTopN(question);
    if (topN) {
      const items = await HonorRoll.find()
        .select("rank studentName yearSpan accomplishment")
        .sort("rank")
        .limit(topN);
      if (items.length === 0)
        return "I don't have honor roll information available right now.";
      const lines = items.map(
        (h) =>
          `${h.rank}. ${h.studentName} (${h.yearSpan}) — ${h.accomplishment}`,
      );
      return `Top ${items.length}:\n${lines.join("\n")}`;
    }

    const rank = parseOrdinal(question);
    if (rank) {
      const item = await HonorRoll.findOne({ rank }).select(
        "rank studentName yearSpan accomplishment",
      );
      if (!item)
        return `I don't have a rank ${rank} honor roll entry right now.`;
      return `${item.rank}. ${item.studentName} (${item.yearSpan}) — ${item.accomplishment}`;
    }

    const items = await HonorRoll.find()
      .select("rank studentName yearSpan accomplishment")
      .sort("rank")
      .limit(5);
    if (items.length === 0)
      return "I don't have honor roll information available right now.";
    const lines = items.map(
      (h) =>
        `${h.rank}. ${h.studentName} (${h.yearSpan}) — ${h.accomplishment}`,
    );
    return `Honor roll:\n${lines.join("\n")}`;
  },

  async academic_performance() {
    const latest = await AcademicPerformance.findOne()
      .select("year passRate distinctionsPercent averageGPA topStudentName")
      .sort("-year");
    if (!latest)
      return "I don't have academic performance data available right now.";
    const parts = [`In ${latest.year}, the pass rate was ${latest.passRate}%`];
    if (latest.distinctionsPercent)
      parts.push(`${latest.distinctionsPercent}% achieved distinctions`);
    if (latest.averageGPA) parts.push(`average GPA was ${latest.averageGPA}`);
    if (latest.topStudentName)
      parts.push(`top student was ${latest.topStudentName}`);
    return parts.join(", ") + ".";
  },

  async alumni(question) {
    const items = await Alumni.find().select(
      "fullName graduationYear profession company isFeatured",
    );
    if (items.length === 0)
      return "I don't have alumni information available right now.";

    if (isCountQuery(question)) {
      return `There ${items.length === 1 ? "is" : "are"} ${items.length} alumni record${items.length === 1 ? "" : "s"}.`;
    }

    const matched = findMatchingEntity(items, question, "fullName");
    if (matched) {
      const parts = [
        `${matched.fullName} (Class of ${matched.graduationYear})`,
      ];
      if (matched.profession) parts.push(matched.profession);
      if (matched.company) parts.push(`at ${matched.company}`);
      return parts.join(", ");
    }

    const featured = items.filter((a) => a.isFeatured).slice(0, 5);
    if (featured.length === 0)
      return "I don't have featured alumni information available right now.";
    const lines = featured.map(
      (a) =>
        `• ${a.fullName} (Class of ${a.graduationYear})${a.profession ? ` — ${a.profession}` : ""}${a.company ? ` at ${a.company}` : ""}`,
    );
    return `Featured alumni:\n${lines.join("\n")}`;
  },

  async teams(question) {
    const items = await Team.find().select(
      "name category achievement isFeatured",
    );
    if (items.length === 0)
      return "I don't have sports team information available right now.";

    if (isCountQuery(question)) {
      return `There ${items.length === 1 ? "is" : "are"} ${items.length} team${items.length === 1 ? "" : "s"}.`;
    }

    const matched =
      findMatchingEntity(items, question, "name") ||
      findMatchingEntity(items, question, "category");
    if (matched) {
      return `${matched.name} (${matched.category}) — ${matched.achievement}`;
    }

    const featured = items.filter((t) => t.isFeatured).slice(0, 5);
    if (featured.length === 0)
      return "I don't have sports team information available right now.";
    const lines = featured.map(
      (t) => `• ${t.name} (${t.category}) — ${t.achievement}`,
    );
    return `Our teams:\n${lines.join("\n")}`;
  },

  async student_voice(question) {
    const role = askedRole(question);

    if (role === "president") {
      const item = await StudentVoice.findOne({
        role: { $regex: /^president$/i },
      }).select("fullName role quote");
      if (!item)
        return "I don't have student president information available right now.";
      return `Student President: ${item.fullName}${item.quote ? ` — "${item.quote}"` : ""}`;
    }

    if (role === "vicePresident") {
      const item = await StudentVoice.findOne({
        role: { $regex: /^vice president$/i },
      }).select("fullName role quote");
      if (!item)
        return "I don't have student vice president information available right now.";
      return `Student Vice President: ${item.fullName}${item.quote ? ` — "${item.quote}"` : ""}`;
    }

    const items = await StudentVoice.find({ isFeatured: true })
      .select("fullName role quote")
      .limit(3);
    if (items.length === 0)
      return "I don't have student testimonials available right now.";
    const lines = items.map((s) => `"${s.quote}" — ${s.fullName}, ${s.role}`);
    return lines.join("\n\n");
  },

  async resources(question) {
    const items = await Resource.find().select("title category description");
    if (items.length === 0)
      return "I don't have resources available right now.";

    if (isCountQuery(question)) {
      return `There ${items.length === 1 ? "is" : "are"} ${items.length} resource${items.length === 1 ? "" : "s"} available.`;
    }

    const matched = findMatchingEntity(items, question, "title");
    if (matched) {
      const parts = [matched.title];
      if (matched.description) parts.push(matched.description);
      return parts.join(" — ") + " Check the Resources page to download it.";
    }

    const byCategory = {};
    items.forEach((r) => {
      const cat = r.category || "General";
      byCategory[cat] = (byCategory[cat] || 0) + 1;
    });
    const lines = Object.entries(byCategory).map(
      ([cat, count]) => `• ${cat} (${count})`,
    );
    return `We have resources in these categories:\n${lines.join("\n")}\nVisit the Resource Hub page to browse and download them.`;
  },

  async greeting() {
    return "Hello! Ask me about news, events, staff, departments, clubs, alumni, teams, academic performance, or how to contact the school.";
  },

  async thanks() {
    return "You're welcome! Let me know if you have any other questions.";
  },

  async unknown() {
    return "I'm not sure about that. You can check the News, Events, or Faculty pages, or reach out via the Contact page for anything specific.";
  },
};

exports.askAssistant = catchAsync(async (req, res, next) => {
  const { question } = req.body;

  if (!question || !question.trim()) {
    return next(new AppError("Please provide a question.", 400));
  }
  if (question.length > 500) {
    return next(
      new AppError("Please keep questions under 500 characters.", 400),
    );
  }

  const normalizedQuestion = normalizeQuestion(question.trim());

  let intent = "unknown";
  let confidence = 0;
  try {
    const result = await classifyViaPython(req, normalizedQuestion);
    intent = result.intent;
    confidence = result.confidence;
  } catch (err) {
    console.error("Classifier call failed:", err.message);
  }

  const handler = handlers[intent] || handlers.unknown;
  const answer = await handler(normalizedQuestion);

  res.status(200).json({
    status: "success",
    data: { answer, intent, confidence },
  });
});
