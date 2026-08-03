import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {RouterLink} from '@angular/router';

/**
 * `inline` = dentro de um parágrafo (sublinhado) · `muted` = link
 * secundário de baixa ênfase · `default` = link de marca autônomo.
 */
export type NephosLinkVariant = 'default' | 'muted' | 'inline';

/**
 * Ficha: `design-system/componentes/link.meta.ts` (origin: nephos-own).
 *
 * A fronteira mais importante do sistema: `<a>` NAVEGA (tem destino),
 * `<button>` AGE. Se não há destino, isto aqui é o componente errado —
 * use Button. Decida pela função, nunca pela aparência.
 *
 * O texto do link é lido fora de contexto por quem navega pela lista de
 * links: "Ver histórico de bolsas", não "clique aqui".
 */
@Component({
    selector: 'nph-ui-link',
    imports: [
        NgTemplateOutlet,
        RouterLink
    ],
    templateUrl: './link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent {
    /** Destino externo ao roteador (outro site, documento, âncora, mailto). */
    readonly href = input<string | null>(null);

    /** Destino interno. Tem precedência sobre `href` quando os dois vêm. */
    readonly routerLink = input<string | unknown[] | null>(null);

    /**
     * Abre em nova aba. Quando true, o componente acrescenta
     * `rel="noopener noreferrer"` e o aviso "(abre em nova aba)" — abrir
     * uma aba sem avisar tira o controle de quem não vê a mudança.
     */
    readonly external = input(false);

    readonly variant = input<NephosLinkVariant>('default');

    protected readonly classes = computed(() => {
        const variacao = this.variant();
        return variacao === 'default' ? 'nph-link' : `nph-link nph-link--${variacao}`;
    });

    protected readonly target = computed(() => (this.external() ? '_blank' : null));

    protected readonly rel = computed(() => (this.external() ? 'noopener noreferrer' : null));
}
