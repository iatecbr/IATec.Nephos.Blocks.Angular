/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · stepper.meta.ts — ONDA "PAINÉIS/ESTRUTURA"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-stepper` (API composta do PrimeNG 21:
 * `p-stepper` › `p-step-list` › `p-step` + `p-step-panels` ›
 * `p-step-panel`). Lido do código real (`primeng-stepper.d.ts`).
 *
 * Guia uma tarefa em ETAPAS numa ordem. `linear` obriga completar uma
 * antes da próxima. Mostra progresso (etapa X de Y). Diferente de Tabs
 * (livre) e de Breadcrumb (hierarquia). Saída = indicador de passos +
 * painéis, com a etapa atual marcada (aria-current="step").
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const stepperMeta: NephosComponentMeta = {
  identity: {
    id: 'stepper',
    name: 'Stepper',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Conduz uma tarefa em etapas numa sequência, mostrando o progresso.',
    whenToUse: [
      'Fluxo com passos em ordem: cadastro em etapas, solicitação de bolsa, checkout.',
      'Quando dividir a tarefa reduz a carga e o progresso ajuda a pessoa a se situar.',
    ],
    whenNotToUse: [
      'Vistas que a pessoa navega livremente — use Tabs.',
      'Posição numa hierarquia de site — use Breadcrumb.',
      'Fatias de um conjunto de dados — use Paginator.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'value',
        type: 'string | number',
        default: '—',
        description: 'A etapa ativa (casa com o `value` de cada `p-step`/`p-step-panel`).',
      },
      {
        name: 'linear',
        type: 'boolean',
        default: 'false',
        description: 'true = precisa completar a etapa atual antes de avançar (as futuras ficam bloqueadas). false = livre para pular.',
      },
    ],
    outputs: [
      { name: 'valueChange', payload: 'string | number', description: 'Mudou a etapa ativa (gravar/reagir ao passo atual).' },
    ],
    slots: [
      { name: 'step-list', accepts: 'p-step-list com p-step[value] — o indicador de etapas' },
      { name: 'step-panels', accepts: 'p-step-panels com p-step-panel[value] — o conteúdo de cada etapa' },
      { name: 'separator', accepts: 'p-stepper-separator — o traço entre etapas', optional: true },
    ],
    states: ['upcoming', 'current', 'completed', 'disabled', 'error'],
    invalidCombinations: [
      {
        combo: 'linear=true sem comunicar por que a próxima etapa está bloqueada',
        porque: 'A pessoa tenta avançar e não entende o bloqueio (falta validar a etapa atual).',
      },
      {
        combo: 'Stepper sem botão de voltar',
        porque: 'Em qualquer fluxo de etapas é preciso poder corrigir a anterior.',
      },
      {
        combo: 'usar Stepper para navegação livre',
        porque: 'Stepper impõe uma sequência; navegação livre entre vistas é Tabs.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'dialog', 'page'],
    children: ['button', 'inputtext', 'progressbar', 'icon'],
    commonlyUsedWith: ['button', 'form-field'],
    partOfPatterns: ['wizard', 'checkout', 'registration'],
  },

  tokens: {
    typography: 'body-lg (rótulo da etapa)',
    byState: {
      current: { indicator: 'primary/color', text: 'primary/color' },
      completed: { indicator: 'primary/color', text: 'surface/text' },
      upcoming: { indicator: 'surface/300', text: 'surface/text-muted' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Etapa atual/concluída = ênfase da marca; futuras = neutro suave. Traço/espaçamento herdam do PrimeNG. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca bloquear a próxima etapa sem dizer por quê.',
      porque: 'A pessoa fica presa sem saber o que falta (ex.: campo obrigatório vazio).',
      emVezDisso: 'Validar a etapa atual e mostrar a mensagem do que falta; só então liberar avançar.',
    },
    {
      regra: 'Nunca oferecer só "avançar", sem "voltar".',
      porque: 'Erros na etapa anterior ficam impossíveis de corrigir.',
      emVezDisso: 'Botões voltar/avançar (e, no fim, um resumo antes de confirmar).',
    },
    {
      regra: 'Nunca sinalizar a etapa atual só pela cor.',
      porque: 'Quem não distingue cores não sabe onde está.',
      emVezDisso: 'aria-current="step" e o texto "Etapa X de Y" além do destaque visual.',
    },
  ],

  examples: {
    angular: `<p-stepper [(value)]="etapa" [linear]="true">
  <p-step-list>
    <p-step [value]="1">Dados da escola</p-step>
    <p-step [value]="2">Bolsas por nível</p-step>
    <p-step [value]="3">Revisão</p-step>
  </p-step-list>
  <p-step-panels>
    <p-step-panel [value]="1">…</p-step-panel>
    <p-step-panel [value]="2">…</p-step-panel>
    <p-step-panel [value]="3">…</p-step-panel>
  </p-step-panels>
