import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';

import { HelperTextComponent, LabelComponent, LinkComponent, TextComponent } from '@iatec/nephos-ui';
import { DetailFormPageComponent } from '@iatec/nephos-pages';

import { ROTAS_DE_PROVA } from './rotas-de-prova';

/**
 * Ficha: `design-system/componentes/detail-form.template.meta.ts`
 * (`category: layout`, `origin: nephos-own`).
 *
 * A página de UM registro. A moldura não desenha campo nenhum — o que
 * ela garante é a estrutura em volta deles:
 *
 * - **um `<h1>` só e a região nomeada** por `aria-labelledby`;
 * - **o resumo de erros vem ANTES das seções**, no DOM. É para lá que o
 *   foco vai ao submeter inválido, e quem ouve a tela precisa do resumo
 *   antes de voltar aos campos. Veja a story "Com erro": cada erro é um
 *   link para o campo, e o campo tem `aria-invalid` + `aria-describedby`
 *   — cor nunca é o único sinal;
 * - **a grade dos campos sai da moldura** como `--nph-detail-grid`: ela
 *   conhece o `columns` e o breakpoint, a seção só gasta o valor. Um
 *   `<fieldset>` é conteúdo projetado, e regra de CSS não atravessa o
 *   encapsulamento — custom property, sim;
 * - **uma ação primária só** no cabeçalho: Salvar em ênfase, Cancelar
 *   sem. Duas ênfases destruiriam a hierarquia;
 * - estreite a janela abaixo de 992px: duas colunas viram uma e o painel
 *   de metadados desce para depois do que se edita.
 */
const meta: Meta<DetailFormPageComponent> = {
  title: 'Nephos Templates/Detalhe · Formulário',
  component: DetailFormPageComponent,
  decorators: [
    moduleMetadata({
      imports: [
        DetailFormPageComponent,
        LabelComponent,
        HelperTextComponent,
        LinkComponent,
        TextComponent,
        BreadcrumbModule,
        ButtonModule,
        InputTextModule,
        MessageModule,
        SelectModule,
      ],
    }),
    applicationConfig({ providers: [provideRouter(ROTAS_DE_PROVA)] }),
  ],
};

export default meta;
type Story = StoryObj<DetailFormPageComponent>;

const TRILHA = [{ label: 'Escolas', routerLink: '/escolas' }, { label: 'Escola Adventista Central' }];
const INICIO = { icon: 'fa-solid fa-house', routerLink: '/' };

const UFS = [
  { label: 'Distrito Federal', value: 'DF' },
  { label: 'Amazonas', value: 'AM' },
  { label: 'São Paulo', value: 'SP' },
];

/** A grade de campos vem da moldura; a seção só gasta o valor. */
const ESTILO_GRADE =
  'display:grid; grid-template-columns: var(--nph-detail-grid); gap: var(--nph-space-lg); border:0; padding:0; margin:0;';

const CAMPO = 'display:flex; flex-direction:column; gap: var(--nph-space-sm);';

/** Edição de um registro existente, em duas colunas. */
export const Edicao: Story = {
  render: () => ({
    props: { trilha: TRILHA, inicio: INICIO, ufs: UFS },
    template: `
      <nph-pages-detail-form title="Escola Adventista Central" mode="edit">
        <!-- O p-breadcrumb NAO tem input de aria-label (so homeAriaLabel),
             e a ficha exige nav "Trilha". Entra pelo pt, que e o
             caminho oficial de pass-through do PrimeNG. -->
        <p-breadcrumb nphBreadcrumb [model]="trilha" [home]="inicio"
                      [pt]="{ root: { 'aria-label': 'Trilha' } }"></p-breadcrumb>

        <p-button nphPageActions label="Salvar"></p-button>
        <p-button nphPageActions label="Cancelar" severity="secondary" [text]="true"></p-button>

        <fieldset style="${ESTILO_GRADE}">
          <legend class="nph-title-sm nph-heading">Identificação</legend>

          <div style="${CAMPO}">
            <nph-ui-label for="df-nome" [required]="true">Nome da escola</nph-ui-label>
            <input pInputText id="df-nome" name="nome" [fluid]="true" value="Escola Adventista Central" />
          </div>

          <div style="${CAMPO}">
            <nph-ui-label for="df-codigo">Código MEC</nph-ui-label>
            <input pInputText id="df-codigo" name="codigo" [fluid]="true" value="53001234"
                   aria-describedby="df-codigo-ajuda" />
            <nph-ui-helper-text for="df-codigo">Oito dígitos, sem pontuação.</nph-ui-helper-text>
          </div>
        </fieldset>

        <fieldset style="${ESTILO_GRADE}">
          <legend class="nph-title-sm nph-heading">Endereço</legend>

          <div style="${CAMPO}">
            <nph-ui-label for="df-cidade">Cidade</nph-ui-label>
            <input pInputText id="df-cidade" name="cidade" [fluid]="true" value="Brasília" />
          </div>

          <div style="${CAMPO}">
            <nph-ui-label for="df-uf">Estado</nph-ui-label>
            <p-select inputId="df-uf" [options]="ufs" optionLabel="label" optionValue="value" [fluid]="true"></p-select>
          </div>
        </fieldset>

        <div nphAsideMeta style="display:flex; flex-direction:column; gap: var(--nph-space-sm);">
          <nph-ui-text size="caption" variant="muted">Criada em 12/03/2019</nph-ui-text>
          <nph-ui-text size="caption" variant="muted">Última alteração em 28/07/2026</nph-ui-text>
        </div>
      </nph-pages-detail-form>
    `,
  }),
};

