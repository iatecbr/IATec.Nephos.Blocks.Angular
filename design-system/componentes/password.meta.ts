/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · password.meta.ts — controle de formulário (senha)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → usado direto do PrimeNG (p-password).
 * É um campo de texto com máscara (•••) e botão de mostrar/ocultar.
 * Saída do Moses = HTML semântico: `<input type="password">` + `<label>`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const passwordMeta: NephosComponentMeta = {
  identity: {
    id: 'password',
    name: 'Password',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Campo para digitar uma senha, com máscara e opção de mostrar/ocultar.',
    whenToUse: [
      'Entrar (login) com senha.',
      'Criar ou trocar senha — aí com o medidor de força ligado.',
    ],
    whenNotToUse: [
      'Código de verificação de poucos dígitos — use InputOtp.',
      'Texto comum visível — use InputText.',
    ],
  },

  api: {
    inputs: [
      { name: 'toggleMask', type: 'boolean', default: 'false', description: 'Mostra o olhinho de exibir/ocultar a senha. Recomendado ligar — ajuda a pessoa a conferir o que digitou.' },
      { name: 'feedback', type: 'boolean', default: 'true', description: 'Mostra o medidor de força. Ligar só na CRIAÇÃO de senha; desligar no login.' },
      { name: 'promptLabel', type: 'string', default: '—', description: 'Texto inicial do medidor ("Digite uma senha").' },
      { name: 'weakLabel', type: 'string', default: '—', description: 'Rótulo de senha fraca.' },
      { name: 'strongLabel', type: 'string', default: '—', description: 'Rótulo de senha forte.' },
      { name: 'size', type: "'small' | 'large'", default: '(normal)', description: 'Densidade.' },
      { name: 'invalid', type: 'boolean', default: 'false', description: 'Marca como inválido. Anda com a mensagem e o aria-invalid.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita.' },
      { name: 'fluid', type: 'boolean', default: 'false', description: 'Ocupa 100% da largura.' },
    ],
    outputs: [
      { name: 'valueChange', payload: 'string', description: 'Emitido a cada mudança da senha digitada.' },
    ],
    slots: [],
    states: ['default', 'hover', 'focus', 'filled', 'invalid', 'disabled', 'masked', 'unmasked'],
    invalidCombinations: [
      { combo: 'feedback=true numa tela de LOGIN', porque: 'O medidor de força não ajuda a entrar (a senha já existe) e só polui a tela.' },
      { combo: 'password sem <label>', porque: 'Sem rótulo o campo fica sem referência e inacessível.' },
    ],
  },

  relationships: {
    parents: ['form-field', 'login-form', 'floatlabel'],
    children: [],
    commonlyUsedWith: ['inputtext', 'button', 'checkbox'],
    partOfPatterns: ['login', 'password-reset', 'signup'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      default: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      hover: { border: 'surface/400' },
      focus: { ring: 'focus/ring' },
      invalid: { border: 'feedback.danger/500' },
    },
    note: 'O olhinho e o medidor de força herdam do PrimeNG. Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar o campo de senha sem um `<label>` associado.',
      porque: 'O campo fica sem referência e o leitor de tela não o anuncia.',
      emVezDisso: 'Um `<label for>` ligado ao campo.',
    },
    {
      regra: 'Nunca bloquear colar (paste) no campo de senha.',
      porque: 'Quebra os gerenciadores de senha e empurra a pessoa para senhas fracas e digitadas à mão.',
      emVezDisso: 'Permitir colar; oferecer o olhinho (toggleMask) para conferir.',
    },
    {
      regra: 'Nunca mostrar o medidor de força na tela de login.',
      porque: 'No login a senha já existe — o medidor não ajuda e sugere ação errada.',
      emVezDisso: 'Ligar o medidor só na criação/troca de senha (`feedback=true` lá, e só lá).',
    },
  ],

  examples: {
    angular: `<p-password [(ngModel)]="senha" inputId="senha" [toggleMask]="true" [feedback]="false" />`,
    html: `<label for="senha">Senha</label>
<input id="senha" type="password" name="senha" autocomplete="current-password" />`,
    inContext: `<div data-block="form-field">
  <label for="senha">Senha</label>
  <input id="senha" type="password" name="senha" autocomplete="current-password"
         aria-invalid="true" aria-describedby="senha-erro" />
  <small id="senha-erro" data-variant="danger">Senha incorreta.</small>
</div>`,
  },

  a11y: {
    role: 'textbox (type=password)',
    keyboard: ['digitação normal', 'o botão mostrar/ocultar é focável e acionável por teclado'],
    requiredAria: ['sempre um <label for>', 'aria-label no botão de mostrar/ocultar', 'autocomplete apropriado (current-password / new-password)'],
    contrastMin: '4.5:1 do rótulo e dos ícones; foco visível',
  },

  aiHints: {
    keywords: ['senha', 'password', 'login', 'entrar', 'palavra-passe', 'ocultar senha', 'mostrar senha'],
    selectionCriteria:
      'Escolha o Password para digitar uma senha. No login, com `toggleMask` e sem medidor. Na criação/troca de senha, com o medidor de força ligado.',
    disambiguation: [
      { confundeCom: 'inputtext', criterio: 'InputText mostra o texto; Password mascara e oferece mostrar/ocultar.' },
      { confundeCom: 'inputotp', criterio: 'InputOtp é para código de poucos dígitos (verificação); Password é a senha em si.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/password',
    figmaNode: 'https://www.figma.com/design/mHUXdyDZ820suwIRIIlp9Z/PrimeOne-4.0.0', // grupo "password"
    storybookId: 'molecules-password',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Só a cor da marca entra pelo tema.',
  },
};
