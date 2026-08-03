/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · menubar.meta.ts — ONDA 4 (navegação)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-menubar`. API lida do código real
 * (primeng@21.0.2, `types/primeng-menubar.d.ts`).
 *
 * Barra de navegação HORIZONTAL principal do app, com submenus. Colapsa
 * para "hambúrguer" no `breakpoint`. O "menu item" é PARTE (MenuItem),
 * não ficha própria. Aceita conteúdo nas pontas (logo à esquerda, ações
 * à direita) via slots start/end.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const menubarMeta: NephosComponentMeta = {
  identity: {
    id: 'menubar',
    name: 'Menubar',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Barra de navegação horizontal principal do app, com submenus e responsividade.',
    whenToUse: [
      'Navegação de topo entre as áreas principais do produto.',
      'Quando há submenus (categorias que abrem itens) e itens nas pontas (logo, perfil).',
    ],
    whenNotToUse: [
      'Alternar vistas dentro de uma página — use Tabs.',
      'Menu de ações de um item — use Menu (popup).',
      'Trilha de hierarquia — use Breadcrumb.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'model',
        type: 'MenuItem[]',
        default: '[]',
        description: 'Os itens de navegação. Cada um: `label`, destino por `routerLink`/`url` (ou `command`), opcional `icon` (classe — ver `icon.meta.ts`) e `items` para submenu.',
      },
      {
        name: 'breakpoint',
        type: 'string',
        default: "'960px'",
        description: 'Largura abaixo da qual a barra colapsa no botão "hambúrguer". Ajustar à densidade do menu.',
      },
      {
        name: 'autoDisplay',
        type: 'boolean',
        default: 'true',
        description: 'Abre o submenu ao passar o mouse (hover). Garantir que também abre por teclado/clique.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: '—',
        description: 'Nome acessível da barra (ex.: "Navegação principal").',
      },
    ],
    outputs: [
      { name: 'onFocus', payload: 'FocusEvent', description: 'Emitido ao focar a barra.' },
      { name: 'onBlur', payload: 'FocusEvent', description: 'Emitido ao sair do foco.' },
    ],
    slots: [
      { name: 'start', accepts: 'conteúdo à esquerda (ex.: logo)', optional: true },
      { name: 'end', accepts: 'conteúdo à direita (ex.: perfil, ações)', optional: true },
      { name: 'item', accepts: 'template do item', optional: true },
    ],
    states: ['default', 'submenu-open', 'collapsed'],
    invalidCombinations: [
      {
        combo: 'submenu que só abre por hover',
        porque: 'Exclui teclado e toque — quem não usa mouse nunca acessa os itens do submenu.',
      },
      {
        combo: 'menubar para alternar conteúdo da mesma página',
        porque: 'Menubar navega entre áreas/rotas; trocar vista no mesmo lugar é papel de Tabs.',
      },
    ],
  },

  relationships: {
    parents: ['app-shell', 'page'],
    children: ['icon', 'menu', 'button'],
    commonlyUsedWith: ['button', 'avatar', 'breadcrumb'],
    partOfPatterns: ['navigation', 'app-shell'],
  },

  tokens: {
    typography: 'body-lg (item)',
    byState: {
      default: { text: 'surface/text', background: 'surface/0' },
      'item-focus': { background: 'surface/100' },
      active: { text: 'primary/color' },
    },
    note: 'Item da rota atual = ênfase da marca; item em foco = fundo surface suave. Submenu herda overlay do PrimeNG. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar submenu acessível só por hover.',
      porque: 'Teclado e toque ficam de fora.',
      emVezDisso: 'Abrir também por clique/Enter; aria-expanded no item que tem submenu.',
    },
    {
      regra: 'Nunca esconder a navegação principal em telas pequenas sem alternativa.',
      porque: 'Ao colapsar, o botão precisa abrir o menu de forma acessível — senão a navegação some.',
      emVezDisso: 'Botão "menu" com aria-expanded/aria-controls que abre a lista completa.',
    },
    {
      regra: 'Nunca marcar a área atual só pela cor.',
      porque: 'Quem não distingue cores não sabe em que seção está.',
      emVezDisso: 'aria-current="page" no item da rota atual, além do destaque visual.',
    },
  ],

  examples: {
    angular: `<p-menubar [model]="[
  { label: 'Painel', routerLink: '/painel' },
  { label: 'Bolsas', items: [
    { label: 'Por campo', routerLink: '/bolsas/campos' },
    { label: 'Por escola', routerLink: '/bolsas/escolas' }
  ]},
  { label: 'Relatórios', routerLink: '/relatorios' }
]" ariaLabel="Navegação principal">
  <ng-template #start><img [src]="tema.logoUrl" [alt]="tema.nomeVertical" /></ng-template>
