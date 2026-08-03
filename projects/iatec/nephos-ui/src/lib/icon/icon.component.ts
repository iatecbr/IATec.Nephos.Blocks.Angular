import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';

import {NephosIconStyle} from '../nephos-ui.tokens';

/**
 * Ficha: `design-system/componentes/icon.meta.ts` (origin: nephos-own).
 *
 * O set do Nephos é **Font Awesome** (hoje 7), nunca PrimeIcons. O
 * componente só emite a classe `fa-<estilo> fa-<nome>`: a fonte é
 * carregada pelo app (ver `lib/nephos-ui.scss` › como carregar).
 *
 * A pergunta que decide a acessibilidade inteira vem antes do desenho:
 * o ícone é DECORATIVO (acompanha um texto que já diz tudo) ou
 * SIGNIFICATIVO (é a única informação)?
 *
 *   decorativo    → `aria-hidden="true"`, e o texto ao lado responde.
 *   significativo → `role="img"` + `aria-label` (input `label`).
 *
 * Num botão só de ícone o nome acessível fica no `<button>`, e o ícone
 * continua decorativo — não duplique o nome nos dois.
 *
 * Nomes mudaram entre FA5→6→7 (`search`→`magnifying-glass`,
 * `times`→`xmark`, `trash`→`trash-can`, `home`→`house`). Validar em
 * fontawesome.com/icons; fora do set, pedir ao time de DS.
 */
@Component({
    selector: 'nph-ui-icon',
    imports: [],
    templateUrl: './icon.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
    /** Nome Font Awesome em kebab-case, SEM o prefixo `fa-`. */
    readonly name = input.required<string>();

    /**
     * Família do FA. Renomeado de `style` (o nome na ficha) porque `style`
     * é binding reservado no template do Angular e colidiria.
     */
    readonly iconStyle = input<NephosIconStyle>('solid');

    /** true = acompanha um texto e some do leitor de tela. */
    readonly decorative = input(true);

    /** Nome acessível — obrigatório quando `decorative` é false. */
    readonly label = input<string | null>(null);

    /** Largura fixa (`fa-fw`) para alinhar ícones em listas e menus. */
    readonly fixedWidth = input(false);

    /** Só no ícone de carregando. O `prefers-reduced-motion` é respeitado no CSS. */
    readonly spin = input(false);

    protected readonly classes = computed(() => {
        const partes = ['nph-icon', `fa-${this.iconStyle()}`, `fa-${this.name()}`];

        if (this.fixedWidth()) {
            partes.push('fa-fw');
        }

        if (this.spin()) {
            partes.push('fa-spin');
        }

        return partes.join(' ');
    });

    /** Significativo vira `role="img"`; decorativo não tem role nenhum. */
    protected readonly role = computed(() => (this.decorative() ? null : 'img'));

    protected readonly ariaHidden = computed(() => (this.decorative() ? 'true' : null));

    protected readonly ariaLabel = computed(() => (this.decorative() ? null : this.label()));
}
