/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · organizationchart.meta.ts — FAMÍLIA "TRANSFERÊNCIA E ORGANOGRAMA"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-organizationchart`. API lida do código real
 * (primeng@21.0.2, `types/primeng-organizationchart.d.ts`).
 *
 * Organograma: visualiza uma HIERARQUIA (pai → filhos) em árvore
 * de cima para baixo, com conectores. Recebe `TreeNode[]` aninhados,
 * cada nó desenhado por template (por `type`). Nós podem ser
 * selecionáveis e expansíveis/recolhíveis (`collapsible`).
 * Saída do Moses = uma estrutura hierárquica navegável (árvore ARIA
 * ou lista aninhada `<ul>`/`<li>`), não uma tabela de layout.
 *
 * Irmãs da família: `orderlist` (reordenar uma lista) e `picklist`
 * (transferir entre duas listas). Hierarquia ≠ ordem ≠ transferência.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const organizationChartMeta: NephosComponentMeta = {
  identity: {
    id: 'organizationchart',
    name: 'OrganizationChart',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Organograma que mostra uma hierarquia pai→filhos em árvore, de cima para baixo.',
    whenToUse: [
      'Representar relações hierárquicas onde a POSIÇÃO na árvore comunica sentido: estrutura organizacional, cadeia de comando, taxonomia, torneio.',
      'Quando ver os conectores (quem está sob quem) ajuda a entender melhor que uma lista indentada.',
      'Quando cada nó precisa de um cartão rico (nome, cargo, foto) e a hierarquia é relativamente enxuta.',
    ],
    whenNotToUse: [
      'Hierarquia com MUITOS nós que se navega/expande em profundidade — o Tree (lista de árvore) escala melhor e ocupa menos.',
      'Dados hierárquicos comparáveis em colunas — use TreeTable.',
      'Lista linear sem hierarquia — use uma lista simples, OrderList ou DataView.',
      'Só reordenar ou transferir itens — OrderList / PickList.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'value',
        type: 'TreeNode[]',
        default: '—',
        description: 'A hierarquia como TreeNodes aninhados (cada nó com `children`, e opcionalmente `label`, `type`, `expanded`, `data`). Obrigatório — é o organograma em si.',
      },
      {
        name: 'selectionMode',
        type: "'single' | 'multiple' | null",
        default: 'null',
        description: 'Permite selecionar nós: um por vez (`single`), vários (`multiple`) ou nenhum (`null`, só visualização). Combine com `[(selection)]`.',
      },
      {
        name: 'selection',
        type: 'TreeNode | TreeNode[]',
        default: '—',
        description: 'O(s) nó(s) selecionado(s). Two-way com `selectionChange`. Um TreeNode em modo single, um array em multiple.',
      },
      {
        name: 'collapsible',
        type: 'boolean',
        default: 'false',
        description: 'Permite recolher/expandir ramos (aparece o botão de toggle no nó). Ligar ajuda em árvores grandes; a posição expandida vem de `node.expanded`.',
      },
      {
        name: 'preserveSpace',
        type: 'boolean',
        default: 'true',
        description: '[DEPRECATED desde v20] Mantém o espaço do nó quando recolhido. Evitar usar — está marcado como obsoleto no PrimeNG.',
      },
    ],
    outputs: [
      { name: 'selectionChange', payload: 'TreeNode | TreeNode[]', description: 'Two-way da seleção de nós.' },
      { name: 'onNodeSelect', payload: 'OrganizationChartNodeSelectEvent { originalEvent, node }', description: '⭐ Um nó foi selecionado.' },
      { name: 'onNodeUnselect', payload: 'OrganizationChartNodeUnSelectEvent { originalEvent, node }', description: 'Um nó foi desmarcado.' },
      { name: 'onNodeExpand', payload: 'OrganizationChartNodeExpandEvent { originalEvent, node }', description: 'Um ramo foi expandido (quando collapsible).' },
      { name: 'onNodeCollapse', payload: 'OrganizationChartNodeCollapseEvent { originalEvent, node }', description: 'Um ramo foi recolhido (quando collapsible).' },
    ],
    slots: [
      { name: '(por type)', accepts: "ng-template [pTemplate]=\"'<type>'\" let-node — desenha o conteúdo do nó conforme `node.type` (ex.: 'person', 'department'); um template sem type é o padrão", optional: true },
      { name: 'togglericon', accepts: 'ng-template pTemplate="togglericon" — ícone do botão de expandir/recolher', optional: true },
    ],
    states: ['default', 'node-selected', 'expanded', 'collapsed'],
    invalidCombinations: [
      {
        combo: 'selection preenchida sem `selectionMode`',
        porque: 'Sem o modo de seleção, os cliques não selecionam nada — a seleção nunca acontece.',
      },
      {
        combo: 'OrganizationChart para hierarquia enorme/profunda de navegação',
        porque: 'A árvore em cartões cresce muito na horizontal e vira um mapa impraticável; esse caso é Tree/TreeTable.',
      },
      {
        combo: 'montar o organograma com `<div>`/`<table>` de layout sem semântica de árvore',
        porque: 'A tecnologia assistiva não anuncia a relação pai/filho nem navega por níveis; vira um amontoado de caixas.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'page', 'dialog'],
    children: ['avatar', 'tag', 'icon-button', 'button', 'badge'],
    commonlyUsedWith: ['avatar', 'card', 'tag', 'tooltip'],
    partOfPatterns: ['hierarchy-visualization'],
  },

  tokens: {
    typography: 'body-lg (rótulo do nó); title-sm quando o nó é um cartão com destaque',
    byState: {
      default: { nodeText: 'surface/text', nodeBorder: 'surface/200', connector: 'surface/300', background: 'surface/0' },
      hover: { node: 'surface/100' },
      selected: { node: 'primary/50', text: 'primary/color', nodeBorder: 'primary/color' },
      toggle: { icon: 'surface/500', hover: 'surface/700' },
    },
    note: 'Nós, conectores e o botão de toggle herdam do PrimeNG. Nó selecionado = destaque suave da marca (highlight). Conteúdo do nó costuma reusar Avatar/Tag/Card (ver fichas). Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar OrganizationChart como diagrama de layout genérico.',
      porque: 'Ele codifica hierarquia pai/filho; usar sem hierarquia real engana quem lê (sugere subordinação onde não há).',
      emVezDisso: 'Só quando existe uma hierarquia verdadeira; para posicionar blocos, use grid/layout comum.',
    },
    {
      regra: 'Nunca depender só dos conectores visuais para comunicar a relação.',
      porque: 'As linhas de conexão não são anunciadas; quem usa leitor de tela não percebe quem está sob quem.',
      emVezDisso: 'Estrutura de árvore acessível (role="tree"/"treeitem" com aria-level/aria-expanded) ou lista aninhada `<ul>`/`<li>` que expresse os níveis.',
    },
    {
      regra: 'Nunca sinalizar o nó selecionado só pela cor.',
      porque: 'Quem não distingue cores não percebe qual nó está ativo.',
      emVezDisso: 'aria-selected no nó + um reforço não-cromático (borda mais forte, ícone) além do realce da marca.',
    },
    {
      regra: 'Nunca despejar uma árvore gigante inteira aberta de uma vez.',
      porque: 'O organograma cresce demais na horizontal e fica impossível de ler ou navegar.',
      emVezDisso: '`collapsible` com ramos recolhidos por padrão; ou trocar para Tree/TreeTable quando a árvore é grande.',
    },
  ],

  examples: {
    angular: `<p-organizationchart [value]="organograma"
  selectionMode="single" [(selection)]="noSelecionado"
  [collapsible]="true"
  (onNodeSelect)="abrirDetalhe($event.node)">
  <ng-template let-node pTemplate="person">
    <div class="org-node">
      <p-avatar [image]="node.data.foto" shape="circle" />
      <strong>{{ node.label }}</strong>
      <span>{{ node.data.cargo }}</span>
    </div>
  </ng-template>
