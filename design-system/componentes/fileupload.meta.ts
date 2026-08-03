/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · fileupload.meta.ts — ONDA 3 (entrada avançada)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-fileupload`. API lida do código real
 * (primeng@21.0.2, `types/primeng-fileupload.d.ts`).
 *
 * Envio de arquivo(s). Modo `basic` = um botão simples; modo `advanced`
 * = área com arrastar-e-soltar, lista de selecionados e progresso.
 * Saída semântica = `<input type="file">` com rótulo. Comunicar SEMPRE
 * os tipos aceitos e o tamanho máximo ANTES do erro.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const fileUploadMeta: NephosComponentMeta = {
  identity: {
    id: 'fileupload',
    name: 'FileUpload',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Selecionar e enviar um ou mais arquivos.',
    whenToUse: [
      'Anexar documentos/imagens (comprovante, planilha, foto).',
      'Envio múltiplo com progresso e validação de tipo/tamanho (modo advanced).',
    ],
    whenNotToUse: [
      'Colar texto — use Textarea.',
      'Escolher de uma lista já no sistema — use Select/AutoComplete.',
      'Um único arquivo com UI mínima — modo basic (não a área avançada).',
    ],
  },

  api: {
    inputs: [
      {
        name: 'mode',
        type: "'basic' | 'advanced'",
        default: 'advanced',
        description: '`basic` = só um botão "Escolher". `advanced` = área com arrastar-soltar, lista de arquivos, botões enviar/cancelar e progresso.',
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description: 'Permite selecionar mais de um arquivo.',
      },
      {
        name: 'accept',
        type: 'string',
        default: '—',
        description: 'Tipos aceitos (ex.: "image/*,.pdf"). Filtra no seletor — mas NÃO substitui a validação no servidor. Informar os tipos no texto também.',
      },
      {
        name: 'maxFileSize',
        type: 'number (bytes)',
        default: '—',
        description: 'Tamanho máximo por arquivo. Informar o limite em texto ANTES do envio (não só no erro).',
      },
      {
        name: 'fileLimit',
        type: 'number',
        default: '—',
        description: 'Quantidade máxima de arquivos.',
      },
      {
        name: 'auto',
        type: 'boolean',
        default: 'false',
        description: 'Envia assim que seleciona (sem passo "Enviar"). Usar com cuidado: remove a chance de revisar antes.',
      },
      {
        name: 'customUpload',
        type: 'boolean',
        default: 'false',
        description: 'O envio é tratado por código (evento `uploadHandler`) em vez do POST padrão. Comum quando há API própria.',
      },
      {
        name: 'chooseLabel',
        type: 'string',
        default: "'Choose'",
        description: 'Texto do botão de escolher (traduzir: "Escolher arquivo"). Os ícones dos botões seguem `icon.meta.ts`.',
      },
    ],
    outputs: [
      { name: 'onSelect', payload: '{ originalEvent, files }', description: 'Emitido ao selecionar arquivos.' },
      { name: 'onUpload', payload: '{ originalEvent, files }', description: 'Emitido ao concluir o envio com sucesso.' },
      { name: 'onError', payload: '{ originalEvent, files }', description: 'Emitido quando o envio falha — mostrar erro em texto.' },
      { name: 'onProgress', payload: '{ originalEvent, progress }', description: 'Progresso do envio (alimenta uma ProgressBar).' },
      { name: 'onRemove', payload: '{ originalEvent, file }', description: 'Emitido ao remover um arquivo da lista antes de enviar.' },
      { name: 'onClear', payload: 'void', description: 'Emitido ao limpar a seleção.' },
    ],
    slots: [
      { name: 'header', accepts: 'cabeçalho da área avançada', optional: true },
      { name: 'content', accepts: 'corpo/lista de arquivos', optional: true },
      { name: 'file', accepts: 'template de cada arquivo selecionado', optional: true },
    ],
    states: ['idle', 'selecting', 'uploading', 'done', 'error', 'disabled'],
    invalidCombinations: [
      {
        combo: 'campo de upload sem `<label>` associado',
        porque: 'O `<input type="file">` sem rótulo não é anunciado; a pessoa não sabe o que anexar.',
      },
      {
        combo: 'limites (tipo/tamanho) revelados só no erro',
        porque: 'A pessoa tenta, falha e só então descobre a regra — frustração evitável.',
      },
      {
        combo: 'arrastar-e-soltar como única forma de enviar',
        porque: 'Exclui teclado e toque; nem todos conseguem arrastar.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'dialog', 'card'],
    children: ['button', 'progressbar', 'message', 'icon'],
    commonlyUsedWith: ['button', 'progressbar', 'message'],
    partOfPatterns: ['form-submission', 'upload'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      idle: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      dragover: { border: 'primary/color', background: 'primary/50' },
      error: { border: 'feedback.danger/500', text: 'feedback.danger/500' },
    },
    note: 'Área de soltar em destaque = ênfase da marca (primary) no arraste; botões herdam do Button; progresso usa a ProgressBar. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar o upload sem rótulo associado.',
      porque: 'O `<input type="file">` sem `<label>` não é anunciado e a pessoa não sabe o que anexar.',
      emVezDisso: '`<label for>` (ou botão com nome claro) descrevendo o que enviar.',
    },
    {
      regra: 'Nunca revelar as regras (tipo/tamanho) só no erro.',
      porque: 'A pessoa descobre o limite só depois de falhar.',
      emVezDisso: 'Texto de ajuda com tipos aceitos e tamanho máximo ANTES da escolha.',
    },
    {
      regra: 'Nunca oferecer só arrastar-e-soltar.',
      porque: 'Exclui teclado e toque.',
      emVezDisso: 'Botão "Escolher arquivo" acessível além da área de arrastar; erros em texto (não só cor).',
    },
  ],

  examples: {
    angular: `<label id="anexo-lbl">Comprovante (PDF, até 5 MB)</label>
<p-fileupload mode="advanced" accept=".pdf" [maxFileSize]="5000000"
  chooseLabel="Escolher arquivo" [customUpload]="true"
  (uploadHandler)="enviar($event)" (onError)="tratarErro($event)"
  ariaLabelledby="anexo-lbl" />`,
    html: `<label for="anexo">Comprovante (PDF, até 5 MB)</label>
<input id="anexo" name="anexo" type="file" accept=".pdf"
       aria-describedby="anexo-ajuda" />
<small id="anexo-ajuda">Aceita PDF de até 5 MB.</small>`,
    inContext: `<!-- upload com progresso e erro em texto -->
<div data-block="upload">
  <label for="planilha">Planilha de matrículas (.xlsx, até 10 MB)</label>
  <input id="planilha" name="planilha" type="file" accept=".xlsx"
         aria-describedby="planilha-ajuda planilha-erro" />
  <small id="planilha-ajuda">Formato .xlsx, máximo 10 MB.</small>
  <div role="progressbar" aria-valuenow="42" aria-valuemin="0" aria-valuemax="100">
    <div class="bar" style="width:42%"></div><span>42%</span>
  </div>
  <small id="planilha-erro" data-variant="danger" aria-live="polite" hidden>
    O arquivo excede 10 MB.
  </small>
</div>`,
  },

  a11y: {
    role: 'button/input de arquivo + região com feedback',
    keyboard: ['Tab foca o botão "Escolher"', 'Enter/Espaço abre o seletor do sistema', 'a lista de arquivos é navegável e removível por teclado'],
    requiredAria: [
      '`<label for>` associado ao input de arquivo',
      'tipos/tamanho aceitos em texto (aria-describedby)',
      'progresso com role="progressbar" e aria-value*; erro em texto com aria-live',
    ],
    contrastMin: '4.5:1 dos textos e rótulos; 3:1 do realce da área de arraste',
  },

  aiHints: {
    keywords: [
      'upload', 'enviar arquivo', 'anexar', 'anexo', 'file', 'arquivo', 'arrastar e soltar',
      'drag and drop', 'importar', 'comprovante', 'planilha', 'documento',
    ],
    selectionCriteria:
      'Escolha FileUpload para anexar/enviar arquivos. Modo basic p/ um botão simples; advanced p/ múltiplos + progresso. Sempre com rótulo e regras (tipo/tamanho) visíveis antes do envio.',
    disambiguation: [
      { confundeCom: 'textarea', criterio: 'Textarea coleta texto; FileUpload envia arquivos.' },
      { confundeCom: 'image', criterio: 'Image exibe uma figura; FileUpload é a entrada que recebe o arquivo.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/fileupload',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída = `<input type="file">` com rótulo; ícones dos botões seguem `icon.meta.ts`; progresso usa a ficha `progressbar`.',
  },
};
