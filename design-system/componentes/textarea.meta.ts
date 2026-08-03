/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · textarea.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → usado direto. API lida do código real
 * (primeng@21.0.2, `types/primeng-textarea.d.ts`).
 *
 * ⚠️ Fidelidade: NÃO é um `p-textarea`. É a DIRETIVA `[pTextarea]`
 * aplicada num `<textarea>` nativo. O Moses emite `<textarea>` +
 * `<label for>` — a diretiva só veste o elemento com o tema.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const textareaMeta: NephosComponentMeta = {
  identity: {
    id: 'textarea',
    name: 'Textarea',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Campo para o usuário digitar um texto longo, de várias linhas.',
    whenToUse: [
      'Coletar texto livre com quebras de linha: observação, descrição, justificativa.',
      'Quando o conteúdo pode crescer (usar autoResize para acompanhar).',
    ],
    whenNotToUse: [
      'Texto curto de uma linha — use InputText.',
      'Número, data, senha — use o componente específico.',
      'Texto com formatação rica (negrito, listas) — use um editor.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'autoResize',
        type: 'boolean',
        default: 'false',
        description: 'A altura cresce sozinha conforme a pessoa digita, sem barra de rolagem interna. Bom para respostas de tamanho imprevisível.',
      },
      {
        name: 'variant',
        type: "'outlined' | 'filled'",
        default: 'outlined',
        description: 'Estilo da borda do campo. Manter o mesmo variant de todos os campos do formulário.',
      },
      {
        name: 'pSize',
        type: "'small' | 'large'",
        default: '(normal)',
        description: 'Densidade do campo. `small` só em áreas densas. Omitir para o tamanho padrão.',
      },
      {
        name: 'fluid',
        type: 'boolean',
        default: 'false',
        description: 'Ocupa 100% da largura do contêiner. Comum em formulário de coluna única.',
      },
      {
        name: 'invalid',
        type: 'boolean',
        default: 'false',
        description: 'Marca o campo como inválido (borda de erro). Anda junto com a mensagem de erro e o aria-invalid.',
      },
    ],
    outputs: [
      { name: 'onResize', payload: 'Event', description: 'Emitido quando o autoResize recalcula a altura.' },
    ],
    slots: [],
    states: ['default', 'hover', 'focus', 'filled', 'invalid', 'disabled', 'readonly'],
    invalidCombinations: [
      {
        combo: 'textarea sem `<label>` associado',
        porque: 'O leitor de tela não anuncia o campo; o placeholder some ao digitar e não é rótulo.',
      },
      {
        combo: 'autoResize=true + altura/linhas fixas por CSS',
        porque: 'A altura automática briga com a altura fixa e o campo "pula" ao digitar.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'floatlabel'],
    children: [],
    commonlyUsedWith: ['label', 'helper-text', 'button', 'floatlabel'],
    partOfPatterns: ['form-submission', 'form-field'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      default: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      hover: { border: 'surface/400' },
      focus: { border: 'primary/color', ring: 'focus/ring' },
      invalid: { border: 'feedback.danger/500' },
    },
    note: 'Espaçamento, raio e alturas herdam do PrimeNG (formField.*). Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar um campo sem `<label>` associado.',
      porque: 'O leitor de tela não anuncia o campo e a pessoa perde a referência quando o placeholder some.',
      emVezDisso: 'Um `<label for="id">` ligado ao campo (visível ou com FloatLabel).',
    },
    {
      regra: 'Nunca usar Textarea para texto de uma linha só.',
      porque: 'Convida quebras de linha onde não deviam existir (ex.: nome, assunto) e ocupa espaço à toa.',
      emVezDisso: 'InputText para uma linha; Textarea só quando várias linhas fazem sentido.',
    },
    {
      regra: 'Nunca sinalizar erro só com a borda vermelha.',
      porque: 'Cor sozinha não é percebida por todos e não diz o que corrigir.',
      emVezDisso: 'Mensagem de texto ligada por aria-describedby + aria-invalid no campo.',
    },
  ],

  examples: {
    angular: `<textarea pTextarea id="obs" [(ngModel)]="obs" [autoResize]="true" [fluid]="true"></textarea>`,
    html: `<label for="obs">Observações</label>
<textarea id="obs" name="obs" rows="4"></textarea>`,
    inContext: `<!-- campo longo com ajuda e limite -->
<div data-block="form-field">
  <label for="justificativa">Justificativa <span aria-hidden="true">*</span></label>
  <textarea id="justificativa" name="justificativa" rows="4"
            aria-required="true" aria-describedby="just-ajuda"></textarea>
  <small id="just-ajuda">Explique o motivo em poucas linhas.</small>
</div>`,
  },

  a11y: {
    role: 'textbox (multiline)',
    keyboard: ['Tab entra e sai', 'Enter cria nova linha', 'digitação normal'],
    requiredAria: [
      'sempre um `<label for>` associado',
      'aria-required quando obrigatório',
      'aria-invalid + aria-describedby apontando para o erro',
    ],
    contrastMin: '4.5:1 do texto digitado e do rótulo; borda de foco visível',
  },

  aiHints: {
    keywords: [
      'textarea', 'texto longo', 'várias linhas', 'varias linhas', 'observação', 'observacao',
      'descrição', 'descricao', 'comentário', 'comentario', 'justificativa', 'campo grande',
    ],
    selectionCriteria:
      'Escolha Textarea quando o texto pode ter VÁRIAS linhas. Uma linha só = InputText. Sempre com rótulo associado; use autoResize se o tamanho é imprevisível.',
    disambiguation: [
      { confundeCom: 'inputtext', criterio: 'InputText é uma linha; Textarea é multilinha.' },
      { confundeCom: 'editor', criterio: 'Se precisa de formatação rica (negrito, listas), é um editor, não Textarea.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/textarea',
    deltaFromPrimeng: 'Nenhum — diretiva `[pTextarea]` usada direto (origin: primeng). Saída é `<textarea>` semântico; só a cor da marca entra pelo tema.',
  },
};
