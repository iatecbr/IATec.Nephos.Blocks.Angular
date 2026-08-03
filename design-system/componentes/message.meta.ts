/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · message.meta.ts — aviso inline (mensagem na tela)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → usado direto do PrimeNG (p-message).
 * É um aviso que fica NA tela, junto do conteúdo (não some sozinho).
 * Saída do Moses = HTML semântico: um bloco com role="alert" (erro) ou
 * role="status" (info/sucesso).
 *
 * ⚠️ Pegadinha do PrimeNG (documentada por fidelidade): aqui a severidade
 * de erro chama-se `error` (no Button e no Tag chama-se `danger`).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const messageMeta: NephosComponentMeta = {
  identity: {
    id: 'message',
    name: 'Message',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Aviso que permanece na tela, ligado a um contexto (um campo, um formulário, uma seção).',
    whenToUse: [
      'Explicar o resultado de uma validação junto do formulário.',
      'Comunicar um estado persistente da página (ex.: "sem conexão", "modo leitura").',
    ],
    whenNotToUse: [
      'Confirmação rápida que pode sumir sozinha — use Toast.',
      'Decisão que exige resposta antes de continuar — use Dialog/ConfirmDialog.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'severity',
        type: "'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'",
        default: 'info',
        description: 'Papel do aviso. ⚠️ aqui o erro é `error` (diferente do Button/Tag, que usam `danger`). As cores vêm do tema — nunca escolher à mão.',
      },
      { name: 'text', type: 'string', default: '—', description: 'O texto do aviso. Direto e acionável ("Digite um e-mail válido").' },
      { name: 'icon', type: 'string', default: '(da severidade)', description: 'Ícone. Reforça o tipo; não substitui o texto.' },
      { name: 'closable', type: 'boolean', default: 'false', description: 'Mostra o "x" para fechar. Só quando faz sentido dispensar o aviso.' },
      { name: 'size', type: "'small' | 'large'", default: '(normal)', description: 'Densidade.' },
      { name: 'variant', type: "'outlined' | 'simple'", default: '(preenchido)', description: 'Estilo visual do fundo/borda.' },
    ],
    outputs: [
      { name: 'onClose', payload: 'void', description: 'Emitido ao fechar (quando closable).' },
    ],
    slots: [
      { name: 'default', accepts: 'conteúdo do aviso, se mais rico que só texto', optional: true },
    ],
    states: ['default', 'closable'],
    invalidCombinations: [
      { combo: 'cor/ícone como único sinal do tipo', porque: 'Quem não distingue cores não percebe se é erro ou sucesso; o texto precisa dizer.' },
    ],
  },

  relationships: {
    parents: ['form-field', 'form', 'page'],
    children: [],
    commonlyUsedWith: ['inputtext', 'button'],
    partOfPatterns: ['form-validation', 'system-status'],
  },

  tokens: {
    typography: 'body-sm',
    byState: {
      // Cor pela SEVERIDADE (feedback). Vem dos tokens de componente do PrimeNG
      // (message.error.*, message.success.* …), ancorados nos primitivos.
      erro: { background: 'feedback.danger/50', text: 'feedback.danger/700', border: 'feedback.danger/500' },
      sucesso: { background: 'feedback.success/50', text: 'feedback.success/700', border: 'feedback.success/500' },
      info: { background: 'feedback.info/50', text: 'feedback.info/700', border: 'feedback.info/500' },
    },
    note: 'Fidelidade: cor sempre pela severidade (papel feedback), herdada do componente PrimeNG — nunca hex. Raio/espaçamento herdam do PrimeNG.',
  },

  antiPatterns: [
    {
      regra: 'Nunca comunicar o tipo do aviso só por cor ou só por ícone.',
      porque: 'Daltônicos e leitores de tela não recebem a informação.',
      emVezDisso: 'Sempre um texto que diz o que aconteceu e o que fazer.',
    },
    {
      regra: 'Nunca usar Message para confirmação passageira.',
      porque: 'Um aviso fixo para algo que já passou polui a tela.',
      emVezDisso: 'Toast, que aparece e some sozinho.',
    },
    {
      regra: 'Nunca empilhar muitos Messages no topo.',
      porque: 'Vira ruído e a pessoa para de ler.',
      emVezDisso: 'Um resumo, ou o aviso junto do campo que o causou.',
    },
  ],

  examples: {
    angular: `<p-message severity="error" text="Digite um e-mail válido." />`,
    html: `<div role="alert" data-block="message" data-variant="danger">
  <span aria-hidden="true">⚠</span> Digite um e-mail válido.
</div>`,
    inContext: `<div data-block="form-field">
  <label for="email">E-mail</label>
  <input id="email" type="email" aria-invalid="true" aria-describedby="email-msg" />
  <div id="email-msg" role="alert" data-block="message" data-variant="danger">Digite um e-mail válido.</div>
</div>`,
  },

  a11y: {
    role: 'alert (erro/warn) · status (info/sucesso)',
    keyboard: ['o botão fechar, se houver, é focável e acionável'],
    requiredAria: ['role="alert" para erros (anúncio assertivo)', 'role="status" para info/sucesso', 'aria-label no botão fechar'],
    contrastMin: '4.5:1 do texto sobre o fundo do aviso',
  },

  aiHints: {
    keywords: ['mensagem', 'message', 'aviso', 'alerta', 'validação', 'validacao', 'erro', 'inline', 'feedback'],
    selectionCriteria:
      'Escolha o Message para um aviso que FICA na tela ligado a um contexto (validação, estado). Se some sozinho → Toast. Se exige decisão → Dialog.',
    disambiguation: [
      { confundeCom: 'toast', criterio: 'Toast é passageiro (aparece e some); Message permanece.' },
      { confundeCom: 'dialog', criterio: 'Dialog interrompe e exige ação; Message só informa.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/message',
    figmaNode: 'https://www.figma.com/design/mHUXdyDZ820suwIRIIlp9Z/PrimeOne-4.0.0', // grupo "message"
    storybookId: 'atoms-message',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Cor pela severidade do tema.',
  },
};
