/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · heading.meta.ts — ONDA 1 (primitivo)
 * ─────────────────────────────────────────────────────────────
 * origin: 'nephos-own' → não existe como `p-*` no PrimeNG. É HTML
 * semântico (`<h1>`–`<h6>`) vestido pela escala tipográfica Nephos.
 *
 * O nível (`<h1>`…`<h6>`) é ESTRUTURA (hierarquia do documento, lida
 * pelo leitor de tela); o tamanho é APARÊNCIA (token de tipografia).
 * Os dois são independentes — não force um pelo outro.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const headingMeta: NephosComponentMeta = {
  identity: {
    id: 'heading',
    name: 'Heading',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Título que nomeia uma seção e define a hierarquia do documento.',
    whenToUse: [
      'Dar nome a uma página, bloco ou seção de conteúdo.',
      'Criar a estrutura de leitura (índice) que o leitor de tela percorre.',
    ],
    whenNotToUse: [
      'Texto que não é título — use Text (`<p>`).',
      'Deixar um texto grande só por estética — isso é tamanho de fonte, não título.',
      'Rótulo de campo — use Label.',
    ],
  },

  api: {
    // Não é um componente PrimeNG: os "inputs" são os atributos do HTML
    // semântico que o Moses decide ao emitir a tag.
    inputs: [
      {
        name: 'level',
        type: '1 | 2 | 3 | 4 | 5 | 6',
        default: '(sem padrão)',
        description: 'O nível da hierarquia (`<h1>`…`<h6>`). Nunca pular níveis: depois de um h2 vem h3, não h4. Existe só um `<h1>` por página (o título dela).',
      },
      {
        name: 'size',
        type: "'title-sm' | 'title-md' | 'title-lg' | 'title-xlg' | 'title-xxlg'",
        default: '(segue o nível)',
        description: 'Token de tipografia que controla só o TAMANHO visual. É independente do nível: um h2 pode usar title-sm se a hierarquia visual pedir. O leitor de tela ouve o nível, não o tamanho.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'default', accepts: 'texto do título (texto puro, sem outros títulos dentro)' },
    ],
    states: ['default'],
    invalidCombinations: [
      {
        combo: 'pular nível (h2 seguido de h4)',
        porque: 'Quebra a árvore de títulos que a tecnologia assistiva usa para navegar — a pessoa "cai" um degrau inexistente.',
      },
      {
        combo: 'mais de um <h1> na mesma página',
        porque: 'O h1 é o título único da página; dois h1 confundem qual é o assunto principal.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'page', 'section'],
    children: [],
    commonlyUsedWith: ['text', 'button'],
    partOfPatterns: ['page-header', 'card', 'empty-state', 'section'],
  },

  tokens: {
    typography: 'title-sm | title-md | title-lg | title-xlg | title-xxlg (escala Nephos)',
    byState: {
      default: { text: 'surface/text' },
    },
    note: 'Cor padrão = texto do sistema (`text.color` do PrimeNG). Peso: no máximo semibold/bold, um por região. Entrelinha herda do sistema — nunca fixar valor bruto (regra do design.md).',
  },

  antiPatterns: [
    {
      regra: 'Nunca escolher o nível do título pelo tamanho que se quer.',
      porque: 'Nível é hierarquia (para o leitor de tela); tamanho é aparência. Ligar os dois cria estrutura errada.',
      emVezDisso: 'Escolher o `level` pela posição na hierarquia e ajustar o `size` (token) separado.',
    },
    {
      regra: 'Nunca pular níveis de título.',
      porque: 'A navegação por títulos da tecnologia assistiva conta com a sequência contínua (h1→h2→h3).',
      emVezDisso: 'Descer um nível de cada vez; se precisa de um título "menor", troque o token de tamanho, não o nível.',
    },
    {
      regra: 'Nunca usar heading só para deixar um texto grande ou em negrito.',
      porque: 'Cria um item falso no índice do documento e engana quem navega por títulos.',
      emVezDisso: 'Um `<p>` (Text) com o token de tamanho/peso desejado.',
    },
  ],

  examples: {
    angular: `<h1 class="title-lg">Bolsas do campo</h1>`,
    html: `<h1>Bolsas do campo</h1>
<h2>Ensino fundamental</h2>`,
    inContext: `<!-- cabeçalho de página: título + apoio -->
<header data-block="page-header">
  <h1>Colégio Adventista de Salvador</h1>
  <p data-token="body-lg" data-variant="muted">Associação Bahia · bolsas integrais</p>
</header>`,
  },

  a11y: {
    role: 'heading',
    keyboard: ['navegável pela lista de títulos do leitor de tela (não recebe foco por Tab)'],
    requiredAria: [
      'usar a tag nativa `<h1>`–`<h6>` (o nível já vem dela — não usar `<div role="heading">` sem necessidade)',
      'se usar `role="heading"`, informar `aria-level`',
    ],
    contrastMin: '4.5:1 do texto do título sobre o fundo (3:1 só se for texto grande ≥ 24px em bold)',
  },

  aiHints: {
    keywords: [
      'título', 'titulo', 'heading', 'cabeçalho', 'cabecalho', 'seção', 'secao',
      'h1', 'h2', 'headline', 'nome da página', 'nome da tela',
    ],
    selectionCriteria:
      'Use Heading quando o texto NOMEIA uma seção/página e deve entrar na hierarquia do documento. Decida o nível pela posição na estrutura, não pelo tamanho. Se é só texto corrido, use Text.',
    disambiguation: [
      { confundeCom: 'text', criterio: 'Text (`<p>`) é conteúdo corrido; Heading (`<h*>`) nomeia e estrutura.' },
      { confundeCom: 'label', criterio: 'Label rotula um campo de formulário; Heading nomeia uma seção de conteúdo.' },
      { confundeCom: 'overline', criterio: 'Um rótulo curto acima do título é tipografia `overline` num `<p>`/`<span>`, não um heading extra.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/ (sem componente — HTML semântico + escala Nephos)',
    deltaFromPrimeng: 'Primitivo Nephos: o PrimeNG não tem componente de título. A escala tipográfica (title-*) é nossa.',
  },
};
