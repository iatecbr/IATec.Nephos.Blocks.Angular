import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';

import {NephosTextEmphasis, NephosTextSize, NephosTextVariant} from '../nephos-ui.tokens';

/**
 * Ficha: `design-system/componentes/text.meta.ts` (origin: nephos-own).
 *
 * Corpo de texto corrido. Duas regras carregam o componente inteiro:
 * ênfase é SIGNIFICADO (`<strong>` importa, `<em>` entoa) e nunca
 * estética; e texto corrido jamais recebe a cor da marca — `primary`
 * quer dizer ação, e num parágrafo vira um link que não existe.
 */
@Component({
    selector: 'nph-ui-text',
    imports: [
        NgTemplateOutlet
    ],
    templateUrl: './text.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent {
    /** Token de tamanho — escolhido pela função, não pelo px. */
    readonly size = input<NephosTextSize>('body-lg');

    /** `muted` é texto de apoio; não usar no conteúdo que precisa ser lido inteiro. */
    readonly variant = input<NephosTextVariant>('default');

    /** Ênfase inline com significado. */
    readonly emphasis = input<NephosTextEmphasis>('none');

    protected readonly classes = computed(() => {
        const cor = this.variant() === 'muted' ? ' nph-text-muted' : '';
        return `nph-${this.size()}${cor}`;
    });
}
