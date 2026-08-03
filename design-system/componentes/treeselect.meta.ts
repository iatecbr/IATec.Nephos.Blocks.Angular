/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · treeselect.meta.ts — controle de formulário (PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-treeSelect`. API lida do código real
 * (primeng@21.0.2, `types/primeng-treeselect.d.ts`).
 *
 * É o Select da família Tree: um CAMPO compacto que, ao abrir, mostra
 * uma ÁRVORE (dados hierárquicos) para escolher um ou vários nós. As
 * opções vêm em `options` como `TreeNode[]`. Seleção single / multiple /
 * checkbox (com propagação pai↔filho); filtro, chips e limpar existem.
 *
 * Saída do Moses = padrão de combobox acessível: `<label for>` +
 * disparador (button role="combobox" aria-expanded) que abre um popup
 * com `role="tree"` — nunca um `<div>` clicável sem semântica.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const treeSelectMeta: NephosComponentMeta = {
  identity: {
    id: 'treeselect',
    name: 'TreeSelect',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Campo de formulário que abre uma árvore para escolher um (ou vários) nó hierárquico.',
    whenToUse: [
      'Escolher um item dentro de uma HIERARQUIA num formulário compacto: categoria/subcategoria, departamento dentro da estrutura, pasta de destino, conta do plano de contas.',
      'Quando as opções têm pai→filho e mostrar a árvore inteira aberta ocuparia espaço demais.',
      'Quando faz sentido marcar vários nós com checkbox em cascata (pai marca os filhos).',
    ],
    whenNotToUse: [
      'Lista de opções PLANA (sem hierarquia) — use Select (uma) ou MultiSelect (várias).',
      'Exibir e navegar a árvore inteira na página (não escolher num campo) — use Tree.',
      'Hierarquia com colunas comparáveis por linha — use TreeTable.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'options',
        type: 'TreeNode[]',
        default: '—',
        description: 'As opções em árvore. Cada `TreeNode` traz `label` (texto), `children` (filhos), `key` (id único), `icon` e `selectable`. É a hierarquia que abre no popup.',
      },
      {
        name: 'selectionMode',
        type: "'single' | 'multiple' | 'checkbox'",
        default: 'single',
        description: 'Quantos nós se pode escolher: `single` (um), `multiple` (vários), `checkbox` (caixas por nó com propagação pai↔filho). Define o comportamento do campo.',
      },
      {
        name: 'display',
        type: "'comma' | 'chip'",
        default: 'comma',
        description: 'Como mostrar a seleção no campo quando há vários: `comma` (nomes separados por vírgula) ou `chip` (cada escolha como uma tag removível). Só relevante em multiple/checkbox.',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: '—',
        description: 'Texto quando nada foi escolhido ("Selecione…"). Não substitui o rótulo (`<label>`).',
      },
      {
        name: 'filter',
        type: 'boolean',
        default: 'false',
        description: 'Mostra um campo de busca dentro do popup para filtrar os nós. Ligar quando a árvore de opções é grande. Combina com `filterBy` e `filterMode`.',
      },
      {
        name: 'filterBy',
        type: 'string',
        default: "'label'",
        description: 'Campo(s) do nó que a busca considera (separados por vírgula). Por padrão filtra pelo `label` visível.',
      },
      {
        name: 'filterPlaceholder',
        type: 'string',
        default: '—',
        description: 'Texto de dica dentro do campo de busca do popup.',
      },
      {
        name: 'showClear',
        type: 'boolean',
        default: 'false',
        description: 'Mostra um "x" para limpar a escolha. Só quando "nenhum" é um estado válido.',
      },
      {
        name: 'propagateSelectionDown',
        type: 'boolean',
        default: 'true',
        description: 'No modo `checkbox`: marcar um pai marca todos os FILHOS descendentes.',
      },
      {
        name: 'propagateSelectionUp',
        type: 'boolean',
        default: 'true',
        description: 'No modo `checkbox`: marcar/desmarcar reflete no PAI (estado parcial quando só alguns filhos estão marcados).',
      },
      {
        name: 'metaKeySelection',
        type: 'boolean',
        default: 'false',
        description: 'No modo `multiple`, se `true` exige Ctrl/Meta para marcar vários; se `false` cada clique alterna o nó. Desligado em toque.',
      },
      {
        name: 'size',
        type: "'small' | 'large'",
        default: '(normal)',
        description: 'Densidade do campo. `small` em filtros densos. Omitir para o tamanho padrão. Manter o mesmo dos campos vizinhos.',
      },
      {
        name: 'variant',
        type: "'outlined' | 'filled'",
        default: 'outlined',
        description: 'Estilo da borda do campo. Manter o mesmo variant de todos os campos do formulário.',
      },
      {
        name: 'fluid',
        type: 'boolean',
        default: 'false',
        description: 'Ocupa 100% da largura do contêiner. Comum em formulário de coluna única.',
      },
      {
        name: 'scrollHeight',
        type: 'string',
        default: "'400px'",
        description: 'Altura máxima do popup da árvore antes de aparecer barra de rolagem interna.',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Mostra o estado de carregando (enquanto as opções chegam do servidor). Combina com `loadingMode` (mask/icon).',
      },
      {
        name: 'emptyMessage',
        type: 'string',
        default: '(locale)',
        description: 'Texto quando não há opções (ou o filtro não achou nada). Preferir o bloco `empty-state` pelo template `empty`.',
      },
      {
        name: 'inputId',
        type: 'string',
        default: '—',
        description: 'id do elemento focável interno — o alvo do `<label for="…">`. NECESSÁRIO para o rótulo ficar associado ao campo.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: '—',
        description: 'Rótulo acessível quando não há `<label>` visível. Preferir `<label for>` + `inputId`; usar `ariaLabelledBy` para apontar a um título existente.',
      },
    ],
    outputs: [
      { name: 'onNodeSelect', payload: 'TreeNodeSelectEvent { originalEvent, node }', description: 'Um nó foi selecionado.' },
      { name: 'onNodeUnselect', payload: 'TreeNodeUnSelectEvent { originalEvent, node }', description: 'Um nó foi desmarcado.' },
      { name: 'onNodeExpand', payload: 'TreeSelectNodeExpandEvent { originalEvent, node }', description: 'Um nó do popup foi expandido (buscar filhos aqui, se lazy).' },
      { name: 'onNodeCollapse', payload: 'TreeSelectNodeCollapseEvent { originalEvent, node }', description: 'Um nó do popup foi recolhido.' },
      { name: 'onShow', payload: 'Event', description: 'O popup da árvore foi aberto.' },
      { name: 'onHide', payload: 'Event', description: 'O popup da árvore foi fechado.' },
      { name: 'onClear', payload: '—', description: 'O campo foi limpo (botão "x").' },
      { name: 'onFilter', payload: 'TreeFilterEvent { filter, filteredValue }', description: 'As opções do popup foram filtradas.' },
      { name: 'onFocus', payload: 'Event', description: 'O campo recebeu foco.' },
      { name: 'onBlur', payload: 'Event', description: 'O campo perdeu o foco.' },
    ],
    slots: [
      { name: 'value', accepts: 'ng-template pTemplate="value" — como desenhar a seleção exibida no campo', optional: true },
      { name: 'header', accepts: 'ng-template pTemplate="header" — topo do popup (acima da árvore)', optional: true },
      { name: 'footer', accepts: 'ng-template pTemplate="footer" — rodapé do popup', optional: true },
      { name: 'empty', accepts: 'ng-template pTemplate="empty" — estado vazio do popup (usar o bloco empty-state)', optional: true },
      { name: 'itemtogglericon', accepts: 'ng-template pTemplate="itemtogglericon" — ícone de expandir/recolher dos nós', optional: true },
      { name: 'clearicon', accepts: 'ng-template pTemplate="clearicon" — ícone do botão limpar', optional: true },
    ],
    states: ['default', 'hover', 'focus', 'open', 'filled', 'invalid', 'disabled'],
    invalidCombinations: [
      {
        combo: 'TreeSelect sem `<label>`/inputId associado',
        porque: 'O leitor de tela não anuncia o campo e a pessoa perde a referência; o placeholder some ao escolher e não é rótulo.',
      },
      {
        combo: 'options com nós sem `key` única em modo checkbox',
        porque: 'Sem chave única, a seleção em cascata (pai↔filho) perde a identidade dos nós e o estado parcial "pula".',
      },
      {
        combo: 'usar TreeSelect para uma lista plana de opções',
        porque: 'A expansão de ramos vira ruído sem hierarquia; nesse caso Select (uma) ou MultiSelect (várias) resolvem melhor.',
      },
      {
        combo: 'display="chip" no modo single',
        porque: 'Chips fazem sentido para VÁRIAS escolhas; com uma única, o rótulo simples no campo basta.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'toolbar', 'floatlabel'],
    children: ['tree', 'checkbox', 'chip', 'search-input', 'empty-state'],
    commonlyUsedWith: ['inputtext', 'select', 'button', 'message'],
    partOfPatterns: ['form-submission', 'filtering', 'category-picker'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      default: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      hover: { border: 'surface/400' },
      focus: { ring: 'focus/ring' },
      invalid: { border: 'feedback.danger/500' },
    },
    note: 'Alturas, padding, o popup e a árvore interna herdam do PrimeNG. Nó selecionado no popup usa o highlight da marca; chips (display="chip") seguem a ficha `chip`. O ícone de expandir/recolher e a setinha do disparador são INTERNOS do PrimeNG (sobrescrito para Font Awesome — decisão 27/07); ícones de conteúdo dos nós seguem Font Awesome 7. Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar TreeSelect sem `<label>` associado (via inputId).',
      porque: 'O leitor de tela não anuncia o campo e a pessoa perde a referência quando o placeholder some.',
      emVezDisso: 'Um `<label for="id">` ligado ao `inputId` do campo (visível ou com FloatLabel).',
    },
    {
      regra: 'Nunca usar TreeSelect para uma lista de opções plana.',
      porque: 'Sem hierarquia, a árvore e a expansão só atrapalham a escolha.',
      emVezDisso: 'Select para escolher UMA opção plana; MultiSelect para VÁRIAS opções planas.',
    },
    {
      regra: 'Nunca representar o disparador como um `<div>` clicável.',
      porque: 'Um div não recebe foco por teclado nem expõe estado de combobox; a árvore fica inacessível.',
      emVezDisso: 'Disparador como `<button>` (ou input) com role="combobox", aria-expanded e aria-controls apontando o popup.',
    },
    {
      regra: 'Nunca marcar o estado parcial (alguns filhos) só pela aparência do checkbox.',
      porque: 'Quem usa leitor de tela não percebe que a seleção do pai é parcial.',
      emVezDisso: 'Checkbox do nó com aria-checked="mixed" no estado parcial, além do visual.',
    },
  ],

  examples: {
    angular: `<p-treeSelect [options]="categorias" [(ngModel)]="categoria"
  inputId="cat" placeholder="Selecione a categoria"
  selectionMode="single" [filter]="true" [showClear]="true" [fluid]="true" />`,
    html: `<label for="cat">Categoria</label>
<button type="button" id="cat" role="combobox"
        aria-expanded="false" aria-controls="cat-tree" aria-haspopup="tree">
  <span>Selecione a categoria</span>
  <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
</button>
<!-- popup (aberto): -->
<ul role="tree" id="cat-tree" aria-label="Categoria">
  <li role="treeitem" aria-level="1" aria-expanded="false" aria-selected="false">
    <button type="button" aria-label="Expandir ramo">
      <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
    </button>
    <span>Eletrônicos</span>
  </li>
</ul>`,
    inContext: `<!-- campo hierárquico obrigatório num formulário -->
<div data-block="form-field">
  <label for="depto">Departamento <span aria-hidden="true">*</span></label>
  <button type="button" id="depto" role="combobox"
          aria-required="true" aria-expanded="false"
          aria-controls="depto-tree" aria-haspopup="tree"
          aria-describedby="depto-ajuda">
    <span>Selecione…</span>
    <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
  </button>
  <small id="depto-ajuda">Escolha a área dentro da estrutura da organização.</small>
</div>`,
  },

  a11y: {
    role: 'combobox que controla um popup com role="tree"',
    keyboard: [
      'Enter/Espaço/Seta ↓ abre o popup',
      'dentro do popup: setas ↑/↓ movem entre nós, → expande, ← recolhe',
      'Enter/Espaço seleciona (ou marca o checkbox do nó)',
      'Esc fecha o popup e volta o foco ao disparador',
      'Tab entra e sai do campo',
    ],
    requiredAria: [
      'sempre um `<label for>` ligado ao `inputId` (ou aria-label/aria-labelledby)',
      'disparador com role="combobox", aria-expanded e aria-controls apontando o popup',
      'popup com role="tree"; nós com role="treeitem", aria-level e aria-expanded',
      'seleção anunciada com aria-selected (ou checkbox com rótulo e estado parcial aria-checked="mixed")',
      'aria-required quando obrigatório; aria-invalid + aria-describedby no erro',
    ],
    contrastMin: '4.5:1 do texto e do rótulo; foco visível no disparador e nos nós',
  },

  aiHints: {
    keywords: [
      'treeselect', 'seleção hierárquica', 'selecao hierarquica', 'dropdown de árvore', 'dropdown de arvore',
      'select em árvore', 'escolher categoria', 'categoria e subcategoria', 'campo hierárquico', 'campo hierarquico',
      'escolher na hierarquia', 'seletor de árvore', 'combo hierárquico', 'árvore de opções', 'arvore de opcoes',
    ],
    selectionCriteria:
      'Escolha TreeSelect quando a pessoa precisa ESCOLHER um (ou vários) item dentro de uma HIERARQUIA, num campo compacto de formulário. Lista plana = Select/MultiSelect. Exibir a árvore aberta na página = Tree. Hierarquia com colunas = TreeTable.',
    disambiguation: [
      { confundeCom: 'select', criterio: 'Select escolhe UMA opção de uma lista PLANA; TreeSelect escolhe dentro de uma HIERARQUIA (pai/filho).' },
      { confundeCom: 'multiselect', criterio: 'MultiSelect marca várias opções PLANAS; TreeSelect (multiple/checkbox) marca várias numa ÁRVORE, com propagação pai↔filho.' },
      { confundeCom: 'tree', criterio: 'Tree exibe a árvore aberta na página para navegar/selecionar; TreeSelect é um CAMPO que abre a árvore num popup para escolher.' },
      { confundeCom: 'cascadeselect', criterio: 'CascadeSelect navega níveis um a um em submenus; TreeSelect mostra a árvore inteira expansível de uma vez.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/treeselect',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Opções por `TreeNode[]`; saída = combobox acessível (`<button role="combobox">` + popup `role="tree"`), com `<label for>` ligado ao `inputId`. Vazio reusa `empty-state`, busca reusa `search-input`, chips reusam `chip`. Ícones internos (toggler, setinha) são sobrescritos para Font Awesome; ícones de conteúdo seguem Font Awesome 7.',
  },
};
