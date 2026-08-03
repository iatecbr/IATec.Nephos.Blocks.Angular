import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { DataTableComponent } from '@iatec/nephos-blocks';

/**
 * Ficha: `design-system/componentes/data-table.block.meta.ts`
 * (`origin: nephos-own`).
 *
 * ⚠️ Não confundir com a ficha `datatable` (o COMPONENTE, a `<table>` crua
 * do PrimeNG). Esta é a COMPOSIÇÃO por cima.
 *
 * O que conferir nas 7 marcas × 2 modos:
 *
 * - o **status é uma Tag com TEXTO** — a cor por papel (`feedback.*`) só
 *   reforça. Status só-cor não é percebido por todos nem é anunciado;
 * - marque uma linha: a **barra de ações em massa** aparece com a
 *   contagem em `aria-live`, e o realce da linha é a `primary` da marca;
 * - o checkbox do cabeçalho diz **"desta página"**. Marcar o resultado
 *   inteiro sem avisar faz a ação em massa cair sobre o que ninguém viu;
 * - navegue por Tab até um cabeçalho ordenável e aperte Enter: o `<th>`
 *   recebe foco e `aria-sort` muda;
 * - cada ação de linha carrega o nome da linha ("Editar Colégio…"), não
 *   um "Editar" repetido vinte vezes.
 */
const meta: Meta<DataTableComponent> = {
  title: 'Nephos Blocks/Tabela de dados',
  component: DataTableComponent,
  decorators: [moduleMetadata({ imports: [DataTableComponent] })],
};

export default meta;
type Story = StoryObj<DataTableComponent>;

const COLUNAS = [
  { field: 'escola', header: 'Escola', sortable: true },
  { field: 'integrais', header: 'Integrais', sortable: true },
  { field: 'status', header: 'Status', kind: 'status', severityField: 'severidade' },
];

const LINHAS = [
  { id: 1, escola: 'Colégio Adventista de Salvador', integrais: 360, status: 'Faltando', severidade: 'warn' },
  { id: 2, escola: 'Colégio Adventista de Feira de Santana', integrais: 214, status: 'Completa', severidade: 'success' },
  { id: 3, escola: 'Escola Adventista de Ilhéus', integrais: 98, status: 'Em análise', severidade: 'info' },
  { id: 4, escola: 'Escola Adventista de Juazeiro', integrais: 45, status: 'Suspensa', severidade: 'danger' },
];

const ACOES_LINHA = [
  { id: 'editar', label: 'Editar', icon: 'pen-to-square' },
  { id: 'remover', label: 'Remover', icon: 'trash-can', severity: 'danger' },
];

const ACOES_MASSA = [
  { id: 'exportar', label: 'Exportar' },
  { id: 'excluir', label: 'Excluir', severity: 'danger' },
];

/** A tabela completa: seleção, ações por linha, status e paginação. */
export const Padrao: Story = {
  name: 'Padrão',
  render: () => ({
    props: {
      colunas: COLUNAS,
      linhas: LINHAS,
      acoesLinha: ACOES_LINHA,
      acoesMassa: ACOES_MASSA,
      ultimaAcao: '',
    },
    template: `
      <div style="max-width:60rem;">
        <nph-blocks-data-table
          caption="Bolsas por escola — Associação Bahia"
          [columns]="colunas"
          [rows]="linhas"
          rowLabelField="escola"
          [rowActions]="acoesLinha"
          [bulkActions]="acoesMassa"
          [total]="42"
          (rowAction)="ultimaAcao = $event.acao.label + ' → ' + $event.linha.escola"
          (bulkAction)="ultimaAcao = $event.acao.label + ' em ' + $event.selecionados.length + ' linhas'"
          (sort)="ultimaAcao = 'Ordenar por ' + $event.campo + ' (' + $event.direcao + ')'">
        </nph-blocks-data-table>

        <p class="nph-caption nph-text-muted" aria-live="polite">
          {{ ultimaAcao || 'Nenhuma ação ainda.' }}
        </p>
      </div>
    `,
  }),
};

/**
 * Carregando: as linhas viram skeleton. Não é "nenhum resultado" — os
 * dados só não chegaram ainda, e dizer "vazio" agora assustaria.
 */
export const Carregando: Story = {
  render: () => ({
    props: { colunas: COLUNAS, acoesLinha: ACOES_LINHA },
    template: `
      <div style="max-width:60rem;">
        <nph-blocks-data-table
          caption="Bolsas por escola — Associação Bahia"
          [columns]="colunas"
          [rows]="[]"
          [rowActions]="acoesLinha"
          [loading]="true">
        </nph-blocks-data-table>
      </div>
    `,
  }),
};

/**
 * Sem linhas: o `empty-state` entra no lugar do corpo da tabela, na
 * variante `sem-resultado` — quem filtrou precisa do caminho de volta,
 * não de um convite a criar.
 */
export const Vazia: Story = {
  render: () => ({
    props: { colunas: COLUNAS, acoesLinha: ACOES_LINHA },
    template: `
      <div style="max-width:60rem;">
        <nph-blocks-data-table
          caption="Bolsas por escola — Associação Bahia"
          [columns]="colunas"
          [rows]="[]"
          [rowActions]="acoesLinha"
          [total]="0"
          emptyTitle="Nenhuma escola encontrada"
          emptyDescription="Nenhuma escola combina com os filtros aplicados.">
        </nph-blocks-data-table>
      </div>
    `,
  }),
};

/**
 * Sem seleção e sem ações: uma listagem só de leitura. A `<table>`
 * continua semântica — é o que faz o leitor de tela anunciar linha e
 * coluna.
 */
export const SomenteLeitura: Story = {
  name: 'Somente leitura',
  render: () => ({
    props: { colunas: COLUNAS, linhas: LINHAS },
    template: `
      <div style="max-width:60rem;">
        <nph-blocks-data-table
          caption="Bolsas por escola — Associação Bahia"
          [columns]="colunas"
          [rows]="linhas"
          [selectable]="false"
          [total]="4">
        </nph-blocks-data-table>
      </div>
    `,
  }),
};
