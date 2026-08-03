/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · badge.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-badge` (autônomo) e diretiva `pBadge`
 * (sobreposto a outro elemento, ex.: contagem sobre um ícone de sino).
 * API lida do código real (primeng@21.0.2, `types/primeng-badge.d.ts`).
 *
 * ⚠️ FIDELIDADE — as severidades do Badge NÃO batem com o set de
 * feedback completo: são `secondary · info · success · warn · danger ·
 * contrast` — SEM `help`, e é `warn` (não "warning"). Documentar para o
 * Moses não inventar `help`/`warning` aqui.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const badgeMeta: NephosComponentMeta = {
  identity: {
    id: 'badge',
    name: 'Badge',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Marcador pequeno de contagem ou status, geralmente sobre outro elemento.',
    whenToUse: [
      'Contagem curta: itens não lidos, notificações pendentes (sobre um ícone).',
      'Ponto/rótulo mínimo de status junto de um item.',
    ],
    whenNotToUse: [
      'Etiqueta de status com texto (ex.: "Faltando", "Atingiu") — use Tag.',
      'Elemento removível/interativo — use Chip.',
      'Número grande ou informação essencial que precisa de leitura clara.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'value',
        type: 'string | number',
        default: '—',
        description: 'O conteúdo do badge (uma contagem curta). Números longos devem virar "9+" para não estourar.',
      },
      {
        name: 'severity',
        type: "'secondary' | 'info' | 'success' | 'warn' | 'danger' | 'contrast'",
        default: 'secondary',
        description: '⚠️ Conjunto do Badge (NÃO tem `help`; é `warn`, não "warning"). Escolher pelo significado: danger = pendência crítica, success = ok, info = neutro informativo, contrast = alto contraste.',
      },
      {
        name: 'badgeSize',
        type: "'small' | 'large' | 'xlarge'",
        default: '(normal)',
        description: 'Tamanho do badge. (O input `size` existe mas está DEPRECADO em favor de `badgeSize`.)',
      },
    ],
    outputs: [],
    slots: [],
    states: ['default'],
    invalidCombinations: [
      {
        combo: "severity='help' ou 'warning'",
        porque: 'O Badge não tem essas severidades (o set é secondary/info/success/warn/danger/contrast). Usar valor fora disso quebra a fidelidade ao PrimeNG.',
      },
      {
        combo: 'badge como único portador de informação essencial, sem texto acessível',
        porque: 'Um número minúsculo sobreposto não é lido com clareza; a informação não chega a quem usa leitor de tela.',
      },
    ],
  },

  relationships: {
    parents: ['button', 'icon', 'avatar', 'menu-item'],
    children: [],
    commonlyUsedWith: ['icon', 'button', 'avatar'],
    partOfPatterns: ['notification', 'navigation'],
  },

  tokens: {
    typography: 'caption (número compacto)',
    byState: {
      default: { background: 'feedback.danger/500', text: 'surface/0' },
    },
    note: 'Cor = a severidade escolhida (primitivo do PrimeNG via token do componente). Dimensões/raio herdam do PrimeNG. Nunca hex; a cor vem da `severity`.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar Badge onde cabe uma Tag ou um Chip.',
      porque: 'Badge é marcador mínimo (contagem/ponto); status com texto é Tag, item removível é Chip.',
      emVezDisso: 'Tag para status legível; Chip para etiqueta interativa; Badge só para contagem/ponto.',
    },
    {
      regra: 'Nunca confiar só no número visual do badge para informação importante.',
      porque: 'É pequeno e sobreposto; quem usa leitor de tela precisa do texto equivalente.',
      emVezDisso: 'Texto acessível no elemento pai (ex.: aria-label "3 mensagens não lidas").',
    },
    {
      regra: 'Nunca inventar severidade fora do conjunto do Badge.',
      porque: 'O Badge não tem `help`/"warning"; valores fora do set quebram o tema e a fidelidade.',
      emVezDisso: 'Escolher entre secondary/info/success/warn/danger/contrast.',
    },
  ],

  examples: {
    angular: `<!-- autônomo -->
<p-badge [value]="3" severity="danger" />

<!-- sobreposto a um ícone (diretiva) -->
<button pBadge [value]="unread" severity="danger" aria-label="Mensagens não lidas">
  <i class="fa-solid fa-bell" aria-hidden="true"></i>
</button>`,
    html: `<!-- contagem com nome acessível no elemento que a carrega -->
<button type="button" aria-label="Notificações: 3 não lidas">
  <span aria-hidden="true">🔔</span>
  <span class="badge" data-severity="danger" aria-hidden="true">3</span>
</button>`,
    inContext: `<!-- badge de status num item de menu -->
<a href="/pendencias">
  Pendências
  <span class="badge" data-severity="warn" aria-hidden="true">5</span>
  <span class="visually-hidden">(5 pendências)</span>
</a>`,
  },

  a11y: {
    role: 'nenhum próprio (marcador visual); a informação precisa existir em texto acessível',
    keyboard: ['não focável; quem recebe foco é o elemento que o carrega (botão/link)'],
    requiredAria: [
      'texto equivalente no pai (aria-label) ou texto visualmente oculto',
      'o número visual pode ser `aria-hidden` se já houver o texto acessível',
    ],
    contrastMin: '4.5:1 do número sobre o fundo do badge (texto pequeno)',
  },

  aiHints: {
    keywords: [
      'badge', 'contador', 'contagem', 'não lidos', 'nao lidos', 'notificação', 'notificacao',
      'selo', 'pontinho', 'indicador', 'número sobreposto', 'numero sobreposto', 'unread',
    ],
    selectionCriteria:
      'Escolha Badge para uma contagem curta ou ponto de status, quase sempre sobre outro elemento (ícone/botão). Status com texto legível = Tag; etiqueta removível = Chip.',
    disambiguation: [
      { confundeCom: 'tag', criterio: 'Tag mostra um status/categoria com texto; Badge é contagem/ponto mínimo.' },
      { confundeCom: 'chip', criterio: 'Chip é interativo/removível; Badge é só marcador visual.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/badge',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Quirk documentado: severidades sem `help` (secondary/info/success/warn/danger/contrast).',
  },
};
