/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · speeddial.meta.ts — ONDA 4 (navegação · Menus B)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-speeddial`. API lida do código real
 * (primeng@21.0.2, `types/primeng-speeddial.d.ts`).
 *
 * Botão de ação flutuante (FAB) que, ao ser pressionado, revela várias
 * ações primárias em leque (linha, círculo ou semicírculo). Recolhe-se
 * de volta num único botão. O item é PARTE (modelo MenuItem — ícone +
 * tooltip por ação), não ficha própria.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const speedDialMeta: NephosComponentMeta = {
  identity: {
    id: 'speeddial',
    name: 'SpeedDial',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Botão flutuante que, ao ser pressionado, abre várias ações primárias em leque.',
    whenToUse: [
      'Reunir 2–5 ações primárias de uma tela num único ponto flutuante (ex.: "novo", "importar", "compartilhar").',
      'Quando a tela precisa de uma ação principal sempre alcançável sem ocupar espaço fixo no layout.',
    ],
    whenNotToUse: [
      'Uma única ação — um botão flutuante simples (FAB) já basta, sem o leque.',
      'Muitas ações ou ações secundárias — use um Menu (popup) com rótulos de texto.',
      'Navegação entre áreas do app — use Menubar/Dock, não um botão de ações.',
      'Ações que dependem de rótulo de texto para serem entendidas — o SpeedDial mostra ícones.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'model',
        type: 'MenuItem[]',
        default: 'null',
        description: 'As ações do leque. Cada item costuma ter `icon` (classe — ver `icon.meta.ts`), `label` (usado como tooltip/nome acessível) e ação por `command` (ou destino por `routerLink`). Manter poucas ações primárias.',
      },
      {
        name: 'direction',
        type: "'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right'",
        default: "'up'",
        description: 'Para que lado as ações se abrem a partir do botão. Escolher conforme o canto em que o FAB está ancorado (ex.: canto inferior direito → `up` ou `up-left`).',
      },
      {
        name: 'type',
        type: "'linear' | 'circle' | 'semi-circle' | 'quarter-circle'",
        default: "'linear'",
        description: 'Formato do leque: `linear` (fileira reta), `circle`, `semi-circle` ou `quarter-circle`. `linear` é o mais previsível; as formas curvas precisam de `radius`.',
      },
      {
        name: 'radius',
        type: 'number',
        default: '0',
        description: 'Raio (px) das disposições em círculo/semicírculo/quarto de círculo. Ignorado no tipo `linear`.',
      },
      {
        name: 'mask',
        type: 'boolean',
        default: 'false',
        description: 'true = escurece o resto da tela por trás enquanto o leque está aberto, focando a atenção nas ações. Bom quando as ações são consequentes.',
      },
      {
        name: 'visible',
        type: 'boolean',
        default: 'false',
        description: 'Estado aberto/fechado do leque (two-way com `visibleChange`). Normalmente controlado pelo próprio componente; só amarrar se precisar abrir/fechar por código.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Desabilita o botão e as ações. Como todo estado desabilitado, precisa de motivo claro para a pessoa.',
      },
      {
        name: 'hideOnClickOutside',
        type: 'boolean',
        default: 'true',
        description: 'Fecha o leque ao clicar fora dele. Manter true para o comportamento esperado de overlay.',
      },
      {
        name: 'rotateAnimation',
        type: 'boolean',
        default: 'true',
        description: 'Gira o ícone do botão ao abrir (ex.: "+" vira "×") quando não há `hideIcon` separado. Reforço visual do estado aberto.',
      },
      {
        name: 'tooltipOptions',
        type: 'TooltipOptions',
        default: '—',
        description: 'Opções do tooltip mostrado em cada ação (posição, evento). Como os itens são ícones, o tooltip carrega o nome legível da ação.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: '—',
        description: 'Nome acessível do botão que abre o leque (ex.: "Ações rápidas"). Essencial, já que o botão costuma ser só um ícone.',
      },
      {
        name: 'ariaLabelledBy',
        type: 'string',
        default: '—',
        description: 'Alternativa ao ariaLabel apontando para o id de um rótulo visível.',
      },
      {
        name: 'buttonProps',
        type: 'ButtonProps',
        default: '—',
        description: 'Repassa propriedades ao Button interno que dispara o leque (ver `button.meta.ts`), como severity/rounded. Usar com parcimônia para manter o padrão do FAB.',
      },
    ],
    outputs: [
      { name: 'onClick', payload: 'MouseEvent', description: 'Emitido ao clicar no botão principal (o que abre/fecha o leque).' },
      { name: 'onShow', payload: 'Event', description: 'Emitido quando as ações ficam visíveis (leque aberto).' },
      { name: 'onHide', payload: 'Event', description: 'Emitido quando as ações são escondidas (leque fechado).' },
      { name: 'onVisibleChange', payload: 'boolean', description: 'Emitido quando a visibilidade muda (valor aberto/fechado).' },
      { name: 'visibleChange', payload: 'boolean', description: 'Par two-way de `visible`; emite o novo estado aberto/fechado.' },
    ],
    slots: [
      { name: 'button', accepts: 'template do botão principal', optional: true },
      { name: 'item', accepts: 'template de cada ação', optional: true },
      { name: 'icon', accepts: 'template do ícone do botão principal', optional: true },
    ],
    states: ['closed', 'open', 'item-focus', 'disabled'],
    invalidCombinations: [
      {
        combo: 'botão do SpeedDial ou suas ações só com ícone, sem nome acessível',
        porque: 'Ícone sem aria-label/tooltip não é anunciado; a pessoa não sabe o que o botão nem cada ação faz.',
      },
      {
        combo: 'SpeedDial com uma única ação',
        porque: 'O leque só faz sentido com 2+ ações; para uma, um botão flutuante direto é mais claro e rápido.',
      },
      {
        combo: 'radius definido com type="linear"',
        porque: 'O raio só governa as formas curvas (circle/semi-circle/quarter-circle); no linear ele não tem efeito.',
      },
    ],
  },

  relationships: {
    parents: ['page', 'app-shell'],
    children: ['button', 'icon', 'tooltip'],
    commonlyUsedWith: ['button', 'tooltip', 'icon'],
    partOfPatterns: ['row-actions', 'app-shell'],
  },

  tokens: {
    typography: 'caption (tooltip da ação)',
    byState: {
      default: { background: 'primary/color', text: 'primary/contrast' },
      hover: { background: 'primary/hover' },
      'item-focus': { background: 'surface/100' },
    },
    note: 'O botão principal usa a ênfase da marca (primary) como um FAB; as ações herdam o estilo de botão do PrimeNG. A máscara escurece a superfície; raio, sombra e a animação do leque herdam do PrimeNG. Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar o botão ou as ações só com ícone, sem nome acessível.',
      porque: 'Sem aria-label/tooltip, quem usa leitor de tela não sabe o que o FAB abre nem o que cada ação executa.',
      emVezDisso: 'ariaLabel no botão e `label`/tooltip em cada ação; ícones marcados como aria-hidden.',
    },
    {
      regra: 'Nunca usar SpeedDial para uma única ação.',
      porque: 'O leque adiciona um passo (abrir) sem ganho quando só existe uma ação.',
      emVezDisso: 'Um botão flutuante simples com a ação direta.',
    },
    {
      regra: 'Nunca esconder ações secundárias ou raramente usadas atrás do FAB.',
      porque: 'O SpeedDial ocupa um ponto de destaque; ações secundárias ali competem com a ação primária e confundem.',
      emVezDisso: 'Reservar o leque para 2–5 ações PRIMÁRIAS; secundárias vão num Menu com rótulos de texto.',
    },
  ],

  examples: {
    angular: `<p-speeddial [model]="[
  { label: 'Novo aluno', icon: 'user-plus', command: () => novoAluno() },
  { label: 'Importar', icon: 'file-import', command: () => importar() },
  { label: 'Compartilhar', icon: 'share-nodes', command: () => compartilhar() }
]" direction="up" type="linear" ariaLabel="Ações rápidas" />`,
    html: `<div data-block="speeddial">
  <button type="button" aria-haspopup="menu" aria-expanded="false"
          aria-controls="acoes-rapidas" aria-label="Ações rápidas">
    <i class="fa-solid fa-plus" aria-hidden="true"></i>
  </button>
  <ul id="acoes-rapidas" role="menu" hidden>
    <li role="none">
      <button role="menuitem" type="button" aria-label="Novo aluno">
        <i class="fa-solid fa-user-plus" aria-hidden="true"></i>
      </button>
    </li>
    <li role="none">
      <button role="menuitem" type="button" aria-label="Importar">
        <i class="fa-solid fa-file-import" aria-hidden="true"></i>
      </button>
    </li>
    <li role="none">
      <button role="menuitem" type="button" aria-label="Compartilhar">
        <i class="fa-solid fa-share-nodes" aria-hidden="true"></i>
      </button>
    </li>
  </ul>
</div>`,
    inContext: `<!-- FAB ancorado no canto inferior direito de uma listagem -->
<main data-block="listagem">
  <!-- ...tabela de bolsas... -->
</main>
<div data-block="speeddial" data-position="bottom-right">
  <button type="button" aria-haspopup="menu" aria-expanded="false"
          aria-controls="fab-acoes" aria-label="Ações da bolsa">
    <i class="fa-solid fa-plus" aria-hidden="true"></i>
  </button>
  <ul id="fab-acoes" role="menu" hidden>
    <li role="none"><button role="menuitem" type="button" aria-label="Nova solicitação"><i class="fa-solid fa-plus" aria-hidden="true"></i></button></li>
    <li role="none"><button role="menuitem" type="button" aria-label="Exportar"><i class="fa-solid fa-file-export" aria-hidden="true"></i></button></li>
  </ul>
</div>`,
  },

  a11y: {
    role: 'botão com aria-haspopup que abre um grupo de ações (menu); cada ação é um botão',
    keyboard: [
      'Enter/Espaço no botão abre/fecha o leque',
      'Setas movem entre as ações',
      'Esc fecha o leque e devolve o foco ao botão',
      'Home/End vão à primeira/última ação',
    ],
    requiredAria: [
      'botão com aria-label e aria-haspopup; aria-expanded refletindo aberto/fechado',
      'cada ação com nome acessível (aria-label ou tooltip); ícone com aria-hidden',
      'foco gerenciado entre as ações e devolvido ao botão ao fechar',
    ],
    contrastMin: '4.5:1 do texto do tooltip; 3:1 do ícone do botão e do realce da ação em foco',
  },

  aiHints: {
    keywords: [
      'speeddial', 'speed dial', 'botão flutuante', 'botao flutuante', 'fab', 'floating action button',
      'ações rápidas', 'acoes rapidas', 'botão de ações', 'botao de acoes', 'menu em leque', 'ações em leque', 'acoes em leque', 'botão +', 'botao +',
    ],
    selectionCriteria:
      'Escolha SpeedDial para reunir 2–5 ações PRIMÁRIAS num botão flutuante que abre em leque. Uma ação só = FAB simples; muitas ações ou ações que precisam de rótulo = Menu (popup); navegar entre áreas = Menubar/Dock.',
    disambiguation: [
      { confundeCom: 'menu', criterio: 'Menu (popup) lista ações com rótulos de texto a partir de um gatilho; SpeedDial abre ícones em leque a partir de um FAB.' },
      { confundeCom: 'dock', criterio: 'Dock fica sempre visível numa borda como faixa de atalhos; SpeedDial fica recolhido num botão e só abre ao clicar.' },
      { confundeCom: 'button', criterio: 'Para UMA ação flutuante use um Button; SpeedDial só quando há várias ações a revelar.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/speeddial',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Botão principal e ações herdam o Button do PrimeNG (ver `button.meta.ts`); ícone de conteúdo segue `icon.meta.ts`; leque/máscara/animação herdam do PrimeNG.',
  },
};
