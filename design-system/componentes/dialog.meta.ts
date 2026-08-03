/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · dialog.meta.ts — janela modal (sobreposição)
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → usado direto do PrimeNG (p-dialog).
 * Sobreposição que aparece por cima da tela, geralmente bloqueando o
 * fundo, para uma tarefa focada ou uma decisão.
 * Saída do Moses = HTML semântico: `<dialog>`/role="dialog" aria-modal,
 * com título ligado por aria-labelledby e foco preso enquanto aberto.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const dialogMeta: NephosComponentMeta = {
  identity: {
    id: 'dialog',
    name: 'Dialog',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Sobreposição focada para uma tarefa curta ou uma decisão, por cima da tela atual.',
    whenToUse: [
      'Uma tarefa curta sem sair da tela (editar um item, um formulário breve).',
      'Uma decisão que precisa de resposta antes de continuar (com ConfirmDialog para confirmar/cancelar).',
    ],
    whenNotToUse: [
      'Aviso passageiro — use Toast.',
      'Muito conteúdo ou um fluxo longo — use uma página própria.',
      'Empilhar diálogos (um abrindo outro) — sinal de fluxo mal desenhado.',
    ],
  },

  api: {
    inputs: [
      { name: 'visible', type: 'boolean', default: 'false', description: 'Controla aberto/fechado (two-way).' },
      { name: 'modal', type: 'boolean', default: 'false', description: 'Bloqueia o fundo com uma máscara. Ligar quando a decisão é obrigatória.' },
      { name: 'header', type: 'string', default: '—', description: 'Título do diálogo. Vira o rótulo acessível (aria-labelledby).' },
      { name: 'closable', type: 'boolean', default: 'true', description: 'Mostra o "x". Desligar só quando a resposta é obrigatória (aí oferecer Cancelar).' },
      { name: 'dismissableMask', type: 'boolean', default: 'false', description: 'Fecha ao clicar fora. Não usar quando há dados não salvos.' },
      { name: 'draggable', type: 'boolean', default: 'true', description: 'Permite arrastar. Desligar em fluxos simples.' },
      { name: 'position', type: "'center' | 'top' | 'bottom' | '…'", default: 'center', description: 'Posição na tela.' },
      { name: 'maximizable', type: 'boolean', default: 'false', description: 'Botão de maximizar. Útil quando o conteúdo pode crescer.' },
    ],
    outputs: [
      { name: 'onHide', payload: 'void', description: 'Emitido ao fechar (x, Esc, máscara).' },
      { name: 'visibleChange', payload: 'boolean', description: 'Two-way do `visible`.' },
    ],
    slots: [
      { name: 'header', accepts: 'título (ou usar o input `header`)', optional: true },
      { name: 'content', accepts: 'o conteúdo do diálogo' },
      { name: 'footer', accepts: 'ações (ex.: Cancelar + Confirmar)', optional: true },
    ],
    states: ['fechado', 'abrindo', 'aberto', 'fechando'],
    invalidCombinations: [
      { combo: 'modal=true + dismissableMask=true com dados não salvos', porque: 'Clicar fora sem querer descarta o trabalho.' },
      { combo: 'closable=false sem nenhuma ação de saída no rodapé', porque: 'A pessoa fica presa no diálogo, sem como sair.' },
      { combo: 'dois botões primários no rodapé', porque: 'Destrói a hierarquia — a ação esperada é uma só.' },
    ],
  },

  relationships: {
    parents: ['page', 'app-root'],
    children: ['button', 'inputtext', 'form-field'],
    commonlyUsedWith: ['button'],
    partOfPatterns: ['focused-task', 'destructive-confirmation'],
  },

  tokens: {
    typography: 'title-sm',
    byState: {
      janela: { background: 'surface/0', border: 'surface/200' },
      mascara: { background: 'overlay/mask' },
      titulo: { text: 'surface/text' },
    },
    note: 'Raio (12px), padding, sombra e a máscara herdam do PrimeNG (overlay.modal.*). Cor por papel — nunca hex.',
  },

  antiPatterns: [
    {
      regra: 'Nunca abrir um Dialog a partir de outro Dialog.',
      porque: 'Empilhar diálogos confunde e prende a pessoa em camadas.',
      emVezDisso: 'Repensar o fluxo: uma etapa por vez, ou uma página própria.',
    },
    {
      regra: 'Nunca deixar o diálogo sem título e sem foco preso.',
      porque: 'O leitor de tela não anuncia do que se trata e o foco vaza para o fundo bloqueado.',
      emVezDisso: 'role="dialog" aria-modal="true", título via aria-labelledby, foco preso e Esc para fechar.',
    },
    {
      regra: 'Nunca colocar um fluxo longo dentro de um Dialog.',
      porque: 'Espaço apertado e sensação de "preso"; rolar dentro de modal é ruim.',
      emVezDisso: 'Uma página dedicada com o passo a passo.',
    },
  ],

  examples: {
    angular: `<p-dialog header="Editar item" [(visible)]="aberto" [modal]="true">
  <!-- conteúdo -->
  <ng-template pTemplate="footer">
    <p-button label="Cancelar" severity="secondary" [text]="true" (onClick)="aberto=false" />
    <p-button label="Salvar" severity="primary" (onClick)="salvar()" />
  </ng-template>
</p-dialog>`,
    html: `<div role="dialog" aria-modal="true" aria-labelledby="dlg-title" data-block="dialog">
  <h2 id="dlg-title">Editar item</h2>
  <div data-slot="content"><!-- conteúdo --></div>
  <footer data-slot="footer">
    <button type="button" data-variant="text">Cancelar</button>
    <button type="button" data-variant="primary">Salvar</button>
  </footer>
</div>`,
    inContext: `<!-- máscara + diálogo centralizado -->
<div data-block="dialog-mask">
  <div role="dialog" aria-modal="true" aria-labelledby="dlg-title" data-block="dialog"> … </div>
</div>`,
  },

  a11y: {
    role: 'dialog',
    keyboard: ['Esc fecha (quando closable)', 'Tab circula só dentro do diálogo (foco preso)', 'foco volta ao gatilho ao fechar'],
    requiredAria: ['aria-modal="true"', 'aria-labelledby apontando para o título', 'foco inicial dentro do diálogo'],
    contrastMin: '4.5:1 no conteúdo; a máscara escurece o fundo o suficiente para separar as camadas',
  },

  aiHints: {
    keywords: ['dialog', 'modal', 'janela', 'popup', 'sobreposição', 'sobreposicao', 'confirmar', 'editar em modal'],
    selectionCriteria:
      'Escolha o Dialog para uma tarefa curta ou decisão que exige foco por cima da tela. Aviso passageiro → Toast. Muito conteúdo/fluxo longo → página própria.',
    disambiguation: [
      { confundeCom: 'confirmdialog', criterio: 'ConfirmDialog é o Dialog especializado em confirmar/cancelar uma ação; Dialog é genérico.' },
      { confundeCom: 'popover', criterio: 'Popover é leve, ancorado a um elemento, sem bloquear; Dialog é focado e costuma bloquear.' },
      { confundeCom: 'drawer', criterio: 'Drawer desliza da lateral (bom para painel/navegação); Dialog centraliza (bom para tarefa/decisão).' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/dialog',
    figmaNode: 'https://www.figma.com/design/mHUXdyDZ820suwIRIIlp9Z/PrimeOne-4.0.0', // grupo "dialog"
    storybookId: 'organisms-dialog',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng). Só a cor da marca entra pelo tema.',
  },
};
