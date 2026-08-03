import {ChangeDetectionStrategy, Component, computed, effect, input, model} from '@angular/core';

import {IconComponent} from '../icon/icon.component';

export type NephosColorMode = 'light' | 'dark';

/** `button` alterna a cada clique · `switch` expõe ligado/desligado. */
export type NephosThemeToggleDisplay = 'button' | 'switch';

/**
 * Mesma chave e mesma classe do `LayoutService.toggleDarkMode()` do
 * `@iatec/nephos-layout`. Não é coincidência: os dois precisam
 * concordar, senão o app abre num modo e o botão diz outro.
 */
const CHAVE_PERSISTENCIA = 'nph:darkMode';
const CLASSE_ESCURO = 'app-dark';

/**
 * Preferência do sistema primeiro, escolha manual por cima — nesta ordem.
 * Começar sempre no claro contraria quem configurou o sistema no escuro.
 */
function modoInicial(): NephosColorMode {
    const salvo = localStorage.getItem(CHAVE_PERSISTENCIA);
    if (salvo !== null) {
        return salvo === 'true' ? 'dark' : 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Ficha: `design-system/componentes/theme-toggle.meta.ts` (origin: nephos-own).
 *
 * Alterna o eixo `surface` (claro/escuro) ligando `.app-dark` na raiz —
 * o `@primeuix/themes` remapeia o `colorScheme` sozinho a partir daí.
 *
 * ⚠️ NÃO confundir com troca de MARCA. São os dois eixos do sistema e
 * só um deles é escolha da pessoa:
 *   modo  = `surface` (claro/escuro)  → controle de produto, é este aqui.
 *   marca = `primary` (vertical)      → vem do contexto, nunca um seletor.
 *
 * Um ícone sol/lua sozinho não diz nem a ação nem o modo atual: por isso
 * o nome acessível e o ESTADO (`aria-pressed` / `aria-checked`) são
 * obrigatórios, e o ícone fica decorativo.
 */
@Component({
    selector: 'nph-ui-theme-toggle',
    imports: [
        IconComponent
    ],
    templateUrl: './theme-toggle.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {
    /** Modo atual. Two-way: emite `modeChange` a cada alternância. */
    readonly mode = model<NephosColorMode>(modoInicial());

    readonly display = input<NephosThemeToggleDisplay>('button');

    /** Nome acessível do controle. */
    readonly label = input('Alternar tema claro e escuro');

    protected readonly escuro = computed(() => this.mode() === 'dark');

    /** Mostra o destino da ação: no escuro oferece o sol, no claro a lua. */
    protected readonly iconName = computed(() => (this.escuro() ? 'sun' : 'moon'));

    constructor() {
        effect(() => this.aplicar(this.mode()));
    }

    protected alternar(): void {
        this.mode.set(this.escuro() ? 'light' : 'dark');
    }

    private aplicar(modo: NephosColorMode): void {
        const escuro = modo === 'dark';
        document.documentElement.classList.toggle(CLASSE_ESCURO, escuro);
        localStorage.setItem(CHAVE_PERSISTENCIA, String(escuro));
    }
}
