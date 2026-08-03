/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · listbox.meta.ts — família "Campos de seleção"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-listbox`. API lida do código real
 * (primeng@21.0.2, `types/primeng-listbox.d.ts`).
 *
 * Lista SEMPRE VISÍVEL de opções selecionáveis (não abre painel). Uma
 * (single) ou várias (multiple/checkbox) escolhas, com filtro no topo,
 * "selecionar todos" e agrupamento. Como as opções ficam à vista, é bom
 * quando comparar/escolher entre poucos/médios itens importa.
 * Saída = `<ul role="listbox">` com `<li role="option">`, com rótulo.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const listboxMeta: NephosComponentMeta = {
  identity: {
    id: 'listbox',
    name: 'Listbox',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Lista sempre visível de opções para escolher uma ou várias, sem abrir painel.',
    whenToUse: [
      'Escolher entre poucos/médios itens que valem ficar à vista para comparar (ex.: um perfil, um plano).',
      'Quando o espaço permite mostrar as opções abertas e evitar o clique de "abrir".',
      'Seleção múltipla com checkbox e "selecionar todos" num painel fixo (ex.: transferir campos).',
    ],
    whenNotToUse: [
      'Espaço é curto e a lista é longa — use Select (economiza espaço fechando).',
      'A lista é enorme ou vem do servidor conforme digita — use AutoComplete.',
      '2 a 4 opções únicas — RadioButton é mais direto; poucas múltiplas — grupo de Checkbox.',
    ],
  },

  api: {
    inputs: [
      { name: 'options', type: 'any[]', default: '[]', description: 'A lista de opções a exibir. Obrigatório.' },
      { name: 'optionLabel', type: 'string', default: '—', description: 'Campo do objeto que vira o texto visível. Dispensável se as opções são strings.' },
      { name: 'optionValue', type: 'string', default: '—', description: 'Campo a guardar como valor. Sem ele, guarda o objeto inteiro.' },
      { name: 'multiple', type: 'boolean', default: 'false', description: 'Permite escolher VÁRIAS opções em vez de uma só.' },
      { name: 'checkbox', type: 'boolean', default: 'false', description: 'Mostra um checkbox por opção (em multiple), tornando a múltipla escolha explícita — sem depender de Ctrl/Meta.' },
      { name: 'metaKeySelection', type: 'boolean', default: 'false', description: 'Quando true, exige Ctrl/⌘ para marcar vários; false alterna cada item ao clicar. Em múltipla, preferir checkbox=true a depender de tecla.' },
      { name: 'filter', type: 'boolean', default: 'false', description: 'Mostra um campo de busca no topo. Ligar quando a lista passa de poucas opções.' },
      { name: 'filterBy', type: 'string', default: 'optionLabel', description: 'Campo(s) usados na busca (separados por vírgula).' },
      { name: 'filterMatchMode', type: "'contains' | 'startsWith' | 'endsWith' | 'equals' | string", default: 'contains', description: 'Como o filtro casa o texto digitado.' },
      { name: 'showToggleAll', type: 'boolean', default: 'true', description: 'Checkbox "selecionar todos" no cabeçalho (só em multiple).' },
      { name: 'group', type: 'boolean', default: 'false', description: 'Agrupa as opções por categoria (`optionGroupLabel` + `optionGroupChildren`).' },
      { name: 'optionDisabled', type: 'string | ((item) => boolean)', default: '—', description: 'Campo/função que marca uma opção como não selecionável.' },
      { name: 'checkmark', type: 'boolean', default: 'false', description: 'Mostra um "check" na opção escolhida (single), reforçando o estado além da cor.' },
      { name: 'striped', type: 'boolean', default: 'false', description: 'Linhas com cores alternadas, para ler listas longas.' },
      { name: 'scrollHeight', type: 'string', default: '14rem', description: 'Altura máxima antes de rolar internamente. Combina com `virtualScroll` em listas muito longas.' },
      { name: 'virtualScroll', type: 'boolean', default: 'false', description: 'Renderiza só o visível (listas muito longas). `virtualScrollItemSize` define a altura do item; `lazy`/`onLazyLoad` carregam sob demanda.' },
      { name: 'readonly', type: 'boolean', default: 'false', description: 'Mostra as opções e a seleção, mas impede mudar.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita toda a lista. Se o motivo não é óbvio, explicar no contexto.' },
      { name: 'invalid', type: 'boolean', default: 'false', description: 'Marca como inválido (borda de erro). Anda junto com a mensagem e o aria-invalid.' },
      { name: 'fluid', type: 'boolean', default: 'false', description: 'Ocupa 100% da largura do contêiner.' },
      { name: 'dragdrop', type: 'boolean', default: 'false', description: 'Permite reordenar os itens arrastando (CDK drag-drop). Ofereça também uma alternativa por teclado.' },
    ],
    outputs: [
      { name: 'onChange', payload: '{ originalEvent, value }', description: '⭐ A seleção mudou (valor único ou lista de valores).' },
      { name: 'onClick', payload: '{ originalEvent, option, value }', description: 'Clicou numa opção.' },
      { name: 'onDblClick', payload: '{ originalEvent, option, value }', description: 'Duplo-clique numa opção (ex.: confirmar/transferir).' },
      { name: 'onFilter', payload: '{ originalEvent, filter }', description: 'Digitou no filtro.' },
      { name: 'onSelectAllChange', payload: '{ originalEvent, checked }', description: 'Marcou/desmarcou "selecionar todos".' },
      { name: 'onLazyLoad', payload: 'ScrollerLazyLoadEvent', description: 'Pediu mais dados (virtualScroll + lazy).' },
      { name: 'onDrop', payload: 'CdkDragDrop', description: 'Reordenou por arrastar (dragdrop).' },
      { name: 'onFocus', payload: 'FocusEvent', description: 'A lista recebeu foco.' },
      { name: 'onBlur', payload: 'FocusEvent', description: 'A lista perdeu foco.' },
    ],
    slots: [
      { name: 'item', accepts: 'template de cada opção (ícone + rótulo customizado)', optional: true },
      { name: 'group', accepts: 'template do cabeçalho de um grupo', optional: true },
      { name: 'header', accepts: 'template do cabeçalho da lista (filtro/toggle-all)', optional: true },
      { name: 'filter', accepts: 'template do campo de filtro', optional: true },
      { name: 'footer', accepts: 'template do rodapé', optional: true },
      { name: 'empty', accepts: 'mensagem quando não há opções', optional: true },
      { name: 'emptyFilter', accepts: 'mensagem quando o filtro não achou nada', optional: true },
    ],
    states: ['default', 'focus', 'some-selected', 'all-selected', 'filtered', 'empty', 'readonly', 'invalid', 'disabled'],
    invalidCombinations: [
      {
        combo: 'Listbox sem `<label>`/nome acessível',
        porque: 'A lista sem rótulo é anunciada como anônima; a pessoa não sabe o que escolhe.',
      },
      {
        combo: 'multiple=true sem checkbox e dependendo só de metaKeySelection',
        porque: 'Marcar vários com Ctrl/⌘ é descoberta oculta e falha no toque; a múltipla escolha fica invisível.',
      },
      {
        combo: 'lista longa sem `filter` (e sem virtualScroll)',
        porque: 'Rolar dezenas de itens à vista é lento e ocupa muito espaço vertical.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'card', 'toolbar'],
    children: ['checkbox', 'icon'],
    commonlyUsedWith: ['label', 'helper-text', 'button', 'checkbox'],
    partOfPatterns: ['form-submission', 'filters', 'form-field'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      default: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      optionHover: { background: 'surface/100' },
      optionSelected: { background: 'primary/50', text: 'primary/color' },
      focus: { ring: 'focus/ring' },
      invalid: { border: 'feedback.danger/500' },
    },
    note: 'Contêiner herda os tokens de lista/formulário do PrimeNG; as opções múltiplas usam Checkbox. Realce da opção escolhida = ênfase da marca (primary). Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar o Listbox sem rótulo/nome acessível.',
      porque: 'Sem `<label>` (ou aria-label) a lista é anunciada como anônima.',
      emVezDisso: 'Um `<label>` visível ligado à lista (ou aria-label descritivo).',
    },
    {
      regra: 'Nunca depender de Ctrl/⌘ para múltipla escolha.',
      porque: 'É uma interação oculta que muita gente não descobre e que quebra no toque.',
      emVezDisso: '`checkbox=true` em multiple — cada opção mostra sua caixa e o estado fica explícito.',
    },
    {
      regra: 'Nunca usar Listbox quando o espaço é curto e a lista é longa.',
      porque: 'Manter tudo aberto empurra o resto da tela e força rolagem interna cansativa.',
      emVezDisso: 'Select (fecha e economiza espaço); ou filtro/virtualScroll se o Listbox precisa mesmo ficar aberto.',
    },
    {
      regra: 'Nunca sinalizar a opção escolhida só pela cor de fundo.',
      porque: 'Cor sozinha não é percebida por todos.',
      emVezDisso: '`checkmark`/checkbox marcando a escolha + aria-selected, além do realce.',
    },
  ],

  examples: {
    angular: `<label id="plano-lbl">Plano</label>
