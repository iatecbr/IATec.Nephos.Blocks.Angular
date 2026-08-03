/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · scrolltop.meta.ts — ONDA "SOBREPOSIÇÕES E FEEDBACK"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-scrolltop`. API lida do código real
 * (primeng@21.0.2, `types/primeng-scrolltop.d.ts`).
 *
 * Botão flutuante que APARECE depois que a pessoa rola além de um limite
 * e, ao ser clicado, leva de volta ao topo (da janela ou de um contêiner
 * rolável). Ajuda em páginas/listas longas. Saída = um `<button>` real
 * com rótulo acessível.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const scrollTopMeta: NephosComponentMeta = {
  identity: {
    id: 'scrolltop',
    name: 'ScrollTop',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Botão flutuante que volta ao topo, exibido após rolar além de um limite.',
    whenToUse: [
      'Páginas ou listas longas em que voltar ao topo manualmente é cansativo.',
      'Um contêiner rolável interno (target="parent") em que a pessoa desce bastante.',
    ],
    whenNotToUse: [
      'Páginas curtas que não rolam além de uma tela — o botão nunca teria motivo para aparecer.',
      'Navegação entre seções — use âncoras/links de navegação, não o "voltar ao topo".',
      'Rolagem horizontal ou controle fino de posição — não é o papel deste componente.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'target',
        type: "'window' | 'parent'",
        default: "'window'",
        description: 'O que rola: a janela toda (`window`) ou o contêiner pai rolável (`parent`). Use `parent` quando o scroll é de uma área interna, não da página.',
      },
      {
        name: 'threshold',
        type: 'number',
        default: '400',
        description: 'A partir de quantos pixels de rolagem o botão aparece. Abaixo disso ele fica escondido (não faria sentido).',
      },
      {
        name: 'behavior',
        type: "'auto' | 'smooth'",
        default: "'smooth'",
        description: 'Como sobe: `smooth` anima a subida; `auto` salta direto ao topo. `smooth` é mais suave; respeitar prefers-reduced-motion.',
      },
      {
        name: 'icon',
        type: 'string',
        default: '(tema)',
        description: 'Nome do ícone interno do botão (seta para cima). Ícone INTERNO do PrimeNG — segue a config de iconografia do tema.',
      },
      {
        name: 'buttonAriaLabel',
        type: 'string | undefined',
        default: '—',
        description: '⭐ Rótulo acessível do botão (ex.: "Voltar ao topo"). OBRIGATÓRIO na prática: o botão é só um ícone e precisa de nome para o leitor de tela.',
      },
      {
        name: 'buttonProps',
        type: 'ButtonProps',
        default: '—',
        description: 'Repassa propriedades ao Button interno (ex.: severity, rounded, size). Mantê-lo coerente com o padrão de botão flutuante da app.',
      },
    ],
    outputs: [],
    slots: [
      { name: 'icon', accepts: 'template do ícone customizado (a seta para cima)', optional: true },
    ],
    states: ['hidden', 'visible'],
    invalidCombinations: [
      {
        combo: 'ScrollTop sem buttonAriaLabel',
        porque: 'O botão é apenas um ícone; sem rótulo o leitor de tela não sabe o que ele faz.',
      },
      {
        combo: 'threshold muito baixo (aparece quase sem rolar)',
        porque: 'O botão fica visível o tempo todo e vira ruído/obstrução sobre o conteúdo.',
      },
      {
        combo: 'target="parent" sem um contêiner rolável de fato',
        porque: 'Sem área rolável pai, o botão não tem o que monitorar e não funciona.',
      },
    ],
  },

  relationships: {
    parents: ['page', 'app-shell', 'datatable', 'scrollpanel'],
    children: ['icon'],
    commonlyUsedWith: ['datatable', 'dataview'],
    partOfPatterns: ['long-page', 'infinite-scroll'],
  },

  tokens: {
    typography: '—',
    byState: {
      visible: { background: 'primary/color', icon: 'primary/contrast' },
    },
    note: 'É um botão flutuante: fundo = ênfase (primary) por padrão, ícone com contraste sobre ele. Tamanho/raio/sombra/posição herdam do PrimeNG. Cor por papel + passo — nunca hex.',
  },

  antiPatterns: [
    {
      regra: 'Nunca renderizar o ScrollTop sem rótulo acessível.',
      porque: 'Sendo só um ícone, sem buttonAriaLabel o leitor de tela anuncia um botão sem nome.',
      emVezDisso: 'buttonAriaLabel="Voltar ao topo" (ou aria-label no `<button>` emitido).',
    },
    {
      regra: 'Nunca deixar o botão aparecer cedo demais (threshold baixo).',
      porque: 'Visível sem necessidade, ele obstrui o conteúdo e polui o canto da tela.',
      emVezDisso: 'Um threshold que só o revele depois de uma rolagem significativa (padrão ~400px).',
    },
    {
      regra: 'Nunca usar o ScrollTop como navegação entre seções.',
      porque: 'Ele só volta ao topo; não substitui um índice/âncoras para navegar o conteúdo.',
      emVezDisso: 'Links de âncora / navegação por seções quando o objetivo é ir a pontos específicos.',
    },
  ],

  examples: {
    angular: `<p-scrolltop [threshold]="400" behavior="smooth"
             buttonAriaLabel="Voltar ao topo" />

