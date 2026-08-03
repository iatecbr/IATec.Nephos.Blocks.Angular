/*
 * Public API Surface of nephos-ui
 *
 * Os primitivos `origin: nephos-own` do Design System Nephos — as peças
 * que o PrimeNG não tem. Cada componente responde a uma ficha em
 * `design-system/componentes/<id>.meta.ts`, que é o contrato de uso.
 *
 * O estilo entra por uma linha no `styles.scss` do app:
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
