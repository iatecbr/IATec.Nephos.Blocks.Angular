/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · splitbutton.meta.ts — família BOTÕES COMPOSTOS
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-splitbutton`. API lida do código real
 * (primeng@21.0.2, `types/primeng-splitbutton.d.ts`).
 *
 * Botão com uma AÇÃO PADRÃO (o clique principal executa direto) + uma
 * setinha ao lado que abre um menu de ações secundárias relacionadas.
 * Um só destino óbvio, com alternativas escondidas atrás do dropdown.
 * Saída = grupo com <button> de ação + <button> que controla um menu.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const splitButtonMeta: NephosComponentMeta = {
  identity: {
    id: 'splitbutton',
    name: 'SplitButton',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Botão com uma ação padrão em destaque e um menu ao lado com ações secundárias relacionadas.',
    whenToUse: [
      'Há uma ação claramente principal (ex.: "Salvar") e variações menos usadas do mesmo grupo (ex.: "Salvar e novo", "Salvar como rascunho").',
      'Você quer economizar espaço reunindo a ação primária e suas alternativas num único controle.',
      'As opções do menu são variações da MESMA intenção do botão principal.',
    ],
    whenNotToUse: [
      'Não existe uma ação claramente padrão — se todas têm o mesmo peso, use Menu/TieredMenu ou botões separados.',
      'As ações do menu não têm relação com o botão principal — isso confunde; use um Menu independente.',
      'Só existe uma ação única, sem alternativas — use Button.',
      'Muitas ações radiais/flutuantes numa tela — considere SpeedDial.',
    ],
  },

  api: {
    // API real do p-splitbutton (v21). Documentamos o que existe, não inventamos.
    inputs: [
      {
        name: 'model',
        type: 'MenuItem[]',
        default: '—',
        description: 'As ações secundárias do menu (itens com label, icon, command, separator…). É o conteúdo do overlay; a ação padrão fica no botão principal, fora do model.',
      },
      {
        name: 'label',
        type: 'string',
        default: '—',
        description: 'Texto do botão principal (a ação padrão). Verbo no infinitivo, curto ("Salvar", "Exportar").',
      },
      {
        name: 'icon',
        type: 'string',
        default: '—',
        description: 'Ícone do botão principal (classe Font Awesome). Reforça o rótulo; não substitui o texto.',
      },
      {
        name: 'iconPos',
        type: "'left' | 'right'",
        default: 'left',
        description: 'Posição do ícone em relação ao rótulo do botão principal.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast'",
        default: 'primary',
        description: 'Papel/ênfase da ação, igual ao Button. `primary` = ação esperada da marca; `secondary` = apoio. As cores vêm do tema — nunca se escolhe cor à mão.',
      },
      {
        name: 'outlined',
        type: 'boolean',
        default: 'false',
        description: 'Só contorno, fundo transparente. Rebaixa a ênfase do conjunto (botão + setinha).',
      },
      {
        name: 'text',
        type: 'boolean',
        default: 'false',
        description: 'Sem fundo nem borda. A menor ênfase possível para o conjunto.',
      },
      {
        name: 'plain',
        type: 'boolean',
        default: 'false',
        description: 'Aparência textual neutra (sem cor de severity). Use para um split button discreto e sem intenção de cor.',
      },
      {
        name: 'raised',
        type: 'boolean',
        default: 'false',
        description: 'Adiciona sombra (elevação). Usar com parcimônia; a elevação é do PrimeNG.',
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        description: 'Cantos totalmente arredondados (pílula). Padrão do produto é o raio normal.',
      },
      {
        name: 'size',
        type: "'small' | 'large'",
        default: '(normal)',
        description: 'Densidade do conjunto. `small` só em áreas densas (linhas de tabela, barras). Omitir para o padrão.',
      },
      {
        name: 'dropdownIcon',
        type: 'string',
        default: '—',
        description: 'Ícone da setinha que abre o menu (classe Font Awesome; a seta interna do PrimeNG é sobrescrita para FA).',
      },
      {
        name: 'expandAriaLabel',
        type: 'string',
        default: '—',
        description: 'Nome acessível do botão que abre o menu (ex.: "Mais opções de salvar"). Essencial: a setinha não tem texto visível.',
      },
      {
        name: 'tooltip',
        type: 'string',
        default: '—',
        description: 'Texto de tooltip do botão principal.',
      },
      {
        name: 'appendTo',
        type: "'body' | ElementRef | template",
        default: "'body'",
        description: 'Onde o overlay do menu é anexado no DOM. Padrão `body` para evitar recorte por contêineres com overflow.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Desabilita o conjunto inteiro (botão principal + setinha).',
      },
      {
        name: 'buttonDisabled',
        type: 'boolean',
        default: 'false',
        description: 'Desabilita SÓ o botão principal, mantendo o menu de ações secundárias acessível.',
      },
      {
        name: 'menuButtonDisabled',
        type: 'boolean',
        default: 'false',
        description: 'Desabilita SÓ a setinha do menu, mantendo a ação padrão disponível.',
      },
      {
        name: 'autofocus',
        type: 'boolean',
        default: 'false',
        description: 'Foca o botão principal automaticamente ao carregar. Use com cautela — só se essa é a ação esperada de imediato.',
      },
      {
        name: 'tabindex',
        type: 'number',
        default: '—',
        description: 'Ordem de tabulação do conjunto.',
      },
    ],
    outputs: [
      {
        name: 'onClick',
        payload: 'MouseEvent',
        description: 'Disparado quando o botão principal (ação padrão) é acionado.',
      },
      {
        name: 'onDropdownClick',
        payload: 'MouseEvent',
        description: 'Disparado quando a setinha do menu é acionada.',
      },
      {
        name: 'onMenuShow',
        payload: 'any',
        description: 'Disparado quando o menu de ações secundárias é aberto.',
      },
      {
        name: 'onMenuHide',
        payload: 'any',
        description: 'Disparado quando o menu de ações secundárias é fechado.',
      },
    ],
    slots: [
      { name: 'content', accepts: 'template do conteúdo customizado do botão principal', optional: true },
      { name: 'dropdownicon', accepts: 'template do ícone da setinha do menu', optional: true },
    ],
    states: ['default', 'hover', 'focus', 'active', 'disabled', 'menu-open'],
    invalidCombinations: [
      {
        combo: 'SplitButton sem uma ação padrão clara (todas as opções com o mesmo peso)',
        porque: 'O propósito do SplitButton é destacar UMA ação principal; sem ela vira um menu disfarçado — use Menu/TieredMenu.',
      },
      {
        combo: 'model com ações não relacionadas à ação principal',
        porque: 'O usuário espera que a setinha mostre variações do botão principal; ações soltas quebram essa expectativa.',
      },
      {
        combo: 'setinha do menu sem nome acessível (expandAriaLabel)',
        porque: 'A setinha não tem texto visível; sem nome acessível o leitor de tela não sabe o que ela abre.',
      },
      {
        combo: 'outlined=true + text=true',
        porque: 'Dois níveis de ênfase mutuamente exclusivos — o conjunto não pode ser contorno e sem-contorno ao mesmo tempo.',
      },
    ],
  },

  relationships: {
    parents: ['toolbar', 'card', 'datatable', 'form-actions'],
    children: ['button', 'tieredmenu', 'menu', 'icon'],
    commonlyUsedWith: ['button', 'toolbar', 'tieredmenu'],
    partOfPatterns: ['toolbar', 'row-actions', 'form-submission'],
  },

  tokens: {
    // origin: 'primeng' → tokens VÊM do SplitButton/Button do PrimeNG.
    // Documentamos só o mapeamento de PAPEL para o Moses raciocinar. Nada é sobrescrito.
    typography: 'button-lg',
    byState: {
      default: { background: 'primary/500', text: 'primary/contrast', border: 'primary/500' },
      hover: { background: 'primary/600' },
      active: { background: 'primary/700' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Herda tudo do Button do PrimeNG (altura, raio, espaçamento). A cor segue a severity, ancorada nos primitivos de marca/feedback. O menu (overlay) segue os tokens do TieredMenu. Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar SplitButton quando não há uma ação claramente padrão.',
      porque: 'A promessa do componente é "clicou, executou a ação principal". Sem ação padrão o clique fica ambíguo.',
      emVezDisso: 'Menu/TieredMenu quando todas as ações têm o mesmo peso; botões separados quando são poucas e importantes.',
    },
    {
      regra: 'Nunca colocar no menu ações sem relação com o botão principal.',
      porque: 'Quebra a expectativa (a setinha deveria mostrar variações da mesma intenção) e vira um menu genérico escondido.',
      emVezDisso: 'Um Menu independente para ações não relacionadas; no SplitButton, só variações do botão principal.',
    },
    {
      regra: 'Nunca deixar a setinha do menu sem nome acessível.',
      porque: 'Sem texto visível e sem aria-label/expandAriaLabel, o leitor de tela não anuncia o que a setinha abre.',
      emVezDisso: 'Definir `expandAriaLabel` (ex.: "Mais opções de salvar") com aria-haspopup e aria-expanded no HTML.',
    },
    {
      regra: 'Nunca aplicar cor fora dos tokens de severity do tema.',
      porque: 'Introduz matiz não prevista e quebra a consistência entre as marcas.',
      emVezDisso: 'Escolher a `severity` adequada; se nenhuma serve, pedir ao time de DS.',
    },
  ],

  examples: {
    angular: `<p-splitbutton label="Salvar" [model]="acoes" severity="primary"
  expandAriaLabel="Mais opções de salvar"
  (onClick)="salvar()" (onDropdownClick)="abrirMenu()" />`,
    html: `<div role="group" aria-label="Salvar">
  <button type="button">Salvar</button>
  <button type="button" aria-haspopup="menu" aria-expanded="false"
          aria-controls="sb-salvar-menu" aria-label="Mais opções de salvar">
    <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
  </button>
