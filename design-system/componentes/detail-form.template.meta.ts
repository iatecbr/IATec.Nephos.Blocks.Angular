/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · detail-form.template.meta.ts — TEMPLATE #4 (detalhe/formulário)
 * ─────────────────────────────────────────────────────────────
 * category: 'layout' · origin: 'nephos-own'
 * A página de UM registro: ver, editar ou criar. Campos agrupados em
 * seções (fieldset/legend), trilha no topo, título com as ações de
 * salvar/cancelar e um resumo de erros quando a validação falha. Vive
 * dentro da área de conteúdo do App Shell.
 *
 * Compõe (nos slots): breadcrumb + page-header (heading + salvar/cancelar)
 * + message (resumo de erros) + fieldset (seções) com os campos
 * (inputtext/select/textarea/checkbox/…) + barra de ações fixa.
 * Saída do Moses = um `<main>` com um único `<h1>` e um `<form>` com
 * `<fieldset><legend>` por seção.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const detailFormTemplateMeta: NephosComponentMeta = {
  identity: {
    id: 'detail-form',
    name: 'Detalhe / Formulário',
    category: 'layout',
    status: 'beta',
    version: '0.1.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Página para ver, editar ou criar UM registro, com campos em seções e ações de salvar/cancelar.',
    whenToUse: [
      'Ver ou editar os dados de um único registro (escola, aluno, solicitação).',
      'Criar um registro novo com um formulário de várias seções.',
      'Quando os campos se beneficiam de agrupamento (identificação, contato, endereço…).',
    ],
    whenNotToUse: [
      'Listar/gerenciar VÁRIOS registros — use o template Listagem.',
      'Uma confirmação curta e pontual — use um Dialog (não uma página).',
      'Login/cadastro de conta antes de entrar — use o template Autenticação.',
    ],
  },

  api: {
    // ✅ DECIDIDO (Indiane, 04/08/2026): TEMPLATE É MOLDURA, não tela
    // pronta. A moldura dá a ESTRUTURA — região com nome, um `<h1>` só,
    // ordem de leitura, a grade — e as peças entram pelos SLOTS, já
    // ligadas por quem as tem. Consequência: só sobrevivem os inputs que
    // a moldura consegue honrar sozinha, e os eventos ficam com a peça
    // projetada. Uma moldura que reemitisse evento de peça seria um
    // repasse — e um repasse se desatualiza.
    inputs: [
      { name: 'title', type: 'string', default: '—', description: 'Nome do registro (o `<h1>`). É da MOLDURA porque é ele que dá nome à região (`aria-labelledby`).' },
      { name: 'mode', type: "'view' | 'edit' | 'create'", default: 'view', description: '`view` = só leitura; `edit` = registro existente; `create` = em branco. Sai como `data-mode`; quem torna os campos editáveis são os próprios campos.' },
      { name: 'columns', type: "1 | 2", default: '2', description: 'Colunas do grid de campos. A moldura CALCULA (conhece o columns e o breakpoint) e publica em `--nph-detail-grid`; a seção projetada GASTA o valor. Custom property herda para conteúdo projetado — regra de CSS não atravessa o encapsulamento. 2 no desktop, sempre 1 no mobile.' },
      { name: 'dirty', type: 'boolean', default: 'false', description: 'Há mudanças não salvas. Sai como `data-dirty`. Avisar antes de sair é guarda de rota (CanDeactivate), decisão da APLICAÇÃO — a moldura só dá onde se apoiar.' },
      // ⛔ REMOVIDO em 04/08/2026: `errors: string[]`. A ficha exige que o
      // resumo tenha LINKS para os campos, e uma lista de strings não carrega
      // as âncoras — um resumo sem links seria exatamente o meio-termo que o
      // anti-padrão desta ficha proíbe. O resumo entra pronto pelo slot
      // `errorSummary`.
    ],
    // ⛔ REMOVIDOS em 04/08/2026: `save`, `cancel` e `fieldChange`. Os botões
    // e os campos são projetados; quem os tem já está ligado neles.
    outputs: [],
    slots: [
      { name: 'breadcrumb', accepts: 'breadcrumb (trilha) no topo', optional: true },
      { name: 'pageHeader', accepts: 'os buttons Salvar (primary) e Cancelar (ghost), já ligados a quem salva. O NOME do registro não vem por aqui — é da moldura' },
      { name: 'errorSummary', accepts: 'message com o resumo de erros (role="alert"), links para os campos', optional: true },
      { name: 'sections', accepts: 'fieldset por seção; dentro, os form-field (label + campo + helper/erro)' },
      { name: 'actionsBar', accepts: 'barra de ações fixa ao rolar (Salvar/Cancelar) em formulários longos', optional: true },
      { name: 'asideMeta', accepts: 'painel lateral com metadados (criado em, status, histórico)', optional: true },
    ],
    states: ['view', 'edit', 'create', 'saving', 'invalid', 'dirty'],
    invalidCombinations: [
      { combo: 'campo sem `<label>` associado', porque: 'O leitor de tela não anuncia o campo e o gerenciador de senha/autofill não o entende.' },
      { combo: 'erro de campo sinalizado só pela borda vermelha', porque: 'Cor sozinha não é percebida por todos nem diz O QUE corrigir.' },
      { combo: 'sair da página com mudanças não salvas sem avisar', porque: 'A pessoa perde o que digitou sem chance de confirmar.' },
      { combo: 'duas ações primárias no cabeçalho (ex.: Salvar + Salvar e novo, ambas em ênfase)', porque: 'Destrói a hierarquia — a ação esperada tem que ser uma só.' },
    ],
  },

  relationships: {
    parents: ['app-shell'],
    children: ['fieldset', 'inputtext', 'select', 'textarea', 'checkbox', 'floatlabel', 'button', 'message', 'breadcrumb', 'helper-text'],
    commonlyUsedWith: ['app-shell', 'message', 'toast', 'destructive-confirm'],
    partOfPatterns: ['form-submission', 'data-management'],
  },

  tokens: {
    // ✅ DECIDIDO (Indiane, 04/08/2026): título de PÁGINA é `title-lg`,
    // conforme o `design.md`. O `title-sm` segue valendo para a legenda de
    // cada seção, que é um nível abaixo. Ver a nota em `auth.template.meta.ts`.
    typography: 'title-lg (título da página) · title-sm (legenda de seção) · body-lg (campos)',
    byState: {
      // O template não inventa cor: herda dos campos e das superfícies.
      secao: { background: 'surface/0', border: 'surface/200' },
      acaoPrimaria: { background: 'primary/500', text: 'primary/contrast' },
      erro: { text: 'feedback.danger/600', background: 'feedback.danger/50' },
    },
    note: 'Espaçamento entre seções e campos, raio dos cartões e a barra de ações fixa herdam do PrimeNG e dos componentes. A única ênfase é a ação primária (primary); erros usam feedback.danger. Nenhum hex, nenhum nome de marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar um campo sem `<label>` associado.',
      porque: 'Sem `<label for>`, o leitor de tela não anuncia o campo e o autofill não o preenche.',
      emVezDisso: 'Cada campo com `<label for="id">` (visível ou via FloatLabel), agrupado em `<fieldset><legend>`.',
    },
    {
      regra: 'Nunca sinalizar erro só com a borda vermelha do campo.',
      porque: 'Cor sozinha não é percebida por todos e não diz o que corrigir.',
      emVezDisso: 'Mensagem de texto ligada por aria-describedby + aria-invalid; e um resumo no topo (role="alert") com links para os campos.',
    },
    {
      regra: 'Nunca descartar mudanças não salvas sem avisar.',
      porque: 'A pessoa perde o trabalho digitado sem uma chance de confirmar.',
      emVezDisso: 'Ao cancelar/sair com `dirty`, confirmar o descarte (usar o bloco destructive-confirm).',
    },
    {
      regra: 'Nunca usar mais de um `<h1>` na página.',
      porque: 'Vários títulos principais quebram a hierarquia de cabeçalhos.',
      emVezDisso: 'Um `<h1>` (o nome do registro); as seções usam `<legend>`/`<h2>`.',
    },
  ],

  examples: {
    angular: `<!-- página de edição dentro do app-shell -->
<section aria-labelledby="rt">
  <p-breadcrumb [model]="trilha" [home]="home" />
  <div class="page-header">
    <h1 id="rt">Colégio Adventista de Salvador</h1>
    <span class="push"></span>
    <p-button label="Cancelar" [outlined]="true" (onClick)="cancelar()" />
    <p-button label="Salvar" severity="primary" [loading]="salvando" (onClick)="salvar()" />
  </div>
  <form (ngSubmit)="salvar()">
    <p-message *ngIf="erros.length" severity="error" ... />
    <fieldset><legend>Identificação</legend>
      <input pInputText id="nome" [(ngModel)]="reg.nome" name="nome" />
      <!-- … -->
    </fieldset>
  </form>
</section>`,
    html: `<main id="conteudo">
  <section aria-labelledby="rt">
    <nav aria-label="Trilha">
      <ol>
        <li><a href="/escolas">Escolas</a></li>
        <li><span aria-current="page">Colégio Adventista de Salvador</span></li>
      </ol>
    </nav>

    <div data-slot="page-header">
      <h1 id="rt">Colégio Adventista de Salvador</h1>
      <div data-slot="actions">
        <button type="button" data-variant="ghost">Cancelar</button>
        <button type="submit" form="f-reg" data-variant="primary">Salvar</button>
      </div>
    </div>

    <form id="f-reg" aria-labelledby="rt">
      <!-- resumo de erros (aparece só quando há falhas) -->
      <div role="alert" data-slot="error-summary" hidden>
        <p>Corrija 2 campos:</p>
        <ul>
          <li><a href="#email">E-mail inválido</a></li>
          <li><a href="#cnpj">CNPJ obrigatório</a></li>
        </ul>
      </div>

      <fieldset>
        <legend>Identificação</legend>
        <div data-block="form-field">
          <label for="nome">Nome da escola</label>
          <input id="nome" name="nome" type="text" value="Colégio Adventista de Salvador" />
        </div>
        <div data-block="form-field">
          <label for="cnpj">CNPJ <span aria-hidden="true">*</span></label>
          <input id="cnpj" name="cnpj" type="text" aria-required="true"
                 aria-invalid="true" aria-describedby="cnpj-err" />
          <small id="cnpj-err">Informe o CNPJ da escola.</small>
        </div>
      </fieldset>

      <fieldset>
        <legend>Contato</legend>
        <div data-block="form-field">
          <label for="email">E-mail</label>
          <input id="email" name="email" type="email" autocomplete="email" />
        </div>
      </fieldset>
    </form>
  </section>
</main>`,
    inContext: `<!-- o detalhe preenchendo o conteúdo do app-shell -->
<div data-block="app-shell">
  <header data-block="header" role="banner"> … </header>
  <div data-slot="body">
    <nav data-block="sidebar" aria-label="Seções"> … </nav>
    <main id="conteudo">
      <section aria-labelledby="rt"> … (ver html acima) … </section>
    </main>
  </div>
</div>`,
  },

  a11y: {
    role: 'região de página (main/section rotulada) com um único `<h1>` e um `<form>`',
    keyboard: [
      'ao entrar (rota), o foco vai para o `<h1>`/primeiro campo',
      'Tab percorre os campos na ordem visual; Enter em campo de texto não envia sem intenção',
      'ao submeter com erro, o foco vai para o resumo (role="alert") ou o 1º campo inválido',
    ],
    requiredAria: [
      'conteúdo num `<main>`/`<section>` nomeado; um único `<h1>`',
      'campos em `<fieldset><legend>`; cada campo com `<label for>` e autocomplete quando fizer sentido',
      'erro por aria-invalid + aria-describedby; resumo de erros em role="alert" com links para os campos',
      'ação primária única (Salvar); confirmar descarte se houver mudanças não salvas',
    ],
    contrastMin: '4.5:1 em rótulos, valores e botões; foco visível; erro nunca só por cor',
  },

  aiHints: {
    keywords: [
      'detalhe', 'formulário', 'formulario', 'editar registro', 'editar', 'cadastro', 'criar registro',
      'ver registro', 'ficha do registro', 'form de edição', 'form de edicao', 'campos em seções',
      'campos em secoes', 'detail page', 'edit form', 'página de formulário', 'pagina de formulario',
    ],
    selectionCriteria:
      'Escolha o template Detalhe/Formulário para ver/editar/criar UM registro com campos agrupados em seções e ações salvar/cancelar. Vários registros = Listagem. Confirmação curta = Dialog. Acesso (login) = Autenticação.',
    disambiguation: [
      { confundeCom: 'listing', criterio: 'Listagem gerencia VÁRIOS registros (tabela/cards); Detalhe/Formulário é UM registro em profundidade.' },
      { confundeCom: 'fieldset', criterio: 'fieldset é UM grupo de campos; este template é a página inteira (trilha + título + várias seções + ações).' },
      { confundeCom: 'auth', criterio: 'Autenticação é o acesso antes de entrar; Detalhe/Formulário é um registro dentro do app.' },
      { confundeCom: 'dialog', criterio: 'Dialog é uma tarefa curta sobreposta; Detalhe/Formulário é uma página inteira de edição.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/', // template de composição; sem componente único
    storybookId: 'templates-detail-form',
    deltaFromPrimeng: 'Template nephos-own (category: layout): compõe breadcrumb + page-header + message (erros) + fieldset (seções) com os campos + barra de ações, dentro do App Shell. `<main>` com um único `<h1>`, `<form>` com `<fieldset><legend>`; ênfase só na ação primária (primary), erros em feedback.danger.',
  },
};
