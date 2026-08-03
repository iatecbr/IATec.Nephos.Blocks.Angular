import {ChangeDetectionStrategy, Component, computed, input, model, output} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {PaginatorModule, PaginatorState} from 'primeng/paginator';
import {SkeletonModule} from 'primeng/skeleton';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';

import {EmptyStateComponent} from '../empty-state/empty-state.component';

/** A severidade de Tag que o status da linha usa. Papel, nunca cor crua. */
export type NephosStatusSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';

export interface NephosColumn {
    /** Propriedade da linha exibida nesta coluna. */
    field: string;

    /** O `<th>`. */
    header: string;

    /** Cabeçalho ordenável (a ordenação sai como evento, não local). */
    sortable?: boolean;

    /** `status` renderiza uma Tag com TEXTO; o resto é texto puro. */
    kind?: 'text' | 'status';

    /** Só para `kind: 'status'`: de onde vem a severidade da Tag. */
    severityField?: string;
}

export interface NephosRowAction {
    id: string;
    /** O VERBO ("Editar"). Entra no nome acessível junto com a linha. */
    label: string;
    /** Nome Font Awesome, sem o prefixo `fa-`. */
    icon: string;
    severity?: 'danger' | 'secondary';
}

export interface NephosBulkAction {
    id: string;
    label: string;
    severity?: 'danger' | 'secondary';
}

export interface NephosSortEvent {
    campo: string;
    direcao: 'asc' | 'desc';
}

export interface NephosPageEvent {
    /** Índice do primeiro registro da página (o que o paginator usa). */
    primeiro: number;
    pagina: number;
    tamanho: number;
}

/**
 * Ficha: `design-system/componentes/data-table.block.meta.ts` (origin: nephos-own).
 *
 * ⚠️ Não confundir com a ficha `datatable` (o COMPONENTE, a `<table>` crua
 * do PrimeNG). Este é o BLOCO por cima: seleção em massa, ações por linha,
 * status, vazio, carregando e paginação — o padrão de "listagem
 * gerenciável" que a organização repete.
 *
 * O bloco é **lazy por contrato**: `rows` é a página atual e `total` é o
 * tamanho do resultado inteiro. Ordenar e paginar saem como eventos para
 * quem tem os dados; a tabela nunca reordena um pedaço achando que é o
 * todo.
 *
 * O que o bloco garante e é fácil perder ao montar à mão:
 *
 * **`<table>` de verdade.** Um grid de `<div>` some com linha e coluna
 * para quem ouve a tela. É o primeiro anti-padrão da ficha.
 *
 * **Status com TEXTO.** A Tag carrega a palavra; a cor por papel só
 * reforça. Status só-cor não é percebido por todos nem é anunciado.
 *
 * **Ação de linha com nome que inclui a linha** — "Editar Colégio X", não
 * "Editar". Vinte lixeiras iguais numa tabela são vinte botões idênticos
 * para quem navega por lista de controles.
 *
 * **"Selecionar todos" é a PÁGINA VISÍVEL**, e o rótulo diz isso. Marcar
 * o resultado inteiro sem avisar faz uma ação em massa cair sobre o que
 * ninguém viu.
 */
