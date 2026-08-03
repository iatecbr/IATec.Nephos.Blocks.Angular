/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · search-input.meta.ts — ONDA 5 (composição fina)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → composição de `p-iconfield` + `p-inputicon` +
 * InputText. API lida do código real (primeng@21.0.2,
 * `types/primeng-iconfield.d.ts`).
 *
 * Campo de busca: InputText com um ícone de lupa (Font Awesome). O
 * ícone é decorativo; o `type="search"` e o rótulo (mesmo que oculto)
 * fazem o trabalho semântico. Ver `inputtext.meta.ts` e `icon.meta.ts`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const searchInputMeta: NephosComponentMeta = {
  identity: {
    id: 'search-input',
    name: 'Search Input',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Campo de busca: texto de uma linha com ícone de lupa.',
    whenToUse: [
      'Filtrar/buscar numa lista, tabela ou no app inteiro.',
      'Entrada de busca com affordance visual (lupa) e, opcional, limpar.',
    ],
    whenNotToUse: [
      'Coletar um dado do formulário (nome, e-mail) — use InputText comum.',
      'Escolher de uma lista fechada — use Select.',
      'Busca com sugestões enquanto digita — use AutoComplete.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'iconPosition',
        type: "'left' | 'right'",
        default: 'left',
        description: 'Lado do ícone de lupa dentro do campo (IconField). Esquerda é o mais convencional para busca.',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: '—',
        description: 'Exemplo do que buscar ("Buscar escola…"). NÃO substitui o rótulo (que pode ser visualmente oculto).',
      },
      {
        name: 'clearable',
        type: 'boolean',
        default: 'false',
        description: 'Mostra um "x" para limpar quando há texto. O "x" é um botão com aria-label ("Limpar busca").',
      },
      {
        name: 'fluid',
        type: 'boolean',
        default: 'false',
        description: 'Ocupa 100% da largura (comum em barras de busca de topo).',
      },
    ],
    outputs: [
      { name: 'valueChange', payload: 'string', description: 'Emitido ao digitar (usar debounce para busca ao vivo).' },
      { name: 'onSearch', payload: 'string', description: 'Confirmação da busca (Enter) — quando a busca não é ao vivo.' },
    ],
    slots: [],
    states: ['default', 'focus', 'filled', 'disabled'],
    invalidCombinations: [
      {
        combo: 'campo de busca sem rótulo (nem visível nem oculto)',
        porque: 'O placeholder some ao digitar e não é rótulo; sem `<label>` o campo fica anônimo no leitor de tela.',
      },
      {
        combo: 'ícone de lupa como o controle que dispara a busca, sem ser botão',
        porque: 'Se a lupa aciona algo, precisa ser um `<button>` acessível; como decoração, fica aria-hidden.',
      },
    ],
  },

  relationships: {
    parents: ['toolbar', 'menubar', 'page-header', 'filters'],
    children: ['inputtext', 'icon', 'icon-button'],
    commonlyUsedWith: ['button', 'select', 'table'],
    partOfPatterns: ['search', 'filters', 'data-table'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      default: { border: 'surface/300', text: 'surface/text', icon: 'surface/text-muted', background: 'surface/0' },
      focus: { border: 'primary/color', ring: 'focus/ring' },
    },
    note: 'Herda os tokens de formulário do PrimeNG (formField.*). O ícone de lupa usa a cor muted (decorativo). Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar a busca sem rótulo associado.',
      porque: 'O placeholder some ao digitar; sem `<label>` (mesmo oculto) o campo fica anônimo.',
      emVezDisso: '`<label for>` visível ou com classe visually-hidden quando o contexto já deixa óbvio.',
    },
    {
      regra: 'Nunca usar a lupa decorativa como se fosse o botão de buscar.',
      porque: 'Um ícone não-focável não é acionável por teclado.',
      emVezDisso: 'Se a lupa dispara a busca, ela é um Icon Button com aria-label; senão, aria-hidden.',
    },
    {
      regra: 'Nunca usar `type="text"` num campo que é de busca.',
      porque: 'Perde a semântica de busca (e o "x" nativo em alguns navegadores/teclados).',
      emVezDisso: '`type="search"` no input.',
    },
  ],

  examples: {
    angular: `<p-iconfield iconPosition="left">
  <p-inputicon><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i></p-inputicon>
  <input pInputText type="search" [(ngModel)]="termo" placeholder="Buscar escola…"
         aria-label="Buscar escola" [fluid]="true" />
</p-iconfield>`,
    html: `<label for="busca" class="visually-hidden">Buscar escola</label>
<span class="iconfield">
  <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
  <input id="busca" name="busca" type="search" placeholder="Buscar escola…" />
</span>`,
    inContext: `<!-- busca de topo com botão de limpar -->
<form role="search">
  <label for="q" class="visually-hidden">Buscar</label>
  <span class="iconfield">
    <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
    <input id="q" name="q" type="search" placeholder="Buscar…" />
    <button type="button" aria-label="Limpar busca">
      <i class="fa-solid fa-xmark" aria-hidden="true"></i>
    </button>
  </span>
</form>`,
  },

  a11y: {
    role: 'searchbox (input type=search); ideal dentro de um `<form role="search">`',
    keyboard: ['Tab entra e sai', 'digitação normal', 'Enter dispara a busca', 'Esc limpa quando aplicável'],
    requiredAria: [
      '`<label for>` associado (pode ser visually-hidden)',
      'ícone de lupa decorativo com aria-hidden; se aciona busca, é botão com aria-label',
      'botão "limpar" com aria-label quando existir',
    ],
    contrastMin: '4.5:1 do texto e do placeholder; 3:1 do ícone e do foco',
  },

  aiHints: {
    keywords: [
      'busca', 'buscar', 'search', 'pesquisa', 'pesquisar', 'filtrar', 'campo de busca',
      'lupa', 'barra de busca', 'procurar',
    ],
    selectionCriteria:
      'Escolha Search Input para buscar/filtrar (texto + lupa, type=search, rótulo mesmo que oculto). Dado de formulário = InputText; lista fechada = Select; sugestões ao digitar = AutoComplete.',
    disambiguation: [
      { confundeCom: 'inputtext', criterio: 'InputText coleta um dado do formulário; Search Input é para buscar (type=search + lupa).' },
      { confundeCom: 'autocomplete', criterio: 'AutoComplete sugere valores enquanto digita; Search Input é busca livre.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/iconfield',
    deltaFromPrimeng: 'Composição (IconField + InputIcon + InputText) — origin: primeng. Delta = padrão de busca (type=search, rótulo oculto, lupa decorativa) + ícone Font Awesome (`icon.meta.ts`). Campo base em `inputtext.meta.ts`.',
  },
};
