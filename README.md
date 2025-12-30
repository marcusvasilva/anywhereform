# Anyform - Formulário de Captação Anywhere

Formulário estilo quiz para captação de leads para aulas experimentais de inglês.

## 🚀 Deploy Rápido

### Opção 1: Google Sheets (Mais Fácil)
1. Siga as instruções em `src/services/googleSheets.ts`
2. Não precisa de backend!
3. Os dados vão direto para uma planilha

### Opção 2: Vercel (Recomendado)
```bash
npm install -g vercel
npm run build
vercel
```

### Opção 3: Hostinger
1. `npm run build`
2. Faça upload da pasta `dist`
3. Configure o PHP (veja `DEPLOY.md`)

## 📊 Onde ver os leads?

- **Desenvolvimento**: Abra o console (F12) e digite:
  ```javascript
  JSON.parse(localStorage.getItem('anywhere_leads'))
  ```

- **Produção**: 
  - Google Sheets: Na sua planilha
  - Airtable: No dashboard do Airtable
  - Hostinger: No arquivo `data/leads.csv`

## 🛠 Configuração

1. Copie `.env.example` para `.env.local`
2. Configure o método de envio
3. Adicione as credenciais necessárias

Veja `DEPLOY.md` para instruções detalhadas!# anywhereform
