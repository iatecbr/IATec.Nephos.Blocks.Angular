/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · card.meta.ts — PILOTO #3
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → contêiner usado direto do PrimeNG (p-card).
 * Este piloto testa o contrato num CONTÊINER: o valor está nos SLOTS
 * (cabeçalho, título, subtítulo, conteúdo, rodapé). É a ponte para os
 * "blocos" — ensina o Moses a COMPOR, não só a escolher.
 *
 * Saída do Moses = HTML semântico: um `<article>`/`<section>` com um
 * título de verdade (`<h.>`), o conteúdo e, se houver, um rodapé de ações.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const cardMeta: NephosComponentMeta = {
  identity: {
    id: 'card',
    name: 'Card',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Contêiner de moldura leve que agrupa informação relacionada sobre um único assunto.',
    whenToUse: [
      'Resumir um item dentro de uma lista ou grade (um produto, um usuário, um relatório).',
      'Agrupar um bloco de conteúdo com um título e, opcionalmente, ações no rodapé.',
    ],
    whenNotToUse: [
      'Dado tabular (linhas e colunas) — use Table.',
      'Seção grande da página que expande/recolhe — use Panel; agrupar campos de formulário — use Fieldset.',
      'Só para dar sombra ou margem a algo — isso é espaçamento, não um Card.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'header',
        type: 'string',
        default: '—',
        description: 'Título curto do card. Alternativa ao slot `title` quando é só texto. Vira um cabeçalho de verdade (`<h.>`) no HTML.',
      },
      {
        name: 'subheader',
        type: 'string',
        default: '—',
        description: 'Linha de apoio abaixo do título (categoria, data, autor). Opcional.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'header', accepts: 'mídia no topo (imagem/ilustração) — opcional', optional: true },
      { name: 'title', accepts: 'título do card, se não usar o input `header`', optional: true },
      { name: 'subtitle', accepts: 'linha de apoio, se não usar `subheader`', optional: true },
      { name: 'content', accepts: 'o conteúdo principal do card (texto, dados, componentes)' },
      { name: 'footer', accepts: 'ações do card (botões/links) — opcional', optional: true },
    ],
    states: ['default'],
    invalidCombinations: [
      {
        combo: 'Card sem slot `content` (só header/footer)',
        porque: 'Card existe para apresentar CONTEÚDO; sem ele vira uma moldura vazia sem propósito.',
      },
      {
        combo: 'Card dentro de Card',
        porque: 'Moldura dentro de moldura embaralha a hierarquia e engorda a interface sem ganho.',
      },
    ],
  },

  relationships: {
    parents: ['dataview', 'grid', 'page'],
    children: ['button', 'tag', 'avatar', 'image', 'divider'],
    commonlyUsedWith: ['button', 'tag'],
    partOfPatterns: ['item-summary', 'dashboard-tile', 'listing'],
  },

  tokens: {
    // origin: 'primeng' → fundo, borda, raio e elevação vêm do PrimeNG (content.*).
    typography: 'title-sm', // do título; conteúdo usa body-lg
    byState: {
      default: {
        background: 'surface/0',
        border: 'surface/200',
        text: 'surface/text',
        'text-suave': 'surface/muted',
      },
    },
    note: 'Padding, raio e sombra do card herdam do PrimeNG (content.background/borderColor/borderRadius e elevação). Nada de hex, px ou nome de marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca aninhar um Card dentro de outro Card.',
      porque: 'Cria molduras dentro de molduras, polui a hierarquia e desperdiça espaço.',
      emVezDisso: 'Separar seções internas com um Divider ou apenas com espaçamento.',
    },
    {
      regra: 'Nunca tornar o Card inteiro clicável (um clique no bloco todo).',
      porque: 'Esconde qual é a ação, quebra a semântica e a navegação por teclado.',
      emVezDisso: 'Uma ação explícita dentro do card — um botão ou um link no título/rodapé.',
    },
    {
      regra: 'Nunca empilhar vários botões de ênfase no rodapé.',
      porque: 'Destrói a hierarquia de decisão — a pessoa não sabe qual é a ação principal.',
      emVezDisso: 'Uma ação primária + as demais em menor ênfase (outline/text).',
    },
    {
      regra: 'Nunca usar Card só pela sombra ou pela margem.',
      porque: 'Card serve para AGRUPAR conteúdo relacionado; usá-lo por decoração infla a tela.',
      emVezDisso: 'Usar o espaçamento do sistema ou um contêiner simples sem moldura.',
    },
  ],

  examples: {
    angular: `<p-card header="Relatório mensal" subheader="Junho de 2026">
  <p>Resumo do desempenho do mês.</p>
  <ng-template pTemplate="footer">
    <p-button label="Abrir" severity="primary" />
  </ng-template>
</p-card>`,
    html: `<article data-block="card">
  <h3>Relatório mensal</h3>
  <p data-role="subtitle">Junho de 2026</p>
  <div data-slot="content"><p>Resumo do desempenho do mês.</p></div>
  <footer data-slot="footer">
    <button type="button" data-variant="primary">Abrir</button>
  </footer>
</article>`,
    inContext: `<!-- lista de cards numa grade: cada item é um resumo -->
<section data-block="listing" aria-label="Relatórios">
  <article data-block="card">
    <h3>Relatório mensal</h3>
    <div data-slot="content"><p>Resumo de junho.</p></div>
    <footer data-slot="footer">
      <button type="button" data-variant="text">Detalhes</button>
      <button type="button" data-variant="primary">Abrir</button>
    </footer>
  </article>
  <!-- …mais cards… -->
</section>`,
  },

  a11y: {
    role: 'region/article',
    keyboard: ['sem teclas próprias — o foco vai para os elementos interativos de dentro'],
    requiredAria: [
      'um título de verdade dentro (`<h2>`…`<h4>` conforme o nível da página)',
      'quando é uma região destacada, ligar o rótulo ao título (aria-labelledby)',
    ],
    contrastMin: '4.5:1 do texto sobre o fundo do card; borda perceptível se for o único limite',
  },

  aiHints: {
    keywords: [
      'cartão', 'cartao', 'card', 'bloco', 'tile', 'resumo', 'item',
      'painel de resumo', 'ficha', 'container', 'contêiner',
    ],
    selectionCriteria:
      'Escolha o Card para agrupar informação relacionada sobre UM assunto num contêiner de moldura leve — típico de um item numa lista/grade ou um bloco de conteúdo com ações. Se é dado tabular, use Table; se é uma seção grande que recolhe, use Panel.',
    disambiguation: [
      { confundeCom: 'panel', criterio: 'Panel é uma seção maior, geralmente com cabeçalho e recolher/expandir; Card é um bloco de resumo, sem recolher.' },
      { confundeCom: 'fieldset', criterio: 'Fieldset agrupa CAMPOS de um formulário com legenda; Card agrupa conteúdo em geral.' },
      { confundeCom: 'table', criterio: 'Se a informação são linhas e colunas comparáveis, use Table, não vários Cards.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/card',
    figmaNode: 'https://www.figma.com/design/mHUXdyDZ820suwIRIIlp9Z/PrimeOne-4.0.0', // grupo "card"
    storybookId: 'organisms-card',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Só a cor da marca entra pelo tema.',
  },
};
