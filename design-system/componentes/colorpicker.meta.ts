/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · colorpicker.meta.ts — ONDA "ENTRADAS ESPECIAIS"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-colorpicker`. API lida do código real
 * (primeng@21.0.2, `types/primeng-colorpicker.d.ts`).
 *
 * Seletor de cor: um quadradinho de amostra que abre um painel para
 * escolher matiz/saturação/brilho. O valor guardado é uma COR
 * (hex/rgb/hsb) escolhida pela pessoa — isso é DADO do usuário, não um
 * token de tema. Saída semântica do Moses = `<input type="color">` com
 * rótulo. Nunca confundir com escolher a marca/tema da aplicação.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const colorPickerMeta: NephosComponentMeta = {
  identity: {
    id: 'colorpicker',
    name: 'ColorPicker',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Seletor de cor: a pessoa escolhe uma cor arbitrária num painel de matiz/brilho.',
    whenToUse: [
      'A pessoa precisa DEFINIR uma cor como dado: cor de uma etiqueta, de um evento na agenda, de uma categoria, de um tema de perfil.',
      'Quando qualquer cor do espectro é válida e o valor guardado é a própria cor (hex/rgb/hsb).',
    ],
    whenNotToUse: [
      'Escolher entre poucas cores pré-definidas — use SelectButton ou uma lista de amostras (é escolha, não espectro livre).',
      'Trocar a marca/tema da aplicação — isso é o mecanismo de tema (theme-switch), não um campo.',
      'Qualquer dado que não seja cor (texto, número, data) — use o componente próprio.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'format',
        type: "'hex' | 'rgb' | 'hsb'",
        default: 'hex',
        description: 'Formato em que a cor escolhida é guardada no modelo. `hex` para salvar como "#RRGGBB"; `rgb`/`hsb` quando o back-end espera objeto. Escolher pelo que o sistema consome.',
      },
      {
        name: 'inline',
        type: 'boolean',
        default: 'false',
        description: 'Se true, o painel de seleção fica sempre aberto na página em vez de abrir num overlay ao clicar na amostra. Use inline quando escolher a cor é a tarefa central da tela.',
      },
      {
        name: 'defaultColor',
        type: 'string',
        default: '(nenhuma)',
        description: 'Cor mostrada inicialmente quando ainda não há valor no modelo. É um valor de cor (dado), não um token de tema.',
      },
      {
        name: 'inputId',
        type: 'string',
        default: '(nenhum)',
        description: 'Id do controle interno focável, para casar com o `for` de um `<label>`. Obrigatório na prática para acessibilidade.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Desabilita o seletor (herdado do controle de formulário base). Se o motivo não é óbvio, explicar no contexto em vez de só desabilitar.',
      },
      {
        name: 'autofocus',
        type: 'boolean',
        default: 'false',
        description: 'Recebe foco automaticamente ao carregar. Usar com parcimônia — só quando o seletor é o primeiro passo esperado da tela.',
      },
      {
        name: 'tabindex',
        type: 'string',
        default: '(nenhum)',
        description: 'Ordem de tabulação do controle. Em geral deixar o fluxo natural; só ajustar quando houver motivo real.',
      },
    ],
    outputs: [
      { name: 'onChange', payload: 'ColorPickerChangeEvent { originalEvent: Event; value: any }', description: 'Emitido quando a pessoa escolhe/ajusta a cor. `value` vem no formato definido em `format`.' },
      { name: 'onShow', payload: 'any', description: 'O painel de seleção foi aberto.' },
      { name: 'onHide', payload: 'any', description: 'O painel de seleção foi fechado.' },
    ],
    slots: [],
    states: ['default', 'hover', 'focus', 'open', 'filled', 'disabled'],
    invalidCombinations: [
      {
        combo: 'ColorPicker sem `<label>` associado (via inputId)',
        porque: 'A amostra colorida sozinha não diz O QUE a cor representa; o leitor de tela não anuncia o campo.',
      },
      {
        combo: 'ColorPicker para escolher entre 3–5 cores fixas',
        porque: 'O espectro livre é excesso de liberdade quando só há poucas opções válidas — vira erro fácil; use amostras/SelectButton.',
      },
      {
        combo: 'usar ColorPicker para trocar a marca/tema da aplicação',
        porque: 'Cor de tema é papel `primary` do design system (theme-switch), não um dado que a pessoa digita num campo.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'floatlabel'],
    children: [],
    commonlyUsedWith: ['label', 'helper-text', 'inputtext'],
    partOfPatterns: ['form-field', 'form-submission'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      default: { border: 'surface/300', background: 'surface/0' },
      hover: { border: 'surface/400' },
      focus: { ring: 'focus/ring' },
      disabled: { border: 'surface/200' },
    },
    note: 'A amostra, o painel de matiz/brilho e o overlay herdam do PrimeNG (colorpicker.*). A COR selecionada é dado do usuário — não é token de tema e por isso não segue papel+passo. Já as cordas de moldura do campo (borda/anel/fundo) seguem papel+passo, nunca hex.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar o seletor de cor sem um `<label>` associado.',
      porque: 'A amostra colorida não identifica o campo; sem rótulo o leitor de tela não anuncia o que a cor significa.',
      emVezDisso: 'Um `<label for="id">` ligado ao controle (via `inputId`), dizendo o papel da cor ("Cor da etiqueta").',
    },
    {
      regra: 'Nunca usar ColorPicker quando só há poucas cores válidas.',
      porque: 'Oferecer todo o espectro para escolher entre 4 opções aumenta o erro e some com a semântica das opções.',
      emVezDisso: 'Amostras pré-definidas (SelectButton ou lista de swatches) quando o conjunto de cores é fechado.',
    },
    {
      regra: 'Nunca sinalizar a cor escolhida apenas pela própria amostra, sem texto.',
      porque: 'Quem não distingue cores não percebe qual foi escolhida; a amostra sozinha não é acessível.',
      emVezDisso: 'Mostrar o valor em texto ao lado (ex.: "#1E88E5") além da amostra.',
    },
  ],

  examples: {
    angular: `<label for="cor-etiqueta">Cor da etiqueta</label>
