/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · label.meta.ts — ONDA 1 (primitivo)
 * ─────────────────────────────────────────────────────────────
 * origin: 'nephos-own' → não existe como `p-*` no PrimeNG. É o rótulo
 * de um campo de formulário: `<label for="id">`.
 *
 * Regra dura do sistema: TODO campo tem um `<label>` associado. O
 * placeholder NÃO é rótulo (some ao digitar). É o par natural de
 * `inputtext`/`select`/`checkbox`/`radiobutton`/`password`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const labelMeta: NephosComponentMeta = {
  identity: {
    id: 'label',
    name: 'Label',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Rótulo que diz o que preencher num campo de formulário.',
    whenToUse: [
      'Nomear qualquer controle de formulário (campo, seleção, marcação).',
      'Sempre que houver um input — a associação é obrigatória.',
    ],
    whenNotToUse: [
      'Título de seção — use Heading.',
      'Ajuda ou erro sob o campo — use Helper text.',
      'Etiqueta de status (não é rótulo de campo) — use Tag.',
    ],
  },

  api: {
    // Não é um componente PrimeNG: "inputs" = atributos do HTML semântico.
    inputs: [
      {
        name: 'for',
        type: 'string (id do campo)',
        default: '(obrigatório)',
        description: 'Id do controle que este rótulo nomeia. É o que liga clique-no-rótulo→foco-no-campo e o que o leitor de tela anuncia. Alternativa: envolver o campo dentro do `<label>` (associação implícita).',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Marca o campo como obrigatório. O asterisco visual é `aria-hidden` e o campo leva `aria-required="true"` — o asterisco sozinho não é anunciado.',
      },
      {
        name: 'visualHidden',
        type: 'boolean',
        default: 'false',
        description: 'Rótulo visualmente oculto mas presente para o leitor de tela (classe visually-hidden). Usar só quando o contexto visual já deixa o campo óbvio (ex.: busca com ícone). Nunca remover o rótulo — só escondê-lo.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'default', accepts: 'texto do rótulo (+ marcador de obrigatório opcional)' },
    ],
    states: ['default'],
    invalidCombinations: [
      {
        combo: 'placeholder no lugar do label',
        porque: 'O placeholder some ao digitar e não é lido de forma confiável — a pessoa perde a referência do que preencher.',
      },
      {
        combo: 'label com `for` que não bate com o id de nenhum campo',
        porque: 'A associação quebra: clicar no rótulo não foca o campo e o leitor de tela não anuncia o nome.',
      },
      {
        combo: 'required visual (asterisco) sem `aria-required` no campo',
        porque: 'O asterisco pode não ser anunciado; a obrigatoriedade não chega à tecnologia assistiva.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'floatlabel'],
    children: [],
    commonlyUsedWith: ['inputtext', 'select', 'checkbox', 'radiobutton', 'password', 'helper-text'],
    partOfPatterns: ['form-field', 'form-submission', 'login'],
  },

  tokens: {
    typography: 'body-sm (14px) ou body-lg (16px)',
    byState: {
      default: { text: 'surface/text' },
    },
    note: 'Cor = `text.color`. Peso um pouco mais firme que o corpo (medium) é aceitável. O rótulo flutuante (FloatLabel) tem seus próprios tokens de cor por estado — ver `floatlabel.meta.ts`.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar o placeholder como rótulo.',
      porque: 'Some ao digitar e não é lido de forma confiável; a pessoa perde a referência.',
      emVezDisso: 'Um `<label for="id">` visível (ou FloatLabel), e o placeholder só como exemplo.',
    },
    {
      regra: 'Nunca deixar um campo sem rótulo associado.',
      porque: 'O leitor de tela anuncia "campo de edição" sem dizer de quê — o formulário fica inutilizável para quem não vê.',
      emVezDisso: 'Sempre `<label for>` (ou envolver o campo no label); se o rótulo não pode aparecer, escondê-lo com visually-hidden — nunca removê-lo.',
    },
    {
      regra: 'Nunca sinalizar obrigatório só com asterisco visual.',
      porque: 'O asterisco pode não ser anunciado pela tecnologia assistiva.',
      emVezDisso: 'Asterisco `aria-hidden` + `aria-required="true"` no campo, e explicar no topo o que o asterisco significa.',
    },
  ],

  examples: {
    angular: `<label for="email">E-mail</label>
<input pInputText id="email" [(ngModel)]="email" />`,
    html: `<label for="email">E-mail</label>
<input id="email" type="email" name="email" />`,
    inContext: `<!-- rótulo com obrigatório acessível -->
<label for="nome">Nome completo <span aria-hidden="true">*</span></label>
<input id="nome" name="nome" type="text" aria-required="true" />`,
  },

  a11y: {
    role: 'não tem role próprio; fornece o nome acessível do campo',
    keyboard: ['clicar no rótulo move o foco para o campo associado'],
    requiredAria: [
      '`for` do label = `id` do campo (ou associação implícita envolvendo o campo)',
      'obrigatório: `aria-required="true"` no campo (não só o asterisco)',
      'se oculto visualmente, manter no DOM com visually-hidden',
    ],
    contrastMin: '4.5:1 do texto do rótulo sobre o fundo',
  },

  aiHints: {
    keywords: [
      'rótulo', 'rotulo', 'label', 'nome do campo', 'legenda do campo',
      'obrigatório', 'obrigatorio', 'formulário', 'formulario', 'for', 'campo',
    ],
    selectionCriteria:
      'Use Label sempre que houver um controle de formulário — a associação `for`/`id` é obrigatória. Se o texto nomeia uma seção, é Heading; se dá ajuda, é Helper text.',
    disambiguation: [
      { confundeCom: 'floatlabel', criterio: 'FloatLabel é o rótulo que flutua sobre o campo (invólucro); Label é o `<label>` cru — os dois usam `for`.' },
      { confundeCom: 'heading', criterio: 'Heading nomeia uma seção de conteúdo; Label nomeia um campo.' },
      { confundeCom: 'tag', criterio: 'Tag é etiqueta de status/categoria; Label rotula um controle de formulário.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/floatlabel (rótulo associado a campo)',
    deltaFromPrimeng: 'Primitivo Nephos: `<label>` semântico + regra de associação. A variação flutuante é o componente FloatLabel do PrimeNG (ver floatlabel.meta.ts).',
  },
};
