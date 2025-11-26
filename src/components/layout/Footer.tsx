import { Link } from 'react-router-dom'
import { Mail, ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-20">
      <div className="container-custom py-12 grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-lg font-semibold mb-3">ANKORA Global Connect</h3>
          <p className="text-gray-300 text-sm">
            Plateforme professionnelle qui relie étudiants et mentors pour accélérer les carrières
            internationales.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Ressources</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/about" className="hover:text-white">À propos</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white">Processus</Link></li>
            <li><Link to="/become-mentor" className="hover:text-white">Devenir mentor</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Confiance</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Mentors vérifiés</span>
            </li>
            <li>RLS Supabase activé</li>
            <li>Conformité RGPD</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Mail className="h-4 w-4" />
            <a href="mailto:contact@ankora.com" className="hover:text-white">contact@ankora.com</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
        © 2024 ANKORA Global Connect. Tous droits réservés.
      </div>
    </footer>
  )
}
