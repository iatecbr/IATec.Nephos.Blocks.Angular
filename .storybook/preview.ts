import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Introdução',
          'Design System',
          ['Tokens', 'Tipografia', 'Cores', 'Espaçamentos', 'Guidelines'],
          'Componentes PrimeNG',
          'Blocos',
        ],
      },
    },
  },
};

export default preview;
