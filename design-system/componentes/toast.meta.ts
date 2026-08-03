/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · toast.meta.ts — aviso passageiro (aparece e some)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → usado direto do PrimeNG (p-toast + MessageService).
 * Notificação breve que surge (canto da tela) e some sozinha.
 * Saída do Moses = HTML semântico: uma região viva (aria-live) com o aviso.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const toastMeta: NephosComponentMeta = {
  identity: {
    id: 'toast',
    name: 'Toast',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Notificação breve e passageira, que confirma uma ação e some sozinha.',
    whenToUse: [
      'Confirmar que algo deu certo ("Salvo com sucesso").',
      'Avisar de um evento que não bloqueia o trabalho ("Novo comentário").',
    ],
    whenNotToUse: [
      'Informação que precisa continuar visível — use Message.',
      'Erro que exige correção antes de seguir — use Message junto do campo.',
      'Decisão obrigatória — use Dialog/ConfirmDialog.',
    ],
  },

  api: {
    // O Toast é disparado por serviço: messageService.add({ severity, summary, detail }).
    inputs: [
      { name: 'position', type: "'top-right' | 'top-center' | 'bottom-right' | '…'", default: 'top-right', description: 'Onde o toast aparece. Manter a mesma posição no produto inteiro.' },
      { name: 'severity', type: "'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'", default: 'info', description: 'Papel do aviso (via MessageService). ⚠️ erro = `error` (Button/Tag usam `danger`).' },
      { name: 'life', type: 'number (ms)', default: '3000', description: 'Quanto tempo fica na tela antes de sumir. Não usar muito curto para textos longos.' },
      { name: 'summary', type: 'string', default: '—', description: 'Título curto do aviso.' },
      { name: 'detail', type: 'string', default: '—', description: 'Texto do aviso.' },
    ],
    outputs: [
      { name: 'onClose', payload: 'message', description: 'Emitido quando um toast fecha (tempo ou clique).' },
    ],
    slots: [],
    states: ['entrando', 'visível', 'saindo'],
    invalidCombinations: [
      { combo: 'toast como ÚNICO canal de uma informação importante', porque: 'Ele some — quem não viu, perdeu. Informação crítica precisa de um canal persistente.' },
      { combo: 'life muito curto com texto longo', porque: 'Some antes de a pessoa terminar de ler.' },
    ],
  },

  relationships: {
    parents: ['app-root'],
    children: [],
    commonlyUsedWith: ['button'],
    partOfPatterns: ['action-confirmation', 'async-feedback'],
  },

  tokens: {
    typography: 'body-sm',
    note: 'Cor pela severidade (feedback), herdada dos tokens de componente do PrimeNG. Posição, raio e sombra herdam do PrimeNG. Nunca hex.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar Toast como único registro de uma informação importante.',
      porque: 'Ele desaparece — quem estava distraído perde.',
      emVezDisso: 'Deixar também um registro persistente (Message, lista de notificações, histórico).',
    },
    {
      regra: 'Nunca disparar vários toasts em sequência para o mesmo evento.',
      porque: 'Vira uma pilha que atrapalha e ninguém lê.',
      emVezDisso: 'Um toast só, resumindo; agrupar quando fizer sentido.',
    },
    {
      regra: 'Nunca colocar ação obrigatória (botão essencial) dentro de um toast.',
      porque: 'Se ele some, a ação some junto e a pessoa fica sem saída.',
      emVezDisso: 'Ação obrigatória vai para um Dialog ou para a própria tela.',
    },
  ],

  examples: {
    angular: `// no template: <p-toast position="top-right" />
// no componente:
this.messageService.add({ severity: 'success', summary: 'Pronto', detail: 'Salvo com sucesso.' });`,
    html: `<div aria-live="polite" data-block="toast-region">
  <div role="status" data-variant="success">
    <strong>Pronto</strong> — Salvo com sucesso.
  </div>
</div>`,
    inContext: `<!-- a região do toast fica no topo do app, sempre presente e vazia -->
<div aria-live="polite" data-block="toast-region"><!-- toasts entram e saem aqui --></div>`,
  },

  a11y: {
    role: 'status / alert dentro de região aria-live',
    keyboard: ['não rouba foco', 'se tiver botão fechar, é focável'],
    requiredAria: ['região com aria-live (polite para info/sucesso, assertive para erro)', 'não usar como único meio de informação crítica'],
    contrastMin: '4.5:1 do texto sobre o fundo do toast',
  },

  aiHints: {
    keywords: ['toast', 'notificação', 'notificacao', 'aviso rápido', 'snackbar', 'confirmação', 'sucesso', 'salvo'],
    selectionCriteria:
      'Escolha o Toast para confirmar uma ação de forma breve e passageira. Se a informação precisa continuar visível → Message. Se exige decisão → Dialog.',
    disambiguation: [
      { confundeCom: 'message', criterio: 'Message permanece na tela; Toast some sozinho.' },
      { confundeCom: 'dialog', criterio: 'Dialog interrompe e espera resposta; Toast não bloqueia nada.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/toast',
    figmaNode: 'https://www.figma.com/design/mHUXdyDZ820suwIRIIlp9Z/PrimeOne-4.0.0', // grupo "toast"
    storybookId: 'molecules-toast',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Cor pela severidade do tema.',
  },
};
