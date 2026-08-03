/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · orderlist.meta.ts — FAMÍLIA "TRANSFERÊNCIA E ORGANOGRAMA"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-orderlist`. API lida do código real
 * (primeng@21.0.2, `types/primeng-orderlist.d.ts`).
 *
 * UMA lista cujos itens a pessoa REORDENA — mover para cima/baixo,
 * para o topo/fim (ou arrastar, se `dragdrop`). Não muda O QUE está na
 * lista, muda a ORDEM. Botões de controle ficam ao lado (esquerda/direita).
 * Saída do Moses = uma `<ul>` semântica + um grupo de `<button>` de
 * controle; cada item tem posição anunciada (aria).
 *
 * Irmãs da família: `picklist` (transferir entre DUAS listas) e
 * `organizationchart` (hierarquia visual). Ordem ≠ transferência ≠ árvore.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const orderListMeta: NephosComponentMeta = {
  identity: {
    id: 'orderlist',
    name: 'OrderList',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Uma lista cujos itens a pessoa reordena (cima/baixo, topo/fim ou arrastando).',
    whenToUse: [
      'Quando a ORDEM dos itens importa e é a pessoa que define: prioridade de tarefas, ordem de exibição, sequência de etapas.',
      'Reordenar uma coleção fechada sem adicionar nem remover itens dela.',
      'Quando convém oferecer "mover ao topo/fim" além de um passo por vez.',
    ],
    whenNotToUse: [
      'Transferir itens entre duas listas (disponíveis ↔ escolhidos) — use PickList.',
      'Só escolher itens, sem ordenar — use MultiSelect ou um grupo de Checkbox.',
      'Dados comparáveis em colunas — use DataTable (que também reordena linhas por drag, mas o foco é o dado tabular).',
      'Hierarquia pai/filho — use Tree/TreeTable ou OrganizationChart.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'value',
        type: 'any[]',
        default: '[]',
        description: 'A coleção a reordenar (a mesma referência é reordenada in-place). Obrigatório.',
      },
      {
        name: 'selection',
        type: 'any[]',
        default: '[]',
        description: 'Itens atualmente selecionados. Os controles movem a SELEÇÃO — sem item marcado, os botões ficam desabilitados. Two-way com `selectionChange`.',
      },
      {
        name: 'dataKey',
        type: 'string',
        default: '—',
        description: 'Campo que identifica cada item de forma única (ex.: "id"). Ajuda a seleção a não "pular" ao reordenar.',
      },
      {
        name: 'header',
        type: 'string',
        default: '—',
        description: 'Texto do título da lista (legenda acima dos itens). Prefira um `headerTemplate` se precisar de mais que texto.',
      },
      {
        name: 'dragdrop',
        type: 'boolean',
        default: 'false',
        description: 'Habilita reordenar arrastando (além dos botões). Ligar dá um caminho mais rápido no mouse/touch, mas os botões continuam essenciais para teclado.',
      },
      {
        name: 'controlsPosition',
        type: "'left' | 'right'",
        default: 'left',
        description: 'De que lado da lista ficam os botões de mover. Manter consistente com as outras telas.',
      },
      {
        name: 'filterBy',
        type: 'string',
        default: '—',
        description: 'Liga o campo de busca e diz em quais campos filtrar (separados por vírgula). Útil quando a lista é longa. Sem ele, não há filtro.',
      },
      {
        name: 'filterPlaceholder',
        type: 'string',
        default: '—',
        description: 'Texto de placeholder do campo de filtro.',
      },
      {
        name: 'filterMatchMode',
        type: "'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte'",
        default: 'contains',
        description: 'Como o filtro compara o texto digitado com os itens.',
      },
      {
        name: 'metaKeySelection',
        type: 'boolean',
        default: 'true',
        description: 'Se true, é preciso segurar Ctrl/Cmd para selecionar vários; se false, cada clique alterna o item individualmente. Em touch é desligado automaticamente. `false` costuma ser mais previsível para quem não conhece o atalho.',
      },
      {
        name: 'scrollHeight',
        type: 'string',
        default: '(auto)',
        description: 'Altura máxima da lista antes de aparecer rolagem interna (ex.: "250px"). Evita a lista empurrar o resto da tela.',
      },
      {
        name: 'stripedRows',
        type: 'boolean',
        default: 'false',
        description: 'Linhas com cores alternadas (zebra) para ajudar a acompanhar a linha. Reforço visual, não substitui a semântica de lista.',
      },
      {
        name: 'responsive',
        type: 'boolean',
        default: '—',
        description: 'Ajusta o layout dos controles conforme a largura da tela (usa `breakpoint`).',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Desabilita o componente inteiro (nenhum item pode ser reordenado).',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: '—',
        description: 'Rótulo acessível da lista quando não há um `<label>`/header visível associado. Diz o que a lista contém.',
      },
    ],
    outputs: [
      { name: 'onReorder', payload: 'Event', description: '⭐ A ordem mudou (por botão ou arraste). É aqui que se persiste a nova sequência.' },
      { name: 'selectionChange', payload: 'any[]', description: 'Two-way da seleção (itens marcados). Emite ao marcar/desmarcar.' },
      { name: 'onSelectionChange', payload: 'OrderListSelectionChangeEvent { originalEvent, value }', description: 'Evento rico de mudança de seleção.' },
      { name: 'onFilterEvent', payload: 'OrderListFilterEvent { originalEvent, value }', description: 'Filtrou a lista (quando `filterBy` está ligado).' },
      { name: 'onFocus', payload: 'Event', description: 'A lista recebeu foco.' },
      { name: 'onBlur', payload: 'Event', description: 'A lista perdeu o foco.' },
    ],
    slots: [
      { name: 'item', accepts: 'ng-template pTemplate="item" let-item — como desenhar cada item da lista', optional: true },
      { name: 'header', accepts: 'ng-template pTemplate="header" — cabeçalho/legenda da lista', optional: true },
      { name: 'empty', accepts: 'ng-template pTemplate="empty" — estado vazio (usar o bloco empty-state)', optional: true },
      { name: 'emptyfilter', accepts: 'ng-template pTemplate="emptyfilter" — quando o filtro não acha nada', optional: true },
      { name: 'filter', accepts: 'ng-template pTemplate="filter" — campo de filtro customizado', optional: true },
    ],
    states: ['default', 'item-selected', 'reordering', 'dragging', 'filtered', 'empty', 'disabled'],
    invalidCombinations: [
      {
        combo: 'dragdrop=true como ÚNICO jeito de reordenar (sem botões)',
        porque: 'Arrastar não é acessível por teclado; sem os botões de mover, quem navega por teclado não consegue reordenar.',
      },
      {
        combo: 'OrderList para transferir itens entre duas listas',
        porque: 'OrderList é UMA lista — reordena, não move para outro conjunto. Isso é PickList.',
      },
      {
        combo: 'reordenar por drag sem anunciar a nova posição',
        porque: 'Quem usa leitor de tela não percebe que o item mudou de lugar se a posição não é anunciada (aria-live / posinset).',
      },
    ],
  },

  relationships: {
    parents: ['card', 'dialog', 'toolbar'],
    children: ['button', 'icon-button', 'checkbox', 'search-input', 'empty-state'],
    commonlyUsedWith: ['button', 'search-input', 'label', 'empty-state'],
    partOfPatterns: ['list-management', 'form-submission'],
  },

  tokens: {
    typography: 'body-lg (itens)',
    byState: {
      default: { text: 'surface/text', border: 'surface/200', background: 'surface/0' },
      striped: { rowAlt: 'surface/50' },
      hover: { item: 'surface/100' },
      selected: { item: 'primary/50', text: 'primary/color' },
      dragging: { item: 'surface/100', ring: 'focus/ring' },
    },
    note: 'Espaçamento, raio, alturas e os botões de mover herdam do PrimeNG (usa Listbox + Button internamente). Item selecionado = destaque suave da marca (highlight). Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca oferecer só o arraste (drag) para reordenar.',
      porque: 'Arrastar é inacessível por teclado e difícil no touch com precisão; exclui parte das pessoas.',
      emVezDisso: 'Manter os botões mover-para-cima/baixo/topo/fim (com aria-label) sempre; o `dragdrop` é um atalho a MAIS, nunca o único.',
    },
    {
      regra: 'Nunca desenhar a lista como uma pilha de `<div>` sem semântica.',
      porque: 'O leitor de tela não anuncia "lista de N itens", nem a posição de cada um, nem navega item a item.',
      emVezDisso: 'Uma `<ul>` com `<li>`; cada item com posição anunciada (aria-posinset/aria-setsize) e um rótulo claro.',
    },
    {
      regra: 'Nunca usar OrderList quando o objetivo é ESCOLHER (não ordenar).',
      porque: 'A pessoa lê os controles de mover como parte da tarefa e se confunde: ordenar não é selecionar.',
      emVezDisso: 'MultiSelect ou grupo de Checkbox para escolher; OrderList só quando a sequência final importa.',
    },
    {
      regra: 'Nunca deixar os botões de mover sem rótulo textual acessível.',
      porque: 'Botões só com ícone (seta) não dizem o que fazem para quem usa leitor de tela.',
      emVezDisso: 'aria-label em cada botão ("Mover para cima", "Mover para o topo"…), como o próprio PrimeNG já expõe.',
    },
  ],

  examples: {
    angular: `<p-orderlist [value]="etapas" [(selection)]="selecionadas"
  dataKey="id" header="Ordem das etapas"
  [dragdrop]="true" controlsPosition="left"
  filterBy="nome" filterPlaceholder="Buscar etapa…"
  [metaKeySelection]="false"
  (onReorder)="salvarOrdem($event)">
  <ng-template pTemplate="item" let-etapa>
    <span>{{ etapa.nome }}</span>
  </ng-template>
