/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · floatlabel.meta.ts — PILOTO #2 (parte 2 de 2)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → o "rótulo flutuante" usado direto do PrimeNG
 * (p-floatlabel). É um INVÓLUCRO: fica em volta de um campo (InputText,
 * Select…) e faz o rótulo subir quando o campo é preenchido/focado.
 * Continua sendo um `<label>` de verdade — a acessibilidade se mantém.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const floatLabelMeta: NephosComponentMeta = {
  identity: {
    id: 'floatlabel',
    name: 'FloatLabel',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Rótulo que começa dentro do campo e sobe quando ele é focado ou preenchido, economizando espaço vertical.',
    whenToUse: [
      'Formulários compactos onde o rótulo acima de cada campo ocuparia espaço demais.',
      'Quando se quer um visual mais enxuto mantendo o rótulo sempre presente.',
    ],
    whenNotToUse: [
      'Formulários longos e densos onde varrer os rótulos rapidamente importa — rótulo fixo acima lê mais rápido.',
      'Quando o campo já tem ajuda e erro embaixo e o topo precisa respirar.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'variant',
        type: "'over' | 'in' | 'on'",
        default: 'over',
        description: 'Onde o rótulo pousa ao subir: `over` acima do campo, `in` dentro no topo, `on` sobre a borda. Manter o mesmo variant no formulário inteiro.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'default', accepts: 'o campo (InputText, Select, etc.) + o seu <label>' },
    ],
    states: ['label-baixo (vazio)', 'label-flutuando (focado ou preenchido)'],
    invalidCombinations: [
      {
        combo: 'FloatLabel + placeholder no campo',
        porque: 'O rótulo já ocupa o lugar do placeholder; os dois juntos se sobrepõem e confundem.',
      },
    ],
  },

  relationships: {
    parents: ['form-field'],
    children: ['inputtext', 'select', 'datepicker', 'textarea'],
    commonlyUsedWith: ['inputtext'],
    partOfPatterns: ['form-submission', 'login'],
  },

  tokens: {
    typography: 'body-lg',
    note: 'O tamanho do rótulo flutuante e a transição vêm do PrimeNG. A cor do texto do rótulo segue o texto de superfície (surface/text). Sem hex, sem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar FloatLabel junto com placeholder no mesmo campo.',
      porque: 'Rótulo e placeholder disputam o mesmo espaço e se sobrepõem.',
      emVezDisso: 'Só o FloatLabel; se precisar de exemplo, colocar na ajuda (small) embaixo.',
    },
    {
      regra: 'Nunca misturar variants de FloatLabel diferentes no mesmo formulário.',
      porque: 'Rótulos pousando em lugares diferentes quebram o ritmo visual e parecem erro.',
      emVezDisso: 'Escolher um variant (over/in/on) e repetir em todos os campos.',
    },
    {
      regra: 'Nunca remover o `<label>` de dentro por achar que o rótulo flutuante o substitui.',
      porque: 'O FloatLabel É o label — sem ele, o campo fica sem rótulo e inacessível.',
      emVezDisso: 'Manter o `<label for>` ligado ao campo dentro do invólucro.',
    },
  ],

  examples: {
    angular: `<p-floatlabel variant="over">
  <input pInputText id="nome" [(ngModel)]="nome" />
  <label for="nome">Nome</label>
</p-floatlabel>`,
    html: `<!-- o rótulo flutuante é comportamento visual; no HTML final é label + input -->
<div data-block="float-label" data-variant="over">
  <input id="nome" type="text" name="nome" />
  <label for="nome">Nome</label>
</div>`,
    inContext: `<form data-block="form">
  <div data-block="float-label" data-variant="over">
    <input id="nome" type="text" name="nome" />
    <label for="nome">Nome</label>
  </div>
  <div data-block="float-label" data-variant="over">
    <input id="email" type="email" name="email" />
    <label for="email">E-mail</label>
  </div>
</form>`,
  },

  a11y: {
    role: 'group',
    keyboard: ['sem teclas próprias — segue o campo que envolve'],
    requiredAria: ['o <label for> interno permanece obrigatório e associado ao campo'],
    contrastMin: '4.5:1 do rótulo tanto em baixo quanto flutuando',
  },

  aiHints: {
    keywords: [
      'rótulo flutuante', 'rotulo flutuante', 'float label', 'floating label',
      'rótulo', 'label', 'campo compacto', 'formulário enxuto',
    ],
    selectionCriteria:
      'Use FloatLabel quando o requisito pede um formulário compacto/enxuto e ainda assim quer o rótulo sempre presente. Se a leitura rápida de muitos rótulos importa, prefira o rótulo fixo acima do campo.',
    disambiguation: [
      { confundeCom: 'iftalabel', criterio: 'IftaLabel deixa o rótulo fixo pequeno dentro do campo; FloatLabel faz o rótulo se MOVER ao focar/preencher.' },
      { confundeCom: 'label fixo acima', criterio: 'Rótulo fixo acima lê mais rápido em formulários longos; FloatLabel economiza espaço.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/floatlabel',
    figmaNode: 'https://www.figma.com/design/mHUXdyDZ820suwIRIIlp9Z/PrimeOne-4.0.0', // grupo "floatlabel"
    storybookId: 'molecules-floatlabel',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng).',
  },
};
