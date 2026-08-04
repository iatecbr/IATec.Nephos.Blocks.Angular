import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';

import { HeadingComponent, TextComponent, provideNephosBrand } from '@iatec/nephos-ui';
import { HeaderComponent, SidebarComponent } from '@iatec/nephos-blocks';
import { LayoutAppShellComponent } from '@iatec/nephos-layout';

import { ROTAS_DE_PROVA } from './rotas-de-prova';

/**
 * Ficha: `design-system/componentes/app-shell.template.meta.ts`
 * (`category: layout`, `origin: nephos-own`).
 *
 * A moldura das telas de dentro. É o template que POSICIONA os dois
 * blocos de navegação — e todas as regras dele são de composição:
 *
 * - **dê Tab a partir do topo**: o primeiro foco é "Pular para o
 *   conteúdo", que aparece na tela ao ser focado e leva ao `<main>`. Sem
 *   ele, cada tela custa o header e a lateral inteiros em Tab;
 * - **três landmarks, nomes distintos**: `banner` (header),
 *   `navigation` "Navegação principal" (header), `navigation` "Seções"
 *   (sidebar) e um `main` só. A moldura não rotula nada — quem rotula
 *   são os blocos, senão sairia duplicado;
 * - **a largura da lateral é da moldura**, não do bloco: recolha a
 *   sidebar e a coluna encolhe de 256px para 90px, os dois valores que o
 *   layout do repositório já usa em produção;
 * - **estreite a janela abaixo de 992px**: a grade vira uma coluna e a
 *   lateral passa a ser gaveta (quem resolve isso é o bloco);
 * - **nenhum nome de marca** na moldura. Troque a vertical na barra: a
 *   mesma moldura serve as 7.
 */
const meta: Meta<LayoutAppShellComponent> = {
  title: 'Nephos Templates/App Shell',
  component: LayoutAppShellComponent,
  decorators: [
    moduleMetadata({
      imports: [
        LayoutAppShellComponent,
        HeaderComponent,
        SidebarComponent,
        HeadingComponent,
        TextComponent,
        BreadcrumbModule,
        ButtonModule,
      ],
    }),
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
type Story = StoryObj<LayoutAppShellComponent>;

const NAV = [
  { label: 'Painel', routerLink: '/painel' },
  { label: 'Bolsas', routerLink: '/bolsas' },
  { label: 'Relatórios', routerLink: '/relatorios' },
];

const CONTA = [
  { label: 'Meu perfil', icon: 'fa-solid fa-user', routerLink: '/perfil' },
  { label: 'Sair', icon: 'fa-solid fa-right-from-bracket' },
];

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

const TRILHA = [{ label: 'Bolsas', routerLink: '/bolsas' }, { label: 'Solicitações' }];
const INICIO = { icon: 'fa-solid fa-house', routerLink: '/' };

const CONTEUDO = `
  <nph-ui-text>
    O conteúdo real da página entra aqui — a listagem, o formulário, o
    painel. A moldura não sabe o que é.
  </nph-ui-text>
`;

/** A moldura completa: header, lateral, trilha, cabeçalho de página e conteúdo. */
export const Padrao: Story = {
  name: 'Padrão',
  render: () => ({
    props: { nav: NAV, conta: CONTA, secoes: SECOES, trilha: TRILHA, inicio: INICIO },
    template: `
      <nph-layout-app-shell>
        <nph-blocks-header nphHeader
                           [navItems]="nav"
                           [accountItems]="conta"
                           [user]="{ nome: 'Indiane Pita' }"
                           [notificationsCount]="3">
        </nph-blocks-header>

        <nph-blocks-sidebar nphSidebar [items]="secoes"></nph-blocks-sidebar>

        <!-- O p-breadcrumb NAO tem input de aria-label (so homeAriaLabel),
             e a ficha exige nav "Trilha". Entra pelo pt, que e o
             caminho oficial de pass-through do PrimeNG. -->
        <p-breadcrumb nphBreadcrumb [model]="trilha" [home]="inicio"
                      [pt]="{ root: { 'aria-label': 'Trilha' } }"></p-breadcrumb>

        <!-- O atributo vai em CADA peça: assim as duas são filhas diretas
             do cabeçalho de página e recebem o arranjo da moldura. -->
        <nph-ui-heading nphPageHeader [level]="1">Solicitações de bolsa</nph-ui-heading>
        <p-button nphPageHeader label="Nova solicitação"></p-button>

        ${CONTEUDO}
      </nph-layout-app-shell>
    `,
  }),
};

/**
 * Lateral recolhida. A coluna da moldura encolhe junto — é o único jeito
 * de a trilha de ícones não ficar boiando numa faixa de 256px. Repare
 * que o MESMO valor é ligado nos dois lugares.
 */
export const LateralRecolhida: Story = {
  name: 'Lateral recolhida',
  render: () => ({
    props: { nav: NAV, conta: CONTA, secoes: SECOES, recolhida: true },
    template: `
      <nph-layout-app-shell [sidebarCollapsed]="recolhida" [showBreadcrumb]="false">
        <nph-blocks-header nphHeader
                           [navItems]="nav"
                           [accountItems]="conta"
                           [user]="{ nome: 'Indiane Pita' }">
        </nph-blocks-header>

        <nph-blocks-sidebar nphSidebar [items]="secoes" [(collapsed)]="recolhida"></nph-blocks-sidebar>

        <nph-ui-heading nphPageHeader [level]="1">Alunos</nph-ui-heading>

        ${CONTEUDO}
      </nph-layout-app-shell>
    `,
  }),
};

/**
 * Tela foco-no-conteúdo: sem lateral e sem trilha. A grade volta a ter
 * uma coluna só — o conteúdo ocupa a largura inteira em vez de deixar
 * uma faixa vazia à esquerda.
 */
export const SemLateral: Story = {
  name: 'Sem lateral',
  render: () => ({
    props: { nav: NAV, conta: CONTA },
    template: `
      <nph-layout-app-shell [showSidebar]="false" [showBreadcrumb]="false">
        <nph-blocks-header nphHeader
                           [navItems]="nav"
                           [accountItems]="conta"
                           [user]="{ nome: 'Indiane Pita' }"
                           [showSearch]="false">
        </nph-blocks-header>

        <nph-ui-heading nphPageHeader [level]="1">Termo de aceite</nph-ui-heading>

        ${CONTEUDO}
      </nph-layout-app-shell>
    `,
  }),
};
