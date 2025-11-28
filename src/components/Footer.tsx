import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10">
            <div className="container-custom">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6 group">
                            <img
                                src="/ankora-logo.png"
                                alt="ANKORA Global Connect"
                                className="h-10 w-auto object-contain bg-white rounded px-2 py-1"
                            />
                        </Link>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            La plateforme de référence pour le mentorat international. Connectez-vous, apprenez et grandissez.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Plateforme</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/how-it-works" className="hover:text-blue-400 transition-colors">Comment ça marche</Link></li>
                            <li><Link to="/mentors" className="hover:text-blue-400 transition-colors">Nos Mentors</Link></li>
                            <li><Link to="/pricing" className="hover:text-blue-400 transition-colors">Tarifs</Link></li>
                            <li><Link to="/enterprise" className="hover:text-blue-400 transition-colors">Pour les entreprises</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Ressources</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                            <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
                            <li><Link to="/support" className="hover:text-blue-400 transition-colors">Support</Link></li>
                            <li><Link to="/careers" className="hover:text-blue-400 transition-colors">Carrières</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Restez informé</h4>
                        <p className="text-gray-400 mb-4">Inscrivez-vous à notre newsletter pour recevoir nos derniers conseils.</p>
                        <form className="flex gap-2">
                            <div className="relative flex-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="Votre email"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <button className="px-4 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                OK
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                    <p>© 2024 Ankora Global Connect. Tous droits réservés.</p>
                    <div className="flex gap-8">
                        <Link to="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Conditions</Link>
                        <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
