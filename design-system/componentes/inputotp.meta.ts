/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · inputotp.meta.ts — ONDA "ENTRADAS ESPECIAIS"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-inputotp`. API lida do código real
 * (primeng@21.0.2, `types/primeng-inputotp.d.ts`).
 *
 * Campo de código de uso único (OTP): N caixinhas de UM dígito cada,
 * com avanço automático e colar inteligente. É o código de verificação
 * (SMS/e-mail/authenticator), NÃO a senha. Saída semântica = um grupo
 * (`<fieldset>` + rótulo) de `<input>` de um caractere com
 * autocomplete="one-time-code".
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const inputOtpMeta: NephosComponentMeta = {
  identity: {
    id: 'inputotp',
    name: 'InputOtp',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Campo de código de uso único (OTP) em caixinhas de um dígito, com avanço automático.',
    whenToUse: [
      'Confirmar um código de verificação recebido por SMS, e-mail ou app autenticador.',
      'Verificação em duas etapas (2FA) e confirmação de ação sensível com PIN curto (4–8 caracteres).',
    ],
    whenNotToUse: [
      'A senha da conta — use Password (a senha tem tamanho variável e força).',
      'Códigos longos ou alfanuméricos livres (cupom, chave) — use InputText.',
      'Número com cálculo/formatação (valor, quantidade) — use InputNumber.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'length',
        type: 'number',
        default: '4',
        description: 'Quantas caixinhas/dígitos o código tem. Casar exatamente com o código que o back-end gera (ex.: 6 para OTP de SMS).',
      },
      {
        name: 'mask',
        type: 'boolean',
        default: 'false',
        description: 'Oculta os caracteres digitados (mostra •) como num campo de senha. Ligar quando o código for sensível e a tela puder ser vista por terceiros.',
      },
      {
        name: 'integerOnly',
        type: 'boolean',
        default: 'false',
        description: 'Aceita apenas dígitos (0–9). Ligar para OTP numérico — melhora o teclado no celular e evita entrada inválida.',
      },
      {
        name: 'variant',
        type: "'outlined' | 'filled'",
        default: '(herda do tema)',
        description: 'Estilo da borda das caixinhas. Manter o mesmo variant dos demais campos do formulário.',
      },
      {
        name: 'size',
        type: "'small' | 'large'",
        default: '(normal)',
        description: 'Densidade das caixinhas. `large` ajuda a leitura em telas de confirmação; omitir para o tamanho padrão.',
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        description: 'Mostra o código sem permitir editar. Útil para revisar um valor já confirmado.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Desabilita o campo (herdado do controle de formulário base). Ex.: enquanto o código ainda não foi enviado.',
      },
      {
        name: 'tabindex',
        type: 'number | null',
        default: 'null',
        description: 'Ordem de tabulação do grupo. Em geral deixar o fluxo natural; a navegação entre caixinhas já é automática.',
      },
    ],
    outputs: [
      { name: 'onChange', payload: 'InputOtpChangeEvent { originalEvent: Event; value: any }', description: 'Emitido a cada mudança do código montado; `value` é o código completo quando todas as caixinhas estão preenchidas.' },
      { name: 'onFocus', payload: 'Event', description: 'O campo (uma das caixinhas) recebeu foco.' },
      { name: 'onBlur', payload: 'Event', description: 'O campo perdeu o foco.' },
    ],
    slots: [
      { name: 'inputTemplate', accepts: 'template de uma caixinha (personaliza a aparência de cada dígito)', optional: true },
    ],
    states: ['default', 'hover', 'focus', 'filling', 'complete', 'disabled', 'readonly'],
    invalidCombinations: [
      {
        combo: 'InputOtp sem rótulo/instrução do que digitar',
        porque: 'As caixinhas isoladas não dizem que é um código de verificação nem de onde ele veio.',
      },
      {
        combo: 'usar InputOtp para a senha da conta',
        porque: 'A senha tem tamanho variável e medidor de força; o OTP é um código curto e efêmero — são coisas diferentes (isso é Password).',
      },
      {
        combo: 'integerOnly=true com um código que contém letras',
        porque: 'Bloqueia caracteres válidos do código e impede a confirmação.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'login-form'],
    children: [],
    commonlyUsedWith: ['button', 'label', 'helper-text', 'message'],
    partOfPatterns: ['login', 'two-factor-auth', 'password-reset'],
  },

  tokens: {
    typography: 'title-sm',
    byState: {
      default: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      hover: { border: 'surface/400' },
      focus: { border: 'primary/color', ring: 'focus/ring' },
      disabled: { border: 'surface/200' },
    },
    note: 'Tamanho, espaçamento e raio das caixinhas herdam do PrimeNG (inputotp.*). Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca mostrar as caixinhas sem dizer o que é o código e de onde veio.',
      porque: 'Sem instrução a pessoa não sabe se digita o código do SMS, do e-mail ou do app — e o leitor de tela não anuncia o propósito.',
      emVezDisso: 'Rótulo/instrução do grupo ("Código enviado para seu e-mail") ligado por aria + `autocomplete="one-time-code"`.',
    },
    {
      regra: 'Nunca usar InputOtp para a senha da conta.',
      porque: 'A senha tem tamanho livre e medidor de força; forçá-la em caixinhas fixas quebra gerenciadores de senha e a semântica.',
      emVezDisso: 'Password para a senha; InputOtp só para o código de verificação curto.',
    },
    {
      regra: 'Nunca sinalizar código inválido só pela cor das caixinhas.',
      porque: 'Cor sozinha não é percebida por todos e não explica o que houve (expirou? errado?).',
      emVezDisso: 'Mensagem de texto ("Código incorreto ou expirado") ligada por aria-describedby + aria-invalid.',
    },
  ],

  examples: {
    angular: `<label id="otp-label">Código de verificação</label>
