/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · selectbutton.meta.ts — ONDA "FORMULÁRIO AVANÇADO"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-selectbutton`. API lida do código real
 * (primeng@21.0.2, `types/primeng-selectbutton.d.ts`).
 *
 * Escolha SEGMENTADA: 2–5 opções sempre visíveis lado a lado, como
 * botões. Escolha única (tipo rádio) ou múltipla. Ideal para trocar
 * de vista ou aplicar um filtro rápido. Saída = grupo de botões
 * (radiogroup no single, toggle buttons no multiple).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const selectButtonMeta: NephosComponentMeta = {
  identity: {
    id: 'selectbutton',
    name: 'SelectButton',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Escolha rápida entre poucas opções mostradas como botões lado a lado.',
    whenToUse: [
      '2–5 opções mutuamente exclusivas sempre visíveis (ex.: alternar grade/lista, período mês/ano).',
      'Filtro rápido de um valor único, sem esconder as opções num menu.',
    ],
    whenNotToUse: [
      'Muitas opções (>5) — use Select (menu).',
      'Opções que precisam de rótulos longos/descrição — use Radio (vertical).',
      'Ligar/desligar UM estado — use ToggleButton ou ToggleSwitch.',
    ],
  },

  api: {
    inputs: [
      { name: 'options', type: 'any[]', default: '[]', description: 'As opções (poucas). Obrigatório.' },
      { name: 'optionLabel', type: 'string', default: '—', description: 'Campo a exibir no botão (ex.: "rotulo").' },
      { name: 'optionValue', type: 'string', default: '—', description: 'Campo a guardar como valor (ex.: "valor").' },
      { name: 'optionDisabled', type: 'string', default: '—', description: 'Campo que marca uma opção como desabilitada.' },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description: 'Permite escolher várias (vira grupo de toggle buttons). Single = comportamento de rádio.',
      },
      {
        name: 'allowEmpty',
        type: 'boolean',
        default: 'true',
        description: 'Permite desmarcar a opção ativa (ficar sem seleção). Desligar quando SEMPRE precisa haver uma escolha.',
      },
      { name: 'size', type: "'small' | 'large'", default: '(normal)', description: 'Densidade dos botões.' },
      { name: 'fluid', type: 'boolean', default: 'false', description: 'Ocupa 100% da largura, dividindo igualmente entre as opções.' },
    ],
    outputs: [
      { name: 'onChange', payload: '{ originalEvent, value }', description: 'A escolha mudou.' },
      { name: 'onOptionClick', payload: '{ originalEvent, option, index }', description: 'Uma opção específica foi clicada.' },
    ],
    slots: [
      { name: 'item', accepts: 'template de cada opção (ícone + rótulo)', optional: true },
    ],
    states: ['default', 'selected', 'focus', 'disabled'],
    invalidCombinations: [
      {
        combo: 'SelectButton com muitas opções',
        porque: 'Vira uma fileira comprida que quebra o layout e cansa a leitura — isso é um Select.',
      },
      {
        combo: 'grupo sem nome acessível',
        porque: 'Sem um rótulo do grupo, o leitor de tela não diz do que é a escolha.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'toolbar', 'filters'],
    children: [],
    commonlyUsedWith: ['label', 'dataview'],
    partOfPatterns: ['filters', 'view-switch', 'form-field'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      default: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      selected: { background: 'primary/color', text: 'surface/0' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Opção ativa = ênfase da marca (primary preenchido); demais neutras. Herdam do Button/PrimeNG. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar SelectButton para mais de ~5 opções.',
      porque: 'A fileira fica longa demais e quebra o layout.',
      emVezDisso: 'Select (menu) para listas maiores.',
    },
    {
      regra: 'Nunca deixar o grupo sem nome acessível.',
      porque: 'O leitor de tela não anuncia do que é a escolha.',
      emVezDisso: 'Rótulo do grupo (aria-label / aria-labelledby); no single, role="radiogroup".',
    },
    {
      regra: 'Nunca depender só da cor para indicar a opção ativa.',
      porque: 'Quem não distingue cores não percebe qual está selecionada.',
      emVezDisso: 'Estado por aria-checked/aria-pressed além do destaque visual.',
    },
  ],

  examples: {
    angular: `<label id="modo-lbl">Exibição</label>
<p-selectbutton [(ngModel)]="layout" [options]="modos"
  optionLabel="rotulo" optionValue="valor" [allowEmpty]="false"
  ariaLabelledBy="modo-lbl" (onChange)="trocar($event)" />`,
    html: `<div role="radiogroup" aria-label="Exibição">
  <button role="radio" aria-checked="true">Grade</button>
  <button role="radio" aria-checked="false" tabindex="-1">Lista</button>
</div>`,
    inContext: `<!-- alternar visão numa DataView -->
<div data-block="view-switch">
  <span id="vs">Exibir como</span>
  <div role="radiogroup" aria-labelledby="vs">
    <button role="radio" aria-checked="true">Grade</button>
    <button role="radio" aria-checked="false" tabindex="-1">Lista</button>
  </div>
</div>`,
  },

  a11y: {
    role: 'radiogroup (single) ou group de toggle buttons (multiple)',
    keyboard: ['single: setas movem entre opções, Espaço marca', 'multiple: Tab entre botões, Espaço alterna'],
    requiredAria: [
      'nome do grupo (aria-label/labelledby)',
      'single: role="radio" + aria-checked; só a ativa é tabbable',
      'multiple: aria-pressed em cada botão',
    ],
    contrastMin: '4.5:1 do texto; 3:1 do estado ativo e do foco',
  },

  aiHints: {
    keywords: [
      'selectbutton', 'botões de seleção', 'botoes de selecao', 'segmentado', 'escolha rápida',
      'escolha rapida', 'alternar vista', 'grade lista', 'filtro rápido', 'opções em botões',
    ],
    selectionCriteria:
      'Escolha SelectButton para 2–5 opções mutuamente exclusivas sempre visíveis (troca de vista, filtro rápido). Muitas opções = Select; rótulos longos = Radio; um estado on/off = ToggleButton.',
    disambiguation: [
      { confundeCom: 'select', criterio: 'Select esconde as opções num menu (muitas); SelectButton mostra todas em botões (poucas).' },
      { confundeCom: 'radiobutton', criterio: 'Radio é vertical com rótulos/descrição; SelectButton é compacto e horizontal.' },
      { confundeCom: 'togglebutton', criterio: 'ToggleButton é UM botão liga/desliga; SelectButton escolhe entre várias opções.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/selectbutton',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída = radiogroup (single) ou toggle buttons (multiple). Escolha em menu correlata em `select.meta.ts`.',
  },
};
