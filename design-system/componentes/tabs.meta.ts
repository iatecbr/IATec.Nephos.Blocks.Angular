/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · tabs.meta.ts — ONDA 4 (navegação)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-tabs` (API composta nova do PrimeNG 21:
 * `p-tabs` › `p-tablist` › `p-tab` + `p-tabpanels` › `p-tabpanel`).
 * Lido do código real (`types/primeng-tabs.d.ts`).
 *
 * Alterna entre VISTAS IRMÃS do mesmo nível sem sair da página. O "tab
 * item" é PARTE (`p-tab`), não ficha própria. Saída = padrão ARIA
 * tablist/tab/tabpanel.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const tabsMeta: NephosComponentMeta = {
  identity: {
    id: 'tabs',
    name: 'Tabs',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Abas que alternam entre seções irmãs de conteúdo no mesmo lugar.',
    whenToUse: [
      'Dividir conteúdo relacionado em vistas paralelas (ex.: Resumo · Detalhes · Histórico).',
      'Quando só uma vista precisa aparecer por vez e a troca é frequente.',
    ],
    whenNotToUse: [
      'Passos em ordem obrigatória — use Stepper.',
      'Navegar entre páginas/rotas do app — use Menubar/links.',
      'Muitas abas (> ~6) ou rótulos longos — repensar a arquitetura.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'value',
        type: 'string | number',
        default: '—',
        description: 'A aba ativa (casa com o `value` de um `p-tab`/`p-tabpanel`). Controla qual painel aparece.',
      },
      {
        name: 'scrollable',
        type: 'boolean',
        default: 'false',
        description: 'Permite rolar a lista de abas quando não cabem. Preferir reduzir o número de abas a depender de rolagem.',
      },
      {
        name: 'lazy',
        type: 'boolean',
        default: 'false',
        description: 'Só renderiza o conteúdo do painel quando a aba é aberta. Bom para painéis pesados.',
      },
      {
        name: 'selectOnFocus',
        type: 'boolean',
        default: 'false',
        description: 'Seleciona a aba ao focar com as setas (padrão ARIA "automatic activation"). Deixar false quando abrir a aba é custoso.',
      },
    ],
    outputs: [
      { name: 'valueChange', payload: 'string | number', description: 'Emitido ao trocar de aba (útil para gravar/reagir à aba ativa).' },
    ],
    slots: [
      { name: 'tablist', accepts: 'a barra de abas (p-tablist com p-tab)' },
      { name: 'tabpanels', accepts: 'os painéis (p-tabpanels com p-tabpanel)' },
    ],
    states: ['default'],
    invalidCombinations: [
      {
        combo: 'abas para etapas que têm ordem obrigatória',
        porque: 'Abas são livres (pula-se para qualquer uma); um processo sequencial precisa de Stepper.',
      },
      {
        combo: 'value que não corresponde a nenhum p-tab/p-tabpanel',
        porque: 'Nenhum painel fica ativo — a área de conteúdo aparece vazia.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'page'],
    children: ['tab', 'tabpanel'],
    commonlyUsedWith: ['card', 'table'],
    partOfPatterns: ['navigation', 'detail-view'],
  },

  tokens: {
    typography: 'body-lg (rótulo da aba)',
    byState: {
      default: { text: 'surface/text-muted', indicator: 'surface/200' },
      active: { text: 'primary/color', indicator: 'primary/color' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Aba ativa = ênfase da marca (texto + traço inferior primary); inativas = muted. Espaçamento/traço herdam do PrimeNG. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar abas para um processo sequencial.',
      porque: 'Abas permitem pular de qualquer para qualquer; um passo-a-passo exige ordem.',
      emVezDisso: 'Um Stepper para etapas em ordem.',
    },
    {
      regra: 'Nunca esconder informação essencial atrás de uma aba não-óbvia.',
      porque: 'O que está em outra aba fica invisível; a pessoa pode nunca abrir.',
      emVezDisso: 'Deixar o essencial na primeira vista; abas só para conteúdo secundário/paralelo.',
    },
    {
      regra: 'Nunca ligar aba e painel só por posição visual.',
      porque: 'Sem aria-controls/aria-selected, o leitor de tela não relaciona a aba ao painel.',
      emVezDisso: 'role="tab" com aria-selected + aria-controls apontando para o role="tabpanel".',
    },
  ],

  examples: {
    angular: `<p-tabs [(value)]="abaAtiva">
  <p-tablist>
    <p-tab value="resumo">Resumo</p-tab>
    <p-tab value="detalhes">Detalhes</p-tab>
  </p-tablist>
  <p-tabpanels>
    <p-tabpanel value="resumo">…</p-tabpanel>
    <p-tabpanel value="detalhes">…</p-tabpanel>
  </p-tabpanels>
</p-tabs>`,
    html: `<div>
  <div role="tablist" aria-label="Detalhes da bolsa">
    <button role="tab" id="t-resumo" aria-selected="true" aria-controls="p-resumo">Resumo</button>
    <button role="tab" id="t-detalhes" aria-selected="false" aria-controls="p-detalhes" tabindex="-1">Detalhes</button>
  </div>
  <div role="tabpanel" id="p-resumo" aria-labelledby="t-resumo">…</div>
  <div role="tabpanel" id="p-detalhes" aria-labelledby="t-detalhes" hidden>…</div>
</div>`,
    inContext: `<!-- abas dentro de um card de detalhe -->
<article data-block="card">
  <h2>Colégio Adventista de Salvador</h2>
  <div role="tablist" aria-label="Seções">
    <button role="tab" aria-selected="true" aria-controls="p1" id="t1">Bolsas</button>
    <button role="tab" aria-selected="false" aria-controls="p2" id="t2" tabindex="-1">Níveis</button>
  </div>
  <div role="tabpanel" id="p1" aria-labelledby="t1">…</div>
  <div role="tabpanel" id="p2" aria-labelledby="t2" hidden>…</div>
</article>`,
  },

  a11y: {
    role: 'tablist / tab / tabpanel',
    keyboard: ['Setas ←/→ movem entre abas', 'Home/End vão à primeira/última', 'Tab entra no painel ativo'],
    requiredAria: [
      'role="tab" com aria-selected e aria-controls',
      'role="tabpanel" com aria-labelledby apontando para a aba',
      'só a aba ativa é tabbable (as outras tabindex="-1")',
    ],
    contrastMin: '4.5:1 do rótulo da aba; 3:1 do indicador de aba ativa',
  },

  aiHints: {
    keywords: [
      'tabs', 'abas', 'guias', 'alternar vista', 'seções', 'secoes', 'tabview',
      'resumo detalhes', 'painel de abas',
    ],
    selectionCriteria:
      'Escolha Tabs para alternar entre vistas IRMÃS do mesmo conteúdo, sem sair da página. Etapas em ordem = Stepper; navegação entre rotas = Menubar/links.',
    disambiguation: [
      { confundeCom: 'stepper', criterio: 'Stepper impõe ordem (passo 1→2→3); Tabs são livres.' },
      { confundeCom: 'menubar', criterio: 'Menubar navega entre páginas/rotas; Tabs trocam conteúdo na mesma página.' },
      { confundeCom: 'accordion', criterio: 'Accordion empilha e expande seções na vertical; Tabs mostram uma vista por vez.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/tabs',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng, API composta p-tabs/p-tablist/p-tab/p-tabpanels/p-tabpanel). Saída = padrão ARIA tablist.',
  },
};
