/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · multiselect.meta.ts — ONDA "FORMULÁRIO AVANÇADO"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-multiselect`. API lida do código real
 * (primeng@21.0.2, `types/primeng-multiselect.d.ts`).
 *
 * Escolher VÁRIOS itens de uma lista FECHADA (que você já conhece). Abre
 * um painel com checkboxes, filtro interno e "selecionar todos". Os
 * escolhidos aparecem no campo como texto ("3 selecionados") ou chips.
 * Saída = combobox/listbox múltiplo (aria-multiselectable), com rótulo.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const multiSelectMeta: NephosComponentMeta = {
  identity: {
    id: 'multiselect',
    name: 'MultiSelect',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Escolher vários itens de uma lista fechada, com filtro e "selecionar todos".',
    whenToUse: [
      'Marcar múltiplas opções de um conjunto conhecido (status, perfis, campos, categorias).',
      'Quando a lista é média/grande e caberia melhor num painel com filtro do que em checkboxes soltos.',
    ],
    whenNotToUse: [
      'Escolher UM só — use Select.',
      'Poucas opções (2–5) sempre visíveis — use um grupo de Checkbox (menos cliques).',
      'Lista enorme ou que vem do servidor conforme digita — use AutoComplete (multiple).',
    ],
  },

  api: {
    inputs: [
      {
        name: 'options',
        type: 'any[]',
        default: '[]',
        description: 'A lista fechada de opções. Obrigatório.',
      },
      {
        name: 'optionLabel',
        type: 'string',
        default: '—',
        description: 'Campo do objeto a exibir (ex.: "nome"). Dispensável se as opções são strings.',
      },
      {
        name: 'optionValue',
        type: 'string',
        default: '—',
        description: 'Campo a guardar como valor (ex.: "id"). Sem ele, guarda o objeto inteiro.',
      },
      {
        name: 'display',
        type: "'comma' | 'chip'",
        default: 'comma',
        description: 'Como mostrar os escolhidos no campo: texto separado por vírgula, ou chips removíveis (ver ficha `chip`).',
      },
      {
        name: 'filter',
        type: 'boolean',
        default: 'true',
        description: 'Campo de busca dentro do painel (achar opção em lista longa). `filterBy` define os campos e `filterMatchMode` o modo (contains, startsWith…).',
      },
      {
        name: 'showToggleAll',
        type: 'boolean',
        default: 'true',
        description: 'Checkbox "selecionar todos" no topo do painel.',
      },
      {
        name: 'maxSelectedLabels',
        type: 'number',
        default: '3',
        description: 'Acima disso, o campo resume ("N selecionados", via `selectedItemsLabel`) em vez de listar tudo — evita o campo estourar.',
      },
      {
        name: 'selectionLimit',
        type: 'number',
        default: '—',
        description: 'Máximo de itens selecionáveis. Ao atingir, os demais desabilitam (comunicar o limite).',
      },
      {
        name: 'group',
        type: 'boolean',
        default: 'false',
        description: 'Agrupa as opções por categoria (`optionGroupLabel` + `optionGroupChildren`).',
      },
      {
        name: 'virtualScroll / lazy',
        type: 'boolean',
        default: 'false',
        description: 'Para listas muito longas: renderizar só o visível e/ou carregar sob demanda (`onLazyLoad`).',
      },
      {
        name: 'showClear',
        type: 'boolean',
        default: 'false',
        description: 'Botão "x" para limpar toda a seleção (com aria-label).',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: '—',
        description: 'Texto quando nada está selecionado. NÃO substitui o rótulo.',
      },
    ],
    outputs: [
      { name: 'onChange', payload: '{ originalEvent, value }', description: '⭐ A seleção mudou (lista de valores escolhidos).' },
      { name: 'onFilter', payload: '{ originalEvent, filter }', description: 'Digitou no filtro do painel.' },
      { name: 'onSelectAllChange', payload: '{ originalEvent, checked }', description: 'Marcou/desmarcou "selecionar todos".' },
      { name: 'onRemove', payload: '{ originalEvent, item }', description: 'Removeu um item (display=chip).' },
      { name: 'onClear', payload: 'void', description: 'Limpou a seleção.' },
      { name: 'onPanelShow', payload: 'void', description: 'Abriu o painel.' },
      { name: 'onPanelHide', payload: 'void', description: 'Fechou o painel.' },
    ],
    slots: [
      { name: 'item', accepts: 'template de cada opção (checkbox + rótulo customizado)', optional: true },
      { name: 'header', accepts: 'template do cabeçalho do painel (filtro/selecionar todos)', optional: true },
      { name: 'selectedItems', accepts: 'template do que aparece no campo', optional: true },
      { name: 'empty', accepts: 'mensagem quando a lista/filtro não tem itens', optional: true },
    ],
    states: ['default', 'open', 'filtered', 'some-selected', 'all-selected', 'empty', 'invalid', 'disabled', 'readonly'],
    invalidCombinations: [
      {
        combo: 'MultiSelect sem `<label>` associado',
        porque: 'O controle sem rótulo não é anunciado; a pessoa não sabe o que está escolhendo.',
      },
      {
        combo: 'MultiSelect para escolher um único valor',
        porque: 'Sugere múltipla escolha onde só cabe uma — confunde e permite estado inválido; isso é Select.',
      },
      {
        combo: 'lista longa sem `filter`',
        porque: 'Rolar dezenas de checkboxes para achar um item é lento e frustrante.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'filters', 'toolbar'],
    children: ['checkbox', 'chip', 'icon'],
    commonlyUsedWith: ['label', 'helper-text', 'chip', 'button'],
    partOfPatterns: ['filters', 'form-submission', 'form-field'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      default: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      focus: { border: 'primary/color', ring: 'focus/ring' },
      optionSelected: { background: 'primary/50', text: 'primary/color' },
      invalid: { border: 'feedback.danger/500' },
    },
    note: 'Campo herda os tokens de formulário do PrimeNG (formField.*); o painel herda overlay; as opções usam Checkbox; itens em chip reusam a ficha `chip`. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar o campo sem rótulo associado.',
      porque: 'Sem `<label>` o controle é anunciado como anônimo.',
      emVezDisso: '`<label for>` visível (ou FloatLabel).',
    },
    {
      regra: 'Nunca usar MultiSelect para escolha única.',
      porque: 'Permite marcar vários onde o sistema espera um — estado inválido e confusão.',
      emVezDisso: 'Select para um valor; MultiSelect só quando vários fazem sentido.',
    },
    {
      regra: 'Nunca esconder o que está selecionado.',
      porque: 'Com muitos itens, o campo "some" e a pessoa perde a conta do que marcou.',
      emVezDisso: '`maxSelectedLabels` com resumo claro ("3 selecionados") ou display=chip; e um jeito de rever/remover.',
    },
    {
      regra: 'Nunca omitir o filtro numa lista longa.',
      porque: 'Procurar rolando dezenas de opções é lento e cansativo.',
      emVezDisso: '`filter` ligado; agrupar (`group`) quando as opções têm categorias.',
    },
  ],

  examples: {
    angular: `<label for="status">Filtrar por status</label>
