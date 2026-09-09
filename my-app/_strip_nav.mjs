import fs from 'fs';
import path from 'path';

const dir = 'c:/Users/ekru6/OneDrive/Desktop/Internship/my-app/src/pages';

const files = [
  'AdminFacultyDirectoryPage.jsx',
  'AdminAlumniPage.jsx',
  'AdminGalleryPage.jsx',
  'AdminStudentLifePage.jsx',
  'AdminMessagesPage.jsx',
  'AdminAcademicRecordsPage.jsx',
];

for (const file of files) {
  const p = path.join(dir, file);
  let src = fs.readFileSync(p, 'utf8');
  src = src.replace(/\r\n/g, '\n');
  src = src.replace(/\nconst navItems = \[[\s\S]*?\]\n/g, '\n');
  src = src.replace(/\n\s*const \[activeNav, setActiveNav\] = useState\([^)]*\)\n/g, '\n');
  fs.writeFileSync(p, src);
  console.log(file, {
    hasNavItems: src.includes('navItems'),
    hasActiveNav: src.includes('activeNav'),
  });
}
