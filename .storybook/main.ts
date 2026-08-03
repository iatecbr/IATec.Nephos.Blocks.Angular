import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../projects/stage/src/stories/**/*.stories.ts'],
  addons: [],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;
