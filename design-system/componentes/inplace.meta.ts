/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · inplace.meta.ts — ONDA "PAINÉIS/ESTRUTURA"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `p-inplace` (com `[pInplaceDisplay]` e
 * `[pInplaceContent]`). API lida do código real
 * (primeng@21.0.2, `types/primeng-inplace.d.ts`).
 *
 * Mostra um valor "só leitura" que, ao clicar, TROCA por um controle
 * de edição no mesmo lugar (edição in-place). Economiza espaço:
 * a interface só revela o campo quando a pessoa quer editar. Saída =
 * `<button>` que revela um campo com `<label>` associado.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const inplaceMeta: NephosComponentMeta = {
  identity: {
    id: 'inplace',
    name: 'Inplace',
    category: 'molecule',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Exibe um valor em modo leitura e o troca por um controle de edição ao clicar, no mesmo lugar.',
    whenToUse: [
      'Editar um valor pontual sem sair para um formulário — ex.: renomear um item, ajustar um campo numa ficha.',
      'Economizar espaço mostrando o valor e revelando o editor só sob demanda.',
      'Conteúdo "pesado" (mapa, editor, tabela) carregado só quando a pessoa ativa a edição/expansão.',
    ],
    whenNotToUse: [
      'Um formulário inteiro com vários campos — use campos sempre visíveis.',
      'Ações (não edição de um valor) — use Button.',
      'Recolher/expandir uma seção de conteúdo — use Panel/Accordion.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'active',
        type: 'boolean',
        default: 'false',
        description: 'Se o modo de edição/conteúdo está ativo (true) ou se mostra o valor de leitura (false). Suporta controle programático além do clique.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Desativa a troca para edição; o valor fica só em leitura e não responde ao clique.',
      },
      {
        name: 'preventClick',
        type: 'boolean',
        default: 'false',
        description: 'Impede que o clique no display ative a edição (quando a ativação é controlada por outro gatilho no código).',
      },
      {
        name: 'closeAriaLabel',
        type: 'string',
        default: '—',
        description: 'Rótulo acessível do botão de voltar ao modo leitura. Obrigatório se houver botão de fechar só com ícone.',
      },
    ],
    outputs: [
      { name: 'onActivate', payload: 'Event', description: 'Emitido quando o Inplace entra no modo de edição/conteúdo. Bom para focar o campo revelado.' },
      { name: 'onDeactivate', payload: 'Event', description: 'Emitido quando o Inplace volta ao modo de leitura.' },
    ],
    slots: [
      { name: 'display', accepts: '[pInplaceDisplay] — o valor em leitura, clicável para ativar' },
      { name: 'content', accepts: '[pInplaceContent] — o controle de edição / conteúdo revelado ao ativar' },
    ],
    states: ['display', 'active', 'hover', 'focus', 'disabled'],
    invalidCombinations: [
      {
        combo: 'campo de edição no content sem `<label>` associado',
        porque: 'Ao ativar, o controle revelado é um campo; sem rótulo o leitor de tela não anuncia o que se edita.',
      },
      {
        combo: 'usar Inplace para disparar uma ação (não editar um valor)',
        porque: 'Inplace troca leitura↔edição de um valor; uma ação é papel de um `<button>`.',
      },
      {
        combo: 'ativar edição sem mover o foco para o campo revelado',
        porque: 'Quem usa teclado clica/ativa mas o foco fica para trás; o campo novo passa despercebido.',
      },
    ],
  },

  relationships: {
    parents: ['card', 'datatable', 'form-field', 'page'],
    children: ['inputtext', 'textarea', 'select', 'button', 'label'],
    commonlyUsedWith: ['inputtext', 'button', 'form-field'],
    partOfPatterns: ['inline-edit', 'edit-in-place', 'lazy-reveal'],
  },

  tokens: {
    typography: 'body-lg',
    byState: {
      display: { text: 'surface/text' },
      hover: { background: 'surface/100' },
      focus: { ring: 'focus/ring' },
    },
    note: 'Padding e raio do display herdam do PrimeNG (inplace.*). O hover sinaliza que o valor é clicável (papel surface). Cor por papel + passo, nunca hex.',
  },

  antiPatterns: [
    {
      regra: 'Nunca revelar um campo de edição sem `<label>` associado.',
      porque: 'Ao ativar, o controle é um campo de formulário; sem rótulo o leitor de tela não anuncia o que se edita.',
      emVezDisso: 'Um `<label for>` ligado ao campo revelado (visível ou visualmente oculto, mas presente).',
    },
    {
      regra: 'Nunca usar Inplace para disparar uma ação em vez de editar um valor.',
      porque: 'Confunde "editar este dado" com "executar algo"; a pessoa não sabe se salva ou age.',
      emVezDisso: 'Um Button para ações; Inplace só para trocar leitura↔edição de um valor.',
    },
    {
      regra: 'Nunca deixar o valor clicável sem sinal de que dá para editar.',
      porque: 'Sem affordance (hover, cursor, ícone de lápis) a pessoa não descobre que o texto é editável.',
      emVezDisso: 'Marcar o display como `<button>` com estado hover/foco e, se ajudar, um ícone Font Awesome (`<i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>`).',
    },
  ],

  examples: {
    angular: `<p-inplace (onActivate)="focarCampo()">
  <ng-template pInplaceDisplay>Clique para editar o nome</ng-template>
  <ng-template pInplaceContent>
    <input pInputText [(ngModel)]="nome" aria-label="Nome" />
  </ng-template>
</p-inplace>`,
    html: `<!-- modo leitura: botão que revela a edição -->
<button type="button" aria-expanded="false" aria-controls="edt-nome">
  Maria Silva
  <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
</button>

<!-- modo edição: revelado ao ativar -->
<div id="edt-nome" hidden>
  <label for="nome">Nome</label>
  <input id="nome" name="nome" type="text" value="Maria Silva" />
  <button type="button">Salvar</button>
</div>`,
    inContext: `<!-- edição in-place de um valor numa ficha -->
<dl>
  <dt>Nome da escola</dt>
  <dd>
    <button type="button" aria-expanded="false" aria-controls="edt-escola">
      Colégio Adventista Central
      <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
    </button>
    <div id="edt-escola" hidden>
      <label for="escola">Nome da escola</label>
      <input id="escola" name="escola" type="text" value="Colégio Adventista Central" />
      <button type="button" data-variant="primary">Salvar</button>
    </div>
  </dd>
</dl>`,
  },

  a11y: {
    role: 'botão de leitura que revela um campo (aria-expanded/controls)',
    keyboard: [
      'Tab foca o display; Enter/Espaço ativa a edição',
      'ao ativar, o foco deve ir para o campo revelado',
      'Escape (ou botão fechar) volta ao modo leitura',
    ],
    requiredAria: [
      'display como `<button>` com aria-expanded e aria-controls para a região de edição',
      'campo revelado com `<label for>` associado',
      'closeAriaLabel no botão de fechar quando ele é só ícone',
    ],
    contrastMin: '4.5:1 do valor em leitura e do campo; 3:1 do foco',
  },

  aiHints: {
    keywords: [
      'inplace', 'edição in-place', 'edicao in-place', 'editar no lugar', 'edição inline',
      'edicao inline', 'inline edit', 'clicar para editar', 'renomear', 'editar valor',
      'mostrar e editar', 'lazy reveal',
    ],
    selectionCriteria:
      'Escolha Inplace para editar UM valor no próprio lugar, revelando o campo só ao clicar (renomear, ajustar um dado numa ficha). Formulário completo = campos visíveis; ação = Button; recolher seção = Panel/Accordion.',
    disambiguation: [
      { confundeCom: 'panel', criterio: 'Panel recolhe/expande CONTEÚDO de uma seção; Inplace troca a LEITURA de um valor pelo seu editor.' },
      { confundeCom: 'button', criterio: 'Button dispara uma AÇÃO; Inplace revela um campo para EDITAR um valor existente.' },
      { confundeCom: 'form-field', criterio: 'Form-field é o campo sempre visível; Inplace esconde o campo atrás do valor em leitura até a pessoa querer editar.' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/inplace',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng, com [pInplaceDisplay]/[pInplaceContent]). Saída = `<button aria-expanded>` que revela um campo com `<label>`. Ícones de conteúdo (lápis) seguem Font Awesome (`icon.meta.ts`); só o tema traz a cor da marca.',
  },
};
