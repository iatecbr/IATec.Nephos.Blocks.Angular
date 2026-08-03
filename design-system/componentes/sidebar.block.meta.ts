/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · sidebar.block.meta.ts — BLOCO #6 (composição nossa)
 * ─────────────────────────────────────────────────────────────
 * category: 'block' · origin: 'nephos-own'
 * A NAVEGAÇÃO LATERAL do app: seções colapsáveis (accordion), recolhível
 * para uma trilha de ícones e, no mobile, off-canvas (drawer). Não é
 * componente novo — é a COMPOSIÇÃO da forma da organização.
 *
 * Compõe: panelmenu + icon-button/button (recolher) + icon + divider
 * (+ drawer para o modo mobile off-canvas).
 * Saída do Moses = um `<nav aria-label="Seções">` (landmark de navegação
 * DISTINTO do header) com cabeçalhos `<button aria-expanded>` e links.
 *
 * ⚠️ O header já usa `<nav aria-label="Navegação principal">`. A sidebar
 * usa OUTRO rótulo ("Seções") — dois landmarks de navegação iguais
 * confundem o leitor de tela.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const sidebarBlockMeta: NephosComponentMeta = {
  identity: {
    id: 'sidebar',
    name: 'Sidebar / Menu lateral',
    category: 'block',
    status: 'beta',
    version: '0.1.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Navegação lateral vertical com seções colapsáveis, recolhível e responsiva.',
    whenToUse: [
      'Apps com muitas seções/subseções que precisam de navegação persistente à esquerda.',
      'Quando a navegação não cabe no header e beneficia de agrupar por seção (accordion).',
      'Quando ajuda recolher a navegação para ganhar espaço (trilha de ícones) sem perdê-la.',
    ],
    whenNotToUse: [
      'Poucas seções que cabem no topo — o header/menubar já basta.',
      'Navegação horizontal principal — use menubar (ou o bloco Header).',
      'Painel TEMPORÁRIO de filtros/detalhes que sobrepõe o conteúdo — use Drawer (não é navegação).',
    ],
  },

  api: {
    // Bloco: a "API" são os pontos de composição (slots) + a config.
    inputs: [
      { name: 'items', type: 'MenuItem[]', default: '—', description: 'As seções e seus itens (label + ícone + rota; subitens quando houver). Alimenta o panelmenu.' },
      { name: 'collapsed', type: 'boolean', default: 'false', description: 'Recolhida na trilha de ícones (só os ícones, sem os rótulos). Ao recolher, cada item precisa de tooltip/aria-label.' },
      { name: 'collapsible', type: 'boolean', default: 'true', description: 'Mostra o botão de recolher/expandir a lateral. Desligar em telas onde a lateral é fixa.' },
      { name: 'mobileOffCanvas', type: 'boolean', default: 'true', description: 'No mobile, a lateral vira off-canvas (drawer) aberta por um botão no header. No desktop fica persistente.' },
    ],
    outputs: [
      { name: 'navigate', payload: '{ rota }', description: 'Emitido ao escolher um item da navegação.' },
      { name: 'toggleCollapse', payload: '{ collapsed }', description: 'Emitido ao recolher/expandir a lateral.' },
    ],
    slots: [
      { name: 'brand', accepts: 'logo/marca compacta no topo da lateral', optional: true },
      { name: 'nav', accepts: 'panelmenu com as seções (accordion) — o miolo do bloco' },
      { name: 'collapseToggle', accepts: 'icon-button/button que recolhe/expande a lateral', optional: true },
      { name: 'footer', accepts: 'atalhos fixos (configurações, ajuda, conta)', optional: true },
    ],
    states: ['expanded', 'collapsed', 'mobile-drawer'],
    invalidCombinations: [
      { combo: 'sidebar como `role="dialog"` modal no desktop', porque: 'Navegação persistente não bloqueia o conteúdo; modal é padrão de Drawer temporário, não de sidebar.' },
      { combo: 'dois `<nav>` (header + sidebar) com o mesmo rótulo (ou sem rótulo)', porque: 'Landmarks de navegação iguais confundem — a sidebar precisa de um aria-label próprio ("Seções").' },
      { combo: 'recolher para só-ícones sem tooltip/aria-label nos itens', porque: 'Sem o rótulo textual nem nome acessível, os ícones sozinhos ficam ambíguos e mudos.' },
      { combo: 'marcar o item atual só pela cor', porque: 'Cor sozinha exclui quem não a distingue; falta o estado programático.' },
    ],
  },

  relationships: {
    parents: ['app-shell', 'layout'],
    children: ['panelmenu', 'icon-button', 'button', 'icon', 'divider', 'drawer', 'logo'],
    commonlyUsedWith: ['header', 'breadcrumb', 'app-shell'],
    partOfPatterns: ['app-shell', 'navigation'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      // O bloco não inventa cor: herda os papéis dos componentes que compõe.
      barra: { background: 'surface/0', border: 'surface/200' },
      itemAtivo: { background: 'primary/50', text: 'primary/color', indicador: 'primary/500' },
      itemHover: { background: 'surface/100' },
    },
    note: 'Largura recolhida/expandida, indentação dos subitens, alturas e o realce herdam dos tokens do PanelMenu do PrimeNG. O item ativo usa a ênfase da marca (primary). Nenhum hex, nenhum nome de marca — a ênfase é a `primary` da vertical ativa.',
  },

  antiPatterns: [
    {
      regra: 'Nunca dar à sidebar o mesmo landmark/rótulo de navegação do header.',
      porque: 'Dois `<nav>` iguais (ou sem rótulo) quebram a navegação por região no leitor de tela.',
      emVezDisso: 'Header = `<nav aria-label="Navegação principal">`; Sidebar = `<nav aria-label="Seções">`.',
    },
    {
      regra: 'Nunca recolher para só-ícones sem nome acessível/tooltip em cada item.',
      porque: 'Ícone sozinho é ambíguo e mudo; a pessoa perde a navegação ao recolher.',
      emVezDisso: 'No modo recolhido, cada item com aria-label (e tooltip visual) do rótulo original.',
    },
    {
      regra: 'Nunca sinalizar a seção/item atual só pela cor.',
      porque: 'Cor sozinha não é percebida por todos e não é anunciada.',
      emVezDisso: 'aria-current="page" no item atual (a cor só reforça).',
    },
    {
      regra: 'Nunca usar a sidebar persistente como dialog modal no desktop.',
      porque: 'Modal prende o foco e bloqueia o conteúdo — isso é Drawer temporário, não navegação fixa.',
      emVezDisso: 'No desktop, `<nav>` persistente; no mobile, off-canvas (drawer) aberto sob demanda.',
    },
  ],

  examples: {
    angular: `<!-- composição real com componentes PrimeNG -->
<nav aria-label="Seções">
  <p-button type="button" [text]="true" ariaLabel="Recolher menu lateral"
            icon="fa-solid fa-angles-left" (onClick)="toggle()" />
  <p-panelMenu [model]="secoes" [multiple]="false" />
</nav>`,
    html: `<nav data-block="sidebar" aria-label="Seções">
  <button type="button" aria-expanded="true" aria-label="Recolher menu lateral" data-slot="collapse">
    <i class="fa-solid fa-angles-left" aria-hidden="true"></i>
  </button>

  <ul>
    <li>
      <button type="button" aria-expanded="true" aria-controls="sec-cadastros">
        <i class="fa-solid fa-users" aria-hidden="true"></i> Cadastros
      </button>
      <ul id="sec-cadastros" role="group">
        <li><a href="/cadastros/alunos" aria-current="page">Alunos</a></li>
        <li><a href="/cadastros/responsaveis">Responsáveis</a></li>
      </ul>
    </li>
    <li>
      <button type="button" aria-expanded="false" aria-controls="sec-bolsas">
        <i class="fa-solid fa-award" aria-hidden="true"></i> Bolsas
      </button>
      <ul id="sec-bolsas" role="group" hidden>
        <li><a href="/bolsas/solicitacoes">Solicitações</a></li>
        <li><a href="/bolsas/relatorios">Relatórios</a></li>
      </ul>
    </li>
  </ul>
</nav>`,
    inContext: `<!-- sidebar ao lado do conteúdo, dentro do app shell -->
<div data-block="app-shell">
  <header data-block="header" role="banner"> … </header>
  <div>
    <nav data-block="sidebar" aria-label="Seções"> … (ver html acima) … </nav>
    <main> … conteúdo da página … </main>
  </div>
</div>

<!-- no mobile, a mesma navegação vira off-canvas (drawer) aberta pelo header:
<button type="button" aria-haspopup="dialog" aria-expanded="false"
        aria-controls="menu-mobile" aria-label="Abrir menu">
  <i class="fa-solid fa-bars" aria-hidden="true"></i>
</button>
<nav id="menu-mobile" aria-label="Seções" role="dialog" aria-modal="true" hidden> … </nav> -->`,
  },

  a11y: {
    role: 'navigation (landmark) com rótulo próprio; cabeçalhos <button aria-expanded> controlando grupos; itens são links',
    keyboard: [
      'Tab percorre o botão de recolher, os cabeçalhos de seção e os itens',
      'Enter/Espaço expande/colapsa a seção focada e ativa o item',
      'no mobile off-canvas: Esc fecha e devolve o foco ao botão que abriu',
    ],
    requiredAria: [
      '`<nav aria-label="Seções">` — rótulo DIFERENTE do nav do header',
      'cabeçalho de seção como `<button aria-expanded>` + aria-controls do grupo',
      'item atual com aria-current="page"',
      'botão de recolher com aria-label e aria-expanded; no modo recolhido, itens com aria-label',
      'off-canvas mobile como dialog com aria-modal e foco preso',
    ],
    contrastMin: '4.5:1 em textos e ícones; 3:1 no indicador do item ativo e no foco',
  },

  aiHints: {
    keywords: [
      'sidebar', 'menu lateral', 'navegação lateral', 'navegacao lateral', 'menu vertical',
      'menu colapsável', 'menu colapsavel', 'menu retrátil', 'menu retratil', 'painel de navegação',
      'side nav', 'left nav', 'barra lateral', 'menu de seções', 'menu de secoes', 'navegação do app',
    ],
    selectionCriteria:
      'Escolha o bloco Sidebar para a navegação LATERAL persistente do app, com seções colapsáveis e opção de recolher. Navegação no topo = Header/menubar. Painel temporário de filtros/detalhes = Drawer. O componente de menu accordion isolado = panelmenu.',
    disambiguation: [
      { confundeCom: 'header', criterio: 'Header é a barra horizontal do topo; Sidebar é a navegação vertical lateral.' },
      { confundeCom: 'drawer', criterio: 'Drawer é um painel TEMPORÁRIO sobreposto (filtros/detalhes); Sidebar é navegação persistente (no mobile pode usar drawer como off-canvas).' },
      { confundeCom: 'panelmenu', criterio: 'panelmenu é o componente de menu accordion; Sidebar é o bloco inteiro da navegação lateral (com recolher e responsividade).' },
      { confundeCom: 'menubar', criterio: 'menubar é navegação horizontal; Sidebar é vertical.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/', // composição de componentes PrimeNG; sem página única
    storybookId: 'blocks-sidebar',
    deltaFromPrimeng: 'Bloco nephos-own: composição própria de panelmenu + icon-button/button + icon + divider (+ drawer no mobile). Saída = `<nav aria-label="Seções">` persistente no desktop, off-canvas no mobile; a ênfase do item ativo é a `primary` da vertical ativa.',
  },
};
