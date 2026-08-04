import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';

/**
 * Banco de provas do preset Nephos.
 *
 * Cada peça aqui existe para expor um valor que o Design System declara e que
 * antes só tinha sido medido em CSS gerado por script — nunca visto num
 * componente PrimeNG real dentro do Angular.
 *
 *   Botão primário .... ênfase da marca + contrastColor + hover/active
 *   Campo ............. geometria do formField (padding e raio herdados)
 *   Cartão ............ surface + raio de conteúdo
 *   Tags .............. paleta de feedback
 *   Checkbox/Select ... anel de foco (navegue por Tab)
 *
 * Troque a **Marca** e o **Modo** na barra de cima: são as 7 verticais × claro
 * e escuro, aplicadas pela mesma cadeia de tema do `layout.configurator.ts`.
 */
const meta: Meta = {
  title: 'Prova/Preset Nephos',
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        ButtonModule,
        InputTextModule,
        FloatLabelModule,
        CardModule,
        TagModule,
        MessageModule,
        CheckboxModule,
        SelectModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Prova: Story = {
  render: () => ({
    props: {
      texto: '',
      marcado: true,
      // ⚠️ NÃO usar nome de vertical aqui (corrigido em 04/08/2026).
      //
      // Estas opções existiam como "Educação / Financeiro / Igrejas", com o
      // placeholder "Selecione a vertical". Eram dois problemas, não um:
      //
      // 1. nome de marca escrito à mão no código — a regra 4 do
      //    `nephos-token-audit`, e a única violação viva que restava no
      //    repositório;
      // 2. pior que isso, o conjunto lia como um SELETOR DE MARCA, que o
      //    `AGENTS.md` proíbe explicitamente: a vertical vem do contexto e
      //    nunca é escolha de quem usa. O seletor das 7 marcas na barra do
      //    Storybook é andaime de bancada; dentro de uma tela, não existe.
      //
      // O campo aqui prova GEOMETRIA (padding, raio, anel de foco), então o
      // conteúdo da lista é indiferente — só precisa ser algo que ninguém
      // confunda com marca.
      opcoes: [
        { label: 'Manhã', value: 1 },
        { label: 'Tarde', value: 2 },
        { label: 'Noite', value: 3 },
      ],
      escolhido: null,
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:2rem; max-width:56rem;">

        <section>
          <h2 style="margin:0 0 .75rem; font-size:1rem;">Ênfase da marca — texto sobre a cor</h2>
          <div style="display:flex; gap:.75rem; flex-wrap:wrap; align-items:center;">
            <p-button label="Ação primária"></p-button>
            <p-button label="Secundária" severity="secondary"></p-button>
            <p-button label="Contornada" [outlined]="true"></p-button>
            <p-button label="Texto" [text]="true"></p-button>
            <p-button label="Destrutiva" severity="danger"></p-button>
          </div>
          <p style="margin:.75rem 0 0; font-size:.8125rem; opacity:.75;">
            Passe o mouse e mantenha pressionado: hover e active devem se afastar do texto,
            não escurecer por padrão do modo.
          </p>
        </section>

        <section>
          <h2 style="margin:0 0 .75rem; font-size:1rem;">Campo — geometria herdada</h2>
          <div style="display:flex; gap:1rem; flex-wrap:wrap; align-items:end;">
            <p-floatlabel>
              <input pInputText id="nome" [(ngModel)]="texto" />
              <label for="nome">Nome completo</label>
            </p-floatlabel>
            <p-select [options]="opcoes" [(ngModel)]="escolhido"
                      optionLabel="label" placeholder="Selecione o turno"
                      [style]="{ minWidth: '16rem' }"></p-select>
          </div>
        </section>

        <section>
          <h2 style="margin:0 0 .75rem; font-size:1rem;">Anel de foco — navegue por Tab</h2>
          <div style="display:flex; gap:1.5rem; align-items:center;">
            <p-checkbox [(ngModel)]="marcado" [binary]="true" inputId="aceite"></p-checkbox>
            <label for="aceite" style="font-size:.875rem;">Recebi e concordo</label>
            <p-button label="Alvo de foco" severity="secondary" [outlined]="true"></p-button>
          </div>
          <p style="margin:.75rem 0 0; font-size:.8125rem; opacity:.75;">
            O anel precisa ser visível contra o fundo da página nas 7 marcas, nos 2 modos.
          </p>
        </section>

        <section>
          <h2 style="margin:0 0 .75rem; font-size:1rem;">Feedback</h2>
          <div style="display:flex; gap:.5rem; flex-wrap:wrap; margin-bottom:1rem;">
            <p-tag value="Informação" severity="info"></p-tag>
            <p-tag value="Sucesso" severity="success"></p-tag>
            <p-tag value="Atenção" severity="warn"></p-tag>
            <p-tag value="Erro" severity="danger"></p-tag>
            <p-tag value="Neutro" severity="secondary"></p-tag>
          </div>
          <p-message severity="warn" text="A cor não é o único sinal — o texto diz o mesmo."></p-message>
        </section>

        <section>
          <h2 style="margin:0 0 .75rem; font-size:1rem;">Superfície e raio</h2>
          <p-card header="Cartão">
            <p style="margin:0;">
              Fundo, borda e raio vêm do preset base; a identidade entra só pela rampa da marca.
            </p>
          </p-card>
        </section>

      </div>
    `,
  }),
};
