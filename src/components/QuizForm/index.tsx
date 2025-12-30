import { useState } from 'react'
import { AnyformData } from '../../types'
import { WelcomeScreen } from './WelcomeScreen'
import { QuestionScreen } from './QuestionScreen'
import { ThankYouScreen } from './ThankYouScreen'
import { questions } from './questions'
import { submitForm } from '../../services/api'

export function QuizForm() {
  const [currentStep, setCurrentStep] = useState(-1) // -1 = welcome screen
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<AnyformData>({
    nome: '',
    whatsapp: '',
    email: '',
    nivel: '',
    experiencia: '',
    objetivo: '',
    dificuldade: '',
    pedidoExtra: ''
  })

  const handleStart = () => {
    setCurrentStep(0)
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    setCurrentStep(Math.max(-1, currentStep - 1))
  }

  const handleAnswer = (field: keyof AnyformData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Debug: verificar dados antes de enviar
    console.log('Dados do formulário antes de enviar:', formData)
    
    // Enviar dados para o servidor
    const success = await submitForm(formData)
    
    setIsSubmitting(false)
    
    if (success) {
      // Mostrar tela de agradecimento
      setCurrentStep(questions.length)
    } else {
      // Em caso de erro, você pode mostrar uma mensagem
      alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.')
    }
  }

  // Tela de boas-vindas
  if (currentStep === -1) {
    return <WelcomeScreen onStart={handleStart} />
  }

  // Tela de agradecimento
  if (currentStep >= questions.length) {
    return <ThankYouScreen name={formData.nome} />
  }

  // Telas de perguntas
  const currentQuestion = questions[currentStep]
  const currentValue = formData[currentQuestion.field as keyof AnyformData] as string

  return (
    <QuestionScreen
      question={currentQuestion}
      value={currentValue}
      onAnswer={(value) => handleAnswer(currentQuestion.field as keyof AnyformData, value)}
      onNext={handleNext}
      onBack={handleBack}
      currentStep={currentStep + 1}
      totalSteps={questions.length}
      isLastQuestion={currentStep === questions.length - 1}
      isSubmitting={isSubmitting}
    />
  )
}