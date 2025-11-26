import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/Button'
import Card from '../components/Card'
import SectionHeader from '../components/SectionHeader'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'
import { mentors, testimonials, stats, processSteps } from '../data/mock'

export default function Landing() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main className="container-custom pt-16 pb-24 space-y-24">
        {/* Hero */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="h-4 w-4" />
              <span>Stage, VIE ou CDI à l’international</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Trouvez votre mentor pour décrocher un stage ou un emploi à l’international
            </h1>
            <p className="text-lg text-gray-600">
              ANKORA connecte les étudiants motivés avec des mentors locaux vérifiés. Un accompagnement humain pour naviguer les marchés internationaux, rédiger un CV percutant et réussir vos entretiens.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg">Je suis étudiant</Button>
              </Link>
              <Link to="/become-mentor">
                <Button size="lg" variant="outline">Je veux devenir mentor</Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <Badge color="primary">Mentors vérifiés</Badge>
              <Badge color="success">RLS Supabase activé</Badge>
              <Badge color="muted">Support multilingue</Badge>
            </div>
          </div>

          <Card className="relative overflow-hidden">
            <div className="absolute -left-10 -top-10 h-32 w-32 bg-primary-100 rounded-full" aria-hidden />
            <div className="absolute -right-14 -bottom-14 h-40 w-40 bg-secondary-100 rounded-full" aria-hidden />
            <div className="relative grid gap-4">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="p-4 border border-gray-100 rounded-xl bg-white/80 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar name={mentor.name} />
                      <div>
                        <p className="font-semibold text-gray-900">{mentor.name}</p>
                        <p className="text-sm text-gray-600">{mentor.title}</p>
                      </div>
                    </div>
                    <Badge color="primary">{mentor.country}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{mentor.bio}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {mentor.expertise.map((area) => (
                      <Badge key={area} color="muted">{area}</Badge>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-700">
                    <span className="font-semibold">{mentor.rating}★</span>
                    <span>{mentor.availability}</span>
                    <span className="text-primary-700 font-medium">Disponible</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Stats */}
        <section className="bg-gray-50 rounded-2xl p-8 md:p-10 shadow-inner">
          <SectionHeader
            eyebrow="Impact mesurable"
            title="Une plateforme prête pour la croissance internationale"
            description="Architecture Supabase sécurisée, matching mentor/étudiant, messagerie temps réel et tracking des KPIs clés pour convaincre les investisseurs."
          />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((item) => (
              <div key={item.label} className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className="text-xs text-gray-500 mt-1">{item.helper}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="space-y-10">
          <SectionHeader
            eyebrow="Processus fluide"
            title="Comment ça marche pour les étudiants et mentors"
            description="Onboarding guidé, filtres intelligents, et messagerie Supabase Realtime pour des échanges sans friction."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {processSteps.map((step) => (
              <Card key={step.title} className="h-full">
                <div className="flex items-center gap-3 mb-3 text-primary-700">
                  <step.icon className="h-5 w-5" />
                  <p className="font-semibold">{step.title}</p>
                </div>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="space-y-10">
          <SectionHeader eyebrow="Ils ont réussi" title="Des étudiants accompagnés partout dans le monde" />
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                  <Badge color="primary">{testimonial.country}</Badge>
                </div>
                <p className="text-gray-700 leading-relaxed">“{testimonial.quote}”</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary-700 text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-sm uppercase tracking-widest font-semibold text-primary-200">Prêt à vous lancer ?</p>
            <h3 className="text-3xl font-bold">Un accompagnement humain, une architecture prête à scaler</h3>
            <p className="text-primary-100">
              Authentification Supabase, RLS activé, dashboards dédiés étudiants/mentors et messagerie en temps réel. Le tout prêt pour Vercel + Supabase Cloud.
            </p>
          </div>
          <div className="flex gap-4">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="bg-secondary-500 hover:bg-secondary-600 border-none">
                Créer mon compte
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="text-white border-white">
                Découvrir le parcours
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
