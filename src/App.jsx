import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import StaffPage from "./pages/StaffPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import FacultyPage from "./pages/FacultyPage";
import StudentLifePage from "./pages/StudentLifePage";
import AchievementsPage from "./pages/AchievementsPage";
import ResourceHubPage from "./pages/ResourceHubPage";
import NewsPage from "./pages/NewsPage";
import AlumniPage from "./pages/AlumniPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAlumniPage from "./pages/AdminAlumniPage";
import AdminGalleryPage from "./pages/AdminGalleryPage";
import AdminStudentLifePage from "./pages/AdminStudentLifePage";
import AdminFacultyDirectoryPage from "./pages/AdminFacultyDirectoryPage";
import AdminMessagesPage from "./pages/AdminMessagesPage";
import AdminAcademicRecordsPage from "./pages/AdminAcademicRecordsPage";
import AdminNewsPage from "./pages/AdminNewsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ScrollToTop from "./components/ScrollToTop";

/* Pages that get their own full-screen layout (no shared Navbar/Footer) */
const STANDALONE = ["/admin"];

function AppShell() {
  const location = useLocation();
  const isStandalone = STANDALONE.some((p) => location.pathname.startsWith(p));

  return (
    <>
      <ScrollToTop />
      {isStandalone ? (
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/alumni" element={<AdminAlumniPage />} />
          <Route path="/admin/gallery" element={<AdminGalleryPage />} />
          <Route
            path="/admin/student-life"
            element={<AdminStudentLifePage />}
          />
          <Route
            path="/admin/faculty"
            element={<AdminFacultyDirectoryPage />}
          />
          <Route path="/admin/messages" element={<AdminMessagesPage />} />
          <Route
            path="/admin/academic-records"
            element={<AdminAcademicRecordsPage />}
          />
          <Route path="/admin/news" element={<AdminNewsPage />} />
        </Routes>
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<HistoryPage />} />
              <Route path="/leadership" element={<StaffPage />} />
              <Route path="/teachers" element={<FacultyPage />} />
              <Route path="/student-life" element={<StudentLifePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/academic-results" element={<AchievementsPage />} />
              <Route path="/resources" element={<ResourceHubPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/alumni" element={<AlumniPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
