/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · datepicker.meta.ts — ONDA 3 (entrada avançada)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-datepicker`. API lida do código real
 * (primeng@21.0.2, `types/primeng-datepicker.d.ts`).
 *
 * Seleção de data (e opcionalmente hora) por calendário + campo. O
 * "time picker" NÃO é componente separado: é o MODO `timeOnly` deste
 * mesmo componente (decisão do grupo E — documentado aqui, sem ficha
 * órfã). Saída semântica = `<input>` com rótulo (type=date/time/…).
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const datePickerMeta: NephosComponentMeta = {
  identity: {
    id: 'datepicker',
    name: 'DatePicker',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Campo para escolher uma data (e opcionalmente hora) por calendário.',
    whenToUse: [
      'Coletar uma data: nascimento, vencimento, início de vigência.',
      'Escolher um intervalo (selectionMode="range") ou só a hora (timeOnly).',
    ],
    whenNotToUse: [
      'Texto/número comum — use InputText/InputNumber.',
      'Uma data muito conhecida e digitável rapidamente (ex.: ano só) — considerar um campo simples.',
      'Faixa de valores não-temporais — use Slider.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'selectionMode',
        type: "'single' | 'multiple' | 'range'",
        default: 'single',
        description: 'Uma data, várias datas soltas, ou um intervalo (início–fim).',
      },
      {
        name: 'showTime',
        type: 'boolean',
        default: 'false',
        description: 'Adiciona a seleção de HORA junto da data.',
      },
      {
        name: 'timeOnly',
        type: 'boolean',
        default: 'false',
        description: 'MODO "time picker": só hora, sem calendário. (É este input que cobre o "seletor de hora" — não há componente separado.)',
      },
      {
        name: 'hourFormat',
        type: "'12' | '24'",
        default: '24',
        description: 'Formato da hora. Seguir a convenção local (pt-BR usa 24h).',
      },
      {
        name: 'view',
        type: "'date' | 'month' | 'year'",
        default: 'date',
        description: 'Granularidade: dia, mês (mês/ano) ou ano. Usar `month` quando só o mês importa (ex.: competência).',
      },
      {
        name: 'dateFormat',
        type: 'string',
        default: "'mm/dd/yy'",
        description: 'Máscara de exibição. Ajustar ao local (pt-BR: `dd/mm/yy`). Mostrar o formato esperado no placeholder/ajuda.',
      },
      {
        name: 'minDate',
        type: 'Date',
        default: '—',
        description: 'Data mínima selecionável (bloqueia antes dela).',
      },
      {
        name: 'maxDate',
        type: 'Date',
        default: '—',
        description: 'Data máxima selecionável.',
      },
      {
        name: 'iconDisplay',
        type: "'input' | 'button'",
        default: 'button',
        description: 'Onde fica o ícone de calendário que abre o painel (dentro do campo ou como botão ao lado). O ícone segue `icon.meta.ts`.',
      },
      {
        name: 'inline',
        type: 'boolean',
        default: 'false',
        description: 'Mostra o calendário sempre aberto (sem campo/popup). Para quando a escolha é o foco da tela.',
      },
    ],
    outputs: [
      { name: 'onSelect', payload: 'Date | Date[]', description: 'Emitido ao escolher uma data/hora.' },
      { name: 'onClear', payload: 'void', description: 'Emitido ao limpar o valor (showClear).' },
      { name: 'onShow', payload: 'void', description: 'Emitido ao abrir o painel.' },
      { name: 'onClose', payload: 'void', description: 'Emitido ao fechar o painel.' },
      { name: 'onMonthChange', payload: '{ month, year }', description: 'Emitido ao navegar de mês (útil p/ carregar dias disponíveis).' },
    ],
    slots: [
      { name: 'date', accepts: 'template de célula de dia (ex.: marcar datas com evento)', optional: true },
    ],
    states: ['default', 'focus', 'open', 'filled', 'invalid', 'disabled', 'readonly'],
    invalidCombinations: [
      {
        combo: 'timeOnly=true junto com selectionMode="range"',
        porque: 'Intervalo pressupõe datas; só-hora não tem início/fim de calendário para formar um range.',
      },
      {
        combo: 'campo de data sem `<label>` e sem formato visível',
        porque: 'Sem rótulo é inacessível; sem o formato esperado a pessoa erra a digitação.',
      },
      {
        combo: 'minDate depois de maxDate',
        porque: 'Nenhuma data fica selecionável — o campo trava sem explicação.',
      },
    ],
  },

  relationships: {
    parents: ['form-field', 'floatlabel', 'filters'],
    children: ['icon'],
    commonlyUsedWith: ['label', 'helper-text', 'button'],
    partOfPatterns: ['form-submission', 'filters', 'form-field'],
  },

  tokens: {
    typography: 'body-lg (campo)',
    byState: {
      default: { border: 'surface/300', text: 'surface/text', background: 'surface/0' },
      focus: { border: 'primary/color', ring: 'focus/ring' },
      selected: { background: 'primary/color', text: 'surface/0' },
      invalid: { border: 'feedback.danger/500' },
    },
    note: 'Dia selecionado = ênfase da marca (primary); campo herda os tokens de formulário do PrimeNG (formField.*); painel herda overlay. Cor por papel + passo.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar campo de data sem rótulo e sem o formato esperado à vista.',
      porque: 'Inacessível sem rótulo; e sem o formato a pessoa digita errado e não entende o erro.',
      emVezDisso: '`<label for>` + o formato no placeholder/ajuda (ex.: "dd/mm/aaaa").',
    },
    {
      regra: 'Nunca oferecer só o clique no calendário, sem permitir digitar.',
      porque: 'Navegar meses a meses no calendário é lento e difícil no teclado, especialmente para datas distantes.',
      emVezDisso: 'Permitir digitar a data no campo além de escolher no calendário.',
    },
    {
      regra: 'Nunca sinalizar data inválida só pela cor da borda.',
      porque: 'Cor sozinha não é percebida por todos e não diz o que corrigir.',
      emVezDisso: 'Mensagem de texto ligada por aria-describedby + aria-invalid.',
    },
  ],

  examples: {
    angular: `<label for="venc">Vencimento</label>
