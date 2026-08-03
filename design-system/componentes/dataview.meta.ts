/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · dataview.meta.ts — ONDA "DADOS" (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-dataview`. API lida do código real
 * (primeng@21.0.2, `types/primeng-dataview.d.ts`).
 *
 * A "irmã" da DataTable: os MESMOS dados, mas cada item é desenhado
 * livremente (cartão no `grid`, linha rica no `list`) — sem a estrutura
 * de colunas comparáveis. Paginação/ordenação iguais às da tabela.
 * Saída = uma LISTA semântica de itens (cada item um `<article>`),
 * não uma `<table>`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const dataViewMeta: NephosComponentMeta = {
  identity: {
    id: 'dataview',
    name: 'DataView',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Lista de itens em cartões (grid) ou linhas ricas (list), com paginação e ordenação.',
    whenToUse: [
      'Exibir uma coleção onde cada item é visual/heterogêneo (produtos, escolas, pessoas) — não colunas comparáveis.',
      'Oferecer troca entre visão em grade (cartões) e em lista.',
    ],
    whenNotToUse: [
      'Dados comparáveis coluna a coluna, com ordenar/filtrar por campo — use DataTable.',
      'Poucos itens fixos sem paginação/ordenação — uma lista simples basta.',
      'Hierarquia pai/filho — use Tree/TreeTable.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'value',
        type: 'any[]',
        default: '[]',
        description: 'A coleção de itens (um por cartão/linha). Obrigatório. Em modo lazy, é a fatia da página atual.',
      },
      {
        name: 'layout',
        type: "'list' | 'grid'",
        default: 'list',
        description: 'Como desenhar: `list` (linhas ricas, uma por item) ou `grid` (cartões lado a lado, responsivo). Cada layout tem seu template.',
      },
      {
        name: 'paginator',
        type: 'boolean',
        default: 'false',
        description: 'Liga a paginação (mesmo padrão da ficha `paginator`). Acompanha `rows`, `rowsPerPageOptions`, `paginatorPosition` (top/bottom/both).',
      },
      {
        name: 'rows',
        type: 'number',
        default: '—',
        description: 'Itens por página.',
      },
      {
        name: 'rowsPerPageOptions',
        type: 'number[]',
        default: '—',
        description: 'Opções de "itens por página" (ex.: [12, 24, 48]).',
      },
      {
        name: 'lazy',
        type: 'boolean',
        default: 'false',
        description: 'Carregamento sob demanda (servidor): a cada página/ordenação dispara `onLazyLoad`. Use para coleções grandes — não trazer tudo de uma vez.',
      },
      {
        name: 'totalRecords',
        type: 'number',
        default: '—',
        description: 'Total no servidor (base do paginador em modo lazy).',
      },
      {
        name: 'sortField',
        type: 'string',
        default: '—',
        description: 'Campo de ordenação. A troca de ordem costuma vir de um Select ("Ordenar por…") fora da DataView.',
      },
      {
        name: 'sortOrder',
        type: 'number (1 | -1)',
        default: '—',
        description: 'Direção: 1 crescente, -1 decrescente.',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Estado de carregando (marcar a região como ocupada; combinar com Skeleton).',
      },
      {
        name: 'emptyMessage',
        type: 'string',
        default: '—',
        description: 'Texto quando não há itens. Preferir o bloco `empty-state` via o template `empty`.',
      },
    ],
    outputs: [
      { name: 'onLazyLoad', payload: '{ first, rows, sortField, sortOrder }', description: 'Modo lazy: pede a fatia ao servidor a cada página/ordenação.' },
      { name: 'onPage', payload: '{ first, rows }', description: 'Mudou de página (modo não-lazy).' },
      { name: 'onSort', payload: '{ sortField, sortOrder }', description: 'Mudou a ordenação.' },
      { name: 'onChangeLayout', payload: "{ layout: 'list' | 'grid' }", description: 'Trocou entre grade e lista.' },
    ],
    slots: [
      { name: 'header', accepts: 'ng-template pTemplate="header" — barra superior (ordenar, alternar layout)', optional: true },
      { name: 'list', accepts: 'ng-template pTemplate="list" — como desenhar os itens no layout lista', optional: true },
      { name: 'grid', accepts: 'ng-template pTemplate="grid" — como desenhar os cartões no layout grade', optional: true },
      { name: 'empty', accepts: 'ng-template pTemplate="empty" — estado vazio (usar o bloco empty-state)', optional: true },
    ],
    states: ['default', 'loading', 'empty', 'sorted', 'paginated'],
    invalidCombinations: [
      {
        combo: 'lazy=true sem tratar `onLazyLoad`',
        porque: 'Os itens nunca são buscados/atualizados ao paginar ou ordenar.',
      },
      {
        combo: 'usar DataView para dados comparáveis coluna a coluna',
        porque: 'Sem colunas alinhadas, comparar valores entre itens fica difícil — esse caso é DataTable.',
      },
      {
        combo: 'alternar layout sem estado acessível no controle',
        porque: 'O botão que troca grade/lista precisa expor qual está ativo (aria-pressed) para o leitor de tela.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'page'],
    children: ['card', 'paginator', 'select', 'selectbutton', 'button', 'skeleton', 'empty-state', 'image', 'tag'],
    commonlyUsedWith: ['card', 'paginator', 'search-input', 'select'],
    partOfPatterns: ['catalog', 'search-results', 'gallery'],
  },

  tokens: {
    typography: 'body-lg (itens)',
    byState: {
      default: { text: 'surface/text', border: 'surface/200' },
      hover: { item: 'surface/100' },
    },
    note: 'Espaçamento/grade herdam do PrimeNG; cada item costuma ser um Card (ver ficha `card`). O grid é responsivo por classes de coluna do PrimeFlex/Tailwind. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar DataView quando os dados pedem comparação por coluna.',
      porque: 'Cartões soltos dificultam comparar o mesmo campo entre itens; a tabela alinha e deixa ordenar por coluna.',
      emVezDisso: 'DataTable quando as colunas importam; DataView quando cada item é uma unidade visual.',
    },
    {
      regra: 'Nunca desenhar a coleção como uma grade de `<div>` sem semântica de lista.',
      porque: 'O leitor de tela não anuncia "lista de N itens" nem navega item a item.',
      emVezDisso: 'Uma lista (`<ul>`/`<ol>`) com cada item em `<li>`/`<article>`; o cartão dentro segue a ficha `card`.',
    },
    {
      regra: 'Nunca carregar uma coleção enorme de uma vez.',
      porque: 'Trava a tela por itens que a pessoa nem vai rolar.',
      emVezDisso: 'Modo `lazy` (paginação/ordenação no servidor) ou paginação local.',
    },
    {
      regra: 'Nunca deixar o alternador grade/lista sem estado acessível.',
      porque: 'Sem aria-pressed, quem usa leitor de tela não sabe qual visão está ativa.',
      emVezDisso: 'SelectButton (ou dois botões) com aria-pressed indicando o layout atual.',
    },
  ],

  examples: {
    angular: `<p-dataview [value]="escolas" [layout]="layout"
  [paginator]="true" [rows]="12" [rowsPerPageOptions]="[12,24,48]"
  [sortField]="sortField" [sortOrder]="sortOrder">

  <ng-template pTemplate="header">
    <!-- Select "Ordenar por…" + alternador de layout (SelectButton) -->
  </ng-template>

  <ng-template pTemplate="grid" let-items>
    <article *ngFor="let e of items" class="card">
      <h3>{{ e.escola }}</h3>
      <p-tag [value]="e.status" [severity]="e.severity" />
    </article>
  </ng-template>

  <ng-template pTemplate="empty"><!-- bloco empty-state --></ng-template>
</p-dataview>`,
    html: `<section aria-label="Escolas">
  <ul class="dataview-grid">
    <li>
      <article class="card">
        <h3>Colégio Adventista de Salvador</h3>
        <span class="tag" data-severity="warn">Faltando</span>
      </article>
    </li>
    <li>
      <article class="card">
        <h3>Colégio Adventista de Liberdade</h3>
        <span class="tag" data-severity="success">Atingiu</span>
      </article>
    </li>
  </ul>
</section>`,
    inContext: `<!-- catálogo: ordenar + alternar visão + grade paginada -->
<section data-block="catalog" aria-label="Escolas do campo">
  <div class="toolbar">
    <label for="ord">Ordenar por</label>
    <select id="ord"><option>Nome</option><option>Status</option></select>
    <div role="group" aria-label="Modo de exibição">
      <button type="button" aria-pressed="true" aria-label="Grade">▦</button>
      <button type="button" aria-pressed="false" aria-label="Lista">☰</button>
    </div>
  </div>
  <ul class="dataview-grid"><!-- itens em <li><article> --></ul>
  <nav aria-label="Paginação"><!-- ver ficha paginator --></nav>
</section>`,
  },

  a11y: {
    role: 'list de itens (region com nome); cada item um article',
    keyboard: [
      'Tab percorre os controles (ordenar, alternar, paginar) e os links/ações de cada item',
      'alternador de layout com Enter/Espaço',
    ],
    requiredAria: [
      'região com nome (aria-label) dizendo o que a coleção lista',
      'lista semântica (`<ul>`/`<li>`), não grade de `<div>`',
      'alternador grade/lista com aria-pressed; ordenação por controle acessível',
      'carregando com aria-busy; vazio anunciado (empty-state em role=status)',
    ],
    contrastMin: '4.5:1 do texto dos itens; 3:1 dos realces',
  },

  aiHints: {
    keywords: [
      'dataview', 'grade de itens', 'cartões', 'cartoes', 'cards', 'catálogo', 'catalogo',
      'galeria de itens', 'lista de cards', 'grid de itens', 'coleção', 'colecao', 'listagem visual',
    ],
    selectionCriteria:
      'Escolha DataView para uma coleção onde cada item é uma unidade visual (cartões/linhas ricas), com paginação/ordenação e troca grade↔lista. Se os dados são comparáveis por coluna, use DataTable.',
    disambiguation: [
      { confundeCom: 'datatable', criterio: 'DataTable = colunas comparáveis (ordenar/filtrar por campo); DataView = itens visuais soltos.' },
      { confundeCom: 'card', criterio: 'Card é UM contêiner; DataView é a coleção paginada de vários (cada um costuma ser um Card).' },
      { confundeCom: 'list', criterio: 'Lista simples para poucos itens fixos; DataView quando há paginação/ordenação/layout.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/dataview',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Itens por template (list/grid); saída = lista semântica de `<article>`; paginação reusa `paginator`, vazio reusa `empty-state`, carregando reusa `skeleton`, cada item reusa `card`.',
  },
};
