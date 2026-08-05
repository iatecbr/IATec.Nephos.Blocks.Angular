import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { MeterGroupModule } from 'primeng/metergroup';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';

import { HeadingComponent, TextComponent } from '@iatec/nephos-ui';
import { DashboardPageComponent } from '@iatec/nephos-pages';

import { ROTAS_DE_PROVA } from './rotas-de-prova';

/**
 * Ficha: `design-system/componentes/dashboard.template.meta.ts`
 * (`category: layout`, `origin: nephos-own`).
 *
 * O painel de visão geral. O que a moldura garante:
 *
 * - **a grade dos KPIs é dela**: troque `columns` e a parede inteira se
 *   realinha. Cada cartão decidindo a sua daria colunas desencontradas;
 * - **a troca de período é anunciada** em `role="status"`. Quem vê já
 *   sabe pelo filtro; sem o texto, quem ouve receberia números novos sem
 *   saber de quando são;
 * - **um `<h1>` só**; cada widget traz o próprio `<h2>`;
 * - **a variação nunca é só cor nem só seta**: cada KPI diz "+8% vs. mês
 *   anterior" em texto dentro de uma `p-tag`. Rode em escala de cinza —
 *   a informação continua lá;
 * - **nada de tudo colorido**: só a variação recebe cor de feedback. Se
 *   todo widget gritasse, nenhum se destacaria;
 * - os números usam `tabular-nums` para as colunas alinharem.
 *
 * ⚠️ **`p-chart` não entra nesta bancada:** ele depende de `chart.js`,
 * que não está instalado neste repositório. O slot `charts` está provado
 * aqui com `p-metergroup` (composição por categoria), que exercita a
 * mesma regra que importa — o desenho vem acompanhado da alternativa em
 * TEXTO ao lado. Instalar `chart.js` é decisão de dependência, não de
 * Design System.
 */
const meta: Meta<DashboardPageComponent> = {
  title: 'Nephos Templates/Dashboard',
  component: DashboardPageComponent,
  decorators: [
    moduleMetadata({
      imports: [
        DashboardPageComponent,
        HeadingComponent,
        TextComponent,
        FormsModule,
        CardModule,
        MeterGroupModule,
        SelectButtonModule,
        TagModule,
      ],
    }),
    applicationConfig({ providers: [provideRouter(ROTAS_DE_PROVA)] }),
  ],

  /**
   * Template de página inteira: na página de Docs, cada story vai para o
   * PRÓPRIO iframe. Inline, a página renderiza espremida no bloco estreito
   * da documentação, e os `provideRouter` das stories passam a dividir o
   * mesmo `window.location`.
   *
   * ⚠️ `height` é obrigatório quando `inline: false`.
   */
  parameters: {
    docs: { story: { inline: false, height: '760px' } },
  },
};

export default meta;
type Story = StoryObj<DashboardPageComponent>;

const PERIODOS = [
  { label: 'Dia', value: 'dia' },
  { label: 'Semana', value: 'semana' },
  { label: 'Mês', value: 'mês' },
  { label: 'Ano', value: 'ano' },
];

const COMPOSICAO = [
  { label: 'Integral', value: 42 },
  { label: 'Parcial', value: 33 },
  { label: 'Em análise', value: 25 },
];

const KPI = 'display:flex; flex-direction:column; gap: var(--nph-space-sm); align-items:flex-start;';

/**
 * Um KPI: rótulo, número e a variação em TEXTO dentro de uma tag. A cor
 * da tag reforça; quem carrega o significado é a frase.
 *
 * O número usa a classe `.nph-title-lg` da camada de token, e não o
 * átomo `heading`: um KPI não é um título da hierarquia do documento.
 */
const kpi = (titulo: string, numero: string, variacao: string, sobe: boolean) => `
  <p-card nphKpi>
    <div style="${KPI}">
      <nph-ui-heading [level]="2" size="title-sm">${titulo}</nph-ui-heading>

      <p class="nph-title-lg" style="font-variant-numeric: tabular-nums;">${numero}</p>

      <p-tag severity="${sobe ? 'success' : 'danger'}" value="${variacao}"></p-tag>
    </div>
  </p-card>
`;

/** O painel completo, em 4 colunas. Troque o período e ouça o anúncio. */
export const Padrao: Story = {
  name: 'Padrão',
  render: () => ({
    props: { periodos: PERIODOS, periodo: 'mês', composicao: COMPOSICAO },
    template: `
      <nph-pages-dashboard title="Visão geral das bolsas" [period]="periodo">
        <div nphPageActions role="group" aria-label="Período do painel">
          <p-selectbutton [options]="periodos"
                          optionLabel="label"
                          optionValue="value"
                          [(ngModel)]="periodo">
          </p-selectbutton>
        </div>

        ${kpi('Solicitações', '1.240', '+8% vs. mês anterior', true)}
        ${kpi('Aprovadas', '873', '+3% vs. mês anterior', true)}
        ${kpi('Em análise', '312', '-5% vs. mês anterior', false)}
        ${kpi('Recusadas', '55', '-2% vs. mês anterior', false)}

        <p-card nphChart>
          <nph-ui-heading [level]="2" size="title-sm">Composição por tipo de bolsa</nph-ui-heading>

          <p-metergroup [value]="composicao" labelPosition="end"></p-metergroup>

          <!-- A alternativa em TEXTO: o desenho é opaco para quem ouve a
               tela; a frase não é. -->
          <nph-ui-text size="caption" variant="muted">
            Integral 42%, parcial 33%, em análise 25%.
          </nph-ui-text>
        </p-card>

        <div nphActivity>
          <nph-ui-heading [level]="2" size="title-sm">Atividade recente</nph-ui-heading>
          <nph-ui-text size="body-sm" variant="muted">
            Nenhuma movimentação nas últimas 24 horas.
          </nph-ui-text>
        </div>
      </nph-pages-dashboard>
    `,
  }),
};

/**
 * O mesmo conteúdo em 2 colunas. Quatro KPIs espremidos não são quatro
 * KPIs: são quatro números ilegíveis — por isso a grade é da moldura.
 */
export const DuasColunas: Story = {
  name: 'Duas colunas',
  render: () => ({
    props: { periodos: PERIODOS, periodo: 'semana' },
    template: `
      <nph-pages-dashboard title="Visão geral das bolsas" period="semana" [columns]="2">
        <div nphPageActions role="group" aria-label="Período do painel">
          <p-selectbutton [options]="periodos"
                          optionLabel="label"
                          optionValue="value"
                          [(ngModel)]="periodo">
          </p-selectbutton>
        </div>

        ${kpi('Solicitações', '286', '+1% vs. semana anterior', true)}
        ${kpi('Aprovadas', '201', '+4% vs. semana anterior', true)}
      </nph-pages-dashboard>
    `,
  }),
};

/** Carregando: a grade fica `aria-busy` enquanto os números chegam. */
export const Carregando: Story = {
  render: () => ({
    template: `
      <nph-pages-dashboard title="Visão geral das bolsas" [loading]="true">
        ${kpi('Solicitações', '—', 'sem comparação disponível', true)}
      </nph-pages-dashboard>
    `,
  }),
};
