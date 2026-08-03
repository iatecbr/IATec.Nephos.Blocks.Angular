/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · header.block.meta.ts — BLOCO #5 (composição nossa)
 * ─────────────────────────────────────────────────────────────
 * category: 'block' · origin: 'nephos-own'
 * A barra SUPERIOR do app: marca (logo da vertical), navegação
 * principal, busca e as ações do usuário (tema, notificações, conta).
 * Não é componente novo — é a COMPOSIÇÃO da forma da organização.
 *
 * Compõe: logo + menubar + search-input + theme-toggle + icon-button
 * (+ overlaybadge) + avatar + menu.
 * Saída do Moses = um `<header role="banner">` com landmark de
 * navegação, controles reais e o menu da conta acessível.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const headerBlockMeta: NephosComponentMeta = {
  identity: {
    id: 'header',
    name: 'Header / Navbar',
    category: 'block',
    status: 'beta',
    version: '0.1.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Barra superior do app: marca, navegação principal, busca e ações do usuário.',
    whenToUse: [
      'Topo de qualquer tela autenticada do produto — ponto fixo de identidade, navegação e conta.',
      'Quando a pessoa precisa navegar entre seções principais, buscar e acessar tema/notificações/perfil.',
    ],
    whenNotToUse: [
      'Navegação lateral profunda (muitas seções/subseções) — use o bloco Sidebar.',
      'Ações de UMA seção ou tabela (ordenar, exportar, filtros) — use Toolbar.',
      'Tela de login/autenticação — não tem header de app.',
    ],
  },

  api: {
    // Bloco: a "API" são os pontos de composição (slots) + a config da barra.
    inputs: [
      { name: 'showSearch', type: 'boolean', default: 'true', description: 'Mostra o campo de busca global no topo. Desligar em produtos sem busca central.' },
      { name: 'navItems', type: 'MenuItem[]', default: '—', description: 'As seções da navegação principal (label + rota; submenus quando houver). Alimenta o menubar.' },
      { name: 'user', type: '{ nome: string; foto?: string }', default: '—', description: 'Identidade da conta logada — vira o avatar (foto ou iniciais) que dispara o menu do usuário.' },
      { name: 'notificationsCount', type: 'number', default: '0', description: 'Nº de notificações não lidas; vira o contador (overlaybadge) sobre o ícone de sino. 0 = sem badge.' },
    ],
    outputs: [
      { name: 'navigate', payload: '{ rota }', description: 'Emitido ao escolher uma seção da navegação principal.' },
      { name: 'search', payload: '{ termo }', description: 'Emitido ao buscar no campo global (idealmente com debounce).' },
      { name: 'toggleTheme', payload: 'void', description: 'Emitido ao alternar claro/escuro.' },
      { name: 'logout', payload: 'void', description: 'Emitido ao sair pelo menu do usuário.' },
    ],
    slots: [
      { name: 'brand', accepts: 'logo da vertical ativa, ligado ao início (/)' },
      { name: 'nav', accepts: 'menubar com as seções principais' },
      { name: 'search', accepts: 'search-input (busca global)', optional: true },
      { name: 'actions', accepts: 'theme-toggle + icon-button de notificações (com overlaybadge) + avatar que dispara o menu da conta' },
    ],
    states: ['default', 'sticky', 'mobile-colapsado'],
    invalidCombinations: [
      { combo: 'mais de um `<header role="banner">` ou dois `<nav>` sem rótulos distintos', porque: 'Quebra os landmarks: o leitor de tela não distingue as regiões de navegação.' },
      { combo: 'logo que não leva ao início', porque: 'Convenção universal: o logo do topo volta para a home; quebrá-la desorienta.' },
      { combo: 'ação só-ícone (tema, notificações, conta) sem aria-label', porque: 'Controle sem texto visível fica mudo para o leitor de tela.' },
      { combo: 'nome de marca escrito fixo no header', porque: 'O header serve as 7 verticais; a marca vem do tema/logo ativo, nunca hardcoded.' },
    ],
  },

  relationships: {
    parents: ['app-shell', 'layout', 'page'],
    children: ['logo', 'menubar', 'search-input', 'icon-button', 'theme-toggle', 'avatar', 'menu', 'overlaybadge', 'badge'],
    commonlyUsedWith: ['sidebar', 'breadcrumb', 'app-shell'],
    partOfPatterns: ['app-shell', 'navigation'],
  },

  tokens: {
    typography: 'button-lg',
    byState: {
      // O bloco não inventa cor: herda os papéis dos componentes que compõe.
      barra: { background: 'surface/0', border: 'surface/200' },
      itemAtivo: { text: 'primary/color', indicador: 'primary/500' },
      sticky: { elevation: 'surface/shadow' },
    },
    note: 'Altura da barra, espaçamento entre grupos, raio dos botões e a sombra do modo fixo (sticky) herdam do PrimeNG. O item de navegação ativo usa a ênfase da marca (primary). Nenhum hex, nenhum nome de marca — a identidade é o logo + a `primary` da vertical ativa.',
  },

  antiPatterns: [
    {
      regra: 'Nunca escrever o nome da marca fixo no header.',
      porque: 'O mesmo header serve as 7 verticais; fixar "Educação" quebra a multimarca.',
      emVezDisso: 'O logo e a cor de ênfase vêm da vertical ativa (tema); o HTML não cita marca.',
    },
    {
      regra: 'Nunca deixar ação só-ícone (tema, notificações, conta) sem nome acessível.',
      porque: 'Sem texto visível e sem aria-label, o leitor de tela não anuncia o que o botão faz.',
      emVezDisso: 'Cada `<button>` de ícone com aria-label; o menu da conta com aria-haspopup e aria-expanded.',
    },
    {
      regra: 'Nunca usar mais de um landmark de banner/navegação sem rótulo distinto.',
      porque: 'Dois `<header>`/`<nav>` iguais confundem a navegação por região.',
      emVezDisso: 'Um `<header role="banner">` e o `<nav aria-label="Navegação principal">` único e rotulado.',
    },
    {
      regra: 'Nunca colapsar a navegação num ícone no mobile sem alternativa acessível.',
      porque: 'Um "hambúrguer" mudo esconde a navegação de quem usa teclado/leitor de tela.',
      emVezDisso: 'Botão com aria-label ("Abrir menu"), aria-expanded e aria-controls apontando para a navegação.',
    },
  ],

  examples: {
    angular: `<!-- composição real com componentes PrimeNG -->
<header>
  <a routerLink="/"><img [src]="tema.logoUrl" [alt]="tema.nomeVertical" height="32" /></a>
  <p-menubar [model]="navItems" />
  <input pInputText type="search" [(ngModel)]="termo" name="q" placeholder="Buscar…" />
  <p-button type="button" [text]="true" ariaLabel="Alternar tema" icon="fa-solid fa-moon" (onClick)="toggleTheme()" />
  <p-overlaybadge [value]="naoLidas">
    <p-button type="button" [text]="true" ariaLabel="Notificações" icon="fa-solid fa-bell" />
  </p-overlaybadge>
  <p-button type="button" [text]="true" ariaLabel="Conta" (onClick)="menu.toggle($event)"><span class="avatar">IP</span></p-button>
  <p-menu #menu [model]="contaItens" [popup]="true" />
</header>`,
    html: `<header data-block="header" role="banner">
  <!-- marca (leva ao início) — src/alt vêm do TEMA da vertical ativa, nunca hardcodar -->
  <a href="/" aria-label="Início">
    <img src="{{ logoDaMarcaAtiva }}" alt="{{ nomeDaMarcaAtiva }}" height="32" />
  </a>

  <!-- navegação principal -->
  <nav aria-label="Navegação principal">
    <ul role="menubar">
      <li role="none"><a role="menuitem" href="/painel" aria-current="page">Painel</a></li>
      <li role="none">
        <button role="menuitem" type="button" aria-haspopup="true" aria-expanded="false">Bolsas</button>
        <ul role="menu" hidden>
          <li role="none"><a role="menuitem" href="/bolsas/campos">Por campo</a></li>
          <li role="none"><a role="menuitem" href="/bolsas/escolas">Por escola</a></li>
        </ul>
      </li>
      <li role="none"><a role="menuitem" href="/relatorios">Relatórios</a></li>
    </ul>
  </nav>

  <!-- busca global -->
  <label for="busca-topo" class="visually-hidden">Buscar</label>
  <span class="iconfield">
    <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
    <input id="busca-topo" name="q" type="search" placeholder="Buscar…" />
  </span>

  <!-- ações -->
  <div data-slot="actions">
    <button type="button" aria-label="Alternar tema claro e escuro" aria-pressed="false">
      <i class="fa-solid fa-moon" aria-hidden="true"></i>
    </button>

    <button type="button" aria-label="Notificações, 3 não lidas">
      <i class="fa-solid fa-bell" aria-hidden="true"></i>
      <span data-block="badge" aria-hidden="true">3</span>
    </button>

    <button type="button" aria-haspopup="menu" aria-expanded="false"
            aria-controls="conta-menu" aria-label="Conta de Indiane Pita">
      <span class="avatar" role="img" aria-label="Indiane Pita">IP</span>
    </button>
    <ul id="conta-menu" role="menu" hidden>
      <li role="none"><a role="menuitem" href="/perfil">Meu perfil</a></li>
      <li role="none"><button role="menuitem" type="button">Sair</button></li>
    </ul>
  </div>
</header>`,
    inContext: `<!-- header no topo do app shell (header + sidebar + conteúdo) -->
<div data-block="app-shell">
  <header data-block="header" role="banner"> … (ver html acima) … </header>
  <div>
    <nav data-block="sidebar" aria-label="Seções"> … </nav>
    <main> … conteúdo da página … </main>
  </div>
</div>`,
  },

  a11y: {
    role: 'banner (o header) contendo navigation (o menubar) e ações',
    keyboard: [
      'Tab percorre marca → navegação → busca → ações (tema, notificações, conta)',
      'no menubar: setas ← → entre itens, ↓ abre submenu, Esc fecha',
      'no menu da conta: Enter/Espaço abre, setas percorrem, Esc fecha e devolve o foco',
    ],
    requiredAria: [
      '`<header role="banner">` (um só na página)',
      '`<nav aria-label="Navegação principal">` com `role="menubar"` e item atual com aria-current="page"',
      'cada ação só-ícone com aria-label; menu da conta com aria-haspopup + aria-expanded + aria-controls',
      'campo de busca com `<label>` (visualmente oculto, mas presente)',
    ],
    contrastMin: '4.5:1 em textos e ícones; 3:1 no indicador do item ativo e no foco',
  },

  aiHints: {
    keywords: [
      'header', 'navbar', 'barra superior', 'barra do topo', 'topo', 'cabeçalho', 'cabecalho',
      'navegação principal', 'navegacao principal', 'menu do topo', 'app bar', 'top bar',
      'barra de navegação', 'barra de navegacao', 'menu superior',
    ],
    selectionCriteria:
      'Escolha o bloco Header/Navbar para a barra global do TOPO do app: marca + navegação principal + busca + conta. Navegação lateral = Sidebar. Ações de uma seção/tabela = Toolbar. Só a barra de navegação horizontal (sem marca/busca/conta) = o componente menubar.',
    disambiguation: [
      { confundeCom: 'menubar', criterio: 'menubar é só a navegação horizontal; o Header é a barra inteira (marca + menubar + busca + conta).' },
      { confundeCom: 'toolbar', criterio: 'Toolbar agrupa ações de uma seção/tela; o Header é a barra global fixa do topo do app.' },
      { confundeCom: 'sidebar', criterio: 'Sidebar é a navegação lateral (vertical, colapsável); o Header é a barra do topo.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/', // composição de componentes PrimeNG; sem página única
    storybookId: 'blocks-header',
    deltaFromPrimeng: 'Bloco nephos-own: composição própria de logo + menubar + search-input + theme-toggle + icon-button/overlaybadge + avatar + menu. Saída = `<header role="banner">` com nav landmark; a identidade é o logo + a `primary` da vertical ativa.',
  },
};
