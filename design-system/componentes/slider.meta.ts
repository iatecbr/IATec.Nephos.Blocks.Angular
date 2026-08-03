/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · slider.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-slider`. API lida do código real
 * (primeng@21.0.2, `types/primeng-slider.d.ts`).
 *
 * Regra de ouro do slider: é para valor APROXIMADO onde o relativo
 * importa mais que o exato. Se o número precisa ser preciso, casar com
 * um campo numérico (ou usar InputNumber). Ver antiPatterns/a11y.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const sliderMeta: NephosComponentMeta = {
  identity: {
    id: 'slider',
    name: 'Slider',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Controle deslizante para escolher um valor dentro de uma faixa.',
    whenToUse: [
      'Ajuste aproximado onde o relativo importa: volume, zoom, brilho, opacidade.',
      'Escolher uma faixa (dois valores) com range=true.',
    ],
    whenNotToUse: [
      'Valor numérico exato/importante — use InputNumber (ou casar o slider com um campo).',
      'Poucas opções discretas nomeadas — use Radio/Select.',
    ],
  },

  api: {
    inputs: [
      { name: 'min', type: 'number', default: '0', description: 'Menor valor da faixa.' },
      { name: 'max', type: 'number', default: '100', description: 'Maior valor da faixa.' },
      { name: 'step', type: 'number', default: '1', description: 'Incremento a cada passo. Passo muito fino dificulta o uso por teclado.' },
      { name: 'range', type: 'boolean', default: 'false', description: 'Dois manípulos para selecionar uma faixa (início e fim) em vez de um valor único.' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: 'horizontal', description: 'Direção do controle. Vertical exige altura definida no contêiner.' },
      { name: 'animate', type: 'boolean', default: 'false', description: 'Anima o preenchimento ao clicar na trilha. Respeitar prefers-reduced-motion.' },
      { name: 'ariaLabel', type: 'string', default: '—', description: 'Nome acessível quando não há rótulo visível ligado.' },
    ],
    outputs: [
      { name: 'onChange', payload: '{ event, value }', description: 'Emitido continuamente enquanto arrasta.' },
      { name: 'onSlideEnd', payload: '{ originalEvent, value }', description: 'Emitido ao soltar — melhor ponto para gravar o valor final.' },
    ],
    slots: [],
    states: ['default', 'focus', 'dragging', 'disabled'],
    invalidCombinations: [
      {
        combo: 'slider como única forma de informar um valor exato',
        porque: 'Arrastar não acerta um número específico com precisão nem é confortável no teclado; exclui quem precisa do valor cravado.',
      },
      {
        combo: 'orientation="vertical" sem altura no contêiner',
        porque: 'O slider vertical colapsa sem uma altura definida.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'toolbar'],
    children: [],
    commonlyUsedWith: ['label', 'inputnumber', 'helper-text'],
    partOfPatterns: ['filters', 'settings', 'form-field'],
  },

  tokens: {
    typography: 'body-sm (do valor/rótulo)',
    byState: {
      default: { track: 'surface/200', range: 'primary/color', handle: 'primary/color' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Preenchimento e manípulo = ênfase da marca (primary); trilha = surface. Dimensões herdam do PrimeNG. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar slider quando o valor precisa ser exato.',
      porque: 'Arrastar não crava um número e o teclado fica trabalhoso — exclui quem precisa de precisão.',
      emVezDisso: 'InputNumber, ou casar o slider com um campo numérico que reflete/edita o mesmo valor.',
    },
    {
      regra: 'Nunca deixar o slider sem rótulo e sem valor visível.',
      porque: 'Sem rótulo é inacessível; sem o valor mostrado a pessoa não sabe onde parou.',
      emVezDisso: 'Rótulo associado + o valor atual exibido ao lado (e refletido em aria-valuenow).',
    },
    {
      regra: 'Nunca usar step minúsculo numa faixa enorme.',
      porque: 'Cada seta do teclado anda quase nada — chegar ao valor vira suplício.',
      emVezDisso: 'Um step proporcional à faixa (e um campo numérico para o ajuste fino).',
    },
  ],

  examples: {
    angular: `<label id="vol-lbl">Volume</label>
<p-slider [(ngModel)]="volume" [min]="0" [max]="100" ariaLabelledBy="vol-lbl" (onSlideEnd)="salvar($event)" />`,
    html: `<label for="vol">Volume</label>
<input type="range" id="vol" name="vol" min="0" max="100" value="60" />`,
    inContext: `<!-- slider + campo numérico espelhando o valor (acessível e preciso) -->
<div data-block="form-field">
  <label for="brilho">Brilho</label>
  <input type="range" id="brilho" min="0" max="100" value="70"
         aria-describedby="brilho-val" />
  <output id="brilho-val" for="brilho">70%</output>
</div>`,
  },

  a11y: {
    role: 'slider',
    keyboard: ['Tab foca', 'Setas ajustam pelo step', 'Home/End vão ao mínimo/máximo', 'PageUp/PageDown em saltos maiores'],
    requiredAria: [
      'aria-valuenow, aria-valuemin, aria-valuemax refletindo o estado',
      'nome acessível por rótulo associado (ou aria-label)',
      'mostrar o valor atual em texto além do controle',
    ],
    contrastMin: '3:1 do manípulo e do preenchimento sobre a trilha/fundo',
  },

  aiHints: {
    keywords: [
      'slider', 'deslizante', 'faixa', 'range', 'volume', 'zoom', 'brilho',
      'opacidade', 'intervalo', 'ajuste', 'controle deslizante', 'barra de ajuste',
    ],
    selectionCriteria:
      'Escolha Slider para valor aproximado numa faixa contínua onde o relativo importa. Se o número exato importa, use InputNumber ou combine slider + campo. Opções discretas nomeadas: Radio/Select.',
    disambiguation: [
      { confundeCom: 'inputnumber', criterio: 'InputNumber = valor exato digitado; Slider = ajuste aproximado arrastando.' },
      { confundeCom: 'progressbar', criterio: 'ProgressBar apenas MOSTRA progresso (não editável); Slider é entrada do usuário.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/slider',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída semântica aproxima `<input type="range">`; só a cor da marca entra pelo tema.',
  },
};
