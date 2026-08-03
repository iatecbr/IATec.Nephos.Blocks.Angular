/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · imagecompare.meta.ts — ONDA "Nicho" (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → usado direto. API lida do código real
 * (primeng@21.0.2, `types/primeng-imagecompare.d.ts`).
 *
 * Comparador "antes/depois": duas imagens sobrepostas com um controle
 * deslizante que revela uma sobre a outra. As duas imagens entram pelos
 * slots leftTemplate/rightTemplate.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const imageCompareMeta: NephosComponentMeta = {
  identity: {
    id: 'imagecompare',
    name: 'Image Compare',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Compara duas imagens sobrepostas com um deslizador que revela uma sobre a outra.',
    whenToUse: [
      'Mostrar antes/depois: foto original vs. editada, versão antiga vs. nova.',
      'Comparar duas imagens do MESMO enquadramento para destacar a diferença.',
    ],
    whenNotToUse: [
      'Exibir uma única imagem — use Image.',
      'Uma galeria de várias imagens — use Galleria ou Carousel.',
      'Imagens de enquadramentos diferentes (a sobreposição não faz sentido).',
    ],
  },

  api: {
    inputs: [
      {
        name: 'ariaLabel',
        type: 'string',
        default: 'undefined',
        description: 'Rótulo acessível do controle deslizante (ex.: "Comparar antes e depois"). Essencial porque o controle não tem texto visível.',
      },
      {
        name: 'ariaLabelledby',
        type: 'string',
        default: 'undefined',
        description: 'Id de um elemento que já rotula o comparador, como alternativa ao ariaLabel.',
      },
      {
        name: 'tabindex',
        type: 'number',
        default: '0',
        description: 'Ordem de tabulação do deslizador. Manter 0 para que seja alcançável pelo teclado.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'left', accepts: 'imagem base (à esquerda/embaixo) — via leftTemplate' },
      { name: 'right', accepts: 'imagem de comparação (à direita/em cima) — via rightTemplate' },
    ],
    states: ['default', 'sliding', 'focus'],
    invalidCombinations: [
      {
        combo: 'imagecompare sem ariaLabel/ariaLabelledby',
        porque: 'O deslizador é um controle sem texto; sem rótulo o leitor de tela não anuncia sua função.',
      },
      {
        combo: 'imagens de tamanhos/enquadramentos diferentes nos dois slots',
        porque: 'A sobreposição só compara bem se as duas imagens tiverem o mesmo enquadramento e proporção.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'section'],
    children: ['image'],
    commonlyUsedWith: ['image', 'heading', 'text'],
    partOfPatterns: ['before-after', 'media-showcase'],
  },

  tokens: {
    byState: {
      default: { handle: 'primary/color', divider: 'surface/0' },
      focus: { ring: 'focus/ring' },
    },
    note: 'A alça e a linha divisória usam papel primary/surface. Tamanho da alça, largura da linha e raio herdam do PrimeNG. Nunca hex nem nome de marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar sem rótulo acessível no deslizador.',
      porque: 'É um controle interativo sem texto; sem rótulo a pessoa que usa leitor de tela não sabe o que ele faz.',
      emVezDisso: 'Sempre ariaLabel (ou ariaLabelledby) descrevendo a comparação.',
    },
    {
      regra: 'Nunca omitir o alt das duas imagens.',
      porque: 'Cada imagem carrega informação; sem alt, quem não vê perde os dois lados da comparação.',
      emVezDisso: 'alt descritivo em cada <img> (ex.: "Fachada antes da reforma" / "depois").',
    },
    {
      regra: 'Nunca usar para uma imagem só.',
      porque: 'O componente existe para comparar dois estados; com uma imagem o deslizador não tem função.',
      emVezDisso: 'Image para exibição simples de uma imagem.',
    },
  ],

  examples: {
    angular: `<p-imageCompare ariaLabel="Comparar antes e depois">
  <ng-template #left><img src="antes.jpg" alt="Fachada antes da reforma" /></ng-template>
  <ng-template #right><img src="depois.jpg" alt="Fachada depois da reforma" /></ng-template>
</p-imageCompare>`,
    html: `<figure role="group" aria-label="Comparar antes e depois">
  <img src="antes.jpg" alt="Fachada antes da reforma" />
  <img src="depois.jpg" alt="Fachada depois da reforma" />
</figure>`,
    inContext: `<!-- comparação antes/depois dentro de um card -->
<article data-block="card">
  <h3>Reforma da fachada</h3>
  <figure role="group" aria-label="Comparar antes e depois">
    <img src="antes.jpg" alt="Fachada antes da reforma" />
    <img src="depois.jpg" alt="Fachada depois da reforma" />
  </figure>
  <p>Arraste para comparar os dois momentos.</p>
</article>`,
  },

  a11y: {
    role: 'slider (controle deslizante de comparação)',
    keyboard: ['Tab foca o deslizador', 'Setas ← → movem a divisória'],
    requiredAria: [
      'ariaLabel ou ariaLabelledby no deslizador',
      'alt descritivo em cada imagem',
      'agrupar as imagens (ex.: <figure role="group"> com rótulo)',
    ],
    contrastMin: 'alça/linha divisória visíveis sobre ambas as imagens; foco visível',
  },

  aiHints: {
    keywords: [
      'image compare', 'comparar imagens', 'antes e depois', 'antes/depois', 'before after',
      'comparador', 'deslizador de imagem', 'sobreposição de imagens', 'comparação visual',
    ],
    selectionCriteria:
      'Escolha Image Compare quando o objetivo for comparar DUAS imagens do mesmo enquadramento com um deslizador. Uma imagem = Image; várias = Galleria/Carousel.',
    disambiguation: [
      { confundeCom: 'image', criterio: 'Image exibe uma imagem; Image Compare sobrepõe duas para comparar.' },
      { confundeCom: 'galleria', criterio: 'Galleria mostra várias imagens em sequência; Image Compare compara exatamente duas.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/imagecompare',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída agrupa as imagens semanticamente (<figure>) com rótulo acessível no controle.',
  },
};