<p-datepicker inputId="venc" [(ngModel)]="venc" dateFormat="dd/mm/yy"
  [minDate]="hoje" [showIcon]="true" (onSelect)="aplicar($event)" />

<!-- modo "time picker": só hora -->
<p-datepicker inputId="hora" [(ngModel)]="hora" [timeOnly]="true" hourFormat="24" />`,
    html: `<label for="venc">Vencimento</label>
<input id="venc" name="venc" type="date" aria-describedby="venc-ajuda" />
<small id="venc-ajuda">Formato: dd/mm/aaaa.</small>`,
    inContext: `<!-- intervalo de datas num filtro -->
<div data-block="form-field">
  <label for="periodo">Período</label>
  <input id="periodo" name="periodo" type="text"
         placeholder="dd/mm/aaaa – dd/mm/aaaa"
         aria-describedby="periodo-ajuda" />
  <small id="periodo-ajuda">Selecione a data inicial e a final.</small>
</div>`,
  },

  a11y: {
    role: 'combobox (campo) + dialog/grid (calendário)',
    keyboard: [
      'digitar a data no campo',
      'no calendário: setas movem entre dias, PageUp/Down troca mês, Enter seleciona, Esc fecha',
      'foco volta ao campo ao fechar',
    ],
    requiredAria: [
      '`<label for>` associado + formato visível',
      'aria-invalid + aria-describedby no erro',
      'calendário com nome acessível e datas anunciáveis; botão de abrir com aria-label',
    ],
    contrastMin: '4.5:1 do texto do campo e das datas; 3:1 do dia selecionado/foco',
  },

  aiHints: {
    keywords: [
      'data', 'date', 'calendário', 'calendario', 'datepicker', 'vencimento', 'período',
      'periodo', 'intervalo de datas', 'hora', 'time', 'seletor de data', 'seletor de hora',
    ],
    selectionCriteria:
      'Escolha DatePicker para coletar data/hora por calendário. Só-hora = mesmo componente com `timeOnly`. Intervalo = `selectionMode="range"`. Sempre com rótulo e formato visível.',
    disambiguation: [
      { confundeCom: 'inputtext', criterio: 'Se o valor é uma data, use DatePicker (teclado, validação e calendário próprios), não texto livre.' },
      { confundeCom: 'time-picker', criterio: 'O "seletor de hora" é este mesmo componente com `timeOnly=true` — não existe componente separado.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/datepicker',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). O modo time é `timeOnly`; ícone de calendário segue `icon.meta.ts`; saída = `<input>` com rótulo.',
  },
};
