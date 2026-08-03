/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · inputtext.meta.ts — PILOTO #2 (parte 1 de 2)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → campo de texto usado direto do PrimeNG (pInputText).
 * Este piloto testa o contrato num componente que quase nunca aparece
 * sozinho: puxa as regras de COMPOSIÇÃO (rótulo, ajuda, erro) e de
 * ACESSIBILIDADE (todo campo tem `<label>` associado).
 *
 * Saída do Moses = HTML semântico: `<input>` + `<label for>`.
 * O par visual do rótulo flutuante está em `floatlabel.meta.ts`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const inputTextMeta: NephosComponentMeta = {
  identity: {
    id: 'inputtext',
    name: 'InputText',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Campo para o usuário digitar um texto curto de uma linha.',
    whenToUse: [
      'Coletar texto livre curto: nome, e-mail, assunto, busca.',
      'Sempre acompanhado de um rótulo que diz o que preencher.',
    ],
    whenNotToUse: [
      'Número, moeda ou porcentagem — use InputNumber (teclado e formatação certos).',
      'Data — use DatePicker. Senha — use Password. Texto longo — use Textarea.',
      'Escolher de uma lista pronta — use Select ou AutoComplete.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'variant',
        type: "'outlined' | 'filled'",
        default: 'outlined',
        description: 'Estilo da borda do campo. Manter o mesmo variant em todos os campos de um formulário.',
      },
      {
        name: 'pSize',
        type: "'small' | 'large'",
        default: '(normal)',
        description: 'Densidade do campo. `small` só em áreas densas (filtros de tabela). Omitir para o tamanho padrão.',
      },
      {
        name: 'fluid',
        type: 'boolean',
        default: 'false',
        description: 'Ocupa 100% da largura do contêiner. Comum em formulários de coluna única e mobile.',
      },
      {
        name: 'invalid',
        type: 'boolean',
        default: 'false',
        description: 'Marca o campo como inválido (borda de erro). Dirigido pela validação do formulário — anda junto com a mensagem de erro e o aria-invalid.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Desabilita o campo. Se o motivo não é óbvio, explicar no contexto em vez de só desabilitar.',
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        description: 'Mostra o valor mas não deixa editar. Diferente de disabled: continua legível e focável.',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: '—',
        description: 'Exemplo dentro do campo. NUNCA substitui o rótulo — some quando a pessoa digita.',
      },
    ],
    outputs: [
      { name: 'valueChange', payload: 'string', description: 'Emitido a cada mudança do texto digitado.' },
    ],
    slots: [],
    states: ['default', 'hover', 'focus', 'filled', 'invalid', 'disabled', 'readonly'],
    invalidCombinations: [
      {
        combo: 'disabled=true + invalid=true',
        porque: 'Um campo desabilitado não recebe entrada, então não faz sentido acusá-lo como inválido ao mesmo tempo.',
      },
      {
        combo: 'placeholder como único rótulo (sem <label>)',
        porque: 'O placeholder some ao digitar e não é lido de forma confiável — a pessoa perde a referência do que preencher.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'inputgroup', 'iconfield', 'floatlabel'],
    children: [],
    commonlyUsedWith: ['floatlabel', 'button', 'message'],
    partOfPatterns: ['form-submission', 'search', 'login'],
  },

  tokens: {
    // origin: 'primeng' → vêm dos tokens de formulário do PrimeNG (formField.*).
    typography: 'body-lg',
    byState: {
      default: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      hover: { border: 'surface/400' },
      focus: { ring: 'focus/ring' },
      invalid: { border: 'feedback.danger/500' },
    },
    note: 'Espaçamento, raio e alturas do campo herdam do PrimeNG (formField.*) — não se define aqui. Cor sempre por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar um campo sem `<label>` associado (o placeholder não é rótulo).',
      porque: 'O leitor de tela não anuncia o campo e a pessoa perde a referência quando o placeholder some ao digitar.',
      emVezDisso: 'Um `<label for="id">` ligado ao campo (visível ou com FloatLabel).',
    },
    {
      regra: 'Nunca sinalizar erro só com cor (borda vermelha).',
      porque: 'Quem não distingue cores não percebe o erro; a cor sozinha não diz O QUE corrigir.',
      emVezDisso: 'Uma mensagem de texto explicando o erro, ligada ao campo por aria-describedby.',
    },
    {
      regra: 'Nunca usar InputText para número, data ou senha.',
      porque: 'Perde teclado, formatação e validação próprios desses tipos, e piora a experiência no celular.',
      emVezDisso: 'InputNumber, DatePicker ou Password conforme o dado.',
    },
    {
      regra: 'Nunca marcar campo obrigatório só com o asterisco visual.',
      porque: 'O asterisco sozinho pode não ser anunciado pela tecnologia assistiva.',
      emVezDisso: 'Asterisco visível + `aria-required="true"` (e explicar no topo o que o asterisco significa).',
    },
  ],

  examples: {
    angular: `<input pInputText [(ngModel)]="email" id="email" [fluid]="true" />`,
    html: `<label for="email">E-mail</label>
<input id="email" type="email" name="email" />`,
    inContext: `<!-- campo de formulário completo: rótulo + ajuda + erro -->
<div data-block="form-field">
  <label for="email">E-mail <span aria-hidden="true">*</span></label>
  <input id="email" type="email" name="email"
         aria-required="true" aria-invalid="true"
         aria-describedby="email-ajuda email-erro" />
  <small id="email-ajuda">Usaremos para enviar a confirmação.</small>
  <small id="email-erro" data-variant="danger">Digite um e-mail válido.</small>
</div>`,
  },

  a11y: {
    role: 'textbox',
    keyboard: ['Tab entra e sai', 'digitação normal', 'Esc limpa quando aplicável'],
    requiredAria: [
      'sempre um <label for> associado',
      'aria-required="true" quando obrigatório',
      'aria-invalid + aria-describedby apontando para a mensagem de erro',
    ],
    contrastMin: '4.5:1 do texto digitado e do rótulo; a borda de foco visível',
  },

  aiHints: {
    keywords: [
      'campo', 'input', 'texto', 'text field', 'formulário', 'formulario',
      'preencher', 'digitar', 'entrada', 'e-mail', 'nome', 'busca', 'search',
    ],
    selectionCriteria:
      'Escolha o InputText quando o requisito pede que o usuário DIGITE um texto curto de uma linha. Se o dado tem um tipo próprio (número, data, senha, texto longo), prefira o componente específico. Sempre acompanhar de um rótulo.',
    disambiguation: [
      { confundeCom: 'textarea', criterio: 'Textarea é para texto de VÁRIAS linhas; InputText é uma linha só.' },
      { confundeCom: 'autocomplete', criterio: 'AutoComplete sugere valores de uma lista enquanto digita; InputText é texto livre.' },
      { confundeCom: 'inputnumber', criterio: 'Se o valor é número/moeda, use InputNumber (teclado e formatação corretos).' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/inputtext',
    figmaNode: 'https://www.figma.com/design/mHUXdyDZ820suwIRIIlp9Z/PrimeOne-4.0.0', // grupo "inputtext"
    storybookId: 'atoms-inputtext',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Só a cor da marca entra pelo tema.',
  },
};
