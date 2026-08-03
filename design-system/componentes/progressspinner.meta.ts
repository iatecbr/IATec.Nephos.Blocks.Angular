/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · progressspinner.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-progressspinner`. API lida do código real
 * (primeng@21.0.2, `types/primeng-progressspinner.d.ts`).
 *
 * Indicador circular de espera SEM progresso mensurável (a roda que
 * gira). É SVG animado — não usa fonte de ícone, então independe do
 * set de ícones (Font Awesome).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const progressSpinnerMeta: NephosComponentMeta = {
  identity: {
    id: 'progressspinner',
    name: 'ProgressSpinner',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Roda que gira indicando espera de duração desconhecida.',
    whenToUse: [
      'Espera curta/indeterminada onde não dá para mostrar %.',
      'Carregar uma área pequena ou o resultado de uma ação pontual.',
    ],
    whenNotToUse: [
      'Progresso mensurável (%) — use ProgressBar (mode determinate).',
      'Placeholder de conteúdo cuja forma se conhece — use Skeleton.',
      'Esperas longas sem feedback do que está acontecendo — dar contexto em texto.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'strokeWidth',
        type: 'string',
        default: '"2"',
        description: 'Espessura do traço do círculo. Deixar o padrão para bater com o tema.',
      },
      {
        name: 'animationDuration',
        type: 'string',
        default: '"2s"',
        description: 'Duração de uma volta. Respeitar prefers-reduced-motion (reduzir/parar quando pedido).',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: "'loading'",
        description: 'Nome acessível do estado de carregamento. Preferir um texto que diga o que carrega (ex.: "Carregando bolsas").',
      },
      {
        name: 'fill',
        type: 'string',
        default: 'none',
        description: '⚠️ Cor de preenchimento do interior do círculo. Evitar cor arbitrária; deixar herdar do tema.',
      },
    ],
    outputs: [],
    slots: [],
    states: ['spinning'],
    invalidCombinations: [
      {
        combo: 'spinner quando existe uma % conhecida',
        porque: 'Esconde uma informação útil (o quanto falta); a espera parece maior.',
      },
      {
        combo: 'spinner sem nome acessível',
        porque: 'Quem usa leitor de tela não sabe que algo está carregando.',
      },
      {
        combo: 'spinner girando para sempre em caso de erro',
        porque: 'Parece travamento — a pessoa não sabe se ainda está processando.',
      },
    ],
  },

  relationships: {
    parents: ['button', 'card', 'dialog', 'page'],
    children: [],
    commonlyUsedWith: ['button', 'message'],
    partOfPatterns: ['loading', 'form-submission'],
  },

  tokens: {
    typography: '—',
    byState: {
      spinning: { stroke: 'primary/color' },
    },
    note: 'O traço gira usando a ênfase da marca (primary). Dimensões herdam do PrimeNG. Não usar `fill`/cor fora da paleta.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar spinner quando a % é conhecida.',
      porque: 'Esconde o andamento real; a espera parece maior e menos confiável.',
      emVezDisso: 'ProgressBar determinate com o valor atualizado.',
    },
    {
      regra: 'Nunca deixar o spinner sem nome acessível.',
      porque: 'Sem aria-label/texto, quem usa leitor de tela não percebe o carregamento.',
      emVezDisso: 'role="status" + texto "Carregando…" (visível ou oculto).',
    },
    {
      regra: 'Nunca deixar o spinner rodar indefinidamente sem saída.',
      porque: 'Vira sensação de travamento.',
      emVezDisso: 'Tempo-limite → mensagem de erro (Message) ou nova tentativa.',
    },
  ],

  examples: {
    angular: `<p-progressspinner ariaLabel="Carregando bolsas" strokeWidth="3" />`,
    html: `<!-- região de status anunciada -->
<div role="status">
  <span class="visually-hidden">Carregando…</span>
  <span class="spinner" aria-hidden="true"></span>
</div>`,
    inContext: `<!-- botão em estado de envio: spinner + texto -->
<button type="submit" aria-busy="true" disabled>
  <span class="spinner" aria-hidden="true"></span>
  Enviando…
</button>`,
  },

  a11y: {
    role: 'status (indeterminado); pode usar role="progressbar" sem aria-valuenow',
    keyboard: ['não focável (indicador de estado)'],
    requiredAria: [
      'nome acessível (aria-label) ou texto "carregando" na região',
      'em botão de envio: aria-busy no botão e desabilitar durante o processo',
      'respeitar prefers-reduced-motion',
    ],
    contrastMin: '3:1 do traço do spinner sobre o fundo',
  },

  aiHints: {
    keywords: [
      'spinner', 'loading', 'carregando', 'girando', 'aguarde', 'processando',
      'espera', 'roda', 'indicador de carregamento', 'progress spinner',
    ],
    selectionCriteria:
      'Escolha ProgressSpinner para espera curta/indeterminada sem % a mostrar. Progresso mensurável = ProgressBar; placeholder de conteúdo = Skeleton.',
    disambiguation: [
      { confundeCom: 'progressbar', criterio: 'ProgressBar mostra QUANTO falta; Spinner só indica "processando".' },
      { confundeCom: 'skeleton', criterio: 'Skeleton imita a forma do conteúdo que vem; Spinner é indicador genérico.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/progressspinner',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). É SVG animado (não usa fonte de ícone). A camada Nephos reforça a a11y (role=status, reduced-motion).',
  },
};
