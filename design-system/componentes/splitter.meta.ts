/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · splitter.meta.ts — ONDA "PAINÉIS/ESTRUTURA"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-splitter` (com `p-splitter-panel` filhos).
 * API lida do código real (primeng@21.0.2, `types/primeng-splitter.d.ts`).
 *
 * Divide uma área em painéis lado a lado (ou empilhados) separados por
 * um "gutter" que a pessoa ARRASTA para redimensionar. É LAYOUT, não
 * conteúdo. Saída = contêiner com regiões e um separador arrastável
 * (`role="separator"` com aria-valuenow). NÃO é Divider (linha estática).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const splitterMeta: NephosComponentMeta = {
  identity: {
    id: 'splitter',
    name: 'Splitter',
    category: 'layout',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Divide uma área em painéis redimensionáveis por um separador arrastável.',
    whenToUse: [
      'Layouts em que a pessoa precisa reequilibrar o espaço entre duas áreas — ex.: lista à esquerda e detalhe à direita, editor e pré-visualização.',
      'Painéis lado a lado (horizontal) ou empilhados (vertical) cujo tamanho relativo deve ser ajustável.',
      'Quando faz sentido lembrar o tamanho escolhido entre sessões (stateStorage).',
    ],
    whenNotToUse: [
      'Só separar visualmente dois grupos com uma linha — use Divider.',
      'Grade responsiva de conteúdo — use um Grid/layout de colunas.',
      'Alternar entre vistas, uma por vez — use Tabs.',
      'Telas pequenas/mobile onde arrastar não é prático.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'layout',
        type: "'horizontal' | 'vertical'",
        default: 'horizontal',
        description: 'Direção da divisão: painéis lado a lado (horizontal) ou empilhados (vertical). O separador arrasta no eixo correspondente.',
      },
      {
        name: 'panelSizes',
        type: 'number[]',
        default: '[]',
        description: 'Tamanho inicial de cada painel, em porcentagem do total (ex.: [30, 70]). A soma deve fechar 100. Suporta two-way binding.',
      },
      {
        name: 'minSizes',
        type: 'number[]',
        default: '[]',
        description: 'Tamanho mínimo de cada painel, em porcentagem, para o arraste não colapsar um lado abaixo do usável.',
      },
      {
        name: 'gutterSize',
        type: 'number',
        default: '4',
        description: 'Espessura do separador arrastável em pixels. Alvo de clique/toque — não deixar fino demais para pegar.',
      },
      {
        name: 'step',
        type: 'number',
        default: '5',
        description: 'Quanto o tamanho muda (em %) a cada seta do teclado ao redimensionar pelo separador focado. Garante controle sem mouse.',
      },
      {
        name: 'stateStorage',
        type: "'session' | 'local'",
        default: '—',
        description: 'Onde persistir o tamanho escolhido: sessionStorage (`session`) ou localStorage (`local`). Só tem efeito com stateKey definido.',
      },
      {
        name: 'stateKey',
        type: 'string',
        default: '—',
        description: 'Identificador do estado salvo do splitter. Necessário para stateStorage funcionar. Único por instância.',
      },
    ],
    outputs: [
      { name: 'onResizeStart', payload: 'SplitterResizeStartEvent { originalEvent, sizes }', description: 'Emitido quando o arraste do separador começa.' },
      { name: 'onResizeEnd', payload: 'SplitterResizeEndEvent { originalEvent, sizes }', description: 'Emitido quando o arraste termina, com os tamanhos finais dos painéis.' },
    ],
    slots: [
      { name: 'panels', accepts: 'p-splitter-panel — cada área redimensionável (dois ou mais); pode aninhar outro p-splitter para grades complexas' },
    ],
    states: ['default', 'dragging', 'focus'],
    invalidCombinations: [
      {
        combo: 'panelSizes que não somam 100',
        porque: 'Os tamanhos são porcentagens do total; se não fecham 100, a distribuição inicial fica imprevisível.',
      },
      {
        combo: 'Splitter sem altura definida no contêiner',
        porque: 'Sem uma altura de referência os painéis colapsam e o separador não tem eixo para arrastar (especialmente no layout vertical).',
      },
      {
        combo: 'usar Splitter só para desenhar uma linha entre dois blocos',
        porque: 'Splitter é layout redimensionável; uma linha estática de separação é papel do Divider.',
      },
    ],
  },

  relationships: {
    parents: ['page', 'card', 'drawer'],
    children: ['datatable', 'dataview', 'card', 'scrollpanel', 'panel'],
    commonlyUsedWith: ['datatable', 'scrollpanel', 'dataview'],
    partOfPatterns: ['master-detail', 'editor-preview', 'workspace-layout'],
  },

  tokens: {
    byState: {
      default: { gutter: 'surface/100', border: 'surface/200' },
      dragging: { gutter: 'primary/color' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Espessura do gutter, raio e as bordas dos painéis herdam do PrimeNG (splitter.*). A ênfase da marca aparece só no separador ativo/foco. Cor por papel + passo, nunca hex nem px "no olho".',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar Splitter só para separar visualmente dois blocos.',
      porque: 'Ele carrega toda a máquina de arraste/redimensão para uma linha que não muda de tamanho.',
      emVezDisso: 'Divider para uma linha de separação; Splitter só quando o tamanho relativo deve ser ajustável.',
    },
    {
      regra: 'Nunca deixar o separador (gutter) fino demais ou sem alvo de foco.',
      porque: 'Fica difícil pegar com o mouse/toque e impossível redimensionar por teclado.',
      emVezDisso: 'Manter o gutterSize confortável e garantir o separador focável com setas (step).',
    },
    {
      regra: 'Nunca impor Splitter em telas pequenas onde arrastar não é prático.',
      porque: 'Arrastar painéis no mobile é frágil e os painéis ficam estreitos demais.',
      emVezDisso: 'Empilhar as áreas num layout responsivo simples abaixo de um breakpoint.',
    },
  ],

  examples: {
    angular: `<p-splitter [style]="{ height: '400px' }" [panelSizes]="[30, 70]" [minSizes]="[15, 40]">
  <ng-template pTemplate>
    <!-- painel 1: lista -->
  </ng-template>
  <ng-template pTemplate>
    <!-- painel 2: detalhe -->
  </ng-template>
