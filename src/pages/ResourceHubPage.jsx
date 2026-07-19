import { useState } from "react";
import {
  ChevronRight,
  BookOpen,
  Monitor,
  Calendar,
  Users,
  ExternalLink,
  X,
  Download,
} from "lucide-react";

/* ── Exam cards ──────────────────────────────────────────── */
const examCards = [
  {
    tag: "MATH",
    tagBg: "#e8a020",
    tagColor: "#fff",
    title: "Social/Humanities Stream",
    desc: "Comprehensive collection including Geography, Economics, and Family Sciences with reading guidance.",
  },
  {
    tag: "SCIENCE",
    tagBg: "#2d6a4a",
    tagColor: "#fff",
    title: "Natural Sciences Core",
    desc: "Physics, Biology, and Chemistry questions from the 2023 academic curriculum for senior year.",
  },
  {
    tag: "ADVANCED",
    tagBg: "#1a1a1a",
    tagColor: "#FFDEA4",
    title: "Mathematics (Advanced)",
    desc: "Algebra and Statistics problems for advanced students professionally and more choices.",
  },
];

/* ── Exam question content for downloads ──────────────────── */
const examQuestionBank = {
  "2023 National Geography Final": `
==========================================================
  AGARO HIGH SCHOOL – 2023 NATIONAL GEOGRAPHY FINAL EXAM
  Social/Humanities Stream | Duration: 3 Hours | 100 Marks
==========================================================

SECTION A: MULTIPLE CHOICE (20 Marks)

1. Which of the following is NOT a type of weathering?
   A) Chemical   B) Mechanical   C) Biological   D) Gravitational

2. The Rift Valley in Ethiopia was formed by:
   A) Folding   B) Faulting   C) Volcanic activity   D) Erosion

3. Which Ethiopian region receives the highest annual rainfall?
   A) Somali   B) Afar   C) Oromia (Southwest)   D) Tigray

4. The primary cause of desertification in the Sahel is:
   A) Earthquakes   B) Overgrazing and deforestation
   C) Flooding   D) Urbanization

5. Latitude is measured in degrees from the:
   A) Prime Meridian   B) Equator
   C) Tropic of Cancer   D) International Date Line

SECTION B: SHORT ANSWER (40 Marks)

6. Explain the three major climate zones of Ethiopia and give
   one example region for each. (10 marks)

7. Describe the water cycle and its importance to agriculture
   in the Ethiopian highlands. (10 marks)

8. What are the causes and effects of soil erosion? Suggest
   three conservation methods. (10 marks)

9. Compare and contrast rural and urban settlement patterns
   in Ethiopia. (10 marks)

SECTION C: ESSAY (40 Marks)

10. "Sustainable development is essential for Ethiopia's future."
    Discuss this statement with reference to natural resource
    management, population growth, and environmental
    conservation. (20 marks)

11. Analyze the impact of climate change on Ethiopian agriculture
    and suggest adaptation strategies. (20 marks)

==========================================================
                    END OF EXAMINATION
==========================================================
`,
  "Economics Unit 4 Assessment": `
==========================================================
  AGARO HIGH SCHOOL – ECONOMICS UNIT 4 ASSESSMENT
  Social/Humanities Stream | Duration: 2 Hours | 60 Marks
==========================================================

SECTION A: TRUE OR FALSE (10 Marks)

1. GDP measures the total value of goods and services
   produced within a country in one year.            [T / F]

2. Inflation always leads to economic growth.        [T / F]

3. A trade deficit occurs when imports exceed exports.[T / F]

4. The central bank controls monetary policy.        [T / F]

5. Unemployment rate includes people not seeking work.[T / F]

SECTION B: SHORT ANSWER (25 Marks)

6. Define the law of supply and demand.
   Provide a real-world example. (5 marks)

7. Explain the difference between fiscal policy and
   monetary policy. (5 marks)

8. What is inflation? Discuss two causes and two effects
   of inflation on the Ethiopian economy. (10 marks)

9. Describe the role of the National Bank of Ethiopia
   in regulating the economy. (5 marks)

SECTION C: ESSAY (25 Marks)

10. Discuss the challenges and opportunities of Ethiopia's
    participation in international trade. Include references
    to the country's major exports and trading partners.
    (25 marks)

==========================================================
                    END OF EXAMINATION
==========================================================
`,
  "History of Ethiopia - Midterm": `
==========================================================
  AGARO HIGH SCHOOL – HISTORY OF ETHIOPIA MIDTERM EXAM
  Social/Humanities Stream | Duration: 2.5 Hours | 80 Marks
==========================================================

SECTION A: IDENTIFICATION (20 Marks)

1. Name the Ethiopian emperor who defeated the Italians
   at the Battle of Adwa in 1896. (2 marks)

2. What was the Zagwe Dynasty known for? (3 marks)

3. In what year was the Ethiopian Constitution first
   adopted? (2 marks)

4. Identify two significant achievements of Emperor
   Haile Selassie I. (4 marks)

5. What was the Derg regime? When did it rule? (4 marks)

6. Name three ancient trade routes that passed through
   Ethiopia. (5 marks)

SECTION B: SHORT ANSWER (30 Marks)

7. Describe the significance of the Aksumite Empire
   in African history. (10 marks)

8. Explain the causes and consequences of the 1974
   Ethiopian Revolution. (10 marks)

9. Discuss the role of Ethiopia in the formation of
   the Organization of African Unity (OAU). (10 marks)

SECTION C: ESSAY (30 Marks)

10. "Ethiopia's history is a story of resilience and
    independence." Discuss this statement with reference
    to at least three historical periods. (30 marks)

==========================================================
                    END OF EXAMINATION
==========================================================
`,
  "Civics and Ethical Education Practice": `
==========================================================
  AGARO HIGH SCHOOL – CIVICS AND ETHICAL EDUCATION
  Practice Assessment | Duration: 1.5 Hours | 50 Marks
==========================================================

SECTION A: MULTIPLE CHOICE (15 Marks)

1. Which document guarantees fundamental rights in Ethiopia?
   A) The Penal Code   B) The Constitution
   C) The Civil Code   D) The Commercial Code

2. Democracy means:
   A) Rule by the military   B) Rule by the people
   C) Rule by the wealthy   D) Rule by one person

3. Which is NOT a civic responsibility?
   A) Paying taxes   B) Voting   C) Tax evasion
   D) Obeying laws

SECTION B: SHORT ANSWER (20 Marks)

4. What are human rights? List five fundamental
   human rights. (10 marks)

5. Explain the separation of powers in the Ethiopian
   government system. (10 marks)

SECTION C: ESSAY (15 Marks)

6. Discuss the importance of ethical behavior in
   building a strong and peaceful society. (15 marks)

==========================================================
                    END OF EXAMINATION
==========================================================
`,
  "2023 Physics Matriculation Exam": `
==========================================================
  AGARO HIGH SCHOOL – 2023 PHYSICS MATRICULATION EXAM
  Natural Sciences Core | Duration: 3 Hours | 100 Marks
==========================================================

SECTION A: MULTIPLE CHOICE (25 Marks)

1. The SI unit of force is:
   A) Joule   B) Watt   C) Newton   D) Pascal

2. An object in free fall near Earth accelerates at:
   A) 8.9 m/s^2   B) 9.8 m/s^2   C) 10.8 m/s^2   D) 11.2 m/s^2

3. Ohm's Law states that:
   A) V = IR   B) P = IV   C) F = ma   D) E = mc^2

4. The speed of light in a vacuum is approximately:
   A) 3 x 10^6 m/s   B) 3 x 10^8 m/s
   C) 3 x 10^10 m/s  D) 3 x 10^12 m/s

5. Which type of lens is used to correct myopia?
   A) Convex   B) Concave   C) Plano-convex   D) Bifocal

SECTION B: PROBLEMS (50 Marks)

6. A car starts from rest and accelerates uniformly at
   2 m/s^2 for 10 seconds. Calculate:
   a) The final velocity (5 marks)
   b) The distance traveled (5 marks)

7. A 5 kg block is pushed across a surface with a force
   of 20 N. If the coefficient of friction is 0.3,
   calculate the acceleration. (10 marks)

8. A circuit has a 12V battery connected to three
   resistors of 2, 3, and 6 ohms in parallel.
   Calculate:
   a) Total resistance (5 marks)
   b) Total current (5 marks)
   c) Power dissipated (5 marks)

9. A ball is thrown vertically upward at 25 m/s.
   Calculate the maximum height reached. (5 marks)

10. Explain the principle of conservation of energy
    with a practical example. (10 marks)

SECTION C: ESSAY (25 Marks)

11. Discuss Newton's three laws of motion and provide
    a real-world application for each law. (25 marks)

==========================================================
                    END OF EXAMINATION
==========================================================
`,
  "Biology Lab Practical Guidelines": `
==========================================================
  AGARO HIGH SCHOOL – BIOLOGY LAB PRACTICAL GUIDELINES
  Natural Sciences Core | Duration: 2 Hours | 60 Marks
==========================================================

PRACTICAL 1: MICROSCOPE USE (20 Marks)

Objective: Observe and identify plant and animal cells.

Materials: Compound microscope, glass slides, cover slips,
iodine solution, methylene blue, onion epidermis, cheek cells.

Procedure:
1. Prepare a wet mount of onion epidermis.
2. Add a drop of iodine solution.
3. Observe under low (10x) and high (40x) power.
4. Draw and label the cell structures observed.
5. Repeat with cheek cells using methylene blue.

Questions:
a) What structures are visible in the plant cell but
   not in the animal cell? (5 marks)
b) What is the function of the cell wall? (5 marks)
c) Draw a labeled diagram of each cell type. (10 marks)

PRACTICAL 2: PHOTOSYNTHESIS TEST (20 Marks)

Objective: Test a leaf for the presence of starch.

Procedure:
1. Boil a leaf in water for 2 minutes.
2. Place in ethanol to remove chlorophyll.
3. Rinse in warm water.
4. Add iodine solution.
5. Record color change.

Questions:
a) What color indicates the presence of starch? (2 marks)
b) Why is ethanol used? (3 marks)
c) Write the balanced equation for photosynthesis. (5 marks)
d) What is the role of light in this process? (10 marks)

PRACTICAL 3: DISSECTION (20 Marks)

Objective: Identify the major organs of a preserved frog.

Tasks:
a) Identify and label the heart, lungs, liver, stomach,
   and intestines. (10 marks)
b) Describe the function of each organ. (10 marks)

==========================================================
                    END OF EXAMINATION
==========================================================
`,
  "Chemistry Organic Reactions Test": `
==========================================================
  AGARO HIGH SCHOOL – CHEMISTRY ORGANIC REACTIONS TEST
  Natural Sciences Core | Duration: 2 Hours | 70 Marks
==========================================================

SECTION A: MULTIPLE CHOICE (15 Marks)

1. The general formula for alkanes is:
   A) CnH2n   B) CnH2n+2   C) CnH2n-2   D) CnHn

2. Which functional group defines alcohols?
   A) -COOH   B) -OH   C) -CHO   D) -NH2

3. Ethanol can be produced by:
   A) Fermentation   B) Distillation
   C) Combustion   D) Electrolysis

SECTION B: STRUCTURAL QUESTIONS (30 Marks)

4. Draw the structural formula for:
   a) Methane (2 marks)
   b) Ethanol (3 marks)
   c) Propanoic acid (5 marks)

5. Name the following organic compounds:
   a) CH3-CH2-CH3 (2 marks)
   b) CH3-OH (2 marks)
   c) CH3-COOH (2 marks)

6. Explain the difference between addition and
   substitution reactions. Give one example
   of each. (14 marks)

SECTION C: ESSAY (25 Marks)

7. Discuss the importance of organic chemistry in
   everyday life. Include at least three examples
   of organic compounds and their uses. (25 marks)

==========================================================
                    END OF EXAMINATION
==========================================================
`,
  "Advanced Calculus Final Paper": `
==========================================================
  AGARO HIGH SCHOOL – ADVANCED CALCULUS FINAL PAPER
  Mathematics (Advanced) | Duration: 3 Hours | 100 Marks
==========================================================

SECTION A: DIFFERENTIATION (30 Marks)

1. Differentiate the following:
   a) f(x) = 3x^4 - 2x^3 + 7x - 5 (5 marks)
   b) f(x) = sin(3x) * cos(x) (5 marks)
   c) f(x) = ln(x^2 + 1) (5 marks)
   d) f(x) = e^(2x) / (x + 1) (5 marks)

2. Find the equation of the tangent line to the curve
   y = x^3 - 4x + 2 at the point (1, -1). (10 marks)

SECTION B: INTEGRATION (30 Marks)

3. Evaluate the following integrals:
   a) integral of (4x^3 + 2x) dx (5 marks)
   b) integral of sin(2x) dx (5 marks)
   c) integral from 0 to pi of cos(x) dx (5 marks)

4. Find the area enclosed between the curves
   y = x^2 and y = 2x + 3. (15 marks)

SECTION C: APPLICATIONS (40 Marks)

5. A particle moves along a line with velocity
   v(t) = 3t^2 - 12t + 9 m/s.
   a) Find the acceleration at t = 2. (5 marks)
   b) Find the displacement from t = 0 to t = 4. (10 marks)
   c) Find when the particle is at rest. (5 marks)

6. A rectangular box with a square base and no top
   has a volume of 32 cm^3. Find the dimensions that
   minimize the surface area. (20 marks)

==========================================================
                    END OF EXAMINATION
==========================================================
`,
  "Linear Algebra Problem Set": `
==========================================================
  AGARO HIGH SCHOOL – LINEAR ALGEBRA PROBLEM SET
  Mathematics (Advanced) | Duration: 2 Hours | 60 Marks
==========================================================

SECTION A: MATRICES (25 Marks)

1. Given A = |1 2|  and B = |5 6|
             |3 4|         |7 8|

   Calculate:
   a) A + B (3 marks)
   b) A x B (5 marks)
   c) Determinant of A (3 marks)
   d) Inverse of A (6 marks)

2. Solve the system of equations using matrices:
   2x + 3y = 7
   4x - y = 1
   (8 marks)

SECTION B: VECTORS (20 Marks)

3. Given vectors u = (3, 4, -1) and v = (2, -1, 5):
   a) Find u + v (3 marks)
   b) Find u . v (dot product) (4 marks)
   c) Find u x v (cross product) (6 marks)
   d) Find the angle between u and v (7 marks)

SECTION C: APPLICATIONS (15 Marks)

4. A transformation matrix T = |cos(30) -sin(30)|
                                |sin(30)  cos(30)|
   rotates a vector. Apply T to the vector (1, 0)
   and verify geometrically. (15 marks)

==========================================================
                    END OF EXAMINATION
==========================================================
`,
  "Statistics and Probability Mock": `
==========================================================
  AGARO HIGH SCHOOL – STATISTICS AND PROBABILITY MOCK
  Mathematics (Advanced) | Duration: 2.5 Hours | 80 Marks
==========================================================

SECTION A: DESCRIPTIVE STATISTICS (25 Marks)

1. The following data represents exam scores of 10 students:
   78, 85, 92, 67, 73, 88, 95, 71, 82, 90

   Calculate:
   a) Mean (3 marks)
   b) Median (3 marks)
   c) Mode (2 marks)
   d) Standard deviation (7 marks)
   e) Interquartile range (5 marks)
   f) Draw a box-and-whisker plot (5 marks)

SECTION B: PROBABILITY (30 Marks)

2. A bag contains 5 red, 3 blue, and 2 green balls.
   a) P(red) (3 marks)
   b) P(not green) (3 marks)
   c) P(red or blue) (4 marks)

3. Two dice are rolled simultaneously:
   a) Find P(sum = 7) (5 marks)
   b) Find P(sum > 10) (5 marks)
   c) Are these events mutually exclusive? (5 marks)

4. In a class, 60% study Math and 40% study Science.
   20% study both. Find the probability that a
   randomly selected student studies at least one. (5 marks)

SECTION C: DISTRIBUTIONS (25 Marks)

5. A factory produces bolts. 5% are defective.
   In a sample of 20 bolts:
   a) Find P(exactly 2 defective) (10 marks)
   b) Find P(at most 1 defective) (10 marks)
   c) What distribution did you use and why? (5 marks)

==========================================================
                    END OF EXAMINATION
==========================================================
`,
  "Trigonometry Weekly Quiz": `
==========================================================
  AGARO HIGH SCHOOL – TRIGONOMETRY WEEKLY QUIZ
  Mathematics (Advanced) | Duration: 45 Minutes | 30 Marks
==========================================================

1. Convert 120 degrees to radians. (3 marks)

2. Evaluate without a calculator:
   a) sin(45) (2 marks)
   b) cos(60) (2 marks)
   c) tan(30) (2 marks)

3. If sin(A) = 3/5 and A is in the first quadrant,
   find cos(A) and tan(A). (6 marks)

4. Prove the identity:
   sin^2(x) + cos^2(x) = 1 (5 marks)

5. Solve for x in the interval [0, 2*pi]:
   2sin(x) - 1 = 0 (5 marks)

6. A ladder 10 meters long leans against a wall making
   a 60 degree angle with the ground. How high up the
   wall does the ladder reach? (5 marks)

==========================================================
                    END OF QUIZ
==========================================================
`,
};