</p-orderlist>`,
    html: `<section aria-label="Ordem das etapas">
  <div role="group" aria-label="Reordenar">
    <button type="button" aria-label="Mover para o topo"><i class="fa-solid fa-angles-up" aria-hidden="true"></i></button>
    <button type="button" aria-label="Mover para cima"><i class="fa-solid fa-angle-up" aria-hidden="true"></i></button>
    <button type="button" aria-label="Mover para baixo"><i class="fa-solid fa-angle-down" aria-hidden="true"></i></button>
    <button type="button" aria-label="Mover para o fim"><i class="fa-solid fa-angles-down" aria-hidden="true"></i></button>
  </div>
  <ul aria-label="Etapas">
    <li aria-posinset="1" aria-setsize="3" aria-selected="true">Triagem</li>
    <li aria-posinset="2" aria-setsize="3" aria-selected="false">Análise</li>
    <li aria-posinset="3" aria-setsize="3" aria-selected="false">Aprovação</li>
  </ul>
</section>`,
    inContext: `<!-- gerenciar a ordem de exibição num card, com busca e ações -->
<section data-block="list-management" aria-label="Ordem de exibição dos campos">
  <div class="toolbar">
    <label for="q" class="visually-hidden">Buscar campo</label>
    <input id="q" type="search" placeholder="Buscar campo…" />
  </div>
  <div class="orderlist">
    <div role="group" aria-label="Reordenar campos"><!-- botões mover --></div>
    <ul aria-label="Campos"><!-- itens em <li> com aria-posinset --></ul>
  </div>
  <div class="actions">
    <button type="button">Cancelar</button>
    <button type="submit">Salvar ordem</button>
  </div>
