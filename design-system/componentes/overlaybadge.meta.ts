/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · overlaybadge.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-overlayBadge`. API lida do código real
 * (primeng@21.0.2, `types/primeng-overlaybadge.d.ts`).
 *
 * ⚠️ Fidelidade: é o INVÓLUCRO que posiciona um Badge SOBRE outro
 * elemento (ícone, botão, avatar) — a contagem no canto superior. É a
 * versão-componente da sobreposição que a diretiva `pBadge` também
 * faz (ver `badge.meta.ts`). As severidades são as MESMAS do Badge:
 * `secondary · info · success · warn · danger · contrast` — SEM
 * `help`, e é `warn` (não "warning"). O elemento coberto entra por
 * content-projection (`["*"]`).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const overlayBadgeMeta: NephosComponentMeta = {
  identity: {
    id: 'overlaybadge',
    name: 'OverlayBadge',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Sobrepõe um badge de contagem/status no canto de outro elemento (ícone, botão ou avatar).',
    whenToUse: [
      'Contagem de notificações no canto de um ícone de sino ou de um botão.',
      'Ponto/número de status sobre um avatar ou um ícone de menu.',
      'Sinalizar "há algo novo" ancorado a um alvo visual específico.',
    ],
    whenNotToUse: [
      'Badge que NÃO fica sobreposto (aparece em linha, ao lado de um texto) — use Badge autônomo.',
      'Status com texto legível (ex.: "Pendente") — use Tag.',
      'Etiqueta removível/interativa — use Chip.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'value',
        type: 'string | number | null',
        default: '—',
        description: 'O conteúdo do badge (contagem curta). Números longos devem virar "9+" para não estourar. Vazio = ponto de notificação sem número.',
      },
      {
        name: 'severity',
        type: "'secondary' | 'info' | 'success' | 'warn' | 'danger' | 'contrast' | null",
        default: 'secondary',
        description: '⚠️ Mesmo conjunto do Badge (NÃO tem `help`; é `warn`, não "warning"). Escolher pelo significado: danger = pendência crítica, success = concluído, info = neutro informativo, contrast = alto contraste.',
      },
      {
        name: 'badgeSize',
        type: "'small' | 'large' | 'xlarge' | null",
        default: '(normal)',
        description: 'Tamanho do badge sobreposto. (O input `size` existe mas está DEPRECADO em favor de `badgeSize`.)',
      },
      {
        name: 'badgeDisabled',
        type: 'boolean',
        default: 'false',
        description: 'Desativa o badge (esconde a contagem) mantendo o elemento coberto. Útil quando não há nada a sinalizar.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'default', accepts: 'o elemento sobre o qual o badge é ancorado (ícone, botão ou avatar)' },
    ],
    states: ['default'],
    invalidCombinations: [
      {
        combo: "severity='help' ou 'warning'",
        porque: 'O badge não tem essas severidades (o set é secondary/info/success/warn/danger/contrast). Valor fora disso quebra a fidelidade ao PrimeNG.',
      },
      {
        combo: 'OverlayBadge como único portador de informação essencial, sem texto acessível no alvo',
        porque: 'Um número minúsculo sobreposto não é lido com clareza; a informação não chega a quem usa leitor de tela.',
      },
    ],
  },

  relationships: {
    parents: ['toolbar', 'menubar', 'card'],
    children: ['icon', 'button', 'avatar'],
    commonlyUsedWith: ['icon', 'button', 'avatar'],
    partOfPatterns: ['notification', 'navigation'],
  },

  tokens: {
    typography: 'caption (número compacto)',
    byState: {
      default: { background: 'feedback.danger/500', text: 'surface/0' },
    },
    note: 'A cor do badge = a severidade escolhida (primitivo do PrimeNG via token do componente). Posição no canto, dimensões e raio herdam do PrimeNG. Nunca hex; a cor vem da `severity`.',
  },

  antiPatterns: [
    {
      regra: 'Nunca confiar só no número sobreposto para informação importante.',
      porque: 'É pequeno e ancorado no canto; quem usa leitor de tela precisa do texto equivalente.',
      emVezDisso: 'Texto acessível no elemento coberto (ex.: `<button aria-label="Notificações: 3 não lidas">`).',
    },
    {
      regra: 'Nunca inventar severidade fora do conjunto do badge.',
      porque: 'Não existe `help`/"warning" aqui; valores fora do set quebram o tema e a fidelidade.',
      emVezDisso: 'Escolher entre secondary/info/success/warn/danger/contrast.',
    },
    {
      regra: 'Nunca usar OverlayBadge quando o badge não fica sobreposto.',
      porque: 'O OverlayBadge existe para ANCORAR o badge no canto de um alvo; badge em linha ao lado de texto é o Badge autônomo.',
      emVezDisso: 'Badge autônomo quando aparece em fluxo; OverlayBadge só quando sobrepõe um ícone/botão/avatar.',
    },
  ],

  examples: {
    angular: `<p-overlayBadge [value]="unread" severity="danger">
  <i class="fa-solid fa-bell" style="font-size: 1.5rem" aria-hidden="true"></i>
</p-overlayBadge>`,
    html: `<!-- contagem sobre um ícone; nome acessível no botão que a carrega -->
<button type="button" aria-label="Notificações: 3 não lidas">
  <i class="fa-solid fa-bell" aria-hidden="true"></i>
  <span class="badge" data-severity="danger" aria-hidden="true">3</span>
</button>`,
    inContext: `<!-- badge sobre o avatar do usuário no cabeçalho -->
<button type="button" aria-haspopup="menu" aria-label="Conta de Indiane Pita, 2 avisos">
  <span class="avatar" aria-hidden="true">IP</span>
  <span class="badge" data-severity="warn" aria-hidden="true">2</span>
</button>`,
  },

  a11y: {
    role: 'nenhum próprio (marcador visual sobreposto); a informação precisa existir em texto acessível no alvo',
    keyboard: ['não focável; quem recebe foco é o elemento coberto (botão/link)'],
    requiredAria: [
      'texto equivalente no elemento coberto (aria-label) ou texto visualmente oculto',
      'o número visual pode ser `aria-hidden` se já houver o texto acessível',
    ],
    contrastMin: '4.5:1 do número sobre o fundo do badge (texto pequeno)',
  },

  aiHints: {
    keywords: [
      'overlay badge', 'badge sobreposto', 'contagem no canto', 'notificação no ícone',
      'notificacao no icone', 'sino com número', 'sino com numero', 'não lidos', 'nao lidos',
      'ponto de notificação', 'ponto de notificacao', 'contador sobreposto', 'unread',
    ],
    selectionCriteria:
      'Escolha OverlayBadge quando a contagem/ponto deve ficar ANCORADA no canto de um ícone, botão ou avatar. Badge em linha ao lado de texto = Badge autônomo. Status com texto = Tag. Sempre garantir o texto acessível no elemento coberto.',
    disambiguation: [
      { confundeCom: 'badge', criterio: 'Badge autônomo aparece em fluxo/ao lado; OverlayBadge ancora o mesmo badge SOBRE um elemento (a diretiva pBadge faz o mesmo).' },
      { confundeCom: 'avatargroup', criterio: 'AvatarGroup empilha rostos; OverlayBadge põe uma contagem sobre um único alvo.' },
      { confundeCom: 'tag', criterio: 'Tag mostra status/categoria com texto; OverlayBadge é contagem/ponto mínimo sobreposto.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/overlaybadge',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Quirk herdado do Badge: severidades sem `help` (secondary/info/success/warn/danger/contrast). Saída é HTML semântico (alvo + marcador, com texto acessível no alvo).',
  },
};
