/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · avatar.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-avatar`. API lida do código real
 * (primeng@21.0.2, `types/primeng-avatar.d.ts`).
 *
 * Representa visualmente uma PESSOA ou ENTIDADE em espaço compacto:
 * foto (image), iniciais (label) ou, em último caso, um ícone (Font
 * Awesome — ver `icon.meta.ts`). O nome acessível é obrigatório quando
 * o avatar não vem acompanhado do nome em texto.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const avatarMeta: NephosComponentMeta = {
  identity: {
    id: 'avatar',
    name: 'Avatar',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Miniatura que representa uma pessoa ou entidade (foto, iniciais ou ícone).',
    whenToUse: [
      'Identificar o usuário logado, autor de um registro, membro de uma lista.',
      'Dar rosto a uma entidade em espaço compacto (linha de tabela, cabeçalho).',
    ],
    whenNotToUse: [
      'Imagem de conteúdo (foto que É o conteúdo) — use Image.',
      'Símbolo de ação/conceito — use Icon.',
      'Contagem/status mínimo — use Badge (pode ir SOBRE o avatar).',
    ],
  },

  api: {
    inputs: [
      {
        name: 'image',
        type: 'string (url)',
        default: '—',
        description: 'Foto da pessoa/entidade. É a 1ª escolha quando existe. Precisa de nome acessível (não confiar no alt da imagem interna).',
      },
      {
        name: 'label',
        type: 'string',
        default: '—',
        description: 'Iniciais (ex.: "IA") quando não há foto. Curto (1–2 letras). Fallback preferível ao ícone.',
      },
      {
        name: 'icon',
        type: 'string (classe Font Awesome, ex.: "fa-solid fa-user")',
        default: '—',
        description: 'Ícone genérico quando não há foto nem iniciais úteis. Segue `icon.meta.ts` (Font Awesome). É o último recurso.',
      },
      {
        name: 'shape',
        type: "'circle' | 'square'",
        default: 'square',
        description: 'Formato. `circle` é o mais comum para pessoas.',
      },
      {
        name: 'size',
        type: "'normal' | 'large' | 'xlarge'",
        default: 'normal',
        description: 'Tamanho do avatar.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: '—',
        description: 'Nome acessível (o nome da pessoa/entidade). Obrigatório quando o nome não aparece em texto ao lado.',
      },
    ],
    outputs: [],
    slots: [],
    states: ['image', 'initials', 'icon'],
    invalidCombinations: [
      {
        combo: 'avatar sem foto, sem iniciais e sem nome acessível',
        porque: 'Vira um ícone genérico anônimo — não identifica ninguém para quem usa leitor de tela.',
      },
      {
        combo: 'usar Avatar para uma imagem que é conteúdo',
        porque: 'Avatar é identidade compacta; uma foto que É o conteúdo (com detalhe a ver) é Image.',
      },
    ],
  },

  relationships: {
    parents: ['menubar', 'card', 'list', 'toolbar', 'table'],
    children: ['icon', 'badge'],
    commonlyUsedWith: ['badge', 'menu', 'text'],
    partOfPatterns: ['user-menu', 'comment', 'list-item'],
  },

  tokens: {
    typography: 'body-sm (iniciais)',
    byState: {
      initials: { background: 'surface/200', text: 'surface/text' },
      icon: { background: 'surface/200', text: 'surface/text-muted' },
    },
    note: 'Fundo neutro (surface) com iniciais/ícone; foto preenche a área. Tamanho/raio herdam do PrimeNG. Não usar a marca (primary) só por decoração. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar o avatar sem nome acessível quando o nome não está em texto.',
      porque: 'A foto/iniciais/ícone sozinhos não são anunciados — a pessoa não sabe quem é.',
      emVezDisso: 'aria-label com o nome, ou o nome visível ao lado (aí o avatar pode ser aria-hidden).',
    },
    {
      regra: 'Nunca usar Avatar para foto de conteúdo.',
      porque: 'Avatar é miniatura de identidade; conteúdo fotográfico com detalhe é Image.',
      emVezDisso: 'Image quando a foto é o conteúdo; Avatar quando é o "rosto" compacto de alguém.',
    },
    {
      regra: 'Nunca cair direto no ícone genérico tendo iniciais disponíveis.',
      porque: 'Iniciais identificam melhor que um ícone de pessoa igual para todos.',
      emVezDisso: 'Ordem: foto → iniciais → ícone (só quando não há nem nome para iniciais).',
    },
  ],

  examples: {
    angular: `<p-avatar image="/foto-usuario.jpg" shape="circle" ariaLabel="Indiane Pita" />
<p-avatar label="IP" shape="circle" ariaLabel="Indiane Pita" />
<p-avatar icon="fa-solid fa-user" shape="circle" ariaLabel="Usuário sem foto" />`,
    html: `<!-- com foto: nome no alt -->
<img class="avatar" src="/foto-usuario.jpg" alt="Indiane Pita" width="40" height="40" />

<!-- iniciais: nome acessível -->
<span class="avatar" role="img" aria-label="Indiane Pita" aria-hidden="false">IP</span>`,
    inContext: `<!-- avatar + nome no menu do usuário (avatar decorativo, nome em texto) -->
<button type="button" aria-haspopup="menu" aria-expanded="false">
  <span class="avatar" aria-hidden="true">IP</span>
  <span>Indiane Pita</span>
</button>`,
  },

  a11y: {
    role: 'img (quando representa a pessoa e não há nome em texto); decorativo quando o nome está ao lado',
    keyboard: ['não focável por si; o controle que o contém (botão/link) recebe foco'],
    requiredAria: [
      'nome acessível: aria-label (iniciais/ícone) ou alt (foto)',
      'quando o nome já aparece em texto ao lado, o avatar pode ser aria-hidden',
    ],
    contrastMin: '4.5:1 das iniciais sobre o fundo do avatar',
  },

  aiHints: {
    keywords: [
      'avatar', 'foto de perfil', 'perfil', 'usuário', 'usuario', 'iniciais',
      'rosto', 'membro', 'autor', 'imagem de usuário', 'imagem de usuario',
    ],
    selectionCriteria:
      'Escolha Avatar para representar uma pessoa/entidade em espaço compacto (foto → iniciais → ícone). Foto de conteúdo = Image; símbolo de ação = Icon; contagem = Badge (pode ir sobre o avatar).',
    disambiguation: [
      { confundeCom: 'image', criterio: 'Image é foto de conteúdo com detalhe; Avatar é miniatura de identidade.' },
      { confundeCom: 'icon', criterio: 'Icon representa ação/conceito; Avatar representa quem/qual entidade.' },
      { confundeCom: 'badge', criterio: 'Badge é contagem/status mínimo, muitas vezes SOBRE o avatar; não substitui a identidade.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/avatar',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). O ícone de fallback usa Font Awesome (`icon.meta.ts`); regra de nome acessível é a camada Nephos.',
  },
};
