/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · logo.meta.ts — ONDA 5 (nosso)
 * ─────────────────────────────────────────────────────────────
 * origin: 'nephos-own' → não existe no PrimeNG. É a marca da vertical
 * ativa. Asset nosso (SVG preferencial), servido pelo tema/contexto.
 *
 * ⚠️ Regra multimarca: o componente NÃO sabe em qual das 7 verticais
 * roda — o logo (e o nome) vêm do tema ativo, nunca hardcodados. É a
 * mesma lógica do `primary`: identidade injetada, não escolhida no HTML.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const logoMeta: NephosComponentMeta = {
  identity: {
    id: 'logo',
    name: 'Logo',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'A marca visual da vertical ativa, geralmente no topo e ligada ao início.',
    whenToUse: [
      'Cabeçalho/barra de topo do app, identificando a vertical.',
      'Tela de login e páginas de marca.',
    ],
    whenNotToUse: [
      'Ícone de ação — use Icon.',
      'Foto/ilustração de conteúdo — use Image.',
      'Decoração repetida pela tela — o logo é âncora de identidade, não enfeite.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'variant',
        type: "'full' | 'symbol'",
        default: 'full',
        description: '`full` = símbolo + nome (topo espaçoso); `symbol` = só o símbolo (barra compacta, mobile).',
      },
      {
        name: 'href',
        type: 'string',
        default: "'/'",
        description: 'Destino ao clicar (normalmente o início). Quando presente, o logo é envolvido por um `<a>`.',
      },
      {
        name: 'alt',
        type: 'string',
        default: '(nome da vertical ativa)',
        description: 'Texto alternativo = o nome da organização/vertical. Vem do tema ativo — NÃO escrever nome de marca fixo no HTML.',
      },
    ],
    outputs: [],
    slots: [],
    states: ['default'],
    invalidCombinations: [
      {
        combo: 'logo com nome de marca fixo no componente/HTML',
        porque: 'Quebra a regra multimarca — o logo deve vir do tema ativo, não estar preso a uma vertical.',
      },
      {
        combo: 'logo como link para o início sem texto alternativo',
        porque: 'Um link que é só imagem sem alt fica sem nome acessível ("link" anônimo).',
      },
    ],
  },

  relationships: {
    parents: ['menubar', 'app-shell', 'page-header', 'login'],
    children: [],
    commonlyUsedWith: ['menubar', 'theme-toggle', 'avatar'],
    partOfPatterns: ['app-shell', 'login', 'page-header'],
  },

  tokens: {
    typography: '—',
    byState: {
      default: {
        height: '--nph-logo-height (padrão 2rem)',
      },
    },
    note:
      'O logo é asset de marca (SVG), não usa a paleta de papéis — a cor vem do próprio arquivo/tema da vertical. ' +
      'Preferir SVG por nitidez em qualquer tamanho/tela. ' +
      'TAMANHO: o componente tem altura própria (`--nph-logo-height`, padrão 2rem) e a largura é DERIVADA dela — ' +
      'nunca declarar largura no logo. Para mudar o tamanho num contexto, sobrescrever a custom property no contêiner ' +
      '(ex.: `.meu-cabecalho { --nph-logo-height: 2.5rem }`), nunca `width`/`max-width` na imagem: o ' +
      '`@iatec/nephos-layout` declara `img { max-width: none !important }` global, e qualquer tentativa de limitar por ' +
      'largura é descartada em silêncio.',
  },

  antiPatterns: [
    {
      regra: 'Nunca escrever o nome/imagem de uma marca específica no componente.',
      porque: 'Viola a regra multimarca (nenhum componente sabe a vertical); o logo deve trocar com o tema.',
      emVezDisso: 'Receber o asset e o nome do tema ativo (como o `primary` troca sozinho).',
    },
    {
      regra: 'Nunca usar o logo como link sem nome acessível.',
      porque: 'Link só-imagem sem alt é anunciado como "link" sem dizer para onde vai.',
      emVezDisso: 'alt com o nome da vertical (ou aria-label "Início — <vertical>") no `<a>`.',
    },
    {
      regra: 'Nunca distorcer ou recolorir o logo para caber/combinar.',
      porque: 'Descaracteriza a marca; proporções e cores do logo são fixas.',
      emVezDisso: 'Usar a variante certa (full/symbol) e respeitar a área de proteção.',
    },
    {
      regra: 'Nunca dimensionar o logo por largura (`width` / `max-width` na imagem).',
      porque:
        'O `@iatec/nephos-layout` declara `img { max-width: none !important }` global e sem escopo. ' +
        'Qualquer limite por largura é descartado sem erro nenhum — o logo simplesmente renderiza no ' +
        'tamanho natural do arquivo e estoura o contêiner.',
      emVezDisso:
        'Sobrescrever `--nph-logo-height` no contêiner. A largura sai da altura, e aí não há o que o ' +
        '`!important` desfaça.',
    },
  ],

  examples: {
    angular: `<a href="/" class="logo">
  <img [src]="tema.logoUrl" [alt]="tema.nomeVertical" />
</a>`,
    html: `<a href="/" aria-label="Início">
  <!-- src e alt vêm do TEMA da vertical ativa — nunca hardcodar a marca -->
  <img src="{{ logoDaMarcaAtiva }}" alt="{{ nomeDaMarcaAtiva }}" height="32" />
</a>`,
    inContext: `<!-- logo à esquerda da barra de navegação principal -->
<header data-block="app-shell">
  <a href="/" class="logo">
    <img src="{{ logoDaMarcaAtiva }}" alt="{{ nomeDaMarcaAtiva }}" height="32" />
  </a>
  <nav aria-label="Navegação principal"><!-- menubar --></nav>
</header>`,
  },

  a11y: {
    role: 'img (dentro de um link, quando leva ao início)',
    keyboard: ['quando é link: Tab foca, Enter segue para o início'],
    requiredAria: [
      'alt com o nome da vertical (não vazio quando o logo identifica a marca)',
      'como link: nome acessível claro ("Início" ou o nome da vertical)',
    ],
    contrastMin: 'o logo é asset de marca; garantir versão adequada para fundo claro e escuro',
  },

  aiHints: {
    keywords: [
      'logo', 'logotipo', 'marca', 'identidade', 'símbolo da marca', 'simbolo da marca',
      'brand', 'cabeçalho', 'cabecalho', 'topo',
    ],
    selectionCriteria:
      'Use Logo para a marca da vertical ativa (topo, login). O asset e o nome vêm do tema — nunca hardcodar marca. Ícone de ação = Icon; imagem de conteúdo = Image.',
    disambiguation: [
      { confundeCom: 'image', criterio: 'Image é conteúdo; Logo é identidade de marca, servido pelo tema.' },
      { confundeCom: 'icon', criterio: 'Icon é símbolo de ação/UI; Logo é a marca da organização.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/ (sem componente — asset de marca do Nephos)',
    deltaFromPrimeng: 'Primitivo Nephos (nephos-own): identidade da vertical, servida pelo tema ativo. Não existe no PrimeNG.',
  },
};
