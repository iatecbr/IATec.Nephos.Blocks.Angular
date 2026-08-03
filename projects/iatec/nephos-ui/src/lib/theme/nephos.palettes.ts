/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · Paletas de MARCA (a única camada de cor que é NOSSA)
 * ─────────────────────────────────────────────────────────────
 * Fonte da verdade: `tokens.core.json` (Figma v4.0.0). Este arquivo
 * é a transcrição das 7 rampas de marca para o formato que o repo
 * Angular consome. NÃO editar valores à mão: muda-se no
 * `tokens.core.json` e reflete-se aqui.
 *
 * O QUE É NOSSO (fica aqui): as 7 marcas (`primary`) + tipografia
 * (no design.md). É a identidade das verticais — nenhuma biblioteca
 * traz isso pronto.
 *
 * O QUE HERDAMOS DO PRIMENG 4 (NÃO fica aqui — decisão da Indiane
 * 24/07/2026): surface (=slate), neutros (gray) e feedback
 * (info/success/warn/danger/help). Comparação feita contra o UI kit
 * PrimeOne 4.0.0: o PrimeNG 4 usa as paletas Tailwind padrão, com
 * passo 950 completo. O nosso `slate` (surface) já era IDÊNTICO ao do
 * PrimeNG; as demais cores do DS antigo eram customizadas (o "500"
 * delas = o "600" do PrimeNG) — decidimos adotar o padrão do PrimeNG
 * para ficar 100% integrado e ganhar o 950 de graça. Por isso surface,
 * gray e feedback saíram deste arquivo e vêm do preset base.
 *
 * Regra de ouro: valor de token só muda com confirmação explícita da
 * Indiane — nunca por dedução. (Ver design.md.)
 * ─────────────────────────────────────────────────────────────
 */

/** Os 7 temas da organização. Só a paleta `primary` muda entre eles. */
export type NephosTheme =
  | 'global'
  | 'educacao'
  | 'financeiro'
  | 'comercial'
  | 'igrejas'
  | 'recursos-humanos'
  | 'gerencial';

export const NEPHOS_THEMES: NephosTheme[] = [
  'global',
  'educacao',
  'financeiro',
  'comercial',
  'igrejas',
  'recursos-humanos',
  'gerencial',
];

/** Uma rampa de cor no formato que o `@primeuix/themes` espera (50–950). */
export type ColorRamp = {
  50: string; 100: string; 200: string; 300: string; 400: string;
  500: string; 600: string; 700: string; 800: string; 900: string; 950: string;
};

/**
 * Passo 950 (resolvido 24/07/2026):
 * O PrimeNG espera a rampa `primary` até 950; as nossas marcas (Figma)
 * vão até 900 e são cores da organização que NÃO existem no PrimeNG —
 * logo não há de onde "pegar" um 950 real. Em vez de inventar um tom,
 * o preset roteia o texto do modo escuro para o `surface.950` (real).
 * O `950` abaixo é só um PREENCHIMENTO ESTRUTURAL (= cópia do 900) para
 * o objeto ter o formato que o PrimeNG lê — esse tom nunca aparece na
 * tela. Quando as rampas de marca forem formalmente estendidas até 950,
 * troca-se aqui.
 */

/* ── As 7 marcas · rampa `primary` (varia por tema) ───────────── */

export const BRAND_RAMPS: Record<NephosTheme, ColorRamp> = {
  global: {
    50: '#EAF2FF', 100: '#D8E6FD', 200: '#B1CDFB', 300: '#89B4FA', 400: '#629BF8',
    500: '#3B82F6', 600: '#2F68C5', 700: '#234E94', 800: '#183462', 900: '#0C1A31',
    950: '#0C1A31', // preenchimento estrutural = 900 (ver nota acima)
  },
  educacao: {
    50: '#FFFCF0', 100: '#FCEED5', 200: '#F9DDAB', 300: '#F7C881', 400: '#F4BA57',
    500: '#F1A92D', 600: '#C18724', 700: '#91651B', 800: '#604412', 900: '#302209',
    950: '#302209',
  },
  financeiro: {
    50: '#EEF6EF', 100: '#DAE3DB', 200: '#B4C8B6', 300: '#8FAC92', 400: '#69916D',
    500: '#447549', 600: '#365E3A', 700: '#29462C', 800: '#1B2F1D', 900: '#0E170F',
    950: '#0E170F',
  },
  comercial: {
    50: '#F0F6F7', 100: '#D8E6E9', 200: '#B2CDD3', 300: '#8BB5BD', 400: '#659CA7',
    500: '#3E8391', 600: '#326974', 700: '#254F57', 800: '#19343A', 900: '#0C1A1D',
    950: '#0C1A1D',
  },
  igrejas: {
    50: '#FBF8FA', 100: '#E5D4DB', 200: '#CCA8B7', 300: '#B27D92', 400: '#99516E',
    500: '#7F264A', 600: '#661E3B', 700: '#4C172C', 800: '#330F1E', 900: '#19080F',
    950: '#19080F',
  },
  'recursos-humanos': {
    50: '#ECE5F2', 100: '#DBD2E5', 200: '#B7A6CC', 300: '#9379B2', 400: '#6F4D99',
    500: '#4B207F', 600: '#3C1A66', 700: '#2D134C', 800: '#1E0D33', 900: '#0F0619',
    950: '#0F0619',
  },
  gerencial: {
    50: '#F0F6F7', 100: '#CCD6E0', 200: '#99ADC2', 300: '#6685A3', 400: '#335C85',
    500: '#003366', 600: '#002952', 700: '#001F3D', 800: '#001429', 900: '#000A14',
    950: '#000A14',
  },
};

