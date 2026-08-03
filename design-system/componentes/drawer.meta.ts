/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · drawer.meta.ts — ONDA "SOBREPOSIÇÕES"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-drawer`. API lida do código real
 * (primeng@21.0.2, `types/primeng-drawer.d.ts`).
 *
 * Painel que DESLIZA de uma borda da tela (esquerda/direita/topo/base).
 * Bom para filtros, detalhes ou navegação (especialmente no mobile).
 * Modal (bloqueia a tela) ou não. Saída = diálogo/complementar com foco
 * preso quando modal, Esc para fechar, foco de volta ao gatilho.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const drawerMeta: NephosComponentMeta = {
  identity: {
    id: 'drawer',
    name: 'Drawer',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Painel lateral que desliza de uma borda para filtros, detalhes ou navegação.',
    whenToUse: [
      'Filtros avançados ou detalhes de um item sem sair da tela.',
      'Navegação principal recolhida no mobile (menu "hambúrguer").',
    ],
    whenNotToUse: [
      'Conteúdo que merece uma página própria (muito ou navegável) — abra uma rota.',
      'Decisão sim/não — use ConfirmDialog.',
      'Conteúdo pequeno ancorado num botão — use Popover.',
    ],
  },

  api: {
    inputs: [
      { name: 'visible', type: 'boolean', default: 'false', description: 'Abre/fecha o painel (two-way com o estado).' },
      {
        name: 'position',
        type: "'left' | 'right' | 'top' | 'bottom'",
        default: 'left',
        description: 'De qual borda desliza. Filtros/detalhes costumam vir da direita; navegação, da esquerda.',
      },
      {
        name: 'modal',
        type: 'boolean',
        default: 'true',
        description: 'true = escurece e bloqueia o resto da tela (foco preso). false = painel persistente que convive com o conteúdo.',
      },
      {
        name: 'dismissible',
        type: 'boolean',
        default: 'true',
        description: 'Clicar fora (na máscara) fecha. Desligar se a interação exige fechar por um botão.',
      },
      {
        name: 'showCloseIcon',
        type: 'boolean',
        default: 'true',
        description: 'Mostra o "x" de fechar (com aria-label).',
      },
      {
        name: 'closeOnEscape',
        type: 'boolean',
        default: 'true',
        description: 'Esc fecha. Manter ligado (acessibilidade).',
      },
      {
        name: 'fullScreen',
        type: 'boolean',
        default: 'false',
        description: 'Ocupa a tela inteira (útil em telas muito pequenas).',
      },
      { name: 'header', type: 'string', default: '—', description: 'Título do painel (dá nome acessível).' },
    ],
    outputs: [
      { name: 'onShow', payload: 'void', description: 'Abriu.' },
      { name: 'onHide', payload: 'void', description: 'Fechou.' },
    ],
    slots: [
      { name: 'header', accepts: 'template do cabeçalho', optional: true },
      { name: 'content', accepts: 'o conteúdo do painel' },
      { name: 'footer', accepts: 'template do rodapé (ex.: aplicar/limpar filtros)', optional: true },
    ],
    states: ['closed', 'open'],
    invalidCombinations: [
      {
        combo: 'drawer modal sem Esc nem botão de fechar',
        porque: 'A pessoa fica presa no painel, sem saída acessível.',
      },
      {
        combo: 'colocar um fluxo essencial só no drawer (mobile) sem alternativa',
        porque: 'Se o drawer falhar ou for fechado, a tarefa fica inacessível.',
      },
      {
        combo: 'drawer para conteúdo extenso/navegável',
        porque: 'Muito conteúdo espremido lateralmente atrapalha; isso pede uma página.',
      },
    ],
  },

  relationships: {
    parents: ['app-shell', 'page'],
    children: ['menu', 'search-input', 'multiselect', 'button', 'accordion', 'icon-button'],
    commonlyUsedWith: ['button', 'menubar', 'datatable'],
    partOfPatterns: ['filters', 'mobile-nav', 'detail-panel'],
  },

  tokens: {
    typography: 'title-sm (título) · body-lg (conteúdo)',
    byState: {
      open: { background: 'surface/0', mask: 'surface/overlay-mask', border: 'surface/200' },
    },
    note: 'Painel herda superfície/sombra/raio do PrimeNG; a máscara é a do overlay. Ênfase (primary) só nas ações internas. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar o drawer modal sem Esc e sem botão de fechar.',
      porque: 'Prende a pessoa sem saída acessível.',
      emVezDisso: 'closeOnEscape + "x" com aria-label; foco preso enquanto aberto, foco de volta ao gatilho ao fechar.',
    },
    {
      regra: 'Nunca esconder um fluxo essencial só no drawer no mobile.',
      porque: 'Se fechar/falhar, a tarefa some.',
      emVezDisso: 'Garantir um caminho alternativo; o drawer complementa, não é a única via.',
    },
    {
      regra: 'Nunca abrir o drawer sem anunciar/gerenciar o foco.',
      porque: 'Quem usa leitor de tela não percebe que um painel abriu.',
      emVezDisso: 'role apropriado, nome (header) e foco movido para dentro ao abrir.',
    },
  ],

  examples: {
    angular: `<button pButton (click)="filtros=true" aria-haspopup="dialog">Filtros</button>
