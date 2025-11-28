import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    text: "Grâce à Ankora, j'ai trouvé un mentor à Londres qui m'a aidée à préparer mon année d'échange. Une expérience inestimable !",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Sarah Martin",
    role: "Étudiante en Droit",
  },
  {
    text: "La qualité des mentors est impressionnante. J'ai pu échanger avec des experts que je n'aurais jamais pu contacter autrement.",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Thomas Dubois",
    role: "Entrepreneur",
  },
  {
    text: "L'interface est super intuitive et le matching a été parfait du premier coup. Je recommande à 100% !",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Emma Wilson",
    role: "Marketing Digital",
  },
  {
    text: "Un réseau incroyable pour booster sa carrière. Les conseils reçus m'ont permis de décrocher mon premier job.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Lucas Moretti",
    role: "Développeur Web",
  },
  {
    text: "J'ai pu valider mon projet de mobilité internationale grâce aux retours concrets d'un mentor sur place.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Julie Rousseau",
    role: "Étudiante en Commerce",
  },
  {
    text: "Devenir mentor sur Ankora m'a permis de redonner à la communauté tout en développant mon réseau.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Marc Levy",
    role: "Senior Manager",
  },
];

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-6 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                key={i}
              >
                <p className="text-gray-600 leading-relaxed">{text}</p>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 text-sm">{name}</span>
                    <span className="text-gray-500 text-xs">{role}</span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container-custom mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ils nous font confiance
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez les retours de notre communauté grandissante d'étudiants et de mentors à travers le monde.
        </p>
      </div>

      <div className="relative h-[600px] overflow-hidden">
        {/* Gradients for fade effect */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent z-10" />

        <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full items-start">
          <TestimonialsColumn
            testimonials={[testimonials[0], testimonials[1], testimonials[4]]}
            duration={15}
          />
          <TestimonialsColumn
            testimonials={[testimonials[2], testimonials[3], testimonials[5]]}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={[testimonials[4], testimonials[1], testimonials[0]]}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}

