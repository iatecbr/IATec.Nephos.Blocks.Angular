import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';

import { IconComponent, LabelComponent } from '@iatec/nephos-ui';

/**
 * Ficha: `design-system/componentes/label.meta.ts` (`origin: nephos-own`).
 *
 * O rótulo é o par obrigatório de todo campo. Aqui ele aparece com um
 * `pInputText` de verdade porque a prova não é visual: é **clicar no
 * texto do rótulo e ver o foco cair no campo**. Se isso não acontece, a
 * associação `for`/`id` quebrou e o leitor de tela também não vai
 * anunciar o nome do campo.
 *
 * O asterisco de obrigatório é `aria-hidden` de propósito: quem informa
 * a obrigatoriedade é o `aria-required` no campo, não o símbolo.
 */
const meta: Meta<LabelComponent> = {
  title: 'Nephos UI/Átomos/Label',
  component: LabelComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, InputTextModule, LabelComponent, IconComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<LabelComponent>;

/** Clique em cada rótulo: o foco tem que ir para o campo correspondente. */
export const Associacao: Story = {
  name: 'Associação com o campo',
  render: () => ({
    props: { nome: '', email: '' },
    template: `
      <div style="display:flex; flex-direction:column; gap:1.25rem; max-width:24rem;">
        <div style="display:flex; flex-direction:column; gap:.375rem;">
          <nph-ui-label for="nome" [required]="true">Nome completo</nph-ui-label>
          <input pInputText id="nome" name="nome" [(ngModel)]="nome" aria-required="true" />
        </div>

        <div style="display:flex; flex-direction:column; gap:.375rem;">
          <nph-ui-label for="email">E-mail</nph-ui-label>
          <input pInputText id="email" name="email" type="email" [(ngModel)]="email" />
        </div>
      </div>
    `,
  }),
};

/**
 * O rótulo some da vista, nunca do DOM. Use só quando o contexto visual
 * já responde "o que preencho aqui?" — como a busca com lupa abaixo.
 * Navegue por Tab com o leitor de tela ligado: o campo continua tendo nome.
 */
export const RotuloOculto: Story = {
  name: 'Rótulo visualmente oculto',
  render: () => ({
    props: { busca: '' },
    template: `
      <div style="display:flex; flex-direction:column; gap:.75rem; max-width:24rem;">
        <nph-ui-label for="busca" [visualHidden]="true">Buscar bolsas</nph-ui-label>
        <span style="display:inline-flex; align-items:center; gap:.5rem;">
          <nph-ui-icon name="magnifying-glass"></nph-ui-icon>
          <input pInputText id="busca" name="busca" [(ngModel)]="busca" placeholder="Buscar" />
        </span>
        <p class="nph-caption nph-text-muted" style="margin:0;">
          O placeholder aqui é exemplo, não rótulo — ele some assim que a
          pessoa digita.
        </p>
      </div>
    `,
  }),
};
