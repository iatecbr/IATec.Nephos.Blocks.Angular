/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · carousel.meta.ts — FAMÍLIA "Exibição de dados" (PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-carousel`. API lida do código real
 * (primeng@21.0.2, `types/primeng-carousel.d.ts`).
 *
 * Slider de conteúdo: mostra N itens por vez numa faixa e desliza para
 * revelar os demais, com botões de navegação e indicadores (bolinhas).
 * Cada item é livre (template). Saída do Moses = uma região rotulada
 * com uma LISTA de itens e controles reais (`<button>`); a rolagem é
 * comportamento, não muda a semântica da lista.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const carouselMeta: NephosComponentMeta = {
  identity: {
    id: 'carousel',
    name: 'Carousel',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Faixa deslizante que mostra alguns itens por vez e navega pelos demais com botões e indicadores.',
    whenToUse: [
      'Espaço limitado com uma coleção pequena/média de itens visuais equivalentes (destaques, cards de produto, depoimentos).',
      'Quando faz sentido ver poucos itens por vez e deslizar para os próximos (numVisible + numScroll).',
      'Vitrine/destaque onde economizar altura da tela importa mais que ver tudo de uma vez.',
    ],
    whenNotToUse: [
      'Coleção que a pessoa precisa comparar ou varrer inteira — use DataView (grade/lista com paginação).',
      'Galeria de imagens com miniaturas e ampliação — use Galleria.',
      'Conteúdo essencial que não pode ficar escondido atrás de um slide (risco de nunca ser visto).',
    ],
  },

  api: {
    inputs: [
      {
        name: 'value',
        type: 'any[]',
        default: 'null',
        description: 'A coleção de itens exibida no carrossel. Cada item é desenhado pelo template `item`.',
      },
      {
        name: 'numVisible',
        type: 'number',
        default: '1',
        description: 'Quantos itens aparecem ao mesmo tempo na faixa. Ajuste por breakpoint via `responsiveOptions` (ex.: 3 no desktop, 1 no celular).',
      },
      {
        name: 'numScroll',
        type: 'number',
        default: '1',
        description: 'Quantos itens avançam a cada clique de navegação. Costuma acompanhar `numVisible` (ex.: rolar de 3 em 3).',
      },
      {
        name: 'responsiveOptions',
        type: 'CarouselResponsiveOptions[]',
        default: '—',
        description: 'Ajusta `numVisible`/`numScroll` por largura de tela (breakpoint). Essencial para o carrossel não espremer itens no celular.',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: 'horizontal',
        description: 'Sentido do deslize. `horizontal` (padrão) desliza para os lados; `vertical` empilha e desliza para cima/baixo (exige `verticalViewPortHeight`).',
      },
      {
        name: 'verticalViewPortHeight',
        type: 'string',
        default: '—',
        description: 'Altura visível da faixa no modo vertical (ex.: "360px"). Só se aplica quando `orientation="vertical"`.',
      },
      {
        name: 'circular',
        type: 'boolean',
        default: 'false',
        description: 'Rolagem infinita: ao passar do último item volta ao primeiro. Ligar junto com `autoplayInterval` para a apresentação não travar no fim.',
      },
      {
        name: 'showNavigators',
        type: 'boolean',
        default: 'true',
        description: 'Mostra os botões anterior/próximo. Manter ligados: são o controle de navegação acessível por teclado.',
      },
      {
        name: 'showIndicators',
        type: 'boolean',
        default: 'true',
        description: 'Mostra os indicadores (bolinhas) que apontam a página atual e permitem pular direto.',
      },
      {
        name: 'autoplayInterval',
        type: 'number',
        default: '0',
        description: 'Milissegundos entre avanços automáticos. 0 (padrão) desliga o autoplay. Se ligar, ofereça pausa e evite conteúdo que exija leitura calma.',
      },
      {
        name: 'page',
        type: 'number',
        default: '0',
        description: 'Índice da página atual (controlável). Use para ler/definir em qual grupo de itens o carrossel está.',
      },
      {
        name: 'prevButtonProps',
        type: 'ButtonProps',
        default: '—',
        description: 'Propriedades repassadas ao botão "anterior" (ex.: aria-label). Use para dar um rótulo claro ao controle.',
      },
      {
        name: 'nextButtonProps',
        type: 'ButtonProps',
        default: '—',
        description: 'Propriedades repassadas ao botão "próximo" (ex.: aria-label). Use para dar um rótulo claro ao controle.',
      },
    ],
    outputs: [
      { name: 'onPage', payload: 'CarouselPageEvent { page }', description: 'Emitido após deslizar — informa a nova página atual.' },
    ],
    slots: [
      { name: 'item', accepts: 'ng-template pTemplate="item" — como desenhar cada item da faixa' },
      { name: 'header', accepts: 'ng-template pTemplate="header" (ou <p-header>) — cabeçalho acima do carrossel', optional: true },
      { name: 'footer', accepts: 'ng-template pTemplate="footer" (ou <p-footer>) — rodapé abaixo do carrossel', optional: true },
      { name: 'previousicon', accepts: 'ng-template pTemplate="previousicon" — ícone do botão anterior', optional: true },
      { name: 'nexticon', accepts: 'ng-template pTemplate="nexticon" — ícone do botão próximo', optional: true },
    ],
    states: ['default', 'first-page', 'last-page', 'autoplay', 'paused'],
    invalidCombinations: [
      {
        combo: 'orientation="vertical" sem `verticalViewPortHeight`',
        porque: 'No modo vertical a faixa precisa de uma altura visível definida, senão o deslize não tem viewport para acontecer.',
      },
      {
        combo: 'autoplayInterval > 0 sem forma de pausar',
        porque: 'Conteúdo que se move sozinho e não pode ser pausado atrapalha a leitura e viola critérios de acessibilidade (WCAG 2.2.2).',
      },
      {
        combo: 'showNavigators=false e showIndicators=false',
        porque: 'Sem botões nem indicadores não há como navegar por teclado nem saber que existem mais itens.',
      },
      {
        combo: 'Carousel para dados que a pessoa precisa comparar ou varrer inteiros',
        porque: 'O carrossel esconde itens atrás de slides; comparar exige ver tudo lado a lado (DataView/Table).',
      },
    ],
  },

  relationships: {
    parents: ['card', 'page'],
    children: ['card', 'image', 'button', 'tag', 'icon-button'],
    commonlyUsedWith: ['card', 'image', 'button'],
    partOfPatterns: ['highlights', 'product-showcase', 'testimonials'],
  },

  tokens: {
    typography: 'body-lg (itens)',
    byState: {
      default: { text: 'surface/text', indicator: 'surface/300' },
      active: { indicator: 'primary/color' },
    },
    note: 'Botões de navegação e indicadores herdam a geometria e as cores do PrimeNG (carousel.*/button.*). O indicador ativo usa o papel `primary`. Espaçamento e tamanho da faixa herdam do componente. Nada de hex, px nem nome de marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca colocar conteúdo essencial dentro de um carrossel.',
      porque: 'Slides além do primeiro raramente são vistos; informação importante escondida atrás de um deslize se perde.',
      emVezDisso: 'Deixar o essencial visível na página e usar o carrossel só para destaques equivalentes e opcionais.',
    },
    {
      regra: 'Nunca ligar autoplay sem oferecer pausa.',
      porque: 'Conteúdo que se move sozinho atrapalha a leitura e quebra a acessibilidade (WCAG 2.2.2).',
      emVezDisso: 'Autoplay opcional com botão de pausar/continuar e que pare ao receber foco ou hover.',
    },
    {
      regra: 'Nunca usar Carousel para uma coleção que precisa ser comparada ou varrida inteira.',
      porque: 'Esconder itens atrás de slides impede comparar e faz a pessoa perder a visão do conjunto.',
      emVezDisso: 'DataView (grade/lista paginada) quando o conjunto importa; Carousel só para poucos destaques.',
    },
    {
      regra: 'Nunca navegar o carrossel só por gesto de arrastar, sem botões acessíveis.',
      porque: 'Quem usa teclado ou leitor de tela fica sem como avançar os itens.',
      emVezDisso: 'Botões anterior/próximo reais (`<button>` com aria-label) e indicadores focáveis, além do swipe.',
    },
  ],

  examples: {
    angular: `<p-carousel [value]="destaques" [numVisible]="3" [numScroll]="3"
  [circular]="true" [showIndicators]="true" [showNavigators]="true"
  [responsiveOptions]="responsive">
  <ng-template pTemplate="item" let-d>
    <article class="card">
      <img [src]="d.img" [alt]="d.alt" />
      <h3>{{ d.titulo }}</h3>
    </article>
  </ng-template>
</p-carousel>`,
    html: `<section aria-roledescription="carrossel" aria-label="Destaques">
  <button type="button" aria-label="Anterior">
    <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
  </button>
  <ul>
    <li>
      <article class="card">
        <img src="/destaque-1.jpg" alt="Alunos recebendo bolsa" />
        <h3>Campanha de bolsas 2026</h3>
      </article>
    </li>
    <li aria-hidden="true">
      <article class="card">
        <img src="/destaque-2.jpg" alt="" />
        <h3>Novo edital publicado</h3>
      </article>
    </li>
  </ul>
  <button type="button" aria-label="Próximo">
    <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
  </button>
  <div role="tablist" aria-label="Selecionar slide">
    <button type="button" role="tab" aria-selected="true" aria-label="Slide 1"></button>
    <button type="button" role="tab" aria-selected="false" aria-label="Slide 2"></button>
  </div>
</section>`,
    inContext: `<!-- faixa de destaques no topo de uma página -->
<section aria-roledescription="carrossel" aria-label="Destaques da semana">
  <button type="button" aria-label="Destaque anterior">
    <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
  </button>
  <ul class="carousel-track">
    <li><article class="card"><h3>Edital aberto</h3></article></li>
    <li><article class="card"><h3>Resultado divulgado</h3></article></li>
    <li><article class="card"><h3>Prazo final</h3></article></li>
  </ul>
  <button type="button" aria-label="Próximo destaque">
    <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
  </button>
</section>`,
  },

  a11y: {
    role: 'region com aria-roledescription="carrossel"; itens numa lista',
    keyboard: [
      'Tab alcança os botões anterior/próximo e os indicadores',
      'Enter/Espaço aciona o botão ou o indicador focado',
      'Setas navegam entre os indicadores (padrão do PrimeNG)',
    ],
    requiredAria: [
      'região com nome (aria-label) e aria-roledescription="carrossel"',
      'botões anterior/próximo como `<button>` com aria-label claro',
      'indicadores focáveis com estado (aria-selected/aria-pressed) apontando o slide atual',
      'autoplay pausável; itens fora de vista com aria-hidden enquanto ocultos',
    ],
    contrastMin: '4.5:1 do texto dos itens; 3:1 dos controles e do indicador ativo',
  },

  aiHints: {
    keywords: [
      'carousel', 'carrossel', 'slider', 'slide', 'faixa deslizante', 'destaques',
      'vitrine', 'showcase', 'depoimentos', 'banner rotativo', 'itens deslizantes',
      'passar itens', 'rotativo',
    ],
    selectionCriteria:
      'Escolha Carousel para uma coleção pequena de itens VISUAIS equivalentes que cabem numa faixa e podem ser deslizados, quando economizar espaço vale mais que ver tudo. Se a pessoa precisa comparar/varrer o conjunto, use DataView; se é galeria de fotos com miniaturas e zoom, use Galleria.',
    disambiguation: [
      { confundeCom: 'galleria', criterio: 'Galleria é galeria de IMAGENS com miniaturas, indicadores e ampliação em tela cheia; Carousel é um slider genérico de itens (não só fotos).' },
      { confundeCom: 'dataview', criterio: 'DataView mostra a coleção inteira em grade/lista com paginação (para varrer/comparar); Carousel esconde itens atrás de slides.' },
      { confundeCom: 'image', criterio: 'Image é uma foto única (com preview); Carousel é uma faixa de vários itens que desliza.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/carousel',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Itens por template `item`; saída = região rotulada (aria-roledescription="carrossel") com lista de itens e controles `<button>` reais; a camada Nephos reforça autoplay pausável, navegação por teclado e itens ocultos com aria-hidden. Setas de navegação internas do PrimeNG são sobrescritos para Font Awesome; ícones de conteúdo que o Moses emite seguem Font Awesome 7 Pro.',
  },
};
