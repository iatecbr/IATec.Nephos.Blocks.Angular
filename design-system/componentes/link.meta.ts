/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · link.meta.ts — ONDA 1 (primitivo)
 * ─────────────────────────────────────────────────────────────
 * origin: 'nephos-own' → não existe como `p-*` no PrimeNG. É o `<a>`
 * de navegação, vestido pela cor da marca (primary).
 *
 * A fronteira mais importante do sistema: `<a>` NAVEGA (muda de lugar,
 * tem href), `<button>` AGE (dispara ação, sem href). Não trocar um
 * pelo outro — ver antiPatterns.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const linkMeta: NephosComponentMeta = {
  identity: {
    id: 'link',
    name: 'Link',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Navegação em texto — leva a outra página, seção ou recurso.',
    whenToUse: [
      'Ir para outro lugar: outra página, âncora na página, documento, e-mail/telefone.',
      'Referência inline dentro de um texto ("saiba mais").',
    ],
    whenNotToUse: [
      'Disparar uma AÇÃO (salvar, abrir modal, enviar) — use Button.',
      'Ação primária destacada de um formulário — use Button.',
      'Navegação de menu estruturada — use Menu/Menubar/Breadcrumb.',
    ],
  },

  api: {
    // Não é um componente PrimeNG: "inputs" = atributos do HTML semântico.
    inputs: [
      {
        name: 'href',
        type: 'string',
        default: '(obrigatório)',
        description: 'O destino. Se não há destino real, NÃO é link — é um Button. No Angular, navegação interna usa `routerLink` em vez de href.',
      },
      {
        name: 'external',
        type: 'boolean',
        default: 'false',
        description: 'Abre em nova aba (`target="_blank"`). Quando true, adicionar `rel="noopener noreferrer"` e avisar que abre em nova aba (texto ou ícone com aria-label).',
      },
      {
        name: 'variant',
        type: "'default' | 'muted' | 'inline'",
        default: 'default',
        description: '`default` = link primary autônomo; `inline` = dentro de um parágrafo (sublinhado para se distinguir do texto); `muted` = link secundário de baixa ênfase (ex.: rodapé).',
      },
    ],
    outputs: [],
    slots: [
      { name: 'default', accepts: 'texto do link (descritivo, nunca "clique aqui")' },
    ],
    states: ['default', 'hover', 'focus', 'visited'],
    invalidCombinations: [
      {
        combo: '`<a>` sem href/routerLink usado como botão',
        porque: 'Um link sem destino não é focável nem operável por teclado como se espera — quebra a navegação assistiva.',
      },
      {
        combo: 'texto do link genérico ("clique aqui", "leia mais") isolado',
        porque: 'Quem navega pela lista de links do leitor de tela ouve só o texto — "clique aqui" não diz para onde vai.',
      },
      {
        combo: 'external=true sem `rel="noopener noreferrer"`',
        porque: 'Abrir em nova aba sem noopener expõe a página de origem a manipulação pela página de destino.',
      },
    ],
  },

  relationships: {
    parents: ['text', 'card', 'page', 'breadcrumb'],
    children: [],
    commonlyUsedWith: ['text', 'button'],
    partOfPatterns: ['navigation', 'page-header', 'article', 'login'],
  },

  tokens: {
    typography: 'herda do texto ao redor (body-lg/body-sm)',
    byState: {
      default: { text: 'primary/color' },
      hover: { text: 'primary/hover' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Cor = ênfase da marca (`primary.color`); hover = `primary.hoverColor`; foco = `focusRing` do preset. É a ÚNICA cor de marca permitida em texto — porque é ação de navegação. Sublinhado no `inline` para distinguir do corpo sem depender só de cor.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar `<a>` para disparar ação nem `<button>` para navegar.',
      porque: 'Confunde teclado e tecnologia assistiva (link abre/segue, botão ativa) e quebra "abrir em nova aba" / voltar.',
      emVezDisso: '`<a href>` quando há destino; `<button>` quando dispara ação sem sair do lugar.',
    },
    {
      regra: 'Nunca escrever "clique aqui" / "leia mais" como texto do link.',
      porque: 'Fora de contexto (lista de links do leitor de tela) o texto não informa o destino.',
      emVezDisso: 'Texto descritivo do destino ("Ver histórico de bolsas").',
    },
    {
      regra: 'Nunca distinguir o link só pela cor.',
      porque: 'Quem não percebe a diferença de cor não identifica que é clicável.',
      emVezDisso: 'Sublinhado (ou outro sinal) além da cor, principalmente em link inline no meio do texto.',
    },
  ],

  examples: {
    angular: `<a routerLink="/bolsas/historico">Ver histórico de bolsas</a>`,
    html: `<a href="/bolsas/historico">Ver histórico de bolsas</a>`,
    inContext: `<!-- link inline dentro de texto + link externo sinalizado -->
<p>
  Veja o <a href="/relatorio">relatório completo</a> ou a
  <a href="https://adventistas.org" target="_blank"
     rel="noopener noreferrer">site institucional
     <span class="visually-hidden">(abre em nova aba)</span></a>.
</p>`,
  },

  a11y: {
    role: 'link',
    keyboard: ['Tab foca', 'Enter ativa/segue o destino'],
    requiredAria: [
      'texto descritivo do destino (nome acessível)',
      'link externo: avisar "abre em nova aba" (texto oculto ou aria-label)',
      'não usar `role="button"` num `<a>` que navega',
    ],
    contrastMin: '4.5:1 do texto do link; distinção do texto ao redor não pode ser só a cor',
  },

  aiHints: {
    keywords: [
      'link', 'a', 'âncora', 'ancora', 'navegar', 'ir para', 'href', 'hyperlink',
      'saiba mais', 'ver mais', 'abrir página', 'abrir pagina', 'redirecionar',
    ],
    selectionCriteria:
      'Use Link quando o objetivo é NAVEGAR (há um destino/href). Se o objetivo é AGIR (salvar, abrir modal, enviar), use Button — mesmo que visualmente pareça um link.',
    disambiguation: [
      { confundeCom: 'button', criterio: 'Link navega (href); Button age (sem href). Decida pela função, não pela aparência.' },
      { confundeCom: 'menubar', criterio: 'Vários links de navegação estruturada = Menu/Menubar; Link é um destino avulso.' },
      { confundeCom: 'breadcrumb', criterio: 'Trilha de navegação hierárquica = Breadcrumb; Link é um destino solto.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/button#link (variação link do Button, quando faz sentido)',
    deltaFromPrimeng: 'Primitivo Nephos: `<a>` semântico vestido com `primary`. O PrimeNG oferece um Button em modo link, mas navegação real deve ser `<a>`/routerLink.',
  },
};
