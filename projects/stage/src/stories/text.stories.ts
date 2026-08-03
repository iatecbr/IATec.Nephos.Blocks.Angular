import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { TextComponent } from '@iatec/nephos-ui';

/**
 * Ficha: `design-system/componentes/text.meta.ts` (`origin: nephos-own`).
 *
 * Duas coisas para conferir nas 7 marcas × 2 modos:
 *
 * 1. **`muted` continua legível.** Ele é texto de apoio, não texto
 *    decorativo — a ficha exige 4,5:1 dele também. É no modo escuro que
 *    costuma escorregar.
 * 2. **Nenhum tamanho de corpo carrega cor de marca.** `primary` quer
 *    dizer ação; num parágrafo vira um link que não existe.
 */
const meta: Meta<TextComponent> = {
  title: 'Nephos UI/Átomos/Text',
  component: TextComponent,
  decorators: [moduleMetadata({ imports: [TextComponent] })],
};

export default meta;
type Story = StoryObj<TextComponent>;

/** A escala de corpo, do rótulo versalete ao corpo de destaque. */
export const Escala: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem; max-width:44rem;">
        <nph-ui-text size="overline">overline · rótulo acima de título</nph-ui-text>
        <nph-ui-text size="caption">caption · legenda e texto auxiliar</nph-ui-text>
        <nph-ui-text size="body-sm">body-sm · corpo denso, para tabelas e painéis com muita informação.</nph-ui-text>
        <nph-ui-text size="body-lg">body-lg · corpo padrão. É este que carrega a leitura da tela.</nph-ui-text>
        <nph-ui-text size="body-xl">body-xl · corpo de destaque</nph-ui-text>
      </div>
    `,
  }),
};

/** `default` × `muted` lado a lado — os dois precisam passar 4,5:1. */
export const Enfase: Story = {
  name: 'Ênfase de cor',
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:.75rem; max-width:44rem;">
        <nph-ui-text>
          Texto padrão. O recálculo por reserva de vaga funciona como no produto final.
        </nph-ui-text>
        <nph-ui-text variant="muted">
          Texto muted. Serve de apoio — não é onde mora o conteúdo que a pessoa
          precisa ler por completo.
        </nph-ui-text>
      </div>
    `,
  }),
};

/**
 * Ênfase é significado: `strong` diz que importa, `em` muda a entonação.
 * Quem quer só "deixar em negrito" está pedindo peso de fonte, não ênfase —
 * e cria uma marcação que o leitor de tela vai anunciar sem motivo.
 */
export const EnfaseSemantica: Story = {
  name: 'Ênfase semântica',
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:.75rem; max-width:44rem;">
        <nph-ui-text emphasis="strong">Importância — sai como &lt;strong&gt;.</nph-ui-text>
        <nph-ui-text emphasis="em">Entonação — sai como &lt;em&gt;.</nph-ui-text>
        <nph-ui-text size="caption" variant="muted">
          Inspecione o DOM: a tag é a marcação semântica, não uma classe de estilo.
        </nph-ui-text>
      </div>
    `,
  }),
};
