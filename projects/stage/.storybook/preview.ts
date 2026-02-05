import type { Preview } from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";

// Importar estilos globais
import '../src/styles.scss';
// Importar primeicons diretamente
import 'primeicons/primeicons.css';

// Tentar carregar compodoc se existir
try {
  const docJson = require("../documentation.json");
  setCompodocJson(docJson);
} catch (e) {
  console.log('Compodoc documentation not found. Run `npm run compodoc` to generate it.');
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;