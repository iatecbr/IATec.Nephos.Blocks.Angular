import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';

import {NEPHOS_BRAND} from '../nephos-brand';

/** `full` = símbolo + nome (topo espaçoso) · `symbol` = só o símbolo. */
export type NephosLogoVariant = 'full' | 'symbol';

/**
 * Ficha: `design-system/componentes/logo.meta.ts` (origin: nephos-own).
 *
 * O asset e o nome vêm do token `NEPHOS_BRAND` — a vertical é contexto,
 * não escolha. Os inputs `src`/`alt` existem só para casos em que a
 * marca já foi resolvida fora (um serviço de tema, por exemplo); nenhum
 * dos dois deve receber um valor literal de marca escrito à mão.
 *
 * Como link, o `alt` é o nome acessível: um logo sem alt vira um "link"
 * anônimo para quem ouve a página.
 *
 * O tamanho é do contexto (`.nph-logo` no CSS do app) — o logo não é
 * distorcido nem recolorido para caber.
 */
@Component({
    selector: 'nph-ui-logo',
    imports: [
        NgTemplateOutlet
    ],
    templateUrl: './logo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
    private readonly brand = inject(NEPHOS_BRAND, {optional: true});

    readonly variant = input<NephosLogoVariant>('full');

    /** Destino ao clicar. `null` deixa o logo como imagem, sem link. */
    readonly href = input<string | null>('/');

    /** Sobrescreve o asset da marca ativa (já resolvido fora). */
    readonly src = input<string | null>(null);

    /** Sobrescreve o nome da marca ativa (já resolvido fora). */
    readonly alt = input<string | null>(null);

    protected readonly assetUrl = computed(() => {
        const informado = this.src();
        if (informado) {
            return informado;
        }

        if (!this.brand) {
            return null;
        }

        return this.variant() === 'symbol' ? this.brand.logoSymbol : this.brand.logoFull;
    });

    protected readonly altText = computed(() => this.alt() ?? this.brand?.name ?? null);
}
