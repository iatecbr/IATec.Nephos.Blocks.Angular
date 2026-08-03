/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · picklist.meta.ts — FAMÍLIA "TRANSFERÊNCIA E ORGANOGRAMA"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-picklist`. API lida do código real
 * (primeng@21.0.2, `types/primeng-picklist.d.ts`).
 *
 * DUAS listas lado a lado — origem (source) e destino (target) — com
 * botões no meio para MOVER itens de um lado ao outro (um a um ou
 * todos). Cada lista também reordena internamente (cima/baixo/topo/fim)
 * e pode ter filtro próprio. É o padrão "disponíveis → selecionados".
 * Saída do Moses = duas `<ul>` semânticas + um grupo de `<button>` de
 * transferência com aria-label.
 *
 * Irmãs da família: `orderlist` (reordenar UMA lista) e
 * `organizationchart` (hierarquia). Transferir ≠ reordenar ≠ árvore.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const pickListMeta: NephosComponentMeta = {
  identity: {
    id: 'picklist',
    name: 'PickList',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Duas listas lado a lado para transferir itens entre elas (disponíveis ↔ selecionados).',
    whenToUse: [
      'Montar um subconjunto a partir de um conjunto maior, deixando visível o que está de cada lado (permissões, participantes, campos escolhidos).',
      'Quando importa VER as duas listas ao mesmo tempo e mover em lote ("mover todos").',
      'Quando, além de transferir, a pessoa também precisa reordenar o lado de destino.',
    ],
    whenNotToUse: [
      'Reordenar uma lista só, sem transferir — use OrderList.',
      'Escolher vários de forma compacta, sem precisar ver o conjunto todo lado a lado — use MultiSelect (ocupa muito menos espaço).',
      'Poucas opções (2–5) — um grupo de Checkbox é mais direto.',
      'Hierarquia pai/filho — use Tree/TreeTable ou OrganizationChart.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'source',
        type: 'any[] (model)',
        default: '[]',
        description: 'A lista de ORIGEM (disponíveis). Two-way via `sourceChange` — itens saem daqui ao mover para o destino. Obrigatório.',
      },
      {
        name: 'target',
        type: 'any[] (model)',
        default: '[]',
        description: 'A lista de DESTINO (selecionados). Two-way via `targetChange` — recebe os itens movidos. Obrigatório.',
      },
      {
        name: 'dataKey',
        type: 'string',
        default: '—',
        description: 'Campo que identifica cada item de forma única (ex.: "id"). Necessário para a transferência e a seleção não se perderem.',
      },
      {
        name: 'sourceHeader',
        type: 'string',
        default: '—',
        description: 'Título/legenda da lista de origem (ex.: "Disponíveis"). Dá nome acessível à lista.',
      },
      {
        name: 'targetHeader',
        type: 'string',
        default: '—',
        description: 'Título/legenda da lista de destino (ex.: "Selecionados").',
      },
      {
        name: 'dragdrop',
        type: 'boolean',
        default: 'false',
        description: 'Habilita arrastar itens entre as listas (além dos botões). Atalho a MAIS; os botões continuam essenciais para teclado.',
      },
      {
        name: 'filterBy',
        type: 'string',
        default: '—',
        description: 'Liga o filtro e diz em quais campos buscar (aceita vários separados por vírgula). Aplica-se às duas listas (ver `showSourceFilter`/`showTargetFilter`).',
      },
      {
        name: 'showSourceFilter',
        type: 'boolean',
        default: 'true',
        description: 'Mostra (ou não) o campo de filtro na lista de origem, quando `filterBy` está ligado.',
      },
      {
        name: 'showTargetFilter',
        type: 'boolean',
        default: 'true',
        description: 'Mostra (ou não) o campo de filtro na lista de destino, quando `filterBy` está ligado.',
      },
      {
        name: 'showSourceControls',
        type: 'boolean',
        default: 'true',
        description: 'Mostra os botões de reordenar (cima/baixo/topo/fim) da lista de origem. Desligue se a ordem da origem não importa.',
      },
      {
        name: 'showTargetControls',
        type: 'boolean',
        default: 'true',
        description: 'Mostra os botões de reordenar da lista de destino. Manter ligado quando a ordem dos selecionados importa.',
      },
      {
        name: 'metaKeySelection',
        type: 'boolean',
        default: 'true',
        description: 'Se true, segura-se Ctrl/Cmd para marcar vários; se false, cada clique alterna o item. Em touch é desligado automaticamente. `false` é mais previsível para quem não conhece o atalho.',
      },
      {
        name: 'keepSelection',
        type: 'boolean',
        default: 'false',
        description: 'Mantém os itens selecionados ainda marcados depois de transferi-los para a outra lista.',
      },
      {
        name: 'sourceOptionDisabled',
        type: 'string | ((item) => boolean)',
        default: '—',
        description: 'Quais itens da origem ficam desabilitados (não transferíveis): nome do campo booleano ou função. Comunicar o motivo à pessoa.',
      },
      {
        name: 'targetOptionDisabled',
        type: 'string | ((item) => boolean)',
        default: '—',
        description: 'Quais itens do destino ficam desabilitados (não removíveis).',
      },
      {
        name: 'scrollHeight',
        type: 'string',
        default: '(auto)',
        description: 'Altura máxima de cada lista antes de rolar por dentro (ex.: "300px").',
      },
      {
        name: 'stripedRows',
        type: 'boolean',
        default: 'false',
        description: 'Linhas alternadas (zebra) em cada lista. Reforço visual, não substitui a semântica.',
      },
      {
        name: 'responsive',
        type: 'boolean',
        default: '—',
        description: 'Ajusta os controles conforme a largura da tela (usa `breakpoint`) — em telas estreitas as listas empilham.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Desabilita o componente inteiro.',
      },
    ],
    outputs: [
      { name: 'onMoveToTarget', payload: 'PickListMoveToTargetEvent { originalEvent, items }', description: '⭐ Itens moveram origem → destino.' },
      { name: 'onMoveAllToTarget', payload: 'PickListMoveAllToTargetEvent { originalEvent, items }', description: 'Todos moveram origem → destino.' },
      { name: 'onMoveToSource', payload: 'PickListMoveToSourceEvent { originalEvent, items }', description: 'Itens voltaram destino → origem.' },
      { name: 'onMoveAllToSource', payload: 'PickListMoveAllToSourceEvent { originalEvent, items }', description: 'Todos voltaram destino → origem.' },
      { name: 'sourceChange', payload: 'any[]', description: 'Two-way: a lista de origem mudou.' },
      { name: 'targetChange', payload: 'any[]', description: 'Two-way: a lista de destino mudou (o resultado a persistir).' },
      { name: 'onSourceReorder', payload: 'PickListSourceReorderEvent', description: 'Reordenou dentro da origem.' },
      { name: 'onTargetReorder', payload: 'PickListTargetReorderEvent', description: 'Reordenou dentro do destino.' },
      { name: 'onSourceSelect', payload: 'PickListSourceSelectEvent', description: 'Selecionou item(ns) na origem.' },
      { name: 'onTargetSelect', payload: 'PickListTargetSelectEvent', description: 'Selecionou item(ns) no destino.' },
      { name: 'onSourceFilter', payload: 'PickListSourceFilterEvent', description: 'Filtrou a origem.' },
      { name: 'onTargetFilter', payload: 'PickListTargetFilterEvent', description: 'Filtrou o destino.' },
    ],
    slots: [
      { name: 'item', accepts: 'ng-template pTemplate="item" let-item — como desenhar cada item (vale para as duas listas)', optional: true },
      { name: 'sourceheader', accepts: 'ng-template pTemplate="sourceheader" — cabeçalho da lista de origem', optional: true },
      { name: 'targetheader', accepts: 'ng-template pTemplate="targetheader" — cabeçalho da lista de destino', optional: true },
      { name: 'sourcefilter', accepts: 'ng-template pTemplate="sourcefilter" — filtro customizado da origem', optional: true },
      { name: 'targetfilter', accepts: 'ng-template pTemplate="targetfilter" — filtro customizado do destino', optional: true },
      { name: 'emptymessagesource', accepts: 'ng-template pTemplate="emptymessagesource" — origem vazia (usar empty-state)', optional: true },
      { name: 'emptymessagetarget', accepts: 'ng-template pTemplate="emptymessagetarget" — destino vazio (usar empty-state)', optional: true },
    ],
    states: ['default', 'item-selected', 'transferring', 'dragging', 'source-filtered', 'target-filtered', 'source-empty', 'target-empty', 'disabled'],
    invalidCombinations: [
      {
        combo: 'dragdrop=true como ÚNICO jeito de transferir (sem botões)',
        porque: 'Arrastar entre listas é inacessível por teclado; sem os botões de mover, parte das pessoas não consegue transferir.',
      },
      {
        combo: 'PickList para reordenar uma lista só',
        porque: 'PickList é duas listas com transferência — usar com uma só é confuso e ocupa o dobro do espaço. Isso é OrderList.',
      },
      {
        combo: 'transferir itens sem tratar `targetChange`/`sourceChange`',
        porque: 'As listas voltam ao estado anterior e a transferência parece não funcionar.',
      },
      {
        combo: 'listas longas sem `filterBy`',
        porque: 'Procurar rolando dezenas de itens dos dois lados é lento e cansativo.',
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
    note: 'As duas listas, os controles de transferência e os de reordenar herdam do PrimeNG (usa Listbox + Button internamente). Item selecionado = destaque suave da marca (highlight). Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca oferecer só o arraste (drag) para transferir.',
      porque: 'Arrastar entre listas é inacessível por teclado e frágil no touch; exclui parte das pessoas.',
      emVezDisso: 'Manter os botões de transferência (mover, mover todos, voltar, voltar todos) com aria-label; `dragdrop` é atalho extra, nunca o único caminho.',
    },
    {
      regra: 'Nunca desenhar as listas como pilhas de `<div>` sem semântica.',
      porque: 'O leitor de tela não anuncia "lista de N itens" nem a origem/destino de cada item.',
      emVezDisso: 'Duas `<ul>` com `<li>`, cada uma com nome (aria-label: "Disponíveis"/"Selecionados"); botões de transferência num `role="group"` com rótulo.',
    },
    {
      regra: 'Nunca usar PickList quando basta escolher (sem ver as duas listas).',
      porque: 'Ocupa muito espaço e adiciona passos onde um campo compacto resolveria.',
      emVezDisso: 'MultiSelect quando só interessa o resultado; PickList quando ver e comparar os dois lados (e reordenar) faz parte da tarefa.',
    },
    {
      regra: 'Nunca omitir os títulos das duas listas.',
      porque: 'Sem "Disponíveis"/"Selecionados", a pessoa não sabe o que cada lado representa nem para onde o botão move.',
      emVezDisso: '`sourceHeader`/`targetHeader` (ou os templates de cabeçalho) dando nome claro a cada lista.',
    },
  ],

  examples: {
    angular: `<p-picklist [source]="disponiveis" [target]="selecionados"
  dataKey="id" sourceHeader="Disponíveis" targetHeader="Selecionados"
  [dragdrop]="true" filterBy="nome"
  sourceFilterPlaceholder="Buscar disponível…"
  targetFilterPlaceholder="Buscar selecionado…"
  [showTargetControls]="true" [metaKeySelection]="false"
  (onMoveToTarget)="sincronizar($event)"
  (targetChange)="salvarSelecionados($event)">
  <ng-template pTemplate="item" let-item>
    <span>{{ item.nome }}</span>
  </ng-template>
