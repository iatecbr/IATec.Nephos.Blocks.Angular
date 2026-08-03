/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · select.meta.ts — controle de formulário (lista suspensa)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → usado direto do PrimeNG (p-select, ex-Dropdown).
 * Saída do Moses = HTML semântico: `<label for>` + `<select>` (ou o
 * padrão de combobox acessível quando houver busca).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const selectMeta: NephosComponentMeta = {
  identity: {
    id: 'select',
    name: 'Select',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: 'dropdown', // nome antigo no PrimeNG
  },

  purpose: {
    oneLiner: 'Escolher UMA opção de uma lista fechada que se abre ao clicar.',
    whenToUse: [
      'Escolher um item entre muitos (país, categoria, responsável) economizando espaço.',
      'Quando a lista é conhecida e fechada, e mostrar tudo de uma vez ocuparia espaço demais.',
      'Filtrar uma listagem por um único valor (filtro de seleção única) num campo compacto.',
    ],
    whenNotToUse: [
      'Poucas opções (2 a 4) que cabem à vista — use RadioButton, mais rápido de escolher.',
      'Escolher VÁRIAS opções — use MultiSelect.',
      'Liga/desliga — use ToggleSwitch.',
    ],
  },

  api: {
    inputs: [
      { name: 'options', type: 'any[]', default: '[]', description: 'A lista de opções.' },
      { name: 'optionLabel', type: 'string', default: '—', description: 'Campo de cada opção que vira o texto visível.' },
      { name: 'optionValue', type: 'string', default: '—', description: 'Campo de cada opção que vira o valor guardado.' },
      { name: 'placeholder', type: 'string', default: '—', description: 'Texto quando nada foi escolhido ("Selecione…"). Não substitui o rótulo.' },
      { name: 'filter', type: 'boolean', default: 'false', description: 'Mostra um campo de busca dentro da lista. Ligar quando há muitas opções.' },
      { name: 'showClear', type: 'boolean', default: 'false', description: 'Mostra um "x" para limpar a escolha. Só quando "nenhum" é um estado válido.' },
      { name: 'size', type: "'small' | 'large'", default: '(normal)', description: 'Densidade. `small` em filtros densos.' },
      { name: 'invalid', type: 'boolean', default: 'false', description: 'Marca como inválido (borda de erro). Anda junto com a mensagem e o aria-invalid.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita. Se o motivo não é óbvio, explicar no contexto.' },
      { name: 'fluid', type: 'boolean', default: 'false', description: 'Ocupa 100% da largura do contêiner.' },
    ],
    outputs: [
      { name: 'onChange', payload: '{ value }', description: 'Emitido quando a opção escolhida muda.' },
    ],
    slots: [
      { name: 'item', accepts: 'template de uma opção (ícone + texto), opcional', optional: true },
    ],
    states: ['default', 'hover', 'focus', 'open', 'filled', 'invalid', 'disabled'],
    invalidCombinations: [
      { combo: 'filter=false com dezenas de opções', porque: 'Sem busca, achar a opção certa numa lista longa vira rolagem cansativa.' },
      { combo: 'placeholder como único rótulo (sem <label>)', porque: 'O placeholder some ao escolher e não é lido de forma confiável.' },
    ],
  },

  relationships: {
    parents: ['form-field', 'toolbar', 'floatlabel'],
    children: [],
    commonlyUsedWith: ['inputtext', 'button', 'message'],
    partOfPatterns: ['form-submission', 'filtering'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      default: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      hover: { border: 'surface/400' },
      focus: { ring: 'focus/ring' },
      invalid: { border: 'feedback.danger/500' },
    },
    note: 'Alturas, padding e a lista suspensa herdam do PrimeNG. Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar Select sem `<label>` associado.',
      porque: 'O leitor de tela não anuncia o campo e a pessoa perde a referência.',
      emVezDisso: 'Um `<label for>` ligado ao controle (visível ou com FloatLabel).',
    },
    {
      regra: 'Nunca usar Select para 2 a 4 opções.',
      porque: 'Obriga um clique extra para ver alternativas que caberiam à vista.',
      emVezDisso: 'RadioButton (uma escolha) — as opções ficam visíveis e a decisão é mais rápida.',
    },
    {
      regra: 'Nunca esconder a opção escolhida atrás de um placeholder ambíguo.',
      porque: 'A pessoa não confirma o que selecionou.',
      emVezDisso: 'Mostrar sempre o rótulo da opção escolhida no campo.',
    },
  ],

  examples: {
    angular: `<p-select [options]="paises" optionLabel="nome" optionValue="id"
          [(ngModel)]="pais" inputId="pais" placeholder="Selecione" [filter]="true" />`,
    html: `<label for="pais">País</label>
<select id="pais" name="pais">
  <option value="" disabled selected>Selecione</option>
  <option value="br">Brasil</option>
</select>`,
    inContext: `<div data-block="form-field">
  <label for="pais">País <span aria-hidden="true">*</span></label>
  <select id="pais" name="pais" aria-required="true">
    <option value="" disabled selected>Selecione</option>
    <option value="br">Brasil</option>
  </select>
</div>`,
  },

  a11y: {
    role: 'combobox',
    keyboard: ['Enter/Space abre', 'setas navegam', 'Esc fecha', 'digitar salta para a opção'],
    requiredAria: ['sempre um <label for>', 'aria-expanded no controle', 'aria-required quando obrigatório'],
    contrastMin: '4.5:1 do texto e do rótulo; foco visível',
  },

  aiHints: {
    keywords: [
      'select', 'lista suspensa', 'dropdown', 'combo', 'seleção', 'selecao', 'escolher', 'opção', 'opcao',
      'filtro', 'filtrar', 'filtro de seleção única', 'seleção única', 'selecao unica',
      'valor único', 'valor unico', 'escolher um', 'menu de opções', 'menu de opcoes',
    ],
    selectionCriteria:
      'Escolha o Select quando a pessoa precisa escolher UMA opção de uma lista fechada e conhecida, e o espaço importa. Poucas opções → RadioButton. Várias escolhas → MultiSelect. Digitação livre com sugestões → AutoComplete.',
    disambiguation: [
      { confundeCom: 'multiselect', criterio: 'MultiSelect deixa marcar VÁRIAS; Select é UMA só.' },
      { confundeCom: 'radiobutton', criterio: 'RadioButton mostra as opções à vista (bom p/ poucas); Select as esconde (bom p/ muitas).' },
      { confundeCom: 'autocomplete', criterio: 'AutoComplete é para digitar e filtrar em listas grandes/abertas; Select é lista fechada.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/select',
    figmaNode: 'https://www.figma.com/design/mHUXdyDZ820suwIRIIlp9Z/PrimeOne-4.0.0', // grupo "select"
    storybookId: 'molecules-select',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Só a cor da marca entra pelo tema.',
  },
};
