# 📊 Configuração Google Sheets - Passo a Passo

## ✅ Checklist Rápido

- [ ] Criar planilha no Google Sheets
- [ ] Adicionar cabeçalhos na primeira linha
- [ ] Criar o Google Apps Script
- [ ] Publicar como Web App
- [ ] Copiar a URL
- [ ] Configurar no `.env.local`
- [ ] Testar!

## 📝 Passo a Passo Detalhado

### 1. Criar a Planilha
1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Na primeira linha, adicione estes cabeçalhos:
   - A1: `Data/Hora`
   - B1: `Nome`
   - C1: `WhatsApp`
   - D1: `Email`
   - E1: `Nível`
   - F1: `Experiência`
   - G1: `Objetivo`
   - H1: `Dificuldade`
   - I1: `Pedido Extra`

### 2. Criar o Script
1. No menu: **Extensões → Apps Script**
2. Delete tudo e cole o código do arquivo `google-apps-script.js`
3. Salve (Ctrl+S) com o nome "Anyform API"

### 3. Publicar
1. Clique em **Deploy → New Deployment**
2. Clique no ícone ⚙️ → **Web app**
3. Configure:
   - Description: `Anyform API`
   - Execute as: `Me`
   - Who has access: `Anyone`
4. Clique **Deploy**
5. **IMPORTANTE**: Copie a URL (algo como `https://script.google.com/macros/s/AKfycbw.../exec`)

### 4. Configurar no Projeto
1. Abra o arquivo `.env.local`
2. Substitua `SEU_ID_AQUI` pela URL que você copiou:
```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbw.../exec
```

### 5. Testar
1. Reinicie o servidor: `npm run dev`
2. Preencha o formulário
3. Verifique se os dados aparecem na planilha!

## 🔧 Troubleshooting

**Erro "CORS"?**
- Certifique-se que publicou como "Anyone"
- Use a URL que termina em `/exec`, não `/dev`

**Não está salvando?**
- Verifique se a URL está correta no `.env.local`
- Olhe o console do navegador (F12) para erros

**Permissões?**
- Na primeira vez, o Google pode pedir para autorizar
- Aceite as permissões para o script funcionar

## 🎯 Dicas

- A planilha atualiza em tempo real!
- Você pode formatar, filtrar e criar gráficos
- Compartilhe a planilha com a equipe (somente leitura)
- Faça backup regularmente exportando como Excel

## 🚀 Próximos Passos

Depois de configurado:
1. Faça o deploy: `npm run build && vercel`
2. Teste em produção
3. Compartilhe o link do formulário!

Os leads vão direto para sua planilha Google! 📈