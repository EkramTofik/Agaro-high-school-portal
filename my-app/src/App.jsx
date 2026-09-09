import { createBrowserRouter, Outlet, RouterProvider, useLocation, useNavigation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage, { homeLoader } from "./pages/HomePage";
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
import LoginPage from "./pages/LoginPage";
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
import NewsDetailPage from "./pages/NewsDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminCollectionPage from "./pages/AdminCollectionPage";
import { createPageLoader, newsDetailLoader } from "./api/routeLoaders";

/* Pages that get their own full-screen layout (no shared Navbar/Footer) */
const STANDALONE = ["/admin"];

function AppShell() {
  const location = useLocation();
  const navigation = useNavigation();
  const isStandalone = STANDALONE.some((p) => location.pathname.startsWith(p));

  return (
    <>
      <ScrollToTop />
      {navigation.state === "loading" && (
        <div className="fixed inset-0 z-200 flex items-center justify-center bg-[#FAF8F5]">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#033327]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#033327]">
              Loading page
            </p>
          </div>
        </div>
      )}
      {isStandalone ? (
        <Outlet />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 pt-16">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      element: <AppShell />,
      children: [
        { path: "/", element: <HomePage />, loader: homeLoader },
        { path: "/about", element: <HistoryPage />, loader: createPageLoader(["/school", "/alumni", "/staff", "/honorRoll"]) },
        { path: "/leadership", element: <StaffPage />, loader: createPageLoader(["/staff", "/department"]) },
        { path: "/teachers", element: <FacultyPage />, loader: createPageLoader(["/staff", "/department"]) },
        { path: "/student-life", element: <StudentLifePage />, loader: createPageLoader(["/club", "/team", "/event", "/gallary", "/studentVoice"]) },
        { path: "/news", element: <NewsPage />, loader: createPageLoader(["/news"]) },
        { path: "/news/:slug", element: <NewsDetailPage />, loader: newsDetailLoader },
        { path: "/academic-results", element: <AchievementsPage />, loader: createPageLoader(["/academicRecord", "/staff"]) },
        { path: "/resources", element: <ResourceHubPage />, loader: createPageLoader(["/resource"]) },
        { path: "/gallery", element: <GalleryPage />, loader: createPageLoader(["/gallary"]) },
        { path: "/alumni", element: <AlumniPage />, loader: createPageLoader(["/alumni"]) },
        { path: "/contact", element: <ContactPage />, loader: createPageLoader(["/school"]) },
        { path: "/login", element: <LoginPage /> },
        { path: "/admin", element: <ProtectedRoute><AdminDashboard /></ProtectedRoute> },
        { path: "/admin/dashboard", element: <ProtectedRoute><AdminDashboard /></ProtectedRoute> },
        { path: "/admin/alumni", element: <ProtectedRoute><AdminAlumniPage /></ProtectedRoute> },
        { path: "/admin/gallery", element: <ProtectedRoute><AdminGalleryPage /></ProtectedRoute> },
        { path: "/admin/student-life", element: <ProtectedRoute><AdminStudentLifePage /></ProtectedRoute> },
        { path: "/admin/faculty", element: <ProtectedRoute><AdminFacultyDirectoryPage /></ProtectedRoute> },
        { path: "/admin/messages", element: <ProtectedRoute><AdminMessagesPage /></ProtectedRoute> },
        { path: "/admin/academic-records", element: <ProtectedRoute><AdminAcademicRecordsPage /></ProtectedRoute> },
        { path: "/admin/news", element: <ProtectedRoute><AdminNewsPage /></ProtectedRoute> },
        { path: "/admin/users", element: <ProtectedRoute><AdminCollectionPage collection="users" /></ProtectedRoute> },
        { path: "/admin/school", element: <ProtectedRoute><AdminCollectionPage collection="school" /></ProtectedRoute> },
        { path: "/admin/departments", element: <ProtectedRoute><AdminCollectionPage collection="department" /></ProtectedRoute> },
        { path: "/admin/academic-years", element: <ProtectedRoute><AdminCollectionPage collection="academicYear" /></ProtectedRoute> },
        { path: "/admin/resources", element: <ProtectedRoute><AdminCollectionPage collection="resource" /></ProtectedRoute> },
        { path: "/admin/clubs", element: <ProtectedRoute><AdminCollectionPage collection="club" /></ProtectedRoute> },
        { path: "/admin/media-files", element: <ProtectedRoute><AdminCollectionPage collection="mediaFile" /></ProtectedRoute> },
        { path: "/admin/events", element: <ProtectedRoute><AdminCollectionPage collection="event" /></ProtectedRoute> },
        { path: "/admin/teams", element: <ProtectedRoute><AdminCollectionPage collection="team" /></ProtectedRoute> },
        { path: "/admin/student-voices", element: <ProtectedRoute><AdminCollectionPage collection="studentVoice" /></ProtectedRoute> },
        { path: "/admin/honor-roll", element: <ProtectedRoute><AdminCollectionPage collection="honorRoll" /></ProtectedRoute> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
