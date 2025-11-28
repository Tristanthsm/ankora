import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "Sarah Martin",
    role: "Étudiante en Droit",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    content: "Grâce à Ankora, j'ai trouvé un mentor à Londres qui m'a aidée à préparer mon année d'échange. Une expérience inestimable !",
    rating: 5
  },
  {
    name: "Thomas Dubois",
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    content: "La qualité des mentors est impressionnante. J'ai pu échanger avec des experts que je n'aurais jamais pu contacter autrement.",
    rating: 5
  },
  {
    name: "Emma Wilson",
    role: "Marketing Digital",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    content: "L'interface est super intuitive et le matching a été parfait du premier coup. Je recommande à 100% !",
    rating: 4
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ils nous font <span className="text-gradient">confiance</span>
          </h2>
          <p className="text-xl text-gray-600">
            Découvrez les retours de notre communauté grandissante.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl relative hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-4 right-8 text-9xl text-blue-100 font-serif opacity-50 select-none pointer-events-none">
                "
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-8 relative z-10 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-blue-600 font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
