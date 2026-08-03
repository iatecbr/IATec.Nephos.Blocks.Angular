import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';

import { EmptyStateComponent } from '@iatec/nephos-ui';

/**
 * Ficha: `design-system/componentes/empty-state.block.meta.ts`
 * (`origin: nephos-own`).
 *
 * O bloco existe para separar três situações que ocupam o mesmo espaço na
 * tela e não são a mesma coisa: **carregando**, **erro** e **sem dados**.
 * Tratar as três igual é o que engana quem usa.
 *
 * O que conferir nas 7 marcas × 2 modos:
 *
 * - a cor de ênfase aparece **só no botão** — o ícone e os textos são
 *   neutros (é o anti-padrão "ilustração chamativa demais");
 * - título e descrição passam 4,5:1 nos dois modos;
 * - a variante `sem-resultado` **não** oferece "criar" — quem buscou algo
 *   precisa ajustar o filtro, e o contrário é uma `invalidCombination`.
 */
const meta: Meta<EmptyStateComponent> = {
  title: 'Nephos UI/Blocos/Empty State',
  component: EmptyStateComponent,
  decorators: [
    moduleMetadata({
      imports: [EmptyStateComponent, ButtonModule, MessageModule, SkeletonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<EmptyStateComponent>;

/**
 * Primeiro uso: ainda não existe nada, e a ação convida a criar o
 * primeiro item.
 */
export const PrimeiroUso: Story = {
  name: 'Primeiro uso',
  render: () => ({
    template: `
      <div style="max-width:32rem;">
        <nph-ui-empty-state
          variant="primeiro-uso"
          title="Nenhum relatório ainda"
          description="Crie o primeiro para ver os dados aqui."
          actionLabel="Criar relatório">
        </nph-ui-empty-state>
      </div>
    `,
  }),
};

/**
 * Sem resultado: a pessoa JÁ buscou. A ação certa é mexer no filtro, não
 * criar um item — por isso `showAction` desligado e o texto aponta para o
 * caminho de volta.
 */
export const SemResultado: Story = {
  name: 'Sem resultado',
  render: () => ({
    template: `
      <div style="max-width:32rem;">
        <nph-ui-empty-state
          variant="sem-resultado"
          title="Nenhuma escola encontrada"
          description="Tente outro termo ou limpe os filtros aplicados."
          [showAction]="false">
        </nph-ui-empty-state>
      </div>
    `,
  }),
};

/**
 * Bloqueado: existe um passo anterior. A ação leva a esse passo, não ao
 * conteúdo que ainda não pode existir.
 */
export const Bloqueado: Story = {
  render: () => ({
    template: `
      <div style="max-width:32rem;">
        <nph-ui-empty-state
          variant="bloqueado"
          title="Conecte uma conta para começar"
          description="Os lançamentos aparecem aqui depois que uma conta for conectada."
          actionLabel="Conectar conta">
        </nph-ui-empty-state>
      </div>
    `,
  }),
};

/**
 * A fronteira que mais erra na geração de UI. Os três ocupam o mesmo
 * lugar; só um deles é este bloco.
 */
export const VazioNaoEhCarregando: Story = {
  name: 'Vazio ≠ carregando ≠ erro',
  render: () => ({
    template: `
      <div style="display:grid; gap:2rem; grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));">
        <div>
          <p class="nph-caption nph-text-muted">carregando → skeleton</p>
          <div style="display:flex; flex-direction:column; gap:.5rem;">
            <p-skeleton height="1rem"></p-skeleton>
            <p-skeleton height="1rem"></p-skeleton>
            <p-skeleton height="1rem" width="60%"></p-skeleton>
          </div>
        </div>

        <div>
          <p class="nph-caption nph-text-muted">sem dados → empty-state</p>
          <nph-ui-empty-state
            variant="primeiro-uso"
            title="Nenhum relatório ainda"
            description="Crie o primeiro para ver os dados aqui."
            actionLabel="Criar relatório">
          </nph-ui-empty-state>
        </div>

        <div>
          <p class="nph-caption nph-text-muted">falha → estado de erro (NÃO é este bloco)</p>
          <div style="display:flex; flex-direction:column; gap:.75rem; align-items:flex-start;">
            <p-message severity="error"
                       text="Não foi possível carregar os relatórios."></p-message>
            <p-button label="Tentar de novo" severity="secondary" [outlined]="true"></p-button>
          </div>
        </div>
      </div>
    `,
  }),
};
