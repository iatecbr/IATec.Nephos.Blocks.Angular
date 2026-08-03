/*
 * Public API Surface of nephos-ui
 *
 * As peças `origin: nephos-own` do Design System Nephos — o que o PrimeNG
 * não tem. Cada componente responde a uma ficha em
 * `design-system/componentes/<id>.meta.ts`, que é o contrato de uso.
 *
 * Dois níveis, e a diferença importa:
 *   ÁTOMOS  — primitivos isolados (um título, um ícone, um rótulo).
 *   BLOCOS  — composições de PrimeNG + átomos. É aqui que mora "o nosso":
 *             o PrimeNG dá os componentes, o Nephos dá a forma de montar.
 *
 * O estilo entra por uma linha no `styles.scss` do app:
 *   @use '@iatec/nephos-ui/lib/nephos-ui.scss';
 */

export * from './lib/nephos-ui.tokens';
export * from './lib/nephos-brand';

/* ── Átomos ─────────────────────────────────────────────────────── */
export * from './lib/heading/heading.component';
export * from './lib/text/text.component';
export * from './lib/label/label.component';
export * from './lib/helper-text/helper-text.component';
export * from './lib/link/link.component';
export * from './lib/icon/icon.component';
export * from './lib/logo/logo.component';
export * from './lib/theme-toggle/theme-toggle.component';

/* ── Blocos ─────────────────────────────────────────────────────── */
export * from './lib/empty-state/empty-state.component';
export * from './lib/destructive-confirm/destructive-confirm.component';
export * from './lib/login-form/login-form.component';
export * from './lib/search-filters/search-filters.component';
export * from './lib/data-table/data-table.component';
export * from './lib/header/header.component';
export * from './lib/sidebar/sidebar.component';
