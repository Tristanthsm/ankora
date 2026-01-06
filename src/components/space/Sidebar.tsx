import { NavLink, Link } from 'react-router-dom'
import {
    User,
    FileText,
    Search,
    Send,
    Users,
    HelpCircle,
    GraduationCap,
    Briefcase
} from 'lucide-react'
import { useAuth } from '../../lib/auth'
import { hasRole } from '../../lib/roles'
import { cn } from '../../lib/utils'

export function Sidebar() {
    const { profile } = useAuth()
    const isStudent = profile && hasRole(profile, 'student')
    const isMentor = profile && hasRole(profile, 'mentor')

    const NavItem = ({ to, icon: Icon, label, end = false }: { to: string; icon: any; label: string; end?: boolean }) => (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                cn(
                    "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                        ? "bg-blue-50 text-blue-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )
            }
        >
            <Icon className="h-5 w-5 opacity-70" />
            {label}
        </NavLink>
    )

    return (
        <aside className="sticky top-0 z-30 flex h-screen w-[280px] flex-col border-r border-gray-200 bg-white shadow-[2px_0_24px_-12px_rgba(0,0,0,0.02)]">
            <div className="flex h-20 items-center px-6">
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="/ankora-logo.png"
                        alt="ANKORA"
                        className="h-8 w-auto object-contain"
                    />
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-8">
                {/* Common Section */}
                <div>
                    <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Espace
                    </div>
                    <div className="space-y-1">
                        <NavItem to="/space/documents" icon={FileText} label="Documents" />
                    </div>
                </div>



                {/* Student Section */}
                {(isStudent || (!isStudent && !isMentor)) && (
                    <div>
                        <div className="mb-2 flex items-center gap-2 px-4 text-xs font-semibold uppercase tracking-wider text-blue-600/80">
                            <GraduationCap className="h-3 w-3" /> Étudiant
                        </div>
                        <div className="space-y-1">
                            <NavItem to="/space/search" icon={Search} label="Trouver un mentor" />
                            <NavItem to="/space/requests" icon={Send} label="Mes requêtes" />
                            <NavItem to="/space/student/profile" icon={User} label="Mon Profil" />
                        </div>
                    </div>
                )}

                {/* Mentor Section (Unified) */}
                <div>
                    <div className={cn(
                        "mb-2 flex items-center gap-2 px-4 text-xs font-semibold uppercase tracking-wider",
                        isMentor ? "text-purple-600/80" : "text-gray-400"
                    )}>
                        <Briefcase className="h-3 w-3" /> Mentor
                    </div>

                    <div className="space-y-1">
                        {isMentor ? (
                            <>
                                <NavLink
                                    to="/space/mentor-requests"
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-purple-50 text-purple-700 shadow-sm"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        )
                                    }
                                >
                                    <Send className="h-5 w-5 opacity-70" />
                                    Demandes reçues
                                </NavLink>
                                <NavLink
                                    to="/space/students"
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-purple-50 text-purple-700 shadow-sm"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        )
                                    }
                                >
                                    <Users className="h-5 w-5 opacity-70" />
                                    Mes étudiants
                                </NavLink>
                                <NavLink
                                    to="/space/mentor-profile"
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-purple-50 text-purple-700 shadow-sm"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        )
                                    }
                                >
                                    <User className="h-5 w-5 opacity-70" />
                                    Mon Profil Public
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/space/mentor-application"
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-purple-50 text-purple-700 shadow-sm"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        )
                                    }
                                >
                                    <FileText className="h-5 w-5 opacity-70" />
                                    {profile?.status === 'pending_verification' || profile?.status === 'under_review'
                                        ? "Ma Candidature"
                                        : "Devenir Mentor"}
                                </NavLink>

                                {/* DEMO LINK: Always visible Mentor Tab */}
                                <NavLink
                                    to="/space/mentor-profile"
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-purple-50 text-purple-700 shadow-sm"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        )
                                    }
                                >
                                    <Briefcase className="h-5 w-5 opacity-70" />
                                    Mentor (Accès Direct)
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-100 p-4 space-y-1">
                <button
                    onClick={() => { }} // TODO: Help action
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                >
                    <HelpCircle className="h-5 w-5 opacity-70" />
                    Aide & Support
                </button>
            </div>
        </aside>
    )
}
