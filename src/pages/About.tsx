import Header from '../components/Header'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/Card'
import Badge from '../components/Badge'

const team = [
  {
    name: 'Sarah Cohen',
    role: 'CEO & Co-fondatrice',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'David Chen',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Head of Community',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
]

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
              Nous imaginons un futur où chaque étudiant, peu importe son origine, peut accéder aux meilleures opportunités mondiales grâce à un réseau de soutien solide.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              L'expatriation est un accélérateur de carrière et de développement personnel. Nous la rendons accessible, sécurisée et humaine.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Étudiants travaillant ensemble"
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">L'équipe derrière ANKORA</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des passionnés d'éducation et de voyage, unis pour changer la donne.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-blue-50">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-medium mt-1">{member.role}</p>
              </Card>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
