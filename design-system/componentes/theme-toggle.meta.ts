/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · theme-toggle.meta.ts — ONDA 5 (nosso)
 * ─────────────────────────────────────────────────────────────
 * origin: 'nephos-own' → não existe no PrimeNG. Alterna claro/escuro
 * usando o `darkModeSelector: '.app-dark'` (já configurado no repo) —
 * liga/desliga a classe na raiz; o `@primeuix/themes` remapeia o
 * `colorScheme` sozinho. Ícones sol/lua = Font Awesome (`icon.meta.ts`).
 *
 * ⚠️ NÃO confundir com a troca de MARCA: aqui muda o `surface`
 * (claro/escuro), não o `primary` (vertical). São os dois eixos do
 * sistema (ver `design.md`).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const themeToggleMeta: NephosComponentMeta = {
  identity: {
    id: 'theme-toggle',
    name: 'Theme Toggle',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'nephos-own',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Botão que alterna a interface entre modo claro e escuro.',
    whenToUse: [
      'Dar à pessoa controle sobre claro/escuro (topo do app ou preferências).',
      'Complementar a preferência do sistema com uma escolha manual.',
    ],
    whenNotToUse: [
      'Trocar a marca/vertical — a vertical vem do CONTEXTO (tema ativo), não é um controle de usuário; muda `primary`, não o modo.',
      'Qualquer configuração que não seja o esquema de cor.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'mode',
        type: "'light' | 'dark'",
        default: '(preferência do sistema)',
        description: 'O modo atual. Inicia pela preferência do sistema (prefers-color-scheme) e passa a valer a escolha manual, persistida.',
      },
      {
        name: 'display',
        type: "'button' | 'switch'",
        default: 'button',
        description: '`button` alterna a cada clique (ícone sol/lua). `switch` expõe explicitamente ligado/desligado (role switch).',
      },
    ],
    outputs: [
      { name: 'modeChange', payload: "'light' | 'dark'", description: 'Emitido ao alternar — aplica a classe `.app-dark` na raiz e persiste a escolha.' },
    ],
    slots: [],
    states: ['light', 'dark', 'focus'],
    invalidCombinations: [
      {
        combo: 'toggle de tema sem nome acessível nem estado exposto',
        porque: 'Um botão só com ícone sol/lua, sem aria-label e sem estado, não diz o que faz nem em que modo está.',
      },
      {
        combo: 'ignorar a preferência do sistema no primeiro carregamento',
        porque: 'Começar sempre no claro contraria quem configurou o sistema no escuro (e pode ofuscar).',
      },
    ],
  },

  relationships: {
    parents: ['menubar', 'app-shell', 'settings'],
    children: ['icon', 'icon-button'],
    commonlyUsedWith: ['icon', 'logo', 'avatar'],
    partOfPatterns: ['app-shell', 'settings'],
  },

  tokens: {
    typography: '—',
    byState: {
      light: { icon: 'surface/text' },
      dark: { icon: 'surface/text' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Alterna o eixo `surface` (claro/escuro) via `.app-dark`; NÃO toca no `primary` (marca). O ícone segue a cor do texto. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca deixar o toggle sem nome acessível nem estado exposto.',
      porque: 'Um ícone sol/lua sozinho não diz a ação nem o modo atual.',
      emVezDisso: 'aria-label ("Alternar tema") + aria-pressed (button) ou role="switch"+aria-checked; ícone aria-hidden.',
    },
    {
      regra: 'Nunca começar ignorando a preferência do sistema.',
      porque: 'Quem escolheu escuro no sistema espera escuro; começar claro incomoda.',
      emVezDisso: 'Iniciar por prefers-color-scheme e respeitar a escolha manual depois (persistida).',
    },
    {
      regra: 'Nunca confundir o toggle de tema com a troca de marca.',
      porque: 'São eixos diferentes: modo = surface (claro/escuro); marca = primary (vertical).',
      emVezDisso: 'Manter dois controles distintos; este só mexe no esquema de cor.',
    },
  ],

  examples: {
    angular: `<p-button [rounded]="true" variant="text"
  [icon]="modo === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"
  [attr.aria-pressed]="modo === 'dark'"
  ariaLabel="Alternar tema claro e escuro"
  (onClick)="alternarTema()" />`,
    html: `<button type="button" aria-label="Alternar tema claro e escuro" aria-pressed="false">
  <i class="fa-solid fa-moon" aria-hidden="true"></i>
</button>`,
    inContext: `<!-- na barra de topo, ao lado do avatar -->
<div data-block="app-actions">
  <button type="button" aria-label="Alternar tema claro e escuro" aria-pressed="true">
    <i class="fa-solid fa-sun" aria-hidden="true"></i>
  </button>
  <span class="avatar" aria-hidden="true">IP</span>
</div>`,
  },

  a11y: {
    role: 'button (com aria-pressed) ou switch (com aria-checked)',
    keyboard: ['Tab foca', 'Enter/Espaço alterna'],
    requiredAria: [
      'nome acessível (aria-label "Alternar tema")',
      'estado: aria-pressed (button) ou aria-checked (switch)',
      'ícone sol/lua com aria-hidden',
    ],
    contrastMin: '3:1 do ícone e do foco em ambos os modos',
  },

  aiHints: {
    keywords: [
      'tema', 'theme', 'modo escuro', 'dark mode', 'modo claro', 'light mode',
      'alternar tema', 'sol', 'lua', 'claro escuro', 'dark light',
    ],
    selectionCriteria:
      'Use Theme Toggle para alternar claro/escuro (eixo surface). Iniciar pela preferência do sistema. A vertical, ao contrário, vem do contexto (tema ativo) e NÃO é um seletor de usuário — ela mexe no `primary`.',
    disambiguation: [
      { confundeCom: 'toggleswitch', criterio: 'ToggleSwitch é genérico liga/desliga; Theme Toggle é específico do esquema de cor (pode até usar um switch por baixo).' },
      { confundeCom: 'icon-button', criterio: 'Pode ser implementado como Icon Button, mas precisa expor o ESTADO (modo atual), não só a ação.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/theming (darkModeSelector: ".app-dark")',
    deltaFromPrimeng: 'Primitivo Nephos (nephos-own): usa o `darkModeSelector` do `@primeuix/themes` já configurado no repo. Não existe como componente no PrimeNG; ícones sol/lua = Font Awesome (`icon.meta.ts`).',
  },
};
