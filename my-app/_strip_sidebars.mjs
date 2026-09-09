import fs from 'fs';
import path from 'path';

const dir = 'c:/Users/ekru6/OneDrive/Desktop/Internship/my-app/src/pages';

function stripAside(src) {
  let out = src.replace(/\nconst navItems = \[[\s\S]*?\];\n/g, '\n');
  out = out.replace(/\s*const \[activeNav, setActiveNav\] = useState\([^)]*\);\n?/g, '\n');
  out = out.replace(/\n\s*\{\/\*[^*]*[SsPp]idebar[^*]*\*\/\}\s*<aside[\s\S]*?<\/aside>\s*/g, '\n\n');
  out = out.replace(/\n\s*<aside[\s\S]*?<\/aside>\s*/g, '\n\n');
  return out;
}

function fixOuter(src, bg) {
  return src
    .replace(/className="flex h-screen overflow-hidden ([^"]+)"/g, `className="${bg}"`)
    .replace(/className="flex h-screen overflow-hidden"/g, `className="${bg}"`);
}

function softenMain(src) {
  return src
    .replace(
      /className="flex-1 flex flex-col overflow-hidden bg-\[#FAF8F5\]"/g,
      'className="bg-[#FAF8F5]"',
    )
    .replace(
      /className="flex-1 flex flex-col overflow-hidden bg-\[#f4f1ec\]"/g,
      'className="bg-[#f4f1ec]"',
    )
    .replace(
      /className="flex-1 flex flex-col overflow-hidden bg-\[#FAF8F5\] relative"/g,
      'className="bg-[#FAF8F5] relative"',
    )
    .replace(/className="flex-1 overflow-y-auto /g, 'className="');
}

const files = [
  ['AdminFacultyDirectoryPage.jsx', 'bg-[#FAF8F5] text-[#1a1a1a]'],
  ['AdminAlumniPage.jsx', 'bg-[#f4f1ec]'],
  ['AdminGalleryPage.jsx', 'bg-[#FAF8F5]'],
  ['AdminStudentLifePage.jsx', 'bg-[#FAF8F5]'],
  ['AdminMessagesPage.jsx', 'bg-[#FAF8F5] text-[#1a1a1a]'],
  ['AdminAcademicRecordsPage.jsx', 'bg-[#FAF8F5] text-[#1a1a1a]'],
  ['AdminNewsPage.jsx', 'bg-[#FAF8F5] text-[#1a1a1a]'],
];

for (const [file, bg] of files) {
  const p = path.join(dir, file);
  let src = fs.readFileSync(p, 'utf8');
  src = stripAside(src);
  src = fixOuter(src, bg);
  src = softenMain(src);
  fs.writeFileSync(p, src);
  console.log(file, {
    hasAside: src.includes('<aside'),
    hasNavItems: src.includes('navItems'),
    hasActiveNav: src.includes('activeNav'),
    hasHScreen: src.includes('h-screen'),
  });
}
