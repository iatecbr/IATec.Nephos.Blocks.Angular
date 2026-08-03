/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · inputgroup.meta.ts — ONDA 2 (componente PrimeNG)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-inputgroup`. API lida do código real
 * (primeng@21.0.2, `types/primeng-inputgroup.d.ts`).
 *
 * ⚠️ Fidelidade: é um INVÓLUCRO de layout que agrupa, numa mesma
 * linha, um campo (InputText, Select…) e um ou mais ADDONS
 * (InputGroupAddon: ícone, texto ou botão). Só faz content-projection
 * (`["*"]`) — NÃO tem @Input próprio de conteúdo. O único input do
 * código é `styleClass` (DEPRECADO desde v20 em favor de `class`) e o
 * modificador visual `fluid` propaga dos filhos. O par obrigatório é
 * `inputgroupaddon.meta.ts`.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const inputGroupMeta: NephosComponentMeta = {
  identity: {
    id: 'inputgroup',
    name: 'InputGroup',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Invólucro que agrupa um campo e seus addons (ícone, texto ou botão) numa única linha visualmente unida.',
    whenToUse: [
      'Prefixar/sufixar o campo com um símbolo fixo (R$, %, @, http://) ou uma unidade.',
      'Colar um botão de ação ao campo (buscar, aplicar, copiar) mantendo tudo na mesma linha.',
      'Combinar ícone + campo + botão quando devem parecer uma peça só.',
    ],
    whenNotToUse: [
      'Só quer um ícone DENTRO do campo (sem borda separando) — use IconField.',
      'Só quer o rótulo economizando espaço — use FloatLabel ou IftaLabel.',
      'Um campo simples sem prefixo/sufixo nem botão colado — use o campo direto (InputText).',
    ],
  },

  api: {
    inputs: [
      // O InputGroup não expõe @Input de conteúdo (só content-projection).
      // O modificador `fluid` não é input próprio: propaga do campo filho
      // e liga a classe `p-inputgroup-fluid` no root. Documentado como
      // comportamento, não como propriedade a ser escrita aqui.
    ],
    outputs: [],
    slots: [
      { name: 'default', accepts: 'a sequência campo + addons (InputText/Select + InputGroupAddon), na ordem visual desejada' },
    ],
    states: ['default'],
    invalidCombinations: [
      {
        combo: 'InputGroup com o campo sem `<label>` associado',
        porque: 'O agrupamento é só visual; o campo continua precisando de rótulo próprio, senão o leitor de tela não o anuncia.',
      },
      {
        combo: 'addon interativo montado como `<span>`/`<div>` clicável em vez de `<button>`',
        porque: 'Ação dentro do grupo tem que ser um `<button>` de verdade (foco, teclado, papel correto) — um span clicável é inacessível.',
      },
    ],
  },

  relationships: {
    parents: ['form-field'],
    children: ['inputtext', 'inputgroupaddon', 'button', 'select'],
    commonlyUsedWith: ['inputgroupaddon', 'button', 'icon', 'inputtext'],
    partOfPatterns: ['search', 'form-submission', 'form-field'],
  },

  tokens: {
    typography: 'body-lg',
    note: 'InputGroup não tem cor própria: herda borda/raio/altura do campo e dos addons (formField.* do PrimeNG) e só une visualmente as peças. A cor de qualquer botão colado vem do papel do botão. Sem hex, sem marca.',
  },

  antiPatterns: [
    {
      regra: 'Nunca tratar o InputGroup como substituto do `<label>` do campo.',
      porque: 'O grupo é layout; sem `<label for>` ligado ao input, o leitor de tela não anuncia o que preencher.',
      emVezDisso: 'Manter o `<label for="id">` do campo (visível acima ou via FloatLabel) mesmo dentro do grupo.',
    },
    {
      regra: 'Nunca colocar uma ação do grupo como ícone/texto clicável sem `<button>`.',
      porque: 'Um `<span>` clicável não recebe foco nem teclado e não é anunciado como ação.',
      emVezDisso: 'Um `<button type="button">` dentro do addon, com nome acessível se for só ícone.',
    },
    {
      regra: 'Nunca usar InputGroup só para enfiar um ícone decorativo dentro do campo.',
      porque: 'O addon cria uma "célula" com borda separando; para ícone colado por dentro sem divisória o certo é o IconField.',
      emVezDisso: 'IconField quando o ícone fica dentro do campo; InputGroup quando prefixo/sufixo/botão formam segmentos.',
    },
    {
      regra: 'Nunca misturar variants (outlined/filled) entre o campo e o resto do formulário dentro do grupo.',
      porque: 'O grupo precisa parecer uma peça única; variants diferentes quebram a unidade visual.',
      emVezDisso: 'Repetir o mesmo variant do campo em todo o formulário e deixar os addons herdarem.',
    },
  ],

  examples: {
    angular: `<p-inputgroup>
  <p-inputgroup-addon><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i></p-inputgroup-addon>
  <input pInputText id="busca" [(ngModel)]="termo" placeholder="Buscar" />
  <p-inputgroup-addon>
    <button type="button" aria-label="Buscar"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
  </p-inputgroup-addon>
