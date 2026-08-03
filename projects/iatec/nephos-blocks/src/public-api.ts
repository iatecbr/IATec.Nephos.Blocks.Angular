/*
 * Public API Surface of nephos-blocks
 *
 * Os BLOCOS do Design System Nephos — as composições prontas que a
 * organização repete. Cada um responde a uma ficha em
 * `design-system/componentes/<id>.block.meta.ts`, que é o contrato de uso.
 *
 * Um bloco NÃO é um componente novo: é a forma de montar. O PrimeNG dá os
 * componentes, o `@iatec/nephos-ui` dá os primitivos e a camada de token,
 * e o bloco é o arranjo — com as regras de usabilidade e acessibilidade
 * que a ficha exige já embutidas.
 *
 * O estilo entra por uma linha no `styles.scss` do app, DEPOIS da do
 * `nephos-ui` (este arquivo consome os tokens `--nph-*` que ela declara):
 *   @use '@iatec/nephos-ui/lib/nephos-ui.scss';
 *   @use '@iatec/nephos-blocks/lib/nephos-blocks.scss';
 */

export * from './lib/empty-state/empty-state.component';
export * from './lib/destructive-confirm/destructive-confirm.component';
export * from './lib/login-form/login-form.component';
export * from './lib/search-filters/search-filters.component';
export * from './lib/data-table/data-table.component';
export * from './lib/header/header.component';
export * from './lib/sidebar/sidebar.component';
