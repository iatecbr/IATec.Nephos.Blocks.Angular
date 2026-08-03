/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · skeleton.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-skeleton`. API lida do código real
 * (primeng@21.0.2, `types/primeng-skeleton.d.ts`).
 *
 * Placeholder de CARREGAMENTO que imita a forma do conteúdo que vai
 * chegar. Reduz o "pulo" de layout e a sensação de espera. É decorativo
 * para a tecnologia assistiva — quem anuncia "carregando" é a região.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const skeletonMeta: NephosComponentMeta = {
  identity: {
    id: 'skeleton',
    name: 'Skeleton',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Placeholder cinza que imita o conteúdo enquanto ele carrega.',
    whenToUse: [
      'Esperar por conteúdo cuja FORMA já se conhece (lista, card, tabela).',
      'Reduzir o salto de layout quando os dados chegam.',
    ],
    whenNotToUse: [
      'Espera muito curta (< ~0,5s) — o skeleton pisca e atrapalha.',
      'Progresso mensurável de uma tarefa — use ProgressBar.',
      'Ação pontual num botão — use um spinner no próprio botão.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'shape',
        type: "'rectangle' | 'circle'",
        default: 'rectangle',
        description: 'Forma do placeholder. `circle` para avatar/foto; `rectangle` para texto e blocos.',
      },
      {
        name: 'animation',
        type: "'wave' | 'none'",
        default: 'wave',
        description: 'Animação de brilho. Usar `none` quando a pessoa preferir menos movimento (prefers-reduced-motion).',
      },
      {
        name: 'width',
        type: 'string (ex.: "100%", "8rem")',
        default: '100%',
        description: 'Largura do placeholder. Variar as larguras das linhas de texto deixa mais natural.',
      },
      {
        name: 'height',
        type: 'string (ex.: "1rem")',
        default: '1rem',
        description: 'Altura do placeholder.',
      },
      {
        name: 'borderRadius',
        type: 'string',
        default: '(herda do tema)',
        description: 'Raio das quinas. Deixar herdar do tema para bater com o componente real.',
      },
    ],
    outputs: [],
    slots: [],
    states: ['loading'],
    invalidCombinations: [
      {
        combo: 'skeleton com forma diferente do conteúdo final',
        porque: 'Quando o conteúdo chega, o layout "pula" — o efeito é pior do que uma espera simples.',
      },
      {
        combo: 'skeleton anunciado item a item pelo leitor de tela',
        porque: 'Vira ruído ("em branco, em branco…"). A informação certa é "carregando" na região, não cada placeholder.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'list', 'table', 'page'],
    children: [],
    commonlyUsedWith: ['card', 'avatar', 'table'],
    partOfPatterns: ['loading', 'list', 'card'],
  },

  tokens: {
    typography: '—',
    byState: {
      loading: { base: 'surface/200', shimmer: 'surface/100' },
    },
    note: 'Cores do placeholder = surface (neutros). Raio deve herdar do componente que está sendo imitado. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar skeleton que não corresponde ao layout final.',
      porque: 'Gera salto de layout quando o conteúdo chega — desorienta.',
      emVezDisso: 'Espelhar a estrutura real (mesmas formas, tamanhos e posições aproximadas).',
    },
    {
      regra: 'Nunca deixar o skeleton audível para o leitor de tela.',
      porque: 'Anunciar cada placeholder polui a leitura.',
      emVezDisso: 'Marcar a região com aria-busy="true" e os skeletons com aria-hidden; anunciar "carregando".',
    },
    {
      regra: 'Nunca deixar skeleton sem saída em caso de erro/demora.',
      porque: 'Skeleton eterno parece travamento.',
      emVezDisso: 'Tempo-limite → estado de erro (Message) ou vazio (Empty state).',
    },
  ],

  examples: {
    angular: `<p-skeleton shape="circle" size="3rem" />
<p-skeleton width="12rem" height="1rem" />`,
    html: `<!-- região de carregamento anunciada uma vez -->
<div aria-busy="true" aria-live="polite">
  <span class="visually-hidden">Carregando…</span>
  <div class="skeleton" style="width:12rem;height:1rem" aria-hidden="true"></div>
  <div class="skeleton" style="width:8rem;height:1rem" aria-hidden="true"></div>
</div>`,
    inContext: `<!-- skeleton espelhando um card de conteúdo -->
<article aria-busy="true">
  <span class="visually-hidden">Carregando o card…</span>
  <div class="skeleton" data-shape="circle" style="width:3rem;height:3rem" aria-hidden="true"></div>
  <div class="skeleton" style="width:70%;height:1rem" aria-hidden="true"></div>
  <div class="skeleton" style="width:50%;height:1rem" aria-hidden="true"></div>
</article>`,
  },

  a11y: {
    role: 'nenhum próprio (decorativo); a região que carrega comunica o estado',
    keyboard: ['não focável'],
    requiredAria: [
      'região com aria-busy="true" enquanto carrega',
      'skeletons com aria-hidden="true"',
      'anunciar "carregando" uma vez (aria-live/texto oculto), não cada placeholder',
    ],
    contrastMin: 'não se aplica (elemento decorativo, sem informação textual)',
  },

  aiHints: {
    keywords: [
      'skeleton', 'esqueleto', 'placeholder', 'carregando', 'loading', 'espera',
      'shimmer', 'espelho de carregamento', 'pré-carregamento', 'pre-carregamento',
    ],
    selectionCriteria:
      'Escolha Skeleton para esperar por conteúdo cuja FORMA já se conhece, espelhando o layout final. Espera muito curta ou ação pontual: spinner. Progresso mensurável: ProgressBar.',
    disambiguation: [
      { confundeCom: 'progressbar', criterio: 'ProgressBar mostra QUANTO falta; Skeleton só ocupa o lugar do conteúdo.' },
      { confundeCom: 'spinner', criterio: 'Spinner é indicador genérico de espera; Skeleton imita a forma do conteúdo.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/skeleton',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). A camada Nephos adiciona a regra de a11y (aria-busy na região, aria-hidden nos placeholders).',
  },
};
