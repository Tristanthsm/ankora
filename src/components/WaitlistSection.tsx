import { useMemo, useState, type FormEvent } from "react"
import { supabase } from "@/lib/supabase"

const ROLE_OPTIONS = [
    { key: "student", label: "Étudiant" },
    { key: "mentor", label: "Mentor" },
]

export default function WaitlistSection() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [country, setCountry] = useState("")
    const [schoolName, setSchoolName] = useState("")
    const [email, setEmail] = useState("")
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")

    const isStudent = useMemo(() => selectedRoles.includes("student"), [selectedRoles])

    const canSubmit = useMemo(
        () =>
            email.trim().length > 0 &&
            firstName.trim().length > 0 &&
            lastName.trim().length > 0 &&
            country.trim().length > 0 &&
            (!isStudent || schoolName.trim().length > 0) &&
            selectedRoles.length > 0,
        [country, email, firstName, isStudent, lastName, schoolName, selectedRoles]
    )

    const toggleRole = (role: string) => {
        setSelectedRoles((prev) =>
            prev.includes(role) ? prev.filter((item) => item !== role) : [...prev, role]
        )
    }

    const resetForm = () => {
        setFirstName("")
        setLastName("")
        setCountry("")
        setSchoolName("")
        setEmail("")
        setSelectedRoles([])
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setErrorMessage("")

        if (!canSubmit) {
            setErrorMessage(
                "Merci de renseigner tous les champs obligatoires et de choisir au moins un rôle."
            )
            return
        }

        setStatus("loading")

        const supabaseConfigured = Boolean(
            import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
        )

        if (supabaseConfigured) {
            const { error } = await supabase.from("waitlist_signups").insert({
                email: email.trim(),
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                country: country.trim(),
                school_name: isStudent ? schoolName.trim() : null,
                roles: selectedRoles,
            })

            if (error) {
                setErrorMessage(
                    "Impossible d'enregistrer pour le moment. Merci de réessayer plus tard."
                )
                setStatus("error")
                return
            }
        }

        setStatus("success")
        resetForm()
    }

    return (
        <section className="relative py-20 bg-gradient-to-b from-white via-blue-50 to-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.12),transparent_45%)]" />
            <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                        Liste d'attente
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                        Rejoignez Ankora avant tout le monde
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Laissez-nous votre email et précisez si vous souhaitez rejoindre la plateforme en tant que
                        étudiant, mentor ou les deux. Nous vous contacterons dès que votre espace sera prêt.
                    </p>
                    <ul className="space-y-3 text-slate-700">
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" aria-hidden />
                            <span>Accès prioritaire aux premières fonctionnalités.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" aria-hidden />
                            <span>Opportunité de rejoindre le programme ambassadeur Ankora.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" aria-hidden />
                            <span>Accès à des mentors et entreprises dans le monde entier.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-blue-100 p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="waitlist-first-name" className="text-sm font-semibold text-slate-800">
                                    Prénom
                                </label>
                                <input
                                    id="waitlist-first-name"
                                    type="text"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    placeholder="Ex. Fatou"
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="waitlist-last-name" className="text-sm font-semibold text-slate-800">
                                    Nom de famille
                                </label>
                                <input
                                    id="waitlist-last-name"
                                    type="text"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                    placeholder="Ex. Diallo"
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="waitlist-email" className="text-sm font-semibold text-slate-800">
                                Adresse email
                            </label>
                            <input
                                id="waitlist-email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="vous@example.com"
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="waitlist-country" className="text-sm font-semibold text-slate-800">
                                Pays
                            </label>
                            <input
                                id="waitlist-country"
                                type="text"
                                value={country}
                                onChange={(event) => setCountry(event.target.value)}
                                placeholder="Ex. Sénégal"
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm font-semibold text-slate-800">Je veux rejoindre en tant que :</p>
                            <div className="flex flex-wrap gap-3">
                                {ROLE_OPTIONS.map((role) => {
                                    const isActive = selectedRoles.includes(role.key)
                                    return (
                                        <button
                                            key={role.key}
                                            type="button"
                                            onClick={() => toggleRole(role.key)}
                                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all shadow-sm ${
                                                isActive
                                                    ? "border-blue-600 bg-blue-600 text-white shadow-blue-200/70"
                                                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-200"
                                            }`}
                                            aria-pressed={isActive}
                                        >
                                            {role.label}
                                        </button>
                                    )
                                })}
                            </div>
                            <p className="text-xs text-slate-500">
                                Vous pouvez sélectionner les deux options si vous souhaitez explorer plusieurs rôles.
                            </p>
                        </div>

                        {isStudent && (
                            <div className="space-y-2">
                                <label htmlFor="waitlist-school" className="text-sm font-semibold text-slate-800">
                                    Nom de l'école
                                </label>
                                <input
                                    id="waitlist-school"
                                    type="text"
                                    value={schoolName}
                                    onChange={(event) => setSchoolName(event.target.value)}
                                    placeholder="Ex. Université Cheikh Anta Diop"
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    required={isStudent}
                                />
                            </div>
                        )}

                        {errorMessage && (
                            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                                {errorMessage}
                            </p>
                        )}

                        {status === "success" && (
                            <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                                Merci ! Vous êtes bien inscrit·e sur la liste d'attente Ankora.
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={status === "loading" || !canSubmit}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition-all disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none"
                        >
                            {status === "loading" ? "Enregistrement..." : "Rejoindre la liste d'attente"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
