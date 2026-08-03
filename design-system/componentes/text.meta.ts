/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · text.meta.ts — ONDA 1 (primitivo)
 * ─────────────────────────────────────────────────────────────
 * origin: 'nephos-own' → não existe como `p-*` no PrimeNG. É o corpo
 * de texto: `<p>` (parágrafo) e ênfases inline (`<strong>`, `<em>`),
 * vestido pela escala tipográfica Nephos.
 *
 * Regra do sistema: no máximo dois pesos de fonte por região; ênfase
 * é significado (strong/em), não decoração.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const textMeta: NephosComponentMeta = {
  identity: {
    id: 'text',
    name: 'Text',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Corpo de texto corrido — parágrafos e frases de conteúdo.',
    whenToUse: [
      'Escrever conteúdo: descrição, instrução, frase de apoio.',
      'Texto auxiliar de destaque (`overline`) acima de um título.',
    ],
    whenNotToUse: [
      'Nomear uma seção — use Heading.',
      'Rótulo de campo — use Label. Ajuda/erro sob um campo — use Helper text.',
      'Texto que navega — use Link (`<a>`).',
    ],
  },

  api: {
    // Não é um componente PrimeNG: "inputs" = atributos do HTML semântico.
    inputs: [
      {
        name: 'size',
        type: "'overline' | 'caption' | 'body-sm' | 'body-lg' | 'body-xl'",
        default: 'body-lg',
        description: 'Token de tipografia (só tamanho/função). `body-lg` (16px) é o corpo padrão; `body-sm` (14px) em áreas densas; `caption` (12px) em legendas; `overline` (10.5px) em rótulo versalete acima de título; `body-xl` (24px) em corpo de destaque.',
      },
      {
        name: 'variant',
        type: "'default' | 'muted'",
        default: 'default',
        description: 'Ênfase de cor do texto. `muted` = texto secundário/suave (mapeia para `text.mutedColor`). Nunca usar cor de marca (primary) em texto corrido — primary é para ação.',
      },
      {
        name: 'emphasis',
        type: "'none' | 'strong' | 'em'",
        default: 'none',
        description: 'Ênfase inline com SIGNIFICADO: `strong` (importância) vira `<strong>`, `em` (entonação) vira `<em>`. Não usar para "deixar em negrito por estética".',
      },
    ],
    outputs: [],
    slots: [
      { name: 'default', accepts: 'texto e ênfases inline (strong/em, link)' },
    ],
    states: ['default'],
    invalidCombinations: [
      {
        combo: 'variant="muted" em texto essencial de leitura longa',
        porque: 'O tom suave reduz o contraste; serve para apoio, não para o conteúdo principal que a pessoa precisa ler por completo.',
      },
      {
        combo: 'cor primary em texto corrido',
        porque: 'A cor de ênfase da marca significa "ação/decisão". Em texto comum ela vira ruído e sugere um link que não existe.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'page', 'section', 'form-field'],
    children: ['link'],
    commonlyUsedWith: ['heading', 'link'],
    partOfPatterns: ['page-header', 'card', 'empty-state', 'article'],
  },

  tokens: {
    typography: 'body-lg (padrão) · body-sm · caption · overline · body-xl (escala Nephos)',
    byState: {
      default: { text: 'surface/text' },
      muted: { text: 'surface/text-muted' },
    },
    note: 'Cor padrão = `text.color`; muted = `text.mutedColor` (ambos do PrimeNG, derivam do surface). Máximo dois pesos por região. Entrelinha herda do sistema — não fixar valor bruto.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar negrito/itálico só por estética.',
      porque: 'Perde o significado semântico de `<strong>`/`<em>` e polui a leitura; o leitor de tela pode anunciar ênfase onde não há.',
      emVezDisso: 'Emphasis com significado (importância = strong, entonação = em); para peso visual use o token de tipografia.',
    },
    {
      regra: 'Nunca pintar texto corrido com a cor da marca (primary).',
      porque: 'Primary sinaliza ação; em texto comum vira ruído e parece um link.',
      emVezDisso: 'Texto padrão (`text.color`) ou `muted` para apoio; primary só em Link/Button.',
    },
    {
      regra: 'Nunca usar mais de dois pesos de fonte na mesma região.',
      porque: 'Cada peso extra dilui a hierarquia — tudo parece importante e nada se destaca.',
      emVezDisso: 'Um peso para o corpo e, no máximo, um para ênfase.',
    },
  ],

  examples: {
    angular: `<p class="body-lg">O recálculo por reserva de vaga funciona como no produto final.</p>`,
    html: `<p>O recálculo por reserva de vaga funciona como no produto final.</p>`,
    inContext: `<!-- corpo com ênfase semântica e link inline -->
<p>
  Este é um protótipo <strong>funcional</strong> do dashboard.
  <a href="/ajuda">Saiba mais</a>.
</p>`,
  },

  a11y: {
    role: 'paragraph',
    keyboard: ['não recebe foco (conteúdo estático); links internos entram na ordem de Tab'],
    requiredAria: [
      'usar `<p>` para parágrafo — não emular com `<div>` + quebras',
      'ênfase por `<strong>`/`<em>`, não por cor sozinha',
    ],
    contrastMin: '4.5:1 do texto sobre o fundo; texto `muted` também precisa passar 4.5:1',
  },

  aiHints: {
    keywords: [
      'texto', 'text', 'parágrafo', 'paragrafo', 'corpo', 'body', 'descrição', 'descricao',
      'frase', 'conteúdo', 'conteudo', 'legenda', 'caption', 'overline',
    ],
    selectionCriteria:
      'Use Text para conteúdo corrido. Escolha o token de tamanho pela função (corpo padrão = body-lg, denso = body-sm, legenda = caption). Se o texto nomeia uma seção, é Heading; se rotula um campo, é Label; se navega, é Link.',
    disambiguation: [
      { confundeCom: 'heading', criterio: 'Heading nomeia e estrutura; Text é conteúdo corrido.' },
      { confundeCom: 'helper-text', criterio: 'Helper text é a ajuda/erro ATRELADA a um campo (`<small>` + aria-describedby); Text é conteúdo solto.' },
      { confundeCom: 'label', criterio: 'Label rotula um controle de formulário; Text não está ligado a campo.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/ (sem componente — HTML semântico + escala Nephos)',
    deltaFromPrimeng: 'Primitivo Nephos: o PrimeNG não tokeniza corpo de texto (herda CSS). A escala tipográfica (body-*/caption/overline) é nossa.',
  },
};
