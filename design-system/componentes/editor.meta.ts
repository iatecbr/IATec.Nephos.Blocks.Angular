/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · editor.meta.ts — ONDA "ENTRADAS ESPECIAIS"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-editor`. API lida do código real
 * (primeng@21.0.2, `types/primeng-editor.d.ts`). Motor: Quill.
 *
 * Editor de texto RICO: barra de formatação (negrito, itálico, listas,
 * links) + área editável que produz HTML. É bem mais pesado que um
 * Textarea — só quando a formatação faz parte do conteúdo. A11y:
 * a área editável é um "canvas" e EXIGE rótulo (aria-label/labelledby).
 * Saída semântica = grupo com toolbar (`<button>`) + região editável
 * (role="textbox" aria-multiline) rotulada.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const editorMeta: NephosComponentMeta = {
  identity: {
    id: 'editor',
    name: 'Editor',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Editor de texto rico (Quill) com barra de formatação que produz HTML.',
    whenToUse: [
      'O conteúdo precisa de formatação: negrito, itálico, listas, títulos, links — ex.: corpo de e-mail, descrição de artigo, comunicado.',
      'Quando a formatação é parte do dado que será salvo e reexibido como HTML.',
    ],
    whenNotToUse: [
      'Texto simples de várias linhas sem formatação — use Textarea (muito mais leve).',
      'Texto curto de uma linha — use InputText.',
      'Exibir HTML só para leitura — renderize o HTML direto, não carregue o editor.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'placeholder',
        type: 'string',
        default: '(nenhum)',
        description: 'Texto de exemplo mostrado na área editável quando ela está vazia. NÃO substitui o rótulo do campo.',
      },
      {
        name: 'formats',
        type: 'string[]',
        default: '(todos)',
        description: 'Lista branca de formatações permitidas (ex.: ["bold","italic","list","link"]). Restringir para manter o conteúdo simples e consistente. Ver formatos do Quill.',
      },
      {
        name: 'modules',
        type: 'object',
        default: '(padrão do Quill)',
        description: 'Configuração dos módulos do Quill, principalmente a barra de ferramentas (toolbar). Use para definir exatamente quais botões aparecem.',
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        description: 'Instancia o editor em modo somente leitura: mostra o conteúdo formatado sem barra de edição ativa.',
      },
      {
        name: 'bounds',
        type: 'HTMLElement | string',
        default: '(padrão)',
        description: 'Elemento (ou seletor CSS) que limita onde os overlays do editor (tooltips) aparecem. Ajuste raro, só quando o editor vive dentro de um contêiner com recorte.',
      },
      {
        name: 'scrollingContainer',
        type: 'HTMLElement | string',
        default: '(ql-editor)',
        description: 'Contêiner que tem a rolagem, quando ela foi movida do padrão por CSS. Evita saltos de rolagem com altura automática. Ajuste avançado.',
      },
      {
        name: 'debug',
        type: 'string',
        default: '(warn/error)',
        description: 'Nível de log do Quill (atalho estático — afeta todas as instâncias na página). Só para depuração.',
      },
    ],
    outputs: [
      { name: 'onTextChange', payload: 'EditorTextChangeEvent { htmlValue: string | null; textValue: string; delta; source }', description: 'Emitido quando o conteúdo muda; `htmlValue` é o HTML resultante (o que costuma ser salvo).' },
      { name: 'onSelectionChange', payload: 'EditorSelectionChangeEvent { range; oldRange; source }', description: 'Emitido quando a seleção/cursor muda dentro do editor.' },
      { name: 'onEditorChange', payload: "EditorChangeEvent { eventName: 'text-change' | 'selection-change'; ... }", description: 'Evento combinado de texto e seleção — útil quando se quer ouvir os dois num só lugar.' },
      { name: 'onInit', payload: 'EditorInitEvent { editor }', description: 'Emitido quando o Quill termina de carregar (alias do EventEmitter onEditorInit). Dá acesso à instância do editor.' },
      { name: 'onFocus', payload: 'EditorFocusEvent', description: 'A área editável recebeu foco.' },
      { name: 'onBlur', payload: 'EditorBlurEvent', description: 'A área editável perdeu o foco.' },
    ],
    slots: [
      { name: 'p-header (headerTemplate)', accepts: 'template da barra de ferramentas personalizada (define quais botões de formatação aparecem)', optional: true },
    ],
    states: ['default', 'focus', 'filled', 'invalid', 'readonly', 'disabled'],
    invalidCombinations: [
      {
        combo: 'Editor sem rótulo (aria-label/aria-labelledby) na área editável',
        porque: 'A área é um "canvas" editável, não um `<input>`; sem rótulo o leitor de tela não anuncia o campo.',
      },
      {
        combo: 'usar Editor onde bastaria Textarea',
        porque: 'Carrega o Quill (peso e complexidade) sem necessidade quando o conteúdo é texto simples sem formatação.',
      },
      {
        combo: 'renderizar o HTML salvo sem sanitização ao reexibir',
        porque: 'HTML rico vindo do usuário é vetor de XSS; precisa ser sanitizado antes de voltar à tela.',
      },
    ],
  },

  relationships: {
    parents: ['form-field'],
    children: ['button'],
    commonlyUsedWith: ['label', 'helper-text', 'button', 'message'],
    partOfPatterns: ['form-submission', 'content-authoring'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      default: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      focus: { border: 'primary/color', ring: 'focus/ring' },
      invalid: { border: 'feedback.danger/500' },
      readonly: { background: 'surface/50' },
    },
    note: 'Barra de ferramentas, altura, raio e espaçamentos herdam do PrimeNG (editor.*) e do Quill. Cor por papel + passo, nunca hex nem marca. Os ícones da toolbar são internos (sobrescritos para Font Awesome — decisão 27/07); só ícones de CONTEÚDO que o Moses emite seguem FA7.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar a área editável sem rótulo acessível.',
      porque: 'A área rica é um "canvas", não um `<input>`; sem aria-label/labelledby o leitor de tela não sabe anunciar o campo.',
      emVezDisso: 'aria-label (ou aria-labelledby apontando para um título visível) na região editável, além de um rótulo de texto próximo.',
    },
    {
      regra: 'Nunca usar Editor quando Textarea resolve.',
      porque: 'O editor rico carrega o Quill e adiciona peso e complexidade; para texto simples é exagero.',
      emVezDisso: 'Textarea para texto multilinha sem formatação; Editor só quando negrito/listas/links fazem parte do conteúdo.',
    },
    {
      regra: 'Nunca reexibir o HTML produzido sem sanitizar.',
      porque: 'Conteúdo rico do usuário pode conter script/HTML malicioso (XSS) ao voltar para a tela.',
      emVezDisso: 'Sanitizar o HTML antes de renderizar; restringir `formats` ao mínimo necessário.',
    },
  ],

  examples: {
    angular: `<label id="corpo-label">Corpo do comunicado</label>
<p-editor [(ngModel)]="conteudo" ariaLabelledBy="corpo-label"
  [style]="{ height: '320px' }" placeholder="Escreva o comunicado…">
  <ng-template #header>
    <span class="ql-formats">
      <button type="button" class="ql-bold" aria-label="Negrito"></button>
      <button type="button" class="ql-italic" aria-label="Itálico"></button>
      <button type="button" class="ql-list" value="bullet" aria-label="Lista"></button>
    </span>
  </ng-template>
</p-editor>`,
    html: `<label id="corpo-label">Corpo do comunicado</label>
<div data-block="rich-editor">
  <div role="toolbar" aria-label="Formatação">
    <button type="button" aria-label="Negrito"><i class="fa-solid fa-bold" aria-hidden="true"></i></button>
    <button type="button" aria-label="Itálico"><i class="fa-solid fa-italic" aria-hidden="true"></i></button>
    <button type="button" aria-label="Lista"><i class="fa-solid fa-list-ul" aria-hidden="true"></i></button>
    <button type="button" aria-label="Inserir link"><i class="fa-solid fa-link" aria-hidden="true"></i></button>
  </div>
  <div role="textbox" aria-multiline="true" aria-labelledby="corpo-label" contenteditable="true"></div>
</div>`,
    inContext: `<!-- descrição rica com ajuda e ação de publicar -->
<div data-block="form-field">
  <label id="desc-label">Descrição <span aria-hidden="true">*</span></label>
  <div data-block="rich-editor">
    <div role="toolbar" aria-label="Formatação">
      <button type="button" aria-label="Negrito"><i class="fa-solid fa-bold" aria-hidden="true"></i></button>
      <button type="button" aria-label="Lista"><i class="fa-solid fa-list-ul" aria-hidden="true"></i></button>
      <button type="button" aria-label="Inserir link"><i class="fa-solid fa-link" aria-hidden="true"></i></button>
    </div>
    <div role="textbox" aria-multiline="true" aria-labelledby="desc-label"
         aria-describedby="desc-ajuda" aria-required="true" contenteditable="true"></div>
  </div>
  <small id="desc-ajuda">Use listas e negrito para facilitar a leitura.</small>
  <button type="submit">Publicar</button>
</div>`,
  },

  a11y: {
    role: 'textbox (multiline, contenteditable) + toolbar de botões de formatação',
    keyboard: [
      'Tab entra na área e circula pela toolbar',
      'digitação e edição normais na área',
      'atalhos de formatação (Ctrl/Cmd+B negrito, Ctrl/Cmd+I itálico)',
    ],
    requiredAria: [
      'a área editável SEMPRE com rótulo (aria-label ou aria-labelledby) — é canvas, não input',
      'aria-multiline="true" na região editável',
      'cada botão da toolbar com aria-label próprio',
      'aria-invalid + aria-describedby apontando para o erro quando inválido',
    ],
    contrastMin: '4.5:1 do texto e dos ícones da toolbar; foco visível na área e nos botões',
  },

  aiHints: {
    keywords: [
      'editor', 'editor de texto', 'texto rico', 'rich text', 'wysiwyg', 'quill',
      'formatação', 'formatacao', 'negrito', 'itálico', 'italico', 'lista',
      'corpo de e-mail', 'descrição rica', 'descricao rica', 'conteúdo formatado',
    ],
    selectionCriteria:
      'Escolha Editor quando a formatação (negrito, listas, links, títulos) faz parte do conteúdo e será salva como HTML. Se é só texto simples multilinha, use Textarea. Se é para exibir HTML somente leitura, renderize o HTML direto.',
    disambiguation: [
      { confundeCom: 'textarea', criterio: 'Textarea é texto simples multilinha (leve); Editor é texto rico com toolbar e HTML (pesado). Na dúvida, comece por Textarea.' },
      { confundeCom: 'inputtext', criterio: 'InputText é uma linha de texto simples; Editor é conteúdo rico de várias linhas.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/editor',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Motor Quill; requer o pacote quill instalado. Saída semântica = toolbar de `<button>` + região `role="textbox" aria-multiline contenteditable` rotulada. Alternativa leve em `textarea.meta.ts`.',
  },
};
