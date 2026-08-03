import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ButtonModule } from 'primeng/button';

import { IconComponent } from '@iatec/nephos-ui';

/**
 * Ficha: `design-system/componentes/icon.meta.ts` (`origin: nephos-own`).
 *
 * Set = **Font Awesome**, nunca PrimeIcons. O componente só emite a
 * classe `fa-<estilo> fa-<nome>`; a fonte vem do app.
 *
 * ⚠️ Duas notas de configuração que o banco de provas expõe:
 *
 * 1. Aqui roda a edição **Free** 7.3.1, carregada só no Storybook
 *    (`projects/stage/src/storybook-styles.scss`). A organização tem
 *    licença **Pro** — `light`, `thin` e `duotone` só renderizam quando
 *    o kit Pro estiver configurado no repo.
 * 2. Os ícones **internos do PrimeNG** (setinha do select, X do dialog)
 *    ainda são PrimeIcons. Sobrescrevê-los para FA é a pendência de
 *    configuração registrada no handoff.
 *
 * A decisão que carrega a acessibilidade inteira vem antes do desenho:
 * o ícone é **decorativo** (acompanha um texto que já diz tudo) ou
 * **significativo** (é a única informação)?
 */
const meta: Meta<IconComponent> = {
  title: 'Nephos UI/Átomos/Icon',
  component: IconComponent,
  decorators: [moduleMetadata({ imports: [IconComponent, ButtonModule] })],
};

export default meta;
type Story = StoryObj<IconComponent>;

/** Escolhidos pelo significado convencional, não pela forma bonita. */
export const Catalogo: Story = {
  name: 'Catálogo de uso',
  render: () => ({
    template: `
      <div style="display:flex; gap:2rem; flex-wrap:wrap; font-size:1.5rem;">
        <span style="display:flex; flex-direction:column; align-items:center; gap:.5rem;">
          <nph-ui-icon name="magnifying-glass"></nph-ui-icon>
          <span class="nph-caption nph-text-muted">buscar</span>
        </span>
        <span style="display:flex; flex-direction:column; align-items:center; gap:.5rem;">
          <nph-ui-icon name="pen-to-square"></nph-ui-icon>
          <span class="nph-caption nph-text-muted">editar</span>
        </span>
        <span style="display:flex; flex-direction:column; align-items:center; gap:.5rem;">
          <nph-ui-icon name="trash-can"></nph-ui-icon>
          <span class="nph-caption nph-text-muted">excluir</span>
        </span>
        <span style="display:flex; flex-direction:column; align-items:center; gap:.5rem;">
          <nph-ui-icon name="circle-info"></nph-ui-icon>
          <span class="nph-caption nph-text-muted">informação</span>
        </span>
        <span style="display:flex; flex-direction:column; align-items:center; gap:.5rem;">
          <nph-ui-icon name="check"></nph-ui-icon>
          <span class="nph-caption nph-text-muted">confirmar</span>
        </span>
        <span style="display:flex; flex-direction:column; align-items:center; gap:.5rem;">
          <nph-ui-icon name="xmark"></nph-ui-icon>
          <span class="nph-caption nph-text-muted">fechar</span>
        </span>
      </div>
    `,
  }),
};

/**
 * Os três arranjos que aparecem de verdade numa tela. Inspecione o DOM
 * de cada um — a diferença está toda no ARIA, não no visual:
 *
 * 1. **decorativo** — o texto ao lado já diz tudo, o ícone some do
 *    leitor de tela (`aria-hidden`);
 * 2. **botão só de ícone** — o nome fica no `<button>`, e o ícone
 *    continua decorativo (senão o nome é anunciado duas vezes);
 * 3. **significativo isolado** — não há texto nenhum, então o ícone
 *    precisa de `role="img"` + `aria-label` por conta própria.
 */
export const DecorativoOuSignificativo: Story = {
  name: 'Decorativo ou significativo',
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:1.5rem; max-width:40rem;">
        <div>
          <p-button label="Salvar" icon="fa-solid fa-check"></p-button>
          <p class="nph-caption nph-text-muted" style="margin:.5rem 0 0;">
            1 · decorativo — o rótulo "Salvar" já informa. No Button do PrimeNG
            a classe FA entra pelo input <code>icon</code>, e o glifo não
            carrega nome próprio.
          </p>
        </div>

        <div>
          <button type="button" class="nph-icon-button" aria-label="Excluir bolsa">
            <nph-ui-icon name="trash-can"></nph-ui-icon>
          </button>
          <p class="nph-caption nph-text-muted" style="margin:.5rem 0 0;">
            2 · botão só de ícone — o nome acessível está no botão, não no ícone.
          </p>
        </div>

        <div style="display:flex; align-items:center; gap:.5rem;">
          <nph-ui-icon name="circle-exclamation"
                       [decorative]="false"
                       label="Atenção"></nph-ui-icon>
          <span class="nph-caption nph-text-muted">
            3 · significativo isolado — role="img" + aria-label, porque não há texto.
          </span>
        </div>
      </div>
    `,
  }),
};

/**
 * `fixedWidth` alinha a coluna de ícones mesmo com larguras diferentes
 * (compare com a lista sem ele). `spin` é só para carregando, e o CSS
 * respeita `prefers-reduced-motion`.
 */
export const Modificadores: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:4rem; flex-wrap:wrap;">
        <ul style="list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:.5rem;">
          <li class="nph-caption nph-text-muted">sem fa-fw</li>
          <li><nph-ui-icon name="house"></nph-ui-icon> Início</li>
          <li><nph-ui-icon name="magnifying-glass"></nph-ui-icon> Buscar</li>
          <li><nph-ui-icon name="gear"></nph-ui-icon> Ajustes</li>
        </ul>

        <ul style="list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:.5rem;">
          <li class="nph-caption nph-text-muted">com fa-fw</li>
          <li><nph-ui-icon name="house" [fixedWidth]="true"></nph-ui-icon> Início</li>
          <li><nph-ui-icon name="magnifying-glass" [fixedWidth]="true"></nph-ui-icon> Buscar</li>
          <li><nph-ui-icon name="gear" [fixedWidth]="true"></nph-ui-icon> Ajustes</li>
        </ul>

        <span style="display:inline-flex; align-items:center; gap:.5rem;">
          <nph-ui-icon name="spinner" [spin]="true"></nph-ui-icon> Carregando
        </span>
      </div>
    `,
  }),
};
