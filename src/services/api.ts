import { AnyformData } from '../types'

// Escolha o método de envio baseado no ambiente
const SEND_METHOD = import.meta.env.VITE_SEND_METHOD || 'localStorage' // 'api' | 'googleSheets' | 'localStorage'
const API_ENDPOINT = import.meta.env.VITE_API_URL || '/api/leads'

export async function submitForm(data: AnyformData): Promise<boolean> {
  try {
    // Formatar os dados conforme especificado no PRD
    const formattedData = {
      data_hora: new Date().toISOString(),
      nome: data.nome,
      whatsapp: data.whatsapp,
      email: data.email,
      nivel: data.nivel,
      historico: data.experiencia,
      objetivo: data.objetivo,
      dor: data.dificuldade,
      pedido_extra: data.pedidoExtra || ''
    }

    // Para desenvolvimento, vamos simular o envio
    console.log('Enviando dados para o servidor:', formattedData)
    console.log('Pedido extra original:', data.pedidoExtra)
    console.log('Pedido extra length:', data.pedidoExtra?.length)

    // Se estiver configurado para usar Google Sheets
    if (SEND_METHOD === 'googleSheets') {
      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL
      
      if (!GOOGLE_SCRIPT_URL) {
        console.error('URL do Google Apps Script não configurada!')
        return false
      }

      // Criar FormData para enviar
      const formData = new FormData()
      formData.append('Nome', data.nome)
      formData.append('WhatsApp', data.whatsapp.replace(/\D/g, ''))
      formData.append('Email', data.email)
      formData.append('Nivel', data.nivel)
      formData.append('Experiencia', data.experiencia)
      formData.append('Objetivo', data.objetivo)
      formData.append('Dificuldade', data.dificuldade)
      formData.append('PedidoExtra', data.pedidoExtra || 'Nenhum')

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData
      })

      return response.ok
    }
    
    // Se estiver configurado para usar API
    if (SEND_METHOD === 'api') {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData)
      })
      
      return response.ok
    }

    // Padrão: salvar no localStorage
    const existingLeads = JSON.parse(localStorage.getItem('anywhere_leads') || '[]')
    existingLeads.push(formattedData)
    localStorage.setItem('anywhere_leads', JSON.stringify(existingLeads))
    
    return true
  } catch (error) {
    console.error('Erro ao enviar formulário:', error)
    return false
  }
}

// Função para exportar dados do localStorage (apenas para desenvolvimento)
export function exportLeadsAsCSV(): string {
  const leads = JSON.parse(localStorage.getItem('anywhere_leads') || '[]')
  
  if (leads.length === 0) {
    return ''
  }

  // Header do CSV
  const headers = ['DATA_HORA', 'NOME', 'WHATSAPP', 'EMAIL', 'NIVEL', 'HISTORICO', 'OBJETIVO', 'DOR', 'PEDIDO_EXTRA']
  
  // Converter para CSV
  const rows = leads.map((lead: any) => {
    return [
      lead.data_hora,
      lead.nome,
      lead.whatsapp,
      lead.email,
      lead.nivel,
      lead.historico,
      lead.objetivo,
      lead.dor,
      lead.pedido_extra
    ].map(field => `"${field || ''}"`).join(';')
  })

  return [headers.join(';'), ...rows].join('\n')
}