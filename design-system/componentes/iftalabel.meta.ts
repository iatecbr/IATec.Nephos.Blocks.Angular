/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · iftalabel.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-iftalabel`. API lida do código real
 * (primeng@21.0.2, `types/primeng-iftalabel.d.ts`).
 *
 * ⚠️ Fidelidade: IftaLabel ("in-field top-aligned label") é um
 * INVÓLUCRO que integra o rótulo DENTRO do campo, fixo no topo. Ao
 * contrário do FloatLabel, o rótulo NÃO se move — nasce e fica
 * pequeno no alto do campo. O código NÃO expõe nenhum @Input (só
 * content-projection `["*"]`). Continua sendo um `<label>` de verdade.
 * É o irmão "estático" de `floatlabel.meta.ts`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const iftaLabelMeta: NephosComponentMeta = {
  identity: {
    id: 'iftalabel',
    name: 'IftaLabel',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Invólucro que fixa o rótulo pequeno no topo, dentro do próprio campo, economizando espaço sem que o rótulo se mova.',
    whenToUse: [
      'Formulários compactos onde se quer o rótulo sempre visível dentro do campo, sem animação de subida.',
      'Quando o rótulo estático dentro do campo lê mais previsível que o FloatLabel que se move.',
    ],
    whenNotToUse: [
      'Formulários longos e densos onde varrer rótulos acima dos campos é mais rápido — use rótulo fixo acima.',
      'Quando se prefere o efeito do rótulo subindo ao focar/preencher — use FloatLabel.',
      'Quando o campo terá também placeholder — o rótulo já ocupa o topo interno e os dois se sobrepõem.',
    ],
  },

  api: {
    inputs: [
      // O IftaLabel não expõe NENHUM @Input no código real: é puro
      // content-projection (`["*"]`). Não há variant nem configuração —
      // o rótulo é sempre fixo no topo dentro do campo.
    ],
    outputs: [],
    slots: [
      { name: 'default', accepts: 'o campo (InputText, Select, DatePicker, Textarea, etc.) + o seu `<label>`' },
    ],
    states: ['default (rótulo fixo no topo interno)'],
    invalidCombinations: [
      {
        combo: 'IftaLabel + placeholder no campo',
        porque: 'O rótulo já mora no topo de dentro do campo; o placeholder disputa o mesmo espaço e confunde.',
      },
      {
        combo: 'IftaLabel sem o `<label>` interno',
        porque: 'O IftaLabel É o rótulo posicionado — sem `<label for>`, o campo fica sem rótulo e inacessível.',
      },
    ],
  },

  relationships: {
    parents: ['form-field'],
    children: ['inputtext', 'select', 'datepicker', 'textarea'],
    commonlyUsedWith: ['inputtext', 'select'],
    partOfPatterns: ['form-submission', 'form-field'],
  },

  tokens: {
    typography: 'caption (o rótulo fica pequeno no topo do campo)',
    byState: {
      default: { text: 'surface/text-muted' },
    },
    note: 'O tamanho reduzido e a posição do rótulo vêm do PrimeNG; a cor do texto segue o texto de superfície atenuado (surface/text-muted). Raio/altura do campo herdam do componente. Sem hex, sem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca remover o `<label>` de dentro por achar que o IftaLabel o substitui.',
      porque: 'O IftaLabel só posiciona o rótulo; sem `<label for>` o campo fica sem rótulo acessível.',
      emVezDisso: 'Manter o `<label for="id">` ligado ao campo dentro do invólucro.',
    },
    {
      regra: 'Nunca combinar IftaLabel com placeholder no mesmo campo.',
      porque: 'O rótulo fixo já ocupa o topo interno; com placeholder os dois se sobrepõem.',
      emVezDisso: 'Só o IftaLabel; se precisar de exemplo, colocar na ajuda (small) embaixo do campo.',
    },
    {
      regra: 'Nunca misturar IftaLabel e FloatLabel no mesmo formulário.',
      porque: 'Um rótulo estático ao lado de outros que se movem quebra o ritmo e parece erro.',
      emVezDisso: 'Escolher um padrão de rótulo (IftaLabel OU FloatLabel OU rótulo acima) e repetir em todos os campos.',
    },
  ],

  examples: {
    angular: `<p-iftalabel>
  <input pInputText id="nome" [(ngModel)]="nome" />
  <label for="nome">Nome</label>
</p-iftalabel>`,
    html: `<!-- rótulo fixo no topo interno é posição visual; no HTML final é label + input -->
<div data-block="ifta-label">
  <input id="nome" type="text" name="nome" />
  <label for="nome">Nome</label>
</div>`,
    inContext: `<form data-block="form">
  <div data-block="ifta-label">
    <input id="nome" type="text" name="nome" />
    <label for="nome">Nome completo</label>
  </div>
  <div data-block="ifta-label">
    <input id="matricula" type="text" name="matricula" inputmode="numeric" />
    <label for="matricula">Matrícula</label>
  </div>
</form>`,
  },

  a11y: {
    role: 'group',
    keyboard: ['sem teclas próprias — segue o campo que envolve'],
    requiredAria: ['o `<label for>` interno permanece obrigatório e associado ao campo'],
    contrastMin: '4.5:1 do rótulo pequeno sobre o fundo do campo (texto reduzido)',
  },

  aiHints: {
    keywords: [
      'ifta label', 'iftalabel', 'rótulo no topo do campo', 'rotulo no topo do campo',
      'rótulo dentro do campo', 'rotulo dentro do campo', 'rótulo fixo interno',
      'in-field label', 'campo compacto', 'formulário enxuto', 'formulario enxuto',
    ],
    selectionCriteria:
      'Use IftaLabel quando quer o rótulo pequeno e FIXO dentro do topo do campo, sem animação. Se prefere o rótulo que SOBE ao focar/preencher, é FloatLabel. Se o formulário é longo e a leitura rápida importa, prefira rótulo fixo acima do campo.',
    disambiguation: [
      { confundeCom: 'floatlabel', criterio: 'IftaLabel deixa o rótulo fixo pequeno no topo interno; FloatLabel faz o rótulo se MOVER ao focar/preencher.' },
      { confundeCom: 'label fixo acima', criterio: 'Rótulo fixo acima lê mais rápido em formulários longos; IftaLabel economiza espaço mantendo o rótulo dentro do campo.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/iftalabel',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). O código não expõe @Input (puro content-projection). Saída é HTML semântico (label + campo).',
  },
};
