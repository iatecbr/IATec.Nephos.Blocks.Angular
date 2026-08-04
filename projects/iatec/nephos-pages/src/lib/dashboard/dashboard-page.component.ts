import {ChangeDetectionStrategy, Component, input} from '@angular/core';

import {HeadingComponent} from '@iatec/nephos-ui';

/** Janela de tempo dos indicadores. */
export type NephosDashboardPeriod = 'dia' | 'semana' | 'mês' | 'ano';

/** Colunas da grade de KPIs no desktop. */
export type NephosDashboardColumns = 2 | 3 | 4;

let sequencia = 0;

/**
 * Ficha: `design-system/componentes/dashboard.template.meta.ts`
 * (category: `layout`, origin: `nephos-own`).
 *
 * O painel de visão geral: KPIs, gráficos, composição e atividade. Vive
 * dentro da área de conteúdo do `app-shell`, como as outras páginas.
 *
 * **A grade dos KPIs é da moldura.** É o único lugar onde a decisão de
 * quantas colunas cabe: cada cartão decidindo a sua daria uma parede
 * desalinhada. `columns` vale no desktop; abaixo do breakpoint a grade
 * cai sozinha para o que couber.
 *
 * **A troca de período é ANUNCIADA.** A ficha pede que a atualização
 * chegue a quem ouve a tela, e é a moldura que sabe qual período está
 * valendo — cada widget só conhece o próprio número. Daí o
 * `role="status"` com o período em texto: quem vê já tinha a informação
 * pelo filtro, quem ouve passa a ter também.
 *
 * **Um `<h1>` só; cada widget traz o seu `<h2>`.** A moldura não escreve
 * título de widget — isso é do cartão projetado. O que ela garante é que
 * existe exatamente um título de página acima de todos.
 *
 * ⚠️ Divergências da ficha, registradas e não resolvidas por conta
 * própria (ver o handoff):
 *
 * - **os outputs `periodChange` / `widgetDrill` não nascem aqui.** O
 *   filtro de período e os widgets são projetados; quem os tem já está
 *   ligado neles. A moldura só REAGE ao período que recebe.
 * - **`loading` não desenha esqueleto**, marca `aria-busy` na grade. O
 *   esqueleto é de cada widget, que é quem sabe a própria forma.
 * - **tamanho do título**: a ficha diz `title-sm`; o `design.md` e o
 *   átomo `heading` dizem `title-lg` para título de página. Vale o
 *   `design.md` — a ficha precisa de decisão.
 */
@Component({
    selector: 'nph-pages-dashboard',
    imports: [
        HeadingComponent
    ],
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
    /** Título do painel. Vira o `<h1>` e o nome da região. */
    readonly title = input.required<string>();

    /** Janela de tempo em vigor. Entra no anúncio e sai como `data-period`. */
    readonly period = input<NephosDashboardPeriod>('mês');

    /** Colunas da grade de KPIs no desktop. */
    readonly columns = input<NephosDashboardColumns>(4);

    /** Marca a grade como em atualização enquanto os números chegam. */
    readonly loading = input(false);

    protected readonly idTitulo = `nph-dashboard-titulo-${++sequencia}`;
}
