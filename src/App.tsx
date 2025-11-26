import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './lib/auth'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import BecomeMentor from './pages/BecomeMentor'
import FAQ from './pages/FAQ'
import StudentLayout from './pages/student/Layout'
import StudentDashboardPage from './pages/student/Dashboard'
import StudentSearchPage from './pages/student/Search'
import StudentRequestsPage from './pages/student/Requests'
import StudentMessagesPage from './pages/student/Messages'
import StudentProfilePage from './pages/student/Profile'
import MentorLayout from './pages/mentor/Layout'
import MentorDashboardPage from './pages/mentor/Dashboard'
import MentorRequestsPage from './pages/mentor/Requests'
import MentorStudentsPage from './pages/mentor/Students'
import MentorMessagesPage from './pages/mentor/Messages'
import MentorProfilePage from './pages/mentor/Profile'
import ConversationPage from './pages/messages/Conversation'
import ProtectedRoute from './components/ProtectedRoute'
import PublicTabBar from './components/layout/PublicTabBar'

/**
 * Composant racine de l'application
 * Gère le routage principal et la protection des routes
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen pb-20">
          <Routes>
            {/* Route publique */}
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/become-mentor" element={<BecomeMentor />} />
            <Route path="/faq" element={<FAQ />} />

            {/* Routes d'authentification */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Routes protégées */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Espace étudiant */}
            <Route
              path="/student"
              element={
                <ProtectedRoute>
                  <StudentLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboardPage />} />
              <Route path="search" element={<StudentSearchPage />} />
              <Route path="requests" element={<StudentRequestsPage />} />
              <Route path="messages" element={<StudentMessagesPage />} />
              <Route path="profile" element={<StudentProfilePage />} />
            </Route>

            {/* Espace mentor */}
            <Route
              path="/mentor"
              element={
                <ProtectedRoute>
                  <MentorLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<MentorDashboardPage />} />
              <Route path="requests" element={<MentorRequestsPage />} />
              <Route path="students" element={<MentorStudentsPage />} />
              <Route path="messages" element={<MentorMessagesPage />} />
              <Route path="profile" element={<MentorProfilePage />} />
            </Route>

            <Route
              path="/messages/:conversationId"
              element={
                <ProtectedRoute>
                  <ConversationPage />
                </ProtectedRoute>
              }
            />

            {/* Redirection par défaut */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <PublicTabBar />
      </Router>
    </AuthProvider>
  )
}

export default App

