# 📄 PRD: Página de Briefing & Captura (MVP Fase 1) - Anywhere

**Versão:** 1.0
**Status:** Aprovado para Desenvolvimento
**Objetivo:** Capturar e qualificar leads para aula experimental, armazenando dados em log simples para ação do time comercial (Closer).

---

## 1. Visão Geral
Desenvolvimento de uma Landing Page dedicada (Single Page) contendo um formulário de qualificação "estilo quiz".
* **Fluxo:** O usuário preenche o perfil → Dados são salvos no servidor → Usuário vê tela de agradecimento → Closer acessa o arquivo de dados e entra em contato.

---

## 2. Identidade Visual (UI Kit)
Baseado na logo **Anywhere** (Estilo Minimalista e Enérgico).

* **Background:** `Branco (#FFFFFF)` (Mandatório).
* **Cor Primária (Ações/Destaques):** `Laranja` (Extraído da logo - Ref: `#FF6600` ou `#F36F21`).
    * *Uso:* Botões (CTA), Barras de progresso no topo, Ícones de check, Bordas ao selecionar uma opção.
* **Tipografia:**
    * **Títulos:** `Preto (#000000)` ou Cinza Chumbo. Fonte moderna e limpa (Sans-serif).
    * **Corpo:** `Cinza Escuro (#333333)` para leitura confortável.
* **Layout & UX:**
    * **Mobile First:** O design deve priorizar a tela vertical (celular).
    * **Input Cards:** As opções de múltipla escolha devem ser **cartões grandes e clicáveis** (fáceis de tocar no celular), e não apenas "bolinhas" pequenas (radio buttons padrão).
    * **Feedback:** Ao clicar em uma opção, o cartão deve mudar de cor (borda ou fundo laranja claro).

---

## 3. Conteúdo do Formulário (Campos & Perguntas)

### Bloco A: Identificação (Dados CRM)
*Objetivo: Garantir o contato.*

1.  **Nome Completo:** (Input Texto)
2.  **WhatsApp:** (Input Numérico - Máscara `(XX) XXXXX-XXXX`) - **Obrigatório.**
3.  **E-mail:** (Input Email)

### Bloco B: Perfil de Nível (Técnico)
*Objetivo: Municiar o professor.*

**4. Como você avalia o seu inglês hoje?** (Seleção Única)
* [ ] **Zero:** Nunca estudei ou não lembro de nada.
* [ ] **Básico:** Entendo algumas palavras soltas, mas travo na hora de falar.
* [ ] **Intermediário:** Consigo me virar em viagens, mas cometo erros gramaticais e falta vocabulário.
* [ ] **Avançado:** Falo bem, mas quero perfeição, fluência nativa ou foco em negócios.

**5. Você já estudou inglês formalmente antes?** (Seleção Única)
* [ ] Sim, em escola tradicional.
* [ ] Sim, com professor particular.
* [ ] Sim, online/sozinho.
* [ ] Não, nunca estudei.

### Bloco C: Vendas (Objetivos e Dores)
*Objetivo: Argumentos para o Closer.*

**6. Qual o seu principal objetivo com o inglês agora?** (Seleção Única)
* [ ] **Carreira:** Conseguir um emprego melhor ou promoção.
* [ ] **Viagem:** Vou viajar em breve e não quero passar perrengue.
* [ ] **Estudos:** Intercâmbio, Mestrado/Doutorado ou ler artigos.
* [ ] **Pessoal:** Sonho pessoal, entender filmes/músicas ou falar com parentes estrangeiros.

**7. O que mais te atrapalha hoje?** (Seleção Única)
* [ ] Vergonha de falar (Trava).
* [ ] Entendo, mas não consigo formular as frases (Gramática).
* [ ] Sinto que meu vocabulário é muito pobre.
* [ ] Tenho dificuldade em entender o que os nativos falam (Listening).

### Bloco D: Personalização (Opcional)
*Objetivo: Wow Factor.*

**8. Tem algo específico que você gostaria de ver nessa aula experimental?** (Input Texto / Textarea)
* *Placeholder:* "Ex: Quero simular uma entrevista, aprender a pedir em restaurante..."

---

## 4. Especificação Técnica (Backend Simplificado - Log)

Nesta fase (MVP), **não utilizaremos banco de dados SQL**. O sistema deve operar via registro em arquivo de texto.

1.  **Script de Processamento:**
    * Criar um script no servidor (PHP, Node, etc) que receba a requisição `POST`.
2.  **Armazenamento (Arquivo Plano):**
    * Os dados devem ser escritos em um arquivo `.csv` ou `.txt` hospedado no servidor.
    * *Nome sugerido:* `leads_anywhere_db.csv` (Proteger este arquivo contra acesso público direto via navegador).
3.  **Estrutura da Linha de Dados (Append):**
    * O script deve adicionar uma nova linha para cada lead, usando um separador seguro (ex: pipe `|` ou ponto e vírgula `;`).
    * **Formato:**
      ```text
      DATA_HORA | NOME | WHATSAPP | EMAIL | NIVEL | HISTORICO | OBJETIVO | DOR | PEDIDO_EXTRA
      ```
4.  **Tratamento de Erros:**
    * Caso o script não consiga gravar o arquivo (permissão, etc), retornar erro para o frontend não dar falso positivo.

---

## 5. Comportamento Final

* **Botão de Enviar (CTA):**
    * Texto: **"Solicitar minha Aula Experimental"**
    * Estilo: Fundo Laranja, Texto Branco, Negrito.
* **Validação:**
    * Bloquear envio se "Nome" ou "WhatsApp" estiverem vazios.
* **Tela de Sucesso (Thank You Page):**
    * Após o sucesso da gravação (`200 OK`), exibir modal ou mensagem:
    > "Recebemos seu perfil, [Nome]! Um de nossos consultores está analisando suas respostas para selecionar o professor ideal. Em breve entraremos em contato pelo WhatsApp."