import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/Button'
import Card from '../components/Card'
import SectionHeader from '../components/SectionHeader'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'
import { Ankora } from '../components/BackgroundPaths'
import { mentors, testimonials, stats, processSteps } from '../data/mock'
import { TestimonialsSection } from '../components/TestimonialsSection'

export default function Landing() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <Ankora title="ANKORA" />

      <main className="container-custom pt-16 pb-24 space-y-24">
        {/* Mentors */}
        <section className="space-y-10">
          <SectionHeader
            eyebrow="Mentors vérifiés"
            title="Un réseau de professionnels prêts à vous accompagner"
            description="Parcourez des profils locaux validés par ANKORA pour préparer vos candidatures, vos entretiens et votre intégration dans un nouveau pays."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="h-full bg-white/80 backdrop-blur">
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
                    <Badge key={area} color="muted">
                      {area}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-700">
                  <span className="font-semibold">{mentor.rating}★</span>
                  <span>{mentor.availability}</span>
                  <span className="text-primary-700 font-medium">Disponible</span>
                </div>
              </Card>
            ))}
          </div>
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

        <TestimonialsSection
          className="rounded-2xl bg-gray-50"
          title="Des étudiants accompagnés partout dans le monde"
          description="Mentors locaux, pratique intensive des entretiens, et conseils personnalisés pour décrocher votre prochaine opportunité."
          testimonials={testimonials.map((testimonial) => ({
            author: {
              name: testimonial.name,
              role: testimonial.role,
              country: testimonial.country,
            },
            text: testimonial.quote,
          }))}
        />

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
