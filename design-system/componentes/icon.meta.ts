/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · icon.meta.ts — ONDA 1 (primitivo) · set = FONT AWESOME 7
 * ─────────────────────────────────────────────────────────────
 * origin: 'nephos-own' → o set de ícones do Nephos é o **Font Awesome
 * 7** (licença Pro), NÃO o PrimeIcons. É decisão de fundação nossa
 * (confirmada pela Indiane em 27/07). Verificado no pacote real
 * (@fortawesome/fontawesome-free 7.3.1: classes `fa-solid`/`fa-regular`/
 * `fa-brands`, pesos 900/400; o Pro acrescenta light/thin/duotone/sharp).
 *
 * Sintaxe FA7 (web font): `<i class="fa-solid fa-<nome>"></i>`.
 * Estilo padrão de UI no Nephos = **solid** (`fa-solid`). O Pro também
 * traz regular/light/thin/duotone/sharp — usar só com intenção.
 *
 * A regra que decide TUDO na acessibilidade continua a mesma: o ícone é
 * DECORATIVO (acompanha um texto) ou SIGNIFICATIVO (é a única
 * informação)?
 *
 * ✅ DECISÃO FECHADA (Indiane, 27/07): TODOS os ícones são Font Awesome —
 * inclusive os INTERNOS dos componentes PrimeNG (setinha do dropdown, X
 * do dialog, toggler da árvore etc.), que são SOBRESCRITOS para FA via os
 * templates de ícone de cada componente e/ou a config de ícone do tema.
 * Não se usa PrimeIcons em lugar nenhum.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const iconMeta: NephosComponentMeta = {
  identity: {
    id: 'icon',
    name: 'Icon',
    category: 'atom',
    status: 'stable',
    version: '2.0.0', // 2.0.0 = migração PrimeIcons → Font Awesome 7 (27/07)
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Símbolo gráfico do set Font Awesome 7 que reforça ou representa um significado.',
    whenToUse: [
      'Reforçar visualmente um texto/ação (ícone ao lado do rótulo de um botão).',
      'Representar uma ação em espaço denso, sempre com nome acessível (botão de ícone).',
      'Sinalizar status/tipo junto de uma mensagem (info, alerta, sucesso).',
    ],
    whenNotToUse: [
      'Como único sinal de status sem texto ou aria-label — a informação não chega a todos.',
      'Ilustração grande/expressiva — isso é imagem/ilustração, não ícone de UI.',
      'Ícone sem correspondente no set Font Awesome — pedir ao time de DS, não inventar nem misturar outro set.',
    ],
  },

  api: {
    // O ícone é a fonte Font Awesome aplicada por classe; "inputs" = os
    // atributos que o Moses decide ao emitir o HTML.
    inputs: [
      {
        name: 'name',
        type: "string (nome Font Awesome, ex.: 'magnifying-glass', 'xmark', 'trash-can')",
        default: '(obrigatório)',
        description: 'O nome do ícone no set Font Awesome — vira a classe `fa-<estilo> fa-<name>`. Escolher pelo significado. Nomes em kebab-case; validar no catálogo oficial (fontawesome.com/icons), pois nomes mudaram entre FA5→6→7 (ex.: `search`→`magnifying-glass`, `times`→`xmark`, `trash`→`trash-can`, `pencil`→`pen-to-square`, `home`→`house`, `info-circle`→`circle-info`).',
      },
      {
        name: 'style',
        type: "'solid' | 'regular' | 'light' | 'thin' | 'duotone'",
        default: 'solid',
        description: 'A família FA7. `fa-solid` é o padrão de UI do Nephos. `regular`/`light`/`thin`/`duotone` vêm com a licença Pro — usar com intenção (não misturar estilos na mesma tela sem motivo).',
      },
      {
        name: 'decorative',
        type: 'boolean',
        default: 'true',
        description: 'true = decorativo (acompanha um texto): esconder do leitor de tela com `aria-hidden="true"`. false = significativo (é a única informação): precisa de nome acessível (aria-label no elemento pai ou texto visível).',
      },
      {
        name: 'fixedWidth',
        type: 'boolean',
        default: 'false',
        description: 'Aplica `fa-fw` (largura fixa) para alinhar ícones em listas/menus, mesmo com larguras diferentes.',
      },
      {
        name: 'spin',
        type: 'boolean',
        default: 'false',
        description: 'Animação de rotação (classe `fa-spin`), só para o ícone de carregando (ex.: `fa-spinner`). Respeitar `prefers-reduced-motion`.',
      },
    ],
    outputs: [],
    slots: [],
    states: ['default', 'spin'],
    invalidCombinations: [
      {
        combo: 'ícone significativo (decorative=false) sem nome acessível',
        porque: 'Se o ícone é a única informação (ex.: botão só com lixeira) e não tem aria-label, quem usa leitor de tela não sabe o que faz.',
      },
      {
        combo: 'ícone decorativo sem `aria-hidden="true"`',
        porque: 'O leitor de tela tenta anunciar um símbolo sem significado próprio, duplicando ou poluindo a leitura do texto que ele acompanha.',
      },
      {
        combo: 'misturar Font Awesome com outro set de ícones (ex.: PrimeIcons) no conteúdo',
        porque: 'Quebra a consistência visual; o set de conteúdo do Nephos é Font Awesome, um só.',
      },
      {
        combo: 'cor da marca (primary) num ícone puramente decorativo',
        porque: 'Primary significa ação; num ícone decorativo vira ruído e sugere interatividade que não existe.',
      },
    ],
  },

  relationships: {
    parents: ['button', 'message', 'tag', 'input-icon', 'menu', 'link'],
    children: [],
    commonlyUsedWith: ['button', 'inputtext', 'message', 'tag'],
    partOfPatterns: ['icon-button', 'search-input', 'form-field', 'navigation'],
  },

  tokens: {
    typography: 'tamanho segue o font-size do contexto (usar `em`); utilitários FA `fa-xs…fa-2xl` quando preciso',
    byState: {
      default: { color: 'surface/text-muted' },
      onAction: { color: 'primary/color' },
    },
    note: 'Cor herda do contexto (`text.color`/`text.mutedColor`) ou acompanha a severidade da mensagem/tag. Só recebe `primary` quando faz parte de uma ação (dentro de botão/link). Font Awesome escala pela fonte — não fixar px/hex.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar ícone como único sinal de status/ação sem nome acessível.',
      porque: 'A forma sozinha não é lida pela tecnologia assistiva nem entendida por todos.',
      emVezDisso: 'Texto visível ao lado; ou, em botão de ícone, `aria-label` claro no botão + `aria-hidden` no ícone.',
    },
    {
      regra: 'Nunca deixar ícone decorativo audível ao leitor de tela.',
      porque: 'Ele duplica ou polui a leitura do texto que acompanha.',
      emVezDisso: '`aria-hidden="true"` no ícone quando ele só reforça um texto já presente.',
    },
    {
      regra: 'Nunca inventar/importar um ícone fora do set Font Awesome (nem misturar com PrimeIcons).',
      porque: 'Quebra a consistência visual e a identidade do sistema; o set de conteúdo é FA7, um só.',
      emVezDisso: 'Escolher o mais próximo no catálogo FA (`fa-<name>`); se não existir, pedir ao time de DS.',
    },
    {
      regra: 'Nunca escolher o ícone pela forma bonita em vez do significado.',
      porque: 'Ícone ambíguo confunde — a pessoa interpreta a ação errada.',
      emVezDisso: 'Escolher pelo significado convencional (lixeira = excluir, lápis = editar) e acompanhar de texto quando houver risco de dúvida.',
    },
  ],

  examples: {
    angular: `<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>`,
    html: `<!-- decorativo, ao lado de um texto -->
<button type="button">
  <i class="fa-solid fa-check" aria-hidden="true"></i> Salvar
</button>`,
    inContext: `<!-- botão só de ícone: nome acessível no botão, ícone escondido -->
<button type="button" aria-label="Excluir bolsa">
  <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
</button>

<!-- ícone de status junto de uma mensagem -->
<div role="status">
  <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
  <span>Registros atualizados.</span>
</div>`,
  },

  a11y: {
    role: 'img quando significativo e isolado; nenhum quando decorativo (aria-hidden)',
    keyboard: ['o ícone não é focável; quem recebe foco é o controle que o contém (botão/link)'],
    requiredAria: [
      'decorativo: `aria-hidden="true"`',
      'significativo isolado: `role="img"` + `aria-label`, ou nome no controle pai',
      'botão de ícone: `aria-label` no `<button>` e `aria-hidden` no `<i>`',
    ],
    contrastMin: '3:1 do ícone que carrega informação sobre o fundo (ícone é elemento gráfico não-textual)',
  },

  aiHints: {
    keywords: [
      'ícone', 'icone', 'icon', 'símbolo', 'simbolo', 'fa', 'font awesome', 'fontawesome',
      'lupa', 'lixeira', 'lápis', 'lapis', 'check', 'seta', 'glifo', 'pictograma',
    ],
    selectionCriteria:
      'Use Icon do set Font Awesome 7 (`fa-solid fa-<name>`) para reforçar um texto/ação. Decida cedo: decorativo (aria-hidden) ou significativo (precisa de nome acessível). Escolha o ícone pelo significado; valide o nome no catálogo FA (nomes mudaram no FA6/7). Fora do set → pedir, não inventar.',
    disambiguation: [
      { confundeCom: 'image', criterio: 'Ilustração/foto expressiva = Image; Icon é símbolo pequeno de UI do set Font Awesome.' },
      { confundeCom: 'avatar', criterio: 'Representa uma pessoa/entidade = Avatar; Icon representa ação/conceito.' },
      { confundeCom: 'button', criterio: 'Se é clicável, o interativo é o Button (com aria-label) e o ícone é decoração dentro dele.' },
    ],
  },

  references: {
    primengDocs: 'https://fontawesome.com/icons (catálogo oficial — set = Font Awesome 7 Pro, licenciado)',
    figmaNode: 'https://www.figma.com/design/aGGHG7hvH68sTKVIhh0mDs', // Iconography v3 (histórico)
    deltaFromPrimeng: 'O set de ícones do Nephos é Font Awesome (última versão, Pro), NÃO o PrimeIcons padrão do PrimeNG. DECISÃO FECHADA (Indiane, 27/07): TODOS os ícones são FA — os de CONTEÚDO (que o Moses emite) E os INTERNOS dos componentes PrimeNG, sobrescritos para FA via templates de ícone e/ou config de ícone do tema. Sem PrimeIcons em lugar nenhum.',
  },
};
