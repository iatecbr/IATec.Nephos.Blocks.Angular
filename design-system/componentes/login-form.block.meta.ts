/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · login-form.block.meta.ts — BLOCO #1 (composição nossa)
 * ─────────────────────────────────────────────────────────────
 * category: 'block' · origin: 'nephos-own'
 * Um bloco NÃO é um componente novo — é uma COMPOSIÇÃO de componentes
 * PrimeNG puros, montada do jeito da organização. É aqui que mora o
 * "nosso" (a estrutura), enquanto os átomos e a cor vêm prontos.
 *
 * Este bloco compõe: InputText (e-mail) + Password + Checkbox (lembrar)
 * + Button (entrar) + um link (esqueci a senha).
 * Saída do Moses = HTML semântico: um `<form>` com landmark e labels.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const loginFormBlockMeta: NephosComponentMeta = {
  identity: {
    id: 'login-form',
    name: 'Login Form',
    category: 'block',
    status: 'beta',
    version: '0.1.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Bloco de entrada no sistema: e-mail, senha e ação de entrar.',
    whenToUse: [
      'Tela de acesso de qualquer produto das verticais.',
      'Ponto único de autenticação por e-mail e senha.',
    ],
    whenNotToUse: [
      'Cadastro de nova conta — é outro bloco (mais campos e validações).',
      'Recuperar senha — bloco próprio (só e-mail).',
    ],
  },

  api: {
    // Bloco: a "API" são os pontos de composição (slots), não muitos inputs.
    inputs: [
      { name: 'showRemember', type: 'boolean', default: 'true', description: 'Mostra o "Lembrar-me". Desligar em contextos de alta segurança.' },
      { name: 'errorMessage', type: 'string', default: '—', description: 'Mensagem de erro geral (ex.: "E-mail ou senha inválidos") exibida no topo do bloco.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Estado enquanto autentica: botão em loading e campos bloqueados.' },
    ],
    outputs: [
      { name: 'submit', payload: '{ email, senha, lembrar }', description: 'Emitido ao enviar o formulário (dados para autenticar).' },
    ],
    slots: [
      { name: 'brand', accepts: 'logo/nome da vertical ativa no topo', optional: true },
      { name: 'email', accepts: 'InputText (type=email) com label "E-mail"' },
      { name: 'password', accepts: 'Password (toggleMask, sem medidor) com label "Senha"' },
      { name: 'remember', accepts: 'Checkbox "Lembrar-me"', optional: true },
      { name: 'actions', accepts: 'Button primário "Entrar"' },
      { name: 'links', accepts: 'link "Esqueci minha senha"', optional: true },
    ],
    states: ['default', 'loading', 'error'],
    invalidCombinations: [
      { combo: 'medidor de força no campo de senha', porque: 'É login, não criação de senha (ver password.meta › anti-padrões).' },
      { combo: 'dois botões primários (ex.: Entrar + Cadastrar preenchidos)', porque: 'Destrói a hierarquia — a ação esperada é uma só (Entrar).' },
    ],
  },

  relationships: {
    parents: ['auth-page', 'layout'],
    children: ['inputtext', 'password', 'checkbox', 'button'],
    commonlyUsedWith: [],
    partOfPatterns: ['login'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      // O bloco não inventa cor: herda os papéis dos componentes que compõe.
      cartao: { background: 'surface/0', border: 'surface/200' },
      titulo: { text: 'surface/text' },
      acaoPrimaria: { background: 'primary/500', text: 'primary/contrast' },
      erro: { text: 'feedback.danger/600', background: 'feedback.danger/50' },
    },
    note: 'Espaçamento entre campos, raio do cartão e sombra herdam do PrimeNG. Nenhum hex, nenhum nome de marca — a cor da ênfase é a `primary` da vertical ativa.',
  },

  antiPatterns: [
    {
      regra: 'Nunca pedir mais dados do que e-mail e senha no login.',
      porque: 'Cada campo extra aumenta o atrito de entrar; dados de perfil pertencem a outra tela.',
      emVezDisso: 'Só e-mail e senha; o resto após autenticar.',
    },
    {
      regra: 'Nunca mostrar erro de login campo a campo ("e-mail não existe").',
      porque: 'Além de pior de usar, revela quais e-mails existem (risco de segurança).',
      emVezDisso: 'Uma mensagem geral no topo: "E-mail ou senha inválidos".',
    },
    {
      regra: 'Nunca deixar o formulário sem landmark e sem labels associados.',
      porque: 'Quebra a navegação por leitor de tela e o preenchimento por gerenciador de senha.',
      emVezDisso: 'Um `<form>` com `aria-label`, cada campo com `<label for>` e `autocomplete` correto.',
    },
  ],

  examples: {
    angular: `<!-- composição real com componentes PrimeNG -->
<form (ngSubmit)="entrar()" aria-label="Entrar">
  <input pInputText type="email" id="email" [(ngModel)]="email" name="email" />
  <p-password [(ngModel)]="senha" inputId="senha" name="senha" [toggleMask]="true" [feedback]="false" />
  <p-checkbox [(ngModel)]="lembrar" [binary]="true" inputId="lembrar" />
  <p-button type="submit" label="Entrar" severity="primary" [loading]="loading" />
</form>`,
    html: `<form data-block="login-form" aria-label="Entrar">
  <h1>Entrar</h1>

  <div data-block="form-field">
    <label for="email">E-mail</label>
    <input id="email" type="email" name="email" autocomplete="username" />
  </div>

  <div data-block="form-field">
    <label for="senha">Senha</label>
    <input id="senha" type="password" name="senha" autocomplete="current-password" />
  </div>

  <div data-slot="remember">
    <input type="checkbox" id="lembrar" name="lembrar" />
    <label for="lembrar">Lembrar-me</label>
  </div>

  <button type="submit" data-variant="primary">Entrar</button>
  <a href="/recuperar-senha" data-variant="link">Esqueci minha senha</a>
</form>`,
    inContext: `<main data-block="auth-page">
  <!-- logo da vertical ativa -->
  <form data-block="login-form" aria-label="Entrar"> … (ver html acima) … </form>
</main>`,
  },

  a11y: {
    role: 'form',
    keyboard: ['Tab percorre e-mail → senha → lembrar → entrar → link', 'Enter envia o formulário'],
    requiredAria: [
      '`<form>` com aria-label',
      'cada campo com <label for> e autocomplete correto (username / current-password)',
      'erro geral com role="alert" no topo',
    ],
    contrastMin: '4.5:1 em textos, rótulos e no botão em todos os estados',
  },

  aiHints: {
    keywords: ['login', 'entrar', 'acesso', 'autenticação', 'autenticacao', 'signin', 'e-mail e senha', 'tela de login'],
    selectionCriteria:
      'Escolha o bloco Login Form quando a tela é o ponto de entrada por e-mail e senha. Cadastro e recuperação de senha são blocos próprios.',
    disambiguation: [
      { confundeCom: 'signup-form', criterio: 'Cadastro coleta vários dados e valida senha nova; Login só autentica e-mail + senha.' },
      { confundeCom: 'password-reset', criterio: 'Recuperação pede só o e-mail para enviar o link; Login pede e-mail e senha.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/', // composição de componentes PrimeNG; sem página única
    figmaNode: 'https://www.figma.com/design/mHUXdyDZ820suwIRIIlp9Z/PrimeOne-4.0.0',
    storybookId: 'blocks-login-form',
    deltaFromPrimeng: 'Bloco nephos-own: composição própria de InputText + Password + Checkbox + Button. A cor da ênfase é a `primary` da vertical ativa.',
  },
};
