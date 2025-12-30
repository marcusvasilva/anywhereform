export interface Question {
  id: number
  type: 'text' | 'phone' | 'email' | 'radio' | 'textarea'
  field: string
  title: string
  placeholder?: string
  required: boolean
  options?: Array<{
    value: string
    label: string
    description?: string
  }>
}

export const questions: Question[] = [
  // Bloco A: Identificação
  {
    id: 1,
    type: 'text',
    field: 'nome',
    title: 'Antes de começar, qual é o seu nome?',
    placeholder: 'Digite seu nome completo...',
    required: true
  },
  {
    id: 2,
    type: 'phone',
    field: 'whatsapp',
    title: 'Qual é o seu WhatsApp?',
    placeholder: '(00) 00000-0000',
    required: true
  },
  {
    id: 3,
    type: 'email',
    field: 'email',
    title: 'E o seu melhor e-mail?',
    placeholder: 'seu@email.com',
    required: true
  },
  
  // Bloco B: Perfil Técnico
  {
    id: 4,
    type: 'radio',
    field: 'nivel',
    title: 'Como você avalia o seu inglês hoje?',
    required: true,
    options: [
      { 
        value: 'zero', 
        label: 'Zero',
        description: 'Nunca estudei ou não lembro de nada.'
      },
      { 
        value: 'basico', 
        label: 'Básico',
        description: 'Entendo algumas palavras soltas, mas travo na hora de falar.'
      },
      { 
        value: 'intermediario', 
        label: 'Intermediário',
        description: 'Consigo me virar em viagens, mas cometo erros gramaticais e falta vocabulário.'
      },
      { 
        value: 'avancado', 
        label: 'Avançado',
        description: 'Falo bem, mas quero perfeição, fluência nativa ou foco em negócios.'
      }
    ]
  },
  {
    id: 5,
    type: 'radio',
    field: 'experiencia',
    title: 'Você já estudou inglês formalmente antes?',
    required: true,
    options: [
      { value: 'escola', label: 'Sim, em escola tradicional.' },
      { value: 'particular', label: 'Sim, com professor particular.' },
      { value: 'online', label: 'Sim, online/sozinho.' },
      { value: 'nunca', label: 'Não, nunca estudei.' }
    ]
  },
  
  // Bloco C: Vendas
  {
    id: 6,
    type: 'radio',
    field: 'objetivo',
    title: 'Qual o seu principal objetivo com o inglês agora?',
    required: true,
    options: [
      { 
        value: 'carreira', 
        label: 'Carreira',
        description: 'Conseguir um emprego melhor ou promoção.'
      },
      { 
        value: 'viagem', 
        label: 'Viagem',
        description: 'Vou viajar em breve e não quero passar perrengue.'
      },
      { 
        value: 'estudos', 
        label: 'Estudos',
        description: 'Intercâmbio, Mestrado/Doutorado ou ler artigos.'
      },
      { 
        value: 'pessoal', 
        label: 'Pessoal',
        description: 'Sonho pessoal, entender filmes/músicas ou falar com parentes estrangeiros.'
      }
    ]
  },
  {
    id: 7,
    type: 'radio',
    field: 'dificuldade',
    title: 'O que mais te atrapalha hoje?',
    required: true,
    options: [
      { value: 'vergonha', label: 'Vergonha de falar (Trava)' },
      { value: 'gramatica', label: 'Entendo, mas não consigo formular as frases (Gramática)' },
      { value: 'vocabulario', label: 'Sinto que meu vocabulário é muito pobre' },
      { value: 'listening', label: 'Tenho dificuldade em entender o que os nativos falam (Listening)' }
    ]
  },
  
  // Bloco D: Personalização
  {
    id: 8,
    type: 'textarea',
    field: 'pedidoExtra',
    title: 'Tem algo específico que você gostaria de ver nessa aula experimental?',
    placeholder: 'Ex: Quero simular uma entrevista, aprender a pedir em restaurante...',
    required: false
  }
]