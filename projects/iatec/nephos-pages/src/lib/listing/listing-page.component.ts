import {ChangeDetectionStrategy, Component, input} from '@angular/core';

import {HeadingComponent} from '@iatec/nephos-ui';

/** Como o resultado é apresentado: colunas comparáveis × itens visuais. */
export type NephosListingView = 'table' | 'cards';

/**
 * Duas listagens na mesma página apontariam o `aria-labelledby` da segunda
 * para o título da primeira.
 */
let sequencia = 0;

/**
 * Ficha: `design-system/componentes/listing.template.meta.ts`
 * (category: `layout`, origin: `nephos-own`).
 *
 * A página mais comum do produto: título com ação, busca/filtros,
 * resultado e paginação. Vive DENTRO da área de conteúdo do `app-shell`
 * — por isso é uma `<section>` nomeada, não um segundo `<main>`.
 *
 * **O título é da moldura, e é isso que faz a região ter nome.** A ficha
 * pede `<section>` rotulada por `aria-labelledby` do título. Um título
 * projetado não teria como ser referenciado: a moldura não alcança o id
 * de um conteúdo que não é dela. Daí o `<h1>` nascer aqui e as AÇÕES da
 * página virem pelo slot — quem tem o botão é quem sabe o que ele faz.
 *
 * **Um `<h1>` só, e ele é este.** O bloco de resultado usa `<caption>` e
 * `<h2>`; o `empty-state` nasce em `<h2>`. Se a página também usasse o
 * `pageHeader` do `app-shell`, sairiam dois — é um ou outro.
 *
 * **`loading` vira `aria-busy` na região do resultado.** O esqueleto de
 * carregamento é do bloco (é ele que sabe quantas linhas desenhar); o
 * que só a moldura pode fazer é avisar que aquela região está em
 * atualização.
 *
 * ✅ As três perguntas que este template abriu foram FECHADAS pela
 * Indiane em 04/08/2026, e a ficha foi corrigida para descrever o que a
 * peça realmente é:
 *
 * - **template é MOLDURA, não tela pronta.** As peças entram pelos
 *   slots, já ligadas por quem as tem.
 * - **`primaryAction: { label }` saiu da ficha.** Um rótulo sem um
 *   output correspondente seria um botão que não faz nada. A ação
 *   primária entra pelo slot `nphPageActions`.
 * - **`view` não muda o arranjo**, só sai como `data-view`: quem desenha
 *   tabela ou cards é o bloco projetado (`data-table` × `dataview`), e a
 *   moldura não deve adivinhar qual chegou.
 * - **título de página é `title-lg`**, como o `design.md` (a
 *   especificação normativa) sempre disse. As 5 fichas diziam `title-sm`
 *   e foram corrigidas.
 */
@Component({
    selector: 'nph-pages-listing',
    imports: [
        HeadingComponent
    ],
    templateUrl: './listing-page.component.html',
    styleUrls: ['./listing-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListingPageComponent {
    /** Nomeia o que está sendo listado ("Escolas"). Vira o `<h1>` e o nome da região. */
    readonly title = input.required<string>();

    /** Só informativo para CSS/QA: quem desenha o resultado é o bloco projetado. */
    readonly view = input<NephosListingView>('table');

    /** Marca a região do resultado como em atualização. */
    readonly loading = input(false);

    protected readonly idTitulo = `nph-listing-titulo-${++sequencia}`;
}
