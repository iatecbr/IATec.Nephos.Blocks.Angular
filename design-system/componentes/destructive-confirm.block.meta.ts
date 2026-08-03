/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · destructive-confirm.block.meta.ts — BLOCO (composição nossa)
 * ─────────────────────────────────────────────────────────────
 * category: 'block' · origin: 'nephos-own'
 * O padrão "tem certeza?" antes de uma ação que não dá pra desfazer
 * (excluir, remover, arquivar de vez). Composto de ConfirmDialog + Button.
 * Saída do Moses = HTML semântico: um dialog (aria-modal) com a pergunta,
 * a consequência e duas ações — cancelar (seguro) + confirmar (danger).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const destructiveConfirmBlockMeta: NephosComponentMeta = {
  identity: {
    id: 'destructive-confirm',
    name: 'Confirmação de ação destrutiva',
    category: 'block',
    status: 'beta',
    version: '0.1.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Uma última confirmação antes de uma ação que não pode ser desfeita.',
    whenToUse: [
      'Excluir/remover de forma permanente (registro, arquivo, conta).',
      'Ações irreversíveis de alto impacto (cancelar de vez, publicar algo definitivo).',
    ],
    whenNotToUse: [
      'Ações reversíveis — ofereça "desfazer" (num Toast) em vez de perguntar antes.',
      'Ações de baixo risco — pedir confirmação a cada clique cansa e as pessoas param de ler.',
    ],
  },

  api: {
    inputs: [
      { name: 'title', type: 'string', default: 'Excluir item?', description: 'A pergunta, nomeando o objeto ("Excluir a fatura #1032?").' },
      { name: 'consequence', type: 'string', default: '—', description: 'A frase que diz o que acontece e que não dá para desfazer.' },
      { name: 'confirmLabel', type: 'string', default: 'Excluir', description: 'Rótulo da ação destrutiva — o VERBO real ("Excluir", "Remover"), nunca só "Sim/OK".' },
      { name: 'cancelLabel', type: 'string', default: 'Cancelar', description: 'A saída segura. É a opção de menor esforço/risco.' },
      { name: 'requireTyping', type: 'boolean', default: 'false', description: 'Para impacto muito alto: exigir digitar o nome do item para liberar o confirmar.' },
    ],
    outputs: [
      { name: 'confirm', payload: 'void', description: 'Emitido só quando a pessoa confirma a ação destrutiva.' },
      { name: 'cancel', payload: 'void', description: 'Emitido ao cancelar/fechar (a saída padrão).' },
    ],
    slots: [
      { name: 'question', accepts: 'a pergunta (título do dialog)' },
      { name: 'consequence', accepts: 'texto da consequência irreversível' },
      { name: 'actions', accepts: 'Cancelar (seguro) + Confirmar (severity danger)' },
    ],
    states: ['fechado', 'aberto', 'confirmando'],
    invalidCombinations: [
      { combo: 'ação de confirmar com severity primary (não danger)', porque: 'Uma exclusão precisa parecer perigosa; primary a disfarça de ação comum.' },
      { combo: 'confirmar como foco inicial / botão mais fácil', porque: 'Aumenta a chance de excluir sem querer; o foco/segurança deve ficar no Cancelar.' },
      { combo: 'dismissableMask (fechar clicando fora) aqui', porque: 'Um clique fora acidental não deve equivaler a nada destrutivo — mas também não deve confirmar.' },
    ],
  },

  relationships: {
    parents: ['datatable', 'toolbar', 'card', 'page'],
    children: ['dialog', 'button'],
    commonlyUsedWith: ['button', 'toast'],
    partOfPatterns: ['destructive-confirmation'],
  },

  tokens: {
    typography: 'title-sm',
    byState: {
      janela: { background: 'surface/0', border: 'surface/200' },
      titulo: { text: 'surface/text' },
      acaoDestrutiva: { background: 'feedback.danger/500', text: 'feedback.danger/contrast' },
      acaoSegura: { text: 'surface/text' },
    },
    note: 'A ação destrutiva usa a severidade `danger` (feedback). Geometria/máscara herdam do dialog PrimeNG. Nunca hex.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar a ação destrutiva com aparência de ação comum (primary).',
      porque: 'Some o sinal de perigo; a pessoa clica achando que é seguro.',
      emVezDisso: 'Botão de confirmar com severity `danger`; Cancelar em baixa ênfase.',
    },
    {
      regra: 'Nunca rotular os botões como "Sim/Não" ou "OK".',
      porque: 'Fora de contexto não dizem o que fazem; a pessoa confirma sem entender.',
      emVezDisso: 'O verbo real da ação ("Excluir") vs a saída ("Cancelar").',
    },
    {
      regra: 'Nunca pedir confirmação para ações reversíveis.',
      porque: 'Excesso de "tem certeza?" cansa e as pessoas passam a confirmar no automático.',
      emVezDisso: 'Executar e oferecer "Desfazer" num Toast por alguns segundos.',
    },
    {
      regra: 'Nunca colocar o foco inicial no botão destrutivo.',
      porque: 'Um Enter distraído executa a exclusão.',
      emVezDisso: 'Foco inicial no Cancelar (a opção segura).',
    },
  ],

  examples: {
    angular: `<!-- p-confirmDialog + confirmationService -->
this.confirmationService.confirm({
  header: 'Excluir a fatura #1032?',
  message: 'Esta ação não pode ser desfeita.',
  acceptLabel: 'Excluir', acceptButtonProps: { severity: 'danger' },
  rejectLabel: 'Cancelar', rejectButtonProps: { severity: 'secondary', text: true },
  accept: () => this.excluir(),
});`,
    html: `<div role="dialog" aria-modal="true" aria-labelledby="dc-title" data-block="destructive-confirm">
  <h2 id="dc-title">Excluir a fatura #1032?</h2>
  <p>Esta ação não pode ser desfeita.</p>
  <footer data-slot="actions">
    <button type="button" data-variant="text" autofocus>Cancelar</button>
    <button type="button" data-variant="danger">Excluir</button>
  </footer>
</div>`,
    inContext: `<!-- disparado por uma ação de excluir numa linha da tabela -->
<button type="button" data-variant="text" aria-label="Excluir fatura #1032">Excluir</button>
<!-- abre o destructive-confirm acima -->`,
  },

  a11y: {
    role: 'dialog (alertdialog)',
    keyboard: ['Esc = cancelar', 'foco preso no diálogo', 'foco inicial no Cancelar', 'foco volta ao gatilho ao fechar'],
    requiredAria: ['role="alertdialog"', 'aria-modal="true"', 'aria-labelledby no título', 'a consequência escrita, não só implícita na cor'],
    contrastMin: '4.5:1; o botão danger com contraste suficiente do texto',
  },

  aiHints: {
    keywords: ['confirmar', 'confirmação', 'confirmacao', 'excluir', 'deletar', 'remover', 'tem certeza', 'ação destrutiva', 'irreversível', 'confirmdialog'],
    selectionCriteria:
      'Use a Confirmação destrutiva antes de ações IRREVERSÍVEIS de impacto (excluir de vez). Para ações reversíveis, prefira executar + "Desfazer" no Toast. Para muito alto impacto, exigir digitar o nome.',
    disambiguation: [
      { confundeCom: 'dialog', criterio: 'Dialog é genérico; esta é a especialização "confirmar algo destrutivo" com regras próprias (danger, foco no cancelar).' },
      { confundeCom: 'toast com desfazer', criterio: 'Se dá para desfazer, NÃO pergunte antes: execute e ofereça Desfazer no Toast.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/confirmdialog',
    figmaNode: 'https://www.figma.com/design/mHUXdyDZ820suwIRIIlp9Z/PrimeOne-4.0.0', // grupo "confirmdialog"
    storybookId: 'blocks-destructive-confirm',
    deltaFromPrimeng: 'Bloco nephos-own: padrão sobre o ConfirmDialog, com regras de segurança (danger, foco no cancelar, verbo real).',
  },
};