</p-organizationchart>`,
    html: `<div role="tree" aria-label="Estrutura da equipe">
  <div role="treeitem" aria-level="1" aria-expanded="true" aria-selected="false">
    <div class="org-node"><strong>Diretoria</strong></div>
    <div role="group">
      <div role="treeitem" aria-level="2" aria-expanded="true" aria-selected="true">
        <div class="org-node"><strong>Coordenação Pedagógica</strong></div>
        <div role="group">
          <div role="treeitem" aria-level="3" aria-selected="false">
            <div class="org-node"><strong>Professores</strong></div>
          </div>
        </div>
      </div>
      <div role="treeitem" aria-level="2" aria-selected="false">
        <div class="org-node"><strong>Secretaria</strong></div>
      </div>
    </div>
  </div>
</div>`,
    inContext: `<!-- organograma da escola num cartão, nó abre detalhe -->
<section data-block="hierarchy-visualization" aria-label="Organograma da escola">
  <div class="card">
    <h2>Estrutura</h2>
    <div role="tree" aria-label="Organograma da escola">
      <div role="treeitem" aria-level="1" aria-expanded="true">
        <div class="org-node">
          <span class="avatar" aria-hidden="true"></span>
          <strong>Direção</strong>
          <span class="tag" data-severity="info">Gestão</span>
        </div>
        <div role="group"><!-- treeitems filhos --></div>
      </div>
    </div>
  </div>
