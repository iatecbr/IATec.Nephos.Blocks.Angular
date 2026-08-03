import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';

/** `hint` = ajuda neutra · `danger` = mensagem de erro da validação. */
export type NephosHelperVariant = 'hint' | 'danger';

/**
 * Ficha: `design-system/componentes/helper-text.meta.ts` (origin: nephos-own).
 *
 * O que faz esta peça funcionar não é a cor: é a LIGAÇÃO com o campo. O
 * campo aponta `aria-describedby` para o `id` gerado aqui — sem isso o
 * texto fica solto e o leitor de tela não o anuncia ao focar o controle.
 *
 * O `id` é derivado do campo descrito, no mesmo padrão do exemplo da
 * ficha: `email` → `email-ajuda` (hint) e `email-erro` (danger). Assim o
 * campo pode declarar os dois de uma vez:
 *
 *   aria-describedby="email-ajuda email-erro"
 *
 * Erro nunca é sinalizado só por cor — a frase diz o que corrigir.
 */
@Component({
    selector: 'nph-ui-helper-text',
    imports: [],
    templateUrl: './helper-text.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelperTextComponent {
    /** `id` do campo que este texto descreve. */
    readonly htmlFor = input.required<string>({alias: 'for'});

    readonly variant = input<NephosHelperVariant>('hint');

    /**
     * `polite` quando o texto aparece DEPOIS (validação assíncrona): o
     * leitor de tela anuncia sem roubar o foco. Ajuda estática fica `off`.
     */
    readonly live = input<'off' | 'polite'>('off');

    /** `email` + `danger` → `email-erro`; `email` + `hint` → `email-ajuda`. */
    readonly elementId = computed(
        () => `${this.htmlFor()}-${this.variant() === 'danger' ? 'erro' : 'ajuda'}`
    );

    protected readonly classes = computed(
        () => `nph-helper-text${this.variant() === 'danger' ? ' nph-helper-text--danger' : ''}`
    );

    protected readonly ariaLive = computed(() => (this.live() === 'polite' ? 'polite' : null));
}
