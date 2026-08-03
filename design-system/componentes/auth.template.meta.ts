/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · auth.template.meta.ts — TEMPLATE #3 (tela de autenticação)
 * ─────────────────────────────────────────────────────────────
 * category: 'layout' · origin: 'nephos-own'
 * A moldura CENTRADA das telas de acesso — entrar, criar conta,
 * recuperar senha — ANTES de o usuário autenticar. Sem o chrome do app
 * (sem header nem sidebar): a pessoa ainda não entrou.
 *
 * Compõe (nos slots): logo + o bloco login-form (ou cadastro/recuperação)
 * + links legais/idioma; variante "split" com painel de marca ao lado.
 * Saída do Moses = um `<main>` centrado, com um único `<h1>` e o formulário.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const authTemplateMeta: NephosComponentMeta = {
  identity: {
    id: 'auth',
    name: 'Autenticação',
    category: 'layout',
    status: 'beta',
    version: '0.1.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Layout centrado para entrar, criar conta ou recuperar senha — sem o chrome do app.',
    whenToUse: [
      'Telas de acesso (login, cadastro, recuperação de senha) — antes de autenticar.',
      'Quando o foco é uma única tarefa (entrar) e não deve haver navegação do app ao redor.',
    ],
    whenNotToUse: [
      'Telas internas já autenticadas — usam o App Shell (com header e sidebar).',
      'Conteúdo público institucional (landing) — é outro layout, não o de acesso.',
      'Um formulário longo de várias seções — isso é o template Detalhe/Formulário.',
    ],
  },

  api: {
    // Template: a "API" são os slots de composição + a config da moldura.
    inputs: [
      { name: 'variant', type: "'login' | 'signup' | 'reset'", default: 'login', description: 'Qual fluxo hospedar: entrar, criar conta ou recuperar senha. Muda o bloco no slot do formulário.' },
      { name: 'layout', type: "'centered' | 'split'", default: 'centered', description: '`centered` = cartão único no meio; `split` = painel de marca de um lado e o formulário do outro.' },
      { name: 'brandPanel', type: '{ imagem?: string; texto?: string }', default: '—', description: 'No layout split, o painel de identidade (imagem/mensagem). Conteúdo decorativo — nunca a única fonte de informação essencial.' },
    ],
    outputs: [],
    slots: [
      { name: 'brand', accepts: 'logo da vertical ativa, acima do formulário' },
      { name: 'form', accepts: 'o bloco do fluxo: login-form (ou cadastro / recuperação de senha)' },
      { name: 'aside', accepts: 'painel de marca (só no layout split) — imagem/mensagem decorativa', optional: true },
      { name: 'footer', accepts: 'links legais (termos, privacidade) e seletor de idioma', optional: true },
    ],
    states: ['default', 'split', 'loading', 'error'],
    invalidCombinations: [
      { combo: 'header/sidebar do app numa tela de autenticação', porque: 'A pessoa ainda NÃO entrou; navegação do app antes do acesso confunde e vaza estrutura interna.' },
      { combo: 'formulário sem um `<h1>` e fora de um `<main>`', porque: 'Perde o landmark e o título da tela — o leitor de tela não anuncia do que é a página.' },
      { combo: 'informação essencial só no painel de imagem (split)', porque: 'Se o painel é decorativo/oculto no mobile, a informação essencial some.' },
      { combo: 'nome de marca fixo na moldura', porque: 'O mesmo acesso serve as 7 verticais; a marca vem do tema/logo ativo.' },
    ],
  },

  relationships: {
    parents: [],
    children: ['login-form', 'logo', 'button', 'link'],
    commonlyUsedWith: ['login-form', 'logo', 'message'],
    partOfPatterns: ['login', 'auth'],
  },

  tokens: {
    typography: 'title-sm (título da tela)',
    byState: {
      // A moldura não inventa cor: herda do bloco e das superfícies.
      fundo: { background: 'surface/50' },
      cartao: { background: 'surface/0', border: 'surface/200' },
      painelMarca: { background: 'primary/500', text: 'primary/contrast' },
    },
    note: 'Fundo da tela = surface; cartão do formulário = surface/0 com raio de card (herdado). No split, o painel de marca usa a `primary` da vertical ativa. Nenhum hex, nenhum nome de marca — a identidade vem do tema.',
  },

  antiPatterns: [
    {
      regra: 'Nunca colocar a navegação do app (header/sidebar) na tela de autenticação.',
      porque: 'A pessoa ainda não entrou; expor a navegação interna antes do acesso confunde e é desnecessário.',
      emVezDisso: 'Só o logo + o formulário centrados; a navegação do app aparece depois de autenticar (App Shell).',
    },
    {
      regra: 'Nunca deixar a tela sem um `<h1>` dentro de um `<main>`.',
      porque: 'Sem título e landmark, a página não se anuncia para a tecnologia assistiva.',
      emVezDisso: 'Um `<main>` com um único `<h1>` ("Entrar", "Criar conta", "Recuperar senha").',
    },
    {
      regra: 'Nunca pôr informação essencial só no painel de imagem (layout split).',
      porque: 'O painel é decorativo e some no mobile — o que estiver só nele se perde.',
      emVezDisso: 'Informação essencial no formulário; o painel de marca fica decorativo (imagem com alt vazio ou aria-hidden).',
    },
  ],

  examples: {
    angular: `<!-- moldura centrada hospedando o bloco de login -->
<main class="auth">
  <div class="auth-card">
    <img [src]="tema.logoUrl" [alt]="tema.nomeVertical" height="40" />
    <app-login-form (submit)="entrar($event)" [loading]="loading" />
  </div>
</main>`,
    html: `<main class="auth" aria-labelledby="auth-t">
  <div data-slot="auth-card">
    <a href="/" aria-label="Início"><img src="{{ logoDaMarcaAtiva }}" alt="{{ nomeDaMarcaAtiva }}" height="40" /></a>

    <!-- o bloco login-form entra aqui -->
    <form data-block="login-form" aria-labelledby="auth-t">
      <h1 id="auth-t">Entrar</h1>

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
    </form>
  </div>

  <footer data-slot="auth-footer">
    <a href="/termos">Termos</a> · <a href="/privacidade">Privacidade</a>
  </footer>
</main>`,
    inContext: `<!-- variante SPLIT: painel de marca (decorativo) + formulário -->
<main class="auth auth--split">
  <aside data-slot="brand-panel" aria-hidden="true"><!-- imagem/cor da marca --></aside>
  <div data-slot="auth-card">
    <a href="/" aria-label="Início"><img src="{{ logoDaMarcaAtiva }}" alt="{{ nomeDaMarcaAtiva }}" height="40" /></a>
    <form data-block="login-form" aria-labelledby="auth-t2">
      <h1 id="auth-t2">Entrar</h1>
      <!-- … campos … -->
    </form>
  </div>
</main>`,
  },

  a11y: {
    role: 'main (região única) com um `<h1>` e o formulário',
    keyboard: [
      'o foco inicial vai para o primeiro campo (e-mail)',
      'Tab percorre e-mail → senha → lembrar → entrar → link',
      'Enter envia o formulário',
    ],
    requiredAria: [
      'um `<main>` único, sem navegação do app',
      'um único `<h1>` nomeando a tela',
      'formulário com aria-label/labelledby; cada campo com `<label for>` e autocomplete correto',
      'painel de marca (split) decorativo: aria-hidden ou alt vazio',
    ],
    contrastMin: '4.5:1 em textos, rótulos e botão; foco visível em todos os campos',
  },

  aiHints: {
    keywords: [
      'autenticação', 'autenticacao', 'tela de login', 'tela de acesso', 'página de login', 'pagina de login',
      'entrar', 'acesso', 'login', 'cadastro', 'criar conta', 'recuperar senha', 'auth', 'sign in', 'sign up',
      'layout de login', 'login centralizado', 'tela de autenticação',
    ],
    selectionCriteria:
      'Escolha o template Autenticação para as telas PRÉ-acesso (login, cadastro, recuperação), centradas e SEM o chrome do app. Telas internas já autenticadas = App Shell. O formulário em si = o bloco login-form.',
    disambiguation: [
      { confundeCom: 'login-form', criterio: 'login-form é o FORMULÁRIO (campos + entrar); Autenticação é a PÁGINA centrada que o hospeda (logo, layout, rodapé).' },
      { confundeCom: 'app-shell', criterio: 'App Shell é para telas internas (com header/sidebar); Autenticação é antes de entrar, sem navegação do app.' },
      { confundeCom: 'listing', criterio: 'Listagem é uma página de conteúdo dentro do app; Autenticação é a porta de entrada, fora do app.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/', // template de composição; sem componente único
    storybookId: 'templates-auth',
    deltaFromPrimeng: 'Template nephos-own (category: layout): moldura centrada (ou split) que hospeda o bloco login-form (ou cadastro/recuperação) + logo + rodapé legal. Sem chrome do app; `<main>` com um único `<h1>`; identidade pelo tema.',
  },
};
