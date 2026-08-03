import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';

import { HelperTextComponent, LabelComponent } from '@iatec/nephos-ui';

/**
 * Ficha: `design-system/componentes/helper-text.meta.ts` (`origin: nephos-own`).
 *
 * O que faz esta peça funcionar não é a cor — é a **ligação**. O campo
 * aponta `aria-describedby` para o `id` do texto; sem isso a ajuda e o
 * erro ficam soltos e ninguém que usa leitor de tela os ouve ao focar o
 * controle.
 *
 * O `id` é derivado do campo: `email` vira `email-ajuda` (hint) e
 * `email-erro` (danger), o mesmo padrão do exemplo da ficha. Por isso o
 * campo consegue declarar os dois de uma vez.
 *
 * Confira nas 7 marcas × 2 modos: `feedback.danger` precisa passar 4,5:1
 * nos dois modos, e é o texto — não a cor — que diz o que corrigir.
 */
const meta: Meta<HelperTextComponent> = {
  title: 'Nephos UI/Átomos/Helper text',
  component: HelperTextComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, InputTextModule, HelperTextComponent, LabelComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<HelperTextComponent>;

/** Ajuda estática: `variant="hint"`, sem `aria-live`. */
export const Ajuda: Story = {
  render: () => ({
    props: { email: '' },
    template: `
      <div style="display:flex; flex-direction:column; gap:.375rem; max-width:24rem;">
        <nph-ui-label for="email">E-mail</nph-ui-label>
        <input pInputText id="email" name="email" type="email"
               [(ngModel)]="email" aria-describedby="email-ajuda" />
        <nph-ui-helper-text for="email">
          Usaremos para enviar a confirmação.
        </nph-ui-helper-text>
      </div>
    `,
  }),
};

/**
 * Campo inválido com ajuda E erro ao mesmo tempo. Repare em três coisas
 * no DOM: `aria-invalid` no campo, os dois ids no `aria-describedby`, e
 * o `aria-live="polite"` no erro (ele apareceu depois, então é anunciado
 * sem roubar o foco).
 */
export const Erro: Story = {
  render: () => ({
    props: { email: 'joao@' },
    template: `
      <div style="display:flex; flex-direction:column; gap:.375rem; max-width:24rem;">
        <nph-ui-label for="email" [required]="true">E-mail</nph-ui-label>
        <input pInputText id="email" name="email" type="email"
               [(ngModel)]="email"
               aria-required="true"
               aria-invalid="true"
               aria-describedby="email-ajuda email-erro" />
        <nph-ui-helper-text for="email">
          Usaremos para enviar a confirmação.
        </nph-ui-helper-text>
        <nph-ui-helper-text for="email" variant="danger" live="polite">
          Digite um e-mail válido.
        </nph-ui-helper-text>
      </div>
    `,
  }),
};
