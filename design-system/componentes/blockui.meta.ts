/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · blockui.meta.ts — ONDA "SOBREPOSIÇÕES E FEEDBACK"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-blockui`. API lida do código real
 * (primeng@21.0.2, `types/primeng-blockui.d.ts`).
 *
 * Máscara que BLOQUEIA a interação de uma área (um card, um formulário)
 * ou da tela inteira enquanto algo carrega/processa, evitando cliques
 * durante a operação. Só impede a interação e escurece — quem MOSTRA o
 * andamento é a ProgressSpinner/ProgressBar colocada por cima.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const blockUiMeta: NephosComponentMeta = {
  identity: {
    id: 'blockui',
    name: 'BlockUI',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Máscara que bloqueia a interação de uma área (ou da tela) enquanto algo carrega ou processa.',
    whenToUse: [
      'Impedir cliques numa região específica (um card, um formulário, uma tabela) durante uma operação assíncrona.',
      'Bloquear a tela inteira durante uma ação global que não deve ser interrompida (ex.: salvando tudo).',
    ],
    whenNotToUse: [
      'Uma decisão que exige resposta — use ConfirmDialog (BlockUI não pede nada, só bloqueia).',
      'Só mostrar que algo carrega, sem precisar travar a área — use ProgressSpinner/ProgressBar sozinha.',
      'Placeholder da forma do conteúdo que vai chegar — use Skeleton.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'blocked',
        type: 'boolean',
        default: 'false',
        description: '⭐ Liga/desliga o bloqueio. `true` cobre a área com a máscara e trava a interação; `false` libera. Costuma seguir o estado de "carregando".',
      },
      {
        name: 'target',
        type: 'any (ng-template ref)',
        default: '—',
        description: 'Referência ao componente/área a bloquear (variável de template, ex.: `#painel`). Sem `target`, o BlockUI bloqueia o próprio conteúdo que envolve; para a tela toda, aplica-se no nível raiz.',
      },
      {
        name: 'autoZIndex',
        type: 'boolean',
        default: 'true',
        description: 'Gerencia a camada (z-index) automaticamente para a máscara ficar acima do conteúdo bloqueado. Deixar ligado.',
      },
      {
        name: 'baseZIndex',
        type: 'number',
        default: '0',
        description: 'Valor base de z-index quando o layering é manual. Raramente ajustado.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'content', accepts: 'conteúdo exibido POR CIMA da máscara (ex.: um spinner + "Processando…")', optional: true },
    ],
    states: ['unblocked', 'blocked'],
    invalidCombinations: [
      {
        combo: 'BlockUI ligado sem nenhum indicador de andamento por cima',
        porque: 'A área escurece e trava sem explicar por quê; parece que a tela "congelou".',
      },
      {
        combo: 'BlockUI que nunca desbloqueia (sem tratar erro da operação)',
        porque: 'Se a chamada falha e o `blocked` não volta a false, a pessoa fica presa para sempre.',
      },
      {
        combo: 'usar BlockUI para pedir uma decisão',
        porque: 'A máscara não oferece ação nenhuma; decisão pede um diálogo, não um bloqueio mudo.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'page', 'app-shell', 'form-field'],
    children: ['progressspinner', 'progressbar', 'message'],
    commonlyUsedWith: ['progressspinner', 'progressbar', 'datatable'],
    partOfPatterns: ['loading', 'async-submit'],
  },

  tokens: {
    typography: 'body-lg (texto opcional sobre a máscara)',
    byState: {
      blocked: { mask: 'surface/overlay-mask' },
    },
    note: 'A máscara herda a cor/opacidade de overlay do PrimeNG (surface/overlay-mask). O que aparece por cima (spinner/texto) segue seus próprios tokens. Cor por papel — nunca hex.',
  },

  antiPatterns: [
    {
      regra: 'Nunca bloquear sem mostrar o motivo (indicador de andamento).',
      porque: 'A área escurece e trava sem feedback; parece travamento/erro.',
      emVezDisso: 'Um ProgressSpinner (ou ProgressBar) e, quando útil, um texto "Processando…" por cima da máscara.',
    },
    {
      regra: 'Nunca deixar o bloqueio sem uma saída em caso de erro.',
      porque: 'Se a operação falha e o estado não volta, a pessoa fica presa indefinidamente.',
      emVezDisso: 'Sempre desligar `blocked` no sucesso E no erro (finally), e comunicar a falha (Toast/Message).',
    },
    {
      regra: 'Nunca usar BlockUI para pedir uma decisão do usuário.',
      porque: 'A máscara não tem ação; bloquear não é o mesmo que perguntar.',
      emVezDisso: 'ConfirmDialog/Dialog quando é preciso uma resposta; BlockUI só para esperar uma operação.',
    },
  ],

  examples: {
    angular: `<p-blockui [target]="painel" [blocked]="carregando">
  <p-progressspinner ariaLabel="Carregando" />
</p-blockui>

<div #painel>
  <!-- tabela / formulário que fica bloqueado durante a operação -->
</div>`,
    html: `<!-- região bloqueada com aria-busy + máscara e spinner por cima -->
<section aria-busy="true" data-block="blockui-target">
  <div data-slot="content"><!-- tabela/formulário (inerte enquanto bloqueado) --></div>
  <div role="status" data-block="blockui-mask">
    <span class="spinner" aria-hidden="true"></span>
    <span>Processando…</span>
  </div>
</section>`,
    inContext: `<!-- envio de formulário: bloqueia o card enquanto salva -->
<section aria-busy="true" data-block="card">
  <form><!-- campos inertes durante o salvamento --></form>
  <div role="status" data-block="blockui-mask">
    <span class="spinner" aria-hidden="true"></span>
    <span>Salvando…</span>
  </div>
</section>
<!-- ao concluir (sucesso ou erro): aria-busy=false, remove a máscara e avisa por Toast -->`,
  },

  a11y: {
    role: 'presentation (máscara) sobre uma região marcada aria-busy',
    keyboard: ['a região bloqueada fica inerte (não recebe foco/tab enquanto blocked)'],
    requiredAria: [
      'aria-busy="true" na região enquanto bloqueada',
      'o indicador por cima anuncia o estado (role="status" / aria-live)',
      'foco não deve entrar no conteúdo bloqueado enquanto a máscara está ativa',
    ],
    contrastMin: '3:1 do indicador (spinner/texto) sobre a máscara; a máscara escurece o suficiente para sinalizar o bloqueio',
  },

  aiHints: {
    keywords: [
      'blockui', 'bloquear', 'bloqueio', 'bloquear interação', 'bloquear interacao', 'travar tela',
      'máscara de carregamento', 'mascara de carregamento', 'carregando', 'processando',
      'overlay de loading', 'desabilitar durante carregamento',
    ],
    selectionCriteria:
      'Escolha BlockUI para IMPEDIR a interação de uma área (ou da tela) enquanto uma operação roda, sempre com um indicador de andamento por cima. Só mostrar loading sem travar = ProgressSpinner/ProgressBar; decisão = ConfirmDialog; placeholder de conteúdo = Skeleton.',
    disambiguation: [
      { confundeCom: 'progressspinner', criterio: 'ProgressSpinner só MOSTRA que algo carrega; BlockUI TRAVA a interação da área (e costuma conter um spinner por cima).' },
      { confundeCom: 'dialog', criterio: 'Dialog/ConfirmDialog pedem uma ação/decisão; BlockUI só bloqueia e espera, sem oferecer nada para clicar.' },
      { confundeCom: 'skeleton', criterio: 'Skeleton imita a forma do conteúdo que vai chegar; BlockUI cobre conteúdo existente para impedir uso durante uma operação.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/blockui',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). A camada Nephos reforça: sempre um indicador de andamento por cima, aria-busy na região e desbloqueio garantido no erro (finally).',
  },
};
