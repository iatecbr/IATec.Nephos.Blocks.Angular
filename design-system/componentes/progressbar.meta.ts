/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · progressbar.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-progressbar`. API lida do código real
 * (primeng@21.0.2, `types/primeng-progressbar.d.ts`).
 *
 * Mostra o andamento de uma tarefa. `determinate` = sabe-se a % (0–100);
 * `indeterminate` = trabalho em curso de duração desconhecida. Só EXIBE
 * progresso — não é entrada do usuário (isso é o Slider).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const progressBarMeta: NephosComponentMeta = {
  identity: {
    id: 'progressbar',
    name: 'ProgressBar',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Barra que mostra o quanto de uma tarefa já foi concluído.',
    whenToUse: [
      'Progresso mensurável: upload, importação, etapa X de Y (mode determinate).',
      'Trabalho em curso sem duração conhecida (mode indeterminate).',
    ],
    whenNotToUse: [
      'Espera muito curta ou ação num botão — use um spinner.',
      'Placeholder de conteúdo que vai chegar — use Skeleton.',
      'Escolher um valor numa faixa — isso é entrada: use Slider.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'value',
        type: 'number (0–100)',
        default: '—',
        description: 'Percentual concluído. Obrigatório no mode determinate; ignorado no indeterminate.',
      },
      {
        name: 'mode',
        type: "'determinate' | 'indeterminate'",
        default: 'determinate',
        description: '`determinate` quando se sabe a %; `indeterminate` (animação contínua) quando não se sabe quanto falta.',
      },
      {
        name: 'showValue',
        type: 'boolean',
        default: 'true',
        description: 'Mostra o número da % dentro da barra. Desligar só se o valor aparece em outro lugar.',
      },
      {
        name: 'unit',
        type: 'string',
        default: "'%'",
        description: 'Sufixo do valor exibido.',
      },
      {
        name: 'color',
        type: 'string (cor)',
        default: '(tema)',
        description: '⚠️ Sobrescreve a cor da barra. Evitar: deixar herdar do tema. Se usar, só com uma cor que exista na paleta — nunca um hex arbitrário.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'content', accepts: 'conteúdo customizado dentro da barra (raro)', optional: true },
    ],
    states: ['determinate', 'indeterminate'],
    invalidCombinations: [
      {
        combo: 'mode="indeterminate" quando a % é conhecida',
        porque: 'Esconde uma informação útil (o quanto falta) e aumenta a ansiedade da espera.',
      },
      {
        combo: 'color com hex fora da paleta',
        porque: 'Quebra o tema e a fidelidade; a cor deixa de acompanhar a marca/estado.',
      },
      {
        combo: 'barra de progresso sem valor acessível',
        porque: 'Quem usa leitor de tela não sabe o andamento se não houver aria-valuenow (ou texto).',
      },
    ],
  },

  relationships: {
    parents: ['card', 'dialog', 'form-field', 'toolbar'],
    children: [],
    commonlyUsedWith: ['button', 'message', 'fileupload'],
    partOfPatterns: ['upload', 'loading', 'wizard'],
  },

  tokens: {
    typography: 'caption (do valor exibido)',
    byState: {
      determinate: { track: 'surface/200', value: 'primary/color', text: 'surface/text' },
      indeterminate: { track: 'surface/200', value: 'primary/color' },
    },
    note: 'Preenchimento = ênfase da marca (primary); trilha = surface. Altura/raio herdam do PrimeNG. Cor por papel + passo — não usar o input `color` com hex.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar indeterminate quando a % é conhecida.',
      porque: 'Esconde o andamento real e faz a espera parecer maior.',
      emVezDisso: 'mode="determinate" com o value atualizado.',
    },
    {
      regra: 'Nunca deixar a barra sem valor acessível.',
      porque: 'Sem aria-valuenow/texto, quem usa leitor de tela não sabe o progresso.',
      emVezDisso: 'role="progressbar" + aria-valuenow/min/max (determinate) ou texto "processando…" (indeterminate).',
    },
    {
      regra: 'Nunca injetar cor arbitrária pelo input `color`.',
      porque: 'Quebra o tema; a cor deixa de significar (a marca/estado).',
      emVezDisso: 'Herdar a cor do tema; se precisar de outra, usar uma cor da paleta por papel.',
    },
  ],

  examples: {
    angular: `<p-progressbar [value]="progresso" />
<p-progressbar mode="indeterminate" [style]="{ height: '6px' }" />`,
    html: `<!-- determinate: valor acessível -->
<div role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
  <div class="bar" style="width:60%"></div>
  <span>60%</span>
</div>`,
    inContext: `<!-- upload de arquivo com progresso -->
<div data-block="upload">
  <span id="up-lbl">Enviando relatorio.pdf…</span>
  <div role="progressbar" aria-labelledby="up-lbl"
       aria-valuenow="42" aria-valuemin="0" aria-valuemax="100">
    <div class="bar" style="width:42%"></div>
    <span>42%</span>
  </div>
</div>`,
  },

  a11y: {
    role: 'progressbar',
    keyboard: ['não focável (elemento de status)'],
    requiredAria: [
      'determinate: aria-valuenow, aria-valuemin, aria-valuemax',
      'indeterminate: sem valuenow; um rótulo/texto indicando trabalho em curso',
      'nome acessível (aria-label/labelledby) dizendo do que é o progresso',
    ],
    contrastMin: '3:1 do preenchimento sobre a trilha; 4.5:1 do texto de %',
  },

  aiHints: {
    keywords: [
      'progress', 'progresso', 'barra de progresso', 'andamento', 'upload', 'carregando',
      'porcentagem', 'porcentagem concluída', 'etapa', 'processando', 'importando',
    ],
    selectionCriteria:
      'Escolha ProgressBar para MOSTRAR o andamento de uma tarefa: determinate quando sabe a %, indeterminate quando não. Placeholder de conteúdo = Skeleton; espera curta = spinner; entrada de valor = Slider.',
    disambiguation: [
      { confundeCom: 'slider', criterio: 'Slider é entrada (usuário escolhe); ProgressBar só mostra (não editável).' },
      { confundeCom: 'skeleton', criterio: 'Skeleton imita a forma do conteúdo; ProgressBar quantifica o andamento.' },
      { confundeCom: 'spinner', criterio: 'Spinner = espera curta/genérica; ProgressBar = tarefa com andamento a mostrar.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/progressbar',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). A camada Nephos reforça a a11y (aria-value*) e proíbe o input `color` com hex fora da paleta.',
  },
};
