/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · scrollpanel.meta.ts — ONDA "PAINÉIS/ESTRUTURA"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-scrollpanel`. API lida do código real
 * (primeng@21.0.2, `types/primeng-scrollpanel.d.ts`).
 *
 * Envolve uma área de altura/largura limitada com uma barra de
 * rolagem CUSTOMIZADA (temável, consistente entre navegadores) no
 * lugar da barra nativa. É invólucro de rolagem, não de conteúdo em
 * si. Saída = região rolável (`overflow:auto`, tabindex, aria-label).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const scrollPanelMeta: NephosComponentMeta = {
  identity: {
    id: 'scrollpanel',
    name: 'ScrollPanel',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Área de rolagem com barra customizada e consistente entre navegadores.',
    whenToUse: [
      'Confinar uma lista/bloco longo numa altura ou largura fixa, com rolagem interna.',
      'Quando a barra de rolagem nativa destoa do tema e se quer uma barra que acompanhe o design.',
      'Áreas roláveis dentro de painéis, drawers ou colunas de layout.',
    ],
    whenNotToUse: [
      'A rolagem principal da página — deixe o scroll nativo do navegador.',
      'Tabelas com muitos dados que precisam de rolagem virtual/paginação — use os recursos da Table.',
      'Só para dar um limite visual sem rolagem — isso é altura + overflow do contêiner.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'step',
        type: 'number',
        default: '5',
        description: 'Quanto (em pixels) o conteúdo rola a cada seta do teclado quando a barra está focada. Garante rolagem sem mouse.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'default', accepts: 'o conteúdo a ser rolado (ng-content padrão) — ou ng-template pTemplate="content"' },
    ],
    states: ['default', 'scrolling', 'focus'],
    invalidCombinations: [
      {
        combo: 'ScrollPanel sem altura/largura limitada no contêiner',
        porque: 'Sem um limite dimensional não há transbordo para rolar; a barra customizada nunca aparece.',
      },
      {
        combo: 'usar ScrollPanel na rolagem principal da página',
        porque: 'Substituir o scroll nativo da página quebra atalhos, barra do sistema e a expectativa da pessoa.',
      },
    ],
  },

  relationships: {
    parents: ['panel', 'card', 'drawer', 'splitter', 'page'],
    children: ['text', 'datatable', 'dataview', 'menu'],
    commonlyUsedWith: ['panel', 'drawer', 'splitter'],
    partOfPatterns: ['scrollable-region', 'sidebar', 'master-detail'],
  },

  tokens: {
    byState: {
      default: { bar: 'surface/300', track: 'surface/100' },
      scrolling: { bar: 'surface/400' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Espessura e raio da barra, além do comportamento de rolagem, herdam do PrimeNG (scrollpanel.*). Cor da barra = papel surface. Cor por papel + passo, nunca hex.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar ScrollPanel sem definir uma altura ou largura limite.',
      porque: 'Sem limite não há transbordo — não há o que rolar e a barra não aparece.',
      emVezDisso: 'Definir a altura/largura da região; o ScrollPanel só cuida da barra quando o conteúdo excede.',
    },
    {
      regra: 'Nunca substituir a rolagem principal da página por ScrollPanel.',
      porque: 'Quebra atalhos de teclado, a barra do sistema operacional e a expectativa de scroll da página.',
      emVezDisso: 'Deixar o scroll nativo na página; usar ScrollPanel só em regiões internas confinadas.',
    },
    {
      regra: 'Nunca esconder a possibilidade de rolar (barra invisível e sem foco por teclado).',
      porque: 'Se a barra some e a região não é focável, quem usa teclado ou não percebe o transbordo fica preso.',
      emVezDisso: 'Manter a região rolável focável e a barra perceptível; garantir rolagem por setas (step).',
    },
  ],

  examples: {
    angular: `<p-scrollpanel [style]="{ width: '100%', height: '200px' }">
  <!-- conteúdo longo -->
</p-scrollpanel>`,
    html: `<div role="region" aria-label="Termos de uso" tabindex="0"
     style="height:200px; overflow:auto;">
  <!-- conteúdo longo -->
</div>`,
    inContext: `<!-- área rolável de termos, com o aceite fora dela -->
<section aria-labelledby="termos-h">
  <h3 id="termos-h">Termos de uso</h3>
  <div role="region" aria-label="Termos de uso" tabindex="0"
       style="height:240px; overflow:auto;">
    <p>...texto longo dos termos...</p>
  </div>
  <label><input type="checkbox" name="aceite" /> Li e aceito os termos</label>
</section>`,
  },

  a11y: {
    role: 'region rolável focável',
    keyboard: [
      'Tab foca a região rolável',
      'setas ↑/↓ (e ←/→) rolam pelo fator `step`',
      'PageUp/PageDown e Home/End quando o conteúdo é focável nativamente',
    ],
    requiredAria: [
      'a região rolável com tabindex="0" para ser alcançável por teclado',
      'aria-label/labelledby nomeando a região quando ela tem significado próprio',
    ],
    contrastMin: '3:1 da barra de rolagem quando ela é o único indicador de que há mais conteúdo',
  },

  aiHints: {
    keywords: [
      'scrollpanel', 'scroll panel', 'área rolável', 'area rolavel', 'barra de rolagem',
      'rolagem customizada', 'scroll customizado', 'overflow', 'conteúdo com scroll',
      'conteudo com scroll', 'altura fixa com rolagem',
    ],
    selectionCriteria:
      'Escolha ScrollPanel para confinar conteúdo longo numa altura/largura fixa com uma barra de rolagem temável. Rolagem da página inteira = scroll nativo; muitos dados tabulares = recursos da Table.',
    disambiguation: [
      { confundeCom: 'panel', criterio: 'Panel é um contêiner com cabeçalho (e recolher); ScrollPanel só provê a barra de rolagem de uma área confinada.' },
      { confundeCom: 'splitter', criterio: 'Splitter redimensiona áreas por arraste; ScrollPanel apenas rola o conteúdo que excede o limite.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/scrollpanel',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída = região rolável (`overflow:auto`) focável e rotulada; a barra customizada é temada pelo PrimeNG. Só a cor da marca entra pelo tema.',
  },
};
