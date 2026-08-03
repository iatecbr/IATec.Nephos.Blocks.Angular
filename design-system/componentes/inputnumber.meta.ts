/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · inputnumber.meta.ts — ONDA "FORMULÁRIO AVANÇADO"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-inputnumber`. API lida do código real
 * (primeng@21.0.2, `types/primeng-inputnumber.d.ts` + `baseinput.d.ts`).
 *
 * Campo NUMÉRICO com formatação (decimal, moeda, porcentagem via
 * suffix), separador de milhar e casas decimais controladas. Guarda um
 * NÚMERO de verdade, não texto — por isso não se usa InputText para
 * número. Saída = `<input inputmode="decimal">` com rótulo.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const inputNumberMeta: NephosComponentMeta = {
  identity: {
    id: 'inputnumber',
    name: 'InputNumber',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Campo para digitar um número, com formatação de decimal, moeda ou porcentagem.',
    whenToUse: [
      'Coletar valores numéricos: quantidade, cota, valor em reais, porcentagem.',
      'Quando o número precisa de separador de milhar, casas decimais ou símbolo de moeda.',
    ],
    whenNotToUse: [
      'Texto livre — use InputText. Data — use DatePicker.',
      'Ajuste aproximado numa faixa (volume, zoom) — use Slider.',
      'Código com máscara fixa (CPF, telefone) — use InputMask (não é "número").',
    ],
  },

  api: {
    inputs: [
      {
        name: 'mode',
        type: "'decimal' | 'currency'",
        default: 'decimal',
        description: 'Como formatar: `decimal` (número comum) ou `currency` (moeda). Porcentagem faz-se com `mode="decimal"` + `suffix="%"`.',
      },
      {
        name: 'currency',
        type: 'string (ISO, ex.: "BRL")',
        default: '—',
        description: 'A moeda quando `mode="currency"` (ex.: "BRL" para real). Combinar com `locale`.',
      },
      {
        name: 'locale',
        type: 'string (ex.: "pt-BR")',
        default: '(locale da app)',
        description: 'Local que define separadores e símbolo. pt-BR usa vírgula decimal e ponto de milhar (1.234,56).',
      },
      {
        name: 'useGrouping',
        type: 'boolean',
        default: 'true',
        description: 'Liga o separador de milhar (1.234). Desligar só em campos onde o agrupamento atrapalha (ex.: ano).',
      },
      {
        name: 'minFractionDigits / maxFractionDigits',
        type: 'number',
        default: '—',
        description: 'Casas decimais mínimas/máximas. Ex.: valor em reais = 2 e 2; quantidade inteira = 0 e 0.',
      },
      {
        name: 'prefix / suffix',
        type: 'string',
        default: '—',
        description: 'Texto fixo antes/depois do número (ex.: `suffix=" %"`, `prefix="R$ "` se não usar mode currency).',
      },
      {
        name: 'min / max',
        type: 'number',
        default: '—',
        description: 'Limites do valor (herdados da base). Refletir também em aria-valuemin/max quando houver botões.',
      },
      {
        name: 'step',
        type: 'number',
        default: '1',
        description: 'Incremento dos botões +/− e das setas do teclado.',
      },
      {
        name: 'showButtons',
        type: 'boolean',
        default: 'false',
        description: 'Mostra os botões de aumentar/diminuir. `buttonLayout` controla a disposição (stacked/horizontal).',
      },
      {
        name: 'allowEmpty',
        type: 'boolean',
        default: 'true',
        description: 'Permite o campo ficar vazio (null). Desligar quando 0 é obrigatório e diferente de "vazio".',
      },
      {
        name: 'variant / size / fluid',
        type: "'outlined'|'filled' · 'small'|'large' · boolean",
        default: 'outlined',
        description: 'Aparência do campo (herdados da base). Manter o mesmo variant em todos os campos do formulário; `fluid` para 100% da largura.',
      },
      {
        name: 'invalid',
        type: 'boolean',
        default: 'false',
        description: 'Marca o campo como inválido (borda de erro). Anda junto com a mensagem de erro e aria-invalid.',
      },
    ],
    outputs: [
      { name: 'onInput', payload: '{ originalEvent, value }', description: 'Emitido a cada mudança do valor numérico.' },
      { name: 'onBlur', payload: 'Event', description: 'Ao sair do campo — bom momento para validar.' },
      { name: 'onClear', payload: 'void', description: 'Ao limpar (showClear).' },
      { name: 'onFocus', payload: 'Event', description: 'Ao focar o campo.' },
    ],
    slots: [],
    states: ['default', 'hover', 'focus', 'filled', 'invalid', 'disabled', 'readonly'],
    invalidCombinations: [
      {
        combo: 'InputNumber sem `<label>` associado',
        porque: 'O leitor de tela não anuncia o campo; o placeholder some ao digitar e não é rótulo.',
      },
      {
        combo: 'mode="currency" sem `currency` (e sem locale coerente)',
        porque: 'Sem a moeda/local, o símbolo e os separadores ficam errados ou ausentes.',
      },
      {
        combo: 'usar InputNumber com máscara fixa (CPF, telefone)',
        porque: 'Esses são cadeias formatadas, não números — use InputMask; InputNumber trataria os zeros/pontuação errado.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'floatlabel', 'inputgroup'],
    children: [],
    commonlyUsedWith: ['label', 'helper-text', 'button', 'slider'],
    partOfPatterns: ['form-submission', 'filters', 'form-field'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      default: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      hover: { border: 'surface/400' },
      focus: { border: 'primary/color', ring: 'focus/ring' },
      invalid: { border: 'feedback.danger/500' },
    },
    note: 'Herda os tokens de formulário do PrimeNG (formField.*); os botões +/− herdam do Button. Cor por papel + passo, nunca hex.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar InputText para número/moeda/porcentagem.',
      porque: 'Perde a formatação, o teclado numérico e a validação; guarda texto em vez de número.',
      emVezDisso: 'InputNumber (mode/currency/suffix conforme o dado).',
    },
    {
      regra: 'Nunca deixar o campo sem rótulo associado.',
      porque: 'Inacessível sem `<label>`; o placeholder some ao digitar.',
      emVezDisso: '`<label for>` visível (ou FloatLabel); placeholder só como exemplo do formato.',
    },
    {
      regra: 'Nunca sinalizar erro (ex.: fora do min/max) só pela cor.',
      porque: 'Cor sozinha não é percebida por todos e não diz o que corrigir.',
      emVezDisso: 'Mensagem de texto ligada por aria-describedby + aria-invalid; e comunicar os limites antes do erro.',
    },
    {
      regra: 'Nunca misturar formatos de número entre campos equivalentes.',
      porque: 'Um campo mostrando "1234.5" e outro "1.234,50" confunde e sugere dados diferentes.',
      emVezDisso: 'Mesmo `locale`/casas decimais para valores do mesmo tipo.',
    },
  ],

  examples: {
    angular: `<label for="valor">Valor da mensalidade</label>
