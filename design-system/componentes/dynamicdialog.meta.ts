/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · dynamicdialog.meta.ts — ONDA "SOBREPOSIÇÕES"
 * ─────────────────────────────────────────────────────────────
 * origin: 'primeng' → `DialogService` + `DynamicDialogRef`/`DynamicDialogConfig`.
 * API lida do código real (`primeng-dynamicdialog.d.ts`).
 *
 * É o Dialog aberto POR CÓDIGO (serviço), não por template: um COMPONENTE
 * inteiro é carregado como conteúdo, via `dialogService.open(MeuComp, config)`.
 * Bom para diálogo reutilizável disparado de vários lugares (menu, serviço,
 * linha de tabela). O resultado volta pelo `ref.onClose`. A aparência/máscara/
 * foco preso são os mesmos do Dialog — muda só QUEM abre e COMO passa dados.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

export const dynamicDialogMeta: NephosComponentMeta = {
  identity: {
    id: 'dynamicdialog',
    name: 'DynamicDialog',
    category: 'organism',
    status: 'stable',
    version: '1.0.0',
    origin: 'primeng',
    replaces: null,
  },

  purpose: {
    oneLiner: 'Dialog aberto por serviço, carregando um componente inteiro como conteúdo e devolvendo o resultado.',
    whenToUse: [
      'Abrir um diálogo por CÓDIGO, de vários pontos (um item de menu, um serviço, uma ação de linha) sem declarar o `<p-dialog>` em cada template.',
      'Diálogo reutilizável que recebe dados de entrada e RETORNA um resultado (ex.: um seletor, um editor rápido de item) pelo `ref.onClose`.',
    ],
    whenNotToUse: [
      'Um diálogo simples, atrelado a um único botão da própria tela — use o Dialog declarativo (`[(visible)]`).',
      'Uma decisão sim/não — use ConfirmDialog.',
      'Um fluxo longo/navegável — abra uma rota/página própria.',
    ],
  },

  api: {
    inputs: [
      {
        name: 'dialogService.open(Componente, config)',
        type: 'DialogService.open<T>(Type<T>, DynamicDialogConfig): DynamicDialogRef',
        default: '—',
        description: '⭐ Como se abre. Recebe o COMPONENTE de conteúdo e um `config`. Retorna um `DynamicDialogRef` para fechar e escutar o resultado.',
      },
      {
        name: 'config.header',
        type: 'string',
        default: '—',
        description: 'Título do diálogo. Vira o rótulo acessível (junto com `ariaLabelledBy`).',
      },
      {
        name: 'config.data',
        type: 'DataType',
        default: '—',
        description: 'Objeto de ENTRADA passado ao componente de conteúdo (lido via `DynamicDialogConfig.data`). É como o diálogo recebe o contexto.',
      },
      {
        name: 'config.modal',
        type: 'boolean',
        default: 'false',
        description: 'Bloqueia o fundo com máscara. Ligar quando a tarefa exige foco/decisão antes de continuar.',
      },
      {
        name: 'config.closable',
        type: 'boolean',
        default: 'true',
        description: 'Mostra o "x" de fechar no cabeçalho. Desligar só quando a resposta é obrigatória (aí ofereça um Cancelar).',
      },
      {
        name: 'config.dismissableMask',
        type: 'boolean',
        default: 'false',
        description: 'Fecha ao clicar fora. Não usar quando há dados não salvos no conteúdo.',
      },
      {
        name: 'config.closeOnEscape',
        type: 'boolean',
        default: 'true',
        description: 'Esc fecha o diálogo. Manter ligado por acessibilidade (salvo decisão obrigatória).',
      },
      {
        name: 'config.focusOnShow / config.focusTrap',
        type: 'boolean',
        default: 'true',
        description: 'Move o foco para dentro ao abrir e prende o foco no diálogo enquanto aberto. Manter ligados.',
      },
      {
        name: 'config.width / config.height',
        type: 'string',
        default: '—',
        description: 'Dimensões do diálogo (ex.: "40rem"). Use `breakpoints` para larguras por tamanho de tela.',
      },
      {
        name: 'config.position',
        type: "'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | '…'",
        default: "'center'",
        description: 'Posição na tela. Centralizado por padrão (tarefa/decisão).',
      },
      {
        name: 'config.maximizable',
        type: 'boolean',
        default: 'false',
        description: 'Permite maximizar. Útil quando o conteúdo pode crescer.',
      },
    ],
    outputs: [
      { name: 'ref.onClose', payload: 'any', description: 'Emite o RESULTADO quando o diálogo fecha (ex.: o item escolhido ou salvo). É como o chamador recebe a resposta — via `ref.close(resultado)`.' },
      { name: 'ref.onDestroy', payload: 'any', description: 'Emitido quando a instância do diálogo é destruída (limpeza).' },
      { name: 'ref.onMaximize', payload: 'any', description: 'Emitido ao maximizar o diálogo.' },
    ],
    slots: [
      { name: 'content', accepts: 'o COMPONENTE passado ao `open()` (ou `config.templates.content`)' },
      { name: 'header', accepts: 'componente de cabeçalho customizado (`config.templates.header`)', optional: true },
      { name: 'footer', accepts: 'componente de rodapé customizado / ações (`config.templates.footer`)', optional: true },
    ],
    states: ['closed', 'open'],
    invalidCombinations: [
      {
        combo: 'modal=true + dismissableMask=true com dados não salvos no conteúdo',
        porque: 'Clicar fora sem querer descarta o trabalho do componente carregado.',
      },
      {
        combo: 'closable=false + closeOnEscape=false sem nenhuma ação de saída no conteúdo',
        porque: 'A pessoa fica presa no diálogo, sem como sair.',
      },
      {
        combo: 'usar DynamicDialog para um diálogo simples atrelado a um único botão local',
        porque: 'Adiciona serviço e componente extra sem ganho; o Dialog declarativo resolve com menos peso.',
      },
    ],
  },

  relationships: {
    parents: ['page', 'app-shell'],
    children: ['button', 'inputtext', 'form-field', 'datatable'],
    commonlyUsedWith: ['button', 'menu', 'datatable'],
    partOfPatterns: ['focused-task', 'reusable-dialog', 'item-picker'],
  },

  tokens: {
    typography: 'title-sm (título) · body-lg (conteúdo)',
    byState: {
      open: { background: 'surface/0', border: 'surface/200', mask: 'surface/overlay-mask', title: 'surface/text' },
    },
    note: 'Reaproveita o estilo do Dialog (herda raio/padding/sombra/máscara do PrimeNG, overlay.modal.*). Ênfase (primary) só nas ações do conteúdo. Cor por papel — nunca hex.',
  },

  antiPatterns: [
    {
      regra: 'Nunca usar DynamicDialog onde um Dialog declarativo simples resolveria.',
      porque: 'Serviço + componente separado é overhead sem ganho quando o diálogo é local e único.',
      emVezDisso: 'Dialog com `[(visible)]` no template quando o gatilho e o conteúdo vivem na mesma tela.',
    },
    {
      regra: 'Nunca deixar o diálogo sem título e sem foco preso.',
      porque: 'O leitor de tela não anuncia do que se trata e o foco vaza para o fundo.',
      emVezDisso: 'config.header (ou ariaLabelledBy), focusOnShow e focusTrap ligados; Esc para fechar.',
    },
    {
      regra: 'Nunca colocar um fluxo longo/navegável dentro do diálogo.',
      porque: 'Espaço apertado e sensação de "preso"; rolar dentro de modal é ruim.',
      emVezDisso: 'Uma rota/página dedicada com o passo a passo.',
    },
  ],

  examples: {
    angular: `// abre por código, de qualquer lugar (serviço, menu, ação de linha):
const ref = this.dialogService.open(EditarBolsaComponent, {
  header: 'Editar bolsas',
  data: { escolaId: 42 },
  modal: true,
  width: '40rem',
  focusOnShow: true,
});
ref.onClose.subscribe((resultado) => {
  if (resultado) this.atualizar(resultado);
});

// dentro do EditarBolsaComponent:
constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig) {}
salvar() { this.ref.close(this.form.value); } // devolve o resultado`,
    html: `<div role="dialog" aria-modal="true" aria-labelledby="dd-title" data-block="dynamic-dialog">
  <header>
    <h2 id="dd-title">Editar bolsas</h2>
    <button type="button" aria-label="Fechar">
      <i class="fa-solid fa-xmark" aria-hidden="true"></i>
    </button>
  </header>
  <div data-slot="content"><!-- o componente carregado --></div>
  <footer data-slot="footer">
    <button type="button" data-variant="text">Cancelar</button>
    <button type="button" data-variant="primary">Salvar</button>
  </footer>
</div>`,
    inContext: `<!-- disparado por um item de menu de ações, sem <p-dialog> no template -->
<button type="button" aria-haspopup="dialog"
        aria-label="Editar bolsas do Colégio Adventista de Salvador">
  <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i> Editar
</button>
<!-- dialogService.open(EditarBolsaComponent, { data, modal:true }) abre o dialog acima;
     o resultado volta por ref.onClose -->`,
  },

  a11y: {
    role: 'dialog',
    keyboard: ['Esc fecha (quando closeOnEscape/closable)', 'Tab circula só dentro do diálogo (foco preso)', 'foco volta ao gatilho ao fechar'],
    requiredAria: ['aria-modal="true" quando modal', 'aria-labelledby apontando para o título (header/ariaLabelledBy)', 'foco inicial dentro do diálogo (focusOnShow)'],
    contrastMin: '4.5:1 no conteúdo; a máscara escurece o fundo o suficiente para separar as camadas',
  },

  aiHints: {
    keywords: [
      'dynamicdialog', 'dialog dinâmico', 'dialog dinamico', 'dialog por serviço', 'dialog por servico',
      'abrir dialog por código', 'abrir dialog por codigo', 'dialogservice', 'modal programático',
      'modal programatico', 'dialog reutilizável', 'dialog reutilizavel',
    ],
    selectionCriteria:
      'Escolha DynamicDialog quando o diálogo precisa ser aberto por CÓDIGO (serviço), de vários lugares, carregando um componente e devolvendo um resultado (ref.onClose). Diálogo simples e local = Dialog declarativo; decisão sim/não = ConfirmDialog; fluxo longo = página.',
    disambiguation: [
      { confundeCom: 'dialog', criterio: 'Dialog é declarativo no template com [(visible)]; DynamicDialog é aberto por DialogService com um componente como conteúdo (reutilizável, chamado de fora).' },
      { confundeCom: 'confirmdialog', criterio: 'ConfirmDialog é a decisão sim/não; DynamicDialog carrega conteúdo/formulário arbitrário.' },
      { confundeCom: 'drawer', criterio: 'Drawer desliza de uma borda (filtros/nav); DynamicDialog centraliza (tarefa focada aberta por serviço).' },
    ],
  },

  references: {
    primengDocs: 'https://primeng.org/dynamicdialog',
    deltaFromPrimeng: 'Nenhum — usado direto (origin: primeng) via DialogService. Reaproveita a aparência do Dialog; a diferença é o disparo por serviço e a passagem de `data`/retorno por `ref.onClose`. Ver `dialog.meta.ts` para o modo declarativo.',
  },
};
