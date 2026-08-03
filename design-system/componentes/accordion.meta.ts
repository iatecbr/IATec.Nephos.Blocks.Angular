/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · accordion.meta.ts — ONDA "PAINÉIS/ESTRUTURA"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-accordion` (API composta do PrimeNG 21:
 * `p-accordion` › `p-accordion-panel` › `p-accordion-header` +
 * `p-accordion-content`). Lido do código real (`primeng-accordion.d.ts`).
 *
 * Seções empilhadas que EXPANDEM/RECOLHEM. Boa para revelar conteúdo
 * secundário sob demanda (perguntas, grupos de configuração). Saída =
 * cabeçalhos com `<button aria-expanded>` + regiões associadas.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const accordionMeta: NephosComponentMeta = {
  identity: {
    id: 'accordion',
    name: 'Accordion',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Seções empilhadas que expandem e recolhem para revelar conteúdo sob demanda.',
    whenToUse: [
      'Agrupar conteúdo secundário que nem sempre precisa aparecer (FAQ, grupos de configuração, detalhes).',
      'Reduzir o tamanho da página deixando a pessoa abrir só o que interessa.',
    ],
    whenNotToUse: [
      'Uma única seção recolhível — use Panel.',
      'Vistas paralelas do mesmo nível, uma por vez — use Tabs.',
      'Esconder informação essencial que a pessoa precisa para agir.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'value',
        type: 'string | number | array',
        default: '—',
        description: 'Qual painel está aberto (casa com o `value` de cada `p-accordion-panel`). Array quando `multiple`.',
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description: 'Permite vários painéis abertos ao mesmo tempo. false = abrir um fecha o outro.',
      },
      {
        name: 'expandIcon / collapseIcon',
        type: 'string (classe Font Awesome)',
        default: '—',
        description: 'Ícones de expandir/recolher (chevron). Seguem `icon.meta.ts`.',
      },
      {
        name: 'selectOnFocus',
        type: 'boolean',
        default: 'false',
        description: 'Abre o painel ao focar o cabeçalho (em vez de exigir clique/Enter).',
      },
    ],
    outputs: [
      { name: 'onOpen', payload: '{ originalEvent, index }', description: 'Um painel abriu.' },
      { name: 'onClose', payload: '{ originalEvent, index }', description: 'Um painel fechou.' },
    ],
    slots: [
      { name: 'panel', accepts: 'p-accordion-panel[value] — cada seção' },
      { name: 'header', accepts: 'p-accordion-header — o título clicável' },
      { name: 'content', accepts: 'p-accordion-content — o conteúdo revelado' },
    ],
    states: ['collapsed', 'expanded', 'focus', 'disabled'],
    invalidCombinations: [
      {
        combo: 'esconder no accordion (recolhido) uma informação essencial',
        porque: 'O que está recolhido é fácil de não abrir; conteúdo crítico deve ficar visível.',
      },
      {
        combo: 'accordion com uma única seção',
        porque: 'Não há o que "alternar/empilhar" — um Panel recolhível resolve com menos peso.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'page', 'drawer'],
    children: ['heading', 'text', 'icon'],
    commonlyUsedWith: ['card', 'text'],
    partOfPatterns: ['faq', 'settings', 'detail-disclosure'],
  },

  tokens: {
    typography: 'title-sm (cabeçalho) · body-lg (conteúdo)',
    byState: {
      collapsed: { header: 'surface/text', border: 'surface/200' },
      expanded: { header: 'primary/color' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Cabeçalho aberto ganha ênfase da marca; bordas/espaçamento herdam do PrimeNG. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca esconder informação essencial num painel recolhido.',
      porque: 'O que está fechado é fácil de não ver.',
      emVezDisso: 'Deixar o essencial visível; accordion só para conteúdo secundário/opcional.',
    },
    {
      regra: 'Nunca usar accordion para uma única seção.',
      porque: 'Não há empilhamento — é peso à toa.',
      emVezDisso: 'Panel (uma seção recolhível).',
    },
    {
      regra: 'Nunca ligar cabeçalho e conteúdo só visualmente.',
      porque: 'Sem aria-expanded/aria-controls, o leitor de tela não relaciona o botão à região.',
      emVezDisso: 'Cabeçalho como `<button aria-expanded aria-controls>` dentro de um heading; conteúdo em região com id.',
    },
  ],

  examples: {
    angular: `<p-accordion [value]="aberto" [multiple]="false">
  <p-accordion-panel value="0">
    <p-accordion-header>Como a cota é calculada?</p-accordion-header>
    <p-accordion-content>Integrais + parciais ÷ 2, comparado ao teto.</p-accordion-content>
  </p-accordion-panel>
  <p-accordion-panel value="1">
    <p-accordion-header>O que é reserva de vaga?</p-accordion-header>
    <p-accordion-content>…</p-accordion-content>
  </p-accordion-panel>
</p-accordion>`,
    html: `<div>
  <h3>
    <button type="button" aria-expanded="true" aria-controls="p1" id="h1">
      Como a cota é calculada?
    </button>
  </h3>
  <div role="region" id="p1" aria-labelledby="h1">
    Integrais + parciais ÷ 2, comparado ao teto.
  </div>
  <h3>
    <button type="button" aria-expanded="false" aria-controls="p2" id="h2">
      O que é reserva de vaga?
    </button>
  </h3>
  <div role="region" id="p2" aria-labelledby="h2" hidden>…</div>
</div>`,
    inContext: `<!-- FAQ dentro de um card -->
<article data-block="card">
  <h2>Perguntas frequentes</h2>
  <h3><button type="button" aria-expanded="false" aria-controls="f1" id="fh1">Quem pode receber bolsa integral?</button></h3>
  <div role="region" id="f1" aria-labelledby="fh1" hidden>…</div>
</article>`,
  },

  a11y: {
    role: 'grupo de cabeçalhos-botão + regiões',
    keyboard: [
      'Tab foca cada cabeçalho; Enter/Espaço abre/fecha',
      'setas ↑/↓ movem entre cabeçalhos (padrão accordion)',
      'Home/End vão ao primeiro/último',
    ],
    requiredAria: [
      'cabeçalho dentro de um heading (`<h2>`–`<h4>`) com `<button aria-expanded>`',
      'aria-controls apontando para a região do conteúdo',
      'região com aria-labelledby de volta ao cabeçalho',
    ],
    contrastMin: '4.5:1 do texto do cabeçalho e do conteúdo; 3:1 do foco',
  },

  aiHints: {
    keywords: [
      'accordion', 'acordeão', 'acordeao', 'sanfona', 'expandir recolher', 'seções recolhíveis',
      'secoes recolhiveis', 'faq', 'perguntas frequentes', 'colapsável', 'colapsavel',
    ],
    selectionCriteria:
      'Escolha Accordion para empilhar seções que expandem/recolhem (FAQ, grupos de config). Uma seção só = Panel; vistas paralelas horizontais = Tabs. Nunca esconder o essencial.',
    disambiguation: [
      { confundeCom: 'tabs', criterio: 'Tabs mostram UMA vista por vez na horizontal; Accordion empilha na vertical e pode abrir vários.' },
      { confundeCom: 'panel', criterio: 'Panel é UMA seção recolhível; Accordion é um conjunto empilhado.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/accordion',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng, API composta p-accordion/panel/header/content). Ícones Font Awesome (`icon.meta.ts`); saída = headings com aria-expanded + regiões.',
  },
};