</p-stepper>`,
    html: `<div>
  <ol aria-label="Etapas da solicitação">
    <li aria-current="step"><span aria-hidden="true">1</span> Dados da escola</li>
    <li><span aria-hidden="true">2</span> Bolsas por nível</li>
    <li><span aria-hidden="true">3</span> Revisão</li>
  </ol>
  <section aria-label="Etapa 1 de 3: Dados da escola">…</section>
  <div>
    <button type="button" disabled>Voltar</button>
    <button type="button">Avançar</button>
  </div>
</div>`,
    inContext: `<!-- assistente de solicitação de bolsa num card -->
<article data-block="wizard">
  <ol aria-label="Solicitação de bolsa">
    <li><span aria-hidden="true">✓</span> Escola</li>
    <li aria-current="step"><span aria-hidden="true">2</span> Níveis</li>
    <li><span aria-hidden="true">3</span> Revisão</li>
  </ol>
  <p class="visually-hidden">Etapa 2 de 3</p>
  <section aria-label="Etapa 2 de 3: Bolsas por nível"><!-- campos --></section>
</article>`,
  },

  a11y: {
    role: 'lista ordenada de etapas + painéis rotulados',
    keyboard: [
      'Tab/Enter operam os botões voltar/avançar e as etapas navegáveis',
      'no linear, etapas futuras não recebem foco de ativação',
    ],
    requiredAria: [
      'lista de etapas com nome (aria-label)',
      'etapa atual com aria-current="step"; concluídas indicadas por texto/ícone, não só cor',
      'painel da etapa rotulado ("Etapa X de Y: …"); anunciar a troca',
    ],
    contrastMin: '4.5:1 dos rótulos; 3:1 do indicador de etapa e do foco',
  },

  aiHints: {
    keywords: [
      'stepper', 'etapas', 'passo a passo', 'passo-a-passo', 'assistente', 'wizard',
      'fluxo em etapas', 'progresso de etapas', 'checkout', 'cadastro em etapas',
    ],
    selectionCriteria:
      'Escolha Stepper para uma tarefa em ETAPAS numa ordem, mostrando progresso. Use linear quando a ordem importa. Navegação livre = Tabs; hierarquia = Breadcrumb; páginas de dados = Paginator.',
    disambiguation: [
      { confundeCom: 'tabs', criterio: 'Tabs = navegação livre entre vistas; Stepper = sequência (com back/next e, às vezes, ordem obrigatória).' },
      { confundeCom: 'breadcrumb', criterio: 'Breadcrumb = onde estou na hierarquia; Stepper = em que etapa da tarefa estou.' },
      { confundeCom: 'paginator', criterio: 'Paginator = fatias de dados; Stepper = etapas de um processo.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/stepper',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng, API composta p-stepper/step-list/step/step-panels/step-panel). Saída = lista ordenada de etapas + painéis; validação por etapa é responsabilidade do formulário.',
  },
};
