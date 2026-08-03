/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · panelmenu.meta.ts — ONDA 4 (navegação · Menus B)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-panelmenu`. API lida do código real
 * (primeng@21.0.2, `types/primeng-panelmenu.d.ts`).
 *
 * Menu VERTICAL em accordion: cabeçalhos que expandem/colapsam para
 * revelar itens (e subníveis em árvore). Navegação lateral quando há
 * MUITOS destinos agrupados por seção. O "menu item" é PARTE (modelo
 * MenuItem, com `items` para os filhos), não ficha própria.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const panelMenuMeta: NephosComponentMeta = {
  identity: {
    id: 'panelmenu',
    name: 'PanelMenu',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Menu vertical em accordion: seções que expandem e colapsam para revelar seus itens.',
    whenToUse: [
      'Navegação lateral com muitos destinos agrupados por seção (ex.: um menu de configurações extenso).',
      'Quando a hierarquia tem 2+ níveis e faz sentido esconder os filhos até o grupo ser aberto.',
      'Barra lateral onde só um (ou poucos) grupos ficam abertos por vez, economizando altura.',
    ],
    whenNotToUse: [
      'Navegação principal horizontal do app — use Menubar.',
      'Lista curta e plana de ações/destinos sempre visíveis — use Menu.',
      'Menu de ações de um item específico (⋯ "mais opções") — use Menu (popup).',
      'Dados em árvore para seleção/marcação (checkbox) — use Tree, não um menu.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'model',
        type: 'MenuItem[]',
        default: '[]',
        description: 'A árvore de itens. Cada um: `label`, destino por `routerLink`/`url` (ou ação por `command`), opcional `icon` (classe — ver `icon.meta.ts`), `disabled`, `separator: true` para divisória, e `items` para os subníveis (o que torna o item um cabeçalho expansível).',
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description: 'true = vários grupos podem ficar abertos ao mesmo tempo. false (padrão) = abrir um grupo fecha os outros (comportamento accordion clássico).',
      },
      {
        name: 'id',
        type: 'string',
        default: '—',
        description: 'Id da raiz do componente. Serve de base para os ids acessíveis dos cabeçalhos e painéis (aria-controls). Deixar o PrimeNG gerar se não houver necessidade de um id fixo.',
      },
      {
        name: 'tabindex',
        type: 'number',
        default: '0',
        description: 'Posição na ordem de tabulação. Só alterar em casos específicos de fluxo de foco; o padrão já entra na ordem natural.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'item', accepts: 'template do item', optional: true },
      { name: 'headerIcon', accepts: 'template do ícone do cabeçalho do grupo', optional: true },
      { name: 'submenuIcon', accepts: 'template do ícone que indica expandir/colapsar', optional: true },
    ],
    states: ['collapsed', 'expanded', 'header-focus', 'item-focus', 'item-disabled'],
    invalidCombinations: [
      {
        combo: 'cabeçalho expansível sem aria-expanded refletindo aberto/fechado',
        porque: 'Quem usa leitor de tela precisa saber que o cabeçalho controla um painel e se ele está aberto.',
      },
      {
        combo: 'PanelMenu para uma lista plana de 3–4 destinos',
        porque: 'O accordion adiciona um passo (abrir a seção) sem ganho quando não há hierarquia a esconder — Menu resolve melhor.',
      },
      {
        combo: 'PanelMenu como navegação principal horizontal',
        porque: 'PanelMenu é vertical e empilhado; a navegação de topo entre áreas é papel do Menubar.',
      },
    ],
  },

  relationships: {
    parents: ['app-shell', 'page'],
    children: ['icon', 'divider'],
    commonlyUsedWith: ['menubar', 'breadcrumb', 'icon'],
    partOfPatterns: ['navigation', 'app-shell'],
  },

  tokens: {
    typography: 'body-lg (cabeçalho e item)',
    byState: {
      default: { text: 'surface/text', background: 'surface/0' },
      'header-focus': { background: 'surface/100' },
      expanded: { text: 'surface/text', background: 'surface/0' },
      active: { text: 'primary/color', background: 'primary/50' },
    },
    note: 'Cabeçalho/item em foco = fundo surface suave; item da rota atual = destaque da marca (highlight). Raio, espaçamento e a animação de expandir herdam do PrimeNG. Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca expandir/colapsar um grupo sem estado acessível no cabeçalho.',
      porque: 'Sem aria-expanded, quem usa leitor de tela não percebe que o cabeçalho abre um painel nem se está aberto.',
      emVezDisso: 'Cabeçalho como `<button>` com aria-expanded e aria-controls apontando para o painel de itens.',
    },
    {
      regra: 'Nunca usar PanelMenu para uma lista curta e plana de destinos.',
      porque: 'O accordion obriga a abrir a seção antes de ver os itens — um passo extra sem hierarquia que justifique.',
      emVezDisso: 'Menu (lista vertical direta) quando não há subníveis a esconder.',
    },
    {
      regra: 'Nunca marcar a seção/rota atual só pela cor.',
      porque: 'Quem não distingue cores não sabe em que item está posicionado.',
      emVezDisso: 'aria-current="page" no item da rota atual, além do destaque visual.',
    },
  ],

  examples: {
    angular: `<p-panelMenu [model]="[
  { label: 'Cadastros', icon: 'users', items: [
    { label: 'Alunos', routerLink: '/cadastros/alunos' },
    { label: 'Responsáveis', routerLink: '/cadastros/responsaveis' }
  ]},
  { label: 'Bolsas', icon: 'award', items: [
    { label: 'Solicitações', routerLink: '/bolsas/solicitacoes' },
    { label: 'Relatórios', routerLink: '/bolsas/relatorios' }
  ]}
]" [multiple]="false" />`,
    html: `<nav aria-label="Seções">
  <ul>
    <li>
      <button type="button" aria-expanded="true" aria-controls="grp-cadastros">
        <i class="fa-solid fa-users" aria-hidden="true"></i> Cadastros
      </button>
      <ul id="grp-cadastros" role="group">
        <li><a href="/cadastros/alunos" aria-current="page">Alunos</a></li>
        <li><a href="/cadastros/responsaveis">Responsáveis</a></li>
      </ul>
    </li>
    <li>
      <button type="button" aria-expanded="false" aria-controls="grp-bolsas">
        <i class="fa-solid fa-award" aria-hidden="true"></i> Bolsas
      </button>
      <ul id="grp-bolsas" role="group" hidden>
        <li><a href="/bolsas/solicitacoes">Solicitações</a></li>
        <li><a href="/bolsas/relatorios">Relatórios</a></li>
      </ul>
    </li>
  </ul>
</nav>`,
    inContext: `<!-- navegação lateral do app-shell, com muitas seções agrupadas -->
<aside data-block="app-shell" aria-label="Navegação lateral">
  <nav aria-label="Seções">
    <ul>
      <li>
        <button type="button" aria-expanded="true" aria-controls="sec-relatorios">Relatórios</button>
        <ul id="sec-relatorios" role="group">
          <li><a href="/relatorios/mensal" aria-current="page">Mensal</a></li>
          <li><a href="/relatorios/anual">Anual</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</aside>`,
  },

  a11y: {
    role: 'navigation (landmark) com cabeçalhos `<button>` que controlam grupos de itens; itens são links/ações',
    keyboard: [
      'Setas ↑/↓ movem entre cabeçalhos e itens visíveis',
      'Enter/Espaço no cabeçalho abre/fecha o grupo',
      'Enter/Espaço no item ativa/segue o destino',
      'Home/End vão ao primeiro/último',
    ],
    requiredAria: [
      '`<nav aria-label>` distinguindo esta navegação',
      'cabeçalho de grupo com aria-expanded e aria-controls',
      'rota atual com aria-current="page"',
    ],
    contrastMin: '4.5:1 dos textos; 3:1 do realce do cabeçalho/item em foco',
  },

  aiHints: {
    keywords: [
      'panelmenu', 'menu accordion', 'menu lateral', 'menu vertical', 'navegação lateral', 'navegacao lateral',
      'sidebar', 'menu retrátil', 'menu retratil', 'seções expansíveis', 'secoes expansiveis', 'menu em árvore', 'menu em arvore',
      'submenu', 'submenus', 'subitens', 'menu colapsável', 'menu colapsavel', 'navegação com submenus', 'navegacao com submenus',
    ],
    selectionCriteria:
      'Escolha PanelMenu para navegação lateral vertical com MUITOS destinos agrupados em seções que expandem/colapsam (2+ níveis). Lista plana e curta = Menu; navegação horizontal principal = Menubar; árvore de dados com seleção = Tree.',
    disambiguation: [
      { confundeCom: 'menu', criterio: 'Menu é uma lista vertical plana (ou popup de ações); PanelMenu agrupa em seções accordion com subníveis.' },
      { confundeCom: 'menubar', criterio: 'Menubar é a barra horizontal principal do topo; PanelMenu é vertical e empilhado na lateral.' },
      { confundeCom: 'tree', criterio: 'Tree é para explorar/selecionar dados hierárquicos; PanelMenu é para navegar entre destinos.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/panelmenu',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Híbrido de Accordion + Tree; ícone do item segue `icon.meta.ts`; a animação de expandir herda do PrimeNG.',
  },
};
