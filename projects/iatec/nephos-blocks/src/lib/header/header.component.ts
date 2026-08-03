import {ChangeDetectionStrategy, Component, computed, input, output, signal} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {AvatarModule} from 'primeng/avatar';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {OverlayBadgeModule} from 'primeng/overlaybadge';

import {IconComponent, LabelComponent, LogoComponent, NephosColorMode, ThemeToggleComponent} from '@iatec/nephos-ui';

/** Quem está logado. Só o que a barra precisa para se identificar. */
export interface NephosHeaderUser {
    nome: string;
    foto?: string;
}

let sequencia = 0;

/**
 * Ficha: `design-system/componentes/header.block.meta.ts` (origin: nephos-own).
 *
 * A barra global do topo. O que ela resolve não é o desenho — é a
 * **estrutura de landmarks**: um `<header role="banner">` por página, e um
 * `<nav>` COM RÓTULO, porque a sidebar traz outro `<nav>` e dois iguais
 * deixam quem navega por região sem saber em qual entrou. Aqui é
 * "Navegação principal"; lá é "Seções".
 *
 * **Nenhuma marca é escrita.** O logo vem do token `NEPHOS_BRAND` e a cor
 * de ênfase vem do tema da vertical ativa. A mesma barra serve as 7.
 *
 * **Nada só-ícone fica mudo.** Tema, notificações e conta são botões com
 * nome acessível; o contador entra no nome ("Notificações, 3 não lidas")
 * e o número visual fica decorativo, para não ser lido duas vezes.
 *
 * ⚠️ Dois pontos que o PrimeNG NÃO entrega e ficam registrados como
 * divergência, sem gambiarra por cima:
 *
 * 1. **`aria-current="page"` no item ativo.** O `p-menubar` marca o item
 *    atual só com a classe `p-menubar-item-link-active` — não vincula o
 *    `ariaCurrentWhenActive` do `routerLinkActive`. A ficha pede o estado
 *    programático; hoje ele sai só como cor.
 * 2. **O rótulo do botão de menu no mobile** vem de
 *    `config.translation.aria.navigation` do PrimeNG (inglês por padrão).
 *    É configuração de i18n do app, não deste bloco.
 *
 * Os outputs `navigate` e `logout` da ficha não nascem aqui: quem os
 * carrega é o `MenuItem` (`routerLink` / `command`), que é o mecanismo do
 * próprio PrimeNG. Duplicá-los criaria um segundo caminho, pior.
 */
@Component({
    selector: 'nph-blocks-header',
    imports: [
        NgTemplateOutlet,
        AvatarModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        MenuModule,
        MenubarModule,
        OverlayBadgeModule,
        IconComponent,
        LabelComponent,
        LogoComponent,
        ThemeToggleComponent
    ],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    /** As seções principais. `routerLink`/`command` vivem no próprio item. */
    readonly navItems = input<MenuItem[]>([]);

    /** Itens do menu da conta (perfil, sair). */
    readonly accountItems = input<MenuItem[]>([]);

    readonly user = input.required<NephosHeaderUser>();

    readonly showSearch = input(true);

    /** Diz O QUE se busca. Vira o rótulo oculto do campo. */
    readonly searchLabel = input('Buscar no sistema');

    readonly searchPlaceholder = input('Buscar…');

    /** Não lidas. `0` = sem contador. */
    readonly notificationsCount = input(0);

    readonly search = output<string>();
    readonly toggleTheme = output<NephosColorMode>();
    readonly notifications = output<void>();

    private readonly instancia = ++sequencia;

    protected readonly idBusca = `nph-header-busca-${this.instancia}`;
    protected readonly idMenuConta = `nph-header-conta-${this.instancia}`;

    /** O `aria-expanded` do gatilho tem que seguir o popup de verdade. */
    protected readonly menuAberto = signal(false);

    protected readonly temNotificacao = computed(() => this.notificationsCount() > 0);

    /** O contador entra no NOME do botão; o número visual fica decorativo. */
    protected readonly rotuloNotificacoes = computed(() =>
        this.temNotificacao()
            ? `Notificações, ${this.notificationsCount()} não lidas`
            : 'Notificações, nenhuma não lida'
    );

    protected readonly rotuloConta = computed(() => `Conta de ${this.user().nome}`);

    /** Iniciais só quando não há foto — o nome acessível está no botão. */
    protected readonly iniciais = computed(() =>
        this.user().nome
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((parte) => parte[0]?.toUpperCase() ?? '')
            .join('')
    );

    /** Esconde o número do leitor de tela: o botão já o anuncia. */
    protected readonly ptBadge = {pcBadge: {root: {'aria-hidden': 'true'}}};

    protected aoBuscar(valor: string): void {
        this.search.emit(valor);
    }
}