<p-colorpicker inputId="cor-etiqueta" [(ngModel)]="cor" format="hex" />`,
    html: `<label for="cor-etiqueta">Cor da etiqueta</label>
<input id="cor-etiqueta" name="cor" type="color" value="#000000" />`,
    inContext: `<!-- campo de cor com o valor legível ao lado da amostra -->
<div data-block="form-field">
  <label for="cor-evento">Cor do evento</label>
  <input id="cor-evento" name="corEvento" type="color" value="#000000"
         aria-describedby="cor-evento-valor" />
  <small id="cor-evento-valor">Selecionado: #000000</small>
</div>`,
  },

  a11y: {
    role: 'button (abre o seletor) + slider (matiz/brilho no painel)',
    keyboard: [
      'Enter/Espaço abre o painel a partir da amostra',
      'setas ajustam matiz/saturação no painel',
      'Esc fecha o painel',
    ],
    requiredAria: [
      'sempre um `<label for>` associado ao controle (via inputId)',
      'aria-label descrevendo o papel da cor quando não houver rótulo visível',
      'o valor da cor também exposto em texto, não só pela amostra',
    ],
    contrastMin: '3:1 na borda da amostra e no foco; o texto do valor 4.5:1',
  },

  aiHints: {
    keywords: [
      'colorpicker', 'seletor de cor', 'escolher cor', 'cor', 'color', 'color picker',
      'paleta', 'hex', 'rgb', 'cor da etiqueta', 'cor do evento', 'matiz',
    ],
    selectionCriteria:
      'Escolha ColorPicker quando a pessoa precisa DEFINIR uma cor arbitrária como dado (etiqueta, evento, categoria). Se o conjunto de cores é fechado (poucas opções), use amostras/SelectButton. Trocar a marca/tema da app NÃO é ColorPicker — é theme-switch.',
    disambiguation: [
      { confundeCom: 'selectbutton', criterio: 'SelectButton escolhe entre poucas opções fixas; ColorPicker abre o espectro livre de cores.' },
      { confundeCom: 'theme-toggle', criterio: 'ThemeToggle/theme-switch troca a cor da MARCA (papel primary) da aplicação; ColorPicker guarda uma cor como dado do usuário.' },
      { confundeCom: 'inputtext', criterio: 'Se o requisito é digitar um código de cor à mão como texto, é InputText; para escolher visualmente no espectro, ColorPicker.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/colorpicker',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída semântica = `<input type="color">` com `<label for>`. O valor hex/rgb/hsb é DADO do usuário (cor escolhida), não um token de tema — por isso o hex aparece no exemplo. As cordas de moldura do campo seguem o tema.',
  },
};
