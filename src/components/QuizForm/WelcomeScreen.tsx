import { motion } from 'framer-motion'

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
      >
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="/Anywhere.png" 
            alt="Anywhere" 
            className="h-16 md:h-20 mx-auto mb-4"
          />
          <p className="text-xl text-gray-600">Inglês do seu jeito, onde você estiver</p>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-8">
          Oi! Vamos encontrar a aula perfeita para você?
        </h2>

        <button
          onClick={onStart}
          className="btn-orange text-lg"
        >
          Vamos começar!
        </button>

        <p className="mt-4 text-gray-500 text-sm">
          ⏱ Leva apenas 2 minutos
        </p>
      </motion.div>
    </div>
  )
}