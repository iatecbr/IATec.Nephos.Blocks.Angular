import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';

import { LogoComponent, provideNephosBrand } from '@iatec/nephos-ui';

/**
 * Ficha: `design-system/componentes/logo.meta.ts` (`origin: nephos-own`).
 *
 * A regra que este componente existe para não deixar quebrar: **nenhum
 * componente sabe em qual das 7 verticais roda**. O asset e o nome
 * chegam pelo token `NEPHOS_BRAND`, injetado pelo app — exatamente como
 * o papel `primary` chega pelo tema. Nenhum nome de marca aparece no
 * template.
 *
 * ⚠️ **Limite conhecido desta story.** Os assets das 7 verticais não
 * estão no repositório, então o que roda aqui é o logo do próprio
 * produto (`assets/images/nephos.png` e `icon-nephos.png`) fazendo o
 * papel de marca ativa. O que a story prova é o **mecanismo** — troque o
 * provider e o logo troca, sem tocar em nenhum template. Quando os
 * assets por vertical existirem, é só apontar `NEPHOS_BRAND` para eles.
 */
const meta: Meta<LogoComponent> = {
  title: 'Nephos UI/Átomos/Logo',
  component: LogoComponent,
  decorators: [
    moduleMetadata({ imports: [LogoComponent] }),
    applicationConfig({
      providers: [
        provideNephosBrand({
          // Vem do ambiente (tenant/domínio/sessão) num app de verdade.
          name: 'Organização',
          logoFull: 'assets/images/nephos.png',
          logoSymbol: 'assets/images/icon-nephos.png',
        }),
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<LogoComponent>;

/**
 * `full` para topo espaçoso, `symbol` para barra compacta. Os dois saem
 * do mesmo provider — o template só escolhe a variante.
 */
export const Variantes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:3rem; align-items:center; flex-wrap:wrap;">
        <div style="display:flex; flex-direction:column; gap:.5rem;">
          <nph-ui-logo variant="full" style="height:2rem;"></nph-ui-logo>
          <span class="nph-caption nph-text-muted">full · símbolo + nome</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:.5rem;">
          <nph-ui-logo variant="symbol" style="height:2rem;"></nph-ui-logo>
          <span class="nph-caption nph-text-muted">symbol · barra compacta</span>
        </div>
      </div>
    `,
  }),
};

/**
 * Como link para o início. Navegue por Tab: o nome acessível do link vem
 * do `alt` (o nome da vertical ativa) — um logo sem alt viraria um
 * "link" anônimo para quem ouve a página.
 */
export const ComoLink: Story = {
  name: 'Como link para o início',
  render: () => ({
    template: `
      <nph-ui-logo href="/" variant="full" style="height:2rem;"></nph-ui-logo>
    `,
  }),
};

/** Sem `href` o logo é só imagem — nem link, nem alvo de foco. */
export const SemLink: Story = {
  name: 'Sem link',
  render: () => ({
    template: `
      <nph-ui-logo [href]="null" variant="full" style="height:2rem;"></nph-ui-logo>
    `,
  }),
};
