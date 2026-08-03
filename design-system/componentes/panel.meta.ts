/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · panel.meta.ts — ONDA "PAINÉIS/ESTRUTURA"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-panel`. API lida do código real
 * (primeng@21.0.2, `types/primeng-panel.d.ts`).
 *
 * Contêiner com cabeçalho e conteúdo, opcionalmente colapsável
 * (`toggleable`). É UMA seção recolhível — várias seções empilhadas
 * são Accordion. Saída = `<section>` com heading e, quando toggleable,
 * `<button aria-expanded aria-controls>` no cabeçalho.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const panelMeta: NephosComponentMeta = {
  identity: {
    id: 'panel',
    name: 'Panel',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Contêiner com cabeçalho e conteúdo, opcionalmente recolhível em uma única seção.',
    whenToUse: [
      'Agrupar um bloco de conteúdo sob um cabeçalho com título.',
      'Uma seção que pode recolher/expandir sob demanda (toggleable) — ex.: filtros avançados, detalhes opcionais.',
      'Enquadrar uma área da página com título e, opcionalmente, um rodapé de ações.',
    ],
    whenNotToUse: [
      'Várias seções empilhadas que expandem/recolhem — use Accordion.',
      'Um item de resumo dentro de uma lista/grade — use Card.',
      'Agrupar campos de formulário com legenda — use Fieldset.',
      'Vistas paralelas alternadas, uma por vez — use Tabs.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'header',
        type: 'string',
        default: '—',
        description: 'Texto do cabeçalho do painel. Vira um heading de verdade (`<h.>`) no HTML. Use o slot `header` quando precisar de conteúdo rico no lugar de só texto.',
      },
      {
        name: 'toggleable',
        type: 'boolean',
        default: 'false',
        description: 'Permite recolher/expandir o conteúdo clicando no cabeçalho ou no botão. Quando true, o cabeçalho vira `<button aria-expanded>`.',
      },
      {
        name: 'collapsed',
        type: 'boolean',
        default: 'false',
        description: 'Estado inicial do conteúdo (recolhido ou expandido). Suporta two-way binding. Só faz sentido com toggleable=true.',
      },
      {
        name: 'toggler',
        type: "'icon' | 'header'",
        default: 'icon',
        description: 'O que dispara o recolher: só o ícone (`icon`) ou o cabeçalho inteiro (`header`). `header` amplia a área de clique.',
      },
      {
        name: 'iconPos',
        type: "'start' | 'end' | 'center'",
        default: 'end',
        description: 'Posição do botão/ícone de recolher dentro do cabeçalho. Manter consistente entre painéis da mesma tela.',
      },
      {
        name: 'showHeader',
        type: 'boolean',
        default: 'true',
        description: 'Exibe ou oculta o cabeçalho do painel. Sem cabeçalho, o painel vira só uma moldura de conteúdo — reavalie se um Card ou um contêiner simples não serve melhor.',
      },
    ],
    outputs: [
      { name: 'collapsedChange', payload: 'boolean', description: 'Emitido quando o estado recolhido muda (para two-way binding de `collapsed`).' },
      { name: 'onBeforeToggle', payload: 'PanelBeforeToggleEvent { originalEvent, collapsed }', description: 'Antes de recolher/expandir. Permite reagir ou cancelar a transição.' },
      { name: 'onAfterToggle', payload: 'PanelAfterToggleEvent { originalEvent, collapsed }', description: 'Depois que a transição de recolher/expandir termina.' },
    ],
    slots: [
      { name: 'header', accepts: 'ng-template pTemplate="header" (ou <p-header>) — conteúdo rico do cabeçalho quando o input `header` de texto não basta', optional: true },
      { name: 'default', accepts: 'conteúdo principal do painel (ng-content padrão)' },
      { name: 'icons', accepts: 'ng-template pTemplate="headericons" — ações extras no cabeçalho (ex.: menu ⋯)', optional: true },
      { name: 'footer', accepts: 'ng-template pTemplate="footer" (ou <p-footer>) — rodapé de ações', optional: true },
    ],
    states: ['default', 'expanded', 'collapsed', 'focus', 'disabled'],
    invalidCombinations: [
      {
        combo: 'collapsed=true com toggleable=false',
        porque: 'Sem toggleable não há botão para reabrir; o conteúdo fica escondido sem como voltar.',
      },
      {
        combo: 'Panel com uma única seção recolhível repetido várias vezes lado a lado como se fosse Accordion',
        porque: 'Vários painéis toggleable soltos não coordenam abertura entre si; se a intenção é empilhar seções, o componente é Accordion.',
      },
      {
        combo: 'showHeader=false com toggleable=true',
        porque: 'Sem cabeçalho não há onde clicar para recolher; o toggle fica sem gatilho visível.',
      },
    ],
  },

  relationships: {
    parents: ['page', 'card', 'grid'],
    children: ['heading', 'text', 'button', 'form-field', 'divider', 'datatable'],
    commonlyUsedWith: ['button', 'divider', 'form-field'],
    partOfPatterns: ['section', 'detail-disclosure', 'settings', 'page-header'],
  },

  tokens: {
    typography: 'title-sm (cabeçalho) · body-lg (conteúdo)',
    byState: {
      default: { header: 'surface/text', background: 'surface/0', border: 'surface/200' },
      expanded: { header: 'surface/text' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Fundo/borda de superfície, raio, padding e a transição de recolher herdam do PrimeNG (panel.*). A ênfase da marca (primary) fica só numa ação do cabeçalho/rodapé, não na moldura. Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar vários Panel recolhíveis soltos onde a intenção é empilhar seções coordenadas.',
      porque: 'Painéis independentes não fecham um ao abrir o outro nem compartilham a semântica de grupo.',
      emVezDisso: 'Accordion quando as seções são um conjunto empilhado; Panel para UMA seção isolada.',
    },
    {
      regra: 'Nunca recolher (collapsed) conteúdo essencial para a ação da tela.',
      porque: 'O que começa recolhido é fácil de não abrir; informação crítica precisa estar visível.',
      emVezDisso: 'Deixar o essencial expandido; recolher só o secundário/opcional.',
    },
    {
      regra: 'Nunca ligar cabeçalho e conteúdo só visualmente num painel toggleable.',
      porque: 'Sem aria-expanded/aria-controls o leitor de tela não relaciona o botão à região que ele abre.',
      emVezDisso: 'Cabeçalho como `<button aria-expanded aria-controls>` dentro de um heading; conteúdo em região com id.',
    },
    {
      regra: 'Nunca usar Panel só pela moldura/sombra, sem cabeçalho nem propósito de agrupar.',
      porque: 'Vira decoração que infla a tela; o papel do Panel é enquadrar uma seção com título.',
      emVezDisso: 'Um Card para um bloco de resumo, ou apenas o espaçamento do layout.',
    },
  ],

  examples: {
    angular: `<p-panel header="Filtros avançados" [toggleable]="true" [collapsed]="true">
  <!-- campos de filtro -->
  <ng-template pTemplate="footer">
    <p-button label="Aplicar" severity="primary" />
  </ng-template>