<p-listbox [options]="planos" optionLabel="nome" optionValue="id"
  [(ngModel)]="plano" [filter]="true" [checkmark]="true"
  ariaLabel="Plano" [fluid]="true" (onChange)="escolher($event)" />

<!-- múltipla com checkbox e selecionar todos -->
<p-listbox [options]="campos" optionLabel="rotulo" optionValue="chave"
  [(ngModel)]="selecionados" [multiple]="true" [checkbox]="true"
  [showToggleAll]="true" [filter]="true" ariaLabel="Campos" />`,
    html: `<label id="plano-lbl">Plano</label>
<ul role="listbox" aria-labelledby="plano-lbl" tabindex="0">
  <li role="option" aria-selected="true">Mensal</li>
  <li role="option" aria-selected="false">Anual</li>
  <li role="option" aria-selected="false">Sob demanda</li>
</ul>`,
    inContext: `<!-- seleção múltipla de campos com filtro e selecionar todos -->
<div data-block="form-field">
  <label id="campos-lbl">Campos exibidos</label>
  <input type="search" aria-label="Filtrar campos" />
  <ul role="listbox" aria-labelledby="campos-lbl" aria-multiselectable="true" tabindex="0">
    <li role="option" aria-selected="true"><input type="checkbox" checked /> Nome</li>
    <li role="option" aria-selected="true"><input type="checkbox" checked /> Status</li>
    <li role="option" aria-selected="false"><input type="checkbox" /> Criado em</li>
  </ul>