</p-menubar>`,
    html: `<nav aria-label="Navegação principal">
  <a href="/"><img src="{{ logoDaMarcaAtiva }}" alt="{{ nomeDaMarcaAtiva }}" /></a>
  <ul role="menubar">
    <li role="none"><a role="menuitem" href="/painel" aria-current="page">Painel</a></li>
    <li role="none">
      <button role="menuitem" aria-haspopup="true" aria-expanded="false">Bolsas</button>
      <ul role="menu" hidden>
        <li role="none"><a role="menuitem" href="/bolsas/campos">Por campo</a></li>
        <li role="none"><a role="menuitem" href="/bolsas/escolas">Por escola</a></li>
      </ul>
    </li>
    <li role="none"><a role="menuitem" href="/relatorios">Relatórios</a></li>
  </ul>
</nav>`,
    inContext: `<!-- barra de topo do app: logo + navegação + perfil -->
<header data-block="app-shell">
  <nav aria-label="Navegação principal">
    <a href="/"><img src="{{ logoDaMarcaAtiva }}" alt="{{ nomeDaMarcaAtiva }}" /></a>
    <ul role="menubar">
      <li role="none"><a role="menuitem" href="/painel" aria-current="page">Painel</a></li>
      <li role="none"><a role="menuitem" href="/bolsas">Bolsas</a></li>
    </ul>
  </nav>
</header>`,
  },

  a11y: {
    role: 'menubar / menuitem dentro de um landmark navigation',
    keyboard: ['Setas ←/→ na barra, ↑/↓ no submenu', 'Enter/Espaço ativa ou abre submenu', 'Esc fecha o submenu'],
    requiredAria: [
      '`<nav aria-label>` distinguindo a navegação principal',
      'itens com submenu: aria-haspopup e aria-expanded',
      'rota atual com aria-current="page"',
      'versão colapsada: botão com aria-expanded/aria-controls',
    ],
    contrastMin: '4.5:1 dos itens; 3:1 do destaque do item ativo/em foco',
  },

  aiHints: {
    keywords: [
      'menubar', 'barra de navegação', 'barra de navegacao', 'menu principal', 'menu horizontal',
      'navegação de topo', 'navegacao de topo', 'nav', 'header', 'submenu', 'hambúrguer', 'hamburguer',
    ],
    selectionCriteria:
      'Escolha Menubar para a navegação horizontal principal do app (áreas/rotas), com submenus e itens nas pontas. Alternar vistas na mesma página = Tabs; ações de um item = Menu; hierarquia = Breadcrumb.',
    disambiguation: [
      { confundeCom: 'tabs', criterio: 'Menubar navega entre rotas/áreas; Tabs trocam conteúdo na mesma página.' },
      { confundeCom: 'menu', criterio: 'Menubar é a barra horizontal principal; Menu é vertical (lateral/popup de ações).' },
      { confundeCom: 'breadcrumb', criterio: 'Breadcrumb mostra a posição na hierarquia; Menubar é o acesso às áreas.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/menubar',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Ícone do item segue `icon.meta.ts`; submenu herda overlay do PrimeNG.',
  },
};
