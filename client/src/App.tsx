import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Auth Components
import { useAuth } from "@/hooks/useAuth";

// Page Components
import SplashScreen from "@/components/SplashScreen";
import LandingPage from "@/components/LandingPage";
import LoginPage from "@/components/LoginPage";
import RegisterStudentPage from "@/components/RegisterStudentPage";
import RegisterTeacherPage from "@/components/RegisterTeacherPage";
import StudentDashboard from "@/components/StudentDashboard";
import TeacherDashboard from "@/components/TeacherDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import AboutPage from "@/components/AboutPage";
import FAQPage from "@/components/FAQPage";
import PrivacyPage from "@/components/PrivacyPage";
import NotFound from "@/pages/not-found";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-8 h-8 border-4 border-navy-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-navy-900 mb-4">Akses Ditolak</h2>
        <p className="text-slate-600">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      </div>
    </div>;
  }

  return <>{children}</>;
};

function Router() {
  const { user, loading } = useAuth();

  // Show splash screen initially
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Switch>
      <Route path="/" component={SplashScreen} />
      <Route path="/splash" component={SplashScreen} />
      <Route path="/landing" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register-student" component={RegisterStudentPage} />
      <Route path="/register-teacher" component={RegisterTeacherPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/privacy" component={PrivacyPage} />
      
      {/* Protected Routes */}
      <Route path="/student-dashboard">
        <ProtectedRoute allowedRoles={['siswa']}>
          <StudentDashboard />
        </ProtectedRoute>
      </Route>
      
      <Route path="/teacher-dashboard">
        <ProtectedRoute allowedRoles={['guru']}>
          <TeacherDashboard />
        </ProtectedRoute>
      </Route>
      
      <Route path="/admin-dashboard">
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      </Route>
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
