/*
 * Public API Surface of nephos-pages
 *
 * As PÁGINAS: os esqueletos de tela que vivem dentro da área de
 * conteúdo do `app-shell` (`@iatec/nephos-layout`).
 *
 * `empty` e `header` são os shells de página que já existiam no
 * repositório. As três abaixo são os TEMPLATES do Design System Nephos —
 * cada uma responde a uma ficha em
 * `design-system/componentes/<id>.template.meta.ts`, que é o contrato de
 * uso.
 *
 * Um template não desenha conteúdo: ele arruma. Os blocos e os campos
 * entram pelos slots, e o que a moldura garante é a ESTRUTURA — região
 * nomeada, um `<h1>` só, ordem de leitura e a grade que as peças de
 * dentro não têm como decidir sozinhas.
 *
 * O estilo dos primitivos entra por uma linha no `styles.scss` do app,
 * e ela vem PRIMEIRO (é ela que declara os tokens `--nph-*` que estas
 * páginas consomem):
 *   @use '@iatec/nephos-ui/lib/nephos-ui.scss';
 */

export * from './lib/empty/empty-page.component';
export * from './lib/header/header-page.component';

export * from './lib/listing/listing-page.component';
export * from './lib/detail-form/detail-form-page.component';
export * from './lib/dashboard/dashboard-page.component';
