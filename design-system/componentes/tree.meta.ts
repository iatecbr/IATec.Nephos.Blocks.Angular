/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · tree.meta.ts — ONDA "DADOS" (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-tree`. API lida do código real
 * (primeng@21.0.2, `types/primeng-tree.d.ts`).
 *
 * Exibe DADOS HIERÁRQUICOS (pai → filhos) que se expandem e recolhem.
 * Os itens vêm em `value` como `TreeNode[]` (cada nó: `label`, `children`,
 * `key`, `icon`, `expanded`, `leaf`, `selectable`…). Seleção opcional
 * (single / multiple / checkbox), filtro, arrastar-e-soltar, virtual scroll
 * e modo lazy existem e estão apontados no `note` — não se reescreve nada.
 *
 * Saída do Moses = a estrutura ARIA de árvore: `<ul role="tree">` com
 * `<li role="treeitem" aria-expanded aria-selected>` e `<ul role="group">`
 * para os filhos — NUNCA uma pilha de `<div>` sem semântica.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const treeMeta: NephosComponentMeta = {
  identity: {
    id: 'tree',
    name: 'Tree',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Árvore navegável de dados hierárquicos (pai/filho) que se expandem e recolhem.',
    whenToUse: [
      'Mostrar uma hierarquia navegável: pastas/arquivos, organograma, categorias e subcategorias, capítulos.',
      'Quando a pessoa precisa expandir/recolher ramos e, opcionalmente, selecionar nós (inclusive com checkbox em cascata).',
      'Quando a relação pai→filho é a informação principal — não colunas comparáveis.',
    ],
    whenNotToUse: [
      'Dados planos, sem hierarquia — use DataTable (colunas) ou DataView (cartões).',
      'Hierarquia que TAMBÉM precisa de várias colunas por linha (valor, status, data) — use TreeTable.',
      'Escolher um nó dentro de um formulário, num campo compacto — use TreeSelect.',
      'Menu de navegação do app (rotas) — use um menu/PanelMenu, não uma Tree de dados.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'value',
        type: 'TreeNode[]',
        default: '—',
        description: 'Os nós da árvore. Obrigatório. Cada `TreeNode` traz `label` (texto), `children` (filhos), `key` (id único), `icon`, `expanded`, `leaf` (folha, sem filhos) e `selectable`. É a hierarquia inteira.',
      },
      {
        name: 'selectionMode',
        type: "'single' | 'multiple' | 'checkbox' | null",
        default: 'null',
        description: 'Se e como se seleciona nós: `single` (um), `multiple` (vários com Ctrl/Meta), `checkbox` (caixas por nó, com propagação pai↔filho). `null` = árvore só para navegar/expandir, sem seleção. Acompanha `[(selection)]`.',
      },
      {
        name: 'metaKeySelection',
        type: 'boolean',
        default: 'false',
        description: 'No modo `multiple`, se `true` exige segurar Ctrl/Meta para marcar vários; se `false` cada clique alterna o nó individualmente. Em toque é desligado automaticamente.',
      },
      {
        name: 'propagateSelectionUp',
        type: 'boolean',
        default: 'true',
        description: 'No modo `checkbox`: marcar/desmarcar um nó reflete no PAI (estado parcial quando só alguns filhos estão marcados). Mantém a lógica de seleção em cascata.',
      },
      {
        name: 'propagateSelectionDown',
        type: 'boolean',
        default: 'true',
        description: 'No modo `checkbox`: marcar um pai marca todos os FILHOS descendentes. Anda junto de `propagateSelectionUp`.',
      },
      {
        name: 'filter',
        type: 'boolean',
        default: 'false',
        description: 'Mostra um campo de busca acima da árvore para filtrar os nós. Ligar quando a árvore é grande. Combina com `filterBy` e `filterMode`.',
      },
      {
        name: 'filterBy',
        type: 'string',
        default: "'label'",
        description: 'Campo(s) do nó que o filtro considera (separados por vírgula). Por padrão busca pelo `label` visível.',
      },
      {
        name: 'filterMode',
        type: "'lenient' | 'strict'",
        default: 'lenient',
        description: '`lenient` mantém o ramo visível se qualquer descendente casa; `strict` exige que o próprio nó (ou o caminho) case. Define o quanto o filtro "abre" a árvore.',
      },
      {
        name: 'filterPlaceholder',
        type: 'string',
        default: '—',
        description: 'Texto de dica dentro do campo de busca ("Buscar…"). Não substitui um rótulo acessível do campo.',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Mostra o estado de carregando (marcar a região como ocupada; combinar com Skeleton). Útil enquanto os nós chegam do servidor.',
      },
      {
        name: 'loadingMode',
        type: "'mask' | 'icon'",
        default: 'mask',
        description: 'Como exibir o carregando: `mask` cobre a árvore inteira; `icon` mostra um indicador por nó (usado com carregamento lazy de ramos).',
      },
      {
        name: 'lazy',
        type: 'boolean',
        default: 'false',
        description: 'Carregamento sob demanda: os filhos de um nó só são buscados ao expandir, disparando `onNodeExpand`/`onLazyLoad`. ESSENCIAL para árvores grandes — não traz tudo de uma vez.',
      },
      {
        name: 'virtualScroll',
        type: 'boolean',
        default: 'false',
        description: 'Renderiza só os nós visíveis (árvores enormes já expandidas). Requer `virtualScrollItemSize` (altura de cada nó).',
      },
      {
        name: 'scrollHeight',
        type: 'string',
        default: '—',
        description: 'Altura da área rolável (ex.: "400px" ou "flex"). Fixa a altura visível da árvore e liga a rolagem interna.',
      },
      {
        name: 'draggableNodes',
        type: 'boolean',
        default: 'false',
        description: 'Permite arrastar nós. Combina com `droppableNodes` e os escopos `draggableScope`/`droppableScope` para reordenar/mover ramos. Recurso avançado.',
      },
      {
        name: 'droppableNodes',
        type: 'boolean',
        default: 'false',
        description: 'Permite soltar nós arrastados dentro da árvore (reordenar/aninhar). Anda junto de `draggableNodes`.',
      },
      {
        name: 'highlightOnSelect',
        type: 'boolean',
        default: 'false',
        description: 'Destaca (realça) a linha inteira do nó ao selecionar, além do estado de seleção. Ajuste visual.',
      },
      {
        name: 'emptyMessage',
        type: 'string',
        default: '—',
        description: 'Texto quando não há nós (ou o filtro não achou nada). Preferir o bloco `empty-state` pelo template `empty`.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: '—',
        description: 'Rótulo acessível da árvore inteira (o que ela representa). Alternativa: `ariaLabelledBy` apontando para um título visível.',
      },
      {
        name: 'togglerAriaLabel',
        type: 'string',
        default: '—',
        description: 'Rótulo acessível do botão que expande/recolhe cada nó (ex.: "Expandir ramo"). Garante que o toggler seja anunciado.',
      },
    ],
    outputs: [
      { name: 'onNodeSelect', payload: 'TreeNodeSelectEvent { originalEvent, node }', description: 'Um nó foi selecionado.' },
      { name: 'onNodeUnselect', payload: 'TreeNodeUnSelectEvent { originalEvent, node }', description: 'Um nó foi desmarcado.' },
      { name: 'onNodeExpand', payload: 'TreeNodeExpandEvent { originalEvent, node }', description: 'Um nó foi expandido. Em modo lazy, é AQUI que se buscam os filhos.' },
      { name: 'onNodeCollapse', payload: 'TreeNodeCollapseEvent { originalEvent, node }', description: 'Um nó foi recolhido.' },
      { name: 'onNodeContextMenuSelect', payload: 'TreeNodeContextMenuSelectEvent { originalEvent, node }', description: 'Nó selecionado por clique direito (menu de contexto).' },
      { name: 'onNodeDoubleClick', payload: 'TreeNodeDoubleClickEvent { originalEvent, node }', description: 'Nó recebeu duplo clique (abrir/ativar).' },
      { name: 'onNodeDrop', payload: 'TreeNodeDropEvent { originalEvent, dragNode, dropNode, index }', description: 'Um nó foi solto após arrastar (reordenar/mover).' },
      { name: 'onLazyLoad', payload: 'TreeLazyLoadEvent', description: 'Modo lazy: pede ao servidor os filhos/dados sob demanda.' },
      { name: 'onFilter', payload: 'TreeFilterEvent { filter, filteredValue }', description: 'A árvore foi filtrada.' },
      { name: 'onScroll', payload: 'TreeScrollEvent', description: 'Rolagem mudou (modo virtual scroll).' },
      { name: 'onScrollIndexChange', payload: 'TreeScrollIndexChangeEvent', description: 'A faixa de nós visíveis mudou (virtual scroll).' },
    ],
    slots: [
      { name: 'header', accepts: 'ng-template pTemplate="header" — barra acima da árvore (título, ações)', optional: true },
      { name: 'node', accepts: 'nodeTemplate / ng-template pTemplate="default" — como desenhar cada nó (ícone + texto + ação)', optional: true },
      { name: 'footer', accepts: 'ng-template pTemplate="footer" — rodapé', optional: true },
      { name: 'empty', accepts: 'ng-template pTemplate="empty" — estado vazio (usar o bloco empty-state)', optional: true },
      { name: 'filter', accepts: 'ng-template pTemplate="filter" — campo de filtro customizado', optional: true },
      { name: 'loader', accepts: 'ng-template pTemplate="loader" — indicador de carregando (modo lazy/virtual)', optional: true },
      { name: 'togglericon', accepts: 'ng-template pTemplate="togglericon" — ícone de expandir/recolher (interno: sobrescrito p/ Font Awesome)', optional: true },
      { name: 'checkboxicon', accepts: 'ng-template pTemplate="checkboxicon" — ícone do checkbox do nó', optional: true },
    ],
    states: ['default', 'expanded', 'collapsed', 'node-selected', 'checkbox-checked', 'checkbox-partial', 'loading', 'empty', 'filtered'],
    invalidCombinations: [
      {
        combo: 'selectionMode com nós sem `key` única',
        porque: 'Sem uma chave única por nó, a seleção (em especial checkbox com propagação) perde a identidade dos nós e o estado "pula" ao expandir/filtrar.',
      },
      {
        combo: 'lazy=true sem tratar `onNodeExpand`/`onLazyLoad`',
        porque: 'Os filhos nunca são buscados ao expandir — o ramo fica preso em "carregando" ou vazio.',
      },
      {
        combo: 'virtualScroll=true sem `virtualScrollItemSize`',
        porque: 'Sem a altura de cada nó, o cálculo de rolagem virtual não sabe quantos nós cabem — a lista quebra.',
      },
      {
        combo: 'montar a árvore com `<div>` aninhados sem roles ARIA',
        porque: 'Perde o padrão de árvore: o leitor de tela não anuncia nível, "expansível", posição no ramo, nem navega por setas.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'panel', 'page', 'dialog', 'drawer'],
    children: ['checkbox', 'icon', 'search-input', 'skeleton', 'empty-state'],
    commonlyUsedWith: ['treetable', 'card', 'toolbar', 'search-input', 'contextmenu'],
    partOfPatterns: ['hierarchy-navigation', 'folder-browser', 'category-picker'],
  },

  tokens: {
    typography: 'body-lg (nós)',
    byState: {
      default: { text: 'surface/text', toggler: 'surface/500' },
      hover: { nodeContent: 'surface/100' },
      selected: { nodeContent: 'primary/50', text: 'primary/color' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Indentação, alturas e o realce de nó herdam dos tokens de Tree do PrimeNG. Nó selecionado = destaque suave da marca (highlight). O ícone de expandir/recolher é INTERNO do PrimeNG (sobrescrito para Font Awesome — decisão 27/07); os ícones de CONTEÚDO do nó (pasta, arquivo) que o Moses emite seguem Font Awesome 7. RECURSOS AVANÇADOS (existem no p-tree, não detalhados aqui): arrastar-e-soltar (draggableNodes/droppableNodes/scope), virtual scroll (virtualScroll), lazy por ramo, menu de contexto (contextMenu). Ver primeng.org/tree. Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca montar a árvore com `<div>` aninhados sem os roles de árvore.',
      porque: 'Sem role="tree"/"treeitem"/"group" e sem aria-expanded/aria-level, a tecnologia assistiva não anuncia a hierarquia nem permite navegar por setas.',
      emVezDisso: '`<ul role="tree">` com `<li role="treeitem" aria-expanded aria-level>` e `<ul role="group">` para os filhos — o p-tree já emite a estrutura acessível.',
    },
    {
      regra: 'Nunca sinalizar "tem filhos" / "expandido" só com uma setinha colorida.',
      porque: 'A seta sozinha não é anunciada; quem usa leitor de tela não sabe que o nó abre nem se está aberto.',
      emVezDisso: 'O toggler como `<button>` com aria-label e o nó com `aria-expanded="true|false"` — cor/ícone só reforçam.',
    },
    {
      regra: 'Nunca usar Tree para dados planos só para "ficar bonito".',
      porque: 'Sem hierarquia real, a expansão vira ruído e esconde itens que deveriam estar à vista.',
      emVezDisso: 'DataTable (colunas) ou DataView (cartões) para dados planos; Tree só quando existe pai→filho.',
    },
    {
      regra: 'Nunca carregar uma árvore gigante inteira de uma vez.',
      porque: 'Trava a tela renderizando milhares de nós que a pessoa nem vai expandir.',
      emVezDisso: 'Modo `lazy` (carregar filhos ao expandir) ou `virtualScroll` para árvores muito grandes.',
    },
  ],

  examples: {
    angular: `<p-tree [value]="pastas" selectionMode="checkbox" [(selection)]="selecionados"
  [filter]="true" filterPlaceholder="Buscar pasta"
  ariaLabel="Estrutura de pastas">
  <ng-template pTemplate="empty"><!-- bloco empty-state --></ng-template>
</p-tree>`,
    html: `<ul role="tree" aria-label="Estrutura de pastas">
  <li role="treeitem" aria-level="1" aria-expanded="true" aria-selected="false">
    <button type="button" aria-label="Recolher ramo">
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
    </button>
    <i class="fa-solid fa-folder-open" aria-hidden="true"></i>
    <span>Documentos</span>
    <ul role="group">
      <li role="treeitem" aria-level="2" aria-selected="false">
        <i class="fa-solid fa-file-lines" aria-hidden="true"></i>
        <span>Contrato.pdf</span>
      </li>
      <li role="treeitem" aria-level="2" aria-expanded="false" aria-selected="false">
        <button type="button" aria-label="Expandir ramo">
          <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
        </button>
        <i class="fa-solid fa-folder" aria-hidden="true"></i>
        <span>Anexos</span>
      </li>
    </ul>
  </li>
</ul>`,
    inContext: `<!-- navegador de hierarquia: busca + árvore num painel lateral -->
<section data-block="hierarchy-navigation" aria-label="Categorias">
  <form role="search">
    <label for="q-tree" class="visually-hidden">Buscar categoria</label>
    <input id="q-tree" type="search" placeholder="Buscar categoria…" />
  </form>

  <ul role="tree" aria-label="Categorias de produtos">
    <li role="treeitem" aria-level="1" aria-expanded="false" aria-selected="false">
      <button type="button" aria-label="Expandir ramo">
        <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
      </button>
      <span>Eletrônicos</span>
    </li>
    <!-- demais ramos -->
  </ul>
</section>`,
  },

  a11y: {
    role: 'tree; cada nó role="treeitem"; filhos em role="group"',
    keyboard: [
      'Setas ↑/↓ movem entre nós visíveis',
      'Seta → expande o nó (ou vai ao primeiro filho); Seta ← recolhe (ou vai ao pai)',
      'Enter/Espaço seleciona (ou marca o checkbox do nó)',
      'Home/End vão ao primeiro/último nó',
      'Tab entra e sai da árvore (um único ponto de tabulação)',
    ],
    requiredAria: [
      'container com role="tree" e nome (aria-label ou aria-labelledby)',
      'cada nó com role="treeitem", aria-level e (se tem filhos) aria-expanded="true|false"',
      'filhos agrupados em role="group"',
      'seleção anunciada com aria-selected (ou o checkbox real com seu rótulo, inclusive estado parcial aria-checked="mixed")',
      'toggler de expandir/recolher com rótulo acessível; carregando com aria-busy; vazio em role="status"',
    ],
    contrastMin: '4.5:1 do texto dos nós; 3:1 do realce do nó selecionado e do ícone de expandir',
  },

  aiHints: {
    keywords: [
      'árvore', 'arvore', 'tree', 'hierarquia', 'hierarquico', 'hierárquico', 'pai e filho', 'pai filho',
      'expandir', 'recolher', 'ramificação', 'ramificacao', 'pastas', 'organograma', 'nós', 'nos', 'aninhado',
      'categorias', 'subcategorias', 'níveis', 'niveis', 'árvore de seleção', 'checkbox em cascata',
    ],
    selectionCriteria:
      'Escolha Tree quando o dado é uma HIERARQUIA navegável (pai→filho) que expande/recolhe, e a relação de aninhamento é o foco. Se além da hierarquia precisa de várias colunas por linha, use TreeTable. Se é para ESCOLHER um nó num campo de formulário, use TreeSelect. Dados planos = DataTable/DataView.',
    disambiguation: [
      { confundeCom: 'treetable', criterio: 'TreeTable é a mesma hierarquia MAS com colunas comparáveis por linha (valor, status, data); Tree só tem o rótulo do nó (uma "coluna").' },
      { confundeCom: 'treeselect', criterio: 'TreeSelect é um CAMPO compacto que abre uma árvore para escolher; Tree é a árvore aberta, exibida na página.' },
      { confundeCom: 'datatable', criterio: 'DataTable é para dados PLANOS em colunas; Tree é para dados com aninhamento pai/filho.' },
      { confundeCom: 'panelmenu', criterio: 'PanelMenu/menu é NAVEGAÇÃO do app (rotas/ações agrupadas); Tree exibe e seleciona DADOS hierárquicos.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/tree',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Nós por `TreeNode[]` + templates (node/header/empty/…). Saída = estrutura ARIA de árvore (`<ul role="tree">` / `<li role="treeitem">`); vazio reusa `empty-state`, carregando reusa `skeleton`, busca reusa `search-input`. Ícone de toggler interno é sobrescrito para Font Awesome; ícones de conteúdo do nó seguem Font Awesome 7.',
  },
};
