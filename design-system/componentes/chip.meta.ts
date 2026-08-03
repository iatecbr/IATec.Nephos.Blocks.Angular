/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · chip.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-chip`. API lida do código real
 * (primeng@21.0.2, `types/primeng-chip.d.ts`).
 *
 * Etiqueta compacta, muitas vezes REMOVÍVEL (com um "x"). Diferente da
 * Tag (status, não interativa) e do Badge (contagem/ponto). Quando
 * removível, o "x" precisa ser um controle real com nome acessível.
 * O ícone de remover é Font Awesome — ver `icon.meta.ts`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const chipMeta: NephosComponentMeta = {
  identity: {
    id: 'chip',
    name: 'Chip',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Etiqueta compacta, frequentemente removível, para itens selecionados ou filtros.',
    whenToUse: [
      'Mostrar itens escolhidos que podem ser removidos (filtros ativos, destinatários, tags).',
      'Representar entradas discretas num campo (ex.: e-mails adicionados).',
    ],
    whenNotToUse: [
      'Status não interativo (ex.: "Atingiu", "Faltando") — use Tag.',
      'Contagem/ponto mínimo — use Badge.',
      'Ação principal — use Button.',
    ],
  },

  api: {
    inputs: [
      { name: 'label', type: 'string', default: '—', description: 'Texto do chip.' },
      {
        name: 'removable',
        type: 'boolean',
        default: 'false',
        description: 'Mostra o "x" de remover. Quando true, o "x" é um controle focável com nome acessível.',
      },
      {
        name: 'removeIcon',
        type: 'string (classe Font Awesome)',
        default: 'fa-solid fa-xmark',
        description: 'Ícone do botão de remover. Segue `icon.meta.ts` (Font Awesome). Manter o "x" (xmark) por convenção.',
      },
      {
        name: 'icon',
        type: 'string (classe Font Awesome)',
        default: '—',
        description: 'Ícone à esquerda do rótulo (opcional). Segue `icon.meta.ts`.',
      },
      {
        name: 'image',
        type: 'string (url)',
        default: '—',
        description: 'Imagem à esquerda (ex.: avatar de um destinatário).',
      },
    ],
    outputs: [
      { name: 'onRemove', payload: 'MouseEvent', description: 'Emitido ao remover — é onde se tira o item da lista.' },
      { name: 'onImageError', payload: 'Event', description: 'Emitido se a imagem do chip falha ao carregar.' },
    ],
    slots: [],
    states: ['default', 'removable', 'focus'],
    invalidCombinations: [
      {
        combo: 'chip removível com o "x" não focável / sem nome acessível',
        porque: 'Quem usa teclado/leitor de tela não consegue remover nem sabe o que o "x" faz.',
      },
      {
        combo: 'usar Chip para status não interativo',
        porque: 'Chip sugere interação (remover/selecionar); um status fixo é Tag.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'filters', 'inputgroup'],
    children: ['icon', 'avatar'],
    commonlyUsedWith: ['inputtext', 'button', 'tag'],
    partOfPatterns: ['filters', 'multiselect', 'recipients'],
  },

  tokens: {
    typography: 'body-sm',
    byState: {
      default: { background: 'surface/100', text: 'surface/text' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Fundo neutro (surface); o "x" herda a cor do texto. Raio/altura herdam do PrimeNG. Cor por papel + passo; não usar a marca por decoração.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar o "x" de remover sem ser um controle acessível.',
      porque: 'Sem foco e sem nome, teclado e leitor de tela não removem o item.',
      emVezDisso: 'Um `<button>` para o "x" com aria-label ("Remover <item>") e ícone aria-hidden.',
    },
    {
      regra: 'Nunca usar Chip para status fixo.',
      porque: 'Chip sinaliza interação; status não interativo confunde ao parecer removível.',
      emVezDisso: 'Tag para status/categoria não interativa.',
    },
    {
      regra: 'Nunca depender só da cor para diferenciar chips selecionados.',
      porque: 'Quem não distingue cores não percebe o estado.',
      emVezDisso: 'Estado por texto/ícone/aria-pressed além da cor.',
    },
  ],

  examples: {
    angular: `<p-chip label="Ensino fundamental" [removable]="true"
  removeIcon="fa-solid fa-xmark" (onRemove)="remover('fundamental')" />`,
    html: `<span class="chip">
  Ensino fundamental
  <button type="button" aria-label="Remover filtro Ensino fundamental">
    <i class="fa-solid fa-xmark" aria-hidden="true"></i>
  </button>
</span>`,
    inContext: `<!-- filtros ativos como chips removíveis -->
<div data-block="active-filters" aria-label="Filtros ativos">
  <span class="chip">Associação Bahia
    <button type="button" aria-label="Remover filtro Associação Bahia">
      <i class="fa-solid fa-xmark" aria-hidden="true"></i>
    </button>
  </span>
  <span class="chip">2026
    <button type="button" aria-label="Remover filtro 2026">
      <i class="fa-solid fa-xmark" aria-hidden="true"></i>
    </button>
  </span>
</div>`,
  },

  a11y: {
    role: 'nenhum próprio; o "x" removível é um button com nome acessível',
    keyboard: ['Tab foca o "x"', 'Enter/Espaço remove', 'foco vai para um alvo sensato após remover (próximo chip ou o campo)'],
    requiredAria: [
      'botão de remover com aria-label ("Remover <item>")',
      'ícone do "x" com aria-hidden',
      'grupo de chips com um rótulo (aria-label) quando representa filtros/seleção',
    ],
    contrastMin: '4.5:1 do texto do chip; 3:1 do "x" e do foco',
  },

  aiHints: {
    keywords: [
      'chip', 'etiqueta removível', 'etiqueta removivel', 'filtro ativo', 'tag removível',
      'tag removivel', 'destinatário', 'destinatario', 'item selecionado', 'remover', 'x',
    ],
    selectionCriteria:
      'Escolha Chip para itens compactos que a pessoa pode remover/selecionar (filtros ativos, destinatários, entradas). Status fixo = Tag; contagem = Badge; ação = Button.',
    disambiguation: [
      { confundeCom: 'tag', criterio: 'Tag é status/categoria NÃO interativa; Chip costuma ser removível/interativo.' },
      { confundeCom: 'badge', criterio: 'Badge é contagem/ponto mínimo; Chip carrega um rótulo (e às vezes o "x").' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/chip',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Ícones (remover/à esquerda) usam Font Awesome (`icon.meta.ts`); regra do "x" acessível é a camada Nephos.',
  },
};
