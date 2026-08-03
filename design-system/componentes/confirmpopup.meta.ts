/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · confirmpopup.meta.ts — ONDA "SOBREPOSIÇÕES"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-confirmpopup` + `ConfirmationService`. API
 * lida do código real (`primeng-confirmpopup.d.ts`).
 *
 * Confirmação LEVE, ancorada no botão que a disparou (aparece coladinha
 * nele, com uma seta), para um "tem certeza?" de baixo/médio impacto.
 * Um único `<p-confirmpopup>` fica na app e é DISPARADO pelo serviço:
 * `confirmationService.confirm({ target, message, accept, reject, … })`.
 * A diferença para o ConfirmDialog é o PESO: aqui não bloqueia a tela.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const confirmPopupMeta: NephosComponentMeta = {
  identity: {
    id: 'confirmpopup',
    name: 'ConfirmPopup',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Confirmação leve "tem certeza?" ancorada no próprio botão, sem bloquear a tela.',
    whenToUse: [
      'Confirmar uma ação de baixo/médio impacto logo ao lado do botão que a disparou (ex.: remover um item de uma lista, limpar um filtro).',
      'Interromper o mínimo: a pessoa decide ali mesmo, no contexto, sem uma janela central.',
    ],
    whenNotToUse: [
      'Ação de alto impacto/irreversível (excluir escola, apagar em lote) — use ConfirmDialog (modal, foco preso).',
      'Ação reversível — execute e ofereça "Desfazer" (Toast), sem confirmar antes.',
      'Conteúdo rico ou um mini-formulário ancorado — use Popover.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'confirmationService.confirm({…})',
        type: 'Confirmation',
        default: '—',
        description: '⭐ Como se dispara. Campos: `target` (o elemento âncora — em geral o `event.currentTarget` do clique), `message` (a pergunta curta), `icon`, `accept`/`reject` (callbacks), `acceptLabel`/`rejectLabel` (rótulos com o VERBO real), `acceptButtonProps`/`rejectButtonProps` (severidade/estilo dos botões), `defaultFocus`.',
      },
      {
        name: 'key',
        type: 'string | undefined',
        default: '—',
        description: 'Chave para casar com o `key` do confirm quando há mais de um ConfirmPopup na árvore. Só necessário em telas com múltiplos disparadores distintos.',
      },
      {
        name: 'defaultFocus',
        type: "'accept' | 'reject' | 'none'",
        default: "'accept'",
        description: 'Onde o foco começa ao abrir. Se a ação tem qualquer consequência, focar o REJECT (cancelar) para não confirmar por engano no Enter.',
      },
      {
        name: 'visible',
        type: 'boolean',
        default: 'false',
        description: 'Estado aberto/fechado da sobreposição. Normalmente controlado pelo serviço; raramente definido à mão.',
      },
      {
        name: 'autoZIndex',
        type: 'boolean',
        default: 'true',
        description: 'Gerencia a camada (z-index) automaticamente para o popup ficar acima do conteúdo. Deixar ligado.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'content', accepts: 'template do corpo (pergunta + ícone), quando o texto simples do `message` não basta', optional: true },
      { name: 'headless', accepts: 'template totalmente customizado (assume o controle do layout e dos botões)', optional: true },
    ],
    states: ['closed', 'open'],
    invalidCombinations: [
      {
        combo: 'ConfirmPopup para uma ação de alto impacto/irreversível',
        porque: 'Um popup leve, fácil de dispensar clicando fora, não dá o peso que uma exclusão séria exige.',
      },
      {
        combo: 'foco inicial no ACEITAR quando a ação tem consequência',
        porque: 'Um Enter reflexo confirma sem intenção — o popup abre já com o "sim" focado.',
      },
      {
        combo: 'confirmar uma ação reversível',
        porque: 'Interromper à toa cansa; o certo é executar e oferecer Desfazer (Toast).',
      },
    ],
  },

  relationships: {
    parents: ['datatable', 'toolbar', 'card', 'page'],
    children: ['button', 'icon'],
    commonlyUsedWith: ['button', 'icon-button', 'toast'],
    partOfPatterns: ['inline-confirmation', 'row-action'],
  },

  tokens: {
    typography: 'body-lg (mensagem)',
    byState: {
      open: { background: 'surface/0', border: 'surface/200', danger: 'feedback.danger/500' },
    },
    note: 'Sobreposição herda overlay/sombra/raio/seta do PrimeNG. Botão de confirmar com consequência = severidade danger; cancelar = neutro/texto. Cor por papel + passo — nunca hex.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar ConfirmPopup para uma ação de alto impacto ou irreversível.',
      porque: 'É leve e se dispensa clicando fora; não transmite gravidade nem prende o foco na decisão.',
      emVezDisso: 'ConfirmDialog modal para o que é sério (com foco no cancelar e o verbo real no botão).',
    },
    {
      regra: 'Nunca focar o botão de confirmar quando a ação tem consequência.',
      porque: 'O popup abre com o "sim" focado e um Enter reflexo confirma sem intenção.',
      emVezDisso: 'defaultFocus="reject"; botão de confirmar em danger quando destrói algo.',
    },
    {
      regra: 'Nunca usar rótulos genéricos ("Sim/Não", "OK") na confirmação.',
      porque: 'Não dizem o que vai acontecer; a pessoa confirma sem ler.',
      emVezDisso: 'O verbo real da ação ("Remover", "Limpar") nos rótulos accept/reject.',
    },
  ],

  examples: {
    angular: `<p-confirmpopup />

