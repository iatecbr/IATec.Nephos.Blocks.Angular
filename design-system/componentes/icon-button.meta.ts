/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · icon-button.meta.ts — ONDA 5 (variação fina)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → é o MESMO Button (`p-button`) com só um ícone e
 * sem rótulo de texto. Ficha fina que aponta para `button.meta.ts` e
 * fixa a regra crítica: sem texto visível, o botão PRECISA de
 * `aria-label`. O ícone é Font Awesome — ver `icon.meta.ts`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const iconButtonMeta: NephosComponentMeta = {
  identity: {
    id: 'icon-button',
    name: 'Icon Button',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Botão representado só por um ícone, sem rótulo de texto visível.',
    whenToUse: [
      'Ações frequentes e reconhecíveis em espaço denso (fechar, editar, mais opções).',
      'Barras de ferramentas e cabeçalhos onde o texto não cabe.',
    ],
    whenNotToUse: [
      'Ação principal ou pouco óbvia — use Button com texto.',
      'Quando o ícone é ambíguo — o texto evita erro de interpretação.',
      'Navegação (há destino) — use Link.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'icon',
        type: 'string (classe Font Awesome, ex.: "fa-solid fa-pen-to-square")',
        default: '(obrigatório)',
        description: 'O ícone da ação. Segue `icon.meta.ts` (Font Awesome). Escolher pelo significado convencional.',
      },
      {
        name: 'aria-label',
        type: 'string',
        default: '(obrigatório)',
        description: 'O NOME da ação (ex.: "Editar bolsa"). Obrigatório: sem texto visível, é a única forma de o botão ter nome acessível.',
      },
      {
        name: 'severity',
        type: "'primary' | 'secondary' | 'success' | 'warn' | 'danger' | 'help' | 'contrast'",
        default: 'primary',
        description: 'Ênfase/intenção, igual ao Button. Ver `button.meta.ts`.',
      },
      {
        name: 'variant',
        type: "'text' | 'outlined' | (preenchido)",
        default: '(preenchido)',
        description: 'Aparência. `text` (fantasma) é comum para ícones em barras; ver `button.meta.ts`.',
      },
      {
        name: 'rounded',
        type: 'boolean',
        default: 'false',
        description: 'Formato circular — comum para botão de ícone.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Desabilita. Se o motivo não é óbvio, explicar no contexto (ou usar Tooltip).',
      },
    ],
    outputs: [
      { name: 'onClick', payload: 'MouseEvent', description: 'Emitido ao acionar (clique/Enter/Espaço).' },
    ],
    slots: [],
    states: ['default', 'hover', 'focus', 'active', 'disabled'],
    invalidCombinations: [
      {
        combo: 'icon-button sem aria-label',
        porque: 'Sem texto visível e sem aria-label, o botão não tem nome — inutilizável no leitor de tela.',
      },
      {
        combo: 'ícone ambíguo sem tooltip nem texto',
        porque: 'A ação fica adivinhada; aumenta o erro.',
      },
    ],
  },

  relationships: {
    parents: ['toolbar', 'card', 'menubar', 'table', 'dialog'],
    children: ['icon'],
    commonlyUsedWith: ['tooltip', 'icon'],
    partOfPatterns: ['toolbar', 'row-actions', 'dialog-header'],
  },

  tokens: {
    typography: '—',
    byState: {
      default: { color: 'primary/color' },
      hover: { background: 'primary/50' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Herda todos os tokens do Button (formField/altura/raio do PrimeNG). A cor segue a severity. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca criar um botão de ícone sem aria-label.',
      porque: 'Sem texto visível, o aria-label é o único nome acessível — sem ele o botão é anônimo.',
      emVezDisso: 'aria-label com o verbo da ação ("Excluir", "Editar") e o ícone aria-hidden.',
    },
    {
      regra: 'Nunca usar botão de ícone para ação ambígua/rara.',
      porque: 'Ícone pouco convencional vira adivinhação.',
      emVezDisso: 'Button com texto, ou ao menos um Tooltip reforçando o mesmo nome do aria-label.',
    },
    {
      regra: 'Nunca reduzir a área de toque abaixo do mínimo confortável.',
      porque: 'Ícone pequeno demais é difícil de acertar, especialmente no toque.',
      emVezDisso: 'Manter a área de alvo adequada (o Button do PrimeNG já traz o tamanho).',
    },
  ],

  examples: {
    angular: `<p-button icon="fa-solid fa-pen-to-square" [rounded]="true" variant="text"
  ariaLabel="Editar bolsa" (onClick)="editar()" />`,
    html: `<button type="button" aria-label="Editar bolsa">
  <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
</button>`,
    inContext: `<!-- ações de linha numa tabela + tooltip reforçando o nome -->
<button type="button" aria-label="Excluir bolsa" pTooltip="Excluir" tooltipEvent="both">
  <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
</button>`,
  },

  a11y: {
    role: 'button',
    keyboard: ['Tab foca', 'Enter/Espaço aciona'],
    requiredAria: [
      'aria-label obrigatório (nome da ação)',
      'ícone com aria-hidden',
      'estado desabilitado comunicado (disabled/aria-disabled)',
    ],
    contrastMin: '3:1 do ícone e do foco; 4.5:1 se houver texto',
  },

  aiHints: {
    keywords: [
      'botão de ícone', 'botao de icone', 'icon button', 'botão só ícone', 'botao so icone',
      'fechar', 'editar', 'excluir', 'mais opções', 'mais opcoes', 'ação compacta', 'acao compacta',
    ],
    selectionCriteria:
      'Escolha Icon Button (um botão de ícone isolado) para ações frequentes e reconhecíveis em espaço denso — sempre com aria-label. Ação principal/ambígua = Button com texto; navegação = Link; ícone colado a um campo = InputGroup.',
    disambiguation: [
      { confundeCom: 'button', criterio: 'É o mesmo Button, só que sem texto visível — por isso o aria-label é obrigatório.' },
      { confundeCom: 'icon', criterio: 'Icon sozinho não é clicável; Icon Button é a ação (o interativo é o botão).' },
      { confundeCom: 'link', criterio: 'Se há destino (navega), é Link; Icon Button dispara ação.' },
      { confundeCom: 'inputgroup', criterio: 'Icon Button é um botão de ícone isolado (uma ação); InputGroup cola ícone/texto/botão a um campo de entrada.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/button#icononly',
    deltaFromPrimeng: 'É o Button (origin: primeng) em modo só-ícone. Delta = regra dura de aria-label + ícone Font Awesome (`icon.meta.ts`). Contrato completo do Button em `button.meta.ts`.',
  },
};
