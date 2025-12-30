import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const data = req.body

    // Opção 1: Enviar para Google Sheets (mais fácil)
    // Você precisaria configurar a Google Sheets API
    
    // Opção 2: Enviar para Airtable (sem código)
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
    
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Leads`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          'Nome': data.nome,
          'WhatsApp': data.whatsapp,
          'Email': data.email,
          'Nível': data.nivel,
          'Histórico': data.historico,
          'Objetivo': data.objetivo,
          'Dificuldade': data.dor,
          'Pedido Extra': data.pedido_extra,
          'Data/Hora': data.data_hora
        }
      })
    })

    if (!response.ok) {
      throw new Error('Failed to save to Airtable')
    }

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error saving lead:', error)
    res.status(500).json({ error: 'Failed to save lead' })
  }
}