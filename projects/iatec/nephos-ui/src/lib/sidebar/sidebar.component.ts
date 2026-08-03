import {ChangeDetectionStrategy, Component, computed, input, model} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {DrawerModule} from 'primeng/drawer';
import {PanelMenuModule} from 'primeng/panelmenu';
import {TooltipModule} from 'primeng/tooltip';

import {IconComponent} from '../icon/icon.component';

let sequencia = 0;

/**
 * Ficha: `design-system/componentes/sidebar.block.meta.ts` (origin: nephos-own).
 *
 * A navegação lateral. O rótulo do landmark é **"Seções"**, e isso não é
 * detalhe: o `header` já traz um `<nav aria-label="Navegação principal">`.
 * Dois `<nav>` iguais (ou sem rótulo) deixam quem navega por região sem
 * saber em qual dos dois entrou.
 *
 * **Recolhida ≠ escondida.** Na trilha de ícones cada item mantém o
 * rótulo original como nome acessível (e como tooltip para quem vê). Um
 * ícone sozinho é ambíguo; sem `aria-label` ele é mudo.
 *
 * **Persistente no desktop, off-canvas no mobile.** No desktop a
 * navegação não bloqueia o conteúdo — dialog modal é padrão de Drawer
 * TEMPORÁRIO (filtros, detalhes), não de navegação fixa. O `mobile` é
 * input porque o breakpoint é decisão de layout do app (aqui o
 * `LayoutService` do `@iatec/nephos-layout`), não deste bloco.
 *
 * ⚠️ Duas divergências do `p-panelMenu`, medidas no DOM e registradas sem
 * gambiarra por cima:
 *
 * 1. **`aria-current="page"` no item atual.** Ele marca o item só com a
 *    classe `p-panelmenu-item-link-active` — não vincula o
 *    `ariaCurrentWhenActive` do `routerLinkActive`. A ficha pede o estado
 *    programático; hoje ele sai só como cor. (Mesmo caso do `header`.)
 * 2. **`aria-expanded` no cabeçalho de seção.** O cabeçalho sai
 *    `role="button"` + `tabindex="0"` + `aria-controls` apontando para um
 *    `role="region"` — mas SEM `aria-expanded`. Quem ouve a tela recebe
 *    "botão, Cadastros" e não sabe se a seção está aberta ou fechada.
 *
 * O output `navigate` da ficha não nasce aqui: quem navega é o
 * `routerLink` / `command` do próprio `MenuItem`, que é o mecanismo do
 * PrimeNG.
 */
@Component({
    selector: 'nph-ui-sidebar',
    imports: [
        NgTemplateOutlet,
        RouterLink,
        DrawerModule,
        PanelMenuModule,
        TooltipModule,
        IconComponent
    ],
    templateUrl: './sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    /** As seções e seus itens. `icon` é a classe Font Awesome completa. */
    readonly items = input<MenuItem[]>([]);

    /** Recolhida na trilha de ícones. Two-way: o app pode persistir. */
    readonly collapsed = model(false);

    /** Desligar onde a lateral é fixa por decisão de tela. */
    readonly collapsible = input(true);

    /** O app decide pelo breakpoint; o bloco só renderiza o modo. */
    readonly mobile = input(false);

    /** No mobile a lateral vira off-canvas; no desktop fica persistente. */
    readonly mobileOffCanvas = input(true);

    /** Abre/fecha o off-canvas. Quem abre é o botão do header. */
    readonly drawerVisible = model(false);

    protected readonly idNav = `nph-sidebar-${++sequencia}`;

    /** Só é gaveta quando as duas coisas valem: é mobile E foi pedido. */
    protected readonly emGaveta = computed(() => this.mobile() && this.mobileOffCanvas());

    /** Na gaveta a trilha de ícones não faz sentido: o espaço já é todo dela. */
    protected readonly emTrilha = computed(() => this.collapsed() && !this.emGaveta());

    protected readonly rotuloRecolher = computed(() =>
        this.collapsed() ? 'Expandir menu lateral' : 'Recolher menu lateral'
    );

    protected readonly iconeRecolher = computed(() =>
        this.collapsed() ? 'angles-right' : 'angles-left'
    );

    protected alternarRecolhida(): void {
        this.collapsed.set(!this.collapsed());
    }

    /** Um grupo na trilha não tem onde abrir: expandir é o passo honesto. */
    protected expandir(): void {
        this.collapsed.set(false);
    }

    protected ehGrupo(item: MenuItem): boolean {
        return !!item.items?.length;
    }
}
