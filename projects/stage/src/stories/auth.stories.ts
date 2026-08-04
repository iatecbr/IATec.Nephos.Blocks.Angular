import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import {
  HeadingComponent,
  LabelComponent,
  LinkComponent,
  LogoComponent,
  TextComponent,
  provideNephosBrand,
} from '@iatec/nephos-ui';
import { LoginFormComponent } from '@iatec/nephos-blocks';
import { LayoutAuthComponent } from '@iatec/nephos-layout';

import { ROTAS_DE_PROVA } from './rotas-de-prova';

/**
 * Ficha: `design-system/componentes/auth.template.meta.ts`
 * (`category: layout`, `origin: nephos-own`).
 *
 * O primeiro TEMPLATE do Nephos. A diferença para um bloco é o que ele
 * NÃO faz: não desenha campo, não emite evento, não sabe autenticar. Ele
 * arruma — e as regras que ele existe para não deixar quebrar são de
 * composição, não de peça.
 *
 * O que conferir nas 7 marcas × 2 modos:
 *
 * - **um `<main>` e um único `<h1>`**. O título vem do bloco de
 *   formulário, nunca da moldura. Dois `<h1>` fariam a tela se anunciar
 *   duas vezes;
 * - **zero navegação do app** no DOM: sem `role="banner"`, sem `<nav>`,
 *   sem menu. A pessoa ainda não entrou;
 * - no `split`, o painel de marca é a **única** superfície com a cor da
 *   vertical, e usa o par `primary` + contraste declarado marca a marca.
 *   Estreite a janela abaixo de 992px: o painel some e a tela vira o
 *   cartão centrado — se algo essencial estivesse lá, sumiria junto;
 * - navegue por Tab: e-mail → senha → olho da senha → lembrar → Entrar →
 *   links. O painel decorativo **não** entra na ordem de foco;
 * - o rodapé legal some sozinho quando ninguém preenche o slot.
 *
 * ⚠️ A moldura ocupa `100dvh` — é a página inteira. No Storybook isso
 * soma com o padding do `<body>` da bancada e aparece uma barra de
 * rolagem; no produto não existe.
 */
const meta: Meta<LayoutAuthComponent> = {
  title: 'Nephos Templates/Autenticação',
  component: LayoutAuthComponent,
  decorators: [
    moduleMetadata({
      imports: [
        LayoutAuthComponent,
        LoginFormComponent,
        LinkComponent,
        LogoComponent,
        // Só o andaime da story "Recuperar senha" usa os quatro abaixo —
        // o bloco de recuperação ainda não existe no catálogo.
        HeadingComponent,
        LabelComponent,
        TextComponent,
        ButtonModule,
        InputTextModule,
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
type Story = StoryObj<LayoutAuthComponent>;

/** Logo + o bloco de login + rodapé legal, centrados. O caso padrão. */
export const Padrao: Story = {
  name: 'Padrão',
  render: () => ({
    template: `
      <nph-layout-auth>
        <nph-ui-logo nphBrand variant="full" style="height:2rem;"></nph-ui-logo>

        <nph-blocks-login-form>
          <nph-ui-link nphLinks href="/recuperar-senha" variant="muted">
            Esqueci minha senha
          </nph-ui-link>
        </nph-blocks-login-form>

        <!-- O atributo vai em CADA link: assim eles são os filhos diretos
             do rodape e recebem o espacamento da moldura. -->
        <nph-ui-link nphFooter href="/termos" variant="muted">Termos</nph-ui-link>
        <nph-ui-link nphFooter href="/privacidade" variant="muted">Privacidade</nph-ui-link>
      </nph-layout-auth>
    `,
  }),
};

/**
 * A variante `split`. O painel é **decorativo**: `aria-hidden` na região
 * e `alt` vazio na imagem, porque abaixo de 992px ele não existe.
 */
export const Split: Story = {
  render: () => ({
    props: {
      painel: { texto: 'Um acesso para todos os sistemas.' },
    },
    template: `
      <nph-layout-auth layout="split" [brandPanel]="painel">
        <nph-ui-logo nphBrand variant="full" style="height:2rem;"></nph-ui-logo>

        <nph-blocks-login-form>
          <nph-ui-link nphLinks href="/recuperar-senha" variant="muted">
            Esqueci minha senha
          </nph-ui-link>
        </nph-blocks-login-form>
      </nph-layout-auth>
    `,
  }),
};

/**
 * Falha de autenticação. O erro é do BLOCO, não da moldura — e continua
 * geral ("e-mail ou senha inválidos"), nunca dizendo qual dos dois errou.
 */
export const ComErro: Story = {
  name: 'Com erro',
  render: () => ({
    template: `
      <nph-layout-auth>
        <nph-ui-logo nphBrand variant="full" style="height:2rem;"></nph-ui-logo>
        <nph-blocks-login-form errorMessage="E-mail ou senha inválidos."></nph-blocks-login-form>
      </nph-layout-auth>
    `,
  }),
};

/** Autenticando: o botão fica em carregando e os campos bloqueados. */
export const Carregando: Story = {
  render: () => ({
    template: `
      <nph-layout-auth>
        <nph-ui-logo nphBrand variant="full" style="height:2rem;"></nph-ui-logo>
        <nph-blocks-login-form [loading]="true"></nph-blocks-login-form>
      </nph-layout-auth>
    `,
  }),
};

/**
 * Recuperar senha — a prova de que a moldura é a MESMA nos três fluxos.
 * Nada aqui muda menos o bloco que entra no slot, e o `variant` só
 * carimba `data-variant="reset"` no `<main>` para QA e teste não terem
 * que adivinhar o fluxo pelo conteúdo projetado.
 *
 * ⚠️ **Andaime de bancada:** o bloco de recuperação de senha não existe
 * (os 7 blocos do Nephos não incluem cadastro nem recuperação). O
 * formulário abaixo é montado na story a partir de peças do catálogo, só
 * para a moldura ter o que hospedar. Um campo só, de propósito: quem
 * recupera a senha não tem senha para digitar.
 */
export const RecuperarSenha: Story = {
  name: 'Recuperar senha',
  render: () => ({
    template: `
      <nph-layout-auth variant="reset">
        <nph-ui-logo nphBrand variant="full" style="height:2rem;"></nph-ui-logo>

        <form aria-labelledby="reset-t" style="display:flex;flex-direction:column;gap:var(--nph-space-md);">
          <nph-ui-heading id="reset-t" [level]="1">Recuperar senha</nph-ui-heading>

          <nph-ui-text size="body-sm" variant="muted">
            Enviamos um link de redefinição para o e-mail da sua conta.
          </nph-ui-text>

          <div class="nph-field">
            <nph-ui-label for="reset-email">E-mail</nph-ui-label>
            <input pInputText id="reset-email" type="email" name="email"
                   autocomplete="username" required [fluid]="true" />
          </div>

          <p-button type="submit" label="Enviar link" [fluid]="true"></p-button>
        </form>

        <nph-ui-link nphFooter href="/entrar" variant="muted">Voltar para entrar</nph-ui-link>
      </nph-layout-auth>
    `,
  }),
};
