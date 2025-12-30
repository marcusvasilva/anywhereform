import { motion } from 'framer-motion'
import { Question } from './questions'
import { useState, useEffect } from 'react'
import { PhoneInput } from '../PhoneInput'

interface QuestionScreenProps {
  question: Question
  value: string
  onAnswer: (value: string) => void
  onNext: () => void
  onBack: () => void
  currentStep: number
  totalSteps: number
  isLastQuestion: boolean
  isSubmitting?: boolean
}

export function QuestionScreen({
  question,
  value,
  onAnswer,
  onNext,
  onBack,
  currentStep,
  totalSteps,
  isLastQuestion,
  isSubmitting = false
}: QuestionScreenProps) {
  const [localValue, setLocalValue] = useState(value)
  const [error, setError] = useState('')

  useEffect(() => {
    setLocalValue(value)
    setError('')
  }, [value, question])

  const handleNext = () => {
    if (question.required && !localValue.trim()) {
      setError('Este campo é obrigatório')
      return
    }
    
    // Sempre salvar o valor atual antes de avançar
    onAnswer(localValue)
    
    // Pequeno delay para garantir que o estado foi atualizado
    setTimeout(() => {
      onNext()
    }, 50)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && question.type !== 'textarea') {
      handleNext()
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-1">
        <motion.div 
          className="h-full bg-[#FF6600]"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div 
          key={question.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
        >
          <div className="mb-8">
            <span className="text-[#FF6600] font-bold text-lg">
              {currentStep} de {totalSteps}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-dark mt-2">
              {question.title}
            </h2>
          </div>

          {/* Input de texto */}
          {question.type === 'text' && (
            <div>
              <input
                type="text"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={question.placeholder}
                className="input-field"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          )}

          {/* Input de telefone */}
          {question.type === 'phone' && (
            <div>
              <PhoneInput
                value={localValue}
                onChange={setLocalValue}
                onKeyPress={handleKeyPress}
                placeholder={question.placeholder}
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          )}

          {/* Input de email */}
          {question.type === 'email' && (
            <div>
              <input
                type="email"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={question.placeholder}
                className="input-field"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          )}

          {/* Opções de múltipla escolha */}
          {question.type === 'radio' && (
            <div className="space-y-3">
              {question.options?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setLocalValue(option.value)
                    setError('')
                  }}
                  className={`option-card ${localValue === option.value ? 'selected' : ''}`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                      localValue === option.value 
                        ? 'border-[#FF6600] bg-[#FF6600]' 
                        : 'border-gray-300'
                    }`}>
                      {localValue === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full m-auto mt-1" />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-dark">{option.label}</p>
                      {option.description && (
                        <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          )}

          {/* Textarea */}
          {question.type === 'textarea' && (
            <div>
              <textarea
                value={localValue}
                onChange={(e) => {
                  setLocalValue(e.target.value)
                  // Salvar imediatamente no textarea
                  onAnswer(e.target.value)
                }}
                placeholder={question.placeholder}
                className="input-field min-h-[120px] resize-none"
                rows={4}
                autoFocus
              />
            </div>
          )}

          {/* Botões de navegação */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={onBack}
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              ← Voltar
            </button>

            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="btn-orange disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                isLastQuestion ? 'Solicitar minha Aula Experimental' : 'Continuar'
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}