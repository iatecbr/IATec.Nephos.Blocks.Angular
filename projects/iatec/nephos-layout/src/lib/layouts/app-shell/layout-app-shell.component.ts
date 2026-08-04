import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';

/**
 * Duas molduras na mesma página teriam o mesmo `id` no `<main>`, e o
 * "pular para o conteúdo" da segunda levaria para a primeira.
 */
let sequencia = 0;

/**
 * Ficha: `design-system/componentes/app-shell.template.meta.ts`
 * (category: `layout`, origin: `nephos-own`).
 *
 * A moldura das telas de DENTRO: header no topo, navegação lateral à
 * esquerda e o `<main>` onde cada página troca o conteúdo. Assim como o
 * `auth`, é um template — não desenha nada, arruma. Header e sidebar
 * chegam pelos slots (são os blocos do `@iatec/nephos-blocks`), e é por
 * isso que este pacote não importa aquele.
 *
 * Quatro decisões carregam o componente:
 *
 * **Um `<main>` único, e ele é o alvo do "pular para o conteúdo".** O
 * skip link é o primeiro elemento focável da página. Sem ele, quem
 * navega por teclado repassa o header e a lateral inteiros em CADA tela.
 * O `<main>` recebe `tabindex="-1"` porque um `<main>` comum não é
 * focável: sem isso o link pula o scroll mas deixa o foco para trás, e
 * o próximo Tab volta para a navegação.
 *
 * **A moldura NÃO rotula as navegações.** Quem traz `role="banner"` e o
 * `<nav aria-label="Navegação principal">` é o bloco `header`; quem traz
 * o `<nav aria-label="Seções">` é o bloco `sidebar`. A moldura só
 * garante que os dois cabem em regiões diferentes — se ela também
 * rotulasse, os landmarks sairiam duplicados.
 *
 * **A largura da lateral é DAQUI.** O bloco `sidebar` não declara
 * largura de propósito: espaço é do contêiner. Os dois valores
 * (expandida e recolhida) são os que o próprio layout do repositório já
 * usa em produção — herdados, não inventados.
 *
 * **`sidebarCollapsed` é largura, não estado do bloco.** A moldura não
 * alcança um bloco projetado; ela reserva a coluna. Quem consome liga o
 * MESMO sinal aqui e no `collapsed` do bloco, para os dois concordarem.
 */
@Component({
    selector: 'nph-layout-app-shell',
    imports: [
        NgTemplateOutlet
    ],
    templateUrl: './layout-app-shell.component.html',
    styleUrls: ['./layout-app-shell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutAppShellComponent {
    /** Desligar em telas foco-no-conteúdo (leitura, wizard em tela cheia). */
    readonly showSidebar = input(true);

    /** Desligar em telas rasas — trilha de um nível só é ruído. */
    readonly showBreadcrumb = input(true);

    /**
     * Reserva a coluna estreita (trilha de ícones) em vez da larga.
     * Ligar ao mesmo sinal que controla o `collapsed` do bloco `sidebar`.
     */
    readonly sidebarCollapsed = input(false);

    /** Texto do "pular para o conteúdo" — traduzível pelo app. */
    readonly skipLinkLabel = input('Pular para o conteúdo');

    protected readonly idConteudo = `nph-shell-conteudo-${++sequencia}`;
}