</div>`,
  },

  a11y: {
    role: 'listbox (aria-multiselectable quando multiple); opções role="option" com aria-selected',
    keyboard: [
      'Tab foca a lista; setas ↑/↓ movem o foco entre opções',
      'Enter/Espaço seleciona; em multiple, Espaço marca/desmarca',
      'Home/End vão ao primeiro/último; digitar salta para a opção; no filtro, digitar reduz a lista',
    ],
    requiredAria: [
      'nome acessível por `<label>`/aria-label',
      'role="listbox" (aria-multiselectable em multiple); opções role="option" com aria-selected',
      '"selecionar todos" com rótulo; filtro com aria-label; foco visível na opção ativa',
    ],
    contrastMin: '4.5:1 do texto das opções; 3:1 do realce da opção escolhida e do foco',
  },

  aiHints: {
    keywords: [
      'listbox', 'lista', 'lista de opções', 'lista de opcoes', 'opções visíveis', 'opcoes visiveis',
      'lista sempre visível', 'lista selecionável', 'lista selecionavel', 'escolher da lista',
      'transferir campos', 'lista com filtro', 'seleção em lista', 'selecao em lista',
    ],
    selectionCriteria:
      'Escolha Listbox quando as opções devem ficar ABERTAS/à vista para comparar e escolher (uma ou várias), e o espaço permite. Espaço curto/lista longa = Select. Base grande com digitação = AutoComplete. Múltipla: use checkbox=true, não Ctrl/⌘.',
    disambiguation: [
      { confundeCom: 'select', criterio: 'Select fecha e abre um painel (economiza espaço); Listbox fica sempre aberto (opções à vista).' },
      { confundeCom: 'multiselect', criterio: 'MultiSelect é um campo que abre painel com checkboxes; Listbox é a lista fixa — use multiple/checkbox para o mesmo efeito sem abrir.' },
      { confundeCom: 'radiobutton', criterio: 'Para 2–5 opções únicas à vista, RadioButton é mais direto; Listbox brilha em listas médias com filtro/rolagem.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/listbox',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída = `<ul role="listbox">`/`<li role="option">` (aria-multiselectable em multiple). Variante que fecha em painel = `select.meta.ts`/`multiselect.meta.ts`.',
  },
};
