import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import {
  LinkComponent,
  LoginFormComponent,
  LogoComponent,
  provideNephosBrand,
} from '@iatec/nephos-ui';

import { ROTAS_DE_PROVA } from './rotas-de-prova';

/**
 * Ficha: `design-system/componentes/login-form.block.meta.ts`
 * (`origin: nephos-own`).
 *
 * O que conferir nas 7 marcas × 2 modos:
 *
 * - a **única** ênfase de marca na tela é o botão "Entrar" (e o link) —
 *   dois botões primários destruiriam a hierarquia da porta de entrada;
 * - o campo de senha **não** tem medidor de força: medidor é para quem
 *   está criando senha, e aqui a senha já existe;
 * - navegue por Tab: e-mail → senha → olho da senha → lembrar → Entrar →
 *   link. Todos com anel de foco visível nos dois modos;
 * - o erro é **geral**, no topo, em `role="alert"`. Nunca "este e-mail
 *   não existe" — isso conta a quem pergunta quais contas existem.
 */
const meta: Meta<LoginFormComponent> = {
  title: 'Nephos UI/Blocos/Login',
  component: LoginFormComponent,
  decorators: [
    moduleMetadata({ imports: [LoginFormComponent, LinkComponent, LogoComponent] }),
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
type Story = StoryObj<LoginFormComponent>;

/** O bloco completo, com marca e link de recuperação. */
export const Padrao: Story = {
  name: 'Padrão',
  render: () => ({
    props: { enviado: '' },
    template: `
      <div style="max-width:24rem;">
        <nph-ui-login-form (submit)="enviado = $event.email">
          <nph-ui-logo nphBrand variant="full" style="height:2rem;"></nph-ui-logo>
          <nph-ui-link nphLinks href="/recuperar-senha" variant="muted">
            Esqueci minha senha
          </nph-ui-link>
        </nph-ui-login-form>

        <p class="nph-caption nph-text-muted" aria-live="polite">
          {{ enviado ? 'Enviado para: ' + enviado : 'Nada enviado ainda.' }}
        </p>
      </div>
    `,
  }),
};

/**
 * Falha de autenticação. A mensagem é uma só e não diz **qual** dos dois
 * campos errou — é regra de segurança antes de ser regra de usabilidade.
 */
export const ComErro: Story = {
  name: 'Com erro',
  render: () => ({
    template: `
      <div style="max-width:24rem;">
        <nph-ui-login-form errorMessage="E-mail ou senha inválidos.">
          <nph-ui-link nphLinks href="/recuperar-senha" variant="muted">
            Esqueci minha senha
          </nph-ui-link>
        </nph-ui-login-form>
      </div>
    `,
  }),
};

/** Autenticando: botão em carregando e campos bloqueados. */
export const Carregando: Story = {
  render: () => ({
    template: `
      <div style="max-width:24rem;">
        <nph-ui-login-form [loading]="true"></nph-ui-login-form>
      </div>
    `,
  }),
};

/**
 * Contexto de alta segurança: sem "Lembrar-me". O resto do bloco não
 * muda — é o único interruptor da composição.
 */
export const SemLembrarMe: Story = {
  name: 'Sem "Lembrar-me"',
  render: () => ({
    template: `
      <div style="max-width:24rem;">
        <nph-ui-login-form [showRemember]="false"></nph-ui-login-form>
      </div>
    `,
  }),
};