<p-drawer [(visible)]="filtros" header="Filtros" position="right">
  <!-- search-input + multiselect de status + faixa de valores -->
  <ng-template pTemplate="footer">
    <button pButton severity="secondary">Limpar</button>
    <button pButton>Aplicar</button>
  </ng-template>
</p-drawer>`,
    html: `<button type="button" aria-haspopup="dialog" aria-expanded="false">Filtros</button>
<aside role="dialog" aria-modal="true" aria-labelledby="dw-t" hidden>
  <header>
    <h2 id="dw-t">Filtros</h2>
    <button type="button" aria-label="Fechar filtros">
      <i class="fa-solid fa-xmark" aria-hidden="true"></i>
    </button>
  </header>
  <div><!-- controles de filtro --></div>
  <footer>
    <button type="button">Limpar</button>
    <button type="button" data-variant="primary">Aplicar</button>
  </footer>
</aside>`,
    inContext: `<!-- menu de navegação recolhido no mobile -->
<button type="button" aria-label="Abrir menu" aria-haspopup="dialog" aria-expanded="false">
  <i class="fa-solid fa-bars" aria-hidden="true"></i>
</button>
<nav aria-label="Navegação principal" role="dialog" aria-modal="true" hidden>
  <!-- itens de menu (ver ficha menu) -->
</nav>`,
  },

  a11y: {
    role: 'dialog (modal) ou complementary (não-modal persistente)',
    keyboard: ['foco vai para dentro ao abrir', 'Esc fecha', 'Tab circula dentro quando modal', 'foco volta ao gatilho ao fechar'],
    requiredAria: [
      'gatilho com aria-haspopup="dialog" e aria-expanded',
      'painel com nome (header / aria-label); modal → aria-modal="true"',
      '"x" de fechar com aria-label',
    ],
    contrastMin: '4.5:1 do texto; 3:1 do foco e das bordas',
  },

  aiHints: {
    keywords: [
      'drawer', 'gaveta', 'painel lateral', 'sidebar', 'menu lateral', 'filtros laterais',
      'painel de detalhes', 'off-canvas', 'hambúrguer', 'hamburguer', 'menu mobile',
    ],
    selectionCriteria:
      'Escolha Drawer para um painel que desliza da borda (filtros, detalhes, navegação mobile). Conteúdo extenso/navegável = página; decisão sim/não = ConfirmDialog; conteúdo pequeno ancorado = Popover.',
    disambiguation: [
      { confundeCom: 'dialog', criterio: 'Dialog é modal central; Drawer desliza de uma borda (bom para filtros/nav lateral).' },
      { confundeCom: 'menu', criterio: 'Menu é a lista de ações/links; Drawer é o painel que pode CONTER um menu (ex.: nav mobile).' },
      { confundeCom: 'popover', criterio: 'Popover é pequeno e ancorado num botão; Drawer ocupa uma lateral inteira.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/drawer',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída = dialog/complementary com foco gerenciado; pode conter menu/filtros (search-input, multiselect). "x" segue `icon-button`.',
  },
};
