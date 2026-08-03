/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · paginator.meta.ts — ONDA 4 (navegação)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-paginator`. API lida do código real
 * (primeng@21.0.2, `types/primeng-paginator.d.ts`).
 *
 * Divide uma lista/tabela grande em páginas e navega entre elas. O
 * "pagination item" (número de página, ‹ ›) é PARTE dele, não ficha
 * própria. Saída = `<nav aria-label="Paginação">` com botões.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const paginatorMeta: NephosComponentMeta = {
  identity: {
    id: 'paginator',
    name: 'Paginator',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Navega por páginas de uma lista ou tabela grande.',
    whenToUse: [
      'Conjuntos grandes de dados divididos em páginas (tabela, resultados de busca).',
      'Quando a pessoa precisa saber o total e pular para páginas específicas.',
    ],
    whenNotToUse: [
      'Listas curtas que cabem numa tela — não paginar.',
      'Feeds de rolagem contínua — usar carregamento incremental.',
      'Passos de um fluxo — isso é Stepper.',
    ],
  },

  api: {
    inputs: [
      { name: 'totalRecords', type: 'number', default: '0', description: 'Total de registros (base para calcular o número de páginas).' },
      { name: 'rows', type: 'number', default: '0', description: 'Quantos registros por página.' },
      { name: 'first', type: 'number', default: '0', description: 'Índice do primeiro registro da página atual (0-based). É o estado que controla a página exibida.' },
      { name: 'rowsPerPageOptions', type: 'number[]', default: '—', description: 'Opções de "itens por página" (ex.: [10, 20, 50]). Mostra um seletor.' },
      { name: 'pageLinkSize', type: 'number', default: '5', description: 'Quantos números de página aparecem de uma vez.' },
      { name: 'showCurrentPageReport', type: 'boolean', default: 'false', description: 'Mostra um resumo ("11–20 de 340"). Ajuda a situar; usar currentPageReportTemplate para o texto.' },
      { name: 'showFirstLastIcon', type: 'boolean', default: 'true', description: 'Mostra os botões "primeira/última página".' },
      { name: 'alwaysShow', type: 'boolean', default: 'true', description: 'Se false, esconde o paginador quando há só uma página. Recomendado false para não poluir.' },
    ],
    outputs: [
      { name: 'onPageChange', payload: '{ first, rows, page, pageCount }', description: 'Emitido ao mudar de página ou de itens-por-página. É onde se busca a nova fatia de dados.' },
    ],
    slots: [
      { name: 'currentPageReport', accepts: 'template do resumo "X de Y"', optional: true },
    ],
    states: ['default', 'first-page', 'last-page'],
    invalidCombinations: [
      {
        combo: 'botões "anterior/primeira" ativos na primeira página',
        porque: 'Não há para onde voltar; o controle precisa ficar desabilitado nos extremos.',
      },
      {
        combo: 'paginar uma lista que cabe inteira na tela',
        porque: 'Acrescenta cliques e complexidade sem benefício.',
      },
    ],
  },

  relationships: {
    parents: ['table', 'dataview', 'list'],
    children: ['button'],
    commonlyUsedWith: ['table', 'select'],
    partOfPatterns: ['data-table', 'search-results'],
  },

  tokens: {
    typography: 'body-sm',
    byState: {
      default: { text: 'surface/text', link: 'surface/text' },
      current: { background: 'primary/color', text: 'surface/0' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Página atual = destaque com a ênfase da marca (primary); demais = neutro. Espaçamento herda do PrimeNG. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar "anterior/próxima" clicáveis nos extremos.',
      porque: 'Sugere navegação que não existe e frustra.',
      emVezDisso: 'Desabilitar (e marcar aria-disabled) o controle no início/fim.',
    },
    {
      regra: 'Nunca omitir onde a pessoa está no total.',
      porque: 'Sem "página X de Y" (ou "11–20 de 340") a pessoa se perde num conjunto grande.',
      emVezDisso: 'Mostrar a página atual (aria-current="page") e, quando útil, o resumo do intervalo.',
    },
    {
      regra: 'Nunca marcar a página atual só pela cor.',
      porque: 'Quem não distingue cores não sabe em qual página está.',
      emVezDisso: 'aria-current="page" no botão da página atual, além do destaque visual.',
    },
  ],

  examples: {
    angular: `<p-paginator [rows]="20" [totalRecords]="340" [first]="first"
  [rowsPerPageOptions]="[10, 20, 50]" [showCurrentPageReport]="true"
  currentPageReportTemplate="{first}–{last} de {totalRecords}"
  (onPageChange)="carregarPagina($event)" />`,
    html: `<nav aria-label="Paginação">
  <button type="button" aria-label="Página anterior" disabled>‹</button>
  <button type="button" aria-label="Página 1" aria-current="page">1</button>
  <button type="button" aria-label="Página 2">2</button>
  <button type="button" aria-label="Página 3">3</button>
  <button type="button" aria-label="Próxima página">›</button>
  <span aria-live="polite">1–20 de 340</span>
</nav>`,
    inContext: `<!-- paginador abaixo de uma tabela -->
<table>…</table>
<nav aria-label="Paginação da tabela">
  <button type="button" aria-label="Página anterior" disabled>‹</button>
  <button type="button" aria-current="page" aria-label="Página 1">1</button>
  <button type="button" aria-label="Página 2">2</button>
  <button type="button" aria-label="Próxima página">›</button>
</nav>`,
  },

  a11y: {
    role: 'navigation (landmark) com botões',
    keyboard: ['Tab percorre os controles', 'Enter/Espaço ativa', 'controles desabilitados são pulados'],
    requiredAria: [
      '`<nav aria-label="Paginação">`',
      'aria-current="page" no botão da página atual',
      'nome acessível em cada botão (aria-label "Página N", "Próxima página")',
      'aria-disabled/disabled nos extremos',
    ],
    contrastMin: '4.5:1 dos números/rótulos; 3:1 do destaque da página atual',
  },

  aiHints: {
    keywords: [
      'paginator', 'paginação', 'paginacao', 'páginas', 'paginas', 'próxima página',
      'proxima pagina', 'anterior', 'itens por página', 'page', 'navegar páginas',
    ],
    selectionCriteria:
      'Escolha Paginator para navegar por páginas de uma lista/tabela grande, mostrando o total. Listas curtas não paginam; feeds contínuos usam carregamento incremental.',
    disambiguation: [
      { confundeCom: 'stepper', criterio: 'Stepper = etapas de tarefa; Paginator = fatias de um mesmo conjunto de dados.' },
      { confundeCom: 'tabs', criterio: 'Tabs alternam vistas diferentes; Paginator mostra mais do MESMO conjunto.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/paginator',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída = `<nav>` + botões; ícones ‹ › seguem `icon.meta.ts`.',
  },
};
