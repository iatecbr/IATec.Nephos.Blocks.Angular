/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · divider.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-divider`. API lida do código real
 * (primeng@21.0.2, `types/primeng-divider.d.ts`).
 *
 * Separador de conteúdo. Aceita conteúdo no meio (ex.: "OU"). Sem
 * conteúdo, semanticamente é um `<hr>`; com conteúdo é um separador
 * rotulado (role="separator"). NÃO é ferramenta de espaçamento.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const dividerMeta: NephosComponentMeta = {
  identity: {
    id: 'divider',
    name: 'Divider',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Linha que separa visualmente dois grupos de conteúdo.',
    whenToUse: [
      'Marcar a fronteira entre seções relacionadas dentro do mesmo bloco.',
      'Separador com rótulo no meio (ex.: "OU" entre login e cadastro).',
    ],
    whenNotToUse: [
      'Só para criar espaço — espaçamento é gap/padding do contêiner.',
      'Separar seções que já têm título próprio (o título já delimita).',
      'Contornar/emoldurar conteúdo — isso é borda de um Card.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'layout',
        type: "'horizontal' | 'vertical'",
        default: 'horizontal',
        description: 'Direção do separador. Vertical exige altura no contêiner (ex.: itens lado a lado).',
      },
      {
        name: 'type',
        type: "'solid' | 'dashed' | 'dotted'",
        default: 'solid',
        description: 'Estilo do traço. Manter sólido como padrão; tracejado/pontilhado só com intenção clara.',
      },
      {
        name: 'align',
        type: "'left' | 'center' | 'right' | 'top' | 'bottom'",
        default: 'center',
        description: 'Alinhamento do conteúdo projetado no meio (quando houver). left/center/right no horizontal; top/center/bottom no vertical.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'default', accepts: 'conteúdo opcional no meio (texto curto, ex.: "OU")', optional: true },
    ],
    states: ['default'],
    invalidCombinations: [
      {
        combo: 'divider usado para gerar espaço entre elementos',
        porque: 'Espaço é propriedade do layout (gap/padding); um separador acrescenta uma linha visual que não era pedida.',
      },
      {
        combo: 'layout="vertical" sem altura no contêiner',
        porque: 'O separador vertical some sem uma altura de referência.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'toolbar', 'menu', 'page'],
    children: ['text'],
    commonlyUsedWith: ['card', 'button', 'text'],
    partOfPatterns: ['card', 'login', 'toolbar'],
  },

  tokens: {
    typography: 'caption (do rótulo no meio, quando houver)',
    byState: {
      default: { line: 'surface/200', text: 'surface/text-muted' },
    },
    note: 'Cor da linha = borda do sistema (surface). Espessura e espaçamento herdam do PrimeNG. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar Divider para criar espaçamento.',
      porque: 'Acrescenta um traço visual que não era pedido; espaço é papel do layout.',
      emVezDisso: 'Ajustar o gap/padding do contêiner (ver `Espaçamento e o spacer.md`).',
    },
    {
      regra: 'Nunca empilhar divisores para "reforçar" a separação.',
      porque: 'Poluição visual; duas linhas não separam mais que uma.',
      emVezDisso: 'Uma única linha, ou mais espaço, ou um Card se os grupos são realmente distintos.',
    },
    {
      regra: 'Nunca separar com Divider seções que já têm título.',
      porque: 'O título já delimita; a linha extra vira ruído.',
      emVezDisso: 'Deixar o Heading fazer a delimitação.',
    },
  ],

  examples: {
    angular: `<p-divider />
<p-divider align="center"><span>OU</span></p-divider>`,
    html: `<hr />

<!-- separador com rótulo no meio -->
<div role="separator" aria-orientation="horizontal">
  <span>OU</span>
</div>`,
    inContext: `<!-- "OU" entre entrar e criar conta, no bloco de login -->
<button type="submit">Entrar</button>
<div role="separator"><span>OU</span></div>
<a href="/cadastro">Criar uma conta</a>`,
  },

  a11y: {
    role: 'separator',
    keyboard: ['não focável (elemento estático)'],
    requiredAria: [
      'sem conteúdo: preferir `<hr>` (semântica nativa)',
      'com rótulo: `role="separator"` e o texto legível',
      'aria-orientation quando vertical',
    ],
    contrastMin: '3:1 da linha só quando ela carrega significado; divisor puramente decorativo não exige contraste mínimo',
  },

  aiHints: {
    keywords: [
      'divider', 'divisor', 'separador', 'linha', 'separar', 'hr', 'régua', 'regua',
      'ou', 'fronteira', 'seção', 'secao',
    ],
    selectionCriteria:
      'Escolha Divider para marcar a fronteira visual entre grupos de conteúdo relacionados. Se o objetivo é só espaço, ajuste o layout; se é emoldurar, use Card.',
    disambiguation: [
      { confundeCom: 'spacer', criterio: 'Espaço = layout (gap/padding), não Divider. Divider desenha uma linha.' },
      { confundeCom: 'card', criterio: 'Card agrupa e emoldura; Divider só traça a linha entre grupos.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/divider',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída semântica = `<hr>` ou role="separator"; cores do tema.',
  },
};
