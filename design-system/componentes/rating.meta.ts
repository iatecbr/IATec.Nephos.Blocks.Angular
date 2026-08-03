/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · rating.meta.ts — família "Campos de seleção"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-rating`. API lida do código real
 * (primeng@21.0.2, `types/primeng-rating.d.ts`).
 *
 * Avaliação por ESTRELAS: escolher um número inteiro numa escala
 * pequena (1..N) clicando/percorrendo os ícones. O PrimeNG descreve
 * como "extensão do radio button" — por isso a saída semântica é um
 * grupo de rádios (radiogroup), com rótulo. Também serve só para
 * MOSTRAR uma nota (readonly).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const ratingMeta: NephosComponentMeta = {
  identity: {
    id: 'rating',
    name: 'Rating',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Dar ou mostrar uma nota numa escala pequena de estrelas (1 a N).',
    whenToUse: [
      'Coletar uma avaliação subjetiva rápida: satisfação, qualidade, "quantas estrelas".',
      'Exibir a nota média/atribuída de um item (com readonly).',
    ],
    whenNotToUse: [
      'Escala grande ou contínua (0–100, %) — use Slider ou InputNumber.',
      'Escolher entre opções nomeadas (não uma nota ordinal) — use RadioButton/Select.',
      'Concordância em texto (Discordo…Concordo) — use SelectButton/RadioButton rotulados (escala Likert).',
    ],
  },

  api: {
    inputs: [
      { name: 'stars', type: 'number', default: '5', description: 'Quantas estrelas (o máximo da escala). Manter pequeno (tipicamente 5) para a leitura ser instantânea.' },
      { name: 'readonly', type: 'boolean', default: 'false', description: 'Só exibe a nota, sem permitir mudar. Use para mostrar avaliações já feitas.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita a interação (herdado da base). Diferente de readonly: sugere indisponível, não "somente leitura".' },
      { name: 'invalid', type: 'boolean', default: 'false', description: 'Marca como inválido quando a nota é obrigatória e não foi dada. Anda junto com a mensagem e o aria-invalid.' },
      { name: 'iconOnClass', type: 'string', default: '—', description: 'Classe do ícone da estrela CHEIA (preenchida). Ponto de entrada para trocar por um ícone Font Awesome do conteúdo.' },
      { name: 'iconOffClass', type: 'string', default: '—', description: 'Classe do ícone da estrela VAZIA. Manter o mesmo desenho de "on", só o preenchimento muda.' },
      { name: 'autofocus', type: 'boolean', default: 'false', description: 'Recebe foco ao carregar. Usar com parcimônia — só quando dar a nota é a primeira ação.' },
    ],
    outputs: [
      { name: 'onRate', payload: '{ originalEvent, value }', description: '⭐ Uma nota foi escolhida (o novo valor inteiro).' },
      { name: 'onFocus', payload: 'FocusEvent', description: 'O controle recebeu foco.' },
      { name: 'onBlur', payload: 'FocusEvent', description: 'O controle perdeu foco.' },
    ],
    slots: [
      { name: 'onicon', accepts: 'template do ícone cheio (estrela preenchida)', optional: true },
      { name: 'officon', accepts: 'template do ícone vazio (estrela vazia)', optional: true },
    ],
    states: ['default', 'hover', 'focus', 'rated', 'readonly', 'invalid', 'disabled'],
    invalidCombinations: [
      {
        combo: 'Rating sem rótulo/nome acessível',
        porque: 'Sem um rótulo, o leitor de tela não sabe o que a nota avalia.',
      },
      {
        combo: 'Rating para uma escala grande (0–100 / %)',
        porque: 'Dezenas de estrelas ficam ilegíveis; nota fina não é o que estrelas comunicam.',
      },
      {
        combo: 'Rating editável apenas com ícone, sem nome por estrela',
        porque: 'Sem "1 estrela", "2 estrelas"… no acessível, quem usa leitor não sabe qual valor está marcando.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'card', 'datatable'],
    children: ['icon'],
    commonlyUsedWith: ['label', 'helper-text', 'text', 'tag'],
    partOfPatterns: ['form-submission', 'form-field'],
  },

  tokens: {
    typography: 'body-lg (do rótulo)',
    byState: {
      default: { icon: 'surface/300' },
      rated: { icon: 'primary/color' },
      hover: { icon: 'primary/400' },
      focus: { ring: 'focus/ring' },
      invalid: { icon: 'feedback.danger/500' },
    },
    note: 'Estrela cheia = ênfase da marca (primary); vazia = surface. Tamanho e espaçamento dos ícones herdam do PrimeNG. Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar Rating sem rótulo e sem nome por estrela.',
      porque: 'Sem rótulo o controle é anônimo; sem "N estrelas" no acessível, a escolha é invisível para o leitor de tela.',
      emVezDisso: 'Rótulo associado + `aria-label`/rótulo em cada estrela ("1 estrela", "2 estrelas"…).',
    },
    {
      regra: 'Nunca usar Rating para escala grande ou contínua.',
      porque: 'Muitas estrelas viram ruído e não comunicam precisão numérica.',
      emVezDisso: 'Slider (0–100 aproximado) ou InputNumber (valor exato).',
    },
    {
      regra: 'Nunca comunicar a nota só pela cor das estrelas.',
      porque: 'Quem não distingue a cor não percebe quantas estão cheias.',
      emVezDisso: 'Diferença clara de preenchimento (cheia vs. vazia) + o número da nota em texto ("4 de 5").',
    },
  ],

  examples: {
    angular: `<label id="nota-lbl">Sua avaliação</label>
