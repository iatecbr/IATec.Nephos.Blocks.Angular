/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · listing.template.meta.ts — TEMPLATE #2 (página de listagem)
 * ─────────────────────────────────────────────────────────────
 * category: 'layout' · origin: 'nephos-own'
 * O padrão de página MAIS comum do produto: um título com a ação
 * primária, a busca/filtros no topo, a tabela de dados (ou cards) e a
 * paginação — com o estado vazio quando o filtro não acha nada. Vive
 * dentro da área de conteúdo do App Shell.
 *
 * Compõe (nos slots): page-header (heading + button "Novo") +
 * search-filters + data-table (ou dataview) + paginator + empty-state.
 * Saída do Moses = o `<main>`/`<section>` da página de listagem, com a
 * ordem e os landmarks certos.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const listingTemplateMeta: NephosComponentMeta = {
  identity: {
    id: 'listing',
    name: 'Listagem',
    category: 'layout',
    status: 'beta',
    version: '0.1.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Página de listagem: título com ação, busca/filtros, tabela de dados e paginação, com estado vazio.',
    whenToUse: [
      'Telas de "gerenciar X" (escolas, alunos, solicitações) — o fluxo mais comum do produto.',
      'Quando a pessoa busca/filtra um conjunto e age sobre os itens (ver, editar, aprovar).',
    ],
    whenNotToUse: [
      'Um único registro (ver/editar) — use o template Detalhe/Formulário.',
      'Visão geral com indicadores e gráficos — use o template Dashboard.',
      'Conteúdo visual/heterogêneo em cards — use a variante com DataView no lugar da tabela.',
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
      { name: 'title', type: 'string', default: '—', description: 'Título da página (o `<h1>`). É da MOLDURA, e não de um slot, porque é ele que dá nome à região (`aria-labelledby`) — a moldura não alcança o id de um conteúdo projetado.' },
      { name: 'view', type: "'table' | 'cards'", default: 'table', description: 'Qual bloco está no slot de resultado. NÃO muda o arranjo: quem desenha tabela ou cards é o bloco projetado (data-table × dataview). Sai como `data-view` para CSS, QA e teste identificarem a variante sem adivinhar pelo conteúdo.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Marca a região do resultado com `aria-busy`. O esqueleto de carregamento é do BLOCO, que é quem sabe quantas linhas ou cards desenhar.' },
      // ⛔ REMOVIDO em 04/08/2026: `primaryAction: { label: string }`. Um
      // rótulo sem um output correspondente é um botão que não faz nada. A
      // ação primária entra pelo slot `pageHeader`, já ligada por quem a
      // dispara.
    ],
    outputs: [],
    slots: [
      { name: 'pageHeader', accepts: 'o button da ação primária ("Novo…"), já ligado. O TÍTULO não vem por aqui — é da moldura, senão a região fica sem nome' },
      { name: 'filters', accepts: 'o bloco search-filters (busca + filtros + chips ativos)', optional: true },
      { name: 'results', accepts: 'o bloco data-table (padrão) ou dataview (view=cards)' },
      { name: 'empty', accepts: 'empty-state quando não há resultados', optional: true },
      { name: 'pagination', accepts: 'paginator abaixo dos resultados', optional: true },
    ],
    states: ['default', 'loading', 'vazia', 'sem-filtro-com-resultados'],
    invalidCombinations: [
      { combo: 'resultados fora de um `<main>`/`<section>` rotulado', porque: 'Perde o landmark da página; a navegação por região e o foco de rota deixam de funcionar.' },
      { combo: 'filtros aplicados sem refletir no resultado nem nos chips ativos', porque: 'A pessoa não entende por que a lista encolheu — o search-filters e o resultado precisam andar juntos.' },
      { combo: 'estado vazio idêntico para "sem dados" e "filtro sem resultado"', porque: 'São situações diferentes: uma pede criar o primeiro item; a outra, ajustar o filtro.' },
      { combo: 'dois `<h1>` (um no page-header e outro no resultado)', porque: 'A página tem um único título principal; vários `<h1>` quebram a hierarquia.' },
    ],
  },

  relationships: {
    parents: ['app-shell'],
    children: ['search-filters', 'data-table', 'dataview', 'paginator', 'empty-state', 'heading', 'button'],
    commonlyUsedWith: ['app-shell', 'data-table', 'search-filters', 'empty-state'],
    partOfPatterns: ['listing', 'data-management'],
  },

  tokens: {
    // ✅ DECIDIDO (Indiane, 04/08/2026): título de PÁGINA é `title-lg`,
    // conforme o `design.md`. Ver a nota em `auth.template.meta.ts`.
    typography: 'title-lg (título da página)',
    byState: {
      // O template não inventa cor: herda dos blocos que encaixa.
      cabecalhoPagina: { titulo: 'surface/text' },
      acaoPrimaria: { background: 'primary/500', text: 'primary/contrast' },
    },
    note: 'Espaçamento entre título, filtros, resultado e paginação herda dos tokens do PrimeNG e dos blocos. A única ênfase é a ação primária (primary). Nenhum hex, nenhum nome de marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca repetir o mesmo estado vazio para "ainda não há dados" e "filtro sem resultado".',
      porque: 'São problemas diferentes: um pede criar o primeiro item, o outro pede ajustar/limpar o filtro.',
      emVezDisso: 'Empty-state de "primeiro item" (com ação de criar) vs. de "nada encontrado" (com limpar filtros).',
    },
    {
      regra: 'Nunca usar mais de um `<h1>` na página de listagem.',
      porque: 'Vários títulos principais quebram a hierarquia e confundem a navegação por cabeçalhos.',
      emVezDisso: 'Um `<h1>` no cabeçalho da página; o resto são `<h2>`/`<caption>`.',
    },
    {
      regra: 'Nunca soltar a tabela/cards fora de uma região rotulada.',
      porque: 'Sem `<main>`/`<section aria-label>` a página perde o landmark e o alvo de foco na troca de rota.',
      emVezDisso: 'Envolver o conteúdo num `<main>`/`<section>` com nome (o próprio título).',
    },
  ],

  examples: {
    angular: `<!-- página de listagem dentro do app-shell -->
<section aria-labelledby="titulo-pag">
  <div class="page-header">
    <h1 id="titulo-pag">Escolas</h1>
    <p-button label="Nova escola" severity="primary" icon="fa-solid fa-plus" />
  </div>
  <app-search-filters (filterChange)="filtrar($event)" />
  <app-data-table [columns]="colunas" [rows]="pagina" [total]="total" (pageChange)="paginar($event)" />
</section>`,
    html: `<main id="conteudo">
  <section aria-labelledby="titulo-pag">
    <!-- cabeçalho da página: título + ação primária -->
    <div data-slot="page-header">
      <h1 id="titulo-pag">Escolas</h1>
      <button type="button" data-variant="primary">
        <i class="fa-solid fa-plus" aria-hidden="true"></i> Nova escola
      </button>
    </div>

    <!-- busca + filtros -->
    <form data-block="search-filters" role="search" aria-label="Buscar e filtrar escolas"> … </form>

    <!-- resultado: tabela de dados -->
    <table><!-- bloco data-table --></table>

    <!-- paginação -->
    <nav aria-label="Paginação"><!-- paginator --></nav>
  </section>
</main>`,
    inContext: `<!-- a listagem preenchendo o conteúdo do app-shell -->
<div data-block="app-shell">
  <header data-block="header" role="banner"> … </header>
  <div data-slot="body">
    <nav data-block="sidebar" aria-label="Seções"> … </nav>
    <main id="conteudo">
      <section aria-labelledby="titulo-pag"> … (ver html acima) … </section>
    </main>
  </div>
</div>

<!-- filtro sem resultado → no lugar da tabela: -->
<!-- <div data-block="empty-state">Nenhuma escola encontrada. <button>Limpar filtros</button></div> -->`,
  },

  a11y: {
    role: 'região de página (main/section rotulada) com um único `<h1>`',
    keyboard: [
      'Tab percorre ação primária → filtros → resultado → paginação',
      'ao entrar na página (rota), o foco vai para o `<h1>`/`<main>`',
    ],
    requiredAria: [
      'conteúdo num `<main>`/`<section>` nomeado (aria-labelledby do título)',
      'um único `<h1>` como título da página',
      'busca em `<form role="search">`; resultado com a semântica do seu bloco (tabela/cards)',
      'paginação como `<nav aria-label="Paginação">`; vazio via empty-state',
    ],
    contrastMin: '4.5:1 em textos e no botão; foco visível em todos os controles',
  },

  aiHints: {
    keywords: [
      'listagem', 'página de listagem', 'pagina de listagem', 'listar registros', 'tela de listagem',
      'gerenciar', 'gerenciamento', 'crud', 'lista de registros', 'listing page', 'index page',
      'filtros e tabela', 'tela de gerenciamento', 'grade de registros com filtros',
    ],
    selectionCriteria:
      'Escolha o template Listagem para telas de "gerenciar X": título + ação, busca/filtros, tabela (ou cards) e paginação. Um registro só = Detalhe/Formulário. Indicadores/gráficos = Dashboard.',
    disambiguation: [
      { confundeCom: 'app-shell', criterio: 'App Shell é a moldura (header + sidebar + conteúdo); Listagem é o que preenche o conteúdo numa tela de listar.' },
      { confundeCom: 'data-table', criterio: 'data-table é o bloco da tabela; Listagem é a página inteira (título + filtros + tabela + paginação).' },
      { confundeCom: 'search-filters', criterio: 'search-filters é a barra de busca/filtros; Listagem é a página que a combina com o resultado.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/', // template de composição; sem componente único
    storybookId: 'templates-listing',
    deltaFromPrimeng: 'Template nephos-own (category: layout): compõe page-header + search-filters + data-table (ou dataview) + paginator + empty-state dentro do App Shell. Estrutura semântica com um único `<h1>` e landmarks; ênfase só na ação primária (primary).',
  },
};
