/*
 * Public API Surface of nephos-ui
 *
 * Os PRIMITIVOS do Design System Nephos — as peças `origin: nephos-own`
 * que o PrimeNG não tem, mais a camada de token da família inteira.
 * Cada componente responde a uma ficha em
 * `design-system/componentes/<id>.meta.ts`, que é o contrato de uso.
 *
 * As COMPOSIÇÕES moram noutro pacote: `@iatec/nephos-blocks` (blocos),
 * `@iatec/nephos-pages` (páginas) e `@iatec/nephos-layout` (layouts).
 * Este aqui é a base sobre a qual os três se apoiam.
 *
 * O estilo entra por uma linha no `styles.scss` do app — e ela vem
 * PRIMEIRO, porque declara os tokens `--nph-*` que os outros consomem:
 *   @use '@iatec/nephos-ui/lib/nephos-ui.scss';
 */

export * from './lib/nephos-ui.tokens';
export * from './lib/nephos-brand';

export * from './lib/heading/heading.component';
export * from './lib/text/text.component';
export * from './lib/label/label.component';
export * from './lib/helper-text/helper-text.component';
export * from './lib/link/link.component';
export * from './lib/icon/icon.component';
export * from './lib/logo/logo.component';
export * from './lib/theme-toggle/theme-toggle.component';
