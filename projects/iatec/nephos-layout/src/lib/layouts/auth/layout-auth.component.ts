import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';

/** Qual fluxo de acesso a moldura está hospedando. */
export type NephosAuthVariant = 'login' | 'signup' | 'reset';

/** `centered` = cartão único no meio; `split` = painel de marca ao lado. */
export type NephosAuthLayout = 'centered' | 'split';

/**
 * O painel de identidade do layout `split`.
 *
 * É DECORATIVO por contrato: some no mobile (a ficha declara isso como
 * anti-padrão se algo essencial morar lá) e a `<aside>` inteira nasce
 * `aria-hidden`. Nunca projetar conteúdo focável dentro dele.
 */
export interface NephosAuthBrandPanel {
    imagem?: string;
    texto?: string;
}

/**
 * Ficha: `design-system/componentes/auth.template.meta.ts`
 * (category: `layout`, origin: `nephos-own`).
 *
 * A moldura das telas de acesso — entrar, criar conta, recuperar senha.
 * É um TEMPLATE: não desenha campo nenhum, só arruma. O formulário entra
 * por projeção (o bloco `nph-blocks-login-form` e os irmãos dele), e é
 * por isso que este pacote não importa o `@iatec/nephos-blocks`: a
 * moldura é a mesma nos três fluxos, o que muda é o bloco que entra.
 *
 * Três decisões carregam o componente, e nenhuma é estética:
 *
 * **Zero navegação do app.** Sem header, sem sidebar, sem menu. A pessoa
 * ainda NÃO entrou — expor a estrutura interna antes do acesso confunde e
 * vaza o que o produto tem dentro. É a primeira `invalidCombination` da
 * ficha.
 *
 * **Um `<main>` e um único `<h1>` — e o `<h1>` NÃO é daqui.** Quem nomeia
 * a tela é o bloco do formulário (o `login-form` já nasce com
 * `headingLevel = 1`). Se a moldura também escrevesse um título, a página
 * teria dois `<h1>` e o leitor de tela anunciaria a tela duas vezes.
 *
 * **O painel de marca é decorativo.** No `split` ele some abaixo do
 * breakpoint; qualquer informação essencial que morasse só nele
 * desapareceria junto. Daí o `aria-hidden` e a imagem com `alt` vazio.
 *
 * A identidade vem do tema: nenhuma marca é citada aqui, e o logo chega
 * pelo slot `nphBrand` já vestido pela vertical ativa.
 */
@Component({
    selector: 'nph-layout-auth',
    imports: [
        NgTemplateOutlet
    ],
    templateUrl: './layout-auth.component.html',
    styleUrls: ['./layout-auth.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutAuthComponent {
    /**
     * O fluxo hospedado. A moldura é IDÊNTICA nos três — o que muda é o
     * bloco que entra no slot do formulário. O valor sai como
     * `data-variant` no `<main>` para que CSS, QA e teste identifiquem a
     * tela sem ter que adivinhar pelo conteúdo projetado.
     */
    readonly variant = input<NephosAuthVariant>('login');

    /** `split` só se materializa acima do breakpoint; abaixo dele volta a ser centrado. */
    readonly layout = input<NephosAuthLayout>('centered');

    /** Painel decorativo do `split`. Ignorado no `centered`. */
    readonly brandPanel = input<NephosAuthBrandPanel | null>(null);

    protected readonly ehSplit = computed(() => this.layout() === 'split');

    protected readonly imagemDoPainel = computed(() => this.brandPanel()?.imagem ?? null);

    protected readonly textoDoPainel = computed(() => this.brandPanel()?.texto ?? null);
}
