/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · Tema multimarca — ALINHADO AO REPO REAL (3.0.0)
 * ─────────────────────────────────────────────────────────────
 * O QUE FAZ: pega as 7 marcas da organização (nossas cores) e as pluga
 * na máquina de temas do PrimeNG, do MESMO jeito que o repo já faz — só
 * que o repo hoje só conhece as cores de DEMO (emerald, blue…) e as 7
 * marcas não estão lá. Esta é a peça que falta.
 *
 * ✅ RECONCILIADO com o repo `IATec.Nephos.Blocks.Angular @ 3.0.0`
 *    (`projects/iatec/nephos-layout/.../configurator/layout.configurator.ts`).
 *    Copiamos EXATAMENTE o mecanismo e os valores de função do
 *    `getPresetExt()`/`onPresetChange()` de lá — trocando só a fonte da
 *    rampa `primary`: em vez de uma cor de demo, a rampa da marca.
 *
 *    Mecanismo do repo (idêntico ao daqui):
 *      $t().preset(BASE).preset(<ext>).surfacePalette(<surface>)
 *          .use({ useDefaultOptions: true })
 *    onde <ext> = { semantic: { primary: <rampa>, colorScheme: {light,dark} } }
 *    e o surface é aplicado SEPARADO, por `surfacePalette()`.
 *
 * Stack confirmada no repo: PrimeNG 21.0.2 · @primeuix/themes 2.0.2.
 * ─────────────────────────────────────────────────────────────
 */

import { $t, definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import {
  BRAND_RAMPS,
  BRAND_ON_PRIMARY,
  BRAND_FOCUS_RING,
  BRAND_EMPHASIS,
  ON_PRIMARY_WHITE,
  SURFACE_SLATE,
  NephosTheme,
  NEPHOS_THEMES,
} from './nephos.palettes';

/**
 * Preset base = Aura (confirmado pelo Elvys, 24/07).
 * ⚠️ Achado ao reconciliar: o app `stage` do repo hoje roda de fato o
 * Lara (o `layout.service` tem `preset:'Lara'` e o `app.config.ts`
 * importa de `'@primeuix/themes/lara'` numa variável CHAMADA `Aura` —
 * provável resquício). Como o Elvys decidiu Aura, seguimos Aura; vale a
 * Indiane confirmar com ele se o padrão do `stage` também deve virar Aura.
 */
const BASE_PRESET = Aura;

/**
 * A extensão de tema de UMA marca. Mesma forma do `getPresetExt()` do
 * repo (ramo não-`noir`); os valores de função são cópia fiel — só a
 * rampa `primary` vem da marca. Sobrescreve SÓ o que é nosso; feedback,
 * gray, spacing, radius e anatomia continuam vindo do preset base.
 *
 * Mapa (= "Vocabulário de token" do design.md):
 *   claro  → ênfase POR MARCA (padrão .500) · texto POR MARCA · hover e
 *            active a um e dois passos, NA DIREÇÃO OPOSTA AO TEXTO ·
 *            seleção: fundo .50/.100, texto .700, foco .800
 *   escuro → ênfase POR MARCA (padrão .400) · texto POR MARCA · hover e
 *            active a um e dois passos, NA DIREÇÃO OPOSTA AO TEXTO
 *
 * ⚠️ MUDANÇA DE 31/07/2026 — o texto sobre a ênfase (`contrastColor`) e a
 * cor do anel de foco NÃO são mais fixos por modo: vêm de
 * `BRAND_ON_PRIMARY[theme]` e `BRAND_FOCUS_RING[theme]`. O par fixo antigo
 * (branco no claro · quase-preto no escuro) reprovava o AA em 6 das 7
 * marcas em pelo menos um modo. As razões medidas estão marca a marca no
 * `nephos.palettes.ts`. Nenhuma cor de marca mudou — só o texto por cima.
 */
export function nephosPresetExt(theme: NephosTheme) {
  const onPrimary = BRAND_ON_PRIMARY[theme];
  const focusRing = BRAND_FOCUS_RING[theme];
  const emphasis = BRAND_EMPHASIS[theme];

  /** Passo da rampa como referência de token, ex.: 600 → `{primary.600}`. */
  const step = (n: number) => `{primary.${n}}`;

  /**
   * Direção do hover/active: o fundo se afasta da cor do TEXTO, nunca se
   * aproxima. Texto branco → escurece (+); texto escuro → clareia (−).
   * Assim o contraste sobe durante a interação em vez de cair.
   */
  const away = (text: string) => (text === ON_PRIMARY_WHITE ? 100 : -100);
  const lightAway = away(onPrimary.light);
  const darkAway = away(onPrimary.dark);

  return {
    semantic: {
      primary: BRAND_RAMPS[theme],
      colorScheme: {
        light: {
          primary: {
            color: step(emphasis.light),
            contrastColor: onPrimary.light,
            hoverColor: step(emphasis.light + lightAway),
            activeColor: step(emphasis.light + 2 * lightAway),
          },
          focusRing: {
            color: focusRing.light,
          },
          highlight: {
            background: '{primary.50}',
            focusBackground: '{primary.100}',
            color: '{primary.700}',
            focusColor: '{primary.800}',
          },
        },
        dark: {
          primary: {
            color: step(emphasis.dark),
            contrastColor: onPrimary.dark,
            hoverColor: step(emphasis.dark + darkAway),
            activeColor: step(emphasis.dark + 2 * darkAway),
          },
          focusRing: {
            color: focusRing.dark,
          },
          highlight: {
            background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
            focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
            color: 'rgba(255,255,255,.87)',
            focusColor: 'rgba(255,255,255,.87)',
          },
        },
      },
    },
  };
}

/**
 * Aplica uma marca em RUNTIME — mesmíssima chamada do `onPresetChange()`
 * do repo. Use no lugar/junto do configurador para trocar de vertical:
 *
 *   applyNephosTheme('educacao');   // veste tudo de laranja da Educação
 *   applyNephosTheme('financeiro'); // troca pra verde do Financeiro
 *
 * O surface (slate) é aplicado por `surfacePalette()`, como no repo.
 */
export function applyNephosTheme(theme: NephosTheme) {
  $t()
    .preset(BASE_PRESET)
    .preset(nephosPresetExt(theme))
    .surfacePalette(SURFACE_SLATE)
    .use({ useDefaultOptions: true });
}

/**
 * Preset ESTÁTICO de uma marca, para o `providePrimeNG` inicial:
 *
 *   providePrimeNG({ theme: { preset: nephosPreset('global'),
 *                             options: { darkModeSelector: '.app-dark' } } });
 *
 * (No fluxo do repo, a marca é aplicada em runtime pelo configurador via
 * `applyNephosTheme`, e o surface entra por `surfacePalette`. Este helper
 * é a conveniência para quem quer já subir o app numa marca.)
 */
export function nephosPreset(theme: NephosTheme) {
  return definePreset(BASE_PRESET, nephosPresetExt(theme));
}

/** Todos os presets estáticos por marca (conveniência). */
export const NEPHOS_PRESETS = NEPHOS_THEMES.reduce(
  (acc, theme) => {
    acc[theme] = nephosPreset(theme);
    return acc;
  },
  {} as Record<NephosTheme, ReturnType<typeof definePreset>>,
);

/** Marca padrão do sistema. */
export const NEPHOS_DEFAULT_THEME: NephosTheme = 'global';