</p-picklist>`,
    html: `<section aria-label="Selecionar permissões">
  <ul aria-label="Disponíveis">
    <li aria-selected="true">Ler relatórios</li>
    <li aria-selected="false">Exportar dados</li>
  </ul>
  <div role="group" aria-label="Transferir">
    <button type="button" aria-label="Mover para selecionados"><i class="fa-solid fa-angle-right" aria-hidden="true"></i></button>
    <button type="button" aria-label="Mover todos para selecionados"><i class="fa-solid fa-angles-right" aria-hidden="true"></i></button>
    <button type="button" aria-label="Remover dos selecionados"><i class="fa-solid fa-angle-left" aria-hidden="true"></i></button>
    <button type="button" aria-label="Remover todos dos selecionados"><i class="fa-solid fa-angles-left" aria-hidden="true"></i></button>
  </div>
  <ul aria-label="Selecionados">
    <li aria-selected="false">Editar cadastro</li>
  </ul>
</section>`,
    inContext: `<!-- montar o grupo de participantes num diálogo, com busca dos dois lados -->
<section data-block="list-management" aria-label="Participantes do projeto">
  <div class="picklist">
    <div class="picklist-source">
      <h3 id="src-h">Disponíveis</h3>
      <input type="search" aria-label="Buscar disponível" placeholder="Buscar…" />
      <ul aria-labelledby="src-h"><!-- <li> disponíveis --></ul>
    </div>
    <div role="group" aria-label="Transferir participantes"><!-- botões mover/voltar --></div>
    <div class="picklist-target">
      <h3 id="tgt-h">No projeto</h3>
      <input type="search" aria-label="Buscar no projeto" placeholder="Buscar…" />
      <ul aria-labelledby="tgt-h"><!-- <li> selecionados --></ul>
    </div>
  </div>