</p-splitter>`,
    html: `<div style="display:flex; height:400px;">
  <section aria-label="Lista" style="flex-basis:30%;">
    <!-- lista -->
  </section>
  <div role="separator" aria-orientation="vertical" tabindex="0"
       aria-valuenow="30" aria-valuemin="15" aria-valuemax="60"
       aria-label="Redimensionar painéis"></div>
  <section aria-label="Detalhe" style="flex-basis:70%;">
    <!-- detalhe -->
  </section>
</div>`,
    inContext: `<!-- master-detail: lista de escolas à esquerda, detalhe à direita -->
<div style="display:flex; height:70vh;">
  <section aria-label="Escolas">
    <table><!-- ver ficha datatable --></table>
  </section>
  <div role="separator" aria-orientation="vertical" tabindex="0"
       aria-valuenow="35" aria-valuemin="20" aria-valuemax="70"
       aria-label="Redimensionar painéis"></div>
  <section aria-label="Detalhe da escola">
    <!-- ver ficha card -->
  </section>
</div>`,
  },

  a11y: {
    role: 'separator arrastável (aria-valuenow/min/max) entre regiões',
    keyboard: [
      'Tab foca o separador (gutter)',
      'setas ←/→ (horizontal) ou ↑/↓ (vertical) redimensionam pelo fator `step`',
      'cada painel é uma região com nome próprio',
    ],
    requiredAria: [
      'separador com `role="separator"`, aria-orientation e aria-valuenow/valuemin/valuemax',
      'aria-label no separador (ex.: "Redimensionar painéis")',
      'cada painel como região rotulada (aria-label/labelledby)',
    ],
    contrastMin: '3:1 do separador e do foco contra as áreas vizinhas',
  },

  aiHints: {
    keywords: [
      'splitter', 'divisor redimensionável', 'divisor redimensionavel', 'painéis redimensionáveis',
      'paineis redimensionaveis', 'arrastar para redimensionar', 'redimensionar painel',
      'lista e detalhe', 'master detail', 'dividir área', 'dividir area', 'gutter',
    ],
    selectionCriteria:
      'Escolha Splitter quando a pessoa precisa reequilibrar o espaço entre duas áreas arrastando um separador (master-detail, editor-preview). Linha estática = Divider; grade responsiva = Grid; alternar vistas = Tabs.',
    disambiguation: [
      { confundeCom: 'divider', criterio: 'Divider é uma linha estática de separação; Splitter tem um separador ARRASTÁVEL que redimensiona os painéis.' },
      { confundeCom: 'panel', criterio: 'Panel é um contêiner de UMA seção; Splitter é o LAYOUT que divide a área em painéis ajustáveis.' },
      { confundeCom: 'tabs', criterio: 'Tabs mostram uma vista por vez; Splitter mostra as áreas ao mesmo tempo, com tamanho ajustável.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/splitter',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng, com p-splitter-panel). Saída = regiões + separador `role="separator"` arrastável e focável; geometria do gutter herdada. Só o tema traz a cor da marca no separador ativo.',
  },
};
