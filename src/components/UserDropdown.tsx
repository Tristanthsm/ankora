<<<<<<< HEAD
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, MessageSquare, Settings, UserCircle, GraduationCap, Briefcase } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { hasRole } from '../lib/roles'

export default function UserDropdown() {
  const { user, profile, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  const initials = profile?.full_name
    ? profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : user.email?.slice(0, 2).toUpperCase()

  const studentEnabled = hasRole(profile, 'student')
  const mentorEnabled = hasRole(profile, 'mentor')

  const handleLogout = async () => {
    setOpen(false)
    await logout()
    navigate('/')
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="h-10 w-10 rounded-full bg-primary-100 text-primary-800 font-semibold flex items-center justify-center border border-primary-200 shadow-sm"
        aria-label="Menu utilisateur"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm text-gray-500">Connecté en tant que</p>
            <p className="text-sm font-semibold text-gray-900 truncate">{profile?.full_name || user.email}</p>
          </div>

          <nav className="py-1 text-sm">
            <Link
              to="/dashboard/student"
              className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition ${
                studentEnabled ? 'text-gray-800' : 'text-gray-400 cursor-not-allowed'
              }`}
              onClick={(e) => {
                if (!studentEnabled) {
                  e.preventDefault()
                  navigate('/onboarding?role=student')
                }
                setOpen(false)
              }}
            >
              <GraduationCap className="h-4 w-4" />
              Espace Étudiant
            </Link>

            <Link
              to={mentorEnabled ? '/dashboard/mentor' : '/onboarding?role=mentor'}
              className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition ${
                mentorEnabled ? 'text-gray-800' : 'text-gray-400'
              }`}
              title={mentorEnabled ? undefined : 'Disponible après création d’un profil mentor'}
              onClick={() => setOpen(false)}
            >
              <Briefcase className="h-4 w-4" />
              Espace Offreur / Mentor
            </Link>

            <Link to="/messages" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-800" onClick={() => setOpen(false)}>
              <MessageSquare className="h-4 w-4" />
              Messages
            </Link>

            <div className="my-1 border-t border-gray-100" />

            <Link to="/account" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-800" onClick={() => setOpen(false)}>
              <UserCircle className="h-4 w-4" />
              Mon compte
            </Link>
            <Link to="/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-800" onClick={() => setOpen(false)}>
              <Settings className="h-4 w-4" />
              Paramètres
            </Link>

            <div className="my-1 border-t border-gray-100" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Se déconnecter
            </button>
          </nav>
        </div>
      )}
    </div>
  )
=======
"use client";

import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { LogOut, User, Settings, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export function UserDropdown() {
    const { user, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate("/");
        setIsOpen(false);
    };

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

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                {initials}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {user.email}
                        </p>
                    </div>

                    <div className="py-1">
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Tableau de bord
                        </Link>
                        <Link
                            to="/profile"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <User className="w-4 h-4" />
                            Mon Profil
                        </Link>
                        <Link
                            to="/settings"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <Settings className="w-4 h-4" />
                            Paramètres
                        </Link>
                    </div>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                handleSignOut();
                            }}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Se déconnecter
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
>>>>>>> 0a9a023 (feat: Add UserDropdown component and integrate it into the Header for authenticated users.)
}
