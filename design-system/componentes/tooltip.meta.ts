/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · tooltip.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → diretiva `[pTooltip]`. API lida do código real
 * (primeng@21.0.2, `types/primeng-tooltip.d.ts`).
 *
 * Dica curta que aparece ao passar o mouse/foco sobre um elemento. É
 * uma diretiva aplicada num alvo focável — NÃO cria um `p-tooltip`. O
 * conteúdo do tooltip é SEMPRE informação COMPLEMENTAR, nunca essencial.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const tooltipMeta: NephosComponentMeta = {
  identity: {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Dica curta que aparece ao focar/passar o mouse sobre um elemento.',
    whenToUse: [
      'Explicar o que faz um botão só de ícone (complementando o aria-label).',
      'Dar um detalhe curto e opcional sobre um controle já rotulado.',
    ],
    whenNotToUse: [
      'Informação essencial que a pessoa PRECISA para agir — deixar visível no texto.',
      'Conteúdo longo, rico ou interativo — use Popover.',
      'Ajuda permanente de um campo — use Helper text.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'pTooltip (content)',
        type: 'string',
        default: '(obrigatório)',
        description: 'O texto da dica. Curto e complementar — nunca a única fonte de uma informação necessária.',
      },
      {
        name: 'tooltipPosition',
        type: "'top' | 'bottom' | 'left' | 'right'",
        default: 'top',
        description: 'De que lado a dica aparece em relação ao alvo. Evitar posições que saem da tela em mobile.',
      },
      {
        name: 'tooltipEvent',
        type: "'hover' | 'focus' | 'both'",
        default: 'hover',
        description: 'O gatilho. Preferir `both` para também aparecer no foco por teclado (só hover exclui quem navega por teclado).',
      },
      {
        name: 'showDelay',
        type: 'number (ms)',
        default: '—',
        description: 'Atraso antes de mostrar. Um pequeno atraso evita dicas piscando ao passar o mouse de leve.',
      },
      {
        name: 'hideOnEscape',
        type: 'boolean',
        default: 'true',
        description: 'Esc fecha a dica. Manter ligado (requisito de acessibilidade WCAG 1.4.13).',
      },
      {
        name: 'escape',
        type: 'boolean',
        default: 'true',
        description: 'Trata o conteúdo como texto (escapa HTML). Manter true — não injetar HTML na dica.',
      },
    ],
    outputs: [],
    slots: [],
    states: ['hidden', 'visible'],
    invalidCombinations: [
      {
        combo: 'informação essencial só dentro do tooltip',
        porque: 'A dica é efêmera e não aparece em toque/teclado de forma confiável — quem precisa da informação pode nunca vê-la.',
      },
      {
        combo: 'tooltipEvent="hover" sozinho em alvo interativo',
        porque: 'Exclui quem navega por teclado e quem usa toque — a dica nunca dispara para essas pessoas.',
      },
      {
        combo: 'tooltip como único rótulo de um botão de ícone',
        porque: 'Se o leitor de tela não recebe o texto (falta aria-label), o botão fica sem nome. O tooltip complementa, não substitui o aria-label.',
      },
    ],
  },

  relationships: {
    parents: ['button', 'icon', 'inputtext', 'tag'],
    children: [],
    commonlyUsedWith: ['button', 'icon'],
    partOfPatterns: ['icon-button', 'toolbar', 'form-field'],
  },

  tokens: {
    typography: 'caption',
    byState: {
      visible: { background: 'surface/700', text: 'surface/0' },
    },
    note: 'Fundo escuro de contraste + texto claro (tokens de tooltip do PrimeNG). Raio/padding/sombra herdam do PrimeNG. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca colocar informação essencial só no tooltip.',
      porque: 'É efêmero e não chega de forma confiável em toque/teclado.',
      emVezDisso: 'Deixar o essencial visível (texto/rótulo); o tooltip só para o detalhe opcional.',
    },
    {
      regra: 'Nunca disparar só no hover em elemento interativo.',
      porque: 'Exclui teclado e toque.',
      emVezDisso: 'tooltipEvent="both" (hover + foco); garantir que Esc fecha.',
    },
    {
      regra: 'Nunca usar tooltip como substituto do nome acessível.',
      porque: 'Botão de ícone sem aria-label fica sem nome para o leitor de tela.',
      emVezDisso: 'aria-label no controle + tooltip como reforço visual do mesmo texto.',
    },
  ],

  examples: {
    angular: `<button pButton pTooltip="Exportar para Excel" tooltipEvent="both"
        aria-label="Exportar para Excel">
  <i class="fa-solid fa-file-excel" aria-hidden="true"></i>
</button>`,
    html: `<!-- o nome acessível vive no aria-label; a dica só reforça visualmente -->
<button type="button" aria-label="Exportar para Excel"
        aria-describedby="tt-export">
  <span aria-hidden="true">⇩</span>
</button>
<span role="tooltip" id="tt-export" hidden>Exportar para Excel</span>`,
    inContext: `<!-- ícone de informação numa métrica, com a dica de fórmula -->
<span>Cota atingida
  <button type="button" aria-label="Como a cota é calculada"
          aria-describedby="tt-cota">ⓘ</button>
</span>
<span role="tooltip" id="tt-cota" hidden>Integrais + parciais ÷ 2</span>`,
  },

  a11y: {
    role: 'tooltip',
    keyboard: ['aparece no foco (tooltipEvent both/focus)', 'Esc fecha', 'permanece enquanto o alvo tem foco'],
    requiredAria: [
      'alvo com aria-describedby apontando para a dica (informação complementar)',
      'não substitui aria-label — botão de ícone ainda precisa do próprio nome',
      'dispensável e persistente conforme WCAG 1.4.13 (Esc fecha; não some sozinho ao mover o mouse por cima)',
    ],
    contrastMin: '4.5:1 do texto da dica sobre o fundo do tooltip',
  },

  aiHints: {
    keywords: [
      'tooltip', 'dica', 'tooltip de ajuda', 'ao passar o mouse', 'hover', 'balão',
      'balao', 'explicação curta', 'explicacao curta', 'ⓘ', 'info',
    ],
    selectionCriteria:
      'Escolha Tooltip para uma dica CURTA e COMPLEMENTAR num alvo já rotulado (ex.: reforçar o que um botão de ícone faz). Informação essencial fica visível; conteúdo rico/interativo = Popover; ajuda de campo = Helper text.',
    disambiguation: [
      { confundeCom: 'popover', criterio: 'Popover comporta conteúdo rico/interativo e fica aberto; Tooltip é texto curto efêmero.' },
      { confundeCom: 'helper-text', criterio: 'Helper text é ajuda PERMANENTE e visível do campo; Tooltip aparece sob demanda.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/tooltip',
    deltaFromPrimeng: 'Nenhum — diretiva `[pTooltip]` usada direto (origin: primeng). A camada Nephos reforça a a11y (tooltipEvent both, Esc, aria-describedby não substitui aria-label).',
  },
};