<p-rating [(ngModel)]="nota" [stars]="5" ariaLabelledBy="nota-lbl"
  (onRate)="enviar($event)" />

<!-- só exibição -->
<p-rating [ngModel]="media" [stars]="5" [readonly]="true" ariaLabel="Nota média" />`,
    html: `<fieldset>
  <legend>Sua avaliação</legend>
  <label><input type="radio" name="nota" value="1" /> 1 estrela</label>
  <label><input type="radio" name="nota" value="2" /> 2 estrelas</label>
  <label><input type="radio" name="nota" value="3" checked /> 3 estrelas</label>
  <label><input type="radio" name="nota" value="4" /> 4 estrelas</label>
  <label><input type="radio" name="nota" value="5" /> 5 estrelas</label>
</fieldset>`,
    inContext: `<!-- exibindo a nota de um item numa lista (somente leitura) -->
<div data-block="card">
  <h3>Escola Adventista Central</h3>
  <p>Avaliação dos responsáveis:
    <span role="img" aria-label="4 de 5 estrelas">
      <i class="fa-solid fa-star" aria-hidden="true"></i>
      <i class="fa-solid fa-star" aria-hidden="true"></i>
      <i class="fa-solid fa-star" aria-hidden="true"></i>
      <i class="fa-solid fa-star" aria-hidden="true"></i>
      <i class="fa-regular fa-star" aria-hidden="true"></i>
    </span>
    <span>4 de 5</span>
  </p>
</div>`,
  },

  a11y: {
    role: 'radiogroup (estrelas = opções); somente-leitura = img com aria-label da nota',
    keyboard: [
      'Tab entra no grupo; setas ←/→ (ou ↑/↓) mudam a nota',
      'digitar o número seleciona a estrela correspondente',
      'readonly não é focável para edição',
    ],
    requiredAria: [
      'nome acessível por rótulo associado (ou aria-label)',
      'cada estrela com nome ("1 estrela", "2 estrelas"…)',
      'aria-invalid + aria-describedby quando obrigatório e faltando',
      'em readonly, expor a nota em texto (ex.: aria-label "4 de 5 estrelas")',
    ],
    contrastMin: '3:1 das estrelas (cheia e contorno da vazia) sobre o fundo; foco visível',
  },

  aiHints: {
    keywords: [
      'rating', 'avaliação', 'avaliacao', 'estrelas', 'nota', 'classificação', 'classificacao',
      'satisfação', 'satisfacao', 'quantas estrelas', 'review', 'feedback por estrelas', 'avaliar',
    ],
    selectionCriteria:
      'Escolha Rating para uma nota ordinal curta em ESTRELAS (dar ou exibir), tipicamente 1–5. Escala grande/contínua = Slider/InputNumber. Opções nomeadas (não nota) = RadioButton/Select. Escala de concordância = SelectButton/RadioButton rotulados.',
    disambiguation: [
      { confundeCom: 'slider', criterio: 'Slider é faixa contínua/aproximada; Rating é uma nota inteira pequena em estrelas.' },
      { confundeCom: 'radiobutton', criterio: 'RadioButton escolhe entre opções nomeadas; Rating é uma escala ordinal visual de estrelas.' },
      { confundeCom: 'selectbutton', criterio: 'SelectButton mostra rótulos (ex.: Discordo…Concordo); Rating usa estrelas sem rótulo por passo.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/rating',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída editável = radiogroup (o PrimeNG descreve como extensão do radio); só exibição = ícones com aria-label da nota. Ícones de conteúdo seguem Font Awesome 7 Pro.',
  },
};