</p-panel>`,
    html: `<section aria-labelledby="pnl-h">
  <h2 id="pnl-h">
    <button type="button" aria-expanded="false" aria-controls="pnl-c">
      Filtros avançados
    </button>
  </h2>
  <div role="region" id="pnl-c" aria-labelledby="pnl-h" hidden>
    <!-- campos de filtro -->
    <footer>
      <button type="button" data-variant="primary">Aplicar</button>
    </footer>
  </div>
</section>`,
    inContext: `<!-- painel não recolhível enquadrando uma seção de detalhes -->
<section aria-labelledby="det-h">
  <h2 id="det-h">Detalhes do contrato</h2>
  <div>
    <p>Vigência, partes e cláusulas do contrato.</p>
  </div>
</section>`,
  },

  a11y: {
    role: 'region/section com heading (e cabeçalho-botão quando toggleable)',
    keyboard: [
      'Tab foca o botão do cabeçalho quando toggleable',
      'Enter/Espaço recolhe/expande',
      'painel não recolhível não tem teclas próprias — o foco vai aos elementos internos',
    ],
    requiredAria: [
      'cabeçalho como heading de verdade (`<h2>`–`<h4>` conforme o nível da página)',
      'quando toggleable: `<button aria-expanded>` com aria-controls apontando para a região do conteúdo',
      'a região do conteúdo com aria-labelledby de volta ao cabeçalho',
    ],
    contrastMin: '4.5:1 do texto do cabeçalho e do conteúdo; 3:1 do foco e das bordas',
  },

  aiHints: {
    keywords: [
      'panel', 'painel', 'seção recolhível', 'secao recolhivel', 'recolher expandir',
      'colapsável', 'colapsavel', 'contêiner com cabeçalho', 'container com cabecalho',
      'bloco com título', 'bloco com titulo', 'toggleable',
    ],
    selectionCriteria:
      'Escolha Panel para UMA seção com cabeçalho, opcionalmente recolhível. Várias seções empilhadas = Accordion; item de resumo em lista/grade = Card; agrupar campos de formulário = Fieldset; vistas alternadas = Tabs.',
    disambiguation: [
      { confundeCom: 'accordion', criterio: 'Accordion é um CONJUNTO de seções empilhadas que coordenam abertura; Panel é UMA seção isolada.' },
      { confundeCom: 'card', criterio: 'Card é um bloco de resumo (sem recolher) para um item; Panel enquadra uma seção da página, podendo recolher.' },
      { confundeCom: 'fieldset', criterio: 'Fieldset agrupa CAMPOS de formulário com legenda (semântica `<fieldset>`); Panel agrupa conteúdo em geral.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/panel',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída = `<section>` com heading e, quando toggleable, `<button aria-expanded>` + região. Ícone do toggle interno é sobrescrito para Font Awesome; só o tema entra com a cor da marca.',
  },
};
