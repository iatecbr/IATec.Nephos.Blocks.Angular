import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';

import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';

import { EmptyStateComponent, LabelComponent, SearchFiltersComponent } from '@iatec/nephos-ui';

/**
 * Ficha: `design-system/componentes/search-filters.block.meta.ts`
 * (`origin: nephos-own`).
 *
 * O que conferir nas 7 marcas × 2 modos:
 *
 * - **todo filtro aplicado tem um chip**, e o chip diz `campo: valor`.
 *   Sem isso a lista encolhe e ninguém sabe por quê;
 * - o **remover é um `<button>` de verdade**: navegue por Tab até um chip
 *   e aperte Enter. O nome acessível cita o filtro ("Remover filtro
 *   Status: Faltando"), não um "remover" genérico;
 * - a **contagem** fica em `role="status"` — muda sem o foco sair do lugar;
 * - o realce dos chips é a `primary` da vertical: troque a marca e ele
 *   acompanha, sem nenhum nome de marca no template.
 */
const meta: Meta<SearchFiltersComponent> = {
  title: 'Nephos UI/Blocos/Busca com filtros',
  component: SearchFiltersComponent,
  decorators: [
    moduleMetadata({
      imports: [
        SearchFiltersComponent,
        EmptyStateComponent,
        LabelComponent,
        FormsModule,
        SelectModule,
        MultiSelectModule,
        CheckboxModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<SearchFiltersComponent>;

const REGIOES = [
  { label: 'Todas', value: null },
  { label: 'Norte', value: 'norte' },
  { label: 'Nordeste', value: 'nordeste' },
  { label: 'Sudeste', value: 'sudeste' },
];

const SITUACOES = [
  { label: 'Completa', value: 'completa' },
  { label: 'Faltando', value: 'faltando' },
  { label: 'Em análise', value: 'analise' },
  { label: 'Suspensa', value: 'suspensa' },
  { label: 'Encerrada', value: 'encerrada' },
  { label: 'Arquivada', value: 'arquivada' },
];

/**
 * Valor único no `select`, vários valores no `multiselect` — a escolha do
 * controle vem da tarefa, não do espaço disponível.
 */
export const Padrao: Story = {
  name: 'Padrão',
  render: () => ({
    props: {
      regioes: REGIOES,
      situacoes: SITUACOES,
      regiao: null,
      situacao: [],
      filtros: [
        { campo: 'Status', valor: 'Faltando' },
        { campo: 'Região', valor: 'Sudeste' },
      ],
      removido: '',
    },
    template: `
      <div style="max-width:56rem;">
        <nph-ui-search-filters
          searchLabel="Buscar escola"
          searchPlaceholder="Buscar escola…"
          resultNoun="escolas"
          [resultCount]="42"
          [activeFilters]="filtros"
          (filterRemove)="removido = $event.campo + ': ' + $event.valor; filtros = []"
          (clearAll)="filtros = []">

          <p-select nphFilters
                    [options]="regioes"
                    [(ngModel)]="regiao"
                    optionLabel="label"
                    placeholder="Região"
                    inputId="filtro-regiao"></p-select>

          <p-multiSelect nphFilters
                         [options]="situacoes"
                         [(ngModel)]="situacao"
                         optionLabel="label"
                         placeholder="Status"
                         inputId="filtro-status"></p-multiSelect>
        </nph-ui-search-filters>

        <p class="nph-caption nph-text-muted" aria-live="polite">
          {{ removido ? 'Removido: ' + removido : 'Nenhum chip removido ainda.' }}
        </p>
      </div>
    `,
  }),
};

/**
 * Sem filtro aplicado: nenhum chip, e o "Limpar filtros" não aparece —
 * um botão que não tem o que limpar é ruído.
 */
export const SemFiltro: Story = {
  name: 'Sem filtro aplicado',
  render: () => ({
    props: { regioes: REGIOES, regiao: null },
    template: `
      <div style="max-width:56rem;">
        <nph-ui-search-filters
          searchLabel="Buscar escola"
          searchPlaceholder="Buscar escola…"
          resultNoun="escolas"
          [resultCount]="128">

          <p-select nphFilters
                    [options]="regioes"
                    [(ngModel)]="regiao"
                    optionLabel="label"
                    placeholder="Região"
                    inputId="filtro-regiao-vazio"></p-select>
        </nph-ui-search-filters>
      </div>
    `,
  }),
};

/**
 * O filtro de vários valores com **≤5 opções sempre relevantes** fica
 * VISÍVEL num grupo de checkbox. Reconhecer vence colapsar: dentro de um
 * `multiselect`, essas cinco opções custariam um clique a mais e sairiam
 * da vista (`invalidCombination` declarada na ficha).
 */
export const FiltroDePoucasOpcoes: Story = {
  name: 'Filtro de poucas opções',
  render: () => ({
    props: { turnos: [] as string[] },
    template: `
      <div style="max-width:56rem;">
        <nph-ui-search-filters
          searchLabel="Buscar turma"
          searchPlaceholder="Buscar turma…"
          resultNoun="turmas"
          [resultCount]="17">

          <fieldset nphFilters style="border:0; margin:0; padding:0; display:flex; gap:1rem; align-items:center;">
            <legend class="nph-caption nph-text-muted" style="float:left; margin-right:.75rem;">Turno</legend>
            <div style="display:flex; align-items:center; gap:.5rem;">
              <p-checkbox [(ngModel)]="turnos" value="manha" inputId="turno-manha"></p-checkbox>
              <nph-ui-label for="turno-manha">Manhã</nph-ui-label>
            </div>
            <div style="display:flex; align-items:center; gap:.5rem;">
              <p-checkbox [(ngModel)]="turnos" value="tarde" inputId="turno-tarde"></p-checkbox>
              <nph-ui-label for="turno-tarde">Tarde</nph-ui-label>
            </div>
            <div style="display:flex; align-items:center; gap:.5rem;">
              <p-checkbox [(ngModel)]="turnos" value="noite" inputId="turno-noite"></p-checkbox>
              <nph-ui-label for="turno-noite">Noite</nph-ui-label>
            </div>
          </fieldset>
        </nph-ui-search-filters>
      </div>
    `,
  }),
};

/**
 * Quando o filtro zera o resultado, quem responde é o `empty-state` —
 * não a barra. E a variante é `sem-resultado`: a pessoa já buscou, então
 * a saída é ajustar o filtro, nunca "criar item".
 */
export const SemResultado: Story = {
  name: 'Quando o filtro zera',
  render: () => ({
    props: {
      filtros: [{ campo: 'Status', valor: 'Suspensa' }],
    },
    template: `
      <div style="max-width:56rem;">
        <nph-ui-search-filters
          searchLabel="Buscar escola"
          searchPlaceholder="Buscar escola…"
          resultNoun="escolas"
          [resultCount]="0"
          [activeFilters]="filtros"
          (clearAll)="filtros = []">
        </nph-ui-search-filters>

        <nph-ui-empty-state
          variant="sem-resultado"
          title="Nenhuma escola encontrada"
          description="Nenhuma escola combina com os filtros aplicados. Tente remover um deles."
          [headingLevel]="3"
          [showAction]="false">
        </nph-ui-empty-state>
      </div>
    `,
  }),
};