/* ── Surface = slate ──────────────────────────────────────────── */
/**
 * O surface (fundo/borda/texto) é o `slate`. Conferido no repo real
 * (`layout.configurator.ts` › `surfaces[0]`) e no PrimeOne 4.0.0: os
 * valores são IDÊNTICOS. O repo aplica o surface por um método próprio
 * — `$t()...surfacePalette(<paleta>)` — com hex explícito; por isso o
 * slate mora aqui como paleta pronta (com o passo `0` que o método pede).
 */
export const SURFACE_SLATE = {
  0: '#ffffff',
  50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8',
  500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617',
};

/* ── Base ─────────────────────────────────────────────────────── */
/** As duas únicas cores de texto admitidas sobre a cor de ênfase. */
export const BASE = {
  white: '#FFFFFF',
  dark: '#020617', // = surface/950 (slate/950), o quase-preto do sistema
};

/* ── Contraste da ênfase, MARCA A MARCA ───────────────────────── */
/**
 * POR QUE ISTO EXISTE (31/07/2026).
 *
 * Até aqui o texto sobre a ênfase era FIXO por modo: branco no claro,
 * quase-preto no escuro. Medindo par a par contra as 7 rampas, esse par
 * fixo REPROVA o AA (4,5:1 para texto) em 6 das 7 marcas em pelo menos um
 * modo — só o financeiro passava nos dois. As falhas são complementares:
 * marca de rampa CLARA reprova no modo CLARO (o branco some), marca de
 * rampa ESCURA reprova no modo ESCURO (o quase-preto some). Nenhuma cor
 * fixa serve às 7 — as rampas têm luminosidades muito diferentes entre si.
 *
 * A correção é declarar o texto POR MARCA. Nenhuma cor de marca mudou:
 * a ênfase continua `primary/500` no claro e `primary/400` no escuro.
 *
 * REGRA DE AUTORIA: os números abaixo foram MEDIDOS, não deduzidos. Ao
 * mexer numa rampa, medir de novo os dois pares e atualizar o comentário.
 * (É a norma do design.md: "contraste por PAR de token verificado".)
 */
export type OnPrimary = {
  /** Texto sobre a ênfase do modo claro (`primary/500`). */
  light: string;
  /** Texto sobre a ênfase do modo escuro (`primary/400`). */
  dark: string;
};

/** Texto branco sobre a ênfase. */
export const ON_PRIMARY_WHITE = BASE.white;
/** Texto quase-preto sobre a ênfase (= `BASE.dark`, por referência de token). */
export const ON_PRIMARY_DARK = '{surface.950}';

const WHITE = ON_PRIMARY_WHITE;
const DARK = ON_PRIMARY_DARK;

export const BRAND_ON_PRIMARY: Record<NephosTheme, OnPrimary> = {
  //                     claro          escuro          razões medidas (claro · escuro)
  global: { light: DARK, dark: DARK }, //  5,48 ·  7,27   (branco daria 3,68 e 2,78)
  educacao: { light: DARK, dark: DARK }, // 10,04 · 11,53   (branco daria 2,01 e 1,75)
  financeiro: { light: WHITE, dark: DARK }, //  5,40 ·  5,64   (única que troca de cor entre os modos)
  comercial: { light: WHITE, dark: DARK }, //  6,16 ·  6,60   (branco sobre a ênfase 600 — ver BRAND_EMPHASIS)
  igrejas: { light: WHITE, dark: WHITE }, //  9,22 ·  5,59   (escuro daria 3,61)
  'recursos-humanos': { light: WHITE, dark: WHITE }, // 11,59 ·  6,57   (escuro daria 2,72)
  gerencial: { light: WHITE, dark: WHITE }, // 12,61 ·  6,98   (escuro daria 2,56)
};

