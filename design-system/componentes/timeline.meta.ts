/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · timeline.meta.ts — FAMÍLIA "Exibição de dados" (PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-timeline`. API lida do código real
 * (primeng@21.0.2, `types/primeng-timeline.d.ts`).
 *
 * Linha do tempo de eventos encadeados: cada evento tem um marcador
 * na barra, um conector e um conteúdo (e, opcionalmente, um lado
 * "oposto" com data/hora). Saída do Moses = uma LISTA ORDENADA
 * (`<ol>`) de eventos, com `<time>` para os instantes — a barra e os
 * marcadores são decoração visual (aria-hidden).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const timelineMeta: NephosComponentMeta = {
  identity: {
    id: 'timeline',
    name: 'Timeline',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Sequência de eventos encadeados ao longo de uma barra, cada um com marcador e conteúdo.',
    whenToUse: [
      'Mostrar uma cronologia: histórico de um processo, etapas já ocorridas, rastreamento de um pedido.',
      'Quando a ORDEM temporal dos eventos é a informação principal e cada evento tem um instante associado.',
      'Exibir um lado "oposto" com a data/hora e o outro lado com a descrição do evento.',
    ],
    whenNotToUse: [
      'Passo a passo de um fluxo que a pessoa PERCORRE (avançar/voltar, atual x concluído) — use Stepper.',
      'Lista de itens sem eixo temporal — use DataView ou uma lista simples.',
      'Só duas ou três etapas de progresso de tarefa — um indicador de progresso resolve.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'value',
        type: 'any[]',
        default: '[]',
        description: 'A coleção de eventos, um por marca na linha do tempo. Cada objeto costuma trazer o instante (data/hora), o título e a descrição usados nos templates.',
      },
      {
        name: 'layout',
        type: "'vertical' | 'horizontal'",
        default: 'vertical',
        description: 'Orientação da linha. `vertical` empilha os eventos de cima para baixo (padrão, bom para histórico longo); `horizontal` os dispõe lado a lado (bom para poucas etapas numa faixa).',
      },
      {
        name: 'align',
        type: "'left' | 'right' | 'top' | 'bottom' | 'alternate'",
        default: "'left'",
        description: 'De que lado da barra fica o conteúdo. No layout vertical use `left`/`right` (ou `alternate` para zigue-zague); no horizontal use `top`/`bottom`. Define também para onde vai o template `opposite`.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'content', accepts: 'ng-template pTemplate="content" — o conteúdo do evento (título, texto, ações)' },
      { name: 'opposite', accepts: 'ng-template pTemplate="opposite" — o lado oposto ao conteúdo, tipicamente a data/hora', optional: true },
      { name: 'marker', accepts: 'ng-template pTemplate="marker" — marcador customizado (ícone/cor por tipo de evento)', optional: true },
    ],
    states: ['default'],
    invalidCombinations: [
      {
        combo: 'align="left"/"right" com layout="horizontal" (ou "top"/"bottom" com layout="vertical")',
        porque: 'O alinhamento tem que combinar com a orientação: lados esquerdo/direito só fazem sentido na vertical; topo/base só na horizontal.',
      },
      {
        combo: 'Timeline para um fluxo que a pessoa percorre (com etapa "atual")',
        porque: 'Timeline é um registro de eventos que já têm ordem; quem avança/volta e tem passo atual é o Stepper.',
      },
      {
        combo: 'Marcadores/barra como única forma de transmitir o instante do evento',
        porque: 'A barra e os marcadores são visuais; sem um texto de data/hora (`<time>`) a informação temporal não chega a quem usa leitor de tela.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'page'],
    children: ['tag', 'icon', 'avatar', 'button', 'text', 'heading'],
    commonlyUsedWith: ['card', 'tag', 'avatar'],
    partOfPatterns: ['event-history', 'order-tracking', 'activity-feed'],
  },

  tokens: {
    typography: 'body-lg (conteúdo); caption (data/hora no lado oposto)',
    byState: {
      default: {
        marker: 'primary/color',
        connector: 'surface/200',
        text: 'surface/text',
        'text-suave': 'surface/muted',
      },
    },
    note: 'Cor do marcador varia por PAPEL (primary por padrão; feedback.* para eventos de status). Barra, conector, tamanho do marcador e espaçamento herdam do PrimeNG (timeline.*). Nada de hex, px nem nome de marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar Timeline no lugar de um passo a passo que a pessoa percorre.',
      porque: 'Timeline registra eventos já ordenados; um fluxo com etapa atual, avançar e voltar é outra coisa e confunde quem usa.',
      emVezDisso: 'Stepper para fluxos com progresso e etapa atual; Timeline só para cronologia de eventos.',
    },
    {
      regra: 'Nunca transmitir a ordem/instante só pela barra e pelos marcadores.',
      porque: 'A barra é visual; sem data/hora em texto, quem usa leitor de tela não sabe QUANDO cada evento aconteceu.',
      emVezDisso: 'Um `<time datetime="…">` legível em cada evento e uma lista ordenada (`<ol>`) para a sequência.',
    },
    {
      regra: 'Nunca desenhar a linha do tempo como uma pilha de `<div>` sem semântica de lista ordenada.',
      porque: 'O leitor de tela não anuncia "lista de N eventos" nem a ordem entre eles.',
      emVezDisso: 'Uma `<ol>` com cada evento num `<li>`; os marcadores/conectores ficam aria-hidden.',
    },
    {
      regra: 'Nunca codificar o tipo de evento só pela cor do marcador.',
      porque: 'Cor sozinha não é percebida por todos; "concluído" x "falhou" precisa de mais que verde x vermelho.',
      emVezDisso: 'Um ícone com significado (aria-label) ou um Tag textual junto à cor do marcador.',
    },
  ],

  examples: {
    angular: `<p-timeline [value]="eventos" align="alternate">
  <ng-template pTemplate="opposite" let-e>
    <time [attr.datetime]="e.iso">{{ e.dataLegivel }}</time>
  </ng-template>
  <ng-template pTemplate="content" let-e>
    <h3>{{ e.titulo }}</h3>
    <p>{{ e.descricao }}</p>
  </ng-template>
</p-timeline>`,
    html: `<ol aria-label="Histórico do pedido">
  <li>
    <time datetime="2026-07-20T09:00">20 jul, 09h00</time>
    <div>
      <h3>Pedido recebido</h3>
      <p>Seu pedido entrou na fila de análise.</p>
    </div>
    <span aria-hidden="true" data-role="marker"></span>
  </li>
  <li>
    <time datetime="2026-07-21T14:30">21 jul, 14h30</time>
    <div>
      <h3>Em preparação</h3>
      <p>Documentos conferidos e aprovados.</p>
    </div>
    <span aria-hidden="true" data-role="marker"></span>
  </li>
</ol>`,
    inContext: `<!-- histórico de eventos dentro de um card -->
<article data-block="card">
  <h2>Andamento da solicitação</h2>
  <ol aria-label="Andamento da solicitação">
    <li>
      <time datetime="2026-07-20">20 de julho</time>
      <div>
        <h3>Enviada</h3>
        <span class="tag" data-severity="info">Registrada</span>
      </div>
      <span aria-hidden="true" data-role="marker"></span>
    </li>
    <li>
      <time datetime="2026-07-24">24 de julho</time>
      <div>
        <h3>Aprovada</h3>
        <span class="tag" data-severity="success">Concluída</span>
      </div>
      <span aria-hidden="true" data-role="marker"></span>
    </li>
  </ol>
</article>`,
  },

  a11y: {
    role: 'list (ordenada) de eventos; cada evento um list item',
    keyboard: [
      'Sem teclas próprias — o foco vai para os elementos interativos de dentro (links/botões de cada evento)',
    ],
    requiredAria: [
      'lista ordenada semântica (`<ol>`/`<li>`), não pilha de `<div>`',
      'data/hora em `<time datetime>` legível em cada evento',
      'marcadores/conectores decorativos com aria-hidden',
      'quando é uma região destacada, dar nome à lista (aria-label)',
    ],
    contrastMin: '4.5:1 do texto do evento e da data; 3:1 do marcador contra o fundo se for informativo',
  },

  aiHints: {
    keywords: [
      'timeline', 'linha do tempo', 'cronologia', 'histórico', 'historico', 'eventos',
      'rastreamento', 'acompanhamento', 'andamento', 'sequência de eventos', 'sequencia de eventos',
      'feed de atividades', 'registro de eventos',
    ],
    selectionCriteria:
      'Escolha Timeline quando o EIXO TEMPORAL importa: uma sequência de eventos que já aconteceram, cada um com um instante. Se a pessoa PERCORRE etapas (avançar/voltar, etapa atual), é Stepper. Se são itens sem tempo, é DataView/lista.',
    disambiguation: [
      { confundeCom: 'stepper', criterio: 'Stepper é um fluxo que a pessoa percorre, com etapa ATUAL e avançar/voltar; Timeline é um registro de eventos passados, sem "passo atual".' },
      { confundeCom: 'dataview', criterio: 'DataView é uma coleção de itens (com paginação/ordenação) sem eixo temporal; Timeline organiza eventos por tempo.' },
      { confundeCom: 'accordion', criterio: 'Accordion agrupa seções que expandem/recolhem; Timeline mostra a ordem cronológica de eventos.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/timeline',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Conteúdo por templates (content/opposite/marker); saída = `<ol>` semântica com `<time>` em cada evento; a camada Nephos reforça lista ordenada, data/hora em texto e marcadores decorativos aria-hidden. Ícones internos do PrimeNG são sobrescritos para Font Awesome; ícones de conteúdo que o Moses emite seguem Font Awesome 7 Pro.',
  },
};