</section>`,
  },

  a11y: {
    role: 'listbox de itens reordenáveis + grupo de botões de controle',
    keyboard: [
      'Tab entra na lista e alcança os botões de mover',
      'setas navegam os itens; Espaço/Enter (ou clique) seleciona',
      'os botões mover-para-cima/baixo/topo/fim agem sobre o item selecionado (Enter/Espaço)',
    ],
    requiredAria: [
      'a lista com nome (aria-label ou header associado) dizendo o que contém',
      'cada item como `<li>` com posição anunciada (aria-posinset/aria-setsize) e aria-selected',
      'cada botão de mover com aria-label textual ("Mover para cima"…)',
      'reordenação anunciada (aria-live) para quem não vê a mudança de posição',
    ],
    contrastMin: '4.5:1 do texto dos itens; 3:1 do realce do item selecionado e do foco',
  },

  aiHints: {
    keywords: [
      'orderlist', 'lista ordenável', 'lista ordenavel', 'reordenar', 'ordenar itens',
      'mover para cima', 'mover para baixo', 'prioridade', 'sequência', 'sequencia',
      'ordem de exibição', 'ordem de exibicao', 'arrastar e ordenar', 'drag ordenar',
    ],
    selectionCriteria:
      'Escolha OrderList quando a pessoa precisa definir a ORDEM de UMA lista (mover cima/baixo/topo/fim, ou arrastar). Se o objetivo é mover itens ENTRE duas listas, é PickList. Se é só escolher sem ordenar, é MultiSelect/Checkbox. Sempre mantenha os botões (acessibilidade), o drag é extra.',
    disambiguation: [
      { confundeCom: 'picklist', criterio: 'PickList transfere itens entre DUAS listas (origem↔destino); OrderList reordena UMA lista só.' },
      { confundeCom: 'multiselect', criterio: 'MultiSelect ESCOLHE vários de uma lista; OrderList ORDENA — a ordem final é o que importa.' },
      { confundeCom: 'datatable', criterio: 'DataTable é dado tabular em colunas comparáveis (pode reordenar linhas por drag, mas o foco é o dado); OrderList é uma lista simples cuja sequência é o produto.' },
      { confundeCom: 'organizationchart', criterio: 'OrganizationChart mostra hierarquia pai/filho em árvore; OrderList é uma sequência linear plana.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/orderlist',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Internamente reusa Listbox + Button; itens por template; vazio reusa `empty-state`, filtro reusa `search-input`. Saída = `<ul>` semântica + grupo de botões de mover com aria-label.',
  },
};
