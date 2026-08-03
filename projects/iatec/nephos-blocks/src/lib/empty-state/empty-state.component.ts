import {ChangeDetectionStrategy, Component, computed, input, output} from '@angular/core';
import {ButtonModule} from 'primeng/button';

import {HeadingComponent, IconComponent, NephosHeadingLevel, TextComponent} from '@iatec/nephos-ui';

/**
 * `primeiro-uso` convida a criar · `sem-resultado` sugere ajustar o filtro ·
 * `bloqueado` explica o que falta acontecer antes.
 */
export type NephosEmptyStateVariant = 'primeiro-uso' | 'sem-resultado' | 'bloqueado';

/** O ícone sóbrio de cada vazio. Font Awesome, sem o prefixo `fa-`. */
const ICONE_POR_VARIANTE: Record<NephosEmptyStateVariant, string> = {
    'primeiro-uso': 'inbox',
    'sem-resultado': 'magnifying-glass',
    'bloqueado': 'lock'
};

/**
 * Ficha: `design-system/componentes/empty-state.block.meta.ts` (origin: nephos-own).
 *
 * Três situações que parecem iguais na tela e não são:
 *   carregando → skeleton · erro → estado de erro · SEM DADOS → isto aqui.
 * Tratar as três igual engana quem usa, e é o erro que este bloco existe
 * para não deixar acontecer.
 *
 * A `variant` não é decoração: ela muda a ação certa. Em `primeiro-uso` a
 * ação convida a criar; em `sem-resultado` a pessoa JÁ buscou algo — a
 * ação correta é limpar/ajustar o filtro, nunca "Criar item" (é uma
 * `invalidCombination` declarada na ficha).
 *
 * O nível do título é do CONTEXTO da página (`headingLevel`), não do
 * bloco: um vazio dentro de uma seção não pode virar o `<h1>` da tela.
 */
@Component({
    selector: 'nph-blocks-empty-state',
    imports: [
        ButtonModule,
        HeadingComponent,
        IconComponent,
        TextComponent
    ],
    templateUrl: './empty-state.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
    readonly variant = input<NephosEmptyStateVariant>('primeiro-uso');

    /** Frase curta que nomeia o vazio ("Nenhum relatório ainda"). */
    readonly title = input.required<string>();

    /** Uma linha dizendo o que fazer. */
    readonly description = input<string | null>(null);

    /** Nível do título na hierarquia da página. */
    readonly headingLevel = input<NephosHeadingLevel>(2);

    /** Sobrescreve o ícone da variante. Sempre decorativo. */
    readonly icon = input<string | null>(null);

    /** Desligar quando não há ação óbvia. */
    readonly showAction = input(true);

    /** O VERBO da ação ("Criar relatório", "Limpar filtros"). */
    readonly actionLabel = input<string | null>(null);

    readonly action = output<void>();

    protected readonly iconName = computed(() => this.icon() ?? ICONE_POR_VARIANTE[this.variant()]);

    /** Sem rótulo não há ação: um botão mudo é pior que botão nenhum. */
    protected readonly acaoVisivel = computed(() => this.showAction() && !!this.actionLabel());
}
