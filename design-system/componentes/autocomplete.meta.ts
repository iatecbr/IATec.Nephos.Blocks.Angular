/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · autocomplete.meta.ts — ONDA "FORMULÁRIO AVANÇADO"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-autocomplete`. API lida do código real
 * (primeng@21.0.2, `types/primeng-autocomplete.d.ts`).
 *
 * Campo que SUGERE valores enquanto a pessoa digita. O coração é o
 * `completeMethod`: a cada tecla (com debounce), você busca/filtra e
 * devolve `suggestions`. Ideal para listas GRANDES ou que vêm do
 * servidor. Pode selecionar um ou vários (chips). Saída = um combobox
 * ARIA (`role="combobox"` + `role="listbox"`), com rótulo.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const autoCompleteMeta: NephosComponentMeta = {
  identity: {
    id: 'autocomplete',
    name: 'AutoComplete',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Campo que sugere valores de uma lista enquanto a pessoa digita.',
    whenToUse: [
      'Escolher de uma lista GRANDE onde rolar seria inviável (cidades, escolas, produtos).',
      'Buscar valores que vêm do servidor conforme se digita.',
      'Selecionar vários itens como chips (multiple).',
    ],
    whenNotToUse: [
      'Lista curta e fixa (até ~7 opções) — use Select.',
      'Marcar vários de uma lista fechada pequena — use MultiSelect.',
      'Buscar/filtrar CONTEÚDO de outra área (resultados numa tabela) — use Search Input.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'suggestions',
        type: 'any[]',
        default: '[]',
        description: 'As opções mostradas AGORA. Você as preenche dentro do `completeMethod` (buscando/filtrando pelo que foi digitado).',
      },
      {
        name: 'optionLabel',
        type: 'string | ((item) => string)',
        default: '—',
        description: 'Qual campo do objeto mostrar (ex.: "nome"). Se as opções são strings simples, dispensável.',
      },
      {
        name: 'optionValue',
        type: 'string | ((item) => string)',
        default: '—',
        description: 'Qual campo guardar como valor (ex.: "id"). Sem ele, guarda o objeto inteiro.',
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description: 'Permite escolher vários — cada selecionado vira um chip removível (ver ficha `chip`).',
      },
      {
        name: 'dropdown',
        type: 'boolean',
        default: 'false',
        description: 'Mostra um botão de seta para abrir a lista sem digitar (ver tudo). `dropdownMode` controla o comportamento.',
      },
      {
        name: 'forceSelection',
        type: 'boolean',
        default: 'false',
        description: 'Só aceita valores da lista (descarta texto livre que não casa). Ligar quando o valor DEVE existir na base — evita "inventar" um item.',
      },
      {
        name: 'minLength',
        type: 'number',
        default: '1',
        description: 'Quantos caracteres antes de começar a sugerir. 2–3 evita buscas cedo demais.',
      },
      {
        name: 'delay',
        type: 'number (ms)',
        default: '300',
        description: 'Espera entre a última tecla e a busca (debounce). Protege o servidor de uma busca por tecla.',
      },
      {
        name: 'lazy / virtualScroll',
        type: 'boolean',
        default: 'false',
        description: 'Para listas enormes: carregar sob demanda (`onLazyLoad`) e/ou renderizar só o visível (`virtualScroll` + `virtualScrollItemSize`).',
      },
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        description: 'Agrupa as sugestões por categoria (`optionGroupLabel` + `optionGroupChildren`).',
      },
      {
        name: 'showClear',
        type: 'boolean',
        default: 'false',
        description: 'Botão "x" para limpar a seleção (com aria-label).',
      },
    ],
    outputs: [
      { name: 'completeMethod', payload: '{ query }', description: '⭐ Disparado ao digitar (após minLength/delay). É AQUI que você busca/filtra e atualiza `suggestions`.' },
      { name: 'onSelect', payload: '{ originalEvent, value }', description: 'Uma sugestão foi escolhida.' },
      { name: 'onUnselect', payload: '{ originalEvent, value }', description: 'Um item (multiple) foi removido.' },
      { name: 'onClear', payload: 'void', description: 'A seleção foi limpa.' },
      { name: 'onDropdownClick', payload: '{ originalEvent, query }', description: 'Abriu a lista pelo botão de seta.' },
      { name: 'onLazyLoad', payload: '{ first, last }', description: 'Modo lazy/virtual: pede mais itens.' },
    ],
    slots: [
      { name: 'item', accepts: 'template de cada sugestão (ex.: nome + detalhe)', optional: true },
      { name: 'group', accepts: 'template do cabeçalho de grupo', optional: true },
      { name: 'empty', accepts: 'mensagem quando não há sugestões', optional: true },
    ],
    states: ['default', 'typing', 'open', 'loading', 'selected', 'empty', 'invalid', 'disabled', 'readonly'],
    invalidCombinations: [
      {
        combo: 'AutoComplete sem `<label>` associado',
        porque: 'O combobox sem rótulo não é anunciado; a pessoa não sabe o que preencher.',
      },
      {
        combo: 'valor precisa existir na base, mas sem `forceSelection`',
        porque: 'A pessoa digita algo que não está na lista e o campo aceita um valor "fantasma" que o sistema não reconhece.',
      },
      {
        combo: 'lista curta e fixa num AutoComplete',
        porque: 'Obrigar a digitar para ver poucas opções é fricção à toa — isso é um Select.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'floatlabel', 'filters'],
    children: ['chip', 'icon'],
    commonlyUsedWith: ['label', 'helper-text', 'chip'],
    partOfPatterns: ['form-submission', 'filters', 'form-field'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      default: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      focus: { border: 'primary/color', ring: 'focus/ring' },
      optionFocus: { background: 'surface/100' },
      optionSelected: { background: 'primary/50', text: 'primary/color' },
      invalid: { border: 'feedback.danger/500' },
    },
    note: 'Campo herda os tokens de formulário do PrimeNG (formField.*); o painel de sugestões herda overlay; item ativo/selecionado = highlight da marca. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar o campo sem rótulo associado.',
      porque: 'Combobox sem `<label>` é anunciado como campo anônimo.',
      emVezDisso: '`<label for>` visível (ou FloatLabel); o placeholder só como exemplo.',
    },
    {
      regra: 'Nunca aceitar texto livre quando o valor precisa existir na base.',
      porque: 'Gera um valor que o sistema não reconhece (erro silencioso na hora de salvar).',
      emVezDisso: '`forceSelection` para exigir escolha da lista; ou permitir criar novo item explicitamente.',
    },
    {
      regra: 'Nunca buscar no servidor a cada tecla sem debounce/minLength.',
      porque: 'Sobrecarrega o servidor e faz a lista "piscar" a cada letra.',
      emVezDisso: '`minLength` (2–3) e `delay` (~300ms) antes de disparar o `completeMethod`.',
    },
    {
      regra: 'Nunca deixar as sugestões inacessíveis por teclado.',
      porque: 'Sem navegação por setas/anúncio, quem usa teclado/leitor de tela não escolhe.',
      emVezDisso: 'Padrão combobox: setas navegam, Enter escolhe, Esc fecha; anunciar nº de resultados (aria-live).',
    },
  ],

  examples: {
    angular: `<label for="escola">Escola</label>
