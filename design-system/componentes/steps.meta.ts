/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · steps.meta.ts — ONDA "Nicho" (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → usado direto. API lida do código real
 * (primeng@21.0.2, `types/primeng-steps.d.ts`).
 *
 * ⚠️ Steps ≠ Stepper. Steps é só o INDICADOR de passos (a régua no
 * topo). Stepper carrega o CONTEÚDO de cada passo. Use Steps para
 * mostrar "onde estou" num fluxo cujo conteúdo é renderizado à parte.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const stepsMeta: NephosComponentMeta = {
  identity: {
    id: 'steps',
    name: 'Steps',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Régua horizontal que mostra os passos de um fluxo e em qual a pessoa está.',
    whenToUse: [
      'Indicar progresso de um processo com etapas nomeadas (ex.: Dados → Revisão → Confirmação).',
      'Quando o conteúdo de cada passo é renderizado por fora (roteamento/página própria).',
    ],
    whenNotToUse: [
      'Quando cada passo tem conteúdo próprio a exibir no mesmo lugar — use Stepper.',
      'Barra de progresso contínua (percentual) — use ProgressBar.',
      'Trilha de navegação de hierarquia (onde estou no site) — use Breadcrumb.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'model',
        type: 'MenuItem[]',
        default: 'undefined',
        description: 'Lista de passos. Cada item traz label (nome do passo) e, se navegável, routerLink/command. É o dado principal do componente.',
      },
      {
        name: 'activeIndex',
        type: 'number',
        default: '0',
        description: 'Índice do passo ativo (base 0). Controla qual passo aparece marcado como atual.',
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'true',
        description: 'Quando true, os passos só indicam progresso e não podem ser clicados. Deixe false apenas se a pessoa puder navegar livremente entre passos já visitados.',
      },
      {
        name: 'exact',
        type: 'boolean',
        default: 'true',
        description: 'Só marca o passo como ativo se a rota casar exatamente. Relevante quando os passos são routerLinks.',
      },
    ],
    outputs: [
      { name: 'activeIndexChange', payload: 'number', description: 'Emitido quando um novo passo é selecionado; carrega o índice atual.' },
    ],
    slots: [],
    states: ['default', 'active', 'visited', 'disabled', 'readonly'],
    invalidCombinations: [
      {
        combo: 'readonly=false sem controlar activeIndex/rota',
        porque: 'Passos clicáveis que não levam a lugar nenhum confundem — clique tem que mudar o passo/conteúdo de fato.',
      },
      {
        combo: 'Steps carregando o conteúdo de cada etapa no mesmo componente',
        porque: 'Steps é só o indicador; para hospedar o conteúdo de cada passo o certo é o Stepper.',
      },
    ],
  },

  relationships: {
    parents: ['form-submission', 'page-header'],
    children: ['link', 'text'],
    commonlyUsedWith: ['stepper', 'button', 'card', 'heading'],
    partOfPatterns: ['multi-step-form', 'wizard'],
  },

  tokens: {
    typography: 'button-sm',
    byState: {
      default: { number: 'surface/200', label: 'surface/mutedText' },
      active: { number: 'primary/color', label: 'surface/text' },
      visited: { number: 'primary/color' },
    },
    note: 'Cor de ênfase do passo ativo = papel primary (varia por tema). Neutros = surface. Geometria (círculos, conector, espaçamento) herda do PrimeNG. Nunca hex nem nome de marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar Steps para hospedar o conteúdo de cada etapa.',
      porque: 'Steps é apenas a régua indicadora; misturar conteúdo quebra a semântica e a acessibilidade.',
      emVezDisso: 'Stepper quando cada passo tem formulário/conteúdo próprio; Steps só como indicador.',
    },
    {
      regra: 'Nunca sinalizar o passo atual só pela cor.',
      porque: 'Cor sozinha não é percebida por todos; a pessoa perde a noção de onde está.',
      emVezDisso: 'Marcar o passo atual com aria-current="step" além da cor.',
    },
    {
      regra: 'Nunca deixar mais de ~5 passos numa régua.',
      porque: 'Excesso de passos quebra em telas estreitas e sobrecarrega a leitura.',
      emVezDisso: 'Agrupar etapas ou reduzir o fluxo; em telas pequenas, mostrar só "passo X de Y".',
    },
  ],

  examples: {
    angular: `<p-steps [model]="passos" [activeIndex]="passoAtivo" [readonly]="true"></p-steps>`,
    html: `<nav aria-label="Progresso do cadastro">
  <ol>
    <li><span aria-current="step">1. Dados</span></li>
    <li>2. Revisão</li>
    <li>3. Confirmação</li>
  </ol>
</nav>`,
    inContext: `<!-- indicador de passos acima do conteúdo do passo atual -->
<section>
  <nav aria-label="Progresso do cadastro">
    <ol>
      <li>1. Dados</li>
      <li><span aria-current="step">2. Revisão</span></li>
      <li>3. Confirmação</li>
    </ol>
  </nav>
  <div data-block="form-field"><!-- conteúdo do passo "Revisão" --></div>
</section>`,
  },

  a11y: {
    role: 'navegação de passos (lista ordenada dentro de <nav>)',
    keyboard: ['Tab percorre passos clicáveis', 'Enter/Espaço ativa o passo focado (quando não readonly)'],
    requiredAria: [
      '<nav> com aria-label descrevendo o fluxo',
      'aria-current="step" no passo atual',
      'ordem semântica com <ol>/<li>',
    ],
    contrastMin: '4.5:1 dos rótulos; foco visível nos passos clicáveis',
  },

  aiHints: {
    keywords: [
      'steps', 'passos', 'etapas', 'indicador de passos', 'progresso de etapas', 'wizard',
      'assistente', 'passo a passo', 'régua de etapas', 'step indicator', 'multi-step',
    ],
    selectionCriteria:
      'Escolha Steps quando quiser MOSTRAR em que etapa a pessoa está, com o conteúdo de cada etapa vindo de fora. Se o componente também precisa CONTER o conteúdo de cada etapa, é Stepper.',
    disambiguation: [
      { confundeCom: 'stepper', criterio: 'Stepper hospeda o conteúdo de cada passo; Steps é só a régua indicadora.' },
      { confundeCom: 'breadcrumb', criterio: 'Breadcrumb mostra localização na hierarquia do site; Steps mostra progresso num fluxo.' },
      { confundeCom: 'progressbar', criterio: 'ProgressBar é progresso contínuo (percentual); Steps são etapas nomeadas discretas.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/steps',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída é <nav>/<ol> semântico com aria-current; só a cor da marca entra pelo tema.',
  },
};