<p-inputnumber inputId="valor" [(ngModel)]="valor" mode="currency" currency="BRL"
  locale="pt-BR" [minFractionDigits]="2" [fluid]="true" />

<!-- porcentagem -->
<p-inputnumber inputId="desc" [(ngModel)]="desconto" suffix=" %"
  [min]="0" [max]="100" [showButtons]="true" />`,
    html: `<label for="valor">Valor da mensalidade</label>
<input id="valor" name="valor" type="text" inputmode="decimal"
       aria-describedby="valor-ajuda" value="R$ 1.250,00" />
<small id="valor-ajuda">Em reais.</small>`,
    inContext: `<!-- cota de bolsas integrais: número inteiro, com limites e ajuda -->
<div data-block="form-field">
  <label for="integrais">Bolsas integrais <span aria-hidden="true">*</span></label>
  <input id="integrais" name="integrais" type="text" inputmode="numeric"
         aria-required="true" aria-describedby="integrais-ajuda"
         aria-valuemin="0" aria-valuemax="620" />
  <small id="integrais-ajuda">Entre 0 e 620 (teto do campo).</small>
</div>`,
  },

  a11y: {
    role: 'spinbutton (com botões) ou textbox numérico',
    keyboard: [
      'digitação numérica; setas ↑/↓ ajustam pelo step',
      'Home/End vão ao mínimo/máximo quando definidos',
      'Tab entra e sai',
    ],
    requiredAria: [
      'sempre um `<label for>` associado',
      'com botões: aria-valuenow/valuemin/valuemax refletindo o estado',
      'aria-required quando obrigatório; aria-invalid + aria-describedby no erro',
      'inputmode numérico (numeric/decimal) para o teclado certo no celular',
    ],
    contrastMin: '4.5:1 do número e do rótulo; borda de foco visível; 3:1 dos botões +/−',
  },

  aiHints: {
    keywords: [
      'número', 'numero', 'inputnumber', 'valor', 'moeda', 'reais', 'r$', 'currency',
      'porcentagem', 'porcentagem', 'quantidade', 'decimal', 'campo numérico', 'campo numerico', 'cota',
    ],
    selectionCriteria:
      'Escolha InputNumber sempre que o dado é um NÚMERO (quantidade, moeda, porcentagem). Use mode="currency" para dinheiro e suffix="%" para porcentagem. Texto = InputText; máscara fixa = InputMask; faixa aproximada = Slider.',
    disambiguation: [
      { confundeCom: 'inputtext', criterio: 'InputText guarda texto; InputNumber guarda número (teclado, formatação e validação próprios).' },
      { confundeCom: 'inputmask', criterio: 'CPF/telefone são cadeias com máscara fixa (InputMask), não números.' },
      { confundeCom: 'slider', criterio: 'Slider é ajuste aproximado arrastando; InputNumber é o valor exato digitado.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/inputnumber',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Formatação por Intl (locale/currency); min/max/step/variant/size/fluid herdados da base. Saída = `<input inputmode>` com rótulo.',
  },
};
