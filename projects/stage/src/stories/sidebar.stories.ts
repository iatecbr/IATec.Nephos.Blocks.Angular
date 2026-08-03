import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { SidebarComponent } from '@iatec/nephos-blocks';

import { ROTAS_DE_PROVA } from './rotas-de-prova';

/**
 * Ficha: `design-system/componentes/sidebar.block.meta.ts`
 * (`origin: nephos-own`).
 *
 * O que conferir nas 7 marcas × 2 modos:
 *
 * - o `<nav>` tem rótulo **"Seções"** — DIFERENTE do "Navegação
 *   principal" do header. Dois landmarks iguais quebram a navegação por
 *   região;
 * - **recolha a lateral**: cada ícone mantém o rótulo original como nome
 *   acessível (passe o mouse para ver o tooltip, navegue por Tab para
 *   ouvir o nome). Ícone sozinho é ambíguo e mudo;
 * - o cabeçalho de seção é `<button aria-expanded>` com `aria-controls`,
 *   vindo do próprio `p-panelMenu`;
 * - no desktop a navegação é **persistente**, nunca modal — prender o
 *   foco numa navegação fixa é padrão de Drawer temporário.
 *
 * ⚠️ **Duas divergências do `p-panelMenu`, registradas sem gambiarra por
 * cima:** ele marca o item atual só com a classe
 * `p-panelmenu-item-link-active` (não emite `aria-current="page"`), e o
 * cabeçalho de seção sai `role="button"` + `aria-controls` **sem
 * `aria-expanded`** — quem ouve a tela não sabe se a seção está aberta.
 */
const meta: Meta<SidebarComponent> = {
  title: 'Nephos Blocks/Sidebar',
  component: SidebarComponent,
  decorators: [
    moduleMetadata({ imports: [SidebarComponent, ButtonModule] }),
    applicationConfig({ providers: [provideRouter(ROTAS_DE_PROVA)] }),
  ],
};

export default meta;
type Story = StoryObj<SidebarComponent>;

const SECOES = [
  {
    label: 'Cadastros',
    icon: 'fa-solid fa-users',
    items: [
      { label: 'Alunos', routerLink: '/cadastros/alunos' },
      { label: 'Responsáveis', routerLink: '/cadastros/responsaveis' },
    ],
  },
  {
    label: 'Bolsas',
    icon: 'fa-solid fa-award',
    items: [
      { label: 'Solicitações', routerLink: '/bolsas/solicitacoes' },
      { label: 'Relatórios', routerLink: '/bolsas/relatorios' },
    ],
  },
  { label: 'Configurações', icon: 'fa-solid fa-gear', routerLink: '/configuracoes' },
];

/** Expandida: as seções em accordion, o padrão do desktop. */
export const Expandida: Story = {
  render: () => ({
    props: { secoes: SECOES },
    template: `
      <div style="width:18rem; border-right:1px solid var(--p-content-border-color);">
        <nph-blocks-sidebar [items]="secoes"></nph-blocks-sidebar>
      </div>
    `,
  }),
};

/**
 * Recolhida na trilha de ícones. Um item de seção não tem onde abrir
 * aqui, então o botão **expande a lateral** em vez de fingir navegar — e
 * o nome acessível diz isso.
 */
export const Recolhida: Story = {
  render: () => ({
    props: { secoes: SECOES },
    template: `
      <div style="border-right:1px solid var(--p-content-border-color); width:max-content;">
        <nph-blocks-sidebar [items]="secoes" [collapsed]="true"></nph-blocks-sidebar>
      </div>
    `,
  }),
};

/**
 * No mobile a mesma navegação vira off-canvas. Aí ela é temporária: é
 * modal, prende o foco e **Esc** devolve o foco a quem abriu.
 */
export const GavetaMobile: Story = {
  name: 'Gaveta (mobile)',
  render: () => ({
    props: { secoes: SECOES, aberta: false },
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem; align-items:flex-start;">
        <p-button label="Abrir menu"
                  icon="fa-solid fa-bars"
                  severity="secondary"
                  [outlined]="true"
                  (onClick)="aberta = true"></p-button>

        <nph-blocks-sidebar
          [items]="secoes"
          [mobile]="true"
          [(drawerVisible)]="aberta"></nph-blocks-sidebar>
      </div>
    `,
  }),
};

/** Lateral fixa: sem o botão de recolher, onde a tela não admite recolher. */
export const SemRecolher: Story = {
  name: 'Sem recolher',
  render: () => ({
    props: { secoes: SECOES },
    template: `
      <div style="width:18rem; border-right:1px solid var(--p-content-border-color);">
        <nph-blocks-sidebar [items]="secoes" [collapsible]="false"></nph-blocks-sidebar>
      </div>
    `,
  }),
};
