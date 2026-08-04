/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · dashboard.template.meta.ts — TEMPLATE #5 (painel/visão geral)
 * ─────────────────────────────────────────────────────────────
 * category: 'layout' · origin: 'nephos-own'
 * A página de VISÃO GERAL: uma grade de widgets — cartões de indicadores
 * (KPIs), gráficos e barras de composição — para acompanhar números-chave
 * e tendências de relance. Vive dentro da área de conteúdo do App Shell.
 *
 * Compõe (nos slots): page-header (heading + filtro de período) +
 * cartões de KPI (card + número + tag de variação) + chart (gráficos) +
 * metergroup (composição) + tag/badge (status).
 * Saída do Moses = um `<main>` com um `<h1>` e cada widget como
 * `<section>` rotulada (`<h2>`), com alternativa textual nos gráficos.
 *
 * ⚠️ Gráfico = `<canvas>` opaco para a tecnologia assistiva: SEMPRE uma
 * alternativa em texto (aria-label + resumo/tabela). E a VARIAÇÃO de um
 * KPI nunca é só cor/seta — tem sinal + texto ("+8% vs. mês anterior").
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const dashboardTemplateMeta: NephosComponentMeta = {
  identity: {
    id: 'dashboard',
    name: 'Dashboard',
    category: 'layout',
    status: 'beta',
    version: '0.1.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Painel de visão geral: cartões de indicadores (KPIs), gráficos e composições, em grade.',
    whenToUse: [
      'Página inicial/visão geral de uma área — acompanhar números-chave e tendências de relance.',
      'Quando a pessoa precisa comparar indicadores e ver a composição/evolução sem entrar em cada registro.',
    ],
    whenNotToUse: [
      'Listar ou editar registros — use Listagem ou Detalhe/Formulário.',
      'Um único gráfico isolado numa tela — é só o componente chart, não um painel.',
      'Um relatório denso, longo e textual — é um documento, não um dashboard.',
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
      { name: 'title', type: 'string', default: '—', description: 'Título do painel (o `<h1>`). É da MOLDURA porque é ele que dá nome à região (`aria-labelledby`).' },
      { name: 'period', type: "'dia' | 'semana' | 'mês' | 'ano'", default: 'mês', description: 'Janela de tempo em vigor. Quem troca é o filtro projetado; a moldura REAGE — põe o período em texto num `role="status"`, para a atualização ser anunciada a quem ouve a tela. Sai também como `data-period`.' },
      { name: 'columns', type: "2 | 3 | 4", default: '4', description: 'Colunas da grade de KPIs no desktop; sempre 1 no mobile. É da moldura: cada cartão decidindo a sua daria uma parede desalinhada.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Marca a grade com `aria-busy`. O esqueleto é de cada widget, que é quem sabe a própria forma.' },
    ],
    // ⛔ REMOVIDOS em 04/08/2026: `periodChange` e `widgetDrill`. O filtro de
    // período e os widgets são projetados; quem os tem já está ligado neles.
    outputs: [],
    slots: [
      { name: 'pageHeader', accepts: 'o filtro de período (select/segmented), já ligado a quem recalcula. O TÍTULO não vem por aqui — é da moldura' },
      { name: 'kpiGrid', accepts: 'cartões de KPI: card + número grande + tag de variação (sinal + texto)' },
      { name: 'charts', accepts: 'gráficos (chart) dentro de card, cada um com título e alternativa textual' },
      { name: 'breakdown', accepts: 'metergroup (composição por categoria) com legenda rotulada', optional: true },
      { name: 'activity', accepts: 'lista de atividades recentes / mini-tabela', optional: true },
    ],
    states: ['default', 'loading', 'vazio', 'periodo-trocado'],
    invalidCombinations: [
      { combo: 'variação de KPI sinalizada só por cor/seta', porque: 'Cor e seta sozinhas não são percebidas por todos nem anunciadas — falta o sinal + texto.' },
      { combo: 'gráfico (`<canvas>`) sem alternativa em texto', porque: 'O canvas é opaco para a tecnologia assistiva; sem resumo/tabela, o dado se perde.' },
      { combo: 'muitos widgets todos coloridos com a mesma ênfase', porque: 'Se tudo grita, nada se destaca — a hierarquia do painel se perde.' },
      { combo: 'número grande sem rótulo nem período', porque: '"1.240" sozinho não diz do quê nem de quando — perde o significado.' },
    ],
  },

  relationships: {
    parents: ['app-shell'],
    children: ['card', 'chart', 'metergroup', 'tag', 'badge', 'heading', 'skeleton', 'select'],
    commonlyUsedWith: ['app-shell', 'card', 'chart', 'metergroup'],
    partOfPatterns: ['dashboard'],
  },

  tokens: {
    // ✅ DECIDIDO (Indiane, 04/08/2026): título de PÁGINA é `title-lg`,
    // conforme o `design.md`. O `title-sm` segue valendo para o título de
    // cada widget, que é um nível abaixo. Ver a nota em `auth.template.meta.ts`.
    typography: 'title-lg (título da página e número do KPI) · title-sm (título de widget) · caption (rótulo)',
    byState: {
      // O template não inventa cor: herda dos cartões, gráficos e das superfícies.
      widget: { background: 'surface/0', border: 'surface/200' },
      numero: { text: 'surface/text' },
      variacaoPositiva: { text: 'feedback.success/600' },
      variacaoNegativa: { text: 'feedback.danger/600' },
    },
    note: 'Cada widget é um card (raio/sombra herdados). O número do KPI usa a escala nomeada title-lg; a variação usa feedback.success/danger por PAPEL (nunca só cor — sempre com sinal + texto). Uma única ênfase de marca por região. Nenhum hex, nenhum nome de marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca sinalizar a variação de um KPI só por cor ou seta.',
      porque: 'Verde/vermelho e ▲/▼ sozinhos não são percebidos por todos nem anunciados.',
      emVezDisso: 'Sinal + texto ("+8% vs. mês anterior") além da cor; a seta é decorativa (aria-hidden).',
    },
    {
      regra: 'Nunca deixar um gráfico sem alternativa em texto.',
      porque: 'O `<canvas>` é opaco para a tecnologia assistiva; sem resumo, o dado não chega a quem não vê.',
      emVezDisso: 'aria-label com o resumo do gráfico e/ou uma tabela equivalente (visualmente oculta ou em "ver dados").',
    },
    {
      regra: 'Nunca colorir todos os widgets com a mesma ênfase forte.',
      porque: 'Se tudo é destaque, nada é — a leitura do painel vira ruído.',
      emVezDisso: 'Neutro por padrão; a ênfase (primary/feedback) só onde há um sinal a dar (meta, alerta, variação).',
    },
    {
      regra: 'Nunca mostrar um número grande sem rótulo nem período.',
      porque: 'Um valor solto não diz do quê é nem de quando — perde o significado.',
      emVezDisso: 'Todo KPI com rótulo (`<h2>`) e o período de referência visível.',
    },
  ],

  examples: {
    angular: `<!-- painel dentro do app-shell -->
<section aria-labelledby="dt">
  <div class="page-header">
    <h1 id="dt">Painel de bolsas</h1>
    <p-select [(ngModel)]="periodo" [options]="periodos" />
  </div>
  <div class="kpis">
    <article class="stat"><h2>Bolsas concedidas</h2><p class="num">1.240</p>
      <p-tag severity="success" value="+8% vs. mês anterior" /></article>
  </div>
  <article class="chartcard"><h2 id="c1">Bolsas por mês</h2>
    <p-chart type="bar" [data]="dados" [attr.aria-label]="resumoGrafico" /></article>
</section>`,
    html: `<main id="conteudo">
  <section aria-labelledby="dt">
    <div data-slot="page-header">
      <h1 id="dt">Painel de bolsas</h1>
      <label for="per">Período</label>
      <select id="per"><option>Este mês</option><option>Este ano</option></select>
    </div>

    <!-- KPIs: cada um é um card com rótulo, número e variação (sinal + texto) -->
    <div data-slot="kpi-grid">
      <section class="stat" aria-labelledby="k1">
        <h2 id="k1">Bolsas concedidas</h2>
        <p class="num">1.240</p>
        <span data-block="tag" data-variant="success"><span aria-hidden="true">▲</span> +8% vs. mês anterior</span>
      </section>
      <section class="stat" aria-labelledby="k2">
        <h2 id="k2">Escolas com meta atingida</h2>
        <p class="num">38 <small>de 52</small></p>
        <span data-block="tag" data-variant="warn"><span aria-hidden="true">▼</span> −3 vs. mês anterior</span>
      </section>
    </div>

    <!-- Gráfico: canvas + alternativa textual -->
    <section class="chartcard" aria-labelledby="c1">
      <h2 id="c1">Bolsas concedidas por mês</h2>
      <canvas role="img" aria-label="Gráfico de barras: bolsas concedidas subiram de 890 em janeiro para 1.240 em junho."></canvas>
      <details><summary>Ver dados</summary>
        <table><caption class="vh">Bolsas por mês</caption>
          <tr><th scope="row">Jan</th><td>890</td></tr>
          <tr><th scope="row">Jun</th><td>1.240</td></tr>
        </table>
      </details>
    </section>

    <!-- Composição: metergroup com legenda -->
    <section class="breakdown" aria-labelledby="c2">
      <h2 id="c2">Distribuição por categoria</h2>
      <div role="meter" aria-label="Distribuição de bolsas" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><!-- metergroup --></div>
    </section>
  </section>
</main>`,
    inContext: `<!-- o painel preenchendo o conteúdo do app-shell -->
<div data-block="app-shell">
  <header data-block="header" role="banner"> … </header>
  <div data-slot="body">
    <nav data-block="sidebar" aria-label="Seções"> … </nav>
    <main id="conteudo">
      <section aria-labelledby="dt"> … (ver html acima) … </section>
    </main>
  </div>
</div>`,
  },

  a11y: {
    role: 'região de página (main/section rotulada) com um `<h1>`; cada widget é uma `<section>` com `<h2>`',
    keyboard: [
      'Tab percorre o filtro de período e os widgets interativos',
      'gráficos e KPIs não interativos não recebem foco (são conteúdo)',
      'ao trocar o período, a atualização é anunciada (aria-live)',
    ],
    requiredAria: [
      'um `<main>` com um único `<h1>`; cada widget em `<section>` com `<h2>`',
      'cada KPI com rótulo e a variação em texto (não só cor/seta)',
      'cada gráfico com aria-label (resumo) e/ou tabela equivalente',
      'números alinhados com tabular-nums; contexto de período visível',
    ],
    contrastMin: '4.5:1 em textos e números; 3:1 em séries de gráfico e barras; a cor da variação nunca é o único sinal',
  },

  aiHints: {
    keywords: [
      'dashboard', 'painel', 'painel de indicadores', 'painel de controle', 'visão geral', 'visao geral',
      'kpis', 'indicadores', 'métricas', 'metricas', 'widgets', 'resumo', 'overview', 'home do sistema',
      'estatísticas', 'estatisticas', 'grade de widgets', 'cartões de indicadores',
    ],
    selectionCriteria:
      'Escolha o template Dashboard para a VISÃO GERAL: grade de KPIs, gráficos e composições. Gerenciar registros = Listagem; um registro = Detalhe. Um único gráfico = o componente chart.',
    disambiguation: [
      { confundeCom: 'listing', criterio: 'Listagem é para gerenciar VÁRIOS registros (tabela/cards); Dashboard é a visão geral de números e tendências.' },
      { confundeCom: 'chart', criterio: 'chart é UM gráfico; Dashboard é a página com vários widgets (KPIs + gráficos + composição).' },
      { confundeCom: 'card', criterio: 'card é UM cartão; Dashboard é a grade de cartões/widgets de indicadores.' },
      { confundeCom: 'metergroup', criterio: 'metergroup é UMA barra de composição; Dashboard pode conter vários widgets, incluindo um metergroup.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/', // template de composição; sem componente único
    storybookId: 'templates-dashboard',
    deltaFromPrimeng: 'Template nephos-own (category: layout): compõe page-header + cartões de KPI (card + número + tag de variação) + chart + metergroup, em grade, dentro do App Shell. `<main>` com um `<h1>`, widgets como `<section>`/`<h2>`; gráficos com alternativa textual; variação por feedback.success/danger com sinal + texto.',
  },
};
