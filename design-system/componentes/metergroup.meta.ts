/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · metergroup.meta.ts — ONDA "SOBREPOSIÇÕES E FEEDBACK"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-metergroup`. API lida do código real
 * (primeng@21.0.2, `types/primeng-metergroup.d.ts`).
 *
 * Uma barra ÚNICA dividida em vários SEGMENTOS proporcionais, cada um com
 * seu rótulo, valor e cor — para mostrar uma composição dentro de uma faixa
 * conhecida (ex.: uso de armazenamento por tipo, distribuição de bolsas por
 * categoria). Diferente da ProgressBar (um só valor, o andamento de UMA
 * tarefa). Só EXIBE — não é entrada do usuário.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const meterGroupMeta: NephosComponentMeta = {
  identity: {
    id: 'metergroup',
    name: 'MeterGroup',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Barra segmentada que mostra a composição de um total dentro de uma faixa conhecida.',
    whenToUse: [
      'Mostrar como um total se divide em partes proporcionais (ex.: espaço usado por tipo de arquivo, bolsas por categoria, orçamento por rubrica).',
      'Comparar a fatia de várias categorias de uma vez, com uma legenda rotulada.',
    ],
    whenNotToUse: [
      'O andamento de UMA tarefa (um só valor) — use ProgressBar.',
      'Escolher/ajustar um valor numa faixa — isso é entrada: use Slider.',
      'Comparar categorias sem relação de "parte de um todo" — use um gráfico de barras.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'value',
        type: 'MeterItem[]',
        default: '—',
        description: '⭐ Os segmentos. Cada item: `label` (nome da fatia), `value` (o tamanho), `color` (cor da fatia), `icon` (ícone da legenda). A soma dos `value` compõe a barra dentro de [min, max].',
      },
      {
        name: 'min',
        type: 'number',
        default: '0',
        description: 'Limite inferior da faixa. Base do cálculo das proporções.',
      },
      {
        name: 'max',
        type: 'number',
        default: '100',
        description: 'Limite superior da faixa. Se a soma dos segmentos for menor que `max`, sobra um trecho vazio (o "restante").',
      },
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Direção da barra. `vertical` para barras em coluna (ex.: ao lado de um valor grande).',
      },
      {
        name: 'labelPosition',
        type: "'start' | 'end'",
        default: "'end'",
        description: 'Onde a legenda (lista de rótulos) aparece em relação à barra.',
      },
      {
        name: 'labelOrientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Como a legenda se distribui: em linha (`horizontal`) ou empilhada (`vertical`).',
      },
    ],
    outputs: [],
    slots: [
      { name: 'label', accepts: 'template customizado da legenda (lista de rótulos)', optional: true },
      { name: 'meter', accepts: 'template customizado de cada segmento da barra', optional: true },
      { name: 'start', accepts: 'template antes da barra (ex.: título/total)', optional: true },
      { name: 'end', accepts: 'template depois da barra', optional: true },
      { name: 'icon', accepts: 'template do ícone de um item da legenda', optional: true },
    ],
    states: ['horizontal', 'vertical'],
    invalidCombinations: [
      {
        combo: 'MeterGroup com um único segmento',
        porque: 'Se há uma só parte, é o andamento de um valor — o certo é ProgressBar, não um grupo.',
      },
      {
        combo: 'cores dos segmentos com hex fora da paleta',
        porque: 'Quebra o tema e a fidelidade; as fatias deixam de significar por papel (feedback/primary).',
      },
      {
        combo: 'legenda sem rótulos (só cores)',
        porque: 'Cor sozinha não diz o que é cada fatia e exclui quem não distingue cores.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'panel', 'page', 'toolbar'],
    children: ['icon'],
    commonlyUsedWith: ['card', 'tag', 'badge'],
    partOfPatterns: ['composition-breakdown', 'dashboard-kpi', 'usage-summary'],
  },

  tokens: {
    typography: 'caption (rótulos da legenda) · body-sm (valores)',
    byState: {
      base: { track: 'surface/200', label: 'surface/text' },
      segmentos: { info: 'feedback.info/500', success: 'feedback.success/500', warn: 'feedback.warn/500', danger: 'feedback.danger/500', emphasis: 'primary/color' },
    },
    note: 'Trilha = surface; cada fatia deve mapear para um passo de paleta por papel (feedback.* para status, primary para ênfase). Altura/raio/gap herdam do PrimeNG. NUNCA hex no `color` do item — usar cor da paleta.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar MeterGroup para um único valor/uma só tarefa.',
      porque: 'Um grupo com uma fatia só é um ProgressBar disfarçado — confunde a leitura.',
      emVezDisso: 'ProgressBar (determinate) para o andamento de um valor.',
    },
    {
      regra: 'Nunca colorir os segmentos com hex arbitrário.',
      porque: 'Quebra o tema; a cor deixa de comunicar papel (status/ênfase) e some no dark mode.',
      emVezDisso: 'Cor da paleta por papel (feedback.info/500, primary/color…) no `color` de cada MeterItem.',
    },
    {
      regra: 'Nunca depender só da cor para identificar as fatias.',
      porque: 'Quem não distingue cores fica sem saber o que é cada segmento.',
      emVezDisso: 'Sempre a legenda com `label` (e ícone/valor) ligada a cada segmento.',
    },
  ],

  examples: {
    angular: `<p-metergroup [value]="segmentos" />

