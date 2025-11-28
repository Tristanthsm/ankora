import { ArrowRight, Globe, Users, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl animate-float" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-100/30 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm mb-8 animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Mentorat international personnalisé
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
                            Connectez-vous au <span className="text-gradient">monde</span>, révélez votre potentiel.
                        </h1>

                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
                            Rejoignez la première plateforme qui connecte les étudiants ambitieux aux mentors d'élite du monde entier.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <Link to="/register" className="btn-primary flex items-center justify-center gap-2 group">
                                Commencer maintenant
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/how-it-works" className="btn-secondary flex items-center justify-center gap-2">
                                Comment ça marche
                            </Link>
                        </div>

                        <div className="flex items-center gap-8 text-sm font-medium text-gray-500">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-teal-500" />
                                <span>Mentors vérifiés</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-teal-500" />
                                <span>Communauté active</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative hidden lg:block">
                        <div className="relative z-10 bg-white p-2 rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Students collaborating"
                                className="rounded-xl w-full object-cover aspect-[4/3]"
                            />

                            {/* Floating Cards */}
                            <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Global Network</p>
                                        <p className="text-xs text-gray-500">50+ Countries</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -top-8 -right-8 bg-white p-4 rounded-xl shadow-xl animate-float" style={{ animationDelay: '2.5s' }}>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Active Mentors</p>
                                        <p className="text-xs text-gray-500">500+ Experts</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative dots */}
                        <div className="absolute -z-10 top-10 right-10 w-24 h-24 bg-dots-pattern opacity-20" />
                    </div>
                </div>
            </div>
        </section>
    )
}