/* ── Passo da ênfase, MARCA A MARCA ───────────────────────────── */
/**
 * O passo padrão da ênfase é `primary/500` no claro e `primary/400` no
 * escuro. Quando NENHUM texto passa o AA com folga confortável sobre o
 * passo padrão, o segundo recurso é subir/descer UM passo da PRÓPRIA rampa
 * — o que muda o TOM do botão, nunca a cor da marca.
 *
 * Hoje só o `comercial` usa isso: no claro, o teal 500 (#3E8391) ficava em
 * 4,32 com branco e 4,67 com o quase-preto — passava raspando dos dois
 * lados. Decisão da Indiane (31/07/2026): subir a ênfase do claro para
 * `primary/600` (#326974) e manter o texto BRANCO, que é o tratamento mais
 * convencional para botão de ênfase → 6,16:1.
 *
 * ⚠️ O HOVER E O ACTIVE NÃO SEGUEM O MODO — SEGUEM O TEXTO.
 * O estado move o fundo **para longe da cor do texto**, para o contraste
 * subir e não cair enquanto a pessoa interage:
 *   • texto BRANCO  → hover/active ESCURECEM (passo +100 / +200)
 *   • texto ESCURO  → hover/active CLAREIAM  (passo −100 / −200)
 * Amarrar a direção ao modo (o padrão do Aura) só funciona quando o texto
 * é sempre o mesmo. Com texto por marca, isso reprovava o AA no hover em
 * 5 dos 14 pares — ex.: `global` no claro caía de 5,48 para 3,75 no hover,
 * porque o fundo escurecia na direção do texto escuro.
 */
export type EmphasisStep = {
  /** Passo da rampa usado como ênfase no modo claro. */
  light: number;
  /** Passo da rampa usado como ênfase no modo escuro. */
  dark: number;
};

export const BRAND_EMPHASIS: Record<NephosTheme, EmphasisStep> = {
  global: { light: 500, dark: 400 },
  educacao: { light: 500, dark: 400 },
  financeiro: { light: 500, dark: 400 },
  comercial: { light: 600, dark: 400 }, // ← único fora do padrão (ver nota acima)
  igrejas: { light: 500, dark: 400 },
  'recursos-humanos': { light: 500, dark: 400 },
  gerencial: { light: 500, dark: 400 },
};

/* ── Anel de foco, MARCA A MARCA ──────────────────────────────── */
/**
 * O anel de foco do Aura usa `focusRing.color = {primary.color}` — ou seja,
 * herda a ênfase do modo. Medido contra o fundo da página (claro =
 * `surface/0`, escuro = `surface/900`), isso deixa o anel abaixo do mínimo
 * de 3:1 para elemento não-textual em 3 marcas:
 *   • educacao no CLARO   (2,01) — o âmbar some no branco
 *   • recursos-humanos no ESCURO (2,72) e gerencial no ESCURO (2,56)
 * Anel de foco invisível é barreira para quem navega só de teclado, então
 * essas três passam a apontar um passo vizinho da PRÓPRIA rampa.
 *
 * Verificado no `@primeuix/themes` 2.0.2: `focusRing` dentro de
 * `colorScheme.light/dark` é honrado — gera `--p-focus-ring-color` separado
 * no `:root` e no `.app-dark`.
 */
export const BRAND_FOCUS_RING: Record<NephosTheme, OnPrimary> = {
  //                     claro (vs surface/0)      escuro (vs surface/900)
  global: { light: '{primary.500}', dark: '{primary.400}' }, //  3,68 ·  6,43
  educacao: { light: '{primary.600}', dark: '{primary.400}' }, //  3,11 · 10,21  ← 500 dava 2,01
  financeiro: { light: '{primary.500}', dark: '{primary.400}' }, //  5,40 ·  4,99
  comercial: { light: '{primary.600}', dark: '{primary.400}' }, //  6,16 ·  5,84  ← acompanha a ênfase
  igrejas: { light: '{primary.500}', dark: '{primary.400}' }, //  9,22 ·  3,19
  'recursos-humanos': { light: '{primary.500}', dark: '{primary.300}' }, // 11,59 ·  4,78  ← 400 dava 2,72
  gerencial: { light: '{primary.500}', dark: '{primary.300}' }, // 12,61 ·  4,63  ← 400 dava 2,56
};

/*
 * NOTA — gray e feedback NÃO estão aqui de propósito:
 *   • gray     → primitivo `gray` do PrimeNG (Tailwind), se um dia
 *                precisarmos de um segundo neutro. Hoje o neutro é o slate.
 *   • feedback → primitivos `sky/green/orange/red/purple` do PrimeNG,
 *                consumidos pelas severidades de componente. Sem override.
 * Isso é a decisão "100% integrado ao PrimeNG" da Indiane (24/07/2026).
 */
