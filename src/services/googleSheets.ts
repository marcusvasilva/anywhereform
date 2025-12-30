import { AnyformData } from '../types'

// Você precisa criar um Google Apps Script e obter esta URL
const GOOGLE_SCRIPT_URL = 'SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI'

export async function sendToGoogleSheets(data: AnyformData): Promise<boolean> {
  try {
    // Formatar para enviar ao Google Sheets
    const formData = new FormData()
    
    // Adicionar todos os campos
    formData.append('Nome', data.nome)
    formData.append('WhatsApp', data.whatsapp)
    formData.append('Email', data.email)
    formData.append('Nivel', data.nivel)
    formData.append('Experiencia', data.experiencia)
    formData.append('Objetivo', data.objetivo)
    formData.append('Dificuldade', data.dificuldade)
    formData.append('PedidoExtra', data.pedidoExtra)
    formData.append('DataHora', new Date().toLocaleString('pt-BR'))

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData
    })

    return response.ok
  } catch (error) {
    console.error('Erro ao enviar para Google Sheets:', error)
    return false
  }
}

/* 
INSTRUÇÕES PARA CONFIGURAR GOOGLE SHEETS:

1. Crie uma nova planilha no Google Sheets
2. Vá em Extensões > Apps Script
3. Cole este código:

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = e.parameter;
  
  sheet.appendRow([
    data.DataHora,
    data.Nome,
    data.WhatsApp,
    data.Email,
    data.Nivel,
    data.Experiencia,
    data.Objetivo,
    data.Dificuldade,
    data.PedidoExtra
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}

4. Publique como Web App
5. Copie a URL e cole na variável GOOGLE_SCRIPT_URL
*/