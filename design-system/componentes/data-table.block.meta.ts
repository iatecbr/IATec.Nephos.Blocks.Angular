/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · data-table.block.meta.ts — BLOCO #7 (flagship "nosso")
 * ─────────────────────────────────────────────────────────────
 * category: 'block' · origin: 'nephos-own'
 * A TABELA DE DADOS COMPLETA da organização: o componente `datatable`
 * (a `<table>` com ordenação/paginação) MAIS a composição que a
 * organização repete — seleção em massa + barra de ações em massa +
 * ações por linha + status como Tag + estados vazio/carregando.
 *
 * ⚠️ NÃO confundir com o COMPONENTE `datatable` (a ficha `datatable.meta.ts`,
 * a `<table>` crua). Este BLOCO (`data-table`) é a composição por cima:
 * o padrão pronto de "listagem gerenciável" do produto.
 *
 * Compõe: datatable + checkbox (seleção) + tag (status) + button/
 * icon-button (ações) + paginator + empty-state + skeleton.
 * Saída do Moses = uma `<table>` semântica com coluna de seleção, ações
 * reais e status em texto+cor, com paginação e estado vazio.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const dataTableBlockMeta: NephosComponentMeta = {
  identity: {
    id: 'data-table',
    name: 'Tabela de dados (bloco)',
    category: 'block',
    status: 'beta',
    version: '0.1.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Tabela de dados gerenciável: ordenar, selecionar em massa, agir por linha e paginar, com status e estado vazio.',
    whenToUse: [
      'Listar registros comparáveis em colunas (escolas, alunos, solicitações) com ações sobre eles.',
      'Quando a pessoa precisa selecionar vários e agir em massa (aprovar, exportar, excluir).',
      'Quando cada linha tem um status e ações próprias (ver, editar, remover).',
    ],
    whenNotToUse: [
      'Itens visuais/heterogêneos (cartões com imagem) — use o DataView (lista/grade de cards).',
      'Uma hierarquia pai→filho — use TreeTable.',
      'Só exibir 3-4 pares rótulo/valor de UM registro — use uma lista de descrição, não uma tabela.',
    ],
  },

  api: {
    // Bloco: a "API" são os pontos de composição (slots) + a config.
    inputs: [
      { name: 'columns', type: 'Column[]', default: '—', description: 'As colunas (campo + rótulo + se ordenável). Definem os `<th scope="col">` e o que cada célula mostra.' },
      { name: 'rows', type: 'any[]', default: '[]', description: 'Os registros exibidos (a página atual quando paginado no servidor).' },
      { name: 'selectable', type: 'boolean', default: 'true', description: 'Liga a coluna de seleção (checkbox por linha + "selecionar todos") e a barra de ações em massa.' },
      { name: 'rowActions', type: 'Action[]', default: '—', description: 'Ações por linha (ver/editar/remover) — viram icon-button com aria-label na última coluna.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Estado carregando: mostra skeleton nas linhas enquanto os dados chegam.' },
      { name: 'total', type: 'number', default: '—', description: 'Total de registros (para o paginator). 0 = usar o estado vazio (empty-state).' },
    ],
    outputs: [
      { name: 'sort', payload: '{ campo, direção }', description: 'Emitido ao ordenar por uma coluna.' },
      { name: 'selectionChange', payload: '{ selecionados }', description: 'Emitido quando a seleção de linhas muda.' },
      { name: 'bulkAction', payload: '{ ação, selecionados }', description: 'Emitido ao acionar uma ação em massa sobre os selecionados.' },
      { name: 'rowAction', payload: '{ ação, linha }', description: 'Emitido ao acionar uma ação de uma linha.' },
      { name: 'pageChange', payload: '{ página, tamanho }', description: 'Emitido ao mudar de página (delegado ao paginator).' },
    ],
    slots: [
      { name: 'bulkBar', accepts: 'barra de ações em massa (aparece quando há seleção): "N selecionados" + button de ações', optional: true },
      { name: 'columns', accepts: 'os `<th>` das colunas (ordenáveis viram button no cabeçalho)' },
      { name: 'cell', accepts: 'conteúdo de cada célula (texto, tag de status, link)' },
      { name: 'rowActions', accepts: 'icon-button de ações por linha (ver/editar/remover)', optional: true },
      { name: 'empty', accepts: 'empty-state quando não há linhas (usar o bloco empty-state)', optional: true },
      { name: 'pagination', accepts: 'paginator abaixo da tabela', optional: true },
    ],
    states: ['default', 'com-seleção', 'ordenada', 'loading', 'vazia'],
    invalidCombinations: [
      { combo: 'usar `<div>`/grid no lugar de `<table>` para dados tabulares', porque: 'Perde a semântica de tabela: leitor de tela não anuncia linha/coluna nem navega por células.' },
      { combo: 'status de linha só por cor (sem texto)', porque: 'Cor sozinha não é percebida por todos nem anunciada — o status precisa de texto (Tag).' },
      { combo: 'ação de linha como ícone sem aria-label', porque: 'Ícone-ação mudo não é anunciado; a pessoa não sabe o que o botão faz.' },
      { combo: '"selecionar todos" que marca TODAS as páginas sem avisar', porque: 'A pessoa pensa que marcou a página visível; agir em massa no invisível causa erro.' },
    ],
  },

  relationships: {
    parents: ['listing', 'app-shell', 'card', 'page'],
    children: ['datatable', 'checkbox', 'tag', 'button', 'icon-button', 'paginator', 'empty-state', 'skeleton'],
    commonlyUsedWith: ['search-filters', 'paginator', 'empty-state', 'tag', 'dataview'],
    partOfPatterns: ['listing', 'data-management'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      // O bloco não inventa cor: herda dos componentes (datatable/tag/button).
      cabecalho: { text: 'surface/text', background: 'surface/50', border: 'surface/200' },
      linhaSelecionada: { background: 'primary/50' },
      linhaHover: { background: 'surface/100' },
      barraMassa: { background: 'primary/50', text: 'primary/color' },
    },
    note: 'Alturas de linha, densidade, bordas e o realce herdam dos tokens de DataTable do PrimeNG. Status = Tag por papel (feedback.*); linha selecionada = ênfase suave da marca. Nenhum hex, nenhum nome de marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca montar a tabela com `<div>`/grid no lugar de `<table>`.',
      porque: 'Sem `<table>/<th scope>/<td>` o leitor de tela não anuncia linha e coluna nem navega por células.',
      emVezDisso: '`<table>` semântica com `<caption>`, `<th scope="col">` e cabeçalho ordenável como `<button>` + aria-sort.',
    },
    {
      regra: 'Nunca sinalizar o status da linha só pela cor.',
      porque: 'Cor sozinha exclui quem não a distingue e não é anunciada.',
      emVezDisso: 'Uma Tag com TEXTO do status (a cor por papel só reforça).',
    },
    {
      regra: 'Nunca deixar ação de linha só-ícone sem nome acessível.',
      porque: 'Um lápis/lixeira sem aria-label não é anunciado; a pessoa não sabe o que faz.',
      emVezDisso: 'icon-button com aria-label que inclui a linha (ex.: "Editar Colégio X").',
    },
    {
      regra: 'Nunca marcar "todos" ambiguamente entre página visível e resultado inteiro.',
      porque: 'Confunde seleção da página com seleção do total — agir em massa no invisível gera erro grave.',
      emVezDisso: 'Marcar a página visível e, se aplicável, oferecer explicitamente "selecionar todos os N resultados".',
    },
  ],

  examples: {
    angular: `<!-- composição real com componentes PrimeNG -->
<p-table [value]="linhas" [paginator]="true" [rows]="10" [totalRecords]="total"
         [(selection)]="selecionadas" dataKey="id" [lazy]="true" (onLazyLoad)="carregar($event)">
  <ng-template pTemplate="header">
    <tr>
      <th style="width:3rem"><p-tableHeaderCheckbox /></th>
      <th pSortableColumn="escola">Escola <p-sortIcon field="escola" /></th>
      <th pSortableColumn="integrais">Integrais</th>
      <th>Status</th>
      <th>Ações</th>
    </tr>
  </ng-template>
  <ng-template pTemplate="body" let-linha>
    <tr>
      <td><p-tableCheckbox [value]="linha" /></td>
      <td>{{ linha.escola }}</td>
      <td>{{ linha.integrais }}</td>
      <td><p-tag [severity]="linha.sev" [value]="linha.status" /></td>
      <td><p-button [text]="true" icon="fa-solid fa-pen-to-square" ariaLabel="Editar {{ linha.escola }}" /></td>
    </tr>
  </ng-template>
  <ng-template pTemplate="emptymessage"><!-- bloco empty-state --></ng-template>
</p-table>`,
    html: `<!-- barra de ações em massa (aparece quando há seleção) -->
<div data-slot="bulk-bar" role="region" aria-label="Ações em massa" hidden>
  <span aria-live="polite">2 selecionados</span>
  <button type="button" data-variant="text">Exportar</button>
  <button type="button" data-variant="text">Excluir</button>
</div>

<table>
  <caption>Bolsas por escola — Associação Bahia</caption>
  <thead>
    <tr>
      <th scope="col">
        <input type="checkbox" aria-label="Selecionar todas as linhas desta página" />
      </th>
      <th scope="col" aria-sort="ascending">
        <button type="button">Escola <span aria-hidden="true">▲</span></button>
      </th>
      <th scope="col" aria-sort="none"><button type="button">Integrais</button></th>
      <th scope="col">Status</th>
      <th scope="col">Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><input type="checkbox" aria-label="Selecionar Colégio Adventista de Salvador" /></td>
      <td>Colégio Adventista de Salvador</td>
      <td>360</td>
      <td><span data-block="tag" data-variant="warn">Faltando</span></td>
      <td>
        <button type="button" aria-label="Editar Colégio Adventista de Salvador">
          <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
        </button>
        <button type="button" aria-label="Remover Colégio Adventista de Salvador">
          <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
        </button>
      </td>
    </tr>
  </tbody>
</table>

<!-- paginação abaixo da tabela -->
<nav aria-label="Paginação"><!-- paginator --></nav>`,
    inContext: `<!-- tabela dentro de uma listagem: filtros em cima, tabela, paginação -->
<section aria-label="Escolas">
  <form data-block="search-filters" role="search" aria-label="Buscar e filtrar escolas"> … </form>
  <table><!-- ver html acima --></table>
  <!-- quando o filtro zera o resultado, no lugar da tabela: -->
  <!-- <div data-block="empty-state">Nenhuma escola encontrada</div> -->
</section>`,
  },

  a11y: {
    role: 'table (nativo) com cabeçalhos associados; barra de ações em massa como região rotulada',
    keyboard: [
      'Tab percorre cabeçalhos ordenáveis (button), checkboxes e ações',
      'Enter/Espaço ordena pela coluna focada e marca/aciona',
      'a contagem de seleção é anunciada (aria-live)',
    ],
    requiredAria: [
      '`<table>` com `<caption>`, `<th scope="col">`; cabeçalho ordenável = `<button>` + aria-sort',
      'checkbox de linha/todos com aria-label claro (linha específica vs. página)',
      'status como Tag com texto; ações de linha como button com aria-label incluindo a linha',
      'paginação como `<nav aria-label="Paginação">`; vazio via empty-state (role="status")',
    ],
    contrastMin: '4.5:1 em texto e status; 3:1 no realce de linha selecionada e no foco',
  },

  aiHints: {
    keywords: [
      'tabela de dados', 'tabela', 'grade de dados', 'listagem em tabela', 'data table', 'datatable',
      'tabela com seleção', 'tabela com selecao', 'seleção em massa', 'selecao em massa', 'ações em massa',
      'ações por linha', 'acoes por linha', 'ordenar tabela', 'tabela com status', 'grid de registros',
    ],
    selectionCriteria:
      'Escolha o bloco Tabela de dados para listar registros em COLUNAS com seleção em massa, ações por linha, status e paginação. Itens visuais (cards) = DataView. Hierarquia = TreeTable. Só a `<table>` crua sem a composição de ações = o componente datatable.',
    disambiguation: [
      { confundeCom: 'datatable', criterio: 'datatable é o COMPONENTE (a `<table>` com ordenação/paginação); este bloco é a COMPOSIÇÃO por cima (seleção em massa, ações de linha, status, vazio).' },
      { confundeCom: 'dataview', criterio: 'DataView mostra itens visuais/heterogêneos em cards (lista/grade); a Tabela é para dados comparáveis em colunas.' },
      { confundeCom: 'treetable', criterio: 'TreeTable é para hierarquia pai→filho com colunas; a Tabela é para linhas planas.' },
      { confundeCom: 'search-filters', criterio: 'Busca com Filtros alimenta a consulta (fica ACIMA); a Tabela mostra o resultado.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/table',
    storybookId: 'blocks-data-table',
    deltaFromPrimeng: 'Bloco nephos-own: compõe o componente datatable (p-table) + checkbox + tag + button/icon-button + paginator + empty-state + skeleton. Saída = `<table>` semântica com seleção, status em texto+cor e ações rotuladas; status por papel (feedback.*), ênfase da marca no realce.',
  },
};
