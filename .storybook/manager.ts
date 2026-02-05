import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light', // ou 'dark'

  // Branding
  brandTitle: 'Nephos Blocks',
  brandUrl: 'https://www.iatecdigital.com.br',
  brandImage: '/images/nephos.png', 
  brandTarget: '_self',

  // UI
  colorPrimary: '#0066CC',
  colorSecondary: '#0066CC',

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Sidebar
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#e0e0e0',
  appBorderRadius: 4,

  // Toolbar
  barTextColor: '#666666',
  barSelectedColor: '#0066CC',
  barBg: '#ffffff',
});

addons.setConfig({
  theme,
  panelPosition: 'bottom',
  showPanel: true,
});
