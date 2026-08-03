/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · galleria.meta.ts — FAMÍLIA "Exibição de dados" (PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-galleria`. API lida do código real
 * (primeng@21.0.2, `types/primeng-galleria.d.ts`).
 *
 * Galeria avançada de imagens: uma imagem grande em foco + tira de
 * miniaturas para trocar, indicadores, navegação e um modo tela cheia
 * (lightbox). Saída do Moses = uma figura em foco com `alt`, uma LISTA
 * de miniaturas como `<button>` reais e controles semânticos; o modo
 * fullscreen é um diálogo modal com foco preso e Esc para fechar.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const galleriaMeta: NephosComponentMeta = {
  identity: {
    id: 'galleria',
    name: 'Galleria',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Galeria de imagens com uma foto em foco, tira de miniaturas e ampliação em tela cheia.',
    whenToUse: [
      'Apresentar um conjunto de imagens relacionadas onde a pessoa escolhe qual ver em destaque (fotos de um produto, de um evento, de uma escola).',
      'Quando as miniaturas ajudam a navegar e o detalhe de cada imagem justifica ampliar (lightbox/fullScreen).',
      'Precisa de indicadores, legenda por imagem e/ou apresentação automática (autoPlay).',
    ],
    whenNotToUse: [
      'Uma única imagem de conteúdo — use Image (com preview, se precisar ampliar).',
      'Itens não fotográficos que deslizam numa faixa (cards, depoimentos) — use Carousel.',
      'Coleção que a pessoa precisa varrer/comparar inteira — use DataView.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'value',
        type: 'any[]',
        default: '—',
        description: 'A coleção de imagens (uma por item). Cada item costuma trazer a URL da imagem grande, a da miniatura, o `alt` e a legenda usados nos templates.',
      },
      {
        name: 'activeIndex',
        type: 'number',
        default: '0',
        description: 'Índice da imagem em foco (controlável). Use para ler/definir qual imagem está em destaque.',
      },
      {
        name: 'fullScreen',
        type: 'boolean',
        default: 'false',
        description: 'Modo tela cheia (lightbox): a galeria abre sobre uma máscara modal, ativada por `visible`. `false` (padrão) embute a galeria na página.',
      },
      {
        name: 'visible',
        type: 'boolean',
        default: 'false',
        description: 'Só no modo `fullScreen`: controla a visibilidade da máscara em tela cheia (abrir/fechar o lightbox).',
      },
      {
        name: 'numVisible',
        type: 'number',
        default: '3',
        description: 'Quantas miniaturas aparecem por vez na tira. Ajuste por breakpoint via `responsiveOptions`.',
      },
      {
        name: 'responsiveOptions',
        type: 'GalleriaResponsiveOptions[]',
        default: '—',
        description: 'Ajusta `numVisible` das miniaturas por largura de tela — evita a tira apertada no celular.',
      },
      {
        name: 'showThumbnails',
        type: 'boolean',
        default: 'true',
        description: 'Mostra a tira de miniaturas. É o principal meio de navegar entre as imagens; manter ligado salvo em espaços muito estreitos.',
      },
      {
        name: 'thumbnailsPosition',
        type: "'bottom' | 'top' | 'left' | 'right'",
        default: 'bottom',
        description: 'Onde fica a tira de miniaturas em relação à imagem em foco.',
      },
      {
        name: 'showIndicators',
        type: 'boolean',
        default: 'false',
        description: 'Mostra indicadores (bolinhas) da imagem atual. Alternativa/companheiro das miniaturas quando não há espaço para a tira.',
      },
      {
        name: 'indicatorsPosition',
        type: "'bottom' | 'top' | 'left' | 'right'",
        default: 'bottom',
        description: 'Posição dos indicadores em relação à imagem em foco.',
      },
      {
        name: 'showItemNavigators',
        type: 'boolean',
        default: 'false',
        description: 'Mostra os botões anterior/próximo sobre a imagem em foco. Importante para navegar por teclado quando as miniaturas estão ocultas.',
      },
      {
        name: 'showThumbnailNavigators',
        type: 'boolean',
        default: 'true',
        description: 'Mostra os botões anterior/próximo da tira de miniaturas (quando há mais miniaturas do que cabem).',
      },
      {
        name: 'circular',
        type: 'boolean',
        default: 'false',
        description: 'Navegação infinita: passar do último item volta ao primeiro. Recomendado ligar junto com `autoPlay`.',
      },
      {
        name: 'autoPlay',
        type: 'boolean',
        default: 'false',
        description: 'Apresentação automática (slideshow) das imagens. Se ligar, garanta pausa (ver `shouldStopAutoplayByClick`) e evite prender a leitura.',
      },
      {
        name: 'transitionInterval',
        type: 'number',
        default: '4000',
        description: 'Milissegundos entre trocas no modo `autoPlay`.',
      },
      {
        name: 'showIndicatorsOnItem',
        type: 'boolean',
        default: 'false',
        description: 'Desenha os indicadores por cima da imagem em foco, em vez de fora dela.',
      },
      {
        name: 'changeItemOnIndicatorHover',
        type: 'boolean',
        default: 'false',
        description: 'Troca a imagem em foco ao passar o mouse sobre o indicador (sem clicar). Evite como único meio: não funciona por teclado nem toque.',
      },
    ],
    outputs: [
      { name: 'activeIndexChange', payload: 'number', description: 'Emitido quando a imagem em foco muda — informa o novo índice.' },
      { name: 'visibleChange', payload: 'boolean', description: 'Modo fullScreen: emitido ao abrir/fechar a máscara em tela cheia.' },
    ],
    slots: [
      { name: 'item', accepts: 'ng-template pTemplate="item" — a imagem em foco (com alt)' },
      { name: 'thumbnail', accepts: 'ng-template pTemplate="thumbnail" — cada miniatura da tira', optional: true },
      { name: 'caption', accepts: 'ng-template pTemplate="caption" — legenda da imagem em foco', optional: true },
      { name: 'indicator', accepts: 'ng-template pTemplate="indicator" — indicador customizado', optional: true },
      { name: 'header', accepts: 'ng-template pTemplate="header" — cabeçalho da galeria', optional: true },
      { name: 'footer', accepts: 'ng-template pTemplate="footer" — rodapé da galeria', optional: true },
      { name: 'closeicon', accepts: 'ng-template pTemplate="closeicon" — ícone de fechar (modo fullScreen)', optional: true },
    ],
    states: ['default', 'fullscreen-open', 'autoplay', 'first-item', 'last-item'],
    invalidCombinations: [
      {
        combo: 'Imagens sem `alt` descritivo (na foco e nas miniaturas)',
        porque: 'Numa galeria a informação ESTÁ nas imagens; sem alt, quem usa leitor de tela não recebe nada (ou ouve o nome do arquivo).',
      },
      {
        combo: 'fullScreen aberto sem foco preso e Esc para fechar',
        porque: 'O lightbox é um diálogo modal; sem foco preso e Esc a navegação por teclado escapa e não há como sair.',
      },
      {
        combo: 'autoPlay=true sem forma de pausar',
        porque: 'Imagens que trocam sozinhas e não param violam a acessibilidade (WCAG 2.2.2) e atrapalham quem lê a legenda.',
      },
      {
        combo: 'showThumbnails=false, showIndicators=false e showItemNavigators=false',
        porque: 'Sem miniaturas, indicadores nem botões não há como saber que há mais imagens nem navegar entre elas.',
      },
      {
        combo: 'changeItemOnIndicatorHover como único meio de trocar a imagem',
        porque: 'Hover não existe em toque nem no teclado; a troca precisa também de clique/tecla.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'page'],
    children: ['image', 'button', 'icon-button', 'tag'],
    commonlyUsedWith: ['image', 'card', 'button'],
    partOfPatterns: ['image-gallery', 'lightbox', 'product-photos'],
  },

  tokens: {
    typography: 'caption (legenda)',
    byState: {
      default: { thumbnail: 'surface/200', indicator: 'surface/300', text: 'surface/text' },
      active: { thumbnail: 'primary/color', indicator: 'primary/color' },
      'fullscreen-open': { mask: 'surface/overlay-mask' },
    },
    note: 'A miniatura/indicador ativos usam o papel `primary`; a máscara do fullScreen herda de overlay.mask do PrimeNG. Tamanho das miniaturas, botões e espaçamento herdam do componente (galleria.*). Nada de hex, px nem nome de marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca omitir o `alt` das imagens da galeria.',
      porque: 'A informação da galeria são as imagens; sem alt ela não chega a quem usa leitor de tela.',
      emVezDisso: 'Um `alt` que descreve cada imagem (na foco e nas miniaturas); use a legenda como complemento, não como substituto.',
    },
    {
      regra: 'Nunca abrir o modo tela cheia sem foco preso e sem Esc para fechar.',
      porque: 'O lightbox é modal; sem foco preso o teclado vaza para a página atrás e a pessoa fica sem saída.',
      emVezDisso: 'Diálogo com foco preso, retorno do foco ao fechar e Esc/botão de fechar rotulado.',
    },
    {
      regra: 'Nunca ligar autoPlay sem oferecer pausa.',
      porque: 'Imagens que trocam sozinhas atrapalham a leitura da legenda e quebram a acessibilidade (WCAG 2.2.2).',
      emVezDisso: 'autoPlay opcional com pausar/continuar e parada ao receber foco ou hover.',
    },
    {
      regra: 'Nunca usar Galleria para uma única imagem.',
      porque: 'Todo o aparato (miniaturas, indicadores, navegação) fica sem função e só polui a tela.',
      emVezDisso: 'Image (com `preview` se precisar ampliar) para uma foto só.',
    },
    {
      regra: 'Nunca depender só de miniaturas por gesto/hover para navegar.',
      porque: 'Quem usa teclado ou toque não alcança a troca de imagem.',
      emVezDisso: 'Miniaturas e botões anterior/próximo como `<button>` reais, focáveis e com aria-label.',
    },
  ],

  examples: {
    angular: `<p-galleria [value]="fotos" [numVisible]="5"
  [showThumbnails]="true" thumbnailsPosition="bottom"
  [showItemNavigators]="true" [circular]="true">
  <ng-template pTemplate="item" let-f>
    <img [src]="f.src" [alt]="f.alt" />
  </ng-template>
  <ng-template pTemplate="thumbnail" let-f>
    <img [src]="f.thumb" [alt]="f.alt" />
  </ng-template>
  <ng-template pTemplate="caption" let-f>{{ f.legenda }}</ng-template>
</p-galleria>`,
    html: `<section aria-roledescription="galeria" aria-label="Fotos do evento">
  <figure>
    <img src="/foto-1.jpg" alt="Alunos recebendo o certificado no palco" />
    <figcaption>Cerimônia de entrega — julho de 2026</figcaption>
  </figure>
  <div role="group" aria-label="Navegação">
    <button type="button" aria-label="Imagem anterior">
      <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
    </button>
    <button type="button" aria-label="Próxima imagem">
      <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
    </button>
  </div>
  <ul aria-label="Miniaturas">
    <li>
      <button type="button" aria-label="Foto 1" aria-current="true">
        <img src="/foto-1-thumb.jpg" alt="" />
      </button>
    </li>
    <li>
      <button type="button" aria-label="Foto 2">
        <img src="/foto-2-thumb.jpg" alt="" />
      </button>
    </li>
  </ul>
</section>`,
    inContext: `<!-- galeria de fotos de uma escola dentro de um card -->
<article data-block="card">
  <h2>Fotos da unidade</h2>
  <section aria-roledescription="galeria" aria-label="Fotos da unidade">
    <figure>
      <img src="/unidade-fachada.jpg" alt="Fachada do colégio vista da rua" />
      <figcaption>Fachada principal</figcaption>
    </figure>
    <ul aria-label="Miniaturas">
      <li><button type="button" aria-label="Fachada" aria-current="true"><img src="/t1.jpg" alt="" /></button></li>
      <li><button type="button" aria-label="Pátio"><img src="/t2.jpg" alt="" /></button></li>
      <li><button type="button" aria-label="Biblioteca"><img src="/t3.jpg" alt="" /></button></li>
    </ul>
  </section>
</article>`,
  },

  a11y: {
    role: 'region com aria-roledescription="galeria"; miniaturas em lista de botões; fullScreen é dialog modal',
    keyboard: [
      'Tab alcança os botões de navegação e as miniaturas',
      'Enter/Espaço aciona a miniatura ou o botão focado',
      'Setas navegam entre as miniaturas (padrão do PrimeNG)',
      'No modo fullScreen: Esc fecha e o foco fica preso no lightbox',
    ],
    requiredAria: [
      'região com nome (aria-label) e aria-roledescription="galeria"',
      '`alt` descritivo na imagem em foco; miniaturas são controles (`<button>` com aria-label), imagem interna com alt="" ',
      'miniatura atual marcada (aria-current) e navegadores como `<button>`',
      'fullScreen com foco preso, retorno do foco ao fechar e Esc',
      'autoPlay pausável',
    ],
    contrastMin: '4.5:1 da legenda; 3:1 dos controles, do realce da miniatura ativa e do indicador',
  },

  aiHints: {
    keywords: [
      'galleria', 'galeria', 'galeria de imagens', 'galeria de fotos', 'fotos', 'imagens',
      'miniaturas', 'thumbnails', 'lightbox', 'ampliar imagem', 'tela cheia', 'slideshow de fotos',
      'álbum', 'album', 'visualizador de imagens',
    ],
    selectionCriteria:
      'Escolha Galleria para um CONJUNTO de imagens relacionadas onde a pessoa escolhe qual ver em foco (via miniaturas/indicadores) e pode ampliar em tela cheia. Uma imagem só = Image. Itens não fotográficos numa faixa = Carousel. Coleção para varrer/comparar = DataView.',
    disambiguation: [
      { confundeCom: 'carousel', criterio: 'Carousel é um slider genérico de ITENS (cards, depoimentos) numa faixa; Galleria é específica para IMAGENS, com miniaturas, legenda e lightbox.' },
      { confundeCom: 'image', criterio: 'Image é UMA foto (com preview opcional); Galleria é uma coleção de fotos com tira de miniaturas.' },
      { confundeCom: 'dataview', criterio: 'DataView mostra a coleção inteira em grade/lista com paginação; Galleria foca UMA imagem por vez com navegação entre elas.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/galleria',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Imagens por templates (item/thumbnail/caption); saída = região "galeria" com figura + `alt`, miniaturas como `<button>` reais e, no fullScreen, um dialog modal com foco preso e Esc; a camada Nephos reforça alt, foco preso no lightbox e autoPlay pausável. Ícones internos (setas, fechar) do PrimeNG são sobrescritos para Font Awesome; ícones de conteúdo que o Moses emite seguem Font Awesome 7 Pro.',
  },
};
