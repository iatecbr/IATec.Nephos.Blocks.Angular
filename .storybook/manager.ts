// Storybook 10: `@storybook/manager-api` e `@storybook/theming` deixaram de
// existir como pacotes próprios e passaram a ser subcaminhos do `storybook`.
import { addons } from 'storybook/manager-api';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';
import { create } from 'storybook/theming';

// ⚠️ IMPORT DIRETO DO ARQUIVO, não do pacote `@iatec/nephos-ui`.
//
// O bundle do manager é montado à parte, fora do build do Angular — importar
// o barril do pacote arrastaria a lib inteira (componentes, decorators,
// Angular) para dentro do chrome do Storybook. O `nephos.palettes.ts` é o
// caso feliz: não tem UM import, é só dado. Então dá para herdar o valor sem
// arrastar nada.
//
// E herdar é o ponto. Até 04/08/2026 este arquivo pintava o chrome de
// `#0066CC` — uma cor que não é nenhuma das 7 marcas do Nephos e não vem de
// lugar nenhum do `tokens.core.json`. Era herança do Design System antigo do
// repositório, que ninguém tinha revisitado (o comentário original admitia:
// "a marca definida abaixo é a que já estava no repositório").
import { BRAND_RAMPS, SURFACE_SLATE } from '../projects/iatec/nephos-ui/src/lib/theme/nephos.palettes';

/** A ênfase da marca `global` — a marca padrão da bancada. */
const ENFASE = BRAND_RAMPS.global[500];

/**
 * Branding comum aos dois modos.
 *
 * `brandImage`: o caminho era `/images/nephos.png` e dava 404 — os assets do
 * `stage` são servidos sob `/assets/` (é o `browserTarget: stage:build` do
 * `angular.json` que os copia). O logo da sidebar vinha quebrado.
 */
const MARCA = {
  brandTitle: 'Nephos Blocks',
  brandUrl: 'https://www.iatecdigital.com.br',
  brandImage: '/assets/images/nephos.png',
  brandTarget: '_self',

  colorPrimary: ENFASE,
  colorSecondary: ENFASE,

  // Noto Sans é a tipografia do Design System (decisão de 03/08/2026, que
  // fechou o conflito com o Poppins que o repo entregava). O chrome usava
  // "Open Sans", que é de outra marca.
  //
  // O documento do manager NÃO carrega o `styles.scss` — ele é outro
  // documento. Por isso a fonte precisa do `@font-face` do
  // `manager-head.html` mais o `staticDirs` do `main.ts`, que serve os
  // `.woff2` do `nephos-layout` em `/fonts`.
  fontBase: '"Noto Sans", system-ui, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, monospace',

  // 6px é o raio medido do preset (`--p-content-border-radius`), não 4.
  appBorderRadius: 6,
} as const;

const claro = create({
  ...MARCA,
  base: 'light',

  appBg: SURFACE_SLATE[50],
  appContentBg: SURFACE_SLATE[0],
  appPreviewBg: SURFACE_SLATE[0],
  appBorderColor: SURFACE_SLATE[200],

  textColor: SURFACE_SLATE[900],
  textInverseColor: SURFACE_SLATE[0],

  barTextColor: SURFACE_SLATE[500],
  barSelectedColor: ENFASE,
  barHoverColor: ENFASE,
  barBg: SURFACE_SLATE[0],

  inputBg: SURFACE_SLATE[0],
  inputBorder: SURFACE_SLATE[300],
  inputTextColor: SURFACE_SLATE[900],
  inputBorderRadius: 6,
});

/**
 * O mesmo tema no escuro, com a superfície vindo da MESMA rampa que as
 * stories usam (`SURFACE_SLATE`). Sem isso, ligar o modo escuro deixava a
 * story escura dentro de um chrome branco — a bancada contradizia a peça.
 */
const escuro = create({
  ...MARCA,
  base: 'dark',

  appBg: SURFACE_SLATE[950],
  appContentBg: SURFACE_SLATE[900],
  appPreviewBg: SURFACE_SLATE[900],
  appBorderColor: SURFACE_SLATE[700],

  textColor: SURFACE_SLATE[100],
  textInverseColor: SURFACE_SLATE[900],

  barTextColor: SURFACE_SLATE[400],
  barSelectedColor: ENFASE,
  barHoverColor: ENFASE,
  barBg: SURFACE_SLATE[900],

  inputBg: SURFACE_SLATE[800],
  inputBorder: SURFACE_SLATE[700],
  inputTextColor: SURFACE_SLATE[100],
  inputBorderRadius: 6,
});

addons.setConfig({
  theme: claro,
  panelPosition: 'bottom',
  showPanel: true,
});

/**
 * O CHROME ACOMPANHA O SELETOR `modo` DA BARRA.
 *
 * Sem isto o manager fica preso no claro: ligar o modo escuro escurecia só
 * o miolo, e a story preta ficava dentro de uma sidebar branca — a bancada
 * contradizendo a peça que ela existe para provar.
 *
 * ⚠️ DUAS ARMADILHAS, as duas medidas nesta bancada, não deduzidas:
 *
 * 1. `addons.getChannel()` no topo do arquivo NÃO serve. O `manager.ts` é
 *    avaliado antes de o canal existir, e o listener registrado ali nunca
 *    recebe nada — medido, zero eventos. `addons.register` roda depois da
 *    inicialização e entrega a API já ligada ao canal.
 *
 * 2. O bundle do manager NÃO é reconstruído a quente. Mexeu aqui, reinicie
 *    o Storybook — senão você testa a versão antiga e conclui que não
 *    funciona. (Vale para `main.ts` e `manager-head.html` também.)
 *
 * O que funciona: re-chamar `setConfig` com o outro tema re-tematiza o
 * chrome, ao vivo, nos dois sentidos.
 */
let modoAtual: string | undefined;

const aplicar = (modo: string | undefined) => {
  if (!modo || modo === modoAtual) return;
  modoAtual = modo;
  addons.setConfig({
    theme: modo === 'escuro' ? escuro : claro,
    panelPosition: 'bottom',
    showPanel: true,
  });
};

addons.register('nephos/tema-do-chrome', (api) => {
  // O primeiro `aplicar` cobre quem chega por URL já apontando para um modo
  // (`?globals=modo:escuro`), quando nenhum evento de troca aconteceu ainda.
  aplicar((api.getGlobals?.() as Record<string, string> | undefined)?.['modo']);

  api.on(GLOBALS_UPDATED, ({ globals }: { globals?: Record<string, unknown> }) => {
    aplicar(globals?.['modo'] as string | undefined);
  });
});
