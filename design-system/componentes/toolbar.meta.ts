/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · toolbar.meta.ts — ONDA "PAINÉIS/ESTRUTURA"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-toolbar`. API lida do código real
 * (primeng@21.0.2, `types/primeng-toolbar.d.ts`).
 *
 * Barra que AGRUPA controles/ações em três zonas: início, centro e
 * fim (`start`/`center`/`end`). Aparece acima de tabelas, listas e
 * editores. NÃO é navegação de página (isso é Menubar). Saída = uma
 * região rotulada com grupos de controles.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const toolbarMeta: NephosComponentMeta = {
  identity: {
    id: 'toolbar',
    name: 'Toolbar',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Barra que agrupa controles e ações em zonas de início, centro e fim.',
    whenToUse: [
      'Reunir ações e filtros acima de uma tabela/lista (buscar, filtrar, exportar, novo).',
      'Cabeçalho de uma área com título de um lado e ações do outro.',
    ],
    whenNotToUse: [
      'Navegação entre páginas/áreas do app — use Menubar.',
      'Um único botão — não precisa de uma barra.',
      'Conteúdo (não controles) — barra é para ações, não para dados.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'ariaLabelledBy',
        type: 'string',
        default: '—',
        description: 'Id do título que nomeia a barra (ou usar aria-label direto). Dá nome acessível à barra.',
      },
      {
        name: 'styleClass',
        type: 'string',
        default: '—',
        description: 'Classe extra para ajustes de layout.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'start', accepts: 'ng-template pTemplate="start" — zona da esquerda (título, ações principais)' },
      { name: 'center', accepts: 'ng-template pTemplate="center" — zona central (busca, filtros)', optional: true },
      { name: 'end', accepts: 'ng-template pTemplate="end" — zona da direita (ações secundárias, exportar)' },
    ],
    states: ['default'],
    invalidCombinations: [
      {
        combo: 'usar Toolbar como navegação principal do app',
        porque: 'Barra de ferramentas agrupa ações do contexto atual; navegar entre áreas é papel do Menubar.',
      },
      {
        combo: 'botões de ícone na barra sem aria-label',
        porque: 'Ações compactas só com ícone precisam de nome acessível.',
      },
      {
        combo: 'amontoar muitas ações sem agrupar',
        porque: 'Uma barra lotada esconde a ação principal; a pessoa não sabe o que é mais importante.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'page', 'datatable'],
    children: ['button', 'icon-button', 'search-input', 'select', 'selectbutton', 'multiselect'],
    commonlyUsedWith: ['datatable', 'dataview', 'search-input', 'button'],
    partOfPatterns: ['data-table', 'list-management', 'page-header'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      default: { background: 'surface/0', border: 'surface/200', text: 'surface/text' },
    },
    note: 'Fundo/borda de superfície herdam do PrimeNG. A cor de ênfase (primary) fica só na AÇÃO principal (um botão), não na barra inteira. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar Toolbar para navegar entre áreas do app.',
      porque: 'Confunde ação (contexto atual) com navegação (mudar de área).',
      emVezDisso: 'Menubar para navegação; Toolbar para ações do que está na tela.',
    },
    {
      regra: 'Nunca lotar a barra sem hierarquia.',
      porque: 'Muitas ações no mesmo peso escondem a principal.',
      emVezDisso: 'Uma ação primária destacada (primary), o resto secundário; agrupar por zona (início/centro/fim); excedente num menu "⋯".',
    },
    {
      regra: 'Nunca deixar botões de ícone da barra sem nome acessível.',
      porque: 'Ícone sozinho não é anunciado.',
      emVezDisso: 'aria-label em cada botão de ícone (ver `icon-button.meta.ts`).',
    },
  ],

  examples: {
    angular: `<p-toolbar ariaLabelledBy="tbl-titulo">
  <ng-template pTemplate="start">
    <h2 id="tbl-titulo">Bolsas por escola</h2>
  </ng-template>
  <ng-template pTemplate="center">
    <!-- search-input + multiselect de status -->
  </ng-template>
  <ng-template pTemplate="end">
    <button pButton>Exportar</button>
    <button pButton severity="primary">Nova escola</button>
  </ng-template>
</p-toolbar>`,
    html: `<div role="toolbar" aria-label="Ações da lista de bolsas">
  <div class="tb-start"><h2>Bolsas por escola</h2></div>
  <div class="tb-center">
    <label class="visually-hidden" for="q">Buscar escola</label>
    <input id="q" type="search" placeholder="Buscar escola…" />
  </div>
  <div class="tb-end">
    <button type="button">Exportar</button>
    <button type="button" data-variant="primary">Nova escola</button>
  </div>
</div>`,
    inContext: `<!-- barra acima de uma DataTable -->
<section aria-label="Bolsas por escola">
  <div role="toolbar" aria-label="Ações da tabela">
    <div class="tb-start"><h2>Bolsas por escola</h2></div>
    <div class="tb-end">
      <button type="button" aria-label="Exportar">
        <i class="fa-solid fa-arrow-up-from-bracket" aria-hidden="true"></i>
      </button>
      <button type="button" data-variant="primary">Nova escola</button>
    </div>
  </div>
  <table><!-- ver ficha datatable --></table>
</section>`,
  },

  a11y: {
    role: 'toolbar (grupo de controles) com nome',
    keyboard: [
      'Tab entra na barra; para um grupo de botões afins, setas ←/→ navegam (roving tabindex)',
      'controles ativam com Enter/Espaço',
    ],
    requiredAria: [
      'role="toolbar" com aria-label/labelledby',
      'botões de ícone com aria-label',
      'agrupar controles relacionados; a busca com `<label>`',
    ],
    contrastMin: '4.5:1 dos textos; 3:1 das bordas e do foco',
  },

  aiHints: {
    keywords: [
      'toolbar', 'barra de ferramentas', 'barra de ações', 'barra de acoes', 'ações da tabela',
      'acoes da tabela', 'cabeçalho de lista', 'cabecalho de lista', 'busca e filtros', 'ações do topo',
    ],
    selectionCriteria:
      'Escolha Toolbar para agrupar ações/filtros do contexto atual (acima de tabela/lista, cabeçalho de área), em zonas início/centro/fim. Navegação entre áreas = Menubar.',
    disambiguation: [
      { confundeCom: 'menubar', criterio: 'Menubar navega entre áreas/rotas; Toolbar agrupa ações do que está na tela.' },
      { confundeCom: 'buttongroup', criterio: 'Button group junta botões afins num controle; Toolbar é a barra que contém grupos e outros controles.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/toolbar',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Zonas start/center/end por template; saída = região role="toolbar" com grupos de controles. Botões de ícone seguem `icon-button.meta.ts`.',
  },
};
