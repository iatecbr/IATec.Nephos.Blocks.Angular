import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { LinkComponent, TextComponent } from '@iatec/nephos-ui';

/**
 * Ficha: `design-system/componentes/link.meta.ts` (`origin: nephos-own`).
 *
 * Link é a **única** cor de marca permitida em texto, e só porque
 * navegar é uma ação. Três coisas a conferir nas 7 marcas × 2 modos:
 *
 * - a cor do link contra o fundo passa 4,5:1 (é `primary`, que muda por vertical);
 * - o anel de foco aparece ao navegar por Tab, nos dois modos;
 * - o link `inline` é sublinhado — dentro de um parágrafo a distinção
 *   não pode depender só da cor.
 */
const meta: Meta<LinkComponent> = {
  title: 'Nephos UI/Átomos/Link',
  component: LinkComponent,
  decorators: [
    moduleMetadata({ imports: [LinkComponent, TextComponent, ButtonModule] }),
    applicationConfig({ providers: [provideRouter([])] }),
  ],
};

export default meta;
type Story = StoryObj<LinkComponent>;

/** As três variações. Navegue por Tab para ver o anel de foco. */
export const Variacoes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem; max-width:44rem;">
        <nph-ui-link routerLink="/bolsas/historico">
          Ver histórico de bolsas (routerLink)
        </nph-ui-link>

        <nph-ui-text>
          Veja o
          <nph-ui-link href="/relatorio" variant="inline">relatório completo</nph-ui-link>
          antes de aprovar a solicitação.
        </nph-ui-text>

        <nph-ui-link href="/termos" variant="muted">Termos de uso</nph-ui-link>
      </div>
    `,
  }),
};

/**
 * Nova aba avisada. O componente acrescenta sozinho o
 * `rel="noopener noreferrer"` e o texto "(abre em nova aba)" — que fica
 * visualmente oculto, mas é lido. Abrir uma aba em silêncio tira o
 * controle de quem não vê a mudança acontecer.
 */
export const Externo: Story = {
  render: () => ({
    template: `
      <nph-ui-link href="https://adventistas.org" [external]="true">
        Site institucional
      </nph-ui-link>
    `,
  }),
};

/**
 * A fronteira que mais erra na geração de UI: `<a>` NAVEGA, `<button>`
 * AGE. Os dois abaixo podem até parecer parentes, mas fazem coisas
 * diferentes para o teclado e para a tecnologia assistiva — e decidir
 * pela aparência é o que quebra "abrir em nova aba" e o botão Voltar.
 */
export const LinkOuBotao: Story = {
  name: 'Link ou botão?',
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem; max-width:44rem;">
        <div style="display:flex; gap:1rem; align-items:center;">
          <nph-ui-link routerLink="/bolsas">Ver bolsas</nph-ui-link>
          <span class="nph-caption nph-text-muted">há destino → &lt;a&gt;</span>
        </div>
        <div style="display:flex; gap:1rem; align-items:center;">
          <p-button label="Salvar rascunho" [text]="true"></p-button>
          <span class="nph-caption nph-text-muted">dispara ação, não sai do lugar → &lt;button&gt;</span>
        </div>
      </div>
    `,
  }),
};
