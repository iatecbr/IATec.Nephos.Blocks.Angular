/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · radiobutton.meta.ts — controle de formulário (escolha única)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → usado direto do PrimeNG (p-radiobutton).
 * Vive sempre EM GRUPO (mesmo `name`): escolher UMA entre exclusivas.
 * Saída do Moses = HTML semântico: `<input type="radio">` + `<label>`,
 * o grupo dentro de um `<fieldset>` com `<legend>`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const radioButtonMeta: NephosComponentMeta = {
  identity: {
    id: 'radiobutton',
    name: 'RadioButton',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Botão redondo de escolha ÚNICA dentro de um grupo de opções mutuamente exclusivas.',
    whenToUse: [
      'Escolher UMA opção entre poucas (2 a 5) que ficam todas à vista.',
      'Quando comparar as opções lado a lado ajuda a decidir.',
    ],
    whenNotToUse: [
      'Muitas opções — use Select para economizar espaço.',
      'Marcar VÁRIAS — use Checkbox.',
      'Uma escolha entre 2 estados com efeito imediato — considere ToggleSwitch/SelectButton.',
    ],
  },

  api: {
    inputs: [
      { name: 'value', type: 'any', default: '—', description: 'O valor desta opção.' },
      { name: 'name', type: 'string', default: '—', description: 'Nome do GRUPO. Radios com o mesmo `name` são mutuamente exclusivos — obrigatório para funcionar.' },
      { name: 'size', type: "'small' | 'large'", default: '(normal)', description: 'Densidade.' },
      { name: 'invalid', type: 'boolean', default: 'false', description: 'Marca o grupo como inválido (nenhuma escolha feita e é obrigatório). Anda com a mensagem e o aria.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita esta opção. Se o motivo não é óbvio, explicar no contexto.' },
    ],
    outputs: [
      { name: 'onClick', payload: '{ value }', description: 'Emitido ao escolher esta opção.' },
    ],
    slots: [],
    states: ['default', 'hover', 'focus', 'selected', 'invalid', 'disabled'],
    invalidCombinations: [
      { combo: 'radios sem o mesmo `name`', porque: 'Sem o `name` compartilhado eles deixam de ser exclusivos e a pessoa consegue marcar vários.' },
      { combo: 'um único RadioButton sozinho', porque: 'Radio só faz sentido em grupo; um sozinho não pode ser desmarcado e vira uma armadilha.' },
    ],
  },

  relationships: {
    parents: ['form-field', 'fieldset'],
    children: [],
    commonlyUsedWith: ['radiobutton'],
    partOfPatterns: ['single-choice', 'survey'],
  },

  tokens: {
    byState: {
      default: { border: 'surface/300', background: 'surface/0' },
      selected: { border: 'primary/500', dot: 'primary/500' },
      hover: { border: 'surface/400' },
      focus: { ring: 'focus/ring' },
      invalid: { border: 'feedback.danger/500' },
    },
    note: 'Tamanho do círculo e do ponto herdam do PrimeNG. Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar RadioButton para marcar várias opções.',
      porque: 'Radio é escolha única; sugerir múltipla quebra a expectativa.',
      emVezDisso: 'Checkbox, que permite marcar várias independentes.',
    },
    {
      regra: 'Nunca montar um grupo de radios sem o mesmo `name` e um rótulo de grupo.',
      porque: 'Sem `name` eles não são exclusivos; sem legenda o leitor de tela não diz do que é a escolha.',
      emVezDisso: 'Envolver o grupo num `<fieldset>` com `<legend>` e usar o mesmo `name` em todas as opções.',
    },
    {
      regra: 'Nunca usar radios para mais de ~5 opções.',
      porque: 'A lista fica longa e cansativa de varrer.',
      emVezDisso: 'Select (lista suspensa), que economiza espaço.',
    },
  ],

  examples: {
    angular: `<p-radiobutton [(ngModel)]="plano" value="mensal" name="plano" inputId="p1" />
<label for="p1">Mensal</label>`,
    html: `<input type="radio" id="p1" name="plano" value="mensal" />
<label for="p1">Mensal</label>`,
    inContext: `<fieldset data-block="form-field">
  <legend>Plano <span aria-hidden="true">*</span></legend>
  <input type="radio" id="p1" name="plano" value="mensal" aria-required="true" />
  <label for="p1">Mensal</label>
  <input type="radio" id="p2" name="plano" value="anual" />
  <label for="p2">Anual</label>
</fieldset>`,
  },

  a11y: {
    role: 'radio (dentro de radiogroup)',
    keyboard: ['setas movem e escolhem dentro do grupo', 'Tab entra/sai do grupo inteiro'],
    requiredAria: ['grupo em <fieldset> com <legend>', 'cada radio com <label for>', 'mesmo `name` no grupo'],
    contrastMin: '4.5:1 do rótulo; o círculo e o ponto perceptíveis; foco visível',
  },

  aiHints: {
    keywords: ['radio', 'radiobutton', 'botão de opção', 'botao de opcao', 'escolha única', 'escolha unica', 'opção exclusiva'],
    selectionCriteria:
      'Escolha o RadioButton para escolher UMA opção entre poucas (2 a 5) mutuamente exclusivas, todas visíveis. Muitas opções → Select. Marcar várias → Checkbox.',
    disambiguation: [
      { confundeCom: 'checkbox', criterio: 'Checkbox marca várias independentes; Radio escolhe uma só entre exclusivas.' },
      { confundeCom: 'select', criterio: 'Select esconde as opções (bom p/ muitas); Radio mostra à vista (bom p/ poucas).' },
      { confundeCom: 'selectbutton', criterio: 'SelectButton é a mesma escolha única em formato de botões segmentados — troca visual, mesma função.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/radiobutton',
    figmaNode: 'https://www.figma.com/design/mHUXdyDZ820suwIRIIlp9Z/PrimeOne-4.0.0', // grupo "radiobutton"
    storybookId: 'atoms-radiobutton',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Só a cor da marca entra pelo tema.',
  },
};