// no componente:
segmentos = [
  { label: 'Integrais', value: 45, color: 'var(--p-primary-color)', icon: 'fa-solid fa-graduation-cap' },
  { label: 'Parciais',  value: 30, color: 'var(--p-info-color)' },      // papel feedback.info, não matiz "blue"
  { label: 'Disponível', value: 25, color: 'var(--p-surface-300)' },
];`,
    html: `<!-- barra segmentada + legenda rotulada -->
<div role="meter" aria-label="Distribuição de bolsas" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="meters">
    <span class="seg" style="width:45%"></span>
    <span class="seg" style="width:30%"></span>
    <span class="seg" style="width:25%"></span>
  </div>
</div>
<ul class="legend">
  <li><span class="marker" aria-hidden="true"></span> Integrais — 45</li>
  <li><span class="marker" aria-hidden="true"></span> Parciais — 30</li>
  <li><span class="marker" aria-hidden="true"></span> Disponível — 25</li>
</ul>`,
    inContext: `<!-- num card de resumo de dashboard -->
<section data-block="card" aria-labelledby="mg-t">
  <h3 id="mg-t">Ocupação de bolsas</h3>
  <div role="meter" aria-labelledby="mg-t" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
    <div class="meters">
      <span class="seg" style="width:45%"></span>
      <span class="seg" style="width:30%"></span>
    </div>
  </div>
  <ul class="legend">
    <li>Integrais — 45</li>
    <li>Parciais — 30</li>
  </ul>
</section>`,
  },

  a11y: {
    role: 'meter (barra) com legenda em lista',
    keyboard: ['não focável (elemento de status)'],
    requiredAria: [
      'nome acessível (aria-label/labelledby) dizendo do que é a composição',
      'valores das fatias legíveis como texto na legenda (não só cor)',
      'aria-valuenow/min/max quando fizer sentido representar o total preenchido',
    ],
    contrastMin: '3:1 de cada fatia contra a trilha e as vizinhas; 4.5:1 do texto da legenda',
  },

  aiHints: {
    keywords: [
      'metergroup', 'medidor', 'barra segmentada', 'composição', 'composicao', 'distribuição',
      'distribuicao', 'proporção', 'proporcao', 'uso por categoria', 'divisão do total',
      'divisao do total', 'meter', 'breakdown',
    ],
    selectionCriteria:
      'Escolha MeterGroup para mostrar a COMPOSIÇÃO de um total em várias fatias proporcionais dentro de uma faixa conhecida, com legenda rotulada. Um só valor/andamento = ProgressBar; entrada de valor = Slider; categorias sem "parte de um todo" = gráfico de barras.',
    disambiguation: [
      { confundeCom: 'progressbar', criterio: 'ProgressBar é um único valor (andamento de uma tarefa); MeterGroup são vários segmentos proporcionais (composição).' },
      { confundeCom: 'slider', criterio: 'Slider é entrada (o usuário escolhe um valor); MeterGroup só exibe (não editável).' },
      { confundeCom: 'tag', criterio: 'Tag rotula/categoriza um item pontual; MeterGroup quantifica proporções num total.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/metergroup',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). A camada Nephos exige que o `color` de cada MeterItem venha da paleta por papel (nunca hex) e que a legenda tenha rótulo textual, não só cor.',
  },
};
