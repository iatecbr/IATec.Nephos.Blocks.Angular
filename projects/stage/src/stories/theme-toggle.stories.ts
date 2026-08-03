import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ThemeToggleComponent } from '@iatec/nephos-ui';

/**
 * Ficha: `design-system/componentes/theme-toggle.meta.ts` (`origin: nephos-own`).
 *
 * Os dois eixos do sistema, e por que só um deles vira controle:
 *
 * - **modo** (`surface`, claro/escuro) — é preferência da pessoa. Este
 *   componente.
 * - **marca** (`primary`, a vertical) — vem do contexto. **Nunca** existe
 *   um seletor de marca para o usuário; o da barra de cima do Storybook
 *   é andaime de teste, não produto.
 *
 * O botão liga `.app-dark` na raiz e persiste em `nph:darkMode` — a mesma
 * classe e a mesma chave do `LayoutService.toggleDarkMode()` do
 * `@iatec/nephos-layout`, para que os dois concordem em vez de brigar.
 *
 * ⚠️ **No Storybook, use o botão OU o seletor "Modo" da barra, não os
 * dois.** Os dois escrevem a mesma classe na raiz: alternar aqui e depois
 * re-renderizar a story faz o seletor global ganhar de volta.
 *
 * O que conferir: um ícone sol/lua sozinho não diz nem a ação nem o modo
 * atual. Inspecione o DOM — o nome vem do `aria-label` e o estado do
 * `aria-pressed` (ou `aria-checked`); o glifo é decorativo.
 */
const meta: Meta<ThemeToggleComponent> = {
  title: 'Nephos UI/Átomos/Theme toggle',
  component: ThemeToggleComponent,
  decorators: [moduleMetadata({ imports: [ThemeToggleComponent] })],
};

export default meta;
type Story = StoryObj<ThemeToggleComponent>;

/** `display="button"`: uma ação que alterna, estado em `aria-pressed`. */
export const Botao: Story = {
  render: () => ({
    template: `
      <div style="display:flex; align-items:center; gap:1rem;">
        <nph-ui-theme-toggle></nph-ui-theme-toggle>
        <span class="nph-body-sm nph-text-muted">
          Alterna claro/escuro. Navegue por Tab para ver o anel de foco.
        </span>
      </div>
    `,
  }),
};

/**
 * `display="switch"`: expõe ligado/desligado explicitamente
 * (`role="switch"` + `aria-checked`). Use quando o estado precisar ser
 * lido como uma chave, não como uma ação.
 */
export const Switch: Story = {
  render: () => ({
    template: `
      <div style="display:flex; align-items:center; gap:1rem;">
        <nph-ui-theme-toggle display="switch"></nph-ui-theme-toggle>
        <span class="nph-body-sm nph-text-muted">role="switch" + aria-checked</span>
      </div>
    `,
  }),
};

/**
 * O arranjo real: na barra de topo, ao lado das outras ações. Repare que
 * não há nenhum seletor de marca — a vertical já chegou pelo contexto.
 */
export const NaBarraDeTopo: Story = {
  name: 'Na barra de topo',
  render: () => ({
    template: `
      <div style="display:flex; align-items:center; justify-content:flex-end;
                  gap:.5rem; padding:.75rem 1rem;
                  background:var(--p-content-background);
                  border:1px solid var(--p-content-border-color);
                  border-radius:var(--p-content-border-radius);">
        <nph-ui-theme-toggle></nph-ui-theme-toggle>
      </div>
    `,
  }),
};
