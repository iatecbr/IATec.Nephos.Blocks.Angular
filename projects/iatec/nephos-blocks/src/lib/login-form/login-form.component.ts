import {ChangeDetectionStrategy, Component, input, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {MessageModule} from 'primeng/message';
import {PasswordModule} from 'primeng/password';

import {HeadingComponent, LabelComponent, NephosHeadingLevel} from '@iatec/nephos-ui';

/** O que o bloco entrega para quem vai autenticar. */
export interface NephosLoginCredentials {
    email: string;
    senha: string;
    lembrar: boolean;
}

/**
 * Dois blocos na mesma página teriam campos com o mesmo `id`, e a
 * associação `<label for>` passaria a apontar para o primeiro deles.
 */
let sequencia = 0;

/**
 * Ficha: `design-system/componentes/login-form.block.meta.ts` (origin: nephos-own).
 *
 * O bloco é uma COMPOSIÇÃO — InputText + Password + Checkbox + Button. Não
 * há componente novo aqui: o que é nosso é a forma de montar, e três
 * decisões dessa forma não são estéticas:
 *
 * **Erro geral, nunca campo a campo.** "Este e-mail não existe" conta a
 * quem pergunta quais contas existem no sistema. A mensagem é uma só, no
 * topo, em `role="alert"`: "E-mail ou senha inválidos".
 *
 * **Senha sem medidor de força.** Medidor é para quem está CRIANDO uma
 * senha. Aqui a senha já existe — avaliá-la só atrapalha (é uma
 * `invalidCombination` declarada na ficha).
 *
 * **`autocomplete` correto** (`username` / `current-password`): é o que
 * faz o gerenciador de senhas preencher. Sem isso, o formulário funciona
 * para quem digita e falha para quem depende da ferramenta.
 *
 * Nada além de e-mail e senha: cada campo extra é atrito na porta de
 * entrada, e dado de perfil pertence a outra tela.
 */
@Component({
    selector: 'nph-blocks-login-form',
    imports: [
        FormsModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        MessageModule,
        PasswordModule,
        HeadingComponent,
        LabelComponent
    ],
    templateUrl: './login-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
    /** Título da tela de acesso. */
    readonly title = input('Entrar');

    /** `1` porque a tela de login costuma ser a página inteira. */
    readonly headingLevel = input<NephosHeadingLevel>(1);

    /** Desligar em contextos de alta segurança. */
    readonly showRemember = input(true);

    /** Mensagem GERAL de falha. Nunca dizer qual dos dois campos errou. */
    readonly errorMessage = input<string | null>(null);

    /** Enquanto autentica: botão em carregando e campos bloqueados. */
    readonly loading = input(false);

    readonly submit = output<NephosLoginCredentials>();

    protected readonly email = signal('');
    protected readonly senha = signal('');
    protected readonly lembrar = signal(false);

    private readonly instancia = ++sequencia;

    protected readonly idEmail = `nph-login-email-${this.instancia}`;
    protected readonly idSenha = `nph-login-senha-${this.instancia}`;
    protected readonly idLembrar = `nph-login-lembrar-${this.instancia}`;

    protected enviar(): void {
        if (this.loading()) {
            return;
        }

        this.submit.emit({
            email: this.email(),
            senha: this.senha(),
            lembrar: this.lembrar()
        });
    }
}
