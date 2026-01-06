"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import {
  GraduationCap,
  MessageCircle,
  User as UserIcon,
  BriefcaseBusiness,
  LayoutDashboard,
} from "lucide-react";

export function UserDropdown() {
  const { user, profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) return null;

  // Get initials or first letter of email
  const initials = user.email ? user.email.substring(0, 2).toUpperCase() : "U";

  const spaceLink = "/space";
  const profileLink = "/account";

  const tabs = [
    {
      label: "Espace",
      description: "Tableau de bord, documents et demandes",
      to: spaceLink,
      icon: <LayoutDashboard className="w-4 h-4" />,
      highlight: true,
    },
    {
      label: "Messages",
      description: "Toutes vos conversations",
      to: "/messages",
      icon: <MessageCircle className="w-4 h-4" />,
      highlight: true,
    },
    {
      label: "Mon profil",
      description: "Vos informations et préférences",
      to: profileLink,
      icon: <UserIcon className="w-4 h-4" />,
      highlight: true,
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {initials}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/80 py-3 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 pb-3 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {hasRole(profile, "student") && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                    <GraduationCap className="w-3 h-3" /> Stagiaire
                  </span>
                )}
                {hasRole(profile, "mentor") && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-0.5 text-[11px] font-semibold text-purple-700">
                    <BriefcaseBusiness className="w-3 h-3" /> Mentor
                  </span>
                )}
              </div>
            </div>

          </div>

          <div className="py-2">
            {tabs.map((tab) => (
              <Link
                key={tab.label}
                to={tab.to}
                className="group flex items-start gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 transition-all duration-150"
                onClick={() => setIsOpen(false)}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-indigo-700 ${tab.highlight
                    ? "bg-indigo-50 border-indigo-100"
                    : "bg-gray-50 border-gray-100 text-gray-500"
                    } group-hover:bg-white group-hover:border-indigo-200 group-hover:text-indigo-700 shadow-inner`}
                >
                  {tab.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700">
                    {tab.label}
                  </span>
                  <span className="text-xs text-gray-500 group-hover:text-indigo-600">{tab.description}</span>
                </div>
              </Link>
            ))}
          </div>


        </div>
      )}
    </div>
  );
}
