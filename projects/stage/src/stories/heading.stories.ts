import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { HeadingComponent } from '@iatec/nephos-ui';

/**
 * Ficha: `design-system/componentes/heading.meta.ts` (`origin: nephos-own`).
 *
 * O que esta story precisa provar é uma coisa só, e é a razão de o
 * componente existir: **nível e tamanho são eixos separados**. O nível
 * (`<h1>`…`<h6>`) é a árvore que o leitor de tela percorre; o tamanho é
 * aparência. Quem escolhe `<h3>` porque "34px é grande demais" quebra a
 * navegação de quem não vê a tela.
 *
 * Inspecione o DOM: a tag muda com `level`, a classe muda com `size`, e
 * uma não arrasta a outra.
 */
const meta: Meta<HeadingComponent> = {
  title: 'Nephos UI/Átomos/Heading',
  component: HeadingComponent,
  decorators: [moduleMetadata({ imports: [HeadingComponent] })],
};

export default meta;
type Story = StoryObj<HeadingComponent>;

/** Os seis níveis com o tamanho que cada um herda por padrão. */
export const Niveis: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem;">
        <nph-ui-heading [level]="1">h1 · título de página (title-lg)</nph-ui-heading>
        <nph-ui-heading [level]="2">h2 · título de bloco (title-md)</nph-ui-heading>
        <nph-ui-heading [level]="3">h3 · título de seção (title-sm)</nph-ui-heading>
        <nph-ui-heading [level]="4">h4 · title-sm</nph-ui-heading>
        <nph-ui-heading [level]="5">h5 · title-sm</nph-ui-heading>
        <nph-ui-heading [level]="6">h6 · title-sm</nph-ui-heading>
      </div>
    `,
  }),
};

/** A escala inteira, aplicada sobre o MESMO nível. */
export const Escala: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem;">
        <nph-ui-heading [level]="2" size="title-xxlg">title-xxlg · display grande</nph-ui-heading>
        <nph-ui-heading [level]="2" size="title-xlg">title-xlg · display</nph-ui-heading>
        <nph-ui-heading [level]="2" size="title-lg">title-lg · título de página</nph-ui-heading>
        <nph-ui-heading [level]="2" size="title-md">title-md · título de bloco</nph-ui-heading>
        <nph-ui-heading [level]="2" size="title-sm">title-sm · título de seção</nph-ui-heading>
      </div>
    `,
  }),
};

/**
 * A prova de que os dois eixos não se confundem: hierarquia contínua
 * (h1 → h2 → h3), com um h2 propositalmente MENOR que o h3 abaixo dele.
 * A estrutura continua correta para quem ouve; só a aparência mudou.
 */
export const NivelNaoEhTamanho: Story = {
  name: 'Nível ≠ tamanho',
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:.75rem; max-width:44rem;">
        <nph-ui-heading [level]="1">Bolsas do campo</nph-ui-heading>
        <nph-ui-heading [level]="2" size="title-sm">Ensino fundamental</nph-ui-heading>
        <nph-ui-heading [level]="3" size="title-md">Turmas com vaga</nph-ui-heading>
        <p class="nph-body-sm nph-text-muted" style="margin:0;">
          O h2 está menor que o h3 de propósito. Abra o inspetor: a sequência
          de tags segue h1 → h2 → h3 sem pular degrau.
        </p>
      </div>
    `,
  }),
};
