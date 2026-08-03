/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · search-filters.block.meta.ts — BLOCO #4 (composição nossa)
 * ─────────────────────────────────────────────────────────────
 * category: 'block' · origin: 'nephos-own'
 * A barra de BUSCA + FILTROS que fica acima de uma listagem (tabela,
 * lista de cards). Não é componente novo — é a COMPOSIÇÃO da forma da
 * organização: campo de busca + um ou mais filtros (seleção única e
 * múltipla) + os "filtros ativos" como chips removíveis + limpar tudo.
 *
 * Compõe: search-input + select + multiselect + chip + button (+ icon-button).
 * Saída do Moses = uma região `role="search"` com controles reais e os
 * filtros ativos numa lista de chips com botão de remover.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const searchFiltersBlockMeta: NephosComponentMeta = {
  identity: {
    id: 'search-filters',
    name: 'Busca com Filtros',
    category: 'block',
    status: 'beta',
    version: '0.1.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Barra de busca e filtros acima de uma listagem, com os filtros ativos visíveis e removíveis.',
    whenToUse: [
      'Qualquer tela de listagem (tabela ou lista de cards) que precisa buscar por texto e filtrar por atributos.',
      'Quando a pessoa combina vários critérios (status, região, período) e precisa ver e desfazer cada um.',
    ],
    whenNotToUse: [
      'Uma tela sem lista/resultado por baixo — se não há o que filtrar, é só um campo de busca (search-input).',
      'Um único filtro simples, sem busca por texto nem combinação — use o componente direto (select/multiselect).',
      'Navegação entre seções do app — isso é menu, não filtro.',
    ],
  },

  api: {
    // Bloco: a "API" são os pontos de composição (slots) + a config da barra, não muitos inputs.
    inputs: [
      { name: 'searchPlaceholder', type: 'string', default: '"Buscar…"', description: 'Dica do campo de busca. Descrever O QUE se busca ("Buscar escola…"), não só "Buscar".' },
      { name: 'showActiveChips', type: 'boolean', default: 'true', description: 'Mostra os filtros aplicados como chips removíveis abaixo da barra. Desligar só se o espaço for crítico.' },
      { name: 'resultCount', type: 'number', default: '—', description: 'Nº de resultados após filtrar, para o feedback ("42 escolas"). Anunciar em região aria-live.' },
    ],
    outputs: [
      { name: 'search', payload: '{ termo }', description: 'Emitido quando o texto de busca muda (idealmente com debounce).' },
      { name: 'filterChange', payload: '{ campo, valor }', description: 'Emitido quando um filtro é aplicado ou alterado.' },
      { name: 'filterRemove', payload: '{ campo, valor }', description: 'Emitido ao remover um chip de filtro ativo.' },
      { name: 'clearAll', payload: 'void', description: 'Emitido ao limpar todos os filtros de uma vez.' },
    ],
    slots: [
      { name: 'search', accepts: 'search-input (campo de busca por texto)' },
      { name: 'filters', accepts: 'um ou mais filtros conforme a tarefa: select (valor único); multiselect (vários valores, lista longa ou muitas opções); grupo de checkbox VISÍVEL (vários valores, ≤5 opções sempre relevantes — reconhecer vence colapsar)' },
      { name: 'activeFilters', accepts: 'lista de chip removíveis = os filtros aplicados', optional: true },
      { name: 'actions', accepts: 'button "Limpar filtros" (variante text); opcional icon-button para abrir mais filtros', optional: true },
      { name: 'resultInfo', accepts: 'texto de contagem de resultados (região aria-live)', optional: true },
    ],
    states: ['default', 'com-filtros-ativos', 'sem-resultados', 'loading'],
    invalidCombinations: [
      { combo: 'aplicar filtro sem mostrar um chip removível correspondente', porque: 'A pessoa perde o controle do que está filtrando e por que a lista encolheu.' },
      { combo: 'multiselect para um filtro de valor ÚNICO (ou select para vários)', porque: 'Escolha errada de controle: valor único = select; vários = multiselect (ver as fichas).' },
      { combo: 'colapsar num multiselect um filtro de vários valores com ≤5 opções sempre relevantes', porque: 'Poucas opções sempre úteis ficam visíveis num grupo de checkbox (menos cliques, reconhecimento > memória); ver multiselect.whenNotToUse e checkbox.whenToUse.' },
      { combo: 'remover chip ou limpar montado como `<span>`/`<div>` clicável', porque: 'Ação sem `<button>` real não recebe foco nem teclado e não é anunciada.' },
    ],
  },

  relationships: {
    parents: ['listing-page', 'layout', 'toolbar'],
    children: ['search-input', 'select', 'multiselect', 'checkbox', 'chip', 'button', 'icon-button'],
    commonlyUsedWith: ['datatable', 'dataview', 'paginator', 'empty-state', 'tag'],
    partOfPatterns: ['filters', 'listing', 'search'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      // O bloco não inventa cor: herda os papéis dos componentes que compõe.
      barra: { background: 'surface/0', border: 'surface/200' },
      chipAtivo: { background: 'primary/50', text: 'primary/color' },
      limpar: { text: 'primary/color' },
    },
    note: 'Alturas dos campos, raio e espaçamento entre controles herdam do PrimeNG. Os chips de filtro ativo usam o realce da marca (primary). Nenhum hex, nenhum nome de marca — a ênfase é a `primary` da vertical ativa.',
  },

  antiPatterns: [
    {
      regra: 'Nunca aplicar um filtro sem mostrar um chip removível dele.',
      porque: 'Sem os filtros ativos à vista, a pessoa não sabe por que a lista encolheu nem como desfazer.',
      emVezDisso: 'Cada filtro aplicado vira um chip com botão de remover + uma ação "Limpar filtros".',
    },
    {
      regra: 'Nunca deixar a busca/filtro sem feedback de resultado.',
      porque: 'Filtrar sem ver a contagem (nem o estado vazio) transforma a busca em caixa-preta.',
      emVezDisso: 'Mostrar a contagem ("42 escolas") em região aria-live; quando zero, usar o bloco empty-state.',
    },
    {
      regra: 'Nunca sinalizar "tem filtro ativo" só por cor.',
      porque: 'Cor sozinha exclui quem não a distingue e não diz QUAL filtro está ativo.',
      emVezDisso: 'Chips com o texto do filtro (campo: valor) + botão remover rotulado.',
    },
    {
      regra: 'Nunca recarregar a página perdendo os filtros ao buscar.',
      porque: 'Quebra o fluxo de refinar aos poucos; a pessoa reconstrói tudo a cada busca.',
      emVezDisso: 'Atualizar a listagem no lugar (ou refletir os filtros na URL) preservando o que já foi escolhido.',
    },
  ],

  examples: {
    angular: `<!-- composição real com componentes PrimeNG -->
<form role="search" aria-label="Buscar e filtrar escolas">
  <input pInputText type="search" [(ngModel)]="termo" name="q" placeholder="Buscar escola…" />
  <p-select [(ngModel)]="regiao" [options]="regioes" placeholder="Região" inputId="regiao" />
  <p-multiSelect [(ngModel)]="status" [options]="statusOpcoes" placeholder="Status" inputId="status" />
  <p-button type="button" label="Limpar filtros" [text]="true" (onClick)="limparFiltros()" />
</form>`,
    html: `<form data-block="search-filters" role="search" aria-label="Buscar e filtrar escolas">
  <!-- busca por texto -->
  <label for="q" class="visually-hidden">Buscar escola</label>
  <span class="iconfield">
    <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
    <input id="q" name="q" type="search" placeholder="Buscar escola…" />
  </span>

  <!-- filtro de valor único -->
  <label for="regiao">Região</label>
  <button id="regiao" type="button" role="combobox" aria-haspopup="listbox"
          aria-expanded="false" aria-controls="regiao-lb">Todas</button>

  <!-- filtro de vários valores -->
  <label for="status">Status</label>
  <button id="status" type="button" role="combobox" aria-haspopup="listbox"
          aria-expanded="false" aria-controls="status-lb">2 selecionados</button>

  <button type="button" data-variant="text">Limpar filtros</button>
</form>

<!-- filtros ativos (removíveis) + contagem -->
<ul data-block="active-filters" aria-label="Filtros ativos">
  <li>
    <span data-block="chip" data-variant="primary">Status: Faltando
      <button type="button" aria-label="Remover filtro Status: Faltando">
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
    </span>
  </li>
  <li>
    <span data-block="chip" data-variant="primary">Região: Sudeste
      <button type="button" aria-label="Remover filtro Região: Sudeste">
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
    </span>
  </li>
</ul>
<p role="status" aria-live="polite">42 escolas</p>`,
    inContext: `<!-- barra de busca/filtros acima da listagem -->
<section data-block="listing-page" aria-label="Escolas">
  <form data-block="search-filters" role="search" aria-label="Buscar e filtrar escolas"> … (ver html acima) … </form>
  <ul data-block="active-filters" aria-label="Filtros ativos"> … </ul>

  <!-- a listagem que os filtros alimentam -->
  <table><!-- datatable --></table>
  <!-- quando o filtro zera o resultado, no lugar da tabela: -->
  <!-- <div data-block="empty-state"> … Nenhuma escola encontrada … </div> -->
</section>`,
  },

  a11y: {
    role: 'search (região de busca) + lista de filtros ativos',
    keyboard: [
      'Tab percorre busca → filtros → limpar → chips (botão remover de cada)',
      'Enter/Espaço abrem cada filtro e acionam remover/limpar',
      'Esc fecha um filtro aberto',
    ],
    requiredAria: [
      '`<form role="search">` com aria-label descrevendo o que se busca',
      'cada filtro com `<label>` e o gatilho com role="combobox" + aria-expanded',
      'cada chip de filtro ativo com um `<button>` de remover rotulado (aria-label com campo e valor)',
      'contagem de resultados em região aria-live (role="status")',
    ],
    contrastMin: '4.5:1 em textos, rótulos e chips; foco visível em todos os controles',
  },

  aiHints: {
    keywords: [
      'busca com filtros', 'barra de filtros', 'buscar e filtrar', 'filtrar lista', 'filtrar listagem',
      'pesquisar e filtrar', 'filtros ativos', 'search and filters', 'filter bar', 'toolbar de filtros',
      'busca', 'filtro', 'filtros', 'refinar resultados',
    ],
    selectionCriteria:
      'Escolha o bloco Busca com Filtros quando há uma LISTAGEM por baixo e a pessoa precisa buscar por texto e combinar filtros, vendo e desfazendo cada um. Só o campo de busca = search-input; um filtro isolado = select/multiselect.',
    disambiguation: [
      { confundeCom: 'search-input', criterio: 'search-input é só o campo de busca; o bloco é a barra inteira (busca + filtros + chips ativos + limpar).' },
      { confundeCom: 'multiselect', criterio: 'multiselect é UM filtro; o bloco reúne a busca + vários filtros + os filtros ativos removíveis.' },
      { confundeCom: 'datatable', criterio: 'A tabela mostra os dados; o bloco de busca/filtros fica ACIMA dela e alimenta a consulta.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/', // composição de componentes PrimeNG; sem página única
    storybookId: 'blocks-search-filters',
    deltaFromPrimeng: 'Bloco nephos-own: composição própria de search-input + select + multiselect + chip + button. A ênfase (chips/limpar) é a `primary` da vertical ativa; saída = região role="search" + filtros ativos removíveis.',
  },
};
