/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · tag.meta.ts — etiqueta de status
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → usado direto do PrimeNG (p-tag).
 * Rótulo pequeno que classifica ou marca o status de um item.
 * Saída do Moses = HTML semântico: um `<span>` com o texto do status.
 *
 * ⚠️ Fidelidade: no Tag o erro é `danger` (no Message/Toast é `error`).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const tagMeta: NephosComponentMeta = {
  identity: {
    id: 'tag',
    name: 'Tag',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Etiqueta curta que marca o status ou a categoria de um item.',
    whenToUse: [
      'Mostrar o status de uma linha/cartão ("Ativo", "Pendente", "Cancelado").',
      'Classificar um item por categoria de forma compacta.',
    ],
    whenNotToUse: [
      'Ação clicável — use Button ou Chip (Chip pode ter remover).',
      'Contagem numérica sobre um ícone — use Badge.',
      'Texto longo — Tag é para rótulos curtos.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'severity',
        type: "'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast'",
        default: 'secondary',
        description: 'Papel/cor do status. ⚠️ aqui o erro é `danger` (no Message/Toast é `error`). A cor vem do tema.',
      },
      { name: 'value', type: 'string', default: '—', description: 'O texto do status. Curto ("Ativo").' },
      { name: 'icon', type: 'string', default: '—', description: 'Ícone opcional antes do texto.' },
      { name: 'rounded', type: 'boolean', default: 'false', description: 'Cantos totalmente arredondados (pílula).' },
    ],
    outputs: [],
    slots: [
      { name: 'default', accepts: 'conteúdo customizado, se não usar `value`', optional: true },
    ],
    states: ['default'],
    invalidCombinations: [
      { combo: 'Tag clicável (com onClick de ação)', porque: 'Tag é rótulo, não controle; um status clicável confunde o que é ação.' },
      { combo: 'status comunicado só pela cor da Tag', porque: 'Sem o texto, quem não distingue cores não entende o status.' },
    ],
  },

  relationships: {
    parents: ['datatable', 'card', 'list', 'toolbar'],
    children: [],
    commonlyUsedWith: ['card', 'datatable'],
    partOfPatterns: ['status-indicator', 'categorization'],
  },

  tokens: {
    typography: 'caption',
    byState: {
      // Cor pela severidade (feedback/neutro), herdada dos tokens do PrimeNG.
      sucesso: { background: 'feedback.success/100', text: 'feedback.success/700' },
      pendente: { background: 'feedback.warn/100', text: 'feedback.warn/700' },
      erro: { background: 'feedback.danger/100', text: 'feedback.danger/700' },
      neutro: { background: 'surface/100', text: 'surface/text' },
    },
    note: 'Fidelidade: cor sempre pela severidade (papel feedback) ou surface, herdada do PrimeNG. Raio herda. Nunca hex.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar Tag como se fosse botão.',
      porque: 'Ela não é um controle; um rótulo clicável quebra a expectativa e a acessibilidade.',
      emVezDisso: 'Button (ação) ou Chip (rótulo removível/interativo).',
    },
    {
      regra: 'Nunca comunicar o status só pela cor da Tag.',
      porque: 'Daltônicos não distinguem; a cor sozinha não diz o status.',
      emVezDisso: 'Sempre um texto ("Ativo", "Pendente") — a cor só reforça.',
    },
    {
      regra: 'Nunca inventar uma cor de status fora das severidades.',
      porque: 'Introduz matiz não prevista e some a semântica (o que é sucesso? o que é erro?).',
      emVezDisso: 'Mapear o status para uma severidade existente (success/warn/danger/info/secondary).',
    },
  ],

  examples: {
    angular: `<p-tag value="Ativo" severity="success" />`,
    html: `<span data-block="tag" data-variant="success">Ativo</span>`,
    inContext: `<tr>
  <td>Fatura #1032</td>
  <td><span data-block="tag" data-variant="warn">Pendente</span></td>
</tr>`,
  },

  a11y: {
    role: 'nenhum papel especial (texto num <span>)',
    keyboard: ['não é focável — não é um controle'],
    requiredAria: ['o status vive no TEXTO, não só na cor', 'se for só ícone, incluir texto acessível'],
    contrastMin: '4.5:1 do texto sobre o fundo da etiqueta',
  },

  aiHints: {
    keywords: ['tag', 'etiqueta', 'status', 'rótulo', 'rotulo', 'categoria', 'badge de status', 'chip de status'],
    selectionCriteria:
      'Escolha a Tag para marcar o status/categoria de um item de forma compacta e não clicável. Se precisa ser clicável/removível → Chip. Se é contagem → Badge.',
    disambiguation: [
      { confundeCom: 'chip', criterio: 'Chip é interativo (pode remover/selecionar); Tag é só um rótulo.' },
      { confundeCom: 'badge', criterio: 'Badge é uma contagem/marca sobre um ícone; Tag é um rótulo de status com texto.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/tag',
    figmaNode: 'https://www.figma.com/design/mHUXdyDZ820suwIRIIlp9Z/PrimeOne-4.0.0', // grupo "tag"
    storybookId: 'atoms-tag',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Cor pela severidade do tema.',
  },
};
