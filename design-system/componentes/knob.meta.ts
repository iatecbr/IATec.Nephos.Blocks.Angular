/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · knob.meta.ts — família "Campos de seleção"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-knob`. API lida do código real
 * (primeng@21.0.2, `types/primeng-knob.d.ts`).
 *
 * Controle CIRCULAR (dial) para um valor numérico numa faixa. É
 * desenhado em SVG e arrasta-se ao redor do arco; mostra o valor no
 * centro. Como o Slider, é para ajuste APROXIMADO onde o visual/relativo
 * importa (dashboard, painel de controle). Valor exato → InputNumber.
 * Saída semântica = `<input type="range">` (role slider), com rótulo.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const knobMeta: NephosComponentMeta = {
  identity: {
    id: 'knob',
    name: 'Knob',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Controle circular (dial) para escolher/mostrar um valor numérico numa faixa.',
    whenToUse: [
      'Ajuste aproximado com forte apelo visual: painel de controle, dashboard, "gauge" editável.',
      'Mostrar uma métrica dentro de uma faixa de forma compacta e redonda (com readonly).',
    ],
    whenNotToUse: [
      'Valor exato/importante — use InputNumber (ou casar o knob com um campo).',
      'Ajuste linear comum (volume, brilho) num formulário — Slider é mais convencional e previsível.',
      'Escala pequena de nota em estrelas — use Rating.',
    ],
  },

  api: {
    inputs: [
      { name: 'min', type: 'number', default: '0', description: 'Menor valor da faixa.' },
      { name: 'max', type: 'number', default: '100', description: 'Maior valor da faixa.' },
      { name: 'step', type: 'number', default: '1', description: 'Incremento a cada passo (arraste e teclado). Passo muito fino dificulta acertar pelo teclado.' },
      { name: 'size', type: 'number (px)', default: '100', description: 'Diâmetro do dial em pixels. Herda a densidade visual do painel; evitar valores minúsculos que dificultam o alvo.' },
      { name: 'strokeWidth', type: 'number', default: '14', description: 'Espessura do arco. Só estética; manter consistente entre knobs da mesma tela.' },
      { name: 'showValue', type: 'boolean', default: 'true', description: 'Mostra o número no centro do dial. Manter ligado — sem ele o valor fica ilegível.' },
      { name: 'valueTemplate', type: 'string', default: "'{value}'", description: 'Formato do texto central (ex.: "{value}%"). Bom para sufixo/unidade sem virar outro campo.' },
      { name: 'readonly', type: 'boolean', default: 'false', description: 'Só exibe o valor, sem permitir arrastar. Use para o dial virar um indicador (gauge).' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita a interação (herdado da base). Se o motivo não é óbvio, explicar no contexto.' },
      { name: 'valueColor', type: 'string (cor)', default: 'theme', description: 'Cor do arco preenchido. FIDELIDADE: deixar o TEMA definir (papel primary); não cravar hex "no olho". Ver antiPatterns.' },
      { name: 'rangeColor', type: 'string (cor)', default: 'theme', description: 'Cor do arco de fundo (trilha). FIDELIDADE: papel surface pelo tema, não hex.' },
      { name: 'textColor', type: 'string (cor)', default: 'theme', description: 'Cor do número central. FIDELIDADE: papel de texto pelo tema, não hex.' },
      { name: 'ariaLabel', type: 'string', default: '—', description: 'Nome acessível quando não há rótulo visível ligado.' },
      { name: 'ariaLabelledBy', type: 'string', default: '—', description: 'Id(s) do rótulo que nomeia o controle.' },
      { name: 'tabindex', type: 'number', default: '0', description: 'Ordem de tabulação. 0 é o padrão focável; evitar valores positivos altos.' },
    ],
    outputs: [
      { name: 'onChange', payload: 'number', description: '⭐ O valor mudou (novo número). Emitido enquanto arrasta e ao ajustar pelo teclado.' },
    ],
    slots: [],
    states: ['default', 'focus', 'dragging', 'readonly', 'disabled'],
    invalidCombinations: [
      {
        combo: 'Knob como única forma de informar um valor exato',
        porque: 'Arrastar um arco não crava um número e é trabalhoso no teclado; exclui quem precisa de precisão.',
      },
      {
        combo: 'Knob sem rótulo/nome acessível',
        porque: 'Um dial em SVG sem rótulo não é anunciado; a pessoa não sabe o que ajusta.',
      },
      {
        combo: 'valueColor/rangeColor/textColor com hex fixo',
        porque: 'Fura o modelo de cor por papel + passo e quebra o multimarca e o modo escuro.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'card', 'toolbar'],
    children: [],
    commonlyUsedWith: ['label', 'inputnumber', 'helper-text', 'text'],
    partOfPatterns: ['settings', 'filters', 'form-field'],
  },

  tokens: {
    typography: 'title-sm (do número central)',
    byState: {
      default: { range: 'surface/200', value: 'primary/color', text: 'surface/text' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Arco preenchido/valor = ênfase da marca (primary); trilha (range) = surface; texto = surface/text. As props valueColor/rangeColor/textColor devem receber o token do TEMA (papel), nunca hex. Dimensões via `size`/`strokeWidth` herdam a densidade do painel. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar Knob quando o valor precisa ser exato.',
      porque: 'Arrastar um arco não acerta um número específico e o teclado fica trabalhoso — exclui quem precisa de precisão.',
      emVezDisso: 'InputNumber, ou casar o knob com um campo numérico que reflete/edita o mesmo valor.',
    },
    {
      regra: 'Nunca cravar cor em hex nas props valueColor/rangeColor/textColor.',
      porque: 'Fura o modelo de cor por papel + passo, ignora o tema da marca ativa e quebra no modo escuro.',
      emVezDisso: 'Passar o token do tema (papel primary para o valor, surface para a trilha/texto) — deixar o tema resolver.',
    },
    {
      regra: 'Nunca deixar o Knob sem rótulo e sem valor legível.',
      porque: 'Um dial sem rótulo é inacessível; sem o número (showValue) a pessoa não sabe onde parou.',
      emVezDisso: 'Rótulo associado + `showValue` ligado, com o valor também em aria-valuenow.',
    },
  ],

  examples: {
    angular: `<label id="meta-lbl">Meta de ocupação</label>
