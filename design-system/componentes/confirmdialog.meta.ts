/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · confirmdialog.meta.ts — ONDA "SOBREPOSIÇÕES"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-confirmdialog` + `ConfirmationService`. API
 * lida do código real (`primeng-confirmdialog.d.ts`).
 *
 * Diálogo MODAL de confirmação "tem certeza?". Um único `<p-confirmdialog>`
 * fica na app e é DISPARADO pelo serviço: `confirmationService.confirm({
 * message, header, accept, reject, ... })`. É o mecanismo do bloco
 * `destructive-confirm` (o PADRÃO nosso) — ver aquela ficha para as regras.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const confirmDialogMeta: NephosComponentMeta = {
  identity: {
    id: 'confirmdialog',
    name: 'ConfirmDialog',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Diálogo modal de confirmação antes de uma ação importante ou destrutiva.',
    whenToUse: [
      'Pedir confirmação antes de algo com consequência (excluir, arquivar, enviar em lote).',
      'Interromper para uma decisão sim/não que exige atenção.',
    ],
    whenNotToUse: [
      'Ação reversível — prefira executar e oferecer "Desfazer" (Toast), sem interromper.',
      'Coleta de dados/formulário — use Dialog comum.',
      'Confirmação leve ancorada num botão — use ConfirmPopup.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'confirmationService.confirm({…})',
        type: 'Confirmation',
        default: '—',
        description: '⭐ Como se dispara. Campos: `message` (a pergunta), `header` (título), `icon`, `accept`/`reject` (callbacks), `acceptLabel`/`rejectLabel` (rótulos com o VERBO real da ação), `acceptButtonStyleClass` (ex.: severidade danger no excluir), `defaultFocus`.',
      },
      {
        name: 'header / message / icon',
        type: 'string',
        default: '—',
        description: 'Também definíveis no componente (ou por template). O `message` é a pergunta clara; o `icon` reforça a gravidade.',
      },
      {
        name: 'acceptLabel / rejectLabel',
        type: 'string',
        default: "'Yes' / 'No'",
        description: 'Rótulos dos botões. Usar o VERBO real ("Excluir", "Cancelar") — nunca "OK/Sim" genérico.',
      },
      {
        name: 'defaultFocus',
        type: "'accept' | 'reject' | 'close'",
        default: 'accept',
        description: 'Onde o foco começa. Em ação DESTRUTIVA, focar o REJECT (cancelar) para não confirmar por engano no Enter.',
      },
      {
        name: 'closeOnEscape / dismissableMask',
        type: 'boolean',
        default: 'true',
        description: 'Esc fecha; clicar fora fecha. Em decisão crítica, considerar exigir escolha explícita.',
      },
      {
        name: 'modal',
        type: 'boolean',
        default: 'true',
        description: 'Bloqueia o resto da tela e prende o foco (obrigatório numa confirmação).',
      },
    ],
    outputs: [
      { name: 'onHide', payload: 'void', description: 'O diálogo fechou (por aceitar, rejeitar ou Esc).' },
    ],
    slots: [
      { name: 'message', accepts: 'template do corpo (pergunta + detalhes/consequência)', optional: true },
      { name: 'footer', accepts: 'template dos botões (customizar rótulos/ordem)', optional: true },
    ],
    states: ['hidden', 'visible'],
    invalidCombinations: [
      {
        combo: 'confirmar uma ação reversível',
        porque: 'Interromper à toa cansa; o certo é executar e oferecer Desfazer.',
      },
      {
        combo: 'foco inicial no ACEITAR numa ação destrutiva',
        porque: 'Um Enter reflexo confirma a exclusão sem intenção.',
      },
      {
        combo: 'rótulos genéricos ("OK/Cancelar") numa ação destrutiva',
        porque: '"OK" não diz o que vai acontecer; a pessoa confirma sem ler.',
      },
    ],
  },

  relationships: {
    parents: ['page', 'app-shell'],
    children: ['button', 'icon'],
    commonlyUsedWith: ['button', 'toast'],
    partOfPatterns: ['destructive-confirm', 'bulk-action'],
  },

  tokens: {
    typography: 'title-sm (título) · body-lg (mensagem)',
    byState: {
      visible: { background: 'surface/0', mask: 'surface/overlay-mask', danger: 'feedback.danger/500' },
    },
    note: 'Modal herda overlay/sombra/raio do PrimeNG. Botão de confirmar destrutivo = severidade danger; cancelar = neutro. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca pedir confirmação para o que é reversível.',
      porque: 'Interrompe sem necessidade; mina a confiança nos avisos.',
      emVezDisso: 'Executar e oferecer "Desfazer" (Toast) por alguns segundos.',
    },
    {
      regra: 'Nunca focar o botão de confirmar numa ação destrutiva.',
      porque: 'Um Enter reflexo confirma sem intenção.',
      emVezDisso: 'defaultFocus no cancelar; botão destrutivo em danger, à direita.',
    },
    {
      regra: 'Nunca usar rótulos genéricos numa ação séria.',
      porque: '"OK/Sim" não diz o que acontece.',
      emVezDisso: 'O verbo real ("Excluir bolsa"); para alto impacto, exigir digitar o nome (ver bloco destructive-confirm).',
    },
  ],

  examples: {
    angular: `<p-confirmdialog />

