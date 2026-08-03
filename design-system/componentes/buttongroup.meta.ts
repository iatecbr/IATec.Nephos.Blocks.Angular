/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · buttongroup.meta.ts — família BOTÕES COMPOSTOS
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-buttongroup`. API lida do código real
 * (primeng@21.0.2, `types/primeng-buttongroup.d.ts`).
 *
 * ⚠️ Fidelidade: o ButtonGroup NÃO tem @Input nem @Output. É um
 * contêiner puro que projeta conteúdo (`["*"]`) e só GRUDA os botões
 * filhos visualmente (remove os cantos entre eles, junta as bordas).
 * Toda a variedade viaja nos Buttons de dentro — ver `button.meta.ts`.
 * Saída = um <div role="group"> com os <button> encostados.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const buttonGroupMeta: NephosComponentMeta = {
  identity: {
    id: 'buttongroup',
    name: 'ButtonGroup',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Agrupa botões relacionados encostados num único bloco visual coeso.',
    whenToUse: [
      'Duas ou mais ações da MESMA família que se leem melhor juntas (ex.: "Anterior / Próximo", "Recortar / Copiar / Colar").',
      'Barras de ferramentas onde botões relacionados devem parecer um só controle segmentado.',
      'Quando a proximidade visual comunica que os botões pertencem ao mesmo grupo de tarefa.',
    ],
    whenNotToUse: [
      'Escolher UM valor entre opções mutuamente exclusivas — use SelectButton (é um controle de seleção, não ações).',
      'Ação padrão + variações no menu — use SplitButton.',
      'Botões sem relação entre si — deixe-os separados com espaçamento normal, não grudados.',
      'Um único botão — use Button direto.',
    ],
  },

  api: {
    // O p-buttongroup NÃO expõe @Input nem @Output no código real (v21).
    // É um wrapper de projeção de conteúdo: a configuração toda mora nos
    // Buttons filhos. Ver `button.meta.ts` para os inputs de cada botão.
    inputs: [],
    outputs: [],
    slots: [
      { name: 'default', accepts: 'os botões relacionados a agrupar (p-button/<button>) — projetados via content projection' },
    ],
    states: ['default'],
    invalidCombinations: [
      {
        combo: 'ButtonGroup com botões de intenções conflitantes grudados (ex.: primary destrutivo + neutro)',
        porque: 'A proximidade sugere que pertencem ao mesmo grupo; misturar intenções contraditórias confunde a hierarquia.',
      },
      {
        combo: 'ButtonGroup usado para escolha de valor (comportamento de seleção única/múltipla)',
        porque: 'ButtonGroup só agrupa AÇÕES visualmente — não guarda seleção. Escolha de valor é SelectButton.',
      },
      {
        combo: 'Um único botão dentro do ButtonGroup',
        porque: 'Não há nada a agrupar; o wrapper só faz sentido com 2+ botões relacionados.',
      },
    ],
  },

  relationships: {
    parents: ['toolbar', 'card', 'datatable', 'form-actions'],
    children: ['button', 'icon-button'],
    commonlyUsedWith: ['button', 'icon-button', 'toolbar'],
    partOfPatterns: ['toolbar', 'row-actions'],
  },

  tokens: {
    // origin: 'primeng' → o ButtonGroup não tem cor própria; ele só ajusta
    // a geometria de junção (cantos internos zerados, bordas encostadas).
    // A cor de cada botão vem da severity do próprio Button.
    typography: 'button-lg',
    note: 'ButtonGroup não define cor. Ele herda do PrimeNG só a geometria de junção (raio interno zerado, bordas coladas) e delega toda cor/tipografia aos Buttons filhos (ver button.meta.ts). Cor por papel + passo, nunca hex nem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar ButtonGroup para escolher um valor (seleção única/múltipla).',
      porque: 'ButtonGroup não guarda estado de seleção — só cola botões de ação. Parecer um controle de escolha engana o usuário.',
      emVezDisso: 'SelectButton para escolha segmentada de UM valor; ButtonGroup só para agrupar ações.',
    },
    {
      regra: 'Nunca grudar no mesmo grupo botões de intenções conflitantes.',
      porque: 'A proximidade comunica pertencimento; juntar uma ação destrutiva a ações neutras embaralha a hierarquia.',
      emVezDisso: 'Agrupar só ações da mesma família; separar a ação destrutiva com espaçamento e ênfase próprios.',
    },
    {
      regra: 'Nunca deixar o grupo de ações sem nome acessível quando o contexto não é óbvio.',
      porque: 'Um bloco de botões colados sem rótulo de grupo não diz ao leitor de tela do que se trata.',
      emVezDisso: 'Um `role="group"` com aria-label/aria-labelledby descrevendo a família de ações.',
    },
    {
      regra: 'Nunca usar ButtonGroup para reunir uma ação padrão e suas variações num menu.',
      porque: 'ButtonGroup deixa todos os botões sempre visíveis; não colapsa alternativas num overlay.',
      emVezDisso: 'SplitButton quando há uma ação padrão + menu de variações.',
    },
  ],

  examples: {
    angular: `<p-buttongroup>
  <p-button label="Anterior" icon="fa-solid fa-chevron-left" severity="secondary" />
  <p-button label="Próximo" icon="fa-solid fa-chevron-right" iconPos="right" severity="secondary" />
