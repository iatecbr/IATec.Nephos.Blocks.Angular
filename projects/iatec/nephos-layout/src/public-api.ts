/*
 * Public API Surface of nephos-layout
 *
 * ℹ️ POR QUE O `package.json` DECLARA `@iatec/nephos-ui` SE NENHUM ARQUIVO
 * TypeScript DAQUI O IMPORTA (04/08/2026). O acoplamento é por CSS, não por
 * código: os layouts gastam a camada de token do `nephos-ui` — `--nph-space-*`,
 * a escala tipográfica, a família — em 51 lugares dos `.scss`. Sem o pacote
 * instalado, o projeto compila e a tela renderiza **sem espaçamento nenhum**,
 * que é a pior falha de achar: silenciosa.
 *
 * Os literais de fallback no SCSS (`var(--nph-space-sm, 0.5rem)`) são rede de
 * segurança, não substituto — mesmo padrão que o `_main.scss` já usa para a
 * família tipográfica: token manda, literal só segura a queda.
 *
 * Uma varredura de dependências que só olha `import` vai apontar isto como
 * sobra. Não é.
 */
export * from './lib/services/';
export * from './lib/layouts/';
export * from './lib/components/';
export * from './lib/models/';
export * from './lib/components/breadcrumb/';
