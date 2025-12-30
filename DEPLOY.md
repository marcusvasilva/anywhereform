# Guia de Deploy - Anyform

## Opções de Deploy + Armazenamento

### 1. **Vercel + Airtable** (Recomendado para simplicidade)
- **Custo**: Grátis (até 1200 registros/mês)
- **Complexidade**: Baixa
- **Como fazer**:
  1. Crie uma conta no [Airtable](https://airtable.com)
  2. Crie uma base com os campos do formulário
  3. Pegue a API key e Base ID
  4. Configure as variáveis de ambiente na Vercel
  5. Use o arquivo `api/leads.ts` que criamos

### 2. **Vercel + Google Sheets** (Mais simples ainda)
- **Custo**: Grátis
- **Complexidade**: Muito baixa
- **Como fazer**:
  1. Siga as instruções em `src/services/googleSheets.ts`
  2. Não precisa de backend, envia direto do frontend
  3. Os dados ficam numa planilha Google

### 3. **Hostinger + PHP** (Se você já tem hospedagem)
- **Custo**: Você já paga a hospedagem
- **Complexidade**: Média
- Vou criar o arquivo PHP:

```php
<?php
// salvar como: api/leads.php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['error' => 'Method not allowed']));
}

$data = json_decode(file_get_contents('php://input'), true);

// Formatar linha do CSV
$line = [
    date('Y-m-d H:i:s'),
    $data['nome'] ?? '',
    $data['whatsapp'] ?? '',
    $data['email'] ?? '',
    $data['nivel'] ?? '',
    $data['historico'] ?? '',
    $data['objetivo'] ?? '',
    $data['dor'] ?? '',
    $data['pedido_extra'] ?? ''
];

// Salvar no arquivo
$file = '../data/leads.csv';
$fp = fopen($file, 'a');
fputcsv($fp, $line, ';');
fclose($fp);

echo json_encode(['success' => true]);
?>
```

### 4. **Netlify + Netlify Forms** (Automático)
- **Custo**: Grátis (100 submissions/mês)
- **Complexidade**: Zero
- Modifique o formulário para usar Netlify Forms

## Como fazer o Deploy

### Na Vercel:
```bash
# Instale a CLI da Vercel
npm i -g vercel

# Faça o build
npm run build

# Deploy
vercel

# Configure as variáveis de ambiente no dashboard
```

### Na Hostinger:
1. Faça o build: `npm run build`
2. Faça upload da pasta `dist` via FTP
3. Crie a pasta `api` com o arquivo PHP
4. Crie a pasta `data` com permissão de escrita

## Variáveis de Ambiente

Crie um arquivo `.env.local` (não commitar!):
```
VITE_API_URL=https://seu-dominio.com/api/leads
VITE_AIRTABLE_API_KEY=seu_token_aqui
VITE_AIRTABLE_BASE_ID=sua_base_aqui
```

## Recomendação Final

Para começar rápido e sem dor de cabeça:
1. **Use Google Sheets** - Zero config no backend
2. **Ou Airtable** - Interface bonita para ver os leads
3. **Ou Typeform/Tally** - Se quiser algo pronto

O importante é começar a capturar leads!