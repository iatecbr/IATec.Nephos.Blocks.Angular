/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · checkbox.meta.ts — controle de formulário (caixa de marcar)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → usado direto do PrimeNG (p-checkbox).
 * Saída do Moses = HTML semântico: `<input type="checkbox">` + `<label>`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const checkboxMeta: NephosComponentMeta = {
  identity: {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Caixa que a pessoa marca ou desmarca — para opções independentes ou um sim/não.',
    whenToUse: [
      'Aceitar um termo, ativar uma preferência (um sim/não isolado).',
      'Marcar VÁRIAS opções independentes de uma lista (cada uma liga sozinha).',
    ],
    whenNotToUse: [
      'Escolher UMA entre opções mutuamente exclusivas — use RadioButton.',
      'Ligar/desligar um recurso com efeito imediato — considere ToggleSwitch.',
    ],
  },

  api: {
    inputs: [
      { name: 'binary', type: 'boolean', default: 'false', description: 'Modo sim/não isolado (marcado = true). Para uma caixa sozinha.' },
      { name: 'value', type: 'any', default: '—', description: 'Valor desta caixa quando várias compartilham o mesmo grupo/lista.' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Estado "parcial" (ex.: pai de uma lista com alguns filhos marcados). Visual só — não é um terceiro valor real.' },
      { name: 'size', type: "'small' | 'large'", default: '(normal)', description: 'Densidade.' },
      { name: 'invalid', type: 'boolean', default: 'false', description: 'Marca como inválido (ex.: termo obrigatório não aceito). Anda com a mensagem e o aria-invalid.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita. Se o motivo não é óbvio, explicar no contexto.' },
    ],
    outputs: [
      { name: 'onChange', payload: '{ checked }', description: 'Emitido ao marcar/desmarcar.' },
    ],
    slots: [],
    states: ['default', 'hover', 'focus', 'checked', 'indeterminate', 'invalid', 'disabled'],
    invalidCombinations: [
      { combo: 'binary=true + value', porque: 'Modo sim/não isolado não usa `value` de grupo; os dois juntos são ambíguos.' },
      { combo: 'checkbox sem <label> clicável', porque: 'A área de clique fica minúscula e o leitor de tela não anuncia o que a caixa significa.' },
    ],
  },

  relationships: {
    parents: ['form-field', 'list', 'datatable'],
    children: [],
    commonlyUsedWith: ['checkbox', 'button'],
    partOfPatterns: ['terms-acceptance', 'multi-select-list', 'row-selection'],
  },

  tokens: {
    byState: {
      default: { border: 'surface/300', background: 'surface/0' },
      checked: { background: 'primary/500', mark: 'primary/contrast' },
      hover: { border: 'surface/400' },
      focus: { ring: 'focus/ring' },
      invalid: { border: 'feedback.danger/500' },
    },
    note: 'Tamanho da caixa e do "tique" herdam do PrimeNG. Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar Checkbox para opções mutuamente exclusivas.',
      porque: 'Sugere que dá para marcar várias, quando só uma deveria valer.',
      emVezDisso: 'RadioButton, que comunica "escolha uma só".',
    },
    {
      regra: 'Nunca deixar a caixa sem um `<label>` clicável associado.',
      porque: 'A área de clique fica minúscula e o leitor de tela não sabe o que a caixa representa.',
      emVezDisso: 'Um `<label for>` com o texto ao lado, clicável junto com a caixa.',
    },
    {
      regra: 'Nunca usar o estado indeterminado como um terceiro valor de dado.',
      porque: 'Ele é só um sinal visual de "alguns filhos marcados"; guardar como valor confunde a lógica.',
      emVezDisso: 'Guardar o valor real (marcado/desmarcado) e calcular o indeterminado a partir dos filhos.',
    },
  ],

  examples: {
    angular: `<p-checkbox [(ngModel)]="aceito" [binary]="true" inputId="termos" />
<label for="termos">Aceito os termos</label>`,
    html: `<input type="checkbox" id="termos" name="termos" />
<label for="termos">Aceito os termos</label>`,
    inContext: `<div data-block="form-field">
  <input type="checkbox" id="termos" name="termos" aria-required="true" aria-invalid="true" aria-describedby="termos-erro" />
  <label for="termos">Li e aceito os termos <span aria-hidden="true">*</span></label>
  <small id="termos-erro" data-variant="danger">É preciso aceitar para continuar.</small>
</div>`,
  },

  a11y: {
    role: 'checkbox',
    keyboard: ['Space marca/desmarca', 'Tab entra e sai'],
    requiredAria: ['sempre um <label for>', 'aria-checked (inclui "mixed" no indeterminado)', 'aria-required quando obrigatório'],
    contrastMin: '4.5:1 do rótulo; a caixa e o tique perceptíveis; foco visível',
  },

  aiHints: {
    keywords: ['checkbox', 'caixa de marcar', 'marcar', 'aceitar', 'termos', 'seleção múltipla', 'selecao multipla', 'opções'],
    selectionCriteria:
      'Escolha o Checkbox para um sim/não isolado (aceitar termo, ativar preferência) ou para marcar VÁRIAS opções independentes. Se é escolher UMA entre exclusivas, use RadioButton.',
    disambiguation: [
      { confundeCom: 'radiobutton', criterio: 'RadioButton = uma só entre exclusivas; Checkbox = várias independentes ou um sim/não.' },
      { confundeCom: 'toggleswitch', criterio: 'ToggleSwitch sugere efeito imediato (liga/desliga um recurso); Checkbox costuma confirmar depois (no submit).' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/checkbox',
    figmaNode: 'https://www.figma.com/design/mHUXdyDZ820suwIRIIlp9Z/PrimeOne-4.0.0', // grupo "checkbox"
    storybookId: 'atoms-checkbox',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Só a cor da marca entra pelo tema.',
  },
};
