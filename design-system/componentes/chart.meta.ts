/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · chart.meta.ts — ONDA "NICHO" (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-chart`. API lida do código real
 * (primeng@21.0.2, `types/primeng-chart.d.ts`).
 *
 * Wrapper do Chart.js: desenha o gráfico num `<canvas>`. O conteúdo é
 * pixel (não DOM), então a acessibilidade EXIGE uma alternativa textual
 * — resumo em texto ou uma `<table>` com os mesmos dados. O Moses emite
 * o canvas rotulado MAIS a alternativa; nunca o canvas sozinho.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const chartMeta: NephosComponentMeta = {
  identity: {
    id: 'chart',
    name: 'Chart',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Gráfico (barras, linha, pizza…) desenhado em canvas via Chart.js.',
    whenToUse: [
      'Mostrar relações/tendências entre valores: evolução no tempo (line), comparação de categorias (bar), parte-do-todo (pie/doughnut).',
      'Quando a forma visual comunica o padrão melhor que uma tabela de números.',
    ],
    whenNotToUse: [
      'Mostrar UM número-chave (total, %) — use um indicador/KPI simples ou Tag, não um gráfico.',
      'Andamento de uma tarefa — use ProgressBar.',
      'Dados que a pessoa precisa ler valor a valor ou ordenar/filtrar — use DataTable.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'type',
        type: "'bar' | 'line' | 'scatter' | 'bubble' | 'pie' | 'doughnut' | 'polarArea' | 'radar'",
        default: '(obrigatório)',
        description: 'Tipo de gráfico. Escolher pelo que se quer comunicar: `line` para tendência no tempo, `bar` para comparar categorias, `pie`/`doughnut` para parte-do-todo, `radar` para perfil multidimensional. Não trocar o tipo só por estética.',
      },
      {
        name: 'data',
        type: 'any (Chart.js data: { labels, datasets })',
        default: '(obrigatório)',
        description: 'Os dados no formato do Chart.js: `labels` (categorias/eixos) e `datasets` (as séries). É a fonte da verdade — a alternativa textual deve refletir os mesmos números.',
      },
      {
        name: 'options',
        type: 'any (Chart.js options)',
        default: '—',
        description: 'Configuração do Chart.js (escalas, legenda, tooltips, cores). ⚠️ Cores das séries devem vir da paleta por papel + passo (primary, feedback.*), NUNCA hex arbitrário — puxar dos tokens do tema, não fixar no olho.',
      },
      {
        name: 'plugins',
        type: 'any[]',
        default: '[]',
        description: 'Plugins do Chart.js por gráfico (rótulos de dados, anotações etc.). Uso avançado; manter mínimo.',
      },
      {
        name: 'responsive',
        type: 'boolean',
        default: 'true',
        description: 'Redesenha o gráfico quando o contêiner muda de tamanho. Manter ligado para acompanhar layouts fluidos.',
      },
      {
        name: 'width',
        type: 'string',
        default: '—',
        description: 'Largura do canvas. Definir width/height (ou um contêiner com proporção) evita o gráfico "esticar" ou saltar ao carregar.',
      },
      {
        name: 'height',
        type: 'string',
        default: '—',
        description: 'Altura do canvas. Ver width.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: '—',
        description: 'Nome acessível do gráfico (o que ele mostra). O canvas é opaco ao leitor de tela: sem este rótulo (ou ariaLabelledBy) o gráfico é invisível para quem não vê a imagem.',
      },
      {
        name: 'ariaLabelledBy',
        type: 'string',
        default: '—',
        description: 'IDs de elementos que rotulam o gráfico (ex.: o título/legenda em texto). Alternativa ao ariaLabel quando o rótulo já existe na página.',
      },
    ],
    outputs: [
      { name: 'onDataSelect', payload: '{ originalEvent, element, dataset }', description: 'Emitido ao clicar num ponto/barra/fatia do gráfico. Usar para detalhar/filtrar — mas a mesma ação precisa existir por caminho acessível (não só o clique no canvas).' },
    ],
    slots: [],
    states: ['default', 'empty', 'loading'],
    invalidCombinations: [
      {
        combo: 'gráfico sem alternativa textual (resumo ou tabela) e sem ariaLabel',
        porque: 'O canvas é pixel puro: quem usa leitor de tela não recebe NADA da informação.',
      },
      {
        combo: 'cores das séries em hex arbitrário no `options`',
        porque: 'Quebra o tema/fidelidade e pode ferir o contraste; as cores devem vir da paleta por papel.',
      },
      {
        combo: 'pie/doughnut com muitas fatias (>5–6)',
        porque: 'Fatias finas ficam ilegíveis e indistinguíveis; comparar categorias assim falha — use bar.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'page', 'dialog'],
    children: [],
    commonlyUsedWith: ['card', 'select', 'datatable', 'tag', 'skeleton'],
    partOfPatterns: ['dashboard', 'report', 'analytics'],
  },

  tokens: {
    typography: 'caption (rótulos de eixo/legenda)',
    byState: {
      default: { series: 'primary/color', axis: 'surface/text-muted', grid: 'surface/200' },
    },
    note: 'Cores das séries por papel + passo (primary para a série principal; feedback.* para estados como sucesso/erro; surface para eixos/grade). Aplicar via `options`, puxando dos tokens do tema — nunca hex. Tamanho herda do contêiner.',
  },

  antiPatterns: [
    {
      regra: 'Nunca emitir o gráfico sem alternativa textual acessível.',
      porque: 'O canvas não expõe conteúdo ao leitor de tela; a informação some para quem não vê a imagem.',
      emVezDisso: 'ariaLabel/ariaLabelledBy descrevendo o gráfico + um resumo em texto ou uma `<table>` com os mesmos dados (visível ou visually-hidden).',
    },
    {
      regra: 'Nunca definir cores das séries com hex no olho.',
      porque: 'Foge da paleta, quebra o tema entre marcas e pode reprovar no contraste.',
      emVezDisso: 'Cores por papel + passo (primary, feedback.*) puxadas dos tokens, aplicadas no `options`.',
    },
    {
      regra: 'Nunca usar gráfico para exibir um único número.',
      porque: 'Um gráfico para um valor só adiciona ruído e esconde o dado que importa.',
      emVezDisso: 'Um indicador/KPI textual (número grande + rótulo) ou uma Tag.',
    },
  ],

  examples: {
    angular: `<p-chart type="bar" [data]="dadosBolsas" [options]="opcoes"
  ariaLabelledBy="titulo-grafico" width="480" height="280" />`,
    html: `<!-- canvas rotulado + tabela alternativa com os mesmos dados -->
<figure>
  <figcaption id="titulo-grafico">Bolsas concedidas por nível (2026)</figcaption>
  <canvas role="img" aria-labelledby="titulo-grafico" width="480" height="280"></canvas>
  <table class="visually-hidden">
    <caption>Bolsas concedidas por nível</caption>
    <thead><tr><th scope="col">Nível</th><th scope="col">Bolsas</th></tr></thead>
    <tbody>
      <tr><td>Infantil</td><td>120</td></tr>
      <tr><td>Fundamental</td><td>340</td></tr>
      <tr><td>Médio</td><td>210</td></tr>
    </tbody>
  </table>
</figure>`,
    inContext: `<!-- painel de indicadores num card -->
<article data-block="card">
  <h3 id="g-status">Status das solicitações</h3>
  <canvas role="img" aria-labelledby="g-status" height="240"></canvas>
  <table class="visually-hidden" aria-hidden="false">
    <caption>Status das solicitações</caption>
    <thead><tr><th scope="col">Status</th><th scope="col">Total</th></tr></thead>
    <tbody>
      <tr><td>Aprovadas</td><td>58</td></tr>
      <tr><td>Pendentes</td><td>23</td></tr>
      <tr><td>Negadas</td><td>9</td></tr>
    </tbody>
  </table>
</article>`,
  },

  a11y: {
    role: 'img (o canvas descreve uma imagem) + tabela/texto alternativo',
    keyboard: [
      'o canvas em si não é operável por teclado',
      'ações do gráfico (detalhar/filtrar) precisam existir por controle focável fora do canvas',
    ],
    requiredAria: [
      'ariaLabel ou ariaLabelledBy nomeando o que o gráfico mostra; role="img" no canvas',
      'alternativa textual equivalente: resumo em prosa OU `<table>` com os mesmos dados',
      'não depender só de cor para distinguir séries (usar rótulos/padrões)',
    ],
    contrastMin: '3:1 das séries entre si e sobre o fundo; 4.5:1 dos rótulos de eixo/legenda',
  },

  aiHints: {
    keywords: [
      'chart', 'gráfico', 'grafico', 'gráficos', 'graficos', 'dashboard', 'painel',
      'barras', 'linha', 'pizza', 'rosca', 'doughnut', 'radar', 'estatística', 'estatistica',
      'indicadores', 'analytics', 'relatório visual', 'relatorio visual',
    ],
    selectionCriteria:
      'Escolha Chart para comunicar RELAÇÕES/TENDÊNCIAS entre valores em forma visual. Tipo pelo objetivo: line=tempo, bar=comparação, pie/doughnut=parte-do-todo. Um número só = KPI/Tag; ler valor a valor = DataTable; andamento = ProgressBar. Sempre com alternativa textual.',
    disambiguation: [
      { confundeCom: 'datatable', criterio: 'DataTable = ler/ordenar/filtrar valores exatos; Chart = enxergar o padrão. Muitas vezes andam juntos (o gráfico é o resumo visual da tabela).' },
      { confundeCom: 'progressbar', criterio: 'ProgressBar = andamento de UMA tarefa (0–100%); Chart = comparar várias medidas.' },
      { confundeCom: 'knob', criterio: 'Knob/medidor = um valor único num mostrador; Chart = uma série de dados.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/chart',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng, wrapper do Chart.js). A camada Nephos reforça a alternativa textual obrigatória (o canvas é opaco à a11y) e as cores das séries por papel + passo (nunca hex).',
  },
};