</div>
<ul id="sb-salvar-menu" role="menu" hidden>
  <li role="none"><button role="menuitem" type="button">Salvar e novo</button></li>
  <li role="none"><button role="menuitem" type="button">Salvar como rascunho</button></li>
</ul>`,
    inContext: `<!-- barra de ações de um formulário: ação padrão + variações -->
<div data-block="form-actions">
  <button type="button" data-variant="text">Cancelar</button>
  <div role="group" aria-label="Salvar">
    <button type="submit" data-variant="primary">Salvar</button>
    <button type="button" aria-haspopup="menu" aria-expanded="false"
            aria-controls="salvar-menu" aria-label="Mais opções de salvar">
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
    </button>
  </div>
</div>`,
  },

  a11y: {
    role: 'group (contém dois botões: ação padrão + botão que abre menu)',
    keyboard: [
      'Tab entra no botão principal e depois na setinha',
      'Enter/Espaço aciona o botão focado',
      'na setinha: abre o menu; setas navegam os itens; Esc fecha',
    ],
    requiredAria: [
      'nome acessível na setinha (aria-label / expandAriaLabel)',
      'aria-haspopup="menu" e aria-expanded na setinha',
      'aria-controls apontando para o menu; menu com role="menu" e itens role="menuitem"',
    ],
    contrastMin: '4.5:1 entre texto e fundo do botão; 3:1 do ícone e do foco',
  },

  aiHints: {
    keywords: [
      'splitbutton', 'split button', 'botão dividido', 'botao dividido', 'ação padrão com menu',
      'acao padrao com menu', 'salvar e', 'botão com setinha', 'botao com setinha',
      'ação principal mais opções', 'acao principal mais opcoes', 'dropdown de ação', 'dropdown de acao',
    ],
    selectionCriteria:
      'Escolha SplitButton quando há UMA ação padrão em destaque MAIS variações relacionadas escondidas atrás de uma setinha. Se todas as ações têm o mesmo peso, é Menu/TieredMenu. Se é uma ação única, é Button. Se são ações radiais flutuantes, é SpeedDial.',
    disambiguation: [
      { confundeCom: 'button', criterio: 'Button é uma ação única; SplitButton acrescenta um menu de variações da mesma ação.' },
      { confundeCom: 'menu', criterio: 'Menu/TieredMenu lista ações sem uma padrão; SplitButton tem uma ação padrão executável direto no clique.' },
      { confundeCom: 'speeddial', criterio: 'SpeedDial é um botão flutuante que irradia ações; SplitButton fica inline com ação padrão + menu.' },
      { confundeCom: 'selectbutton', criterio: 'SelectButton escolhe UM valor entre opções (controle de formulário); SplitButton dispara AÇÕES.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/splitbutton',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída = grupo com botão de ação + botão que controla um menu (role="menu"). Só a cor da marca entra pelo tema. Menu correlato em `tieredmenu.meta.ts`.',
  },
};