<p-autocomplete inputId="escola" [(ngModel)]="escola"
  [suggestions]="opcoes" (completeMethod)="buscar($event)"
  optionLabel="nome" [forceSelection]="true" [minLength]="2" [delay]="300"
  [dropdown]="true" [fluid]="true" />

<!-- múltiplo (chips) -->
<p-autocomplete [(ngModel)]="tags" [suggestions]="opcoes"
  (completeMethod)="buscar($event)" [multiple]="true" optionLabel="nome" />`,
    html: `<label for="escola">Escola</label>
<div>
  <input id="escola" role="combobox" type="text"
         aria-expanded="false" aria-controls="escola-lb" aria-autocomplete="list"
         placeholder="Digite para buscar…" />
  <ul id="escola-lb" role="listbox" hidden>
    <li role="option" id="op-1">Colégio Adventista de Salvador</li>
    <li role="option" id="op-2">Colégio Adventista de Liberdade</li>
  </ul>
</div>`,
    inContext: `<!-- filtro por escola com feedback de resultados -->
<div data-block="form-field">
  <label for="filtro-escola">Filtrar por escola</label>
  <input id="filtro-escola" role="combobox" type="text"
         aria-expanded="true" aria-controls="fe-lb" aria-autocomplete="list"
         aria-describedby="fe-status" />
  <ul id="fe-lb" role="listbox">
    <li role="option" aria-selected="false">Colégio Adventista de Salvador</li>
  </ul>
  <span id="fe-status" class="visually-hidden" aria-live="polite">3 escolas encontradas</span>
</div>`,
  },

  a11y: {
    role: 'combobox com listbox de opções (popup)',
    keyboard: [
      'digitar filtra as sugestões',
      'setas ↑/↓ navegam a lista, Enter escolhe, Esc fecha',
      'no modo múltiplo, Backspace remove o último chip',
    ],
    requiredAria: [
      '`<label for>` associado',
      'input com role="combobox", aria-expanded, aria-controls (a lista) e aria-autocomplete="list"',
      'lista com role="listbox" e opções role="option" (aria-selected)',
      'nº de resultados anunciado (aria-live); aria-invalid + aria-describedby no erro',
    ],
    contrastMin: '4.5:1 do texto e das sugestões; 3:1 do realce da opção ativa e do foco',
  },

  aiHints: {
    keywords: [
      'autocomplete', 'autocompletar', 'sugestões', 'sugestoes', 'busca com sugestão',
      'busca com sugestao', 'typeahead', 'completar', 'buscar e selecionar', 'lista grande', 'combobox',
    ],
    selectionCriteria:
      'Escolha AutoComplete quando a pessoa DIGITA e o campo sugere de uma lista grande (ou do servidor). Use forceSelection se o valor deve existir na base. Lista curta fixa = Select; marcar vários de lista fechada = MultiSelect; filtrar conteúdo de outra área = Search Input.',
    disambiguation: [
      { confundeCom: 'select', criterio: 'Select = lista curta fixa (abre e escolhe, sem digitar); AutoComplete = digita e sugere de lista grande.' },
      { confundeCom: 'multiselect', criterio: 'MultiSelect = lista fechada com checkboxes; AutoComplete (multiple) = busca dinâmica que vira chips.' },
      { confundeCom: 'search-input', criterio: 'Search Input filtra/navega CONTEÚDO (resultados alhures); AutoComplete preenche o VALOR de um campo.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/autocomplete',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). `completeMethod` alimenta `suggestions`; múltiplo reusa `chip`; saída = combobox ARIA com listbox. Campo base em `inputtext.meta.ts`.',
  },
};