@Component({
    selector: 'nph-blocks-data-table',
    imports: [
        ButtonModule,
        PaginatorModule,
        SkeletonModule,
        TableModule,
        TagModule,
        EmptyStateComponent
    ],
    templateUrl: './data-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
    readonly columns = input.required<readonly NephosColumn[]>();

    /** A página atual de registros. */
    readonly rows = input<readonly unknown[]>([]);

    /** Nome acessível da tabela — o que ela lista ("Bolsas por escola"). */
    readonly caption = input.required<string>();

    /** Propriedade que identifica a linha (a seleção depende dela). */
    readonly dataKey = input('id');

    /** Propriedade que NOMEIA a linha nos rótulos de ação e de seleção. */
    readonly rowLabelField = input<string | null>(null);

    readonly selectable = input(true);

    readonly rowActions = input<readonly NephosRowAction[]>([]);

    readonly bulkActions = input<readonly NephosBulkAction[]>([]);

    /** Carregando: as linhas viram skeleton, não "nenhum resultado". */
    readonly loading = input(false);

    /** Total do resultado inteiro. 0 (sem carregar) = estado vazio. */
    readonly total = input(0);

    readonly pageSize = input(10);

    /** Índice do primeiro registro da página atual. */
    readonly first = model(0);

    readonly emptyTitle = input('Nenhum resultado');

    readonly emptyDescription = input<string | null>('Ajuste os filtros para ver mais itens.');

    /** As linhas marcadas. Two-way: o contexto age sobre elas. */
    readonly selection = model<unknown[]>([]);

    readonly sort = output<NephosSortEvent>();
    readonly selectionChange = output<unknown[]>();
    readonly bulkAction = output<{acao: NephosBulkAction; selecionados: unknown[]}>();
    readonly rowAction = output<{acao: NephosRowAction; linha: unknown}>();
    readonly pageChange = output<NephosPageEvent>();

    /**
     * Enquanto carrega, linhas-fantasma dão ao esqueleto o tamanho certo.
     * A cópia existe porque o `p-table` pede um array mutável e a entrada
     * é `readonly` — o bloco não mexe nos dados de quem o usa.
     */
    protected readonly linhasExibidas = computed<unknown[]>(() =>
        this.loading() ? Array.from({length: 5}, () => ({})) : [...this.rows()]
    );

    protected readonly qtdSelecionada = computed(() => this.selection().length);

    protected readonly rotuloSelecao = computed(() => {
        const n = this.qtdSelecionada();
        return n === 1 ? '1 selecionado' : `${n} selecionados`;
    });

    /** As chaves marcadas, para o realce da linha não custar uma varredura por célula. */
    private readonly chavesSelecionadas = computed(
        () => new Set(this.selection().map((linha) => (linha as Record<string, unknown>)[this.dataKey()]))
    );

    protected readonly totalColunas = computed(() => {
        const extras = (this.selectable() ? 1 : 0) + (this.rowActions().length > 0 ? 1 : 0);
        return this.columns().length + extras;
    });

    /**
     * O `<table>` do PrimeNG não tem `<caption>` nem nome acessível. O
     * `pt` (pass-through oficial) coloca o `aria-label` no elemento certo
     * sem reescrever o componente.
     */
    protected readonly ptTabela = computed(() => ({table: {'aria-label': this.caption()}}));

    protected readonly paginacaoVisivel = computed(() => !this.loading() && this.total() > this.pageSize());

    /**
     * O realce da linha marcada é nosso de propósito. O `p-table` só
     * aplica a classe de selecionada com `pSelectableRow`, que faz o
     * clique em QUALQUER lugar da linha marcar — outra interação, e não a
     * que a ficha descreve (a marcação é da caixa).
     */
    protected estaSelecionada(linha: unknown): boolean {
        return this.chavesSelecionadas().has((linha as Record<string, unknown>)[this.dataKey()]);
    }

    protected valorCelula(linha: unknown, coluna: NephosColumn): unknown {
        return (linha as Record<string, unknown>)[coluna.field];
    }

    protected severidade(linha: unknown, coluna: NephosColumn): NephosStatusSeverity {
        const campo = coluna.severityField;
        const valor = campo ? (linha as Record<string, unknown>)[campo] : null;
        return (valor as NephosStatusSeverity) ?? 'secondary';
    }

    /** "Editar" vira "Editar Colégio X" quando a linha sabe se nomear. */
    protected rotuloDaLinha(prefixo: string, linha: unknown): string {
        const campo = this.rowLabelField();
        const nome = campo ? (linha as Record<string, unknown>)[campo] : null;
        return nome ? `${prefixo} ${nome}` : prefixo;
    }

    /** O `onSort` do p-table é tipado como `any`; o que chega é `{field, order}`. */
    protected aoOrdenar(evento: {field?: string; order?: number}): void {
        if (!evento.field) {
            return;
        }

        this.sort.emit({campo: evento.field, direcao: evento.order === -1 ? 'desc' : 'asc'});
    }

    protected aoSelecionar(selecionados: unknown[]): void {
        this.selection.set(selecionados);
        this.selectionChange.emit(selecionados);
    }

    protected aoPaginar(estado: PaginatorState): void {
        const primeiro = estado.first ?? 0;
        const tamanho = estado.rows ?? this.pageSize();

        this.first.set(primeiro);
        this.pageChange.emit({primeiro, pagina: (estado.page ?? 0) + 1, tamanho});
    }
}
