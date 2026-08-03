/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · terminal.meta.ts — ONDA "Nicho" (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → usado direto. API lida do código real
 * (primeng@21.0.2, `types/primeng-terminal.d.ts`).
 *
 * ⚠️ Nicho. Emula um terminal de comandos de texto. Os comandos e as
 * respostas trafegam por um serviço (TerminalService), não por inputs.
 * Raramente é o componente certo num painel administrativo comum —
 * confira `whenNotToUse` antes de escolher.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const terminalMeta: NephosComponentMeta = {
  identity: {
    id: 'terminal',
    name: 'Terminal',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Emula um terminal de texto onde a pessoa digita comandos e recebe respostas.',
    whenToUse: [
      'Console de comandos para usuários técnicos (diagnóstico, ferramentas internas).',
      'Interface tipo linha de comando dentro do app, quando esse é o modelo mental esperado.',
    ],
    whenNotToUse: [
      'Coletar dados estruturados — use formulário com campos.',
      'Mostrar logs somente leitura — use uma área de texto/rolagem, não um terminal interativo.',
      'Ações comuns de UI (a maioria dos casos) — botões e menus são mais acessíveis.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'welcomeMessage',
        type: 'string',
        default: 'undefined',
        description: 'Texto inicial exibido quando o terminal abre (ex.: instrução ou boas-vindas).',
      },
      {
        name: 'prompt',
        type: 'string',
        default: 'undefined',
        description: 'Rótulo do prompt que antecede cada linha de comando (ex.: "$" ou "moses>").',
      },
    ],
    outputs: [],
    slots: [],
    states: ['default', 'focus', 'processing'],
    invalidCombinations: [
      {
        combo: 'terminal para tarefa que um formulário resolve',
        porque: 'Linha de comando exige memorizar sintaxe e é menos acessível que campos rotulados.',
      },
      {
        combo: 'terminal sem tratar/validar o comando digitado',
        porque: 'Entrada livre sem tratamento vira fonte de erro e de risco (comando desconhecido).',
      },
    ],
  },

  relationships: {
    parents: ['card', 'panel'],
    children: ['text'],
    commonlyUsedWith: ['card', 'heading', 'toolbar'],
    partOfPatterns: ['developer-tools', 'command-console'],
  },

  tokens: {
    typography: 'body-sm',
    byState: {
      default: { background: 'surface/900', text: 'surface/0', prompt: 'primary/color' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Fundo escuro (surface/900) com texto claro é a convenção de terminal; o prompt destaca com primary. Fonte monoespaçada quando disponível. Geometria herda do PrimeNG. Nunca hex nem nome de marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar Terminal para o que um formulário resolve.',
      porque: 'Exige decorar comandos e é menos acessível; a maioria dos usuários não espera CLI.',
      emVezDisso: 'Formulário com campos rotulados; Terminal só quando o público é técnico e espera linha de comando.',
    },
    {
      regra: 'Nunca deixar a entrada de comando sem rótulo acessível.',
      porque: 'É um campo de texto; sem rótulo o leitor de tela não anuncia o que digitar.',
      emVezDisso: 'aria-label no campo de comando (ex.: "Digite um comando").',
    },
    {
      regra: 'Nunca executar comando digitado sem validar/limitar o conjunto permitido.',
      porque: 'Entrada livre convida erro e comandos indevidos.',
      emVezDisso: 'Lista de comandos conhecidos com resposta clara para o desconhecido.',
    },
  ],

  examples: {
    angular: `<p-terminal welcomeMessage="Bem-vindo" prompt="moses $"></p-terminal>`,
    html: `<section role="group" aria-label="Terminal de comandos">
  <p>Bem-vindo</p>
  <label for="cmd">Digite um comando</label>
  <input id="cmd" type="text" autocomplete="off" aria-describedby="cmd-help" />
  <small id="cmd-help">Ex.: ajuda, status, limpar</small>
</section>`,
    inContext: `<!-- terminal dentro de uma ferramenta interna -->
<article data-block="card">
  <h3>Console de diagnóstico</h3>
  <section role="group" aria-label="Terminal de comandos">
    <p>Digite "ajuda" para ver os comandos.</p>
    <label for="cmd">Comando</label>
    <input id="cmd" type="text" autocomplete="off" />
  </section>
</article>`,
  },

  a11y: {
    role: 'group com campo de texto (textbox) para o comando',
    keyboard: ['Enter envia o comando', 'digitação normal no campo', 'Tab entra e sai'],
    requiredAria: [
      'aria-label no campo de comando',
      'agrupar a área com role="group" e rótulo',
      'respostas anunciadas (aria-live) quando o retorno é dinâmico',
    ],
    contrastMin: '4.5:1 do texto sobre o fundo escuro; foco visível no campo',
  },

  aiHints: {
    keywords: [
      'terminal', 'console', 'linha de comando', 'cli', 'prompt de comando',
      'shell', 'command line', 'comandos', 'console de comandos',
    ],
    selectionCriteria:
      'Escolha Terminal apenas quando o público é técnico e o modelo mental esperado é linha de comando. Para a maioria das tarefas, prefira formulários, botões e menus.',
    disambiguation: [
      { confundeCom: 'textarea', criterio: 'Textarea coleta um texto; Terminal simula comandos com respostas em sequência.' },
      { confundeCom: 'editor', criterio: 'Editor é texto rico formatado; Terminal é entrada de comando em texto puro.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/terminal',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Comandos/respostas trafegam pelo TerminalService. Saída agrupa a área com rótulo acessível.',
  },
};
