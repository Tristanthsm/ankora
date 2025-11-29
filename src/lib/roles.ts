import { Profile } from './supabase'

export function normalizeRoles(role: Profile['role']): string[] {
  if (!role) return []
  if (Array.isArray(role)) return role.map((r) => r.trim())
  return role
    .split(',')
    .map((r) => r.trim())
    .filter(Boolean)
}

export function hasRole(profile: Profile | null, role: 'student' | 'mentor') {
  if (!profile) return false
  const roles = normalizeRoles(profile.role)
  return roles.includes(role)
}
