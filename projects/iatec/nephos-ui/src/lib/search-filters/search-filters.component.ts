import {ChangeDetectionStrategy, Component, DestroyRef, computed, inject, input, model, output} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {ChipModule} from 'primeng/chip';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';

import {IconComponent} from '../icon/icon.component';
import {LabelComponent} from '../label/label.component';

/** Um filtro aplicado, do jeito que ele aparece no chip: `campo: valor`. */
export interface NephosActiveFilter {
    /** O atributo filtrado ("Status", "Região"). */
    campo: string;

    /** O valor escolhido ("Faltando", "Sudeste"). */
    valor: string;
}

let sequencia = 0;

/**
 * Ficha: `design-system/componentes/search-filters.block.meta.ts`
 * (origin: nephos-own).
 *
 * A barra que fica ACIMA de uma listagem. Ela não mostra dados — ela
 * monta a consulta. Três coisas fazem esse contrato funcionar, e as três
 * são anti-padrões declarados na ficha quando faltam:
 *
 * **Todo filtro aplicado vira um chip removível.** Sem os filtros ativos
 * à vista, a lista encolhe e a pessoa não sabe por quê nem como desfazer.
 * O chip diz `campo: valor` — não basta acender a cor de "tem filtro".
 *
 * **O remover é um `<button>` de verdade**, com o nome do filtro no
 * `aria-label` ("Remover filtro Status: Faltando"). O `p-chip` traz o
 * visual; o botão acessível é nosso porque o rótulo precisa citar QUAL
 * filtro sai, e o do PrimeNG é genérico para todos.
 *
 * **A contagem é anunciada** (`role="status"`). Filtrar sem ver quantos
 * sobraram transforma a busca em caixa-preta; quando sobra zero, quem
 * responde é o bloco `empty-state`, não esta barra.
 *
 * Os filtros em si entram pelo slot `nphFilters`, porque a escolha do
 * controle depende da tarefa: valor único = `select`; vários valores =
 * `multiselect`; vários valores com ≤5 opções sempre relevantes = grupo
 * de checkbox VISÍVEL (reconhecer vence colapsar).
 *
 * ⚠️ O output `filterChange` da ficha NÃO nasce aqui: quem sabe que um
 * filtro mudou é o controle projetado, e ele já emite o próprio evento.
 * O bloco cuida da busca, da remoção e do limpar tudo.
 */
@Component({
    selector: 'nph-ui-search-filters',
    imports: [
        ButtonModule,
        ChipModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        IconComponent,
        LabelComponent
    ],
    templateUrl: './search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFiltersComponent {
    /**
     * Nome acessível da região e rótulo do campo. Diz O QUE se busca —
     * "Buscar escola", não "Buscar".
     */
    readonly searchLabel = input('Buscar');

    readonly searchPlaceholder = input('Buscar…');

    /** O termo digitado. Two-way para o contexto poder refletir na URL. */
    readonly term = model('');

    /** Desligar só se o espaço for crítico — o padrão é mostrar. */
    readonly showActiveChips = input(true);

    /** Os filtros aplicados AGORA. Quem os resolve é o contexto. */
    readonly activeFilters = input<readonly NephosActiveFilter[]>([]);

    /** Nº de resultados depois de filtrar. `null` = ainda não se sabe. */
    readonly resultCount = input<number | null>(null);

    /** O substantivo da contagem: "42 **escolas**". */
    readonly resultNoun = input('resultados');

    /**
     * Espera antes de emitir `search`. Emitir a cada tecla dispara uma
     * consulta por letra digitada.
     */
    readonly debounceMs = input(300);

    readonly search = output<string>();
    readonly filterRemove = output<NephosActiveFilter>();
    readonly clearAll = output<void>();

    protected readonly idBusca = `nph-busca-${++sequencia}`;

    protected readonly temFiltroAtivo = computed(() => this.activeFilters().length > 0);

    private timer: ReturnType<typeof setTimeout> | null = null;

    constructor() {
        inject(DestroyRef).onDestroy(() => this.cancelarTimer());
    }

    protected aoDigitar(valor: string): void {
        this.term.set(valor);
        this.cancelarTimer();
        this.timer = setTimeout(() => this.search.emit(valor), this.debounceMs());
    }

    /** Enter no campo busca agora: quem apertou não quer esperar o debounce. */
    protected aoEnviar(): void {
        this.cancelarTimer();
        this.search.emit(this.term());
    }

    protected rotuloRemover(filtro: NephosActiveFilter): string {
        return `Remover filtro ${filtro.campo}: ${filtro.valor}`;
    }

    protected chave(filtro: NephosActiveFilter): string {
        return `${filtro.campo}:${filtro.valor}`;
    }

    private cancelarTimer(): void {
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
}