const examContents = {
  "Social/Humanities Stream": [
    {
      id: 1,
      title: "2023 National Geography Final",
      type: "TXT",
      size: "2.4 KB",
      date: "May 14, 2023",
    },
    {
      id: 2,
      title: "Economics Unit 4 Assessment",
      type: "TXT",
      size: "1.1 KB",
      date: "Mar 02, 2023",
    },
    {
      id: 3,
      title: "History of Ethiopia - Midterm",
      type: "TXT",
      size: "1.8 KB",
      date: "Nov 18, 2022",
    },
    {
      id: 4,
      title: "Civics and Ethical Education Practice",
      type: "TXT",
      size: "900 B",
      date: "Jan 10, 2023",
    },
  ],
  "Natural Sciences Core": [
    {
      id: 1,
      title: "2023 Physics Matriculation Exam",
      type: "TXT",
      size: "2.1 KB",
      date: "Jun 05, 2023",
    },
    {
      id: 2,
      title: "Biology Lab Practical Guidelines",
      type: "TXT",
      size: "1.9 KB",
      date: "Apr 22, 2023",
    },
    {
      id: 3,
      title: "Chemistry Organic Reactions Test",
      type: "TXT",
      size: "1.4 KB",
      date: "Feb 14, 2023",
    },
  ],
  "Mathematics (Advanced)": [
    {
      id: 1,
      title: "Advanced Calculus Final Paper",
      type: "TXT",
      size: "1.8 KB",
      date: "May 20, 2023",
    },
    {
      id: 2,
      title: "Linear Algebra Problem Set",
      type: "TXT",
      size: "1.3 KB",
      date: "Mar 15, 2023",
    },
    {
      id: 3,
      title: "Statistics and Probability Mock",
      type: "TXT",
      size: "1.9 KB",
      date: "Dec 05, 2022",
    },
    {
      id: 4,
      title: "Trigonometry Weekly Quiz",
      type: "TXT",
      size: "700 B",
      date: "Oct 12, 2022",
    },
  ],
};

