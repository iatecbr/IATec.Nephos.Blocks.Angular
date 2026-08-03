/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · treetable.meta.ts — ONDA "DADOS" (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-treeTable` (a TreeTable). API lida do código
 * real (primeng@21.0.2, `types/primeng-treetable.d.ts`).
 *
 * O cruzamento de DataTable + Tree: linhas em TABELA (colunas
 * comparáveis) MAS com hierarquia pai→filho expansível na primeira
 * coluna. Os dados vêm em `value` como `TreeNode[]` (cada nó tem `data`
 * com os campos das colunas + `children`). Colunas por template
 * (`ng-template pTemplate="header|body"`) + diretivas auxiliares
 * (`ttSortableColumn`, `ttSelectableRow`, `ttEditableColumn`,
 * `pTreeTableToggler`). Paginação/ordenação/filtro/seleção/edição/
 * colunas congeladas/redimensionar existem e estão apontados no `note`
 * — não se reescreve nada.
 *
 * Saída do Moses = `<table role="treegrid">` SEMÂNTICO, com as linhas
 * carregando aria-level/aria-expanded/aria-posinset — nunca uma grade
 * de `<div>`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const treeTableMeta: NephosComponentMeta = {
  identity: {
    id: 'treetable',
    name: 'TreeTable',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Tabela de colunas comparáveis cujas linhas têm hierarquia pai/filho expansível.',
    whenToUse: [
      'Dados hierárquicos que TAMBÉM têm vários campos por linha: orçamento por centro de custo, plano de contas, estrutura de arquivos com tamanho/data, WBS de projeto.',
      'Quando a pessoa precisa expandir/recolher ramos E comparar valores em colunas (ordenar, filtrar, paginar).',
      'Quando o mesmo registro tem subitens que herdam/somam para o pai.',
    ],
    whenNotToUse: [
      'Hierarquia com só o rótulo do nó (uma "coluna") — use Tree, mais leve.',
      'Dados planos em colunas, sem pai/filho — use DataTable.',
      'Escolher um nó dentro de um formulário — use TreeSelect.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'value',
        type: 'TreeNode[]',
        default: '—',
        description: 'Os dados em árvore. Obrigatório. Cada `TreeNode` traz `data` (os campos das colunas da linha), `children` (subitens), `key` (id único), `expanded` e `leaf`. Em modo lazy, é a fatia carregada.',
      },
      {
        name: 'dataKey',
        type: 'string',
        default: '—',
        description: 'Campo dentro de `data` que identifica cada linha de forma única. NECESSÁRIO para seleção, expansão e edição funcionarem de forma confiável ao paginar/ordenar/filtrar.',
      },
      {
        name: 'paginator',
        type: 'boolean',
        default: 'false',
        description: 'Liga a paginação (dos nós RAÍZ). Acompanha `rows`, `rowsPerPageOptions`, `paginatorPosition` (top/bottom/both) e `showCurrentPageReport`. Usa o mesmo padrão da ficha `paginator`.',
      },
      {
        name: 'rows',
        type: 'number',
        default: '—',
        description: 'Quantos nós raiz por página.',
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
        description: 'Carregamento sob demanda (servidor): página/ordenação/filtro e a expansão de ramos disparam `onLazyLoad`/`onNodeExpand` para buscar só o necessário. ESSENCIAL para bases grandes.',
      },
      {
        name: 'totalRecords',
        type: 'number',
        default: 'length de value',
        description: 'Total de nós raiz no servidor (base do paginador em modo lazy).',
      },
      {
        name: 'sortMode',
        type: "'single' | 'multiple'",
        default: 'single',
        description: 'Ordenar por uma coluna ou por várias (com prioridade). A ordenação respeita a hierarquia (ordena dentro de cada ramo). Colunas ordenáveis usam `ttSortableColumn="campo"`.',
      },
      {
        name: 'selectionMode',
        type: "'single' | 'multiple' | 'checkbox'",
        default: '—',
        description: 'Permite selecionar linha(s). `checkbox` mostra caixas por linha com propagação pai↔filho. Requer `dataKey` e `[(selection)]` (ou `[(selectionKeys)]`).',
      },
      {
        name: 'metaKeySelection',
        type: 'boolean',
        default: 'false',
        description: 'No modo `multiple`, se `true` exige Ctrl/Meta para marcar várias linhas; se `false` cada clique alterna a linha. Desligado em toque.',
      },
      {
        name: 'globalFilterFields',
        type: 'string[]',
        default: '—',
        description: 'Campos que o filtro global (busca única) considera. Filtros por coluna usam a API de `filters`.',
      },
      {
        name: 'filters',
        type: '{ [campo]: FilterMetadata }',
        default: '{}',
        description: 'Filtros por coluna (valor + matchMode). Alimenta os filtros de cabeçalho por coluna.',
      },
      {
        name: 'scrollable',
        type: 'boolean',
        default: 'false',
        description: 'Rolagem interna com cabeçalho fixo. Combine com `scrollHeight` (ex.: "400px" ou "flex").',
      },
      {
        name: 'scrollHeight',
        type: 'string',
        default: '—',
        description: 'Altura da área rolável ("400px" ou "flex"). Só faz efeito com `scrollable`.',
      },
      {
        name: 'virtualScroll',
        type: 'boolean',
        default: 'false',
        description: 'Renderiza só as linhas visíveis (árvores grandes já expandidas). Requer `virtualScrollItemSize`.',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Mostra o estado de carregando (marcar a região como ocupada; combinar com Skeleton ou spinner).',
      },
      {
        name: 'rowHover',
        type: 'boolean',
        default: 'false',
        description: 'Realça a linha ao passar o mouse, mesmo sem `selectionMode`. Não deve sugerir clique se a linha não é acionável.',
      },
      {
        name: 'showGridlines',
        type: 'boolean',
        default: 'false',
        description: 'Mostra linhas de grade entre as células. Ajuste visual para tabelas densas.',
      },
      {
        name: 'resizableColumns',
        type: 'boolean',
        default: 'false',
        description: 'Permite redimensionar colunas arrastando. Combina com `columnResizeMode` ("fit" | "expand"). Recurso avançado.',
      },
      {
        name: 'reorderableColumns',
        type: 'boolean',
        default: 'false',
        description: 'Permite reordenar colunas por arrastar-e-soltar. Recurso avançado.',
      },
      {
        name: 'frozenColumns',
        type: 'any[]',
        default: '—',
        description: 'Colunas congeladas (fixas) num painel lateral, com `frozenWidth`. Recurso avançado para muitas colunas.',
      },
    ],
    outputs: [
      { name: 'onNodeExpand', payload: 'TreeTableNodeExpandEvent { originalEvent, node }', description: 'Um nó (linha) foi expandido. Em modo lazy, é AQUI que se buscam os filhos.' },
      { name: 'onNodeCollapse', payload: 'TreeTableNodeCollapseEvent { originalEvent, node }', description: 'Um nó (linha) foi recolhido.' },
      { name: 'onLazyLoad', payload: 'TreeTableLazyLoadEvent { first, rows, sortField, sortOrder, filters }', description: 'Modo lazy: pede a fatia de dados ao servidor a cada página/ordenação/filtro.' },
      { name: 'onPage', payload: 'TreeTablePaginatorState { first, rows }', description: 'Mudou de página (modo não-lazy).' },
      { name: 'onSort', payload: '{ field, order, multiSortMeta }', description: 'Mudou a ordenação.' },
      { name: 'onFilter', payload: 'TreeTableFilterEvent { filters, filteredValue }', description: 'Mudou um filtro.' },
      { name: 'onNodeSelect', payload: 'TreeTableNode', description: 'Uma linha (nó) foi selecionada.' },
      { name: 'onNodeUnselect', payload: 'TreeTableNodeUnSelectEvent { originalEvent, node, type }', description: 'Uma linha (nó) foi desmarcada.' },
      { name: 'onHeaderCheckboxToggle', payload: 'TreeTableHeaderCheckboxToggleEvent { originalEvent, checked }', description: 'O checkbox "selecionar todos" do cabeçalho mudou.' },
      { name: 'onContextMenuSelect', payload: 'TreeTableContextMenuSelectEvent { originalEvent, node }', description: 'Linha selecionada por clique direito (menu de contexto).' },
      { name: 'onEditComplete', payload: 'TreeTableEditEvent { field, data, node }', description: 'Edição de célula concluída (quando ttEditableColumn ativo).' },
      { name: 'onColResize', payload: 'TreeTableColResizeEvent { element, delta }', description: 'Uma coluna foi redimensionada.' },
      { name: 'onColReorder', payload: 'TreeTableColumnReorderEvent { dragIndex, dropIndex, columns }', description: 'Uma coluna foi reordenada.' },
    ],
    slots: [
      { name: 'caption', accepts: 'ng-template pTemplate="caption" — título/toolbar da tabela (busca, ações)', optional: true },
      { name: 'header', accepts: 'ng-template pTemplate="header" — a linha de cabeçalhos (<th>), com ttSortableColumn', optional: true },
      { name: 'body', accepts: 'ng-template pTemplate="body" let-rowNode let-rowData — cada linha; a 1ª célula leva `<p-treeTableToggler [rowNode]>`', optional: true },
      { name: 'footer', accepts: 'ng-template pTemplate="footer" — rodapé (totais)', optional: true },
      { name: 'summary', accepts: 'ng-template pTemplate="summary" — resumo abaixo da tabela', optional: true },
      { name: 'emptymessage', accepts: 'ng-template pTemplate="emptymessage" — estado vazio (usar o bloco empty-state)', optional: true },
      { name: 'colgroup', accepts: 'ng-template pTemplate="colgroup" — definição das larguras de coluna', optional: true },
    ],
    states: ['default', 'loading', 'empty', 'sorted', 'filtered', 'paginated', 'row-selected', 'node-expanded', 'node-collapsed'],
    invalidCombinations: [
      {
        combo: 'selectionMode/expansão/edição sem `dataKey`',
        porque: 'Sem chave única por linha, a tabela perde a identidade dos nós — seleção, expansão e edição "pulam" ao paginar/ordenar/filtrar.',
      },
      {
        combo: 'lazy=true sem tratar `onLazyLoad`/`onNodeExpand`',
        porque: 'Os dados e os filhos nunca são buscados ao paginar, ordenar, filtrar ou expandir — a tabela fica parada.',
      },
      {
        combo: 'paginator=true sem `rows`',
        porque: 'Sem o tamanho da página, não há como dividir os nós raiz.',
      },
      {
        combo: 'usar TreeTable para dados planos (sem `children`)',
        porque: 'A coluna de expansão vira ruído sem hierarquia; esse caso é DataTable.',
      },
      {
        combo: 'montar a grade com `<div>` em vez de `<table>`',
        porque: 'Perde a semântica de tabela hierárquica (treegrid): leitor de tela não associa célula↔cabeçalho nem anuncia nível/expansão.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'page', 'dialog'],
    children: ['paginator', 'checkbox', 'button', 'icon-button', 'inputtext', 'tag', 'skeleton', 'empty-state'],
    commonlyUsedWith: ['search-input', 'paginator', 'toolbar', 'tag', 'tree'],
    partOfPatterns: ['data-table', 'hierarchy-navigation', 'list-management'],
  },

  tokens: {
    typography: 'body-sm (denso) ou body-lg',
    byState: {
      default: { headerText: 'surface/text', border: 'surface/200', text: 'surface/text', toggler: 'surface/500' },
      hover: { row: 'surface/100' },
      selected: { row: 'primary/50', text: 'primary/color' },
      sortedHeader: { text: 'primary/color' },
    },
    note: 'Cabeçalho/linhas/indentação herdam os tokens de TreeTable do PrimeNG. Linha selecionada = destaque suave da marca. O ícone do toggler (expandir/recolher) é INTERNO do PrimeNG (sobrescrito para Font Awesome — decisão 27/07); ícones de CONTEÚDO nas células seguem Font Awesome 7. RECURSOS AVANÇADOS (existem no p-treeTable, não detalhados aqui): editar célula (ttEditableColumn/editMode), redimensionar/reordenar colunas (resizableColumns/reorderableColumns), colunas congeladas (frozenColumns/frozenWidth), menu de contexto (contextMenu), virtual scroll. Ver primeng.org/treetable. Não usar só cor para status de linha — usar Tag/ícone + texto. Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca construir a tabela com `<div>` em vez de `<table>`.',
      porque: 'Sem a semântica de tabela (treegrid), a tecnologia assistiva não liga cada célula ao cabeçalho nem anuncia o nível/expansão de cada linha.',
      emVezDisso: '`<table role="treegrid">` com `<thead>`, `<th scope="col">`, `<tbody>` e cada `<tr>` com aria-level/aria-expanded — o p-treeTable já emite a estrutura.',
    },
    {
      regra: 'Nunca sinalizar expansão/ordenação/filtro só visualmente.',
      porque: 'Uma setinha colorida não é anunciada; quem usa leitor de tela não sabe se a linha abre nem por qual coluna está ordenado.',
      emVezDisso: 'Toggler como `<button>` com aria-label e a linha com aria-expanded; cabeçalho ordenável como `<button>` com aria-sort.',
    },
    {
      regra: 'Nunca usar TreeTable quando não há hierarquia real.',
      porque: 'A coluna de expandir/recolher ocupa espaço e confunde sem pai/filho para mostrar.',
      emVezDisso: 'DataTable para dados planos; TreeTable só quando as linhas têm subitens.',
    },
    {
      regra: 'Nunca carregar uma base hierárquica enorme de uma vez.',
      porque: 'Trava a tela renderizando ramos que a pessoa nem vai expandir.',
      emVezDisso: 'Modo `lazy` (paginação/ordenação/filtro no servidor + filhos ao expandir) ou `virtualScroll`.',
    },
    {
      regra: 'Nunca marcar status/seleção de linha só pela cor.',
      porque: 'Quem não distingue cores não percebe o estado da linha.',
      emVezDisso: 'Checkbox real para seleção (com aria, inclusive estado parcial "mixed") e Tag/ícone + texto para status.',
    },
  ],

  examples: {
    angular: `<p-treeTable [value]="contas" dataKey="codigo"
  [paginator]="true" [rows]="10" [rowsPerPageOptions]="[10,25,50]"
  selectionMode="checkbox" [(selectionKeys)]="selecionadas"
  sortMode="single" [globalFilterFields]="['nome','codigo']">

  <ng-template pTemplate="header">
    <tr>
      <th ttSortableColumn="nome">Conta <p-treeTableSortIcon field="nome" /></th>
      <th ttSortableColumn="saldo">Saldo <p-treeTableSortIcon field="saldo" /></th>
      <th>Status</th>
    </tr>
  </ng-template>

  <ng-template pTemplate="body" let-rowNode let-rowData="rowData">
    <tr [ttRow]="rowNode">
      <td>
        <p-treeTableToggler [rowNode]="rowNode" />
        {{ rowData.nome }}
      </td>
      <td>{{ rowData.saldo | currency }}</td>
      <td><p-tag [value]="rowData.status" [severity]="rowData.severity" /></td>
    </tr>
  </ng-template>

  <ng-template pTemplate="emptymessage">
    <tr><td colspan="3"><!-- bloco empty-state --></td></tr>
  </ng-template>
</p-treeTable>`,
    html: `<table role="treegrid">
  <caption>Plano de contas — saldo por conta</caption>
  <thead>
    <tr>
      <th scope="col" aria-sort="ascending">
        <button type="button">Conta <span aria-hidden="true">▲</span></button>
      </th>
      <th scope="col" aria-sort="none"><button type="button">Saldo</button></th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr aria-level="1" aria-expanded="true" aria-posinset="1" aria-setsize="2">
      <td>
        <button type="button" aria-label="Recolher ramo">
          <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>
        Ativo
      </td>
      <td>R$ 1.250.000</td>
      <td><span class="tag" data-severity="success">Em dia</span></td>
    </tr>
    <tr aria-level="2" aria-posinset="1" aria-setsize="1">
      <td>Caixa e equivalentes</td>
      <td>R$ 320.000</td>
      <td><span class="tag" data-severity="success">Em dia</span></td>
    </tr>
  </tbody>
</table>`,
    inContext: `<!-- padrão "data-table" hierárquico: busca + treegrid + paginação -->
<section data-block="data-table" aria-label="Plano de contas">
  <form role="search">
    <label for="q-tt" class="visually-hidden">Buscar conta</label>
    <input id="q-tt" type="search" placeholder="Buscar conta…" />
  </form>

  <table role="treegrid">
    <caption class="visually-hidden">Plano de contas — saldo por conta</caption>
    <thead>
      <tr>
        <th scope="col" aria-sort="none"><button type="button">Conta</button></th>
        <th scope="col" aria-sort="none"><button type="button">Saldo</button></th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody><!-- linhas com aria-level/aria-expanded --></tbody>
  </table>

  <nav aria-label="Paginação da tabela"><!-- ver ficha paginator --></nav>
</section>`,
  },

  a11y: {
    role: 'treegrid (table hierárquica) com cabeçalhos associados',
    keyboard: [
      'Tab percorre os controles (ordenar, selecionar, expandir, paginar)',
      'toggler de expandir/recolher é <button>: Enter/Espaço abre/fecha o ramo',
      'cabeçalho ordenável é <button>: Enter/Espaço ordena',
      'seleção por checkbox navegável por teclado',
    ],
    requiredAria: [
      '`<table role="treegrid">` com `<thead>`, `<th scope="col">`, `<tbody>` e `<caption>`',
      'cada linha `<tr>` com aria-level e (se tem filhos) aria-expanded="true|false"; aria-posinset/aria-setsize dentro do ramo',
      'coluna ordenada com aria-sort (ascending/descending/none)',
      'seleção por checkbox com rótulo por linha e no cabeçalho ("Selecionar todos"), incluindo estado parcial aria-checked="mixed"',
      'carregando com aria-busy; tabela vazia anunciada (empty-state em role="status")',
    ],
    contrastMin: '4.5:1 do texto das células e cabeçalhos; 3:1 das bordas/realce de linha selecionada e do ícone de expandir',
  },

  aiHints: {
    keywords: [
      'treetable', 'tabela hierárquica', 'tabela hierarquica', 'tabela com árvore', 'tabela com arvore',
      'árvore em tabela', 'hierarquia em colunas', 'linhas expansíveis', 'linhas expansiveis', 'subitens',
      'plano de contas', 'orçamento hierárquico', 'centro de custo', 'wbs', 'estrutura analítica', 'pai filho colunas',
    ],
    selectionCriteria:
      'Escolha TreeTable quando os dados são HIERÁRQUICOS (pai→filho expansível) E precisam de várias COLUNAS comparáveis por linha (valor, status, data), com ordenar/filtrar/paginar. Só o rótulo do nó = Tree. Dados planos em colunas = DataTable. Escolher um nó num campo = TreeSelect.',
    disambiguation: [
      { confundeCom: 'datatable', criterio: 'DataTable é PLANA (sem pai/filho); TreeTable tem linhas expansíveis com hierarquia na 1ª coluna.' },
      { confundeCom: 'tree', criterio: 'Tree mostra só o rótulo de cada nó (uma coluna); TreeTable acrescenta várias colunas comparáveis por linha.' },
      { confundeCom: 'treeselect', criterio: 'TreeSelect é um CAMPO que abre uma árvore para escolher; TreeTable exibe a hierarquia como tabela na página.' },
      { confundeCom: 'dataview', criterio: 'DataView são cartões/linhas ricas soltas; TreeTable é grade de colunas com aninhamento.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/treetable',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Colunas por template + diretivas (ttSortableColumn/ttRow/ttSelectableRow/ttEditableColumn + p-treeTableToggler). Saída = `<table role="treegrid">` semântico com aria-level/aria-expanded por linha; paginação reusa `paginator`, vazio reusa `empty-state`, carregando reusa `skeleton`. Ícone do toggler interno é sobrescrito para Font Awesome; ícones de conteúdo seguem Font Awesome 7.',
  },
};
