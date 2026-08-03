import { applicationConfig, type Preview } from '@storybook/angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';

import {
  NEPHOS_THEMES,
  NephosTheme,
  SURFACE_SLATE,
} from '../design-system/nephos.palettes';
import {
  applyNephosTheme,
  nephosPreset,
  NEPHOS_DEFAULT_THEME,
} from '../design-system/nephos.preset';

/**
 * O preset de bootstrap de uma marca, com o `surface` já dentro.
 *
 * `nephosPreset()` sozinho traz só o que é NOSSO na camada semantic (a
 * rampa da marca, o texto sobre a ênfase, o anel de foco). O `surface`
 * fica de fora porque, no repo, ele é aplicado à parte pelo
 * `surfacePalette()` — tanto no `layout.configurator.ts` quanto no
 * `applyNephosTheme()`.
 *
 * No app isso funciona: o configurador roda com a aplicação já em pé. No
 * Storybook, não — o bootstrap acontece depois do decorator, e o
 * resultado é que o modo escuro renderizava no `zinc` padrão do Aura em
 * vez do `slate` que o `design.md` declara. Como surface é fundação
 * ("surface = slate do PrimeNG", igual nas 7 marcas), o banco de provas
 * precisa nascer com ele.
 *
 * Este `definePreset` faz exatamente o que o `surfacePalette()` do
 * `@primeuix/themes` faz por dentro: grava `semantic.colorScheme.
 * {light,dark}.surface`. Nenhum valor novo — o mesmo `SURFACE_SLATE`.
 */
const presetDeBootstrap = (marca: NephosTheme) =>
  definePreset(nephosPreset(marca), {
    semantic: {
      colorScheme: {
        light: { surface: SURFACE_SLATE },
        dark: { surface: SURFACE_SLATE },
      },
    },
  });

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
    (story, context) => {
      const marca = (context.globals['marca'] ?? NEPHOS_DEFAULT_THEME) as NephosTheme;
      const escuro = context.globals['modo'] === 'escuro';

      document.documentElement.classList.toggle('app-dark', escuro);
      document.body.style.background = 'var(--p-content-background)';
      document.body.style.color = 'var(--p-text-color)';
      document.body.style.padding = '1.5rem';

      // ⚠️ ORDEM IMPORTA — e é por isso que o `providePrimeNG` é montado
      // AQUI DENTRO, com a marca do contexto, em vez de num
      // `applicationConfig` estático lá fora.
      //
      // O bootstrap do Angular roda DEPOIS deste decorator. Com um preset
      // estático, ele nascia sempre na marca padrão e sobrescrevia qualquer
      // troca feita antes — inclusive a que vem da URL. Resultado: abrir uma
      // story já apontando para uma vertical (`?globals=marca:educacao`)
      // renderizava na cor do `global`, e só passava a obedecer depois de
      // mexer no seletor à mão. Montando o preset com a marca do contexto,
      // o bootstrap já nasce certo e não há corrida nenhuma.
      const comTema = applicationConfig({
        providers: [
          provideAnimationsAsync(),
          providePrimeNG({
            theme: {
              preset: presetDeBootstrap(marca),
              options: { darkModeSelector: '.app-dark' },
            },
          }),
        ],
      })(story, context);

      // Para a troca de marca com a aplicação já em pé (o seletor da barra,
      // quando o Storybook reaproveita o bootstrap): é a mesma cadeia do
      // configurador do repo —
      //   $t().preset(Aura).preset(ext).surfacePalette(slate).use()
      setTimeout(() => applyNephosTheme(marca), 0);

      return comTema;
    },
  ],

  parameters: {
    layout: 'fullscreen',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