</section>`,
  },

  a11y: {
    role: 'duas listbox (origem/destino) + grupo de botões de transferência e de reordenar',
    keyboard: [
      'Tab percorre a lista de origem, os botões de transferência, a lista de destino e os controles de reordenar',
      'setas navegam os itens de cada lista; Espaço/Enter seleciona',
      'botões de transferência e de mover agem sobre os itens selecionados (Enter/Espaço)',
    ],
    requiredAria: [
      'cada lista com nome (aria-label/aria-labelledby): "Disponíveis" e "Selecionados"',
      'itens como `<li>` com aria-selected; posição anunciada onde a ordem importa',
      'botões de transferência e de mover num `role="group"` rotulado, cada botão com aria-label textual',
      'transferência anunciada (aria-live) para quem não vê os itens trocarem de lista',
    ],
    contrastMin: '4.5:1 do texto dos itens; 3:1 do realce do item selecionado e do foco',
  },

  aiHints: {
    keywords: [
      'picklist', 'duas listas', 'transferir itens', 'mover entre listas', 'disponíveis e selecionados',
      'disponiveis e selecionados', 'origem e destino', 'lista dupla', 'seleção lado a lado',
      'selecao lado a lado', 'atribuir', 'mover para o outro lado', 'shuttle', 'dual list',
    ],
    selectionCriteria:
      'Escolha PickList quando a pessoa monta um subconjunto TRANSFERINDO itens entre duas listas visíveis (disponíveis ↔ selecionados), com mover-todos e, se preciso, reordenar o destino. Se é uma lista só (reordenar), é OrderList. Se só interessa o resultado compacto, é MultiSelect.',
    disambiguation: [
      { confundeCom: 'orderlist', criterio: 'OrderList reordena UMA lista; PickList transfere entre DUAS (origem↔destino).' },
      { confundeCom: 'multiselect', criterio: 'MultiSelect escolhe vários num campo compacto (só o resultado); PickList mostra as duas listas lado a lado e move em lote.' },
      { confundeCom: 'checkbox', criterio: 'Poucas opções (2–5) = grupo de Checkbox; PickList quando são muitas e ver/comparar os dois lados ajuda.' },
      { confundeCom: 'organizationchart', criterio: 'OrganizationChart mostra hierarquia pai/filho; PickList são duas listas planas com transferência.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/picklist',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Internamente reusa Listbox + Button; itens por template; vazio reusa `empty-state`, filtros reusam `search-input`. Reordenar cada lista segue a mesma lógica de `orderlist`. Saída = duas `<ul>` semânticas + grupo de botões de transferência com aria-label.',
  },
};
