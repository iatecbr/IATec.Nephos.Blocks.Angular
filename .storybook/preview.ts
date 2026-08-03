import { applicationConfig, type Preview } from '@storybook/angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import { NEPHOS_THEMES } from '../design-system/nephos.palettes';
import {
  applyNephosTheme,
  nephosPreset,
  NEPHOS_DEFAULT_THEME,
} from '../design-system/nephos.preset';

// Estilos globais (incluindo os PrimeIcons dos ícones internos do PrimeNG)
// entram pela opção `styles` do builder no angular.json, apontando para o
// mesmo `projects/stage/src/styles.scss` que o app usa — importar CSS aqui
// não funciona: o webpack do builder não tem loader para isso.
//
// A norma do Nephos é Font Awesome para os ícones de CONTEÚDO; substituir os
// ícones INTERNOS do PrimeNG segue sendo decisão de configuração em aberto.

/**
 * A peça que faltava no Storybook do repositório.
 *
 * O `providePrimeNG({ theme })` existia só no `app.config.ts` do app, e por
 * isso as stories renderizavam sem nenhuma variável `--p-*`. Aqui ele é
 * fornecido ao contexto das stories, no mesmo formato do app — e a marca é
 * trocada em runtime pelo `applyNephosTheme`, que é a mesma chamada do
 * `onPresetChange()` do `layout.configurator.ts`.
 */
const preview: Preview = {
  globalTypes: {
    marca: {
      description: 'Vertical da organização',
      toolbar: {
        title: 'Marca',
        icon: 'paintbrush',
        items: NEPHOS_THEMES.map((t) => ({ value: t, title: t })),
        dynamicTitle: true,
      },
    },
    modo: {
      description: 'Claro ou escuro',
      toolbar: {
        title: 'Modo',
        icon: 'mirror',
        items: [
          { value: 'claro', title: 'claro' },
          { value: 'escuro', title: 'escuro' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    marca: NEPHOS_DEFAULT_THEME,
    modo: 'claro',
  },

  decorators: [
    applicationConfig({
      providers: [
        provideAnimationsAsync(),
        providePrimeNG({
          theme: {
            preset: nephosPreset(NEPHOS_DEFAULT_THEME),
            options: { darkModeSelector: '.app-dark' },
          },
        }),
      ],
    }),

    (story, context) => {
      const marca = context.globals['marca'] ?? NEPHOS_DEFAULT_THEME;
      const escuro = context.globals['modo'] === 'escuro';

      // ⚠️ ORDEM IMPORTA. O `providePrimeNG` do applicationConfig acima roda
      // no bootstrap do Angular, que acontece DEPOIS deste decorator — e ele
      // reescreve o tema com a marca padrão. Se `applyNephosTheme` for chamado
      // aqui direto, o bootstrap sobrescreve e as 7 verticais saem todas na
      // cor do `global`. Por isso a troca de marca vai para um macrotask, que
      // roda depois do bootstrap.
      //
      // É a mesma cadeia do configurador do repo:
      //   $t().preset(Aura).preset(ext).surfacePalette(slate).use()
      setTimeout(() => applyNephosTheme(marca), 0);

      document.documentElement.classList.toggle('app-dark', escuro);
      document.body.style.background = 'var(--p-content-background)';
      document.body.style.color = 'var(--p-text-color)';
      document.body.style.padding = '1.5rem';

      return story();
    },
  ],

  parameters: {
    layout: 'fullscreen',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
