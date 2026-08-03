/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · togglebutton.meta.ts — ONDA "FORMULÁRIO AVANÇADO"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-togglebutton`. API lida do código real
 * (primeng@21.0.2, `types/primeng-togglebutton.d.ts`).
 *
 * UM botão que alterna entre dois estados (ligado/desligado), com
 * rótulo e ícone próprios para cada estado. Fica "pressionado" quando
 * ligado. Saída = `<button aria-pressed>`. Diferente do ToggleSwitch
 * (que é um interruptor) e do SelectButton (que escolhe entre várias).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const toggleButtonMeta: NephosComponentMeta = {
  identity: {
    id: 'togglebutton',
    name: 'ToggleButton',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Botão único que alterna entre dois estados, com rótulo/ícone por estado.',
    whenToUse: [
      'Ligar/desligar uma opção que fica melhor como botão pressionável (ex.: "Mostrar concluídos").',
      'Alternância binária dentro de uma barra de ferramentas.',
    ],
    whenNotToUse: [
      'Configuração que aplica na hora e lê como interruptor — use ToggleSwitch.',
      'Escolher entre várias opções — use SelectButton.',
      'Escolha de formulário que vale ao salvar — use Checkbox.',
    ],
  },

  api: {
    inputs: [
      { name: 'onLabel', type: 'string', default: "'Yes'", description: 'Texto quando ligado (ex.: "Mostrando").' },
      { name: 'offLabel', type: 'string', default: "'No'", description: 'Texto quando desligado (ex.: "Mostrar").' },
      {
        name: 'onIcon / offIcon',
        type: 'string (classe Font Awesome)',
        default: '—',
        description: 'Ícone por estado (ex.: olho aberto/fechado). Segue `icon.meta.ts`.',
      },
      { name: 'iconPos', type: "'left' | 'right'", default: 'left', description: 'Lado do ícone em relação ao texto.' },
      {
        name: 'allowEmpty',
        type: 'boolean',
        default: 'true',
        description: 'Permite o estado "desligado" como neutro. Ver o modelo de valor do formulário.',
      },
      { name: 'size', type: "'small' | 'large'", default: '(normal)', description: 'Densidade.' },
      { name: 'fluid', type: 'boolean', default: 'false', description: 'Ocupa 100% da largura.' },
      { name: 'ariaLabel', type: 'string', default: '—', description: 'Nome acessível quando o texto por si não descreve a ação.' },
    ],
    outputs: [
      { name: 'onChange', payload: '{ originalEvent, checked }', description: 'O estado alternou.' },
    ],
    slots: [],
    states: ['off', 'on', 'hover', 'focus', 'disabled'],
    invalidCombinations: [
      {
        combo: 'ToggleButton para configuração que aplica imediatamente e "é" um interruptor',
        porque: 'Um interruptor comunica melhor "ligado/desligado com efeito imediato" — esse caso é ToggleSwitch.',
      },
      {
        combo: 'rótulos que não deixam claro o estado atual',
        porque: 'Se on/off dizem a mesma coisa, a pessoa não sabe em que estado está.',
      },
    ],
  },

  relationships: {
    parents: ['toolbar', 'form-field', 'filters'],
    children: ['icon'],
    commonlyUsedWith: ['icon', 'button'],
    partOfPatterns: ['toolbar', 'filters'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      off: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      on: { background: 'primary/color', text: 'surface/0' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Ligado = ênfase da marca (primary preenchido); desligado = neutro. Herda do Button/PrimeNG. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar ToggleButton onde um interruptor comunica melhor.',
      porque: 'Configuração de efeito imediato lê melhor como ToggleSwitch.',
      emVezDisso: 'ToggleSwitch para "ligar/desligar um estado ativo"; ToggleButton quando a ação lê como botão.',
    },
    {
      regra: 'Nunca deixar o estado ambíguo (on/off iguais).',
      porque: 'A pessoa não sabe se está ligado.',
      emVezDisso: 'Rótulos/ícones distintos por estado + aria-pressed.',
    },
    {
      regra: 'Nunca comunicar o estado só pela cor.',
      porque: 'Quem não distingue cores não percebe se está pressionado.',
      emVezDisso: 'aria-pressed + mudança de rótulo/ícone além da cor.',
    },
  ],

  examples: {
    angular: `<p-togglebutton [(ngModel)]="mostrarConcluidos"
  onLabel="Mostrando concluídos" offLabel="Mostrar concluídos"
  onIcon="fa-solid fa-eye" offIcon="fa-solid fa-eye-slash"
  (onChange)="filtrar($event)" />`,
    html: `<button type="button" aria-pressed="false">
  <i class="fa-solid fa-eye-slash" aria-hidden="true"></i> Mostrar concluídos
</button>`,
    inContext: `<!-- alternância numa barra de ferramentas de lista -->
<div data-block="toolbar">
  <button type="button" aria-pressed="true">
    <i class="fa-solid fa-eye" aria-hidden="true"></i> Mostrando concluídos
  </button>
</div>`,
  },

  a11y: {
    role: 'button (com aria-pressed)',
    keyboard: ['Tab foca', 'Enter/Espaço alterna'],
    requiredAria: [
      'aria-pressed refletindo o estado',
      'nome acessível claro (texto do botão ou aria-label)',
      'ícone com aria-hidden',
    ],
    contrastMin: '4.5:1 do texto; 3:1 do estado pressionado e do foco',
  },

  aiHints: {
    keywords: [
      'togglebutton', 'botão de alternância', 'botao de alternancia', 'liga desliga', 'pressionado',
      'mostrar ocultar', 'ativar botão', 'alternar', 'on off botão',
    ],
    selectionCriteria:
      'Escolha ToggleButton para UM estado binário que lê como botão pressionável. Efeito imediato tipo interruptor = ToggleSwitch; escolher entre várias = SelectButton; escolha de formulário = Checkbox.',
    disambiguation: [
      { confundeCom: 'toggleswitch', criterio: 'ToggleSwitch é um interruptor (setting on/off imediato); ToggleButton é um botão que fica pressionado.' },
      { confundeCom: 'selectbutton', criterio: 'SelectButton escolhe entre várias opções; ToggleButton é um único on/off.' },
      { confundeCom: 'checkbox', criterio: 'Checkbox é escolha de formulário (vale ao salvar); ToggleButton é ação/estado imediato.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/togglebutton',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída = `<button aria-pressed>`; ícones Font Awesome (`icon.meta.ts`). Interruptor correlato em `toggleswitch.meta.ts`.',
  },
};
