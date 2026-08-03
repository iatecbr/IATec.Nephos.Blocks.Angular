/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · image.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-image`. API lida do código real
 * (primeng@21.0.2, `types/primeng-image.d.ts`).
 *
 * Imagem de conteúdo com opção de PREVIEW (abre em tela cheia com
 * zoom/rotação). A saída do Moses é sempre um `<img>` semântico com
 * `alt` — o `alt` é a decisão de acessibilidade mais importante aqui.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const imageMeta: NephosComponentMeta = {
  identity: {
    id: 'image',
    name: 'Image',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Imagem de conteúdo, com opção de ampliar em tela cheia.',
    whenToUse: [
      'Mostrar uma foto/figura que é conteúdo (não decoração).',
      'Permitir ampliar/girar a imagem (preview) quando o detalhe importa.',
    ],
    whenNotToUse: [
      'Símbolo pequeno de UI — use Icon.',
      'Foto de pessoa/entidade num contexto compacto — use Avatar.',
      'Imagem puramente decorativa — use `<img alt="">` (alt vazio) ou CSS de fundo.',
    ],
  },

  api: {
    inputs: [
      { name: 'src', type: 'string', default: '(obrigatório)', description: 'Caminho da imagem.' },
      {
        name: 'alt',
        type: 'string',
        default: '(obrigatório para imagem de conteúdo)',
        description: 'Texto alternativo que DESCREVE a imagem. Se a imagem é decorativa, usar `alt=""` (vazio, não omitir). O alt é o que o leitor de tela anuncia.',
      },
      {
        name: 'loading',
        type: "'lazy' | 'eager'",
        default: 'lazy',
        description: '`lazy` adia o carregamento até chegar perto da viewport (bom para listas). `eager` para imagens acima da dobra que devem aparecer já.',
      },
      {
        name: 'preview',
        type: 'boolean',
        default: 'false',
        description: 'Ativa a ampliação em tela cheia (zoom/rotação). Só quando o detalhe da imagem justifica.',
      },
      { name: 'width', type: 'string', default: '—', description: 'Largura. Definir width/height evita o salto de layout enquanto carrega.' },
      { name: 'height', type: 'string', default: '—', description: 'Altura. Ver width.' },
    ],
    outputs: [
      { name: 'onShow', payload: 'void', description: 'Emitido ao abrir o preview.' },
      { name: 'onHide', payload: 'void', description: 'Emitido ao fechar o preview.' },
      { name: 'onImageError', payload: 'Event', description: 'Emitido quando a imagem falha ao carregar — usar para mostrar um fallback.' },
    ],
    slots: [
      { name: 'image', accepts: 'template de imagem customizado', optional: true },
      { name: 'preview', accepts: 'template do preview ampliado', optional: true },
    ],
    states: ['default', 'loading', 'preview-open', 'error'],
    invalidCombinations: [
      {
        combo: 'imagem de conteúdo sem `alt` descritivo',
        porque: 'Quem usa leitor de tela não recebe a informação da imagem (ou ouve o nome do arquivo).',
      },
      {
        combo: 'imagem decorativa com `alt` descritivo',
        porque: 'Adiciona ruído — o leitor de tela lê algo que não agrega. Decorativa = `alt=""`.',
      },
      {
        combo: 'preview=true numa imagem sem detalhe a ampliar',
        porque: 'Cria uma interação (abrir tela cheia) que não entrega valor e confunde.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'gallery', 'article', 'page'],
    children: [],
    commonlyUsedWith: ['card', 'skeleton'],
    partOfPatterns: ['gallery', 'card', 'article'],
  },

  tokens: {
    typography: '—',
    byState: {
      'preview-open': { mask: 'surface/overlay-mask' },
    },
    note: 'A imagem em si não tem cor de tema; a máscara do preview e as bordas herdam do PrimeNG (overlay.mask, content.borderRadius). Nada de hex.',
  },

  antiPatterns: [
    {
      regra: 'Nunca omitir o `alt` de uma imagem de conteúdo.',
      porque: 'A informação da imagem não chega a quem usa leitor de tela.',
      emVezDisso: 'Um `alt` que descreve o que a imagem mostra; se for decorativa, `alt=""`.',
    },
    {
      regra: 'Nunca usar Image para símbolos de interface.',
      porque: 'Ícones precisam escalar, herdar cor e ter significado — um `<img>` não faz isso bem.',
      emVezDisso: 'Icon (símbolo de UI) ou Avatar (pessoa/entidade).',
    },
    {
      regra: 'Nunca carregar imagem sem reservar espaço (width/height).',
      porque: 'A página "pula" quando a imagem chega (layout shift).',
      emVezDisso: 'Definir width/height (ou proporção) e, se demorar, um Skeleton no lugar.',
    },
  ],

  examples: {
    angular: `<p-image src="/campanha.jpg" alt="Alunos no pátio da escola" [preview]="true" width="320" />`,
    html: `<img src="/campanha.jpg" alt="Alunos no pátio da escola" width="320" height="180" loading="lazy" />`,
    inContext: `<!-- imagem de conteúdo num card, com espaço reservado -->
<article data-block="card">
  <img src="/campanha.jpg" alt="Alunos no pátio da escola"
       width="320" height="180" loading="lazy" />
  <h3>Campanha de bolsas 2026</h3>
</article>`,
  },

  a11y: {
    role: 'img',
    keyboard: ['preview: Enter/Espaço abre (quando o gatilho é focável); Esc fecha o preview'],
    requiredAria: [
      '`alt` descritivo para imagem de conteúdo; `alt=""` para decorativa',
      'preview: foco preso no visualizador e Esc para fechar',
    ],
    contrastMin: 'não se aplica ao conteúdo da imagem; os controles do preview seguem 3:1',
  },

  aiHints: {
    keywords: [
      'imagem', 'image', 'foto', 'figura', 'ilustração', 'ilustracao', 'preview',
      'ampliar', 'zoom', 'galeria', 'img', 'banner',
    ],
    selectionCriteria:
      'Escolha Image para uma foto/figura que é conteúdo. Decida o `alt` (descritivo vs vazio) pelo papel da imagem. Símbolo de UI = Icon; pessoa em contexto compacto = Avatar.',
    disambiguation: [
      { confundeCom: 'icon', criterio: 'Icon é símbolo pequeno de UI que herda cor; Image é conteúdo fotográfico.' },
      { confundeCom: 'avatar', criterio: 'Avatar representa pessoa/entidade em espaço compacto; Image é a figura em si.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/image',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída = `<img>` semântico com alt; a camada Nephos reforça a regra do alt e do espaço reservado.',
  },
};