/**
 * Submetido com erro. Três coisas acontecem juntas, e nenhuma delas é a
 * borda vermelha: o resumo em `role="alert"` no topo, um link por erro
 * levando ao campo, e no campo o `aria-invalid` + `aria-describedby`
 * apontando para o texto que diz o que corrigir.
 */
export const ComErro: Story = {
  name: 'Com erro',
  render: () => ({
    props: { trilha: TRILHA, inicio: INICIO },
    template: `
      <nph-pages-detail-form title="Escola Adventista Central" mode="edit" [dirty]="true">
        <!-- O p-breadcrumb NAO tem input de aria-label (so homeAriaLabel),
             e a ficha exige nav "Trilha". Entra pelo pt, que e o
             caminho oficial de pass-through do PrimeNG. -->
        <p-breadcrumb nphBreadcrumb [model]="trilha" [home]="inicio"
                      [pt]="{ root: { 'aria-label': 'Trilha' } }"></p-breadcrumb>

        <p-button nphPageActions label="Salvar"></p-button>
        <p-button nphPageActions label="Cancelar" severity="secondary" [text]="true"></p-button>

        <p-message nphErrorSummary severity="error">
          <div role="alert">
            <strong>Corrija 2 campos para salvar:</strong>
            <ul style="margin:0; padding-left: var(--nph-space-lg);">
              <li><nph-ui-link href="#df2-nome" variant="inline">Nome da escola: obrigatório</nph-ui-link></li>
              <li><nph-ui-link href="#df2-codigo" variant="inline">Código MEC: precisa ter oito dígitos</nph-ui-link></li>
            </ul>
          </div>
        </p-message>

        <fieldset style="${ESTILO_GRADE}">
          <legend class="nph-title-sm nph-heading">Identificação</legend>

          <div style="${CAMPO}">
            <nph-ui-label for="df2-nome" [required]="true">Nome da escola</nph-ui-label>
            <input pInputText id="df2-nome" name="nome" [fluid]="true"
                   aria-invalid="true" aria-describedby="df2-nome-erro" />
            <nph-ui-helper-text for="df2-nome" variant="danger">Informe o nome da escola.</nph-ui-helper-text>
          </div>

          <div style="${CAMPO}">
            <nph-ui-label for="df2-codigo">Código MEC</nph-ui-label>
            <input pInputText id="df2-codigo" name="codigo" [fluid]="true" value="530"
                   aria-invalid="true" aria-describedby="df2-codigo-erro" />
            <nph-ui-helper-text for="df2-codigo" variant="danger">O código precisa ter oito dígitos.</nph-ui-helper-text>
          </div>
        </fieldset>
      </nph-pages-detail-form>
    `,
  }),
};

/**
 * Criação: uma coluna só. Formulário curto e novo não ganha nada com
 * duas colunas — o olho percorre uma lista mais rápido do que um
 * zigue-zague.
 */
export const Criacao: Story = {
  render: () => ({
    template: `
      <nph-pages-detail-form title="Nova escola" mode="create" [columns]="1">
        <p-button nphPageActions label="Salvar"></p-button>
        <p-button nphPageActions label="Cancelar" severity="secondary" [text]="true"></p-button>

        <fieldset style="${ESTILO_GRADE}">
          <legend class="nph-title-sm nph-heading">Identificação</legend>

          <div style="${CAMPO}">
            <nph-ui-label for="df3-nome" [required]="true">Nome da escola</nph-ui-label>
            <input pInputText id="df3-nome" name="nome" [fluid]="true" />
          </div>
        </fieldset>
      </nph-pages-detail-form>
    `,
  }),
};