<p-multiselect inputId="status" [(ngModel)]="selecionados" [options]="statusOpcoes"
  optionLabel="rotulo" optionValue="valor" display="chip"
  [filter]="true" [showToggleAll]="true" [maxSelectedLabels]="3"
  placeholder="Selecione…" [fluid]="true" (onChange)="aplicar($event)" />`,
    html: `<label for="status">Filtrar por status</label>
<button id="status" role="combobox" aria-expanded="false" aria-controls="status-lb"
        aria-haspopup="listbox">3 selecionados</button>
<ul id="status-lb" role="listbox" aria-multiselectable="true" aria-label="Status" hidden>
  <li role="option" aria-selected="true"><input type="checkbox" checked /> Faltando</li>
  <li role="option" aria-selected="true"><input type="checkbox" checked /> Atingiu</li>
  <li role="option" aria-selected="false"><input type="checkbox" /> Excedeu</li>
</ul>`,
    inContext: `<!-- filtro de status numa barra de tabela -->
<div data-block="filters">
  <label for="f-status">Status</label>
  <button id="f-status" role="combobox" aria-haspopup="listbox"
          aria-expanded="false" aria-controls="f-status-lb"
          aria-describedby="f-status-count">Todos</button>
  <span id="f-status-count" class="visually-hidden" aria-live="polite">Nenhum filtro aplicado</span>
  <ul id="f-status-lb" role="listbox" aria-multiselectable="true" hidden><!-- opções --></ul>
</div>`,
  },

  a11y: {
    role: 'combobox que abre um listbox múltiplo (aria-multiselectable)',
    keyboard: [
      'Enter/Espaço/setas abrem o painel',
      'setas navegam as opções, Espaço marca/desmarca',
      'no filtro, digitar reduz a lista; Esc fecha',
    ],
    requiredAria: [
      '`<label for>` associado',
      'gatilho com role="combobox", aria-haspopup="listbox", aria-expanded',
      'lista com role="listbox" aria-multiselectable; opções role="option" com aria-selected (e checkbox real)',
      '"selecionar todos" com rótulo; resumo da seleção anunciado (aria-live)',
    ],
    contrastMin: '4.5:1 do texto e das opções; 3:1 do realce da opção marcada e do foco',
  },

  aiHints: {
    keywords: [
      'multiselect', 'seleção múltipla', 'selecao multipla', 'escolher vários', 'escolher varios',
      'marcar vários', 'filtro de status', 'lista com checkbox', 'múltipla escolha', 'multipla escolha', 'várias opções',
      'filtrar', 'filtrar por vários', 'filtrar por varios', 'filtro múltiplo', 'filtro multiplo',
      'vários valores', 'varios valores', 'filtro de vários valores', 'seleção de vários',
    ],
    selectionCriteria:
      'Escolha MultiSelect para marcar VÁRIOS de uma lista FECHADA e conhecida, com filtro e "selecionar todos". Um só = Select; poucas opções sempre visíveis = grupo de Checkbox; lista grande/do servidor com digitação = AutoComplete múltiplo.',
    disambiguation: [
      { confundeCom: 'select', criterio: 'Select escolhe UM valor; MultiSelect escolhe vários.' },
      { confundeCom: 'checkbox', criterio: 'Poucas opções (2–5) sempre visíveis = grupo de Checkbox (menos cliques); MultiSelect quando são muitas e cabe um painel.' },
      { confundeCom: 'autocomplete', criterio: 'AutoComplete busca em lista GRANDE/servidor digitando; MultiSelect é lista fechada com checkboxes.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/multiselect',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Opções por checkbox; display=chip reusa `chip`; saída = combobox/listbox múltiplo ARIA. Escolha única correlata em `select.meta.ts`.',
  },
};
