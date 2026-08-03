/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · toggleswitch.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-toggleswitch`. API lida do código real
 * (primeng@21.0.2, `types/primeng-toggleswitch.d.ts`).
 *
 * A regra que decide entre Toggle e Checkbox: o Toggle aplica o efeito
 * NA HORA (liga/desliga um estado ativo). Checkbox marca uma escolha
 * que só vale quando o formulário é enviado. Ver disambiguation.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const toggleSwitchMeta: NephosComponentMeta = {
  identity: {
    id: 'toggleswitch',
    name: 'ToggleSwitch',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Interruptor liga/desliga que aplica um estado imediatamente.',
    whenToUse: [
      'Ativar/desativar uma configuração que passa a valer na hora (notificações, modo escuro).',
      'Estado binário com efeito imediato, sem botão de salvar.',
    ],
    whenNotToUse: [
      'Escolha que só vale ao enviar o formulário — use Checkbox.',
      'Aceite de termos/consentimento — use Checkbox.',
      'Mais de duas opções — use Radio ou Select.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'size',
        type: "'small' | 'large'",
        default: '(normal)',
        description: 'Densidade do interruptor. Omitir para o tamanho padrão.',
      },
      {
        name: 'readonly',
        type: 'boolean',
        default: 'false',
        description: 'Mostra o estado mas não deixa alternar. Diferente de disabled: continua legível/focável.',
      },
      {
        name: 'trueValue',
        type: 'any',
        default: 'true',
        description: 'Valor guardado quando ligado. Só mudar se o modelo de dados exige algo diferente de true/false.',
      },
      {
        name: 'falseValue',
        type: 'any',
        default: 'false',
        description: 'Valor guardado quando desligado.',
      },
      {
        name: 'inputId',
        type: 'string',
        default: '—',
        description: 'Id do controle interno, para o `<label for>` associar o rótulo.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: '—',
        description: 'Nome acessível quando não há rótulo visível ligado por inputId. Preferir sempre um rótulo visível.',
      },
    ],
    outputs: [
      { name: 'onChange', payload: '{ originalEvent, checked }', description: 'Emitido ao alternar. O efeito deve ser aplicado aqui (é imediato).' },
    ],
    slots: [],
    states: ['off', 'on', 'hover', 'focus', 'disabled', 'readonly'],
    invalidCombinations: [
      {
        combo: 'toggle que só tem efeito depois de um botão "Salvar"',
        porque: 'O toggle promete efeito imediato; se depende de salvar, a pessoa acha que já aplicou. Esse caso é Checkbox.',
      },
      {
        combo: 'toggle sem rótulo (nem visível nem ariaLabel)',
        porque: 'O leitor de tela anuncia "interruptor" sem dizer do quê.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'toolbar', 'settings-row'],
    children: [],
    commonlyUsedWith: ['label', 'helper-text'],
    partOfPatterns: ['settings', 'form-field'],
  },

  tokens: {
    typography: 'body-lg (do rótulo ao lado)',
    byState: {
      off: { track: 'surface/300', handle: 'surface/0' },
      on: { track: 'primary/color', handle: 'surface/0' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Trilha ligada = ênfase da marca (primary). Dimensões e raio herdam do PrimeNG. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar Toggle para algo que só vale após "Salvar".',
      porque: 'O interruptor sugere efeito imediato; a pessoa pensa que já aplicou e sai sem salvar.',
      emVezDisso: 'Checkbox quando a escolha faz parte de um formulário que é enviado depois.',
    },
    {
      regra: 'Nunca deixar o Toggle sem rótulo associado.',
      porque: 'Sozinho, não diz o que liga/desliga — inacessível e ambíguo.',
      emVezDisso: 'Rótulo visível ligado por inputId (ou, no mínimo, ariaLabel claro).',
    },
    {
      regra: 'Nunca depender só da posição/cor para indicar ligado/desligado.',
      porque: 'Quem não distingue cores pode não perceber o estado.',
      emVezDisso: 'Estado exposto por aria-checked (role switch) e, se útil, um texto "Ativado/Desativado".',
    },
  ],

  examples: {
    angular: `<p-toggleswitch [(ngModel)]="notificacoes" inputId="notif" (onChange)="salvarPreferencia($event)" />`,
    html: `<label for="notif">Notificações por e-mail</label>
<button role="switch" id="notif" aria-checked="true">
  <span class="visually-hidden">Ativado</span>
</button>`,
    inContext: `<!-- linha de configuração: rótulo à esquerda, interruptor à direita -->
<div data-block="settings-row">
  <span id="notif-lbl">Notificações por e-mail</span>
  <button role="switch" aria-checked="false" aria-labelledby="notif-lbl"></button>
</div>`,
  },

  a11y: {
    role: 'switch',
    keyboard: ['Tab foca', 'Espaço/Enter alterna'],
    requiredAria: [
      'aria-checked reflete o estado (true/false)',
      'nome acessível por `<label for>` (inputId) ou aria-label/aria-labelledby',
    ],
    contrastMin: '3:1 do interruptor e do estado em relação ao fundo; não depender só da cor',
  },

  aiHints: {
    keywords: [
      'toggle', 'switch', 'interruptor', 'liga', 'desliga', 'ligar', 'desligar',
      'ativar', 'desativar', 'on off', 'chave', 'preferência', 'preferencia', 'configuração',
    ],
    selectionCriteria:
      'Escolha ToggleSwitch para ligar/desligar algo com efeito IMEDIATO. Se a escolha só vale ao enviar o formulário, ou é consentimento, use Checkbox. Mais de duas opções: Radio/Select.',
    disambiguation: [
      { confundeCom: 'checkbox', criterio: 'Toggle = efeito imediato (estado ativo); Checkbox = escolha que vale ao salvar/enviar.' },
      { confundeCom: 'radiobutton', criterio: 'Toggle é binário; várias opções mutuamente exclusivas = Radio.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/toggleswitch',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Saída semântica = controle com role="switch"; só a cor da marca entra pelo tema.',
  },
};
