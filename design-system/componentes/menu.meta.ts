/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · menu.meta.ts — ONDA 4 (navegação)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-menu`. API lida do código real
 * (primeng@21.0.2, `types/primeng-menu.d.ts`).
 *
 * Lista VERTICAL de ações/destinos. Pode ficar fixa (inline) ou abrir
 * como popup a partir de um botão (`popup=true`). O "menu item" é PARTE
 * (modelo MenuItem), não ficha própria.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const menuMeta: NephosComponentMeta = {
  identity: {
    id: 'menu',
    name: 'Menu',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Lista vertical de ações ou destinos, fixa ou aberta a partir de um botão.',
    whenToUse: [
      'Menu de ações de um item (⋯ "mais opções") como popup.',
      'Navegação lateral vertical entre seções.',
    ],
    whenNotToUse: [
      'Navegação principal horizontal do app — use Menubar.',
      'Escolher UM valor para um formulário — use Select.',
      'Poucas ações sempre visíveis — botões diretos são mais claros.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'model',
        type: 'MenuItem[]',
        default: '[]',
        description: 'Os itens. Cada um: `label`, ação por `command` ou destino por `routerLink`/`url`, opcional `icon` (classe — ver `icon.meta.ts`), `disabled`, `separator: true` para divisória, e `items` para submenu.',
      },
      {
        name: 'popup',
        type: 'boolean',
        default: 'false',
        description: 'true = o menu fica escondido e abre a partir de um gatilho (botão), via `menu.toggle($event)`. false = menu fixo inline.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: '—',
        description: 'Nome acessível do menu (o que este conjunto de ações representa).',
      },
      {
        name: 'ariaLabelledBy',
        type: 'string',
        default: '—',
        description: 'Alternativa ao ariaLabel apontando para o id do rótulo/gatilho.',
      },
    ],
    outputs: [
      { name: 'onShow', payload: 'void', description: 'Emitido ao abrir (popup).' },
      { name: 'onHide', payload: 'void', description: 'Emitido ao fechar (popup).' },
      { name: 'onFocus', payload: 'Event', description: 'Emitido ao focar o menu.' },
      { name: 'onBlur', payload: 'Event', description: 'Emitido ao sair do foco.' },
    ],
    slots: [
      { name: 'start', accepts: 'conteúdo no topo do menu', optional: true },
      { name: 'end', accepts: 'conteúdo no rodapé do menu', optional: true },
      { name: 'item', accepts: 'template do item', optional: true },
    ],
    states: ['closed', 'open', 'item-focus', 'item-disabled'],
    invalidCombinations: [
      {
        combo: 'popup=true sem um gatilho com aria-haspopup/aria-expanded',
        porque: 'O botão que abre precisa anunciar que controla um menu e seu estado aberto/fechado.',
      },
      {
        combo: 'usar Menu para escolher um valor de formulário',
        porque: 'Menu dispara ações/navega; escolher um valor que fica salvo no formulário é papel do Select.',
      },
    ],
  },

  relationships: {
    parents: ['toolbar', 'page', 'app-shell'],
    children: ['icon', 'divider'],
    commonlyUsedWith: ['button', 'icon'],
    partOfPatterns: ['navigation', 'row-actions', 'app-shell'],
  },

  tokens: {
    typography: 'body-lg (item)',
    byState: {
      default: { text: 'surface/text', background: 'surface/0' },
      'item-focus': { background: 'surface/100' },
      selected: { background: 'primary/50', text: 'primary/color' },
    },
    note: 'Item em foco = fundo surface suave; item ativo/selecionado = destaque da marca (highlight). Popup herda sombra/raio do PrimeNG (overlay). Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar Menu no lugar de um Select de formulário.',
      porque: 'Menu executa ações/navega; não guarda um valor escolhido para enviar.',
      emVezDisso: 'Select quando o objetivo é escolher um valor que fica no formulário.',
    },
    {
      regra: 'Nunca abrir menu popup sem estado acessível no gatilho.',
      porque: 'Sem aria-haspopup/aria-expanded, quem usa leitor de tela não sabe que há um menu nem se está aberto.',
      emVezDisso: 'Botão com aria-haspopup="menu" e aria-expanded refletindo aberto/fechado.',
    },
    {
      regra: 'Nunca esconder ações críticas/frequentes dentro de um popup.',
      porque: 'Ação escondida atrás de um clique extra é fácil de não encontrar.',
      emVezDisso: 'Deixar as ações principais visíveis; o menu guarda as secundárias.',
    },
  ],

  examples: {
    angular: `<p-button (click)="menu.toggle($event)" [attr.aria-haspopup]="true" ariaLabel="Ações da bolsa" />
<p-menu #menu [model]="[
  { label: 'Ver histórico', routerLink: '/historico' },
  { label: 'Editar', command: () => editar() },
  { separator: true },
  { label: 'Excluir', command: () => excluir() }
]" [popup]="true" />`,
    html: `<button type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="acoes">
  Ações
</button>
<ul id="acoes" role="menu" aria-label="Ações da bolsa" hidden>
  <li role="none"><a role="menuitem" href="/historico">Ver histórico</a></li>
  <li role="none"><button role="menuitem" type="button">Editar</button></li>
  <li role="separator"></li>
  <li role="none"><button role="menuitem" type="button">Excluir</button></li>
</ul>`,
    inContext: `<!-- menu vertical fixo de navegação lateral -->
<nav aria-label="Seções">
  <ul role="menu">
    <li role="none"><a role="menuitem" href="/painel" aria-current="page">Painel</a></li>
    <li role="none"><a role="menuitem" href="/bolsas">Bolsas</a></li>
    <li role="none"><a role="menuitem" href="/relatorios">Relatórios</a></li>
  </ul>
</nav>`,
  },

  a11y: {
    role: 'menu / menuitem (popup) ou navigation + lista (menu de navegação fixo)',
    keyboard: ['Setas ↑/↓ movem entre itens', 'Enter/Espaço ativa', 'Esc fecha o popup e devolve foco ao gatilho'],
    requiredAria: [
      'popup: gatilho com aria-haspopup e aria-expanded; menu com aria-label',
      'itens com role="menuitem" (ou links num `<nav>` para menu de navegação)',
      'foco gerenciado (roving tabindex) dentro do menu',
    ],
    contrastMin: '4.5:1 do texto do item; 3:1 do realce do item em foco',
  },

  aiHints: {
    keywords: [
      'menu', 'menu vertical', 'ações', 'acoes', 'mais opções', 'mais opcoes',
      'menu de contexto', 'menu lateral', 'popup de ações', 'dropdown de ações', 'kebab', '⋯',
    ],
    selectionCriteria:
      'Escolha Menu para uma lista vertical de ações/destinos — como popup (⋯ "mais opções") ou navegação lateral fixa. Navegação horizontal principal = Menubar; escolher um valor = Select.',
    disambiguation: [
      { confundeCom: 'select', criterio: 'Select escolhe um valor para o formulário; Menu dispara ações/navega.' },
      { confundeCom: 'menubar', criterio: 'Menubar é a barra horizontal principal; Menu é vertical (lateral ou popup).' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/menu',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Ícone do item segue `icon.meta.ts`; popup herda overlay do PrimeNG.',
  },
};
