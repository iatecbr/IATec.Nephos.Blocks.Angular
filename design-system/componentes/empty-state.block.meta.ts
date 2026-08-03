/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · empty-state.block.meta.ts — BLOCO (composição nossa)
 * ─────────────────────────────────────────────────────────────
 * category: 'block' · origin: 'nephos-own'
 * O que mostrar quando NÃO há dados: um ícone/ilustração, um título,
 * um texto curto e (quando cabe) uma ação para começar.
 * Saída do Moses = HTML semântico: uma região com título e ação.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const emptyStateBlockMeta: NephosComponentMeta = {
  identity: {
    id: 'empty-state',
    name: 'Empty State',
    category: 'block',
    status: 'beta',
    version: '0.1.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'O que a tela mostra quando ainda não há dados — explicando o vazio e oferecendo o próximo passo.',
    whenToUse: [
      'Uma lista/tabela/painel sem itens ainda (primeiro uso).',
      'Um resultado de busca/filtro que não encontrou nada.',
      'Uma área que depende de uma ação anterior ("conecte uma conta para começar").',
    ],
    whenNotToUse: [
      'Enquanto os dados ainda estão carregando — use skeleton/loading.',
      'Quando houve um erro de sistema — use um estado de erro (com opção de tentar de novo).',
    ],
  },

  api: {
    inputs: [
      { name: 'variant', type: "'primeiro-uso' | 'sem-resultado' | 'bloqueado'", default: 'primeiro-uso', description: 'O tipo de vazio — muda o texto e se há ou não ação. Primeiro-uso convida a criar; sem-resultado sugere ajustar o filtro.' },
      { name: 'title', type: 'string', default: '—', description: 'Frase curta que nomeia o vazio ("Nenhum relatório ainda").' },
      { name: 'description', type: 'string', default: '—', description: 'Uma linha explicando o que fazer.' },
      { name: 'showAction', type: 'boolean', default: 'true', description: 'Mostra a ação primária. Desligar quando não há ação óbvia (ex.: sem-resultado só sugere ajustar filtro).' },
    ],
    outputs: [
      { name: 'action', payload: 'void', description: 'Emitido ao clicar na ação primária (ex.: "Criar relatório").' },
    ],
    slots: [
      { name: 'illustration', accepts: 'ícone ou ilustração do vazio (sóbrio, sem exagero)', optional: true },
      { name: 'title', accepts: 'título do estado vazio' },
      { name: 'description', accepts: 'texto curto de apoio', optional: true },
      { name: 'action', accepts: 'Button primário (ex.: "Criar o primeiro item")', optional: true },
    ],
    states: ['primeiro-uso', 'sem-resultado', 'bloqueado'],
    invalidCombinations: [
      { combo: 'empty-state exibido durante o carregamento', porque: 'Mostra "sem dados" quando os dados só estão chegando — assusta e engana.' },
      { combo: 'sem-resultado com ação "Criar item"', porque: 'A pessoa buscou algo; a ação certa é limpar/ajustar o filtro, não criar.' },
    ],
  },

  relationships: {
    parents: ['datatable', 'list', 'dataview', 'dashboard', 'page'],
    children: ['button', 'icon'],
    commonlyUsedWith: [],
    partOfPatterns: ['first-use', 'no-results'],
  },

  tokens: {
    typography: 'title-sm',
    byState: {
      titulo: { text: 'surface/text' },
      descricao: { text: 'surface/muted' },
      ilustracao: { color: 'surface/muted' },
      acao: { background: 'primary/500', text: 'primary/contrast' },
    },
    note: 'Cor por papel (surface para texto neutro; primary só na ação). Espaçamento/centralização herdam do sistema. Nunca hex. A ilustração usa o papel de APOIO (`surface/muted`), não um passo fixo da rampa: a rampa de surface não inverte entre claro e escuro, então um passo cru sairia igual nos dois modos e, no escuro, a ilustração viraria o elemento mais claro da tela — o oposto do anti-padrão abaixo. (Corrigido em 03/08/2026, medido no Storybook; antes dizia `surface/300`.)',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar um vazio "mudo" (só um espaço em branco ou "0 itens").',
      porque: 'A pessoa não sabe se quebrou, se está carregando, ou o que fazer.',
      emVezDisso: 'Explicar o vazio em uma frase e oferecer o próximo passo.',
    },
    {
      regra: 'Nunca usar ilustração/animação chamativa demais.',
      porque: 'Transforma um estado neutro em festa; distrai do que importa (a ação).',
      emVezDisso: 'Um ícone sóbrio e uma ação clara — a cor de ênfase só no botão.',
    },
    {
      regra: 'Nunca confundir vazio com erro ou com carregando.',
      porque: 'São três situações diferentes; tratar igual engana o usuário.',
      emVezDisso: 'Vazio → empty-state; carregando → skeleton; erro → estado de erro com "tentar de novo".',
    },
  ],

  examples: {
    angular: `<!-- composição própria; usa Button do PrimeNG -->
<div class="empty-state">
  <i class="fa-solid fa-inbox" aria-hidden="true"></i>
  <h2>Nenhum relatório ainda</h2>
  <p>Crie o primeiro para ver os dados aqui.</p>
  <p-button label="Criar relatório" severity="primary" (onClick)="criar()" />
</div>`,
    html: `<div data-block="empty-state" role="status">
  <span data-slot="illustration" aria-hidden="true">📥</span>
  <h2 data-slot="title">Nenhum relatório ainda</h2>
  <p data-slot="description">Crie o primeiro para ver os dados aqui.</p>
  <button type="button" data-variant="primary">Criar relatório</button>
</div>`,
    inContext: `<section aria-label="Relatórios">
  <!-- quando a lista vem vazia, no lugar da tabela: -->
  <div data-block="empty-state" role="status"> … (ver html acima) … </div>
</section>`,
  },

  a11y: {
    role: 'status (região informativa)',
    keyboard: ['a ação primária é focável e acionável'],
    requiredAria: ['título de verdade (`<h.>`)', 'ilustração decorativa com aria-hidden', 'não depender só da imagem para explicar'],
    contrastMin: '4.5:1 em título e descrição',
  },

  aiHints: {
    keywords: ['empty state', 'estado vazio', 'sem dados', 'sem resultado', 'nenhum item', 'lista vazia', 'primeiro uso'],
    selectionCriteria:
      'Use o Empty State quando NÃO há dados para mostrar. Se está carregando → skeleton. Se houve erro → estado de erro. Diferencie primeiro-uso (convida a criar) de sem-resultado (sugere ajustar filtro).',
    disambiguation: [
      { confundeCom: 'skeleton', criterio: 'Skeleton é enquanto CARREGA; empty-state é quando terminou e não há nada.' },
      { confundeCom: 'estado de erro', criterio: 'Erro é falha do sistema (com "tentar de novo"); empty-state é ausência normal de dados.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/', // composição própria (Button + ícone + texto)
    figmaNode: 'https://www.figma.com/design/mHUXdyDZ820suwIRIIlp9Z/PrimeOne-4.0.0',
    storybookId: 'blocks-empty-state',
    deltaFromPrimeng: 'Bloco nephos-own: composição própria. A cor da ênfase (ação) é a primary da vertical ativa.',
  },
};
