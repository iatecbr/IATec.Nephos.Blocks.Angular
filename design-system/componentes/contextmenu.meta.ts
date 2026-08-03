/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · contextmenu.meta.ts — ONDA 4 (navegação · Menus A)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-contextmenu`. API lida do código real
 * (primeng@21.0.2, `types/primeng-contextmenu.d.ts`).
 *
 * Menu de overlay que abre no clique DIREITO (ou toque longo) sobre um
 * alvo. Fica escondido até o gesto; ligado a um elemento por `target`
 * ou ao documento inteiro por `global`. O "item" é PARTE (modelo
 * MenuItem, com submenus em cascata), não uma ficha própria.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const contextMenuMeta: NephosComponentMeta = {
  identity: {
    id: 'contextmenu',
    name: 'ContextMenu',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Menu de ações que abre no clique direito (ou toque longo) sobre um alvo.',
    whenToUse: [
      'Ações contextuais de uma linha/célula de tabela ou de um item de lista (renomear, excluir, duplicar).',
      'Dar um atalho de clique direito a ações que JÁ existem visíveis em outro lugar da tela.',
      'Áreas de trabalho densas (editor, grid, mapa) onde abrir menu no ponto do cursor economiza deslocamento.',
    ],
    whenNotToUse: [
      'Ação principal da tela — deve ter um botão visível; menu de contexto é atalho, não o único caminho.',
      'Menu aberto por um botão com clique esquerdo — use Menu (popup) ou TieredMenu.',
      'Navegação principal do app — use Menubar; escolher um valor de formulário — use Select.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'model',
        type: 'MenuItem[]',
        default: '[]',
        description: 'Os itens do menu. Cada um: `label`, ação por `command` ou destino por `routerLink`/`url`, opcional `icon` (classe — ver `icon.meta.ts`), `disabled`, `separator: true` para divisória, e `items` para submenu em cascata.',
      },
      {
        name: 'target',
        type: 'HTMLElement | string | null',
        default: 'undefined',
        description: 'O elemento (ou variável de template local) sobre o qual o clique direito abre o menu. Deixa o menu preso a essa região específica.',
      },
      {
        name: 'global',
        type: 'boolean',
        default: 'false',
        description: 'true = anexa o menu ao documento inteiro (clique direito em qualquer lugar da página abre). Usar com muito cuidado — sobrescreve o menu nativo do navegador em toda a tela.',
      },
      {
        name: 'triggerEvent',
        type: 'string',
        default: "'contextmenu'",
        description: 'O evento do DOM que abre o menu. O padrão `contextmenu` é o clique direito; raramente se muda.',
      },
      {
        name: 'pressDelay',
        type: 'number',
        default: '500',
        description: 'Em toque (mobile/tablet), quantos milissegundos de toque longo abrem o menu. Ajustar à densidade da área.',
      },
      {
        name: 'breakpoint',
        type: 'string',
        default: "'960px'",
        description: 'Largura abaixo da qual o menu adota o layout mobile (colunas empilhadas, navegação por toque).',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: 'undefined',
        description: 'Nome acessível do menu (o que este conjunto de ações representa para quem usa leitor de tela).',
      },
      {
        name: 'ariaLabelledBy',
        type: 'string',
        default: 'undefined',
        description: 'Alternativa ao ariaLabel apontando para o id de um rótulo já existente na tela.',
      },
      {
        name: 'appendTo',
        type: "'self' | 'body' | HTMLElement",
        default: "'self'",
        description: 'Onde o overlay é inserido no DOM. `body` evita corte por `overflow: hidden` de contêineres; `self` mantém junto do alvo.',
      },
    ],
    outputs: [
      { name: 'onShow', payload: 'null', description: 'Emitido quando o menu de overlay é aberto.' },
      { name: 'onHide', payload: 'null', description: 'Emitido quando o menu de overlay é fechado.' },
    ],
    slots: [
      { name: 'item', accepts: 'template do item', optional: true },
      { name: 'submenuIcon', accepts: 'template do ícone de submenu (seta)', optional: true },
    ],
    states: ['closed', 'open', 'item-focus', 'submenu-open', 'item-disabled'],
    invalidCombinations: [
      {
        combo: 'ContextMenu como único acesso a uma ação',
        porque: 'Clique direito é descoberta baixa e inacessível a muita gente (toque, teclado, iniciantes); a ação precisa existir também de forma visível.',
      },
      {
        combo: 'global=true numa página que depende do menu nativo do navegador',
        porque: 'Sobrescreve o menu de contexto do navegador em toda a tela (copiar, inspecionar, abrir em nova aba), frustrando quem espera o comportamento padrão.',
      },
    ],
  },

  relationships: {
    parents: ['table', 'data-view', 'page'],
    children: ['icon', 'divider'],
    commonlyUsedWith: ['table', 'menu', 'icon'],
    partOfPatterns: ['row-actions', 'navigation'],
  },

  tokens: {
    typography: 'body-lg (item)',
    byState: {
      default: { text: 'surface/text', background: 'surface/0' },
      'item-focus': { background: 'surface/100' },
      selected: { background: 'primary/50', text: 'primary/color' },
      'item-disabled': { text: 'surface/text-muted' },
    },
    note: 'Item em foco = fundo surface suave; item ativo = destaque da marca. O overlay herda sombra, raio e z-index do PrimeNG (overlay/menu). Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca esconder uma ação apenas no menu de contexto.',
      porque: 'Clique direito tem descoberta baixa e não funciona bem em toque nem por teclado; quem não conhece o gesto nunca acha a ação.',
      emVezDisso: 'A ação também visível (botão, menu ⋯); o ContextMenu é atalho para quem já sabe, não o único caminho.',
    },
    {
      regra: 'Nunca marcar o alvo do clique direito só pelo cursor.',
      porque: 'Quem usa teclado ou leitor de tela não percebe qual linha/item recebeu o menu.',
      emVezDisso: 'Realçar visualmente a linha/item ativo e garantir que a mesma ação exista por um caminho focável (botão de ações na linha).',
    },
    {
      regra: 'Nunca sobrescrever o menu do navegador na página toda sem necessidade real.',
      porque: 'Bloqueia comportamentos esperados (copiar, abrir link em nova aba, inspecionar) e irrita o usuário.',
      emVezDisso: 'Prender o menu a um `target` específico (a área que realmente tem ações contextuais), não `global=true`.',
    },
  ],

  examples: {
    angular: `<table #tabela pTable [value]="linhas">…</table>
