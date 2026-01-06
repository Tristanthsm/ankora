import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './lib/auth'
import HomePage from './components/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Account from './pages/Account'
import About from './pages/About'
import Marketplace from './pages/Marketplace'
import MentorPublicProfile from './pages/MentorPublicProfile'
import HowItWorks from './pages/HowItWorks'
import BecomeMentor from './pages/BecomeMentor'
import FAQ from './pages/FAQ'
import StudentSearchPage from './pages/student/Search'
import StudentRequestsPage from './pages/student/Requests'
import MentorRequestsPage from './pages/mentor/Requests'
import MentorStudentsPage from './pages/mentor/Students'
import ConversationPage from './pages/messages/Conversation'
import InboxPage from './pages/messages/Inbox'
import Settings from './pages/Settings'
import ProtectedRoute from './components/ProtectedRoute'
import VerifiedRoute from './components/VerifiedRoute'
import PublicTabBar from './components/layout/PublicTabBar'
import SpaceLayout from './pages/space/Layout'
import SpaceDashboardPage from './pages/space/Dashboard'
import DocumentsPage from './pages/space/Documents'
import ContractsPage from './pages/space/Contracts'
import StudentProfileEditor from './pages/space/student/ProfileEditor'
import MentorProfileEditor from './pages/space/mentor/ProfileEditor'
import MentorApplicationStatus from './pages/space/mentor/ApplicationStatus'
import MentorApplicationForm from './pages/space/mentor/ApplicationForm'
import AdminPage from './pages/space/Admin'

import ScrollToTop from './components/ScrollToTop'

/**
 * Composant racine de l'application
 * Gère le routage principal et la protection des routes
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen pb-20">
          <Routes>
            {/* Route publique */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/mentor/:id" element={<MentorPublicProfile />} />
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
                  <VerifiedRoute>
                    <Dashboard />
                  </VerifiedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* Espace unifié - Accessible sans validation */}
            <Route
              path="/space"
              element={
                <ProtectedRoute>
                  <SpaceLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<SpaceDashboardPage />} />
              <Route path="search" element={<StudentSearchPage />} />
              <Route path="requests" element={<StudentRequestsPage />} />
              <Route path="mentor-requests" element={<MentorRequestsPage />} />
              <Route path="students" element={<MentorStudentsPage />} />
              <Route path="messages" element={<InboxPage />} />
              <Route path="profile" element={<Account />} />
              <Route path="student/profile" element={<StudentProfileEditor />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="contracts" element={<ContractsPage />} />
              <Route path="mentor-profile" element={<MentorProfileEditor />} />
              <Route path="mentor-application" element={<MentorApplicationStatus />} />
              <Route path="mentor-application/apply" element={<MentorApplicationForm />} />
              <Route path="admin" element={<AdminPage />} />
            </Route>



            <Route
              path="/messages/:conversationId"
              element={
                <ProtectedRoute>
                  <ConversationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <InboxPage />
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
