/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · popover.meta.ts — ONDA "SOBREPOSIÇÕES"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-popover`. API lida do código real
 * (primeng@21.0.2, `types/primeng-popover.d.ts`).
 *
 * Sobreposição ANCORADA num gatilho, com conteúdo RICO/INTERATIVO
 * (mini-formulário, ações extras, detalhes) — diferente do Tooltip (só
 * texto curto, no hover). Abre por clique (`popover.toggle($event, alvo)`).
 * Saída = sobreposição rotulada, Esc fecha, foco gerenciado.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const popoverMeta: NephosComponentMeta = {
  identity: {
    id: 'popover',
    name: 'Popover',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Sobreposição ancorada num botão, com conteúdo rico ou interativo sob demanda.',
    whenToUse: [
      'Mostrar detalhes, opções ou um mini-formulário ligado a um gatilho (ex.: editar rápido, escolher colunas).',
      'Conteúdo que é mais que uma dica de texto, mas não merece um modal central.',
    ],
    whenNotToUse: [
      'Só um texto curto de ajuda no hover — use Tooltip.',
      'Uma lista de ações/links — use Menu.',
      'Fluxo importante que exige foco total da tela — use Dialog.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'dismissable',
        type: 'boolean',
        default: 'true',
        description: 'Clicar fora fecha. Manter ligado para saída fácil.',
      },
      {
        name: 'focusOnShow',
        type: 'boolean',
        default: 'true',
        description: 'Move o foco para dentro ao abrir (importante quando há campos/controles).',
      },
      {
        name: 'ariaLabel / ariaLabelledBy',
        type: 'string',
        default: '—',
        description: 'Nome acessível da sobreposição (o que ela contém).',
      },
      {
        name: 'ariaCloseLabel',
        type: 'string',
        default: "'close'",
        description: 'Rótulo acessível da ação de fechar.',
      },
    ],
    outputs: [
      { name: 'onShow', payload: 'void', description: 'Abriu.' },
      { name: 'onHide', payload: 'void', description: 'Fechou.' },
    ],
    slots: [
      { name: 'content', accepts: 'o conteúdo (rico/interativo) da sobreposição' },
    ],
    states: ['closed', 'open'],
    invalidCombinations: [
      {
        combo: 'informação essencial só dentro do popover',
        porque: 'É efêmero e ancorado; quem não abrir não recebe a informação.',
      },
      {
        combo: 'popover com conteúdo grande/complexo demais',
        porque: 'Uma sobreposição ancorada espremida atrapalha; isso pede um Dialog ou uma página.',
      },
      {
        combo: 'gatilho sem estado acessível (aria-expanded)',
        porque: 'O leitor de tela não sabe que o botão controla uma sobreposição nem se está aberta.',
      },
    ],
  },

  relationships: {
    parents: ['toolbar', 'datatable', 'card', 'page'],
    children: ['button', 'inputtext', 'checkbox', 'icon'],
    commonlyUsedWith: ['button', 'icon-button'],
    partOfPatterns: ['quick-edit', 'column-chooser', 'detail-disclosure'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      open: { background: 'surface/0', border: 'surface/200' },
    },
    note: 'Sobreposição herda overlay (sombra/raio/seta) do PrimeNG. Ênfase (primary) só nas ações internas. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca colocar informação essencial só no popover.',
      porque: 'É efêmero e escondido atrás de um clique.',
      emVezDisso: 'Deixar o essencial visível; o popover para o detalhe/opções opcionais.',
    },
    {
      regra: 'Nunca enfiar conteúdo grande num popover.',
      porque: 'Espremido e ancorado, fica difícil de usar.',
      emVezDisso: 'Dialog (modal) ou uma página quando o conteúdo cresce.',
    },
    {
      regra: 'Nunca abrir sem estado acessível no gatilho.',
      porque: 'Sem aria-expanded/aria-haspopup, a sobreposição é invisível para a tecnologia assistiva.',
      emVezDisso: 'Gatilho com aria-haspopup="dialog"/"true" e aria-expanded; Esc fecha e devolve o foco.',
    },
  ],

  examples: {
    angular: `<button pButton (click)="op.toggle($event)" aria-haspopup="dialog" aria-expanded="false">
  Colunas
</button>
<p-popover #op ariaLabel="Escolher colunas">
  <!-- checkboxes das colunas visíveis -->
</p-popover>`,
    html: `<button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="pop-cols">
  Colunas
</button>
<div id="pop-cols" role="dialog" aria-label="Escolher colunas" hidden>
  <label><input type="checkbox" checked /> Escola</label>
  <label><input type="checkbox" checked /> Integrais</label>
  <label><input type="checkbox" /> Parciais</label>
</div>`,
    inContext: `<!-- edição rápida ancorada numa célula da tabela -->
<button type="button" aria-haspopup="dialog" aria-expanded="false"
        aria-label="Editar bolsas integrais do Colégio Adventista de Salvador">
  360 <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
</button>
<div role="dialog" aria-label="Editar bolsas integrais" hidden>
  <label for="qi">Integrais</label>
  <input id="qi" type="text" inputmode="numeric" value="360" />
  <button type="button" data-variant="primary">Salvar</button>
</div>`,
  },

  a11y: {
    role: 'dialog/group ancorado (sobreposição)',
    keyboard: ['abre por Enter/clique no gatilho', 'foco vai para dentro', 'Esc fecha e devolve o foco ao gatilho', 'Tab circula no conteúdo'],
    requiredAria: [
      'gatilho com aria-haspopup e aria-expanded',
      'sobreposição com nome (aria-label/labelledby)',
      'foco gerenciado (entra ao abrir, volta ao fechar)',
    ],
    contrastMin: '4.5:1 do texto; 3:1 do foco e das bordas',
  },

  aiHints: {
    keywords: [
      'popover', 'sobreposição', 'sobreposicao', 'balão ancorado', 'balao ancorado', 'edição rápida',
      'edicao rapida', 'escolher colunas', 'detalhes ancorados', 'mini formulário', 'mini formulario',
    ],
    selectionCriteria:
      'Escolha Popover para conteúdo RICO/INTERATIVO ancorado num gatilho (mini-form, opções, detalhes). Texto curto no hover = Tooltip; lista de ações = Menu; fluxo importante = Dialog.',
    disambiguation: [
      { confundeCom: 'tooltip', criterio: 'Tooltip é texto curto no hover (não interativo); Popover comporta conteúdo/controles e fica aberto.' },
      { confundeCom: 'menu', criterio: 'Menu é lista de ações/links; Popover é conteúdo livre (campos, texto, controles).' },
      { confundeCom: 'dialog', criterio: 'Dialog é modal central para foco total; Popover é ancorado e leve.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/popover',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Aberto por toggle a partir de um gatilho; saída = sobreposição rotulada com foco gerenciado. Dica de texto correlata em `tooltip.meta.ts`.',
  },
};
