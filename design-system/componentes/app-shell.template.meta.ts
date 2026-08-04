/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · app-shell.template.meta.ts — TEMPLATE #1 (a moldura da página)
 * ─────────────────────────────────────────────────────────────
 * category: 'layout' · origin: 'nephos-own'
 * O ESQUELETO de página do app: header no topo, sidebar à esquerda e a
 * área de conteúdo (`<main>`), onde cada página troca o conteúdo real.
 * Um template é a estrutura SEM conteúdo — os blocos se encaixam nos slots.
 *
 * Compõe: header (bloco) + sidebar (bloco) + breadcrumb + `<main>` +
 * um "pular para o conteúdo" (skip link).
 * Saída do Moses = a moldura com os LANDMARKS certos (banner, duas
 * navegações rotuladas distintas, main) e o skip link.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const appShellTemplateMeta: NephosComponentMeta = {
  identity: {
    id: 'app-shell',
    name: 'App Shell',
    category: 'layout',
    status: 'beta',
    version: '0.1.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Esqueleto de página do app: header no topo, sidebar à esquerda e a área de conteúdo.',
    whenToUse: [
      'Toda tela interna autenticada do produto — a moldura fixa onde o conteúdo das páginas troca.',
      'Quando há navegação global (header) e/ou lateral (sidebar) constantes ao redor do conteúdo.',
    ],
    whenNotToUse: [
      'Telas sem app chrome (login, erro, landing pública) — usam um layout centrado próprio.',
      'Um trecho de conteúdo isolado (um card, um formulário) — o shell é a página inteira.',
      'Dividir a ÁREA DE CONTEÚDO em painéis redimensionáveis — isso é Splitter, dentro do main.',
    ],
  },

  api: {
    // Template: a "API" são os slots de composição + a config da moldura.
    inputs: [
      { name: 'showSidebar', type: 'boolean', default: 'true', description: 'Mostra a navegação lateral. Desligar em telas foco-no-conteúdo (ex.: leitura, wizard em tela cheia).' },
      { name: 'showBreadcrumb', type: 'boolean', default: 'true', description: 'Mostra a trilha (breadcrumb) no topo do conteúdo. Desligar em telas rasas (1 nível).' },
      // ✅ DECIDIDO (Indiane, 04/08/2026): TEMPLATE É MOLDURA, não tela
      // pronta. A moldura dá a ESTRUTURA — região com nome, um `<h1>` só,
      // ordem de leitura, a grade — e as peças entram pelos SLOTS, já
      // ligadas por quem as tem. Consequência: só sobrevivem os inputs que
      // a moldura consegue honrar sozinha, e os eventos ficam com a peça
      // projetada. Uma moldura que reemitisse evento de peça seria um
      // repasse — e um repasse se desatualiza.
      { name: 'sidebarCollapsed', type: 'boolean', default: 'false', description: 'É LARGURA, não estado do bloco: reserva a coluna estreita (trilha de ícones) em vez da larga, porque a moldura não alcança um bloco projetado. Ligar ao MESMO sinal que controla o `collapsed` do bloco sidebar, para os dois concordarem.' },
      { name: 'skipLinkLabel', type: 'string', default: 'Pular para o conteúdo', description: 'Texto do skip link — traduzível pela aplicação.' },
    ],
    outputs: [],
    slots: [
      { name: 'header', accepts: 'o bloco header (marca + navegação principal + busca + conta)' },
      { name: 'sidebar', accepts: 'o bloco sidebar (navegação lateral por seções)', optional: true },
      { name: 'breadcrumb', accepts: 'breadcrumb (trilha) no topo do conteúdo', optional: true },
      { name: 'pageHeader', accepts: 'título da página (heading) + ações da página', optional: true },
      { name: 'content', accepts: 'o conteúdo real da página, dentro do `<main>` (é o que cada página troca)' },
    ],
    states: ['default', 'sidebar-collapsed', 'mobile'],
    invalidCombinations: [
      { combo: 'conteúdo da página fora do `<main>` (ou mais de um `<main>`)', porque: 'Quebra o landmark principal: o "pular para o conteúdo" e a navegação por região deixam de funcionar.' },
      { combo: 'header e sidebar com o mesmo rótulo de `<nav>`', porque: 'Dois landmarks de navegação iguais confundem — precisam de aria-label distintos ("Navegação principal" vs "Seções").' },
      { combo: 'shell sem "pular para o conteúdo" (skip link)', porque: 'Sem ele, quem usa teclado precisa tabular por toda a navegação em cada página.' },
      { combo: 'nome de marca fixo na moldura', porque: 'O shell serve as 7 verticais; a identidade vem do tema/logo ativo, nunca hardcoded.' },
    ],
  },

  relationships: {
    parents: [],
    children: ['header', 'sidebar', 'breadcrumb'],
    commonlyUsedWith: ['datatable', 'dataview', 'empty-state', 'search-filters', 'card'],
    partOfPatterns: ['app-shell', 'navigation'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      // A moldura não inventa cor: herda dos blocos e das superfícies.
      // ✅ DECIDIDO (Indiane, 04/08/2026): o fundo de tela é o papel de
      // FUNDO DE PÁGINA (`surface/ground`), não o passo cru `surface/50`.
      // Medido: a rampa slate NÃO inverte entre os modos, então
      // `surface/50` deixaria a tela quase branca no modo escuro. O papel
      // acompanha o modo — `surface/100` no claro, `surface/950` no
      // escuro — e é o mesmo fundo que o `<body>` do produto usa, então a
      // tela nasce no fundo das telas de dentro. Mesmo raciocínio que
      // corrigiu a ilustração do `empty-state` em 03/08/2026.
      fundoApp: { background: 'surface/ground' },
      areaConteudo: { background: 'surface/0' },
    },
    note: 'Fundo do app = `surface/ground` (surface/100 no claro, surface/950 no escuro). A grade (áreas de header/sidebar/conteúdo) e os espaçamentos herdam dos tokens do PrimeNG e dos blocos; a LARGURA da lateral é da moldura (256px expandida, 90px recolhida — os valores que o layout do repositório já usa em produção), porque o bloco `sidebar` não declara largura de propósito. A moldura só posiciona; a cor vem das superfícies (surface) e a ênfase, da `primary` da vertical ativa. Nenhum hex, nenhum nome de marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca colocar o conteúdo da página fora de um `<main>` único.',
      porque: 'O `<main>` é o alvo do "pular para o conteúdo" e o landmark que a tecnologia assistiva usa para chegar ao miolo.',
      emVezDisso: 'Um só `<main id="conteudo">` recebendo o conteúdo de cada página.',
    },
    {
      regra: 'Nunca omitir o "pular para o conteúdo" (skip link).',
      porque: 'Sem ele, quem navega por teclado repassa header e sidebar inteiros a cada página.',
      emVezDisso: 'Um `<a href="#conteudo">Pular para o conteúdo</a>` como primeiro foco da página.',
    },
    {
      regra: 'Nunca repetir o rótulo de navegação entre header e sidebar.',
      porque: 'Dois `<nav>` com o mesmo nome (ou sem nome) tornam as regiões indistinguíveis.',
      emVezDisso: 'Header = "Navegação principal"; Sidebar = "Seções" (rótulos distintos).',
    },
    {
      regra: 'Nunca fixar o nome/identidade da marca na moldura.',
      porque: 'O mesmo shell serve as 7 verticais; a marca é do tema (logo + primary), não do HTML.',
      emVezDisso: 'O logo e a cor de ênfase vêm da vertical ativa; a moldura é neutra.',
    },
  ],

  examples: {
    angular: `<!-- moldura com os blocos + router-outlet no conteúdo -->
<a href="#conteudo" class="skip-link">Pular para o conteúdo</a>
<div class="app-shell">
  <app-header [navItems]="nav" [user]="user" />
  <app-sidebar [items]="secoes" [collapsed]="recolhida" />
  <main id="conteudo">
    <p-breadcrumb [model]="trilha" [home]="home" />
    <router-outlet />
  </main>
</div>`,
    html: `<a href="#conteudo" class="skip-link">Pular para o conteúdo</a>
<div data-block="app-shell">
  <!-- barra global do topo -->
  <header data-block="header" role="banner"> … (bloco header) … </header>

  <div data-slot="body">
    <!-- navegação lateral (rótulo DISTINTO do header) -->
    <nav data-block="sidebar" aria-label="Seções"> … (bloco sidebar) … </nav>

    <!-- conteúdo da página -->
    <main id="conteudo">
      <nav aria-label="Trilha">
        <ol>
          <li><a href="/">Início</a></li>
          <li><a href="/bolsas">Bolsas</a></li>
          <li><span aria-current="page">Solicitações</span></li>
        </ol>
      </nav>

      <div data-slot="page-header">
        <h1>Solicitações de bolsa</h1>
        <button type="button" data-variant="primary">Nova solicitação</button>
      </div>

      <!-- o conteúdo real da página entra aqui (tabela, cards, formulário…) -->
    </main>
  </div>
</div>`,
    inContext: `<!-- o shell com uma listagem preenchendo o conteúdo -->
<div data-block="app-shell">
  <header data-block="header" role="banner"> … </header>
  <div data-slot="body">
    <nav data-block="sidebar" aria-label="Seções"> … </nav>
    <main id="conteudo">
      <h1>Escolas</h1>
      <form data-block="search-filters" role="search" aria-label="Buscar e filtrar escolas"> … </form>
      <table><!-- datatable --></table>
    </main>
  </div>
</div>`,
  },

  a11y: {
    role: 'moldura com landmarks: banner (header), navigation ×2 (rótulos distintos), main',
    keyboard: [
      'o "pular para o conteúdo" é o primeiro foco e leva ao `<main>`',
      'Tab percorre header → sidebar → conteúdo na ordem do DOM',
      'ao trocar de página (rota), mover o foco para o `<main>`/`<h1>` da nova página',
    ],
    requiredAria: [
      'skip link `<a href="#conteudo">` como primeiro elemento focável',
      'um `<main id="conteudo">` único',
      '`<header role="banner">` e dois `<nav>` com aria-label distintos',
      'breadcrumb como `<nav aria-label="Trilha">` com o atual em aria-current="page"',
    ],
    contrastMin: '4.5:1 em textos; foco visível em todos os controles; áreas de conteúdo com contraste suficiente do fundo do app',
  },

  aiHints: {
    keywords: [
      'app shell', 'appshell', 'layout do app', 'estrutura de página', 'estrutura de pagina',
      'esqueleto da tela', 'esqueleto de página', 'moldura', 'moldura da página', 'template de página',
      'page layout', 'header sidebar conteúdo', 'chrome do app', 'layout base', 'gabarito de tela',
    ],
    selectionCriteria:
      'Escolha o App Shell como a MOLDURA das telas internas: header + sidebar + área de conteúdo. Só a barra do topo = bloco header; só a lateral = bloco sidebar; dividir a área de conteúdo em painéis = Splitter. Login/erro usam um layout centrado, não o shell.',
    disambiguation: [
      { confundeCom: 'header', criterio: 'Header é só a barra do topo; App Shell é a moldura inteira (header + sidebar + conteúdo).' },
      { confundeCom: 'sidebar', criterio: 'Sidebar é só a navegação lateral; App Shell é a moldura que a posiciona junto do header e do conteúdo.' },
      { confundeCom: 'splitter', criterio: 'Splitter divide uma área em painéis redimensionáveis DENTRO do conteúdo; App Shell é a moldura de página.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/', // moldura de composição; sem componente único
    storybookId: 'templates-app-shell',
    deltaFromPrimeng: 'Template nephos-own (category: layout): moldura própria de header + sidebar + `<main>` + skip link. Estrutura semântica com landmarks; a identidade vem do tema (logo + primary da vertical ativa).',
  },
};
