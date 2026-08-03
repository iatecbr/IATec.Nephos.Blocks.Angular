import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';

/**
 * Ficha: `design-system/componentes/label.meta.ts` (origin: nephos-own).
 *
 * Regra dura do sistema: TODO campo tem rótulo associado. O placeholder
 * não é rótulo — some ao digitar e não é lido de forma confiável. Se o
 * rótulo não pode aparecer, esconda-o (`visualHidden`); nunca o remova.
 *
 * O asterisco de obrigatório é decoração (`aria-hidden`): quem informa a
 * obrigatoriedade é o `aria-required="true"` no CAMPO, não este texto.
 */
@Component({
    selector: 'nph-ui-label',
    imports: [],
    templateUrl: './label.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent {
    /**
     * `id` do controle que este rótulo nomeia. É o que liga
     * clique-no-rótulo → foco-no-campo e o que dá nome acessível ao campo.
     */
    readonly htmlFor = input.required<string>({alias: 'for'});

    /**
     * Mostra o marcador visual de obrigatório. Não substitui o
     * `aria-required="true"` no campo — os dois andam juntos.
     */
    readonly required = input(false);

    /**
     * Rótulo presente para quem ouve, ausente para quem vê. Só quando o
     * contexto visual já deixa o campo óbvio (ex.: busca com ícone).
     */
    readonly visualHidden = input(false);

    protected readonly classes = computed(
        () => `nph-label${this.visualHidden() ? ' nph-visually-hidden' : ''}`
    );
}
