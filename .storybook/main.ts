import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../projects/stage/src/stories/**/*.stories.ts'],

  // Os dois addons estavam INSTALADOS e DESLIGADOS: `addons: []` deixava o
  // `package.json` pagando por eles sem que aparecessem na tela.
  //
  // `addon-docs` é o que dá retorno imediato: cada `*.stories.ts` carrega
  // JSDoc em português acima do `const meta` e de cada story — regras de
  // a11y, anti-padrões, referência cruzada para a ficha `.meta.ts`. Esse
  // texto existia só no código-fonte. Ligado o addon, ele vira a aba Docs.
  // (Quem extrai o JSDoc é o `@storybook/csf-plugin`, dependência do próprio
  // addon-docs — não é o compodoc, que nem está instalado. O compodoc daria
  // OUTRA coisa: a tabela de @Input/@Output. Segue sendo decisão em aberto.)
  //
  // `addon-a11y` põe o axe dentro da bancada. O projeto já mede a11y por
  // script externo; o painel serve para ver o achado no lugar onde ele
  // acontece, enquanto se mexe na peça.
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],

  staticDirs: [
    // O Noto Sans do CHROME (sidebar/barra/painéis). O manager é outro
    // documento: não recebe a opção `styles` do builder, então a fonte que as
    // stories usam não chega até lá sozinha. Aqui os mesmos `.woff2` do
    // `@iatec/nephos-layout` — os da produção, não uma cópia — passam a ser
    // servidos em `/fonts`, onde o `manager-head.html` os declara.
    { from: '../projects/iatec/nephos-layout/lib/layout/fonts', to: '/fonts' },

    // ⚠️ OS ASSETS DO `stage`, DECLARADOS AQUI DE PROPÓSITO.
    //
    // No `ng run stage:storybook` eles chegam sozinhos, pelo `browserTarget`
    // do `angular.json`. No `build-storybook`, NÃO: medido, o
    // `storybook-static/` saiu **sem pasta `assets/` nenhuma**. Isto é pior
    // do que o logo da sidebar quebrado — leva junto os avatares do mock e o
    // `assets/layout/styles/`, ou seja, o build de produção não é a mesma
    // coisa que a bancada de desenvolvimento.
    //
    // Era um problema silencioso: como ninguém publica o estático hoje (o
    // `azure-pipelines.yml` aponta para `dist/storybook/stage`, que o
    // `angular.json` nem gera), ele só apareceria no dia da publicação.
    { from: '../projects/stage/src/assets', to: '/assets' },
  ],

  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;
