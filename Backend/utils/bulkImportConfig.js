const News = require("../models/newsModel");
const Alumni = require("../models/alumniModel");
const Club = require("../models/clubModel");
const Department = require("../models/departmentModel");
const Event = require("../models/eventModel");
const Galleryitem = require("../models/galleryitemModel");
const HonorRoll = require("../models/honorRollModel");
const Mediafile = require("../models/mediafileModel");
const Resource = require("../models/resourceModel");
const Staff = require("../models/staffModel");
const StudentVoice = require("../models/studentVoiceModel");
const Team = require("../models/teamModel");
const Academicrecord = require("../models/academicrecordModel");
const Academicyear = require("../models/academicyearModel");
const School = require("../models/schoolModel");

function slugify(title) {
  const base = String(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const suffix = Math.random().toString(36).slice(2, 7);
  return `${base}-${suffix}`;
}

const importConfig = {
  News: {
    model: News,
    identifyBy: "title",
    fields: {
      title: { kind: "text", required: true },
      summary: { kind: "text" },
      body: { kind: "text", required: true },
      category: {
        kind: "enum",
        values: ["Academic", "Sports", "Cultural", "Meeting", "Event", "Other"],
      },
      imageUrl: { kind: "url" },
      isUrgent: { kind: "boolean", default: false },
      status: {
        kind: "enum",
        values: ["draft", "published", "archived"],
        default: "draft",
      },
    },
    autoFields: (row, req) => ({
      school: req.school,
      createdBy: req.user._id,
      slug: slugify(row.title),
      publishedAt: row.status === "published" ? new Date() : undefined,
    }),
  },

  Alumni: {
    model: Alumni,
    identifyBy: "fullName",
    fields: {
      fullName: { kind: "text", required: true },
      graduationYear: { kind: "number" },
      profession: {
        kind: "enum",
        values: [
          "Science & Medicine",
          "Public Affairs",
          "Technology & Business",
          "Fine Arts",
        ],
      },
      company: { kind: "text" },
      location: { kind: "text" },
      bio: { kind: "text" },
      imageUrl: { kind: "url" },
      isFeatured: { kind: "boolean", default: false },
    },
    autoFields: (cleaned, req) => ({
      school: req.school,
    }),
  },

  Club: {
    model: Club,
    identifyBy: "name",
    fields: {
      name: { kind: "text", required: true },
      description: { kind: "text" },
      coordinatorName: { kind: "text" },
      imageUrl: { kind: "url" },
      category: { kind: "text" },
      isFeatured: { kind: "boolean", default: false },
    },
    autoFields: (row, req) => ({ school: req.school }),
  },

  Department: {
    model: Department,
    identifyBy: "name",
    fields: {
      name: { kind: "text", required: true },
      description: { kind: "text" },
      headName: { kind: "text" },
    },
    autoFields: (row, req) => ({ school: req.school }),
  },

  Event: {
    model: Event,
    identifyBy: "title",
    fields: {
      title: { kind: "text", required: true },
      description: { kind: "text" },
      location: { kind: "text" },
      eventDate: { kind: "date" },
      imageUrl: { kind: "url" },
      isFeatured: { kind: "boolean", default: false },
    },
    autoFields: (row, req) => ({ school: req.school }),
  },

  Galleryitem: {
    model: Galleryitem,
    identifyBy: "title",
    fields: {
      title: { kind: "text", required: true },
      category: {
        kind: "enum",
        required: true,
        values: ["historic", "campus", "sports", "events"],
      },
      imageUrl: { kind: "url", required: true },
      caption: { kind: "text" },
    },
    autoFields: (row, req) => ({ school: req.school }),
  },

  HonorRoll: {
    model: HonorRoll,
    identifyBy: "studentName",
    fields: {
      rank: { kind: "number", required: true, min: 1 },
      studentName: { kind: "text", required: true },
      yearSpan: { kind: "text", required: true },
      accomplishment: { kind: "text", required: true },
    },
    autoFields: (row, req) => ({ school: req.school }),
  },

  Mediafile: {
    model: Mediafile,
    identifyBy: "fileName",
    fields: {
      fileName: { kind: "text", required: true },
      fileUrl: { kind: "url", required: true },
      mimeType: { kind: "text" },
      sizeBytes: { kind: "number" },
    },

    autoFields: (row, req) => ({
      school: req.school,
      uploadedBy: req.user._id,
    }),
  },

  Resource: {
    model: Resource,
    identifyBy: "title",
    fields: {
      title: { kind: "text", required: true },
      category: { kind: "text" },
      description: { kind: "text" },
      fileUrl: { kind: "url", required: true },
    },
    autoFields: (row, req) => ({
      school: req.school,
      uploadedBy: req.user._id,
    }),
  },

  Staff: {
    model: Staff,
    identifyBy: "fullName",
    fields: {
      fullName: { kind: "text", required: true },
      title: { kind: "text", required: true },
      qualifications: { kind: "text" },
      leadershipCredentials: { kind: "text" },
      yearsAtSchool: { kind: "number", min: 0 },
      publishedPapers: { kind: "number", min: 0 },
      bio: { kind: "text" },
      imageUrl: { kind: "url" },
      isActive: { kind: "boolean", default: true },
      isLeadership: { kind: "boolean", default: false },
      isPresident: { kind: "boolean", default: false },
      isVicePresident: { kind: "boolean", default: false },
      isDistinguished: { kind: "boolean", default: false },
      isAdministrative: { kind: "boolean", default: false },
      office: { kind: "text" },
      sortOrder: { kind: "number", default: 0 },
      department: {
        kind: "reference",
        refModel: Department,
        refLookupField: "name",
      },
    },
    autoFields: (row, req) => ({ school: req.school }),
  },

  StudentVoice: {
    model: StudentVoice,
    identifyBy: "fullName",
    fields: {
      fullName: { kind: "text", required: true },
      role: { kind: "text", required: true },
      imageUrl: { kind: "url", required: true },
      quote: { kind: "text" },
      isFeatured: { kind: "boolean", default: true },
    },
    autoFields: (row, req) => ({ school: req.school }),
  },

  Team: {
    model: Team,
    identifyBy: "name",
    fields: {
      name: { kind: "text", required: true },
      category: {
        kind: "enum",
        required: true,
        values: ["Football", "Athletics", "Volleyball"],
      },
      achievement: { kind: "text", required: true },
      imageUrl: { kind: "url" },
      isFeatured: { kind: "boolean", default: true },
    },
    autoFields: (row, req) => ({ school: req.user.school }),
  },

  Academicyear: {
    model: Academicyear,
    identifyBy: "name",
    fields: {
      name: { kind: "text", required: true },
      startYear: { kind: "number", required: true },
      endYear: { kind: "number", required: true },
      isCurrent: { kind: "boolean", default: false },
    },
    autoFields: (row, req) => ({ school: req.school }),
  },

  Academicrecord: {
    model: Academicrecord,
    identifyBy: "title",
    fields: {
      title: { kind: "text", required: true },
      recordType: {
        kind: "enum",
        required: true,
        values: ["exam", "result", "study_guide", "archive", "report"],
      },
      fileUrl: { kind: "url", required: true },
      fileType: { kind: "text" },
      fileSize: { kind: "number" },
      visibility: {
        kind: "enum",
        values: ["public", "restricted"],
        default: "public",
      },
      department: {
        kind: "reference",
        refModel: Department,
        refLookupField: "name",
      },
      academicYear: {
        kind: "reference",
        refModel: Academicyear,
        refLookupField: "name",
      },
    },
    autoFields: (row, req) => ({
      school: req.school,
      uploadedBy: req.user._id,
      publishedAt: new Date(),
    }),
  },
};

module.exports = importConfig;
