/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · helper-text.meta.ts — ONDA 1 (primitivo)
 * ─────────────────────────────────────────────────────────────
 * origin: 'nephos-own' → não existe como `p-*` no PrimeNG. É o texto
 * curto de apoio ATRELADO a um campo: ajuda, dica de formato ou
 * mensagem de erro. Emite `<small>` (ou `<span>`) ligado ao campo por
 * `aria-describedby`.
 *
 * É a peça que fecha o campo de formulário acessível junto com
 * `label` + `inputtext` — ver `inputtext.meta.ts` (bloco inContext).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const helperTextMeta: NephosComponentMeta = {
  identity: {
    id: 'helper-text',
    name: 'Helper text',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Texto curto de apoio ou de erro ligado a um campo de formulário.',
    whenToUse: [
      'Explicar o formato esperado ou dar contexto ao campo ("Usaremos para enviar a confirmação").',
      'Mostrar a mensagem de erro da validação, ligada ao campo.',
    ],
    whenNotToUse: [
      'Texto de conteúdo solto — use Text.',
      'Rótulo do campo — use Label.',
      'Aviso de página inteira (não de um campo) — use Message.',
    ],
  },

  api: {
    // Não é um componente PrimeNG: "inputs" = atributos do HTML semântico.
    inputs: [
      {
        name: 'variant',
        type: "'hint' | 'danger'",
        default: 'hint',
        description: '`hint` = ajuda neutra (cor `muted`). `danger` = mensagem de erro (cor `feedback.danger`). O erro anda junto com `invalid`/`aria-invalid` no campo.',
      },
      {
        name: 'for',
        type: 'string (id do campo)',
        default: '(obrigatório)',
        description: 'Id do campo que este texto descreve. O campo referencia este texto por `aria-describedby` — é isso que liga a ajuda/erro ao controle para o leitor de tela.',
      },
      {
        name: 'live',
        type: "'off' | 'polite'",
        default: 'off',
        description: 'Quando o erro aparece DEPOIS (validação assíncrona), usar `polite` (`aria-live`) para o leitor de tela anunciar sem roubar o foco. Ajuda estática fica `off`.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'default', accepts: 'texto curto (uma ou duas frases)' },
    ],
    states: ['hint', 'danger'],
    invalidCombinations: [
      {
        combo: 'variant="danger" sem `aria-invalid` no campo',
        porque: 'A mensagem diz que há erro mas o campo não está marcado como inválido — o leitor de tela não relaciona os dois.',
      },
      {
        combo: 'helper-text sem `for`/`aria-describedby` ligando ao campo',
        porque: 'Vira texto solto: o leitor de tela não anuncia a ajuda/erro ao focar o campo.',
      },
      {
        combo: 'erro sinalizado só pela cor (sem texto)',
        porque: 'Quem não distingue cores não percebe o erro; a cor não diz O QUE corrigir.',
      },
    ],
  },

  relationships: {
    parents: ['form-field'],
    children: [],
    commonlyUsedWith: ['inputtext', 'label', 'password', 'select', 'textarea'],
    partOfPatterns: ['form-field', 'form-submission', 'login'],
  },

  tokens: {
    typography: 'caption (12px) ou body-sm (14px)',
    byState: {
      hint: { text: 'surface/text-muted' },
      danger: { text: 'feedback.danger/500' },
    },
    note: 'Ajuda = `text.mutedColor`; erro = primitivo de `danger` do PrimeNG (via o token de severity, nunca hex). Cor nunca é o único sinal de erro — sempre acompanha texto.',
  },

  antiPatterns: [
    {
      regra: 'Nunca sinalizar erro só com a borda/texto vermelho, sem mensagem.',
      porque: 'Cor sozinha não é percebida por todos e não diz o que corrigir.',
      emVezDisso: 'Uma frase objetiva ("Digite um e-mail válido") ligada ao campo por aria-describedby, com aria-invalid no campo.',
    },
    {
      regra: 'Nunca deixar o helper-text solto, sem ligar ao campo.',
      porque: 'Sem `aria-describedby`, o leitor de tela não anuncia a ajuda/erro ao focar o controle.',
      emVezDisso: 'Dar um id ao texto e apontar `aria-describedby="<id>"` no campo.',
    },
    {
      regra: 'Nunca usar helper-text para aviso de página ou de formulário inteiro.',
      porque: 'Helper-text descreve UM campo; um aviso geral tem outro papel (role e posição diferentes).',
      emVezDisso: 'Message (aviso inline no topo) ou Toast, conforme o alcance.',
    },
  ],

  examples: {
    angular: `<small id="email-ajuda" class="text-muted">Usaremos para enviar a confirmação.</small>`,
    html: `<small id="email-ajuda">Usaremos para enviar a confirmação.</small>`,
    inContext: `<!-- campo com ajuda E erro, ambos ligados ao input -->
<div data-block="form-field">
  <label for="email">E-mail</label>
  <input id="email" type="email" name="email"
         aria-invalid="true" aria-describedby="email-ajuda email-erro" />
  <small id="email-ajuda">Usaremos para enviar a confirmação.</small>
  <small id="email-erro" data-variant="danger" aria-live="polite">Digite um e-mail válido.</small>
</div>`,
  },

  a11y: {
    role: 'não tem role próprio (texto); vira descrição do campo via aria-describedby',
    keyboard: ['não recebe foco — é anunciado quando o campo descrito recebe foco'],
    requiredAria: [
      'campo aponta `aria-describedby` para o id deste texto',
      'erro: `aria-invalid="true"` no campo; se aparecer depois, `aria-live="polite"` no texto',
    ],
    contrastMin: '4.5:1 do texto de ajuda e de erro sobre o fundo (o muted também precisa passar)',
  },

  aiHints: {
    keywords: [
      'ajuda', 'helper', 'helper text', 'dica', 'hint', 'erro', 'error', 'mensagem de erro',
      'validação', 'validacao', 'texto de apoio', 'formato', 'sob o campo',
    ],
    selectionCriteria:
      'Use Helper text quando o texto AJUDA a preencher um campo ou informa o ERRO dele, sempre ligado ao campo por aria-describedby. Se o texto não pertence a um campo, é Text; se é aviso de página, é Message.',
    disambiguation: [
      { confundeCom: 'message', criterio: 'Message é aviso de bloco/página (role=alert/status); Helper text descreve UM campo.' },
      { confundeCom: 'text', criterio: 'Text é conteúdo solto; Helper text é atrelado a um controle de formulário.' },
      { confundeCom: 'label', criterio: 'Label diz O QUE é o campo; Helper text dá ajuda/erro sobre ele.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/inputtext (seção de ajuda/erro do campo)',
    deltaFromPrimeng: 'Primitivo Nephos: o PrimeNG não tem componente de helper text — é `<small>` semântico + regra de aria-describedby + tokens de tipografia/cor nossos.',
  },
};
