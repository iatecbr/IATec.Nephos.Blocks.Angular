/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · tieredmenu.meta.ts — ONDA 4 (navegação · Menus A)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-tieredmenu`. API lida do código real
 * (primeng@21.0.2, `types/primeng-tieredmenu.d.ts`).
 *
 * Menu vertical cujos itens abrem SUBMENUS em CASCATA (overlays
 * aninhados que se desdobram para o lado). Pode ficar fixo (inline) ou
 * abrir como popup a partir de um botão (`popup=true`). Diferente do
 * Menu comum: o Menu não desdobra submenus em cascata; o TieredMenu sim.
 * O "item" é PARTE (modelo MenuItem, com `items` para os níveis).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const tieredMenuMeta: NephosComponentMeta = {
  identity: {
    id: 'tieredmenu',
    name: 'TieredMenu',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Menu vertical de ações/destinos com submenus que se desdobram em cascata.',
    whenToUse: [
      'Lista de comandos/destinos que precisa de submenus aninhados (2+ níveis) abrindo para o lado.',
      'Popup de ações a partir de um botão quando algumas ações têm sub-opções (ex.: "Exportar ›" abrindo PDF/CSV).',
      'Menu lateral fixo com hierarquia em cascata.',
    ],
    whenNotToUse: [
      'Lista simples de ações sem níveis aninhados — use Menu (mais leve).',
      'Navegação principal de topo do app — use Menubar; com painéis multicoluna — use MegaMenu.',
      'Ações abertas por clique direito sobre um alvo — use ContextMenu; escolher um valor de formulário — use Select.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'model',
        type: 'MenuItem[]',
        default: '[]',
        description: 'Os itens. Cada um: `label`, ação por `command` ou destino por `routerLink`/`url`, opcional `icon` (classe — ver `icon.meta.ts`), `disabled`, `separator: true` para divisória, e `items` para o submenu que abre em cascata.',
      },
      {
        name: 'popup',
        type: 'boolean',
        default: 'false',
        description: 'true = o menu fica escondido e abre a partir de um gatilho (botão), via `menu.toggle($event)`. false = menu fixo inline.',
      },
      {
        name: 'autoDisplay',
        type: 'boolean',
        default: 'true',
        description: 'Abre o submenu ao passar o mouse (hover). Garantir que também abre por teclado/clique — não deixar o hover como único caminho.',
      },
      {
        name: 'breakpoint',
        type: 'string',
        default: "'960px'",
        description: 'Largura abaixo da qual o menu adota o layout mobile (submenus empilhados, navegação por toque).',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Desativa o menu inteiro (nenhum item abre nem dispara). Use com cautela.',
      },
      {
        name: 'tabindex',
        type: 'number',
        default: '0',
        description: 'Posição do menu na ordem de tabulação. Padrão 0 mantém no fluxo natural do teclado.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: 'undefined',
        description: 'Nome acessível do menu (o que este conjunto de ações representa).',
      },
      {
        name: 'ariaLabelledBy',
        type: 'string',
        default: 'undefined',
        description: 'Alternativa ao ariaLabel apontando para o id do rótulo/gatilho.',
      },
      {
        name: 'appendTo',
        type: "'self' | 'body' | HTMLElement",
        default: "'self'",
        description: 'Onde o overlay é inserido no DOM. `body` evita corte por `overflow: hidden` de contêineres; `self` mantém junto do gatilho.',
      },
    ],
    outputs: [
      { name: 'onShow', payload: 'any', description: 'Emitido quando o menu popup é aberto.' },
      { name: 'onHide', payload: 'any', description: 'Emitido quando o menu popup é fechado.' },
    ],
    slots: [
      { name: 'item', accepts: 'template do item', optional: true },
      { name: 'submenuIcon', accepts: 'template do ícone de submenu (seta em cascata)', optional: true },
    ],
    states: ['closed', 'open', 'item-focus', 'submenu-open', 'item-disabled'],
    invalidCombinations: [
      {
        combo: 'TieredMenu para uma lista de ações sem submenus',
        porque: 'Sem níveis aninhados, a cascata não agrega; o Menu comum é mais leve e simples de operar.',
      },
      {
        combo: 'submenu que só abre por hover (autoDisplay sem teclado/clique)',
        porque: 'Exclui teclado e toque — quem não usa mouse nunca acessa os itens do submenu.',
      },
      {
        combo: 'popup=true sem um gatilho com aria-haspopup/aria-expanded',
        porque: 'O botão que abre precisa anunciar que controla um menu e seu estado aberto/fechado.',
      },
    ],
  },

  relationships: {
    parents: ['toolbar', 'page', 'app-shell'],
    children: ['icon', 'divider'],
    commonlyUsedWith: ['button', 'icon'],
    partOfPatterns: ['navigation', 'row-actions'],
  },

  tokens: {
    typography: 'body-lg (item)',
    byState: {
      default: { text: 'surface/text', background: 'surface/0' },
      'item-focus': { background: 'surface/100' },
      selected: { background: 'primary/50', text: 'primary/color' },
      'item-disabled': { text: 'surface/text-muted' },
    },
    note: 'Item em foco = fundo surface suave; item ativo = destaque da marca. Cada nível da cascata é um overlay que herda sombra, raio e z-index do PrimeNG. Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar TieredMenu para uma lista de ações sem níveis.',
      porque: 'A cascata só existe para submenus aninhados; sem eles, adiciona complexidade sem ganho.',
      emVezDisso: 'Menu comum quando a lista de ações é plana (sem submenus).',
    },
    {
      regra: 'Nunca deixar o submenu acessível só por hover.',
      porque: 'Teclado e toque ficam de fora — os níveis em cascata se tornam inalcançáveis para muita gente.',
      emVezDisso: 'Abrir também por clique/Enter; item com submenu anuncia aria-haspopup e aria-expanded.',
    },
    {
      regra: 'Nunca abrir menu popup sem estado acessível no gatilho.',
      porque: 'Sem aria-haspopup/aria-expanded, quem usa leitor de tela não sabe que há um menu nem se está aberto.',
      emVezDisso: 'Botão com aria-haspopup="menu" e aria-expanded refletindo aberto/fechado.',
    },
  ],

  examples: {
    angular: `<p-button (click)="menu.toggle($event)" [attr.aria-haspopup]="true" ariaLabel="Ações da bolsa" />
<p-tieredMenu #menu [model]="[
  { label: 'Editar', icon: 'pen-to-square', command: () => editar() },
  { label: 'Exportar', icon: 'file-export', items: [
    { label: 'PDF', command: () => exportar('pdf') },
    { label: 'CSV', command: () => exportar('csv') }
  ]},
  { separator: true },
  { label: 'Excluir', icon: 'trash-can', command: () => excluir() }
]" [popup]="true" />`,
    html: `<button type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="acoes">
  Ações
</button>
<ul id="acoes" role="menu" aria-label="Ações da bolsa" hidden>
  <li role="none"><button role="menuitem" type="button">Editar</button></li>
  <li role="none">
    <button role="menuitem" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="sub-exportar">
      Exportar <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
    </button>
    <ul id="sub-exportar" role="menu" aria-label="Exportar" hidden>
      <li role="none"><button role="menuitem" type="button">PDF</button></li>
      <li role="none"><button role="menuitem" type="button">CSV</button></li>
    </ul>
  </li>
  <li role="separator"></li>
  <li role="none"><button role="menuitem" type="button">Excluir</button></li>
</ul>`,
    inContext: `<!-- menu lateral fixo em cascata: seção com sub-destinos -->
<nav aria-label="Seções">
  <ul role="menu">
    <li role="none"><a role="menuitem" href="/painel" aria-current="page">Painel</a></li>
    <li role="none">
      <button role="menuitem" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="sub-bolsas">
        Bolsas <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
      </button>
      <ul id="sub-bolsas" role="menu" aria-label="Bolsas" hidden>
        <li role="none"><a role="menuitem" href="/bolsas/campos">Por campo</a></li>
        <li role="none"><a role="menuitem" href="/bolsas/escolas">Por escola</a></li>
      </ul>
    </li>
  </ul>
</nav>`,
  },

  a11y: {
    role: 'menu / menuitem (popup ou inline), com submenus aninhados',
    keyboard: [
      'Setas ↑/↓ movem entre itens; → abre o submenu, ← fecha e volta ao pai',
      'Enter/Espaço ativa o item',
      'Esc fecha o nível atual (e o popup, devolvendo foco ao gatilho)',
    ],
    requiredAria: [
      'popup: gatilho com aria-haspopup e aria-expanded; menu com aria-label',
      'itens com role="menuitem"; item com submenu anuncia aria-haspopup e aria-expanded',
      'foco gerenciado (roving tabindex) através dos níveis da cascata',
    ],
    contrastMin: '4.5:1 do texto do item; 3:1 do realce do item em foco',
  },

  aiHints: {
    keywords: [
      'tieredmenu', 'tiered menu', 'menu em cascata', 'menu cascata', 'submenus aninhados', 'submenu em cascata',
      'menu com níveis', 'menu com niveis', 'menu multinível', 'menu multinivel', 'popup de ações com submenu',
    ],
    selectionCriteria:
      'Escolha TieredMenu para um menu vertical de ações/destinos com submenus ANINHADOS que se desdobram em cascata (inline ou popup). Lista plana sem níveis = Menu; navegação de topo = Menubar; painéis multicoluna = MegaMenu; clique direito sobre alvo = ContextMenu.',
    disambiguation: [
      { confundeCom: 'menu', criterio: 'Menu é vertical plano (não desdobra submenus em cascata); TieredMenu desdobra níveis aninhados para o lado.' },
      { confundeCom: 'contextmenu', criterio: 'ContextMenu abre por clique direito sobre um alvo; TieredMenu abre por gatilho comum (clique esquerdo) ou fica inline.' },
      { confundeCom: 'megamenu', criterio: 'MegaMenu é a barra de navegação com painéis multicoluna; TieredMenu mostra uma coluna por nível em cascata.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/tieredmenu',
    deltaFromPrimeng: 'Nenhum — `p-tieredmenu` usado direto (origin: primeng). Ícone do item segue `icon.meta.ts`; cada nível herda overlay (sombra/raio/z-index) do PrimeNG. `showTransitionOptions`/`hideTransitionOptions` estão deprecados (v21) em favor de `motionOptions` — omitidos.',
  },
};
