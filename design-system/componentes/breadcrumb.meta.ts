/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · breadcrumb.meta.ts — ONDA 4 (navegação)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-breadcrumb`. API lida do código real
 * (primeng@21.0.2, `types/primeng-breadcrumb.d.ts`).
 *
 * Trilha que mostra ONDE a pessoa está na hierarquia do site e deixa
 * voltar aos níveis acima. O "breadcrumb item" é PARTE dele (modelo
 * MenuItem), não uma ficha própria. Saída = `<nav aria-label> > <ol>`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const breadcrumbMeta: NephosComponentMeta = {
  identity: {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Trilha de navegação que mostra a posição na hierarquia e volta aos níveis acima.',
    whenToUse: [
      'Sites/apps com hierarquia de mais de 2 níveis (ex.: Campo › Escola › Bolsas).',
      'Deixar claro onde a pessoa está e permitir subir de nível com um clique.',
    ],
    whenNotToUse: [
      'Hierarquia rasa (1–2 níveis) — não agrega.',
      'Passos de um fluxo/assistente — isso é um Stepper, não breadcrumb.',
      'Navegação principal entre seções irmãs — use Menubar/Tabs.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'model',
        type: 'MenuItem[]',
        default: '[]',
        description: 'Os níveis da trilha, do mais alto ao atual. Cada item: `label`, `routerLink`/`url` (destino) e, opcional, `icon` (classe do set de ícones — ver `icon.meta.ts`). O ÚLTIMO item é a página atual (sem link).',
      },
      {
        name: 'home',
        type: 'MenuItem',
        default: '—',
        description: 'O item raiz (início), mostrado antes da trilha. Costuma ser um ícone de casa com `routerLink="/"`.',
      },
      {
        name: 'homeAriaLabel',
        type: 'string',
        default: "'Home'",
        description: 'Nome acessível do item início (importante quando ele é só um ícone).',
      },
    ],
    outputs: [
      { name: 'onItemClick', payload: '{ originalEvent, item }', description: 'Emitido ao clicar num item (quando a navegação é tratada por evento, não por routerLink).' },
    ],
    slots: [
      { name: 'item', accepts: 'template do item', optional: true },
      { name: 'separator', accepts: 'template do separador entre itens', optional: true },
    ],
    states: ['default'],
    invalidCombinations: [
      {
        combo: 'último item com link para a própria página',
        porque: 'A página atual não navega para si mesma; deve ser texto com aria-current="page", não link.',
      },
      {
        combo: 'breadcrumb usado como passos de um formulário/assistente',
        porque: 'Breadcrumb é posição na hierarquia (navegação), não progressão de tarefa — confunde o significado.',
      },
    ],
  },

  relationships: {
    parents: ['page-header', 'page'],
    children: ['link', 'icon'],
    commonlyUsedWith: ['heading', 'menubar'],
    partOfPatterns: ['navigation', 'page-header'],
  },

  tokens: {
    typography: 'body-sm',
    byState: {
      default: { text: 'surface/text-muted', link: 'primary/color', current: 'surface/text' },
    },
    note: 'Links = ênfase da marca (primary); item atual = texto padrão; separadores = muted. Espaçamento herda do PrimeNG. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca transformar o item atual em link.',
      porque: 'Navegar para a própria página não faz sentido e confunde a tecnologia assistiva.',
      emVezDisso: 'Último item como texto com aria-current="page".',
    },
    {
      regra: 'Nunca usar breadcrumb para passos de um fluxo.',
      porque: 'Mistura "onde estou na hierarquia" com "em que etapa estou" — significados diferentes.',
      emVezDisso: 'Um Stepper/indicador de progresso para etapas de tarefa.',
    },
    {
      regra: 'Nunca depender só do separador visual para estrutura.',
      porque: 'O ">" é decorativo; sozinho não comunica a hierarquia para quem usa leitor de tela.',
      emVezDisso: 'Marcar como `<nav aria-label> > <ol> > <li>` (a lista ordenada já carrega a estrutura); separador aria-hidden.',
    },
  ],

  examples: {
    angular: `<p-breadcrumb [model]="[
  { label: 'Campos', routerLink: '/campos' },
  { label: 'Associação Bahia', routerLink: '/campos/ab' },
  { label: 'Colégio Adventista de Salvador' }
]" [home]="{ icon: 'home', routerLink: '/' }" homeAriaLabel="Início" />`,
    html: `<nav aria-label="Trilha de navegação">
  <ol>
    <li><a href="/">Início</a></li>
    <li><a href="/campos">Campos</a></li>
    <li><a href="/campos/ab">Associação Bahia</a></li>
    <li aria-current="page">Colégio Adventista de Salvador</li>
  </ol>
</nav>`,
    inContext: `<!-- breadcrumb no topo da página, acima do título -->
<header data-block="page-header">
  <nav aria-label="Trilha de navegação">
    <ol>
      <li><a href="/campos">Campos</a></li>
      <li aria-current="page">Associação Bahia</li>
    </ol>
  </nav>
  <h1>Associação Bahia</h1>
</header>`,
  },

  a11y: {
    role: 'navigation (landmark) contendo uma lista ordenada',
    keyboard: ['Tab percorre os links', 'Enter segue o destino'],
    requiredAria: [
      '`<nav aria-label>` distinguindo esta navegação das outras',
      'página atual com aria-current="page" (não é link)',
      'separadores decorativos com aria-hidden',
    ],
    contrastMin: '4.5:1 dos links e do item atual; separador decorativo dispensa contraste mínimo',
  },

  aiHints: {
    keywords: [
      'breadcrumb', 'trilha', 'migalhas', 'caminho', 'navegação hierárquica', 'navegacao hierarquica',
      'onde estou', 'você está aqui', 'voce esta aqui', 'níveis', 'niveis',
    ],
    selectionCriteria:
      'Escolha Breadcrumb para mostrar a posição numa hierarquia de 3+ níveis e voltar aos níveis acima. Etapas de tarefa = Stepper; navegação entre seções irmãs = Menubar/Tabs.',
    disambiguation: [
      { confundeCom: 'tabs', criterio: 'Tabs alterna entre vistas irmãs no mesmo nível; Breadcrumb sobe/desce na hierarquia.' },
      { confundeCom: 'stepper', criterio: 'Stepper mostra etapas de um processo; Breadcrumb mostra posição na árvore do site.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/breadcrumb',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída = `<nav>` + `<ol>` semânticos; ícone do item segue `icon.meta.ts`.',
  },
};
