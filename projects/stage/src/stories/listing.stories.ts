import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

import { DataTableComponent, EmptyStateComponent, SearchFiltersComponent } from '@iatec/nephos-blocks';
import { ListingPageComponent } from '@iatec/nephos-pages';

import { ROTAS_DE_PROVA } from './rotas-de-prova';

/**
 * Ficha: `design-system/componentes/listing.template.meta.ts`
 * (`category: layout`, `origin: nephos-own`).
 *
 * A página mais comum do produto. Tudo o que ela garante é composição:
 *
 * - **um `<h1>` só, e a região tem nome**: a `<section>` é rotulada por
 *   `aria-labelledby` apontando para o título. É por isso que o título é
 *   da moldura e não de um slot — ela não alcançaria o id de um
 *   conteúdo projetado;
 * - **os dois vazios são DIFERENTES**: "ainda não há dados" oferece
 *   criar o primeiro item; "o filtro não achou nada" oferece limpar o
 *   filtro. Compare as duas stories abaixo — é o anti-padrão nº 1 da
 *   ficha;
 * - **carregando marca `aria-busy`** na região do resultado. O esqueleto
 *   é do bloco; o aviso de que aquela região está em atualização é da
 *   moldura;
 * - navegue por Tab: ação primária → filtros → resultado → paginação.
 *
 * ℹ️ **O slot de paginação fica vazio nas stories de tabela, e é o
 * certo:** o bloco `data-table` já pagina por conta própria (`total`,
 * `pageSize`, `first`). O slot existe para a variante em cards, onde o
 * `dataview` não traz paginação embutida. Duas paginações na mesma
 * página seriam dois controles disputando o mesmo conjunto.
 */
const meta: Meta<ListingPageComponent> = {
  title: 'Nephos Templates/Listagem',
  component: ListingPageComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ListingPageComponent,
        SearchFiltersComponent,
        DataTableComponent,
        EmptyStateComponent,
        ButtonModule,
        SelectModule,
      ],
    }),
    applicationConfig({ providers: [provideRouter(ROTAS_DE_PROVA)] }),
  ],
};

export default meta;
type Story = StoryObj<ListingPageComponent>;

const COLUNAS = [
  { field: 'nome', header: 'Escola' },
  { field: 'cidade', header: 'Cidade' },
  { field: 'situacao', header: 'Situação' },
];

const LINHAS = [
  { id: 1, nome: 'Escola Adventista Central', cidade: 'Brasília', situacao: 'Ativa' },
  { id: 2, nome: 'Escola Adventista do Norte', cidade: 'Manaus', situacao: 'Ativa' },
  { id: 3, nome: 'Escola Adventista do Vale', cidade: 'Campinas', situacao: 'Inativa' },
];

const SITUACOES = [
  { label: 'Ativa', value: 'ativa' },
  { label: 'Inativa', value: 'inativa' },
];

const ATIVOS = [{ campo: 'Situação', valor: 'Inativa' }];

/** A página cheia: filtros, tabela e a paginação do próprio bloco. */
export const Padrao: Story = {
  name: 'Padrão',
  render: () => ({
    props: { colunas: COLUNAS, linhas: LINHAS, situacoes: SITUACOES },
    template: `
      <nph-pages-listing title="Escolas">
        <p-button nphPageActions label="Nova escola" icon="fa-solid fa-plus"></p-button>

        <nph-blocks-search-filters nphFilters
                                   searchLabel="Buscar escolas"
                                   [resultCount]="3"
                                   resultNoun="escolas">
          <p-select nphFilters
                    [options]="situacoes"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Situação"
                    ariaLabel="Filtrar por situação">
          </p-select>
        </nph-blocks-search-filters>

        <nph-blocks-data-table [columns]="colunas"
                               [rows]="linhas"
                               caption="Escolas cadastradas"
                               rowLabelField="nome"
                               [total]="42">
        </nph-blocks-data-table>
      </nph-pages-listing>
    `,
  }),
};

/**
 * **Ainda não há dados.** O vazio de primeiro uso oferece CRIAR — é a
 * única ação que faz sentido quando não existe nada para filtrar. Repare
 * que a barra de filtros nem aparece: filtrar o nada não leva a lugar
 * nenhum.
 */
export const VaziaPrimeiroUso: Story = {
  name: 'Vazia (primeiro uso)',
  render: () => ({
    template: `
      <nph-pages-listing title="Escolas">
        <p-button nphPageActions label="Nova escola" icon="fa-solid fa-plus"></p-button>

        <nph-blocks-empty-state nphEmpty
                                variant="primeiro-uso"
                                title="Nenhuma escola cadastrada"
                                description="Cadastre a primeira escola para começar a acompanhar as bolsas."
                                actionLabel="Cadastrar escola">
        </nph-blocks-empty-state>
      </nph-pages-listing>
    `,
  }),
};

/**
 * **O filtro não achou nada.** Outro problema, outra saída: aqui a ação
 * é LIMPAR o filtro, nunca "criar" — os dados existem, o recorte é que
 * não bate. Os filtros continuam na tela, com o chip do que está
 * aplicado, senão a pessoa não tem como desfazer o que causou o vazio.
 */
export const VaziaSemResultado: Story = {
  name: 'Vazia (filtro sem resultado)',
  render: () => ({
    props: { situacoes: SITUACOES, ativos: ATIVOS },
    template: `
      <nph-pages-listing title="Escolas">
        <p-button nphPageActions label="Nova escola" icon="fa-solid fa-plus"></p-button>

        <nph-blocks-search-filters nphFilters
                                   searchLabel="Buscar escolas"
                                   [activeFilters]="ativos"
                                   [resultCount]="0"
                                   resultNoun="escolas">
          <p-select nphFilters
                    [options]="situacoes"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Situação"
                    ariaLabel="Filtrar por situação">
          </p-select>
        </nph-blocks-search-filters>

        <nph-blocks-empty-state nphEmpty
                                variant="sem-resultado"
                                title="Nenhuma escola encontrada"
                                description="Nenhum resultado para o filtro aplicado. Ajuste ou limpe os filtros."
                                actionLabel="Limpar filtros">
        </nph-blocks-empty-state>
      </nph-pages-listing>
    `,
  }),
};

/**
 * Carregando: a região do resultado fica `aria-busy="true"`. Quem
 * desenha o esqueleto é o bloco — a moldura só avisa que aquele pedaço
 * da tela está em atualização.
 */
export const Carregando: Story = {
  render: () => ({
    props: { colunas: COLUNAS, linhas: LINHAS },
    template: `
      <nph-pages-listing title="Escolas" [loading]="true">
        <p-button nphPageActions label="Nova escola" icon="fa-solid fa-plus"></p-button>

        <nph-blocks-search-filters nphFilters searchLabel="Buscar escolas">
        </nph-blocks-search-filters>

        <nph-blocks-data-table [columns]="colunas"
                               [rows]="linhas"
                               caption="Escolas cadastradas"
                               rowLabelField="nome"
                               [loading]="true">
        </nph-blocks-data-table>
      </nph-pages-listing>
    `,
  }),
};
