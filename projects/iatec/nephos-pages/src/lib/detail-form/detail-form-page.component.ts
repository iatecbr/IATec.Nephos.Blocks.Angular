import {ChangeDetectionStrategy, Component, input} from '@angular/core';

import {HeadingComponent} from '@iatec/nephos-ui';

/** `view` = só leitura · `edit` = registro existente · `create` = em branco. */
export type NephosDetailFormMode = 'view' | 'edit' | 'create';

/** Colunas do grid de campos dentro de cada seção (cai para 1 no mobile). */
export type NephosDetailFormColumns = 1 | 2;

let sequencia = 0;

/**
 * Ficha: `design-system/componentes/detail-form.template.meta.ts`
 * (category: `layout`, origin: `nephos-own`).
 *
 * A página de UM registro: ver, editar ou criar. Vive dentro da área de
 * conteúdo do `app-shell`, como a `listing`.
 *
 * **A moldura não desenha campo nenhum — e isso é o ponto.** Campo,
 * rótulo, erro e `autocomplete` são contrato dos componentes de
 * formulário, cada um com a sua ficha. O que só a moldura pode dar é a
 * ESTRUTURA: uma região nomeada, um `<h1>` só, o resumo de erros antes
 * dos campos e a grade que põe dois campos lado a lado sem que cada
 * seção tenha que reinventá-la.
 *
 * **A ordem no DOM é a ordem da leitura.** O resumo de erros vem ANTES
 * das seções, porque é para lá que o foco vai ao submeter inválido —
 * quem ouve a tela precisa receber o resumo antes de voltar aos campos.
 *
 * **`columns` é da moldura, mas aplicado pela seção.** A moldura conhece
 * o `columns` e o breakpoint, então é ela que CALCULA a grade; o
 * `<fieldset>` é conteúdo projetado e o encapsulamento do Angular não
 * alcança lá dentro. O valor sai como custom property (que herda para o
 * conteúdo projetado, ao contrário de uma regra de CSS) e a seção o
 * gasta:
 *
 * ```html
 * <fieldset nphSections style="display:grid; grid-template-columns: var(--nph-detail-grid)">
 * ```
 *
 * A regra fica num lugar só; se cada seção decidisse a sua, elas
 * desalinhariam entre si.
 *
 * ✅ As perguntas que este template abriu foram FECHADAS pela Indiane em
 * 04/08/2026, e a ficha foi corrigida para descrever o que a peça
 * realmente é:
 *
 * - **template é MOLDURA, não tela pronta.** Por isso os outputs `save` /
 *   `cancel` / `fieldChange` saíram da ficha: os botões e os campos são
 *   projetados, e quem os tem já está ligado neles. Uma moldura que
 *   reemitisse esses eventos seria só um repasse — e um repasse que se
 *   desatualiza.
 * - **`errors: string[]` saiu da ficha.** Ela exige que o resumo tenha
 *   LINKS para os campos, e uma lista de strings não carrega as âncoras.
 *   Um resumo sem links seria exatamente o meio-termo que o anti-padrão
 *   da própria ficha proíbe. O resumo entra pronto pelo slot
 *   `nphErrorSummary`.
 * - **`dirty` não bloqueia a saída.** Avisar antes de sair é guarda de
 *   rota (`CanDeactivate`), decisão da aplicação. Aqui ele só sai como
 *   `data-dirty`, para quem monta a guarda ter onde se apoiar.
 * - **título de página é `title-lg`**, como o `design.md` sempre disse; o
 *   `title-sm` segue valendo para a legenda de cada seção.
 */
@Component({
    selector: 'nph-pages-detail-form',
    imports: [
        HeadingComponent
    ],
    templateUrl: './detail-form-page.component.html',
    styleUrls: ['./detail-form-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailFormPageComponent {
    /** O nome do registro ("Escola Adventista de Brasília"). Vira o `<h1>` e o nome da região. */
    readonly title = input.required<string>();

    /** Só leitura, edição ou criação. Sai como `data-mode`. */
    readonly mode = input<NephosDetailFormMode>('view');

    /** Colunas do grid de campos. 2 no desktop; sempre 1 no mobile. */
    readonly columns = input<NephosDetailFormColumns>(2);

    /** Há mudanças não salvas. Sai como `data-dirty` para a guarda de rota do app. */
    readonly dirty = input(false);

    protected readonly idTitulo = `nph-detail-titulo-${++sequencia}`;
}
