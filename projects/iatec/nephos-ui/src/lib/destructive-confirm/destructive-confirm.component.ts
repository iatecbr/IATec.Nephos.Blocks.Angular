import {ChangeDetectionStrategy, Component, computed, input, model, output, signal} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';

import {HelperTextComponent} from '../helper-text/helper-text.component';
import {LabelComponent} from '../label/label.component';
import {TextComponent} from '../text/text.component';

/**
 * Ficha: `design-system/componentes/destructive-confirm.block.meta.ts`
 * (origin: nephos-own).
 *
 * A pergunta que decide se este bloco deve existir na tela: **dá para
 * desfazer?** Se dá, não pergunte — execute e ofereça "Desfazer" num
 * Toast. Perguntar "tem certeza?" a cada clique cansa, e quem cansa passa
 * a confirmar no automático — que é exatamente o acidente que o padrão
 * deveria evitar.
 *
 * As quatro regras de segurança que o componente garante por construção:
 *
 *   1. a ação destrutiva sai em `severity="danger"`, nunca disfarçada de
 *      ação comum;
 *   2. o rótulo é o VERBO real ("Excluir"), nunca "Sim/OK" — fora de
 *      contexto, "Sim" não diz o que vai acontecer;
 *   3. o Cancelar vem PRIMEIRO no DOM, então é ele que recebe o foco
 *      inicial (o `p-dialog` foca o primeiro focável do rodapé). Um Enter
 *      distraído cancela, não exclui;
 *   4. `dismissableMask` fica desligado — clicar fora não pode valer nem
 *      como confirmar nem como um "talvez".
 *
 * `role="alertdialog"` (e não `dialog`): a consequência precisa ser
 * anunciada junto com a abertura, não só quando alguém a alcança.
 */
@Component({
    selector: 'nph-ui-destructive-confirm',
    imports: [
        ButtonModule,
        DialogModule,
        InputTextModule,
        HelperTextComponent,
        LabelComponent,
        TextComponent
    ],
    templateUrl: './destructive-confirm.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestructiveConfirmComponent {
    /** Abre e fecha. Two-way: o bloco fecha sozinho ao confirmar/cancelar. */
    readonly visible = model(false);

    /** A pergunta, NOMEANDO o objeto ("Excluir a fatura #1032?"). */
    readonly title = input.required<string>();

    /** O que acontece e por que não dá para desfazer. */
    readonly consequence = input('Esta ação não pode ser desfeita.');

    /** O verbo real da ação destrutiva. */
    readonly confirmLabel = input('Excluir');

    /** A saída segura. */
    readonly cancelLabel = input('Cancelar');

    /** Impacto muito alto: só libera o confirmar depois de digitar o nome. */
    readonly requireTyping = input(false);

    /** O texto exato que precisa ser digitado quando `requireTyping`. */
    readonly itemName = input<string | null>(null);

    readonly confirm = output<void>();
    readonly cancel = output<void>();

    /** O que foi digitado na trava de confirmação. */
    protected readonly digitado = signal('');

    /**
     * Só o espaço em volta é perdoado. Exigir o nome e aceitar
     * "qualquer coisa parecida" devolveria o acidente que a trava evita.
     */
    protected readonly travaLiberada = computed(() => {
        if (!this.requireTyping()) {
            return true;
        }

        const esperado = this.itemName();
        return !!esperado && this.digitado().trim() === esperado;
    });

    protected readonly idCampoTrava = 'nph-confirm-trava';

    /** Guarda a saída: fechar pelo X ou por Esc é cancelar, não confirmar. */
    private confirmou = false;

    protected aoConfirmar(): void {
        this.confirmou = true;
        this.visible.set(false);
        this.confirm.emit();
    }

    protected aoCancelar(): void {
        this.visible.set(false);
    }

    /** Roda em toda saída — pelo botão, pelo X ou por Esc. */
    protected aoFechar(): void {
        this.digitado.set('');

        if (this.confirmou) {
            this.confirmou = false;
            return;
        }

        this.cancel.emit();
    }
}
