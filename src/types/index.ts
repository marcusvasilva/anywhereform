export interface AnyformData {
  // Identificação
  nome: string
  whatsapp: string
  email: string
  
  // Perfil técnico
  nivel: 'zero' | 'basico' | 'intermediario' | 'avancado' | ''
  experiencia: 'escola' | 'particular' | 'online' | 'nunca' | ''
  
  // Vendas
  objetivo: 'carreira' | 'viagem' | 'estudos' | 'pessoal' | ''
  dificuldade: 'vergonha' | 'gramatica' | 'vocabulario' | 'listening' | ''
  
  // Personalização
  pedidoExtra: string
}