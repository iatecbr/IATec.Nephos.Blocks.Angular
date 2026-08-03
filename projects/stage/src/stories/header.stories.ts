import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { provideNephosBrand } from '@iatec/nephos-ui';
import { HeaderComponent } from '@iatec/nephos-blocks';

import { ROTAS_DE_PROVA } from './rotas-de-prova';

/**
 * Ficha: `design-system/componentes/header.block.meta.ts`
 * (`origin: nephos-own`).
 *
 * O que conferir nas 7 marcas × 2 modos:
 *
 * - **nenhum nome de marca no template.** O logo vem do `NEPHOS_BRAND` e
 *   a ênfase vem do tema. Troque a vertical na barra: a mesma barra serve
 *   as 7;
 * - o `<nav>` tem rótulo **"Navegação principal"** — a sidebar usa
 *   "Seções", porque dois landmarks iguais confundem quem navega por região;
 * - nada só-ícone fica mudo: tema, notificações e conta têm nome
 *   acessível, e o contador entra no nome ("Notificações, 3 não lidas");
 * - o gatilho da conta tem `aria-haspopup`/`aria-expanded`/`aria-controls`
 *   e o `aria-expanded` acompanha o popup de verdade.
 *
 * ⚠️ **Divergência registrada, sem gambiarra por cima:** o `p-menubar`
 * marca o item atual só com a classe `p-menubar-item-link-active` — não
 * emite `aria-current="page"`. A ficha pede o estado programático; hoje
 * ele sai só como cor.
 */
const meta: Meta<HeaderComponent> = {
  title: 'Nephos Blocks/Header',
  component: HeaderComponent,
  parameters: { layout: 'fullscreen' },
  decorators: [
    moduleMetadata({ imports: [HeaderComponent] }),
    applicationConfig({
      providers: [
        provideRouter(ROTAS_DE_PROVA),
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
type Story = StoryObj<HeaderComponent>;

const NAV = [
  { label: 'Painel', routerLink: '/painel' },
  {
    label: 'Bolsas',
    items: [
      { label: 'Por campo', routerLink: '/bolsas/campos' },
      { label: 'Por escola', routerLink: '/bolsas/escolas' },
    ],
  },
  { label: 'Relatórios', routerLink: '/relatorios' },
];

const CONTA = [
  { label: 'Meu perfil', icon: 'fa-solid fa-user', routerLink: '/perfil' },
  { label: 'Sair', icon: 'fa-solid fa-right-from-bracket' },
];

/** A barra completa. Abra o menu da conta pelo teclado (Enter no avatar). */
export const Padrao: Story = {
  name: 'Padrão',
  render: () => ({
    props: {
      nav: NAV,
      conta: CONTA,
      usuario: { nome: 'Indiane Pita' },
      termo: '',
    },
    template: `
      <nph-blocks-header
        [navItems]="nav"
        [accountItems]="conta"
        [user]="usuario"
        [notificationsCount]="3"
        searchLabel="Buscar no sistema"
        (search)="termo = $event">
      </nph-blocks-header>

      <p class="nph-caption nph-text-muted" style="padding:1rem;" aria-live="polite">
        {{ termo ? 'Buscou por: ' + termo : 'Nada buscado ainda.' }}
      </p>
    `,
  }),
};

/**
 * Sem notificações: o contador some, mas o botão continua — e o nome
 * acessível continua dizendo o estado ("nenhuma não lida").
 */
export const SemNotificacao: Story = {
  name: 'Sem notificação',
  render: () => ({
    props: { nav: NAV, conta: CONTA, usuario: { nome: 'Indiane Pita' } },
    template: `
      <nph-blocks-header
        [navItems]="nav"
        [accountItems]="conta"
        [user]="usuario"
        [notificationsCount]="0">
      </nph-blocks-header>
    `,
  }),
};

/** Produto sem busca central: o campo sai e o resto da barra não muda. */
export const SemBusca: Story = {
  name: 'Sem busca',
  render: () => ({
    props: { nav: NAV, conta: CONTA, usuario: { nome: 'Indiane Pita' } },
    template: `
      <nph-blocks-header
        [navItems]="nav"
        [accountItems]="conta"
        [user]="usuario"
        [showSearch]="false"
        [notificationsCount]="12">
      </nph-blocks-header>
    `,
  }),
};