</p-inputgroup>`,
    html: `<!-- grupo = camada visual; no HTML final é label + input + addons semânticos -->
<label for="busca">Buscar</label>
<div role="group" aria-label="Buscar">
  <span aria-hidden="true"><i class="fa-solid fa-magnifying-glass"></i></span>
  <input id="busca" type="search" name="busca" />
  <button type="button" aria-label="Buscar">
    <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
  </button>
</div>`,
    inContext: `<!-- valor monetário com prefixo fixo -->
<label for="valor">Valor da bolsa</label>
<div role="group">
  <span aria-hidden="true">R$</span>
  <input id="valor" type="text" inputmode="decimal" name="valor" aria-describedby="valor-prefixo" />
  <span id="valor-prefixo" class="visually-hidden">em reais</span>
</div>`,
  },

  a11y: {
    role: 'group (contêiner visual); o campo interno mantém seu próprio papel e rótulo',
    keyboard: ['sem teclas próprias — Tab percorre campo e botões na ordem do DOM'],
    requiredAria: [
      'o `<label for>` do campo permanece obrigatório',
      'addon só de ícone que representa ação → `<button>` com aria-label',
      'prefixo/sufixo de texto significativo → ligar ao campo por aria-describedby quando ajudar a compreensão',
    ],
    contrastMin: '4.5:1 do texto do campo, dos addons de texto e dos rótulos; foco visível nos botões',
  },

  aiHints: {
    keywords: [
      'input group', 'grupo de input', 'campo com prefixo', 'prefixo', 'sufixo',
      'addon', 'campo com botão', 'campo com ícone', 'campo com icone', 'unidade',
      'R$', 'porcentagem', 'busca com botão', 'busca com botao',
    ],
    selectionCriteria:
      'Escolha InputGroup quando o campo precisa de um prefixo/sufixo fixo (símbolo, unidade) ou de um botão colado, formando uma peça única. Ícone só por dentro sem divisória = IconField. Rótulo economizando espaço = FloatLabel/IftaLabel.',
    disambiguation: [
      { confundeCom: 'iconfield', criterio: 'IconField coloca o ícone DENTRO do campo sem borda separando; InputGroup cria segmentos (addons) colados ao campo.' },
      { confundeCom: 'inputgroupaddon', criterio: 'O Addon é o PREFIXO/SUFIXO individual; o InputGroup é o contêiner que agrupa campo + addons.' },
      { confundeCom: 'floatlabel', criterio: 'FloatLabel trata do rótulo que sobe; InputGroup trata de prefixos/sufixos/botões ao redor do campo.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/inputgroup',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Único input do código é `styleClass` (deprecado v20, use `class`); o resto é content-projection. Saída é HTML semântico (label + input + addons).',
  },
};