// no componente:
this.confirmationService.confirm({
  header: 'Excluir escola?',
  message: 'Esta ação remove o Colégio Adventista de Salvador e não pode ser desfeita.',
  acceptLabel: 'Excluir', rejectLabel: 'Cancelar',
  acceptButtonStyleClass: 'p-button-danger',
  defaultFocus: 'reject',
  accept: () => this.excluir(),
});`,
    html: `<div role="alertdialog" aria-modal="true" aria-labelledby="cd-t" aria-describedby="cd-m">
  <h2 id="cd-t">Excluir escola?</h2>
  <p id="cd-m">Esta ação remove o Colégio Adventista de Salvador e não pode ser desfeita.</p>
  <div class="actions">
    <button type="button" autofocus>Cancelar</button>
    <button type="button" data-variant="danger">Excluir</button>
  </div>
</div>`,
    inContext: `<!-- disparado por um botão de excluir na linha da tabela -->
<button type="button" aria-label="Excluir Colégio Adventista de Salvador"
        aria-haspopup="dialog">
  <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
</button>
<!-- abre o alertdialog acima; foco inicial em "Cancelar" -->`,
  },

  a11y: {
    role: 'alertdialog (aria-modal="true")',
    keyboard: ['foco preso no diálogo', 'Esc fecha (= cancelar)', 'Tab circula entre os botões', 'foco volta ao gatilho ao fechar'],
    requiredAria: [
      'role="alertdialog" com aria-modal, aria-labelledby (título) e aria-describedby (mensagem)',
      'foco inicial no cancelar em ação destrutiva',
      'rótulos com o verbo real; o resto da tela inerte enquanto aberto',
    ],
    contrastMin: '4.5:1 do texto; 3:1 do foco e das bordas dos botões',
  },

  aiHints: {
    keywords: [
      'confirmdialog', 'confirmação', 'confirmacao', 'tem certeza', 'excluir', 'apagar',
      'confirmar ação', 'confirmar acao', 'diálogo de confirmação', 'dialogo de confirmacao', 'alertdialog',
    ],
    selectionCriteria:
      'Escolha ConfirmDialog para uma decisão sim/não antes de uma ação com consequência (excluir, enviar em lote). Reversível = executar + Desfazer (Toast); formulário = Dialog; confirmação leve ancorada = ConfirmPopup. Regras do padrão em `destructive-confirm`.',
    disambiguation: [
      { confundeCom: 'dialog', criterio: 'Dialog é modal genérico (formulário/conteúdo); ConfirmDialog é a decisão sim/não.' },
      { confundeCom: 'confirmpopup', criterio: 'ConfirmPopup é confirmação LEVE ancorada num botão; ConfirmDialog é modal central para o que é sério.' },
      { confundeCom: 'toast', criterio: 'Para ações reversíveis, prefira Toast com Desfazer em vez de confirmar antes.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/confirmdialog',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng) via ConfirmationService. É o mecanismo do PADRÃO `destructive-confirm.block.meta.ts` (regras de danger/foco-no-cancelar/verbo-real vivem lá).',
  },
};
