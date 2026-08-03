/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · inputmask.meta.ts — ONDA "FORMULÁRIO AVANÇADO"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-inputmask`. API lida do código real
 * (primeng@21.0.2, `types/primeng-inputmask.d.ts`).
 *
 * Campo de texto com FORMATO FIXO guiado por máscara: CPF, CNPJ,
 * telefone, CEP, data digitada. Guarda uma CADEIA formatada — não é
 * número (isso é InputNumber). Saída = `<input inputmode>` com rótulo
 * e o formato à vista.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const inputMaskMeta: NephosComponentMeta = {
  identity: {
    id: 'inputmask',
    name: 'InputMask',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Campo de texto com formato fixo guiado por máscara (CPF, telefone, CEP).',
    whenToUse: [
      'Dados com formato conhecido e pontuação: CPF, CNPJ, telefone, CEP, data como texto.',
      'Ajudar a digitar no formato certo, mostrando a estrutura enquanto preenche.',
    ],
    whenNotToUse: [
      'Número/moeda/porcentagem — use InputNumber (é número, não cadeia).',
      'Texto livre sem formato — use InputText.',
      'Data com calendário — use DatePicker.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'mask',
        type: 'string',
        default: '(obrigatório)',
        description: 'O padrão. `9` = dígito, `a` = letra, `*` = alfanumérico. Ex.: CPF "999.999.999-99", telefone "(99) 99999-9999", CEP "99999-999".',
      },
      {
        name: 'slotChar',
        type: 'string',
        default: '_',
        description: 'Caractere que marca as posições a preencher (ex.: "_"). Ajuda a ver o formato.',
      },
      {
        name: 'unmask',
        type: 'boolean',
        default: 'false',
        description: 'Se true, o valor guardado vem SEM a pontuação (só os dígitos) — útil para salvar/validar. false guarda com a máscara.',
      },
      {
        name: 'autoClear',
        type: 'boolean',
        default: 'true',
        description: 'Limpa o campo ao sair se o valor ficou incompleto. Combinar com validação clara.',
      },
      {
        name: 'showClear',
        type: 'boolean',
        default: 'false',
        description: 'Botão "x" para limpar (com aria-label).',
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        description: 'Mostra o valor sem permitir editar.',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: '—',
        description: 'Exemplo/instrução. NÃO substitui o rótulo; bom para mostrar o formato esperado.',
      },
    ],
    outputs: [
      { name: 'onComplete', payload: 'void', description: 'A máscara foi totalmente preenchida — bom ponto para validar/avançar.' },
      { name: 'onInput', payload: 'Event', description: 'A cada digitação.' },
      { name: 'onBlur', payload: 'Event', description: 'Ao sair do campo.' },
      { name: 'onClear', payload: 'void', description: 'Ao limpar (showClear).' },
    ],
    slots: [],
    states: ['default', 'hover', 'focus', 'filling', 'complete', 'invalid', 'disabled', 'readonly'],
    invalidCombinations: [
      {
        combo: 'InputMask sem `<label>` associado',
        porque: 'Inacessível sem rótulo; a máscara sozinha não diz o que é o campo.',
      },
      {
        combo: 'usar InputMask para um número (valor/quantidade)',
        porque: 'Guarda cadeia com pontuação; perde a semântica e a matemática de número — isso é InputNumber.',
      },
      {
        combo: 'autoClear=true sem avisar por que o campo esvaziou',
        porque: 'A pessoa preenche parcial, sai, e o campo some sem explicação.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'floatlabel', 'inputgroup'],
    children: [],
    commonlyUsedWith: ['label', 'helper-text', 'button'],
    partOfPatterns: ['form-submission', 'form-field', 'registration'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      default: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      hover: { border: 'surface/400' },
      focus: { border: 'primary/color', ring: 'focus/ring' },
      invalid: { border: 'feedback.danger/500' },
    },
    note: 'Herda os tokens de formulário do PrimeNG (formField.*). Cor por papel + passo, nunca hex.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar o campo sem rótulo associado.',
      porque: 'A máscara sozinha não identifica o campo para o leitor de tela.',
      emVezDisso: '`<label for>` visível (ou FloatLabel); o formato no placeholder/ajuda.',
    },
    {
      regra: 'Nunca usar InputMask para número.',
      porque: 'Guarda cadeia com pontuação; um valor numérico precisa de InputNumber (teclado, formatação e cálculo).',
      emVezDisso: 'InputNumber para valores; InputMask só para cadeias de formato fixo.',
    },
    {
      regra: 'Nunca sinalizar formato inválido só pela cor.',
      porque: 'Cor sozinha não é percebida por todos e não diz o que corrigir.',
      emVezDisso: 'Mensagem de texto (ex.: "CPF incompleto") ligada por aria-describedby + aria-invalid.',
    },
  ],

  examples: {
    angular: `<label for="cpf">CPF</label>
<p-inputmask inputId="cpf" [(ngModel)]="cpf" mask="999.999.999-99"
  [unmask]="true" placeholder="000.000.000-00" (onComplete)="validar()" />

<label for="tel">Telefone</label>
<p-inputmask inputId="tel" [(ngModel)]="tel" mask="(99) 99999-9999" placeholder="(00) 00000-0000" />`,
    html: `<label for="cpf">CPF</label>
<input id="cpf" name="cpf" type="text" inputmode="numeric"
       placeholder="000.000.000-00" aria-describedby="cpf-ajuda" />
<small id="cpf-ajuda">Somente números; a pontuação é preenchida automaticamente.</small>`,
    inContext: `<!-- cadastro: CPF + telefone com formato à vista -->
<div data-block="form-field">
  <label for="cpf2">CPF <span aria-hidden="true">*</span></label>
  <input id="cpf2" name="cpf" type="text" inputmode="numeric"
         aria-required="true" placeholder="000.000.000-00"
         aria-describedby="cpf2-erro" aria-invalid="true" />
  <small id="cpf2-erro" data-variant="danger">CPF incompleto.</small>
</div>`,
  },

  a11y: {
    role: 'textbox',
    keyboard: ['digitação; a pontuação é inserida sozinha', 'Backspace apaga respeitando a máscara'],
    requiredAria: [
      'sempre um `<label for>` associado',
      'inputmode adequado (numeric para CPF/telefone/CEP)',
      'aria-required quando obrigatório; aria-invalid + aria-describedby no erro',
      'não confiar só no autoClear — explicar formato esperado',
    ],
    contrastMin: '4.5:1 do texto e do rótulo; borda de foco visível',
  },

  aiHints: {
    keywords: [
      'inputmask', 'máscara', 'mascara', 'cpf', 'cnpj', 'telefone', 'cep', 'formato fixo',
      'campo com máscara', 'campo com mascara', 'formatação de campo', 'formatacao de campo',
    ],
    selectionCriteria:
      'Escolha InputMask para cadeias de formato fixo com pontuação (CPF, CNPJ, telefone, CEP, data-texto). Número = InputNumber; texto livre = InputText; data com calendário = DatePicker.',
    disambiguation: [
      { confundeCom: 'inputnumber', criterio: 'InputNumber é NÚMERO (valor/quantidade/moeda); InputMask é cadeia formatada (CPF/telefone).' },
      { confundeCom: 'inputtext', criterio: 'InputText é texto livre; InputMask impõe um formato fixo.' },
      { confundeCom: 'datepicker', criterio: 'Data com calendário = DatePicker; InputMask só se for data digitada como texto simples.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/inputmask',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). `unmask` decide se guarda com/sem pontuação. Saída = `<input inputmode>` com rótulo. Número correlato em `inputnumber.meta.ts`.',
  },
};
