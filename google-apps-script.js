// COLE ESTE CÓDIGO NO GOOGLE APPS SCRIPT

function doPost(e) {
  try {
    // Abre a planilha ativa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Pega os dados enviados
    const data = e.parameter;
    
    // Adiciona uma nova linha com os dados
    sheet.appendRow([
      new Date().toLocaleString('pt-BR'), // Data/Hora
      data.Nome || '',
      data.WhatsApp || '',
      data.Email || '',
      data.Nivel || '',
      data.Experiencia || '',
      data.Objetivo || '',
      data.Dificuldade || '',
      data.PedidoExtra || ''
    ]);
    
    // Retorna sucesso
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Em caso de erro
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função para testar
function doGet(e) {
  return ContentService
    .createTextOutput("API funcionando! Use POST para enviar dados.")
    .setMimeType(ContentService.MimeType.TEXT);
}