/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · megamenu.meta.ts — ONDA 4 (navegação · Menus A)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-megamenu`. API lida do código real
 * (primeng@21.0.2, `types/primeng-megamenu.d.ts`).
 *
 * Menu de navegação (horizontal ou vertical) cujos itens de topo abrem
 * PAINÉIS grandes com submenus organizados em VÁRIAS COLUNAS ao mesmo
 * tempo. O modelo é `MegaMenuItem[]` (mais rico que MenuItem: aceita
 * `items` como matriz de colunas de submenus). Bom para produtos com
 * muitas seções. Colapsa em "hambúrguer" no `breakpoint`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const megaMenuMeta: NephosComponentMeta = {
  identity: {
    id: 'megamenu',
    name: 'MegaMenu',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Menu de navegação cujos itens abrem painéis multicoluna com muitos submenus de uma vez.',
    whenToUse: [
      'Navegação de topo de um produto com MUITAS seções, agrupadas em categorias visíveis lado a lado (ex.: portal, e-commerce, intranet grande).',
      'Quando um item de topo precisa revelar dezenas de destinos organizados por coluna/grupo.',
    ],
    whenNotToUse: [
      'Navegação simples com poucas áreas e no máximo 1 nível de submenu — use Menubar.',
      'Menu de ações de um item ou popup de comandos — use Menu (popup) ou TieredMenu.',
      'Alternar vistas dentro da mesma página — use Tabs; hierarquia da página atual — use Breadcrumb.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'model',
        type: 'MegaMenuItem[]',
        default: '[]',
        description: 'Os itens de topo. Cada um: `label`, opcional `icon` (classe — ver `icon.meta.ts`), e `items` como MATRIZ de colunas — cada coluna é um array de grupos de submenu (`{ label, items: [...] }`). É essa estrutura em colunas que faz o painel multicoluna.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Direção da barra. `horizontal` = barra de topo clássica; `vertical` = coluna lateral com os painéis abrindo ao lado.',
      },
      {
        name: 'breakpoint',
        type: 'string',
        default: "'960px'",
        description: 'Largura abaixo da qual a barra colapsa no botão "hambúrguer" (modo mobile, colunas empilhadas). Ajustar à densidade do menu.',
      },
      {
        name: 'scrollHeight',
        type: 'string',
        default: "'20rem'",
        description: 'Altura máxima do painel/lista antes de aparecer barra de rolagem interna. Evita painel maior que a viewport.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Desativa a barra inteira (nenhum item abre nem navega). Raro; use com cautela em navegação.',
      },
      {
        name: 'tabindex',
        type: 'number',
        default: '0',
        description: 'Posição da barra na ordem de tabulação. Padrão 0 mantém a navegação no fluxo natural do teclado.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: 'undefined',
        description: 'Nome acessível da barra (ex.: "Navegação principal"), distinguindo-a de outras navegações da página.',
      },
      {
        name: 'ariaLabelledBy',
        type: 'string',
        default: 'undefined',
        description: 'Alternativa ao ariaLabel apontando para o id de um rótulo já existente na tela.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'start', accepts: 'conteúdo à esquerda/início (ex.: logo)', optional: true },
      { name: 'end', accepts: 'conteúdo à direita/fim (ex.: perfil, busca)', optional: true },
      { name: 'item', accepts: 'template do item', optional: true },
      { name: 'menuIcon', accepts: 'template do ícone do botão hambúrguer (mobile)', optional: true },
      { name: 'submenuIcon', accepts: 'template do ícone de submenu (seta)', optional: true },
    ],
    states: ['default', 'panel-open', 'item-focus', 'collapsed', 'disabled'],
    invalidCombinations: [
      {
        combo: 'MegaMenu para navegação com poucas seções e sem colunas',
        porque: 'O painel multicoluna fica vazio/desproporcional; a complexidade extra não se paga e confunde. Menubar já resolve.',
      },
      {
        combo: 'painel que só abre por hover',
        porque: 'Exclui teclado e toque — quem não usa mouse nunca acessa as colunas de submenu.',
      },
    ],
  },

  relationships: {
    parents: ['app-shell', 'page'],
    children: ['icon', 'button'],
    commonlyUsedWith: ['button', 'avatar', 'breadcrumb'],
    partOfPatterns: ['navigation', 'app-shell'],
  },

  tokens: {
    typography: 'body-lg (item)',
    byState: {
      default: { text: 'surface/text', background: 'surface/0' },
      'item-focus': { background: 'surface/100' },
      active: { text: 'primary/color' },
      'group-label': { text: 'surface/text-muted' },
    },
    note: 'Rótulos de grupo (cabeçalho de coluna) = muted; item da rota atual = ênfase da marca; item em foco = fundo surface suave. O painel herda sombra, raio e grid do PrimeNG. Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar MegaMenu quando a navegação tem poucas seções.',
      porque: 'O painel multicoluna existe para organizar MUITOS destinos; com poucos, fica vazio e adiciona peso e confusão sem ganho.',
      emVezDisso: 'Menubar para navegação de topo simples (poucas áreas, até um nível de submenu).',
    },
    {
      regra: 'Nunca deixar o painel acessível só por hover.',
      porque: 'Teclado e toque ficam de fora — as colunas de submenu se tornam inalcançáveis para muita gente.',
      emVezDisso: 'Abrir também por clique/Enter; item de topo com aria-haspopup e aria-expanded refletindo o painel.',
    },
    {
      regra: 'Nunca despejar dezenas de links soltos sem agrupar em colunas com rótulo.',
      porque: 'Um painel gigante sem títulos de grupo vira uma parede de links impossível de escanear.',
      emVezDisso: 'Agrupar em colunas com um cabeçalho (rótulo de grupo) por categoria, usando a estrutura `items` do MegaMenuItem.',
    },
  ],

  examples: {
    angular: `<p-megaMenu [model]="[
  { label: 'Bolsas', items: [
    [ { label: 'Por campo', items: [
        { label: 'Associação Bahia', routerLink: '/bolsas/ab' },
        { label: 'Associação Sergipe', routerLink: '/bolsas/as' }
    ] } ],
    [ { label: 'Por tipo', items: [
        { label: 'Integral', routerLink: '/bolsas/integral' },
        { label: 'Parcial', routerLink: '/bolsas/parcial' }
    ] } ]
  ]},
  { label: 'Relatórios', routerLink: '/relatorios' }
]" ariaLabel="Navegação principal">
  <ng-template #start><img [src]="tema.logoUrl" [alt]="tema.nomeVertical" /></ng-template>
</p-megaMenu>`,
    html: `<nav aria-label="Navegação principal">
  <a href="/"><img src="{{ logoDaMarcaAtiva }}" alt="{{ nomeDaMarcaAtiva }}" /></a>
  <ul role="menubar">
    <li role="none">
      <button role="menuitem" aria-haspopup="true" aria-expanded="false" aria-controls="painel-bolsas">Bolsas</button>
      <div id="painel-bolsas" hidden>
        <ul role="menu" aria-label="Por campo">
          <li role="presentation"><span>Por campo</span></li>
          <li role="none"><a role="menuitem" href="/bolsas/ab">Associação Bahia</a></li>
          <li role="none"><a role="menuitem" href="/bolsas/as">Associação Sergipe</a></li>
        </ul>
        <ul role="menu" aria-label="Por tipo">
          <li role="presentation"><span>Por tipo</span></li>
          <li role="none"><a role="menuitem" href="/bolsas/integral">Integral</a></li>
          <li role="none"><a role="menuitem" href="/bolsas/parcial">Parcial</a></li>
        </ul>
      </div>
    </li>
    <li role="none"><a role="menuitem" href="/relatorios">Relatórios</a></li>
  </ul>
</nav>`,
    inContext: `<!-- barra de topo de um portal grande: logo + navegação em painéis multicoluna + perfil -->
<header data-block="app-shell">
  <nav aria-label="Navegação principal">
    <a href="/"><img src="{{ logoDaMarcaAtiva }}" alt="{{ nomeDaMarcaAtiva }}" /></a>
    <ul role="menubar">
      <li role="none">
        <button role="menuitem" aria-haspopup="true" aria-expanded="false" aria-controls="p-bolsas">Bolsas</button>
        <div id="p-bolsas" hidden>
          <ul role="menu" aria-label="Concessão">
            <li role="presentation"><span>Concessão</span></li>
            <li role="none"><a role="menuitem" href="/bolsas/nova">Nova bolsa</a></li>
            <li role="none"><a role="menuitem" href="/bolsas/pendentes">Pendentes</a></li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</header>`,
  },

  a11y: {
    role: 'menubar / menuitem dentro de um landmark navigation; painéis como menus rotulados',
    keyboard: [
      'Setas ←/→ percorrem os itens de topo (horizontal); ↑/↓ dentro do painel',
      'Enter/Espaço abre o painel ou ativa o item',
      'Esc fecha o painel e devolve o foco ao item de topo',
    ],
    requiredAria: [
      '`<nav aria-label>` distinguindo a navegação principal',
      'item de topo que abre painel: aria-haspopup e aria-expanded',
      'cada coluna/grupo como lista rotulada (aria-label do grupo)',
      'rota atual com aria-current="page"',
      'versão colapsada: botão com aria-expanded/aria-controls',
    ],
    contrastMin: '4.5:1 dos itens e rótulos de grupo; 3:1 do destaque do item ativo/em foco',
  },

  aiHints: {
    keywords: [
      'megamenu', 'mega menu', 'menu grande', 'menu multicoluna', 'painel de navegação', 'painel de navegacao',
      'menu de portal', 'navegação de topo', 'navegacao de topo', 'menu com colunas', 'submenus lado a lado',
    ],
    selectionCriteria:
      'Escolha MegaMenu para navegação de topo com MUITAS seções que precisam abrir em painéis multicoluna (colunas de submenus visíveis de uma vez). Poucas seções / até 1 nível = Menubar; ações de item = Menu; cascata simples = TieredMenu; hierarquia da página = Breadcrumb.',
    disambiguation: [
      { confundeCom: 'menubar', criterio: 'Menubar é navegação de topo simples (submenu em cascata comum); MegaMenu abre PAINÉIS multicoluna com muitos destinos de uma vez.' },
      { confundeCom: 'tieredmenu', criterio: 'TieredMenu mostra submenus um a um em cascata (uma coluna por nível); MegaMenu mostra várias colunas simultâneas num painel único.' },
      { confundeCom: 'menu', criterio: 'Menu é vertical de ações/destinos (lateral ou popup); MegaMenu é a barra de navegação principal com painéis.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/megamenu',
    deltaFromPrimeng: 'Nenhum — `p-megamenu` usado direto (origin: primeng). Modelo é `MegaMenuItem[]` (colunas em `items`); ícone do item segue `icon.meta.ts`; painel herda grid/sombra/raio do PrimeNG.',
  },
};