<p-knob [(ngModel)]="meta" [min]="0" [max]="100" valueTemplate="{value}%"
  ariaLabelledBy="meta-lbl" (onChange)="salvar($event)" />

<!-- indicador (gauge) somente leitura -->
<p-knob [ngModel]="ocupacao" [readonly]="true" valueTemplate="{value}%"
  ariaLabel="Ocupação atual" />`,
    html: `<label for="meta">Meta de ocupação</label>
<input type="range" id="meta" name="meta" min="0" max="100" value="70"
       aria-describedby="meta-val" />
<output id="meta-val" for="meta">70%</output>`,
    inContext: `<!-- knob de ajuste com campo numérico espelhando o valor (preciso e acessível) -->
<div data-block="form-field">
  <label for="limite">Limite de cota (%)</label>
  <input type="range" id="limite" min="0" max="100" value="50"
         aria-describedby="limite-val" />
  <output id="limite-val" for="limite">50%</output>
</div>`,
  },

  a11y: {
    role: 'slider (dial); somente-leitura = img/valor de texto',
    keyboard: [
      'Tab foca o dial; setas ajustam pelo step',
      'Home/End vão ao mínimo/máximo',
      'readonly não é ajustável',
    ],
    requiredAria: [
      'nome acessível por rótulo associado (ou aria-label)',
      'aria-valuenow, aria-valuemin, aria-valuemax refletindo o estado',
      'valor visível em texto além do dial (showValue)',
    ],
    contrastMin: '3:1 do arco preenchido sobre a trilha; 4.5:1 do número central; foco visível',
  },

  aiHints: {
    keywords: [
      'knob', 'dial', 'controle circular', 'botão giratório', 'botao giratorio', 'gauge',
      'medidor circular', 'ajuste circular', 'valor numérico circular', 'valor numerico circular',
      'painel de controle', 'porcentagem circular', 'mostrador',
    ],
    selectionCriteria:
      'Escolha Knob para ajuste APROXIMADO numa faixa com forte apelo visual (painel/dashboard), ou para MOSTRAR uma métrica compacta (readonly). Valor exato = InputNumber. Ajuste linear comum = Slider. Nota curta em estrelas = Rating.',
    disambiguation: [
      { confundeCom: 'slider', criterio: 'Ambos são ajuste aproximado; Slider é linear (mais convencional em formulário), Knob é circular (mais visual, painel).' },
      { confundeCom: 'inputnumber', criterio: 'InputNumber é o valor exato digitado; Knob é ajuste aproximado arrastando o dial.' },
      { confundeCom: 'progressbar', criterio: 'ProgressBar apenas MOSTRA progresso (não editável); Knob editável é entrada do usuário (readonly=indicador).' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/knob',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída semântica aproxima `<input type="range">` (role slider). ATENÇÃO: props de cor (valueColor/rangeColor/textColor) devem receber o token do tema por papel, não hex. Variante linear em `slider.meta.ts`.',
  },
};