/* ── Knowledge vault stats ────────────────────────────────── */
const vaultStats = [
  { icon: Users, label: "52 New Items Uploaded" },
  { icon: BookOpen, label: "34 Verified Modules" },
  { icon: BookOpen, label: "Reading Lists Available" },
  { icon: Monitor, label: "4 Map Case Studies" },
];

/* ── Digital gateway links ────────────────────────────────── */
const gatewayLinks = [
  {
    title: "Afisa Academy Archive",
    sub: "Global updates for Mathematics and Science topics",
    count: 12,
    href: "https://www.africaacademy.org",
  },
  {
    title: "YouTube EDU – Resources",
    sub: "Curated external in combination for strong academic mastery",
    count: 8,
    href: "https://www.youtube.com/education",
  },
  {
    title: "MIT OpenCourseWare",
    sub: "High-resolution and comprehensive resources for grade 12",
    count: 24,
    href: "https://ocw.mit.edu",
  },
];

/* ── Page ─────────────────────────────────────────────────── */
export default function ResourceHubPage() {
  const [booked, setBooked] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  // New states for ICT Lab functionality
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const handleDownload = (doc) => {
    const content =
      examQuestionBank[doc.title] || `No content available for: ${doc.title}`;
    const blob = new Blob([content.trim()], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen bg-[#FAF8F5] text-[#1a1a1a]">
      {/* ── Main Content ──────────────────────────────────── */}
      <main className="flex-1 overflow-x-hidden">
        {/* ── Hero ──────────────────────────────────────── */}
        <section className="px-10 py-10 border-b border-[#e5e1d8]">
          <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-[0.3em] mb-3">
            The Living Branch
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 max-w-2xl leading-snug">
            Student &amp; Teacher Resource Hub
          </h1>
          <p className="text-sm text-gray-500 max-w-lg leading-relaxed">
            Preserving the past, cultivating the future. Your gateway to the
            intellectual heritage of Agaro High.
          </p>
        </section>

        {/* ── Exam Repository ───────────────────────────── */}
        <section className="px-10 py-10 border-b border-[#e5e1d8]">
          <div className="flex items-start justify-between mb-1">
            <h2 className="font-serif text-xl font-bold text-[#1a1a1a]">
              The Exam Repository
            </h2>
            <span className="text-[9px] text-gray-400 mt-1">↗</span>
          </div>
          <p className="text-[11px] text-gray-400 mb-7">
            All Final National Examinations &amp; Preparation Assessments
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {examCards.map((card) => (
              <div
                key={card.title}
                className="bg-white border border-[#e5e1d8] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <span
                  className="self-start text-[9px] font-bold px-2 py-0.5 rounded"
                  style={{ background: card.tagBg, color: card.tagColor }}
                >
                  {card.tag}
                </span>
                <h3 className="font-serif text-sm font-bold text-[#1a1a1a] leading-snug">
                  {card.title}
                </h3>
                <p className="text-[11px] text-gray-500 leading-relaxed flex-1">
                  {card.desc}
                </p>
                <button
                  onClick={() => setSelectedExam(card.title)}
                  className="self-start text-[10px] font-bold text-[#033327] uppercase tracking-wider flex items-center gap-1 hover:text-[#b5985b] transition-colors mt-1"
                >
                  View Exams <ChevronRight size={10} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── Knowledge Vault ───────────────────────────── */}
        <section className="px-10 py-10 border-b border-[#e5e1d8] bg-white">
          <h2 className="font-serif text-xl font-bold text-[#1a1a1a] mb-1">
            Knowledge Vault
          </h2>
          <p className="text-[11px] text-gray-400 mb-8">
            Subject-Specific Study Materials &amp; Faculty Contributions
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {vaultStats.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 border border-[#e5e1d8] rounded-xl p-5 hover:border-[#033327]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#e5e1d8] flex items-center justify-center">
                  <Icon size={16} className="text-[#033327]" />
                </div>
                <p className="text-[11px] font-semibold text-[#1a1a1a] text-center leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Digital Gateway + Stone Hall Library ──────── */}
        <section className="px-10 py-10 border-b border-[#e5e1d8] grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Digital Gateway */}
          <div>
            <h2 className="font-serif text-lg font-bold text-[#1a1a1a] mb-1 flex items-center gap-2">
              <span className="text-[#b5985b]">✦</span> Digital Gateway
            </h2>
            <p className="text-[10px] text-gray-400 mb-6">
              Curated External Learning Resources
            </p>
            <div className="space-y-4">
              {gatewayLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 border border-[#e5e1d8] rounded-xl bg-white hover:shadow-sm hover:border-[#033327]/30 transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#e5e1d8] flex items-center justify-center shrink-0 group-hover:bg-[#033327] group-hover:border-[#033327] transition-colors">
                    <ExternalLink
                      size={13}
                      className="text-[#b5985b] group-hover:text-[#FFDEA4] transition-colors"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-[#1a1a1a] leading-snug group-hover:text-[#033327] transition-colors">
                      {link.title}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                      {link.sub}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-[#b5985b] shrink-0 bg-[#FFDEA4]/30 px-1.5 py-0.5 rounded">
                    {link.count}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Stone Hall Library */}
          <div>
            <h2 className="font-serif text-lg font-bold text-[#1a1a1a] mb-1 flex items-center gap-2">
              <span className="text-[#033327]">⊕</span> The Stone Hall Library
            </h2>
            <p className="text-[10px] text-gray-400 mb-5">
              A Legacy of Knowledge &amp; Learning
            </p>
            {/* Library image */}
            <div className="rounded-xl overflow-hidden border border-[#e5e1d8] mb-4 aspect-video">
              <img
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800"
                alt="Stone Hall Library"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            {/* Article preview */}
            <div className="bg-white border border-[#e5e1d8] rounded-xl p-4">
              <p className="text-[9px] font-bold text-[#b5985b] uppercase tracking-wider mb-1">
                Featured Read
              </p>
              <p className="font-serif text-sm font-bold text-[#1a1a1a] mb-1">
                The Electricity of Blueprint
              </p>
              <p className="text-[10px] text-gray-500 leading-relaxed mb-3">
                First-year reads. Curated for those who love to explore the
                beautiful and bibliographic stones.
              </p>
              <div className="flex gap-6 border-t border-[#e5e1d8] pt-3">
                {[
                  ["Today's Visits", "142"],
                  ["Regular Patrons", "89"],
                  ["Library Staff", "12"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[8px] text-gray-400 uppercase tracking-wide">
                      {k}
                    </p>
                    <p className="text-sm font-bold text-[#033327]">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ICT Lab Reservation ───────────────────────── */}
        <section className="px-10 py-12 bg-[#033327]">
          <div className="max-w-4xl flex flex-col md:flex-row gap-10">
            {/* Left */}
            <div className="flex-1">
              <p className="text-[9px] font-bold text-[#FFDEA4]/60 uppercase tracking-[0.25em] mb-3">
                Digital Division
              </p>
              <h2 className="font-serif text-2xl font-bold text-white mb-4 leading-snug">
                ICT Lab Reservation
              </h2>
              <p className="text-sm text-white/60 leading-relaxed mb-8 max-w-sm">
                Manage Agaro's learning sessions for your classes. Check the day
                availability and leisure time slots for the upcoming academic
                week.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  onClick={() => {
                    if (!booked) setIsBookingModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-[11px] uppercase tracking-wider text-[#033327] transition-all hover:opacity-90 active:scale-95"
                  style={{ background: "#b5985b" }}
                >
                  <Calendar size={13} />
                  {booked ? "Session Booked ✓" : "Book a Session"}
                </button>
                <button
                  onClick={() => setIsScheduleModalOpen(true)}
                  className="text-[10px] font-bold text-white/50 uppercase tracking-wider border border-white/20 px-4 py-2.5 rounded-lg hover:border-white/40 hover:text-white transition-colors"
                >
                  View Full Schedule
                </button>
              </div>
            </div>

            {/* Right – Today's document list */}
            <div className="shrink-0 w-full md:w-56">
              <p className="text-[9px] font-bold text-[#FFDEA4]/70 uppercase tracking-[0.2em] mb-4">
                Today's Document
              </p>
              <div className="space-y-3">
                {[
                  { label: "Lab PC Installed", done: true },
                  { label: "Lab PC Available", done: true },
                  { label: "April Portfolio Compiled", done: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3"
                  >
                    <div
                      className={`w-4 h-4 rounded-sm border flex items-center justify-center ${item.done ? "bg-[#FFDEA4] border-[#FFDEA4]" : "border-white/30"}`}
                    >
                      {item.done && (
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path
                            d="M1.5 4L3.5 6L6.5 2"
                            stroke="#033327"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-[11px] text-white/80">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Exam Modal ────────────────────────────────────── */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#e5e1d8] bg-[#FAF8F5]">
              <div>
                <p className="text-[10px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">
                  Exam Materials
                </p>
                <h3 className="font-serif text-2xl font-bold text-[#033327]">
                  {selectedExam}
                </h3>
              </div>
              <button
                onClick={() => setSelectedExam(null)}
                className="w-8 h-8 rounded-full bg-white border border-[#e5e1d8] flex items-center justify-center text-gray-500 hover:text-[#033327] hover:border-[#033327] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-white">
              <div className="space-y-4">
                {examContents[selectedExam]?.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border border-[#e5e1d8] rounded-xl hover:border-[#033327]/30 hover:bg-[#FAF8F5] transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#033327]/5 flex items-center justify-center shrink-0">
                        <BookOpen size={18} className="text-[#033327]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[13px] text-[#1a1a1a] mb-1 group-hover:text-[#033327] transition-colors">
                          {doc.title}
                        </h4>
                        <div className="flex items-center gap-3 text-[11px] text-gray-500">
                          <span className="font-medium bg-[#e5e1d8] text-[#1a1a1a] px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">
                            {doc.type}
                          </span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.date}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(doc)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-bold text-[#033327] bg-[#FAF8F5] border border-[#e5e1d8] hover:bg-[#033327] hover:text-[#FFDEA4] hover:border-[#033327] transition-all"
                    >
                      <Download size={14} />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-[#e5e1d8] bg-[#FAF8F5] text-center">
              <p className="text-[10px] text-gray-500">
                These materials are strictly for Agaro High School students. Do
                not distribute externally.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Booking Modal ───────────────────────────────────── */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#e5e1d8] bg-[#FAF8F5]">
              <div>
                <p className="text-[10px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">
                  ICT Lab
                </p>
                <h3 className="font-serif text-xl font-bold text-[#033327]">
                  Reserve a Session
                </h3>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#e5e1d8] flex items-center justify-center text-gray-500 hover:text-[#033327] hover:border-[#033327] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setBooked(true);
                setIsBookingModalOpen(false);
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">
                  Date
                </label>
                <input
                  required
                  type="date"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#e5e1d8] rounded-lg text-sm focus:outline-none focus:border-[#033327] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">
                  Time Slot
                </label>
                <select
                  required
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#e5e1d8] rounded-lg text-sm focus:outline-none focus:border-[#033327] transition-colors"
                >
                  <option value="">Select a time...</option>
                  <option value="08:00">08:00 AM - 10:00 AM</option>
                  <option value="10:30">10:30 AM - 12:30 PM</option>
                  <option value="14:00">02:00 PM - 04:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">
                  Purpose
                </label>
                <textarea
                  required
                  rows="3"
                  placeholder="Briefly describe the purpose of your reservation..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#e5e1d8] rounded-lg text-sm focus:outline-none focus:border-[#033327] transition-colors resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-bold text-sm text-white bg-[#033327] hover:bg-[#044a38] transition-colors"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Schedule Modal ──────────────────────────────────── */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#e5e1d8] bg-[#FAF8F5]">
              <div>
                <p className="text-[10px] font-bold text-[#b5985b] uppercase tracking-widest mb-1">
                  Weekly Calendar
                </p>
                <h3 className="font-serif text-xl font-bold text-[#033327]">
                  Lab Schedule
                </h3>
              </div>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#e5e1d8] flex items-center justify-center text-gray-500 hover:text-[#033327] hover:border-[#033327] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#e5e1d8]">
                    <th className="py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Day
                    </th>
                    <th className="py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Morning (08:00 - 12:00)
                    </th>
                    <th className="py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Afternoon (13:00 - 17:00)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-[#e5e1d8]/50 hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-4 font-bold text-[#033327]">Monday</td>
                    <td className="py-4 text-[#1a1a1a]">Grade 12 IT Class</td>
                    <td className="py-4 text-[#b5985b] font-medium">
                      Open for Booking
                    </td>
                  </tr>
                  <tr className="border-b border-[#e5e1d8]/50 hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-4 font-bold text-[#033327]">Tuesday</td>
                    <td className="py-4 text-[#b5985b] font-medium">
                      Open for Booking
                    </td>
                    <td className="py-4 text-[#1a1a1a]">
                      Grade 11 Programming
                    </td>
                  </tr>
                  <tr className="border-b border-[#e5e1d8]/50 hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-4 font-bold text-[#033327]">Wednesday</td>
                    <td className="py-4 text-[#1a1a1a]">Staff Training</td>
                    <td className="py-4 text-[#1a1a1a]">
                      Database Maintenance
                    </td>
                  </tr>
                  <tr className="border-b border-[#e5e1d8]/50 hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-4 font-bold text-[#033327]">Thursday</td>
                    <td className="py-4 text-[#b5985b] font-medium">
                      Open for Booking
                    </td>
                    <td className="py-4 text-[#b5985b] font-medium">
                      Open for Booking
                    </td>
                  </tr>
                  <tr className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-4 font-bold text-[#033327]">Friday</td>
                    <td className="py-4 text-[#1a1a1a]">Grade 10 CS Intro</td>
                    <td className="py-4 text-gray-400">
                      Closed for Maintenance
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
