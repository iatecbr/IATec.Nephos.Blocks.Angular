/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · dock.meta.ts — ONDA 4 (navegação · Menus B)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-dock`. API lida do código real
 * (primeng@21.0.2, `types/primeng-dock.d.ts`).
 *
 * Barra de atalhos ancorada numa borda da tela (estilo dock do macOS):
 * uma faixa de ícones grandes, sempre visíveis, que ampliam ao passar o
 * mouse. Para lançar apps/ferramentas frequentes. O item é PARTE
 * (modelo MenuItem, quase sempre só ícone + tooltip), não ficha própria.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const dockMeta: NephosComponentMeta = {
  identity: {
    id: 'dock',
    name: 'Dock',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Barra de atalhos ancorada numa borda da tela, com ícones grandes que ampliam ao passar o mouse.',
    whenToUse: [
      'Lançador de poucas ferramentas/apps frequentes num produto tipo workspace ou painel amplo.',
      'Quando cada destino é reconhecível por ícone e deve ficar sempre acessível numa borda.',
    ],
    whenNotToUse: [
      'Navegação principal entre áreas do app — use Menubar.',
      'Muitos destinos ou destinos com rótulos longos — o dock é para poucos ícones.',
      'Menu de ações de um item específico — use Menu (popup).',
      'Barra de ferramentas de um editor (agrupa controles, não lança destinos) — use Toolbar.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'model',
        type: 'MenuItem[]',
        default: '[]',
        description: 'Os itens do dock. Cada um costuma ter `icon` (classe — ver `icon.meta.ts`), `label` (usado como tooltip/nome acessível) e destino por `routerLink`/`url` ou ação por `command`. Poucos itens: o dock é para atalhos reconhecíveis.',
      },
      {
        name: 'position',
        type: "'bottom' | 'top' | 'left' | 'right'",
        default: "'bottom'",
        description: 'Em qual borda da tela o dock fica ancorado. `bottom` é o padrão (estilo macOS); `left`/`right` empilham na vertical.',
      },
      {
        name: 'breakpoint',
        type: 'string',
        default: "'960px'",
        description: 'Largura abaixo da qual o dock entra em modo compacto/mobile. Ajustar à quantidade de itens.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: '—',
        description: 'Nome acessível do dock como conjunto (ex.: "Atalhos"). Obrigatório na prática, já que os itens são só ícones.',
      },
      {
        name: 'ariaLabelledBy',
        type: 'string',
        default: '—',
        description: 'Alternativa ao ariaLabel apontando para o id de um rótulo já visível na tela.',
      },
      {
        name: 'id',
        type: 'string',
        default: '—',
        description: 'Id da raiz do componente. Deixar o PrimeNG gerar, salvo necessidade de um id fixo para aria-labelledby externo.',
      },
    ],
    outputs: [
      { name: 'onFocus', payload: 'FocusEvent', description: 'Emitido quando o dock recebe foco.' },
      { name: 'onBlur', payload: 'FocusEvent', description: 'Emitido quando o dock perde o foco.' },
    ],
    slots: [
      { name: 'item', accepts: 'template do item (ícone/conteúdo)', optional: true },
    ],
    states: ['default', 'item-hover', 'item-focus', 'item-active', 'item-disabled', 'mobile'],
    invalidCombinations: [
      {
        combo: 'item de dock só com ícone e sem `label`/aria-label',
        porque: 'Ícone sem nome acessível não é anunciado; a pessoa que usa leitor de tela não sabe o que o item faz.',
      },
      {
        combo: 'Dock com muitos itens ou com rótulos de texto longos',
        porque: 'O dock é uma faixa de ícones reconhecíveis; muitos itens ou textos quebram o padrão e a ampliação.',
      },
      {
        combo: 'Dock como navegação principal do app',
        porque: 'O dock lança atalhos numa borda; a navegação entre áreas/rotas é papel do Menubar.',
      },
    ],
  },

  relationships: {
    parents: ['app-shell', 'page'],
    children: ['icon', 'tooltip'],
    commonlyUsedWith: ['menubar', 'tooltip', 'icon'],
    partOfPatterns: ['navigation', 'app-shell'],
  },

  tokens: {
    typography: 'caption (tooltip do item)',
    byState: {
      default: { background: 'surface/0', text: 'surface/text' },
      'item-focus': { background: 'surface/100' },
      'item-active': { text: 'primary/color' },
    },
    note: 'Fundo do dock = superfície suave (translúcida no preset); item em foco = realce surface. A ampliação no hover, o raio e as sombras herdam do PrimeNG. Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar um item de dock só com ícone, sem nome acessível.',
      porque: 'Um ícone isolado não é lido; quem usa leitor de tela não descobre o destino.',
      emVezDisso: 'Cada item com aria-label (ou tooltip com nome) e o ícone marcado como aria-hidden.',
    },
    {
      regra: 'Nunca usar o Dock como navegação principal entre as áreas do app.',
      porque: 'O dock é um lançador de atalhos numa borda; não substitui a barra de navegação estruturada.',
      emVezDisso: 'Menubar para a navegação principal; o dock só para atalhos frequentes complementares.',
    },
    {
      regra: 'Nunca lotar o dock com muitos itens ou rótulos de texto longos.',
      porque: 'Perde o reconhecimento por ícone e a leitura fica ruim, além de comer a borda inteira.',
      emVezDisso: 'Poucos ícones reconhecíveis; se são muitos destinos, um Menubar ou PanelMenu organiza melhor.',
    },
  ],

  examples: {
    angular: `<p-dock [model]="[
  { label: 'Início', icon: 'house', routerLink: '/' },
  { label: 'Relatórios', icon: 'chart-column', routerLink: '/relatorios' },
  { label: 'Configurações', icon: 'gear', routerLink: '/config' }
]" position="bottom" ariaLabel="Atalhos" />`,
    html: `<nav aria-label="Atalhos">
  <ul>
    <li>
      <a href="/" aria-label="Início">
        <i class="fa-solid fa-house" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a href="/relatorios" aria-label="Relatórios">
        <i class="fa-solid fa-chart-column" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a href="/config" aria-label="Configurações">
        <i class="fa-solid fa-gear" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</nav>`,
    inContext: `<!-- dock fixo na borda inferior de um workspace -->
<main data-block="workspace">
  <!-- ...conteúdo da área de trabalho... -->
</main>
<nav aria-label="Atalhos" data-position="bottom">
  <ul>
    <li><a href="/arquivos" aria-label="Arquivos"><i class="fa-solid fa-folder" aria-hidden="true"></i></a></li>
    <li><a href="/mensagens" aria-label="Mensagens"><i class="fa-solid fa-envelope" aria-hidden="true"></i></a></li>
  </ul>
</nav>`,
  },

  a11y: {
    role: 'navigation (landmark) contendo uma lista de links/ações reconhecíveis por ícone',
    keyboard: [
      'Tab entra e sai do dock',
      'Setas movem entre os itens (←/→ na horizontal, ↑/↓ na vertical)',
      'Home/End vão ao primeiro/último',
      'Enter/Espaço ativa o item',
    ],
    requiredAria: [
      '`<nav aria-label>` (ou aria-labelledby) nomeando o dock',
      'cada item com nome acessível (aria-label ou tooltip); ícone com aria-hidden',
      'item da rota atual com aria-current="page"',
    ],
    contrastMin: '4.5:1 do texto do tooltip; 3:1 do realce do item em foco e dos ícones significativos',
  },

  aiHints: {
    keywords: [
      'dock', 'barra de atalhos', 'atalhos', 'launcher', 'lançador', 'lancador', 'barra de ícones', 'barra de icones',
      'macos dock', 'menu de ícones', 'menu de icones', 'barra flutuante', 'ícones ampliáveis', 'icones ampliaveis',
    ],
    selectionCriteria:
      'Escolha Dock para uma faixa de POUCOS atalhos reconhecíveis por ícone, ancorada numa borda da tela (estilo macOS). Navegação principal entre áreas = Menubar; lista vertical de destinos agrupados = PanelMenu; agrupar controles de um editor = Toolbar.',
    disambiguation: [
      { confundeCom: 'menubar', criterio: 'Menubar é a navegação principal estruturada (com rótulos e submenus); Dock é uma faixa de atalhos por ícone numa borda.' },
      { confundeCom: 'toolbar', criterio: 'Toolbar agrupa controles/ações de uma área ou editor; Dock lança destinos/ferramentas frequentes.' },
      { confundeCom: 'speeddial', criterio: 'SpeedDial fica recolhido num botão flutuante e abre em leque ao clicar; Dock fica sempre visível na borda.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/dock',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Ícone do item segue `icon.meta.ts`; a ampliação no hover, o raio e as sombras herdam do PrimeNG.',
  },
};