</section>`,
  },

  a11y: {
    role: 'árvore (tree) de nós; cada nó um treeitem com nível e estado',
    keyboard: [
      'Tab entra na árvore; setas cima/baixo percorrem os nós visíveis',
      'seta direita expande / esquerda recolhe o ramo (quando collapsible)',
      'Enter/Espaço seleciona o nó (quando selectionMode ativo)',
    ],
    requiredAria: [
      'estrutura de árvore acessível (role="tree"/"treeitem" com aria-level) ou lista aninhada `<ul>`/`<li>`',
      'aria-expanded nos nós que têm filhos (quando collapsible)',
      'aria-selected no nó ativo (quando selectionMode ativo)',
      'nome acessível da árvore (aria-label) dizendo o que a hierarquia representa',
    ],
    contrastMin: '4.5:1 do texto dos nós; 3:1 dos conectores, da borda do nó selecionado e do foco',
  },

  aiHints: {
    keywords: [
      'organograma', 'organization chart', 'organizationchart', 'hierarquia', 'árvore hierárquica',
      'arvore hierarquica', 'estrutura organizacional', 'cadeia de comando', 'pai e filho',
      'níveis', 'niveis', 'quem reporta a quem', 'diagrama hierárquico', 'diagrama hierarquico', 'chaveamento',
    ],
    selectionCriteria:
      'Escolha OrganizationChart para VISUALIZAR uma hierarquia pai→filhos em árvore de cima para baixo, quando ver os conectores ajuda e a árvore é enxuta. Se a hierarquia é grande/profunda e se navega por expansão, use Tree; se tem colunas comparáveis, TreeTable. Sem hierarquia, é lista/OrderList.',
    disambiguation: [
      { confundeCom: 'orderlist', criterio: 'OrderList é uma sequência linear plana que se reordena; OrganizationChart mostra hierarquia pai/filho.' },
      { confundeCom: 'picklist', criterio: 'PickList transfere itens entre duas listas planas; OrganizationChart não transfere, exibe uma árvore.' },
      { confundeCom: 'tree', criterio: 'Tree é a hierarquia como lista indentada (escala para muitos nós, ocupa pouco); OrganizationChart é o mesmo dado em cartões e conectores (visual, enxuto).' },
      { confundeCom: 'treetable', criterio: 'TreeTable é hierarquia + colunas comparáveis por nó; OrganizationChart é só a estrutura visual, sem colunas.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/organizationchart',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Recebe `TreeNode[]`; nós por template (por `type`); conteúdo do nó reusa `avatar`/`tag`/`card`. `preserveSpace` está deprecado no PrimeNG — evitar. Saída = árvore ARIA (tree/treeitem) ou lista aninhada semântica, nunca tabela de layout.',
  },
};
