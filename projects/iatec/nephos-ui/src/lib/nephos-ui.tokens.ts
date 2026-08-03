/**
 * ─────────────────────────────────────────────────────────────
 * Nephos UI · os tokens que a API dos primitivos aceita
 * ─────────────────────────────────────────────────────────────
 * A escala tipográfica é nomeada por FUNÇÃO, não por tamanho: o agente
 * (e o dev) lê "isto é um título de página", não "isto é 34px". Os
 * valores em px vivem em `design-system/tokens.roles.json` e viram CSS
 * em `lib/nephos-ui.scss` — aqui só o vocabulário.
 *
 * Fonte: `design-system/design.md` › Tipografia.
 * ─────────────────────────────────────────────────────────────
 */

/** Nível do título — hierarquia do documento (`<h1>`…`<h6>`). */
export type NephosHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Tamanhos de título. Independentes do nível: são só aparência. */
export type NephosTitleSize =
    | 'title-sm'
    | 'title-md'
    | 'title-lg'
    | 'title-xlg'
    | 'title-xxlg';

/** Tamanhos de corpo de texto. */
export type NephosTextSize =
    | 'overline'
    | 'caption'
    | 'body-sm'
    | 'body-lg'
    | 'body-xl';

/** Ênfase de cor do texto. `muted` = apoio, nunca conteúdo essencial. */
export type NephosTextVariant = 'default' | 'muted';

/** Ênfase inline COM significado — nunca por estética. */
export type NephosTextEmphasis = 'none' | 'strong' | 'em';

/** Famílias do Font Awesome. `solid` é o estilo padrão de UI do Nephos. */
export type NephosIconStyle =
    | 'solid'
    | 'regular'
    | 'light'
    | 'thin'
    | 'duotone';
