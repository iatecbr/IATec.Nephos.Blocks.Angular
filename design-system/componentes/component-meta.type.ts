/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · O CONTRATO de metadados de componente (como código)
 * ─────────────────────────────────────────────────────────────
 * Esta é a versão em TypeScript do `Schema de metadados de
 * componente.md`. Todo `*.meta.ts` importa `NephosComponentMeta` e é
 * tipado por ele — assim o type-check quebra se um metadado ficar
 * incompleto. É a garantia central do schema: **é impossível commitar
 * um metadado sem os 10 blocos** (não depende de disciplina humana).
 *
 * Os 10 blocos: identity · purpose · api · relationships · tokens ·
 * antiPatterns · examples · a11y · aiHints · references.
 *
 * Quando o repo abrir, este arquivo vai para junto dos componentes
 * (ex.: `packages/ui-next/src/lib/_meta/`), e cada `*.meta.ts` fica ao
 * lado do seu componente.
 * ─────────────────────────────────────────────────────────────
 */

/* ── 1. identity ─────────────────────────────────────────────── */
export type ComponentCategory =
  | 'atom' | 'molecule' | 'organism' | 'block' | 'layout';
export type ComponentStatus =
  | 'draft' | 'beta' | 'stable' | 'deprecated';
/**
 * A decisão-fronteira do projeto (ver `Inventário de componentes.md`):
 * - `primeng`          → usa-se direto. O metadado só orienta a escolha
 *                        e aponta para a doc oficial. NÃO se reescreve.
 * - `primeng-extended` → envolvemos com regra/token/comportamento nosso.
 *                        Documentar SÓ o delta (`references.deltaFromPrimeng`).
 * - `nephos-own`       → não existe no PrimeNG. Doc completa obrigatória.
 */
export type ComponentOrigin = 'primeng' | 'primeng-extended' | 'nephos-own';

export interface ComponentIdentity {
  id: string;                 // kebab-case, único. Ex.: 'button'
  name: string;               // nome legível. Ex.: 'Button'
  category: ComponentCategory;
  status: ComponentStatus;
  version: string;            // semver por componente (detecta drift)
  origin: ComponentOrigin;
  replaces: string | null;    // id do componente legado, se houver
}

/* ── 2. purpose ──────────────────────────────────────────────── */
export interface ComponentPurpose {
  oneLiner: string;
  whenToUse: string[];
  whenNotToUse: string[];
}

/* ── 3. api ──────────────────────────────────────────────────── */
export interface ComponentInput {
  name: string;
  type: string;               // o tipo como string. Ex.: "'small' | 'large'"
  default: string;
  description: string;        // OBRIGATÓRIO — sem isto a IA escolhe pelo nome
}
export interface ComponentOutput {
  name: string;
  payload: string;
  description: string;
}
export interface ComponentSlot {
  name: string;
  accepts: string;
  optional?: boolean;
}
export interface InvalidCombination {
  combo: string;
  porque: string;             // impede a IA de inventar combinações sem sentido
}
export interface ComponentApi {
  inputs: ComponentInput[];
  outputs: ComponentOutput[];
  slots: ComponentSlot[];
  states: string[];
  invalidCombinations: InvalidCombination[];
}

/* ── 4. relationships ────────────────────────────────────────── */
export interface ComponentRelationships {
  parents: string[];
  children: string[];
  commonlyUsedWith: string[];
  partOfPatterns: string[];
}

/* ── 5. tokens ───────────────────────────────────────────────── */
/**
 * REGRAS DURAS (validação `token-audit`):
 * - Cor sempre por PAPEL + PASSO ('primary/500', 'surface/50',
 *   'feedback.danger/500'). NUNCA hex, NUNCA px, NUNCA nome de marca.
 * - Papéis válidos: primary (varia por tema) · surface (=slate) ·
 *   neutral (gray do PrimeNG) · feedback.{info,success,warn,danger,help}.
 * - `byState` aponta para o vocabulário semantic (ver design.md):
 *   hover→primary.hoverColor, etc. Campo ausente > valor bruto provisório.
 * - Para `origin: 'primeng'`, os tokens VÊM do PrimeNG — aqui documenta-se
 *   só o mapeamento de PAPEL, para o Moses raciocinar, não para sobrescrever.
 */
export interface ComponentTokens {
  color?: Record<string, string>;
  typography?: string;
  byState?: Record<string, Record<string, string>>;
  note?: string;
}

/* ── 6. antiPatterns (mínimo 3) ──────────────────────────────── */
export interface AntiPattern {
  regra: string;
  porque: string;
  emVezDisso: string;         // transforma a proibição em decisão executável
}

/* ── 7. examples ─────────────────────────────────────────────── */
export interface ComponentExamples {
  angular: string;            // como o dev escreve (componente PrimeNG real)
  html: string;               // o que o Moses 5.0 emite: HTML semântico puro
  inContext: string;          // composição real (ensina hierarquia)
}

/* ── 8. a11y ─────────────────────────────────────────────────── */
export interface ComponentA11y {
  role: string;
  keyboard: string[];
  requiredAria: string[];
  contrastMin: string;
}

/* ── 9. aiHints ──────────────────────────────────────────────── */
export interface Disambiguation {
  confundeCom: string;
  criterio: string;
}
export interface ComponentAiHints {
  keywords: string[];         // PT + EN (requisito chega em PT, código em EN)
  selectionCriteria: string;
  disambiguation: Disambiguation[];
}

/* ── 10. references ──────────────────────────────────────────── */
export interface ComponentReferences {
  figmaNode?: string;
  storybookId?: string;
  primengDocs?: string;
  deltaFromPrimeng?: string;  // só quando origin === 'primeng-extended'
}

/* ── O contrato completo ─────────────────────────────────────── */
export interface NephosComponentMeta {
  identity: ComponentIdentity;
  purpose: ComponentPurpose;
  api: ComponentApi;
  relationships: ComponentRelationships;
  tokens: ComponentTokens;
  antiPatterns: AntiPattern[];
  examples: ComponentExamples;
  a11y: ComponentA11y;
  aiHints: ComponentAiHints;
  references: ComponentReferences;
}
