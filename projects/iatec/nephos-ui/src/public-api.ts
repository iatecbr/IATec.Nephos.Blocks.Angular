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

/* ── Tema ────────────────────────────────────────────────────────
 * As 7 marcas e o preset que as pluga no `@primeuix/themes`.
 *
 * Mora AQUI, e não numa pasta de documentação, por um motivo prático:
 * um projeto que consome o Nephos precisa do tema para os componentes
 * do PrimeNG terem cor. Enquanto estes arquivos ficaram fora de um
 * pacote, a única forma de montar o tema num projeto novo era copiá-los
 * à mão — o que inviabilizava o cenário de um agente que **não clona o
 * repositório** e só lê a documentação de como instalar.
 *
 * ℹ️ E é ESTE bloco que explica por que o `package.json` daqui declara
 * `primeng` sem que nenhum arquivo do pacote o importe (conferido em
 * 04/08/2026: zero imports). Não é sobra — uma varredura de dependências
 * vai continuar apontando, então fica escrito.
 *
 * Os 8 primitivos são de fato independentes do PrimeNG: são justamente
 * as peças que ele não tem. Mas o tema acima é um preset DELE, e um
 * preset do PrimeNG sem o PrimeNG instalado não faz nada — o
 * `providePrimeNG({ theme: nephosPreset(...) })` que a doc de instalação
 * manda escrever nem compila. Declarar é dizer a verdade sobre o que o
 * pacote precisa para cumprir o que promete.
 *
 * Quem for "limpar" isto: ou tira o tema daqui junto, ou deixa como está.
 * ─────────────────────────────────────────────────────────────── */
export * from './lib/theme/nephos.palettes';
export * from './lib/theme/nephos.preset';

export * from './lib/heading/heading.component';
export * from './lib/text/text.component';
export * from './lib/label/label.component';
export * from './lib/helper-text/helper-text.component';
export * from './lib/link/link.component';
export * from './lib/icon/icon.component';
export * from './lib/logo/logo.component';
export * from './lib/theme-toggle/theme-toggle.component';