<p-contextMenu [target]="tabela" [model]="[
  { label: 'Ver detalhes', icon: 'eye', command: () => ver() },
  { label: 'Editar', icon: 'pen-to-square', command: () => editar() },
  { separator: true },
  { label: 'Excluir', icon: 'trash-can', command: () => excluir() }
]" ariaLabel="Ações da linha" />`,
    html: `<button type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="ctx-linha">
  Ações
</button>
<ul id="ctx-linha" role="menu" aria-label="Ações da linha" hidden>
  <li role="none"><button role="menuitem" type="button">
    <i class="fa-solid fa-eye" aria-hidden="true"></i> Ver detalhes
  </button></li>
  <li role="none"><button role="menuitem" type="button">
    <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i> Editar
  </button></li>
  <li role="separator"></li>
  <li role="none"><button role="menuitem" type="button">
    <i class="fa-solid fa-trash-can" aria-hidden="true"></i> Excluir
  </button></li>
</ul>`,
    inContext: `<!-- tabela com ações por linha; o clique direito é ATALHO das mesmas ações do botão ⋯ -->
<table>
  <caption>Bolsas concedidas</caption>
  <thead>
    <tr><th scope="col">Aluno</th><th scope="col">Campo</th><th scope="col">Ações</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>Maria Silva</td>
      <td>Associação Bahia</td>
      <td>
        <button type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="acoes-1">
          <i class="fa-solid fa-ellipsis" aria-hidden="true"></i>
          <span class="sr-only">Ações da bolsa de Maria Silva</span>
        </button>
        <ul id="acoes-1" role="menu" aria-label="Ações da bolsa" hidden>
          <li role="none"><button role="menuitem" type="button">Ver detalhes</button></li>
          <li role="none"><button role="menuitem" type="button">Editar</button></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>`,
  },

  a11y: {
    role: 'menu / menuitem (overlay), aberto por gesto sobre o alvo',
    keyboard: [
      'Setas ↑/↓ movem entre itens; → abre submenu, ← volta',
      'Enter/Espaço ativa o item',
      'Esc fecha o menu e devolve o foco ao alvo',
    ],
    requiredAria: [
      'menu com aria-label (ou aria-labelledby) descrevendo o conjunto de ações',
      'itens com role="menuitem"; item com submenu anuncia aria-haspopup e aria-expanded',
      'a mesma ação disponível por um caminho focável (não só clique direito)',
      'foco gerenciado (roving tabindex) dentro do menu',
    ],
    contrastMin: '4.5:1 do texto do item; 3:1 do realce do item em foco',
  },

  aiHints: {
    keywords: [
      'menu de contexto', 'context menu', 'contextmenu', 'clique direito', 'botão direito', 'botao direito',
      'menu do clique direito', 'right click', 'toque longo', 'ações da linha', 'acoes da linha', 'menu contextual',
    ],
    selectionCriteria:
      'Escolha ContextMenu para ações contextuais abertas por clique direito/toque longo sobre um alvo (linha de tabela, item, área de trabalho) — sempre como ATALHO de ações que também existem visíveis. Menu aberto por botão de clique esquerdo = Menu (popup) ou TieredMenu; navegação principal = Menubar.',
    disambiguation: [
      { confundeCom: 'menu', criterio: 'Menu (popup) abre por um botão/clique esquerdo; ContextMenu abre por clique direito/toque longo sobre um alvo.' },
      { confundeCom: 'tieredmenu', criterio: 'TieredMenu é o menu em cascata aberto por gatilho comum; ContextMenu é o mesmo tipo de cascata mas disparado pelo clique direito.' },
      { confundeCom: 'menubar', criterio: 'Menubar é a barra de navegação horizontal sempre visível; ContextMenu fica escondido até o gesto.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/contextmenu',
    deltaFromPrimeng: 'Nenhum — `p-contextmenu` usado direto (origin: primeng). Ícone do item segue `icon.meta.ts`; overlay herda sombra/raio/z-index do PrimeNG. Integra nativamente com Table via `[target]`.',
  },
};
