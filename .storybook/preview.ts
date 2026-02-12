import type { Preview } from '@storybook/angular';

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
        method: 'alphabetical',
        order: [
          'Introdução',
          'Design System',
          [
            'Introdução',
            'Tokens',
            'Tipografia',
            'Cores',
            'Espaçamentos',
            'Guidelines'
          ],
            'Layout',
            'Blocos',
            'Componentes Nephos',
            [
                'Introdução',
                'Temas e Customizações'
            ],
          'Componentes PrimeNG',
          [
            'Introdução',
            'Temas e Customizações'
          ],
        ],
        locales: 'pt-BR',
      },
    },
  },
};

export default preview;
