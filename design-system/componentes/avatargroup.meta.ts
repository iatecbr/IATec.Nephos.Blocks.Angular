/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · avatargroup.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-avatarGroup`. API lida do código real
 * (primeng@21.0.2, `types/primeng-avatargroup.d.ts`).
 *
 * ⚠️ Fidelidade: é um HELPER de layout do Avatar — empilha vários
 * Avatares sobrepostos numa linha. Só faz content-projection
 * (`["*"]`); os únicos inputs do código são `style`/`styleClass`
 * (cosméticos). NÃO tem `max`/`size` nativos: o corte "+N" é feito
 * colocando um último Avatar de contagem. Filho obrigatório:
 * `avatar.meta.ts`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const avatarGroupMeta: NephosComponentMeta = {
  identity: {
    id: 'avatargroup',
    name: 'AvatarGroup',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Empilha vários avatares sobrepostos numa linha, mostrando um conjunto de pessoas em espaço compacto.',
    whenToUse: [
      'Mostrar quem participa de algo em pouco espaço: membros de um time, participantes de uma reunião, responsáveis por um registro.',
      'Resumir um grupo grande com os primeiros avatares + um último "+N" indicando o restante.',
    ],
    whenNotToUse: [
      'Uma única pessoa/entidade — use Avatar direto.',
      'Lista onde cada pessoa precisa de nome/ação visível — use uma lista com Avatar + texto por linha.',
      'Contagem pura sem rostos — use Badge ou texto.',
    ],
  },

  api: {
    inputs: [
      // O AvatarGroup não expõe @Input de conteúdo nem `max`/`size`. Do
      // código real só existem `style` e `styleClass` (cosméticos); os
      // avatares entram por content-projection (`["*"]`). O corte "+N" é
      // um Avatar extra com `label`, não um input do grupo.
    ],
    outputs: [],
    slots: [
      { name: 'default', accepts: 'a sequência de Avatares a empilhar; opcionalmente um Avatar final de contagem ("+N")' },
    ],
    states: ['default'],
    invalidCombinations: [
      {
        combo: 'AvatarGroup com um único Avatar',
        porque: 'O sentido do grupo é sobrepor VÁRIOS; com um só, use o Avatar direto.',
      },
      {
        combo: 'grupo com muitos avatares sem corte "+N" e sem resumo acessível',
        porque: 'Vira uma pilha ilegível e o leitor de tela não recebe a contagem real do conjunto.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'toolbar', 'list', 'table'],
    children: ['avatar'],
    commonlyUsedWith: ['avatar', 'badge', 'tooltip'],
    partOfPatterns: ['list-item', 'user-menu', 'comment'],
  },

  tokens: {
    typography: 'body-sm (iniciais dos avatares)',
    byState: {
      default: { background: 'surface/200', text: 'surface/text', border: 'surface/0' },
    },
    note: 'O grupo não tem cor própria: cada Avatar mantém seu fundo neutro (surface) e a borda de contraste que separa os avatares sobrepostos herda do PrimeNG. A sobreposição/raio vêm do componente. Sem hex, sem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca empilhar muitos avatares sem um corte "+N".',
      porque: 'Uma pilha longa fica ilegível e some sob a sobreposição; o número real se perde.',
      emVezDisso: 'Mostrar os primeiros (ex.: 3–5) e um Avatar final com "+N" para o restante.',
    },
    {
      regra: 'Nunca deixar o grupo sem nome/contagem acessível.',
      porque: 'Avatares sobrepostos são visuais; quem usa leitor de tela precisa saber quem/quantos são.',
      emVezDisso: 'Um resumo acessível no contêiner (ex.: aria-label "Equipe: 5 pessoas") ou nomes nos itens da lista.',
    },
    {
      regra: 'Nunca usar AvatarGroup para uma pessoa só.',
      porque: 'O componente existe para sobrepor um conjunto; com um único avatar é peso morto.',
      emVezDisso: 'Avatar direto quando há só uma pessoa/entidade.',
    },
  ],

  examples: {
    angular: `<p-avatarGroup>
  <p-avatar image="/ana.jpg" shape="circle" ariaLabel="Ana Souza" />
  <p-avatar label="BC" shape="circle" ariaLabel="Bruno Costa" />
  <p-avatar image="/duda.jpg" shape="circle" ariaLabel="Duda Lima" />
  <p-avatar label="+3" shape="circle" ariaLabel="mais 3 pessoas" />
</p-avatarGroup>`,
    html: `<!-- grupo de identidades: lista com resumo acessível -->
<ul aria-label="Equipe: 6 pessoas" data-block="avatar-group">
  <li><img class="avatar" src="/ana.jpg" alt="Ana Souza" width="32" height="32" /></li>
  <li><span class="avatar" role="img" aria-label="Bruno Costa">BC</span></li>
  <li><img class="avatar" src="/duda.jpg" alt="Duda Lima" width="32" height="32" /></li>
  <li><span class="avatar" aria-hidden="true">+3</span></li>
</ul>`,
    inContext: `<!-- responsáveis de um card, com contagem acessível -->
<article data-block="card">
  <h3>Projeto Bolsas 2026</h3>
  <ul aria-label="Responsáveis: 4 pessoas" data-block="avatar-group">
    <li><span class="avatar" role="img" aria-label="Indiane Pita">IP</span></li>
    <li><span class="avatar" role="img" aria-label="Elvys Nunes">EN</span></li>
    <li><span class="avatar" aria-hidden="true">+2</span></li>
  </ul>
</article>`,
  },

  a11y: {
    role: 'list (o grupo) com cada avatar como item; ou um contêiner com nome acessível resumindo o conjunto',
    keyboard: ['sem teclas próprias; se algum avatar for interativo, o controle que o envolve recebe foco'],
    requiredAria: [
      'resumo acessível do grupo (quantas pessoas) no contêiner',
      'cada avatar identificado (alt/aria-label) ou o avatar "+N" com aria-label do restante',
      'o avatar "+N" pode ser aria-hidden se a contagem já estiver no resumo do grupo',
    ],
    contrastMin: '4.5:1 das iniciais sobre o fundo de cada avatar; borda de separação visível',
  },

  aiHints: {
    keywords: [
      'avatar group', 'grupo de avatares', 'avatares sobrepostos', 'pilha de avatares',
      'equipe', 'participantes', 'membros', 'responsáveis', 'responsaveis',
      'fotos empilhadas', 'mais N pessoas', '+N',
    ],
    selectionCriteria:
      'Escolha AvatarGroup para mostrar VÁRIAS pessoas sobrepostas em pouco espaço, com corte "+N" quando forem muitas. Uma só pessoa = Avatar. Contagem sem rostos = Badge. Lista com nome/ação por pessoa = lista de Avatar + texto.',
    disambiguation: [
      { confundeCom: 'avatar', criterio: 'Avatar é UMA identidade; AvatarGroup empilha um CONJUNTO de avatares.' },
      { confundeCom: 'badge', criterio: 'Badge é contagem/status mínimo; AvatarGroup mostra os rostos, não só o número.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/avatar',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Inputs do código são só `style`/`styleClass`; o corte "+N" é um Avatar extra, não input nativo. Saída é HTML semântico (lista de avatares com resumo acessível).',
  },
};
