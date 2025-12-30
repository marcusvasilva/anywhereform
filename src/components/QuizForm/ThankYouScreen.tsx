import { motion } from 'framer-motion'

interface ThankYouScreenProps {
  name: string
}

export function ThankYouScreen({ name }: ThankYouScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
      >
        <div className="mb-8">
          <img 
            src="/Anywhere.png" 
            alt="Anywhere" 
            className="h-12 md:h-16 mx-auto mb-6 opacity-50"
          />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
            </svg>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
            Recebemos seu perfil, {name || 'aluno'}!
          </h1>
          
          <p className="text-lg text-gray-text max-w-lg mx-auto">
            Um de nossos consultores está analisando suas respostas para selecionar o professor ideal. 
            Em breve entraremos em contato pelo WhatsApp.
          </p>
        </div>

        <div className="bg-orange-50 rounded-lg p-6 max-w-lg mx-auto">
          <h3 className="font-semibold text-gray-dark mb-2">
            📱 Fique de olho no WhatsApp!
          </h3>
          <p className="text-sm text-gray-600">
            Nossa equipe entrará em contato nas próximas 24 horas para agendar sua aula experimental gratuita.
          </p>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-2">
            Enquanto isso, que tal seguir a gente no Instagram?
          </p>
          <a 
            href="https://www.instagram.com/anywhereingles" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#FF6600] font-medium hover:underline"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
            </svg>
            @anywhereingles
          </a>
        </div>
      </motion.div>
    </div>
  )
}