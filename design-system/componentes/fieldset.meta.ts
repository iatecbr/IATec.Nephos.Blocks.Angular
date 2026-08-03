/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · fieldset.meta.ts — ONDA "PAINÉIS/ESTRUTURA"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-fieldset`. API lida do código real
 * (primeng@21.0.2, `types/primeng-fieldset.d.ts`).
 *
 * Agrupa CAMPOS de formulário sob uma legenda, opcionalmente
 * recolhível (`toggleable`). Saída = `<fieldset>` + `<legend>`
 * semânticos — a relação de grupo é anunciada pelo leitor de tela.
 * NÃO é um contêiner de conteúdo geral (isso é Panel/Card).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const fieldsetMeta: NephosComponentMeta = {
  identity: {
    id: 'fieldset',
    name: 'Fieldset',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Agrupa campos relacionados de um formulário sob uma legenda semântica.',
    whenToUse: [
      'Separar um formulário longo em grupos temáticos (Dados pessoais, Endereço, Contato).',
      'Reunir um conjunto de opções que compartilham uma pergunta — ex.: um grupo de radio buttons sob uma legenda.',
      'Quando o grupo pode recolher/expandir para encurtar o formulário (toggleable).',
    ],
    whenNotToUse: [
      'Agrupar conteúdo que não são campos de formulário — use Panel.',
      'Um item de resumo em lista/grade — use Card.',
      'Várias seções empilhadas que alternam — use Accordion.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'legend',
        type: 'string',
        default: '—',
        description: 'Texto da legenda que nomeia o grupo de campos. Vira `<legend>` de verdade — é o rótulo acessível do fieldset. Use o slot `header` para conteúdo rico.',
      },
      {
        name: 'toggleable',
        type: 'boolean',
        default: 'false',
        description: 'Permite recolher/expandir o grupo clicando na legenda. Quando true, a legenda ganha um botão com aria-expanded.',
      },
      {
        name: 'collapsed',
        type: 'boolean',
        default: 'false',
        description: 'Estado inicial do grupo (recolhido ou expandido). Suporta two-way binding. Só faz sentido com toggleable=true.',
      },
    ],
    outputs: [
      { name: 'collapsedChange', payload: 'boolean', description: 'Emitido quando o estado recolhido muda (two-way binding de `collapsed`).' },
      { name: 'onBeforeToggle', payload: 'FieldsetBeforeToggleEvent { originalEvent, collapsed }', description: 'Antes de recolher/expandir o grupo.' },
      { name: 'onAfterToggle', payload: 'FieldsetAfterToggleEvent { originalEvent, collapsed }', description: 'Depois que a transição de recolher/expandir termina.' },
    ],
    slots: [
      { name: 'header', accepts: 'ng-template pTemplate="header" (ou <p-header>) — legenda com conteúdo rico quando o input `legend` de texto não basta', optional: true },
      { name: 'default', accepts: 'os campos de formulário do grupo (ng-content padrão)' },
    ],
    states: ['default', 'expanded', 'collapsed', 'focus'],
    invalidCombinations: [
      {
        combo: 'fieldset sem legenda (legend vazio)',
        porque: 'O `<legend>` é o nome acessível do grupo; sem ele o leitor de tela não anuncia o que reúne os campos.',
      },
      {
        combo: 'usar fieldset para agrupar conteúdo que não são campos de formulário',
        porque: 'A semântica `<fieldset>`/`<legend>` diz ao leitor de tela "este é um grupo de controles de formulário"; usá-la para texto/mídia engana a navegação.',
      },
      {
        combo: 'collapsed=true com toggleable=false',
        porque: 'Sem toggleable não há botão para reabrir; os campos ficam escondidos sem como voltar.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'page', 'card', 'panel'],
    children: ['form-field', 'inputtext', 'select', 'checkbox', 'radiobutton', 'textarea', 'label'],
    commonlyUsedWith: ['form-field', 'inputtext', 'button', 'radiobutton'],
    partOfPatterns: ['form-submission', 'form-field', 'settings'],
  },

  tokens: {
    typography: 'title-sm (legenda) · body-lg (campos)',
    byState: {
      default: { legend: 'surface/text', border: 'surface/200', background: 'surface/0' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Borda, raio, padding e a transição de recolher herdam do PrimeNG (fieldset.*). Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar Fieldset sem uma legenda que nomeie o grupo.',
      porque: 'A legenda é o rótulo acessível do conjunto; sem ela o agrupamento não é anunciado.',
      emVezDisso: 'Sempre uma `<legend>` curta e descritiva (ex.: "Endereço").',
    },
    {
      regra: 'Nunca usar Fieldset para agrupar conteúdo que não são campos de formulário.',
      porque: 'A semântica `<fieldset>` promete ao leitor de tela um grupo de controles; usá-la para texto/mídia mente sobre a estrutura.',
      emVezDisso: 'Panel para conteúdo geral com cabeçalho; Card para um bloco de resumo.',
    },
    {
      regra: 'Nunca aninhar fieldsets em muitos níveis para "organizar" o formulário.',
      porque: 'Grupos dentro de grupos confundem a navegação por teclado e a leitura das legendas encadeadas.',
      emVezDisso: 'Um nível de agrupamento por tema; se precisa de mais, repensar a divisão do formulário.',
    },
  ],

  examples: {
    angular: `<p-fieldset legend="Endereço" [toggleable]="true">
  <!-- campos: rua, número, cidade... -->
</p-fieldset>`,
    html: `<fieldset>
  <legend>Endereço</legend>
  <div data-block="form-field">
    <label for="rua">Rua</label>
    <input id="rua" name="rua" type="text" />
  </div>
  <div data-block="form-field">
    <label for="cidade">Cidade</label>
    <input id="cidade" name="cidade" type="text" />
  </div>
</fieldset>`,
    inContext: `<!-- grupo de opções sob uma pergunta única -->
<fieldset>
  <legend>Forma de pagamento</legend>
  <label><input type="radio" name="pgto" value="boleto" /> Boleto</label>
  <label><input type="radio" name="pgto" value="cartao" /> Cartão</label>
  <label><input type="radio" name="pgto" value="pix" /> Pix</label>
</fieldset>`,
  },

  a11y: {
    role: 'group (fieldset) nomeado pela legend',
    keyboard: [
      'Tab percorre os campos internos na ordem do DOM',
      'quando toggleable: Enter/Espaço na legenda recolhe/expande',
    ],
    requiredAria: [
      'sempre `<fieldset>` com um `<legend>` como primeiro filho',
      'quando toggleable: legenda com `<button aria-expanded>` e aria-controls para a região dos campos',
    ],
    contrastMin: '4.5:1 da legenda e dos rótulos dos campos; 3:1 do foco e das bordas',
  },

  aiHints: {
    keywords: [
      'fieldset', 'grupo de campos', 'agrupar campos', 'legenda', 'legend',
      'seção do formulário', 'secao do formulario', 'dados pessoais', 'endereço',
      'endereco', 'grupo de opções', 'grupo de opcoes',
    ],
    selectionCriteria:
      'Escolha Fieldset para agrupar CAMPOS de formulário relacionados sob uma legenda semântica (`<fieldset>`/`<legend>`). Conteúdo geral com cabeçalho = Panel; item de resumo = Card; seções empilhadas alternáveis = Accordion.',
    disambiguation: [
      { confundeCom: 'panel', criterio: 'Panel agrupa conteúdo GERAL sob um cabeçalho; Fieldset agrupa CAMPOS de formulário com semântica `<fieldset>`.' },
      { confundeCom: 'card', criterio: 'Card é um bloco de resumo de um item; Fieldset é um agrupamento de controles dentro de um formulário.' },
      { confundeCom: 'form-field', criterio: 'Form-field é UM campo (rótulo + controle + ajuda); Fieldset reúne VÁRIOS campos sob uma legenda.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/fieldset',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída = `<fieldset>` + `<legend>` semânticos; quando toggleable, a legenda vira botão com aria-expanded. Ícone do toggle é sobrescrito para Font Awesome; só o tema traz a cor da marca.',
  },
};
