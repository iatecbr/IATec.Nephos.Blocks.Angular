import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ButtonModule } from 'primeng/button';

import { DestructiveConfirmComponent } from '@iatec/nephos-ui';

/**
 * Ficha: `design-system/componentes/destructive-confirm.block.meta.ts`
 * (`origin: nephos-own`).
 *
 * O que conferir nas 7 marcas × 2 modos:
 *
 * - o botão de confirmar sai em **`danger`**, nunca na cor da marca —
 *   uma exclusão precisa parecer perigosa;
 * - abra pelo teclado e **não toque no mouse**: o foco cai no
 *   **Cancelar**. Um Enter distraído cancela, não exclui;
 * - **clique fora**: nada acontece. `dismissableMask` está desligado de
 *   propósito;
 * - **Esc** fecha e o foco volta ao botão que abriu.
 */
const meta: Meta<DestructiveConfirmComponent> = {
  title: 'Nephos UI/Blocos/Confirmação destrutiva',
  component: DestructiveConfirmComponent,
  decorators: [
    moduleMetadata({ imports: [DestructiveConfirmComponent, ButtonModule] }),
  ],
};

export default meta;
type Story = StoryObj<DestructiveConfirmComponent>;

/**
 * O caso comum. Repare nos rótulos: **"Excluir"**, o verbo real — nunca
 * "Sim/OK", que fora de contexto não dizem o que vai acontecer.
 */
export const Padrao: Story = {
  name: 'Padrão',
  render: () => ({
    props: {
      aberto: false,
      resultado: '',
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem; align-items:flex-start;">
        <p-button label="Excluir fatura #1032"
                  severity="danger"
                  [outlined]="true"
                  (onClick)="aberto = true"></p-button>

        <nph-ui-destructive-confirm
          [(visible)]="aberto"
          title="Excluir a fatura #1032?"
          consequence="A fatura sai do sistema e não pode ser recuperada."
          confirmLabel="Excluir"
          (confirm)="resultado = 'confirmado'"
          (cancel)="resultado = 'cancelado'">
        </nph-ui-destructive-confirm>

        <span class="nph-caption nph-text-muted" aria-live="polite">
          {{ resultado ? 'Última resposta: ' + resultado : 'Nenhuma resposta ainda.' }}
        </span>
      </div>
    `,
  }),
};

/**
 * Impacto muito alto: a trava de digitação. O confirmar só libera com o
 * nome **exato** — só o espaço em volta é perdoado. Aceitar "algo
 * parecido" devolveria o acidente que a trava existe para evitar.
 */
export const ComTravaDeDigitacao: Story = {
  name: 'Com trava de digitação',
  render: () => ({
    props: { aberto: false },
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem; align-items:flex-start;">
        <p-button label="Excluir a conta"
                  severity="danger"
                  [outlined]="true"
                  (onClick)="aberto = true"></p-button>

        <nph-ui-destructive-confirm
          [(visible)]="aberto"
          title="Excluir a conta Colégio Adventista de Salvador?"
          consequence="Todos os dados vinculados saem junto. Esta ação não pode ser desfeita."
          confirmLabel="Excluir conta"
          [requireTyping]="true"
          itemName="Colégio Adventista de Salvador">
        </nph-ui-destructive-confirm>
      </div>
    `,
  }),
};

/**
 * A pergunta que decide se este bloco deve existir na tela: **dá para
 * desfazer?** Se dá, não pergunte — execute e ofereça "Desfazer".
 * Perguntar "tem certeza?" a cada clique cansa, e quem cansa passa a
 * confirmar no automático.
 */
export const QuandoNaoUsar: Story = {
  name: 'Quando NÃO usar',
  render: () => ({
    props: { arquivado: false },
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem; align-items:flex-start; max-width:32rem;">
        <p class="nph-body-sm nph-text-muted" style="margin:0;">
          Arquivar é reversível. Em vez de perguntar antes, a ação acontece e o
          caminho de volta fica à mão.
        </p>

        <p-button label="Arquivar solicitação"
                  severity="secondary"
                  [outlined]="true"
                  (onClick)="arquivado = true"></p-button>

        @if (arquivado) {
          <div role="status"
               style="display:flex; gap:1rem; align-items:center;">
            <span class="nph-body-sm">Solicitação arquivada.</span>
            <p-button label="Desfazer" [text]="true" (onClick)="arquivado = false"></p-button>
          </div>
        }
      </div>
    `,
  }),
};