</p-buttongroup>`,
    html: `<div role="group" aria-label="Navegação de páginas">
  <button type="button">
    <i class="fa-solid fa-chevron-left" aria-hidden="true"></i> Anterior
  </button>
  <button type="button">
    Próximo <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
  </button>
</div>`,
    inContext: `<!-- barra de formatação: ações relacionadas agrupadas -->
<div data-block="toolbar">
  <div role="group" aria-label="Formatação de texto">
    <button type="button" aria-label="Negrito">
      <i class="fa-solid fa-bold" aria-hidden="true"></i>
    </button>
    <button type="button" aria-label="Itálico">
      <i class="fa-solid fa-italic" aria-hidden="true"></i>
    </button>
    <button type="button" aria-label="Sublinhado">
      <i class="fa-solid fa-underline" aria-hidden="true"></i>
    </button>
  </div>
</div>`,
  },

  a11y: {
    role: 'group (contêiner dos botões; cada filho mantém role="button")',
    keyboard: [
      'Tab entra e percorre cada botão do grupo',
      'Enter/Espaço aciona o botão focado',
    ],
    requiredAria: [
      'aria-label / aria-labelledby no grupo quando o contexto não deixa claro do que é a família de ações',
      'cada botão mantém seu próprio nome acessível (texto visível ou aria-label se for só-ícone)',
    ],
    contrastMin: '4.5:1 entre texto e fundo de cada botão; 3:1 do foco e do ícone',
  },

  aiHints: {
    keywords: [
      'buttongroup', 'button group', 'grupo de botões', 'grupo de botoes', 'botões agrupados',
      'botoes agrupados', 'botões juntos', 'botoes juntos', 'ações relacionadas', 'acoes relacionadas',
      'barra de botões', 'barra de botoes', 'anterior próximo', 'anterior proximo',
    ],
    selectionCriteria:
      'Escolha ButtonGroup para GRUDAR visualmente 2+ botões de AÇÃO relacionados (mesma família de tarefa). Se é escolher UM valor entre opções, é SelectButton. Se é ação padrão + variações num menu, é SplitButton. Se é só um botão, é Button.',
    disambiguation: [
      { confundeCom: 'selectbutton', criterio: 'SelectButton guarda uma seleção (escolhe um valor); ButtonGroup só cola botões de ação sem estado de escolha.' },
      { confundeCom: 'splitbutton', criterio: 'SplitButton tem uma ação padrão + menu escondido; ButtonGroup deixa todas as ações sempre visíveis lado a lado.' },
      { confundeCom: 'toolbar', criterio: 'Toolbar é o contêiner maior de uma barra inteira (com espaçamentos e vários tipos de controle); ButtonGroup é o bloco compacto de botões encostados dentro dela.' },
      { confundeCom: 'button', criterio: 'Button é um botão só; ButtonGroup é o invólucro que junta vários botões relacionados.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/buttongroup',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Sem @Input/@Output: é wrapper de projeção de conteúdo. Saída = <div role="group"> com os <button> encostados. Só a geometria de junção vem do PrimeNG; a cor mora nos Buttons filhos (button.meta.ts).',
  },
};