<!-- dentro de um contêiner rolável interno -->
<p-scrolltop target="parent" buttonAriaLabel="Voltar ao topo da lista" />`,
    html: `<!-- botão flutuante, exibido após rolar além do limite -->
<button type="button" aria-label="Voltar ao topo" data-block="scrolltop" hidden>
  <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
</button>`,
    inContext: `<!-- ao fim de uma página longa com tabela extensa -->
<main>
  <table><!-- muitas linhas --></table>
</main>
<button type="button" aria-label="Voltar ao topo" data-block="scrolltop">
  <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
</button>
<!-- aparece após ~400px de rolagem; ao clicar, sobe suavemente ao topo -->`,
  },

  a11y: {
    role: 'button',
    keyboard: ['focável quando visível', 'Enter/Espaço aciona (volta ao topo)', 'devolve o foco ao início do conteúdo após subir'],
    requiredAria: [
      'aria-label / buttonAriaLabel com o nome da ação ("Voltar ao topo")',
      'ícone decorativo com aria-hidden="true"',
      'respeitar prefers-reduced-motion (evitar animação de subida quando desligada)',
    ],
    contrastMin: '3:1 do botão contra o fundo da página; 4.5:1 do ícone sobre o botão',
  },

  aiHints: {
    keywords: [
      'scrolltop', 'voltar ao topo', 'ir para o topo', 'back to top', 'botão de topo', 'botao de topo',
      'subir', 'rolar para o topo', 'topo da página', 'topo da pagina',
    ],
    selectionCriteria:
      'Escolha ScrollTop para um botão flutuante "voltar ao topo" em páginas/listas longas, exibido após rolar além de um limite. Página curta não precisa; navegar entre seções = âncoras/links; controle de posição = não é o papel dele.',
    disambiguation: [
      { confundeCom: 'button', criterio: 'Button é ação genérica em qualquer lugar; ScrollTop é o botão flutuante específico que só aparece após rolar e leva ao topo.' },
      { confundeCom: 'icon-button', criterio: 'IconButton é um botão-ícone qualquer; ScrollTop já traz o comportamento de mostrar/esconder por scroll e a ação de subir.' },
      { confundeCom: 'paginator', criterio: 'Paginator troca de página de dados; ScrollTop só reposiciona a rolagem da página atual no topo.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/scrolltop',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída = `<button>` real com rótulo acessível; a camada Nephos exige buttonAriaLabel e respeito a prefers-reduced-motion no behavior smooth.',
  },
};
