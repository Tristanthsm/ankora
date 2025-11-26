import { BackgroundPaths } from '@/components/ui/background-paths'

const title = 'ANKORA'
const subtitle = 'Global Connect'
const tagline = "Trouvez votre mentor pour décrocher un stage ou un emploi à l'international"

export default function Home() {
  return (
    <BackgroundPaths>
      <div className="max-w-5xl mx-auto hero-fade" style={{ animationDelay: '0.15s' }}>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          {title.split('').map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="letter-animated"
              style={{ animationDelay: `${0.08 * index}s` }}
            >
              {letter}
            </span>
          ))}
        </h1>

        <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-4 hero-fade" style={{ animationDelay: '0.35s' }}>
          {subtitle}
        </h2>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto hero-fade" style={{ animationDelay: '0.45s' }}>
          {tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center hero-fade" style={{ animationDelay: '0.55s' }}>
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            Je suis étudiant
          </button>

          <button className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            Je veux devenir mentor
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto hero-fade" style={{ animationDelay: '0.65s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Pays couverts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">500+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Mentors certifiés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">95%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Satisfaction</div>
          </div>
        </div>
      </div>
    </BackgroundPaths>
  )
}