<p-inputotp [(ngModel)]="codigo" [length]="6" [integerOnly]="true"
  ariaLabelledBy="otp-label" (onChange)="aoMudar($event)" />`,
    html: `<fieldset>
  <legend>Código de verificação</legend>
  <input type="text" inputmode="numeric" autocomplete="one-time-code"
         maxlength="1" aria-label="Dígito 1" />
  <input type="text" inputmode="numeric" maxlength="1" aria-label="Dígito 2" />
  <input type="text" inputmode="numeric" maxlength="1" aria-label="Dígito 3" />
  <input type="text" inputmode="numeric" maxlength="1" aria-label="Dígito 4" />
  <input type="text" inputmode="numeric" maxlength="1" aria-label="Dígito 5" />
  <input type="text" inputmode="numeric" maxlength="1" aria-label="Dígito 6" />
</fieldset>`,
    inContext: `<!-- verificação em duas etapas: instrução + código + erro + reenviar -->
<div data-block="form-field">
  <fieldset aria-describedby="otp-ajuda otp-erro">
    <legend>Código de verificação <span aria-hidden="true">*</span></legend>
    <input type="text" inputmode="numeric" autocomplete="one-time-code"
           maxlength="1" aria-label="Dígito 1" aria-required="true" />
    <input type="text" inputmode="numeric" maxlength="1" aria-label="Dígito 2" />
    <input type="text" inputmode="numeric" maxlength="1" aria-label="Dígito 3" />
    <input type="text" inputmode="numeric" maxlength="1" aria-label="Dígito 4" />
  </fieldset>
  <small id="otp-ajuda">Enviamos um código de 4 dígitos para seu e-mail.</small>
  <small id="otp-erro" data-variant="danger">Código incorreto ou expirado.</small>
  <button type="button">Reenviar código</button>
</div>`,
  },

  a11y: {
    role: 'group de textbox (uma caixinha por dígito)',
    keyboard: [
      'digitação avança sozinha para a próxima caixinha',
      'Backspace apaga e volta para a caixinha anterior',
      'setas ← → navegam entre as caixinhas',
      'colar (Ctrl/Cmd+V) distribui o código pelas caixinhas',
    ],
    requiredAria: [
      'rótulo/instrução do grupo (aria-labelledby ou legend) dizendo o que é o código',
      'autocomplete="one-time-code" para o preenchimento automático do SMS',
      'aria-invalid + aria-describedby apontando para o erro',
    ],
    contrastMin: '4.5:1 dos dígitos e do rótulo; borda de foco visível em cada caixinha',
  },

  aiHints: {
    keywords: [
      'inputotp', 'otp', 'código', 'codigo', 'código de verificação', 'codigo de verificacao',
      'verificação', 'verificacao', '2fa', 'dois fatores', 'two factor', 'one time password',
      'pin', 'token', 'sms', 'authenticator', 'confirmar código',
    ],
    selectionCriteria:
      'Escolha InputOtp para um código de uso único curto (4–8 caracteres) de verificação: SMS, e-mail, 2FA. Se é a senha da conta, use Password. Se é um código longo/alfanumérico livre, use InputText.',
    disambiguation: [
      { confundeCom: 'password', criterio: 'Password é a senha (tamanho variável, força); InputOtp é o código de verificação curto e efêmero.' },
      { confundeCom: 'inputtext', criterio: 'InputText é texto livre de tamanho variável; InputOtp são caixinhas fixas de um dígito com avanço automático.' },
      { confundeCom: 'inputnumber', criterio: 'InputNumber é número com valor/cálculo/formatação; InputOtp é uma sequência de dígitos que é código, não quantidade.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/inputotp',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída semântica = grupo (`<fieldset>`/rótulo) de `<input>` de um caractere com `autocomplete="one-time-code"`. A senha correlata está em `password.meta.ts`.',
  },
};
