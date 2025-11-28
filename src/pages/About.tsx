import Header from '../components/Header'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import Badge from '../components/Badge'
import TeamSection from '../components/TeamSection'
import { WorldMap } from '../components/ui/WorldMap'



export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container-custom pt-32 pb-20 space-y-24">

        {/* Mission Section */}
        <section>
          <SectionHeader
            eyebrow="Notre Mission"
            title="Connecter les talents au monde"
            description="Chez ANKORA, nous croyons que le talent est universel, mais que les opportunités ne le sont pas. Notre mission est de briser les barrières géographiques en connectant les étudiants ambitieux avec des mentors qui ont déjà réussi leur expatriation."
            align="center"
          />
        </section>

        {/* Vision Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge color="primary">Vision</Badge>
            <h2 className="text-3xl font-bold text-gray-900">Un monde sans frontières pour l'ambition</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Nous imaginons un futur où chaque étudiant, même sans contacts, peut s’appuyer sur des professionnels prêts à partager et monétiser leur réseau pour ouvrir de vraies opportunités.﻿
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Avec ANKORA, le réseau n’est plus un avantage réservé à quelques‑uns, mais un levier partagé entre ceux qui cherchent un stage et ceux qui veulent valoriser leur expérience.﻿
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
            <WorldMap
              dots={[
                {
                  start: { lat: 48.8566, lng: 2.3522, label: "Paris" },
                  end: { lat: 40.7128, lng: -74.0060, label: "New York" },
                },
                {
                  start: { lat: 51.5074, lng: -0.1278, label: "Londres" },
                  end: { lat: 1.3521, lng: 103.8198, label: "Singapour" },
                },
                {
                  start: { lat: 52.5200, lng: 13.4050, label: "Berlin" },
                  end: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
                },
                {
                  start: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
                  end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
                },
                {
                  start: { lat: 45.5017, lng: -73.5673, label: "Montréal" },
                  end: { lat: 41.3851, lng: 2.1734, label: "Barcelone" },
                },
              ]}
            />
          </div>
        </section>

        {/* Team Section */}
        <TeamSection />

      </main>
      <Footer />
    </div>
  )
}
