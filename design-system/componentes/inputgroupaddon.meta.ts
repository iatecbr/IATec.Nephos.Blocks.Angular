/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · inputgroupaddon.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-inputgroup-addon`. API lida do código real
 * (primeng@21.0.2, `types/primeng-inputgroupaddon.d.ts`).
 *
 * ⚠️ Fidelidade: é o PREFIXO ou SUFIXO individual dentro de um
 * InputGroup — um "segmento" que carrega texto (R$, %), um ícone
 * (Font Awesome) ou um botão de ação. Só faz content-projection
 * (`["*"]`); os únicos inputs do código são `style`/`styleClass`
 * (cosméticos). NÃO existe sozinho: mora sempre dentro de
 * `inputgroup.meta.ts`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const inputGroupAddonMeta: NephosComponentMeta = {
  identity: {
    id: 'inputgroupaddon',
    name: 'InputGroupAddon',
    category: 'atom',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Prefixo ou sufixo de um InputGroup: um segmento com texto, ícone ou botão colado ao campo.',
    whenToUse: [
      'Colocar um símbolo/unidade fixo antes ou depois do campo (R$, %, @, kg, http://).',
      'Encaixar um ícone significativo no início/fim do campo dentro de um InputGroup.',
      'Prender um botão de ação (buscar, aplicar, copiar) na extremidade do campo.',
    ],
    whenNotToUse: [
      'Fora de um InputGroup — o addon só existe como segmento do grupo.',
      'Ícone puramente decorativo dentro do campo sem divisória — use IconField.',
      'Rótulo do campo — o addon não substitui o `<label>`.',
    ],
  },

  api: {
    inputs: [
      // O InputGroupAddon não expõe @Input de conteúdo. Do código real só
      // existem `style` e `styleClass` (cosméticos); o conteúdo (texto,
      // ícone ou botão) entra por content-projection (`["*"]`).
    ],
    outputs: [],
    slots: [
      { name: 'default', accepts: 'o conteúdo do segmento: texto curto (R$, %), um ícone Font Awesome ou um `<button>` de ação' },
    ],
    states: ['default'],
    invalidCombinations: [
      {
        combo: 'InputGroupAddon usado fora de um InputGroup',
        porque: 'O addon é um segmento do grupo; sozinho perde a borda unida e o sentido de prefixo/sufixo.',
      },
      {
        combo: 'addon com ação montada como texto/ícone clicável (sem `<button>`)',
        porque: 'Ação precisa de `<button>` real (foco, teclado, papel); um segmento clicável não-botão é inacessível.',
      },
    ],
  },

  relationships: {
    parents: ['inputgroup'],
    children: ['icon', 'button'],
    commonlyUsedWith: ['inputtext', 'button', 'icon'],
    partOfPatterns: ['search', 'form-field', 'form-submission'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      default: { background: 'surface/100', text: 'surface/text-muted', border: 'surface/300' },
    },
    note: 'O addon usa fundo/borda neutros de superfície (surface) para se distinguir do campo; dimensões/raio herdam do PrimeNG. Botão dentro do addon segue a cor do próprio botão. Sem hex, sem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar InputGroupAddon fora de um InputGroup.',
      porque: 'Ele é um segmento do grupo; isolado perde a borda unida e vira um retângulo sem função.',
      emVezDisso: 'Envolver campo + addons num InputGroup; se não há campo colado, usar o elemento próprio (Icon, Button).',
    },
    {
      regra: 'Nunca transformar um addon em ação sem usar `<button>`.',
      porque: 'Um ícone/texto clicável não recebe foco nem teclado e não é anunciado como ação.',
      emVezDisso: 'Um `<button type="button">` dentro do addon, com aria-label quando for só ícone.',
    },
    {
      regra: 'Nunca deixar um addon de ícone significativo sem nome acessível.',
      porque: 'Se o ícone carrega sentido (unidade, tipo do campo) e não há texto, quem usa leitor de tela não o percebe.',
      emVezDisso: 'Ícone decorativo → aria-hidden; ícone com significado → aria-label ou texto equivalente ligado ao campo.',
    },
  ],

  examples: {
    angular: `<p-inputgroup>
  <p-inputgroup-addon>R$</p-inputgroup-addon>
  <input pInputText id="preco" [(ngModel)]="preco" inputmode="decimal" />
  <p-inputgroup-addon>,00</p-inputgroup-addon>
</p-inputgroup>`,
    html: `<!-- addon = segmento; no HTML final é um <span> (texto/ícone) ou <button> (ação) -->
<label for="preco">Preço</label>
<div role="group">
  <span aria-hidden="true">R$</span>
  <input id="preco" type="text" inputmode="decimal" name="preco" />
  <span aria-hidden="true">,00</span>
</div>`,
    inContext: `<!-- addon de ação: botão colado ao fim do campo -->
<label for="cupom">Cupom</label>
<div role="group">
  <input id="cupom" type="text" name="cupom" />
  <button type="button">Aplicar</button>
</div>`,
  },

  a11y: {
    role: 'nenhum próprio (segmento visual); texto do addon deve ser legível e a ação deve ser um `<button>`',
    keyboard: ['segmento de texto/ícone não é focável; addon-botão recebe foco na ordem do DOM'],
    requiredAria: [
      'ícone significativo → aria-label ou texto equivalente; decorativo → aria-hidden',
      'addon de ação → `<button>` com nome acessível',
      'o `<label for>` do campo continua obrigatório (o addon não o substitui)',
    ],
    contrastMin: '4.5:1 do texto/ícone do addon sobre o fundo do segmento',
  },

  aiHints: {
    keywords: [
      'addon', 'prefixo', 'sufixo', 'segmento', 'R$', 'porcentagem', '%',
      'unidade', 'arroba', '@', 'símbolo do campo', 'simbolo do campo',
      'botão colado', 'botao colado', 'input group addon',
    ],
    selectionCriteria:
      'Escolha InputGroupAddon para o prefixo/sufixo individual (símbolo, unidade ou botão) SEMPRE dentro de um InputGroup. Se o ícone deve ficar solto dentro do campo sem divisória, é IconField, não Addon.',
    disambiguation: [
      { confundeCom: 'inputgroup', criterio: 'O InputGroup é o CONTÊINER; o Addon é cada segmento de prefixo/sufixo dentro dele.' },
      { confundeCom: 'iconfield', criterio: 'IconField cola o ícone por dentro do campo sem borda; o Addon é um segmento com divisória própria.' },
      { confundeCom: 'button', criterio: 'Quando o addon É uma ação, seu conteúdo é um Button real; o Addon só é a "célula" que o encaixa no grupo.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/inputgroup',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Inputs do código são só `style`/`styleClass` (cosméticos); o conteúdo entra por content-projection. Saída é HTML semântico (span de texto/ícone ou button).',
  },
};
