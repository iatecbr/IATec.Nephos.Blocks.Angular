/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · datatable.meta.ts — ONDA "DADOS" (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-table` (a DataTable). API lida do código real
 * (primeng@21.0.2, `types/primeng-table.d.ts`).
 *
 * ⚠️ É o componente mais RICO do kit: colunas por template
 * (`ng-template pTemplate="header|body|…"`) + diretivas auxiliares
 * (`pSortableColumn`, `pSelectableRow`, `pEditableColumn`, …). Esta ficha
 * documenta o NÚCLEO que aparece na maioria das telas; recursos avançados
 * (agrupar linhas, redimensionar/reordenar colunas, editar célula/linha,
 * colunas congeladas, menu de contexto, salvar estado) existem e estão
 * apontados no `note` e nas referências — não se reescreve nada.
 *
 * Saída do Moses = `<table>` SEMÂNTICO (caption/thead/th scope/tbody),
 * nunca uma grade de `<div>`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const dataTableMeta: NephosComponentMeta = {
  identity: {
    id: 'datatable',
    name: 'DataTable',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Tabela de dados com ordenação, filtro, paginação e seleção.',
    whenToUse: [
      'Mostrar muitos registros em linhas e colunas comparáveis (listagens, relatórios).',
      'Quando a pessoa precisa ordenar, filtrar, paginar ou selecionar linhas.',
    ],
    whenNotToUse: [
      'Poucos itens sem comparação coluna a coluna — uma lista simples serve.',
      'Layout de página (posicionar blocos) — tabela é para DADOS tabulares, não para diagramar.',
      'Um único registro/detalhe — use um cartão ou lista de definição.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'value',
        type: 'any[]',
        default: '[]',
        description: 'Os dados (uma linha por item). Obrigatório. Em modo lazy, é a fatia da página atual.',
      },
      {
        name: 'dataKey',
        type: 'string',
        default: '—',
        description: 'Campo que identifica cada linha de forma única (ex.: "id"). NECESSÁRIO para seleção, expansão e edição funcionarem de forma confiável.',
      },
      {
        name: 'paginator',
        type: 'boolean',
        default: 'false',
        description: 'Liga a paginação. Acompanha `rows`, `rowsPerPageOptions` e (opcional) `showCurrentPageReport`. Usa o mesmo padrão da ficha `paginator`.',
      },
      {
        name: 'rows',
        type: 'number',
        default: '—',
        description: 'Quantas linhas por página.',
      },
      {
        name: 'rowsPerPageOptions',
        type: 'number[]',
        default: '—',
        description: 'Opções de "linhas por página" (ex.: [10, 25, 50]).',
      },
      {
        name: 'lazy',
        type: 'boolean',
        default: 'false',
        description: 'Carregamento sob demanda (servidor): a cada página/ordenação/filtro dispara `onLazyLoad` para buscar só a fatia certa. ESSENCIAL para bases grandes — evita trazer tudo de uma vez.',
      },
      {
        name: 'totalRecords',
        type: 'number',
        default: '0',
        description: 'Total de registros no servidor (base do paginador em modo lazy).',
      },
      {
        name: 'sortMode',
        type: "'single' | 'multiple'",
        default: 'single',
        description: 'Ordenar por uma coluna ou por várias (com prioridade). As colunas ordenáveis usam a diretiva `pSortableColumn="campo"`.',
      },
      {
        name: 'selectionMode',
        type: "'single' | 'multiple'",
        default: '—',
        description: 'Permite selecionar linha(s). Requer `dataKey` e `[(selection)]`. Múltipla costuma usar checkbox por linha + no cabeçalho.',
      },
      {
        name: 'globalFilterFields',
        type: 'string[]',
        default: '—',
        description: 'Campos que o filtro global (busca única) considera. Filtros por coluna usam a API de `filters`.',
      },
      {
        name: 'scrollable',
        type: 'boolean',
        default: 'false',
        description: 'Rolagem interna com cabeçalho fixo. Combine com `scrollHeight` (ex.: "400px" ou "flex").',
      },
      {
        name: 'virtualScroll',
        type: 'boolean',
        default: 'false',
        description: 'Renderiza só as linhas visíveis (listas enormes). Alternativa ao paginador quando a rolagem contínua faz mais sentido.',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Mostra o estado de carregando (marcar a região como ocupada; combinar com Skeleton ou spinner).',
      },
      {
        name: 'size',
        type: "'small' | 'large'",
        default: '(normal)',
        description: 'Densidade das linhas. `small` para tabelas densas.',
      },
      {
        name: 'stripedRows / showGridlines / rowHover',
        type: 'boolean',
        default: 'false',
        description: 'Ajustes visuais: linhas zebradas, linhas de grade e realce ao passar o mouse. `rowHover` sem `selectionMode` não deve sugerir clique.',
      },
    ],
    outputs: [
      { name: 'onLazyLoad', payload: 'TableLazyLoadEvent { first, rows, sortField, sortOrder, filters }', description: 'Modo lazy: pede a fatia de dados ao servidor a cada página/ordenação/filtro. É AQUI que se busca os dados.' },
      { name: 'onPage', payload: '{ first, rows }', description: 'Mudou de página (modo não-lazy).' },
      { name: 'onSort', payload: '{ field, order }', description: 'Mudou a ordenação.' },
      { name: 'onFilter', payload: '{ filters, filteredValue }', description: 'Mudou um filtro.' },
      { name: 'onRowSelect', payload: '{ originalEvent, data, type }', description: 'Uma linha foi selecionada.' },
      { name: 'onRowUnselect', payload: '{ originalEvent, data, type }', description: 'Uma linha foi desmarcada.' },
      { name: 'onRowExpand', payload: '{ originalEvent, data }', description: 'Linha expandida (detalhe).' },
      { name: 'onEditComplete', payload: '{ field, data, index }', description: 'Edição de célula/linha concluída (quando editMode ativo).' },
    ],
    slots: [
      { name: 'caption', accepts: 'ng-template pTemplate="caption" — título/toolbar da tabela (busca, ações)', optional: true },
      { name: 'header', accepts: 'ng-template pTemplate="header" — a linha de cabeçalhos (<th>), com pSortableColumn', optional: true },
      { name: 'body', accepts: 'ng-template pTemplate="body" — como cada linha/célula é desenhada', optional: true },
      { name: 'footer', accepts: 'ng-template pTemplate="footer" — rodapé (totais)', optional: true },
      { name: 'emptymessage', accepts: 'ng-template pTemplate="emptymessage" — estado vazio (usar o bloco empty-state)', optional: true },
      { name: 'expandedrow', accepts: 'ng-template pTemplate="expandedrow" — conteúdo do detalhe expandido', optional: true },
    ],
    states: ['default', 'loading', 'empty', 'sorted', 'filtered', 'paginated', 'row-selected'],
    invalidCombinations: [
      {
        combo: 'selectionMode/expansão/edição sem `dataKey`',
        porque: 'Sem uma chave única por linha, a tabela perde a identidade das linhas — seleção e expansão "pulam" ao paginar/ordenar.',
      },
      {
        combo: 'lazy=true sem tratar `onLazyLoad`',
        porque: 'Os dados nunca são buscados/atualizados ao paginar, ordenar ou filtrar — a tabela fica parada.',
      },
      {
        combo: 'paginator=true sem `rows`',
        porque: 'Sem o tamanho da página, não há como dividir os registros.',
      },
      {
        combo: 'montar a grade com `<div>` em vez de `<table>`',
        porque: 'Perde a semântica de tabela: leitor de tela não associa célula↔cabeçalho e a navegação por tabela some.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'page', 'dialog'],
    children: ['paginator', 'checkbox', 'button', 'icon-button', 'inputtext', 'select', 'tag', 'skeleton', 'empty-state'],
    commonlyUsedWith: ['search-input', 'paginator', 'toolbar', 'select', 'tag'],
    partOfPatterns: ['data-table', 'search-results', 'list-management'],
  },

  tokens: {
    typography: 'body-sm (denso) ou body-lg',
    byState: {
      default: { headerText: 'surface/text', border: 'surface/200', text: 'surface/text' },
      striped: { rowAlt: 'surface/50' },
      hover: { row: 'surface/100' },
      selected: { row: 'primary/50', text: 'primary/color' },
      sortedHeader: { text: 'primary/color' },
    },
    note: 'Cabeçalho/linhas herdam os tokens de tabela do PrimeNG. Linha selecionada = destaque suave da marca (highlight). Não usar só cor para status de linha — usar Tag/ícone + texto. RECURSOS AVANÇADOS (não detalhados aqui, existem no p-table): agrupar linhas (pRowGroupHeader), redimensionar/reordenar colunas (pResizableColumn/pReorderableColumn), editar célula/linha (pEditableColumn/editMode), colunas congeladas (pFrozenColumn/frozenValue), menu de contexto (pContextMenuRow), salvar estado (stateStorage). Ver primeng.org/table.',
  },

  antiPatterns: [
    {
      regra: 'Nunca construir a tabela com `<div>` em vez de `<table>`.',
      porque: 'Sem a semântica de tabela, a tecnologia assistiva não liga cada célula ao seu cabeçalho e a navegação por tabela deixa de existir.',
      emVezDisso: '`<table>` com `<caption>`, `<thead>`, `<th scope="col">`, `<tbody>` — o p-table já emite isso.',
    },
    {
      regra: 'Nunca sinalizar ordenação/filtro só visualmente.',
      porque: 'Uma setinha colorida não é anunciada; quem usa leitor de tela não sabe por qual coluna está ordenado.',
      emVezDisso: 'Cabeçalho ordenável como `<button>` com `aria-sort` ("ascending/descending/none") e o filtro com controle acessível.',
    },
    {
      regra: 'Nunca carregar uma base enorme de uma vez.',
      porque: 'Trava a tela e o navegador; a pessoa espera à toa por dados que nem vai ver.',
      emVezDisso: 'Modo `lazy` (paginação/ordenação/filtro no servidor) ou `virtualScroll`.',
    },
    {
      regra: 'Nunca marcar status/seleção de linha só pela cor.',
      porque: 'Quem não distingue cores não percebe o estado da linha.',
      emVezDisso: 'Checkbox real para seleção (com aria) e Tag/ícone + texto para status.',
    },
    {
      regra: 'Nunca deixar a tabela sem cabeçalhos de coluna nem descrição.',
      porque: 'Sem `<th>`/caption, cada célula vira um dado solto sem significado.',
      emVezDisso: 'Cabeçalhos com `scope="col"` e um `<caption>` (pode ser visualmente discreto) dizendo o que a tabela lista.',
    },
  ],

  examples: {
    angular: `<p-table [value]="bolsas" dataKey="id"
  [paginator]="true" [rows]="10" [rowsPerPageOptions]="[10,25,50]"
  sortMode="single" [globalFilterFields]="['escola','campo']" [rowHover]="true">

  <ng-template pTemplate="caption">
    <div class="tbl-toolbar">
      <h2>Bolsas por escola</h2>
      <!-- busca global: ver ficha search-input -->
    </div>
  </ng-template>

  <ng-template pTemplate="header">
    <tr>
      <th pSortableColumn="escola">Escola <p-sortIcon field="escola" /></th>
      <th pSortableColumn="integrais">Integrais <p-sortIcon field="integrais" /></th>
      <th>Status</th>
    </tr>
  </ng-template>

  <ng-template pTemplate="body" let-row>
    <tr>
      <td>{{ row.escola }}</td>
      <td>{{ row.integrais }}</td>
      <td><p-tag [value]="row.status" [severity]="row.severity" /></td>
    </tr>
  </ng-template>

  <ng-template pTemplate="emptymessage">
    <tr><td colspan="3"><!-- bloco empty-state --></td></tr>
  </ng-template>
</p-table>`,
    html: `<table>
  <caption>Bolsas por escola — Associação Bahia</caption>
  <thead>
    <tr>
      <th scope="col" aria-sort="ascending">
        <button type="button">Escola <span aria-hidden="true">▲</span></button>
      </th>
      <th scope="col" aria-sort="none">
        <button type="button">Integrais</button>
      </th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Colégio Adventista de Salvador</td>
      <td>360</td>
      <td><span class="tag" data-severity="warn">Faltando</span></td>
    </tr>
  </tbody>
</table>`,
    inContext: `<!-- padrão "data-table": busca + tabela + paginação (a forma do Mapa de Bolsas) -->
<section data-block="data-table" aria-label="Bolsas por escola">
  <form role="search">
    <label for="q" class="visually-hidden">Buscar escola</label>
    <input id="q" type="search" placeholder="Buscar escola…" />
  </form>

  <table>
    <caption class="visually-hidden">Bolsas por escola</caption>
    <thead>
      <tr>
        <th scope="col" aria-sort="none"><button type="button">Escola</button></th>
        <th scope="col" aria-sort="none"><button type="button">Integrais</button></th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody><!-- linhas --></tbody>
  </table>

  <nav aria-label="Paginação da tabela"><!-- ver ficha paginator --></nav>
</section>`,
  },

  a11y: {
    role: 'table (nativo) com cabeçalhos associados',
    keyboard: [
      'Tab percorre os controles (ordenar, selecionar, paginar)',
      'cabeçalho ordenável é <button>: Enter/Espaço ordena',
      'seleção por checkbox navegável por teclado',
    ],
    requiredAria: [
      '`<table>` real com `<caption>`, `<thead>`, `<th scope="col">`, `<tbody>`',
      'coluna ordenada com `aria-sort` (ascending/descending/none)',
      'estado de carregando com aria-busy; tabela vazia anunciada (empty-state em role=status)',
      'seleção por checkbox com rótulo por linha ("Selecionar <linha>") e no cabeçalho ("Selecionar todos")',
    ],
    contrastMin: '4.5:1 do texto das células e cabeçalhos; 3:1 das bordas/realce de linha selecionada',
  },

  aiHints: {
    keywords: [
      'tabela', 'table', 'datatable', 'grade de dados', 'grid', 'listagem', 'listar',
      'relatório', 'relatorio', 'colunas', 'linhas', 'ordenar', 'filtrar', 'paginar', 'registros',
    ],
    selectionCriteria:
      'Escolha DataTable para exibir muitos registros comparáveis em colunas, com ordenar/filtrar/paginar/selecionar. Para bases grandes use lazy (servidor). Poucos itens sem comparação = lista simples; layout de página ≠ tabela.',
    disambiguation: [
      { confundeCom: 'dataview', criterio: 'DataView mostra os itens como cards/lista flexível; DataTable é grade de colunas comparáveis.' },
      { confundeCom: 'treetable', criterio: 'Se os dados têm hierarquia (pai/filho expansível), é TreeTable; DataTable é plana.' },
      { confundeCom: 'list', criterio: 'Lista simples para poucos itens sem colunas; DataTable quando as colunas importam.' },
      { confundeCom: 'paginator', criterio: 'Paginator é só a navegação de páginas; a DataTable já o embute via [paginator]="true".' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/table',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Colunas por template + diretivas (pSortableColumn/pSelectableRow/pEditableColumn…). Saída = `<table>` semântico; paginação reusa a ficha `paginator`, vazio reusa `empty-state`, carregando reusa `skeleton`.',
  },
};
