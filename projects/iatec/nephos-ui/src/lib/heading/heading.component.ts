import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';

import {NephosHeadingLevel, NephosTitleSize} from '../nephos-ui.tokens';

/**
 * Ficha: `design-system/componentes/heading.meta.ts` (origin: nephos-own).
 *
 * O NÍVEL é estrutura (a árvore que o leitor de tela percorre); o TAMANHO
 * é aparência. São independentes de propósito — escolha o `level` pela
 * posição na hierarquia e ajuste o `size` só se a hierarquia visual pedir.
 * Nunca pule níveis e mantenha um único `<h1>` por página.
 */
@Component({
    selector: 'nph-ui-heading',
    imports: [
        NgTemplateOutlet
    ],
    templateUrl: './heading.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadingComponent {
    /** Nível da hierarquia. Um h2 vem depois de um h1, nunca depois de nada. */
    readonly level = input.required<NephosHeadingLevel>();

    /** Token de tamanho. Omitido, segue o nível (ver `sizeToken`). */
    readonly size = input<NephosTitleSize | null>(null);

    /**
     * Tamanho padrão por nível, conforme o uso declarado no `design.md`:
     * title-lg = título de página · title-md = título de bloco ·
     * title-sm = título de seção.
     */
    protected readonly sizeToken = computed<NephosTitleSize>(() => {
        const escolhido = this.size();
        if (escolhido) {
            return escolhido;
        }

        switch (this.level()) {
            case 1:
                return 'title-lg';
            case 2:
                return 'title-md';
            default:
                return 'title-sm';
        }
    });

    protected readonly classes = computed(() => `nph-heading nph-${this.sizeToken()}`);
}