<button pButton severity="danger" [text]="true"
        (click)="confirmarRemocao($event)">Remover</button>

// no componente:
confirmarRemocao(event: Event) {
  this.confirmationService.confirm({
    target: event.currentTarget as EventTarget,
    message: 'Remover esta linha da lista?',
    acceptLabel: 'Remover', rejectLabel: 'Cancelar',
    acceptButtonProps: { severity: 'danger' },
    defaultFocus: 'reject',
    accept: () => this.remover(),
  });
}`,
    html: `<button type="button" aria-haspopup="dialog" aria-expanded="true" aria-controls="cp-1">
  Remover
</button>
<div id="cp-1" role="alertdialog" aria-labelledby="cp-1-msg">
  <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
  <p id="cp-1-msg">Remover esta linha da lista?</p>
  <div class="actions">
    <button type="button" autofocus>Cancelar</button>
    <button type="button" data-variant="danger">Remover</button>
  </div>
</div>`,
    inContext: `<!-- confirmação ancorada num botão de ação de linha da tabela -->
<td>
  <button type="button" aria-haspopup="dialog" aria-expanded="false"
          aria-label="Remover Colégio Adventista de Salvador">
    <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
  </button>
  <!-- ao clicar, abre o alertdialog ancorado acima; foco inicial em "Cancelar" -->
</td>`,
  },

  a11y: {
    role: 'alertdialog (sobreposição ancorada; não bloqueia a tela)',
    keyboard: ['abre ao ativar o gatilho', 'Esc fecha (= cancelar)', 'Tab circula entre os botões', 'foco volta ao gatilho ao fechar'],
    requiredAria: [
      'gatilho com aria-haspopup e aria-expanded',
      'popup com nome/descrição (aria-labelledby apontando para a mensagem)',
      'foco gerenciado (entra ao abrir, volta ao fechar); no destrutivo, foco inicial no cancelar',
    ],
    contrastMin: '4.5:1 do texto; 3:1 do foco e das bordas dos botões',
  },

  aiHints: {
    keywords: [
      'confirmpopup', 'confirmação leve', 'confirmacao leve', 'confirmar ancorado', 'tem certeza',
      'confirmação inline', 'confirmacao inline', 'popup de confirmação', 'popup de confirmacao',
      'confirmar no botão', 'confirmar no botao', 'inline confirm',
    ],
    selectionCriteria:
      'Escolha ConfirmPopup para um "tem certeza?" LEVE, de baixo/médio impacto, ancorado no próprio botão, sem bloquear a tela. Alto impacto/irreversível = ConfirmDialog; reversível = executar + Desfazer (Toast); conteúdo rico/mini-form = Popover.',
    disambiguation: [
      { confundeCom: 'confirmdialog', criterio: 'ConfirmDialog é modal central que bloqueia e prende o foco (ações sérias); ConfirmPopup é leve, ancorado no botão, para o que é simples.' },
      { confundeCom: 'popover', criterio: 'Popover comporta conteúdo rico/interativo (mini-form, opções); ConfirmPopup é só a decisão sim/não com dois botões.' },
      { confundeCom: 'toast', criterio: 'Para ações reversíveis, prefira executar e oferecer Desfazer (Toast) em vez de confirmar antes.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/confirmpopup',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng) via ConfirmationService com `target`. É a variante LEVE do padrão de confirmação; para o modal sério ver `confirmdialog.meta.ts` e o bloco `destructive-confirm`.',
  },
};
