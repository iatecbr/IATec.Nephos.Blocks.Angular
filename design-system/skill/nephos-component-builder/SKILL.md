---
name: nephos-component-builder
description: >-
  Cria ou atualiza uma FICHA de componente do Design System Nephos (um arquivo
  `componentes/<id>.meta.ts`) sempre no mesmo schema, com fidelidade à API real
  do PrimeNG. Use SEMPRE que for adicionar um componente/bloco/template novo ao
  catálogo Nephos, documentar uma peça do PrimeNG ainda não fichada, ou revisar
  uma ficha existente. Garante os 10 blocos do contrato, tokens por papel (nunca
  hex), ícones Font Awesome 7, anti-padrões, a11y e disambiguation PT+EN — e
  fecha regenerando o índice do MCP. É a skill de AUTORIA do DS (não a de gerar UI).
---

# Nephos · construir a ficha de um componente

Esta é a skill de **autoria** do Design System. Ela garante que **toda peça nova entre no
catálogo com o mesmo rigor** — mesmo schema, mesma fidelidade, mesmas convenções. Não é para
gerar telas (isso é a `nephos-ui`); é para **documentar uma peça** para que o Moses a use depois.

> **Regra-mãe:** a ficha descreve a **API real** do componente — **nunca inventar** input,
> output, default ou token. Ler do código-fonte; na dúvida, deixar `note` e perguntar.

---

## O que é uma ficha

Um `componentes/<id>.meta.ts` tipado por **`NephosComponentMeta`**
(`componentes/component-meta.type.ts`). O `tsc --strict` **recusa** uma ficha incompleta — essa
é a garantia do schema. Os **10 blocos obrigatórios**:

`identity · purpose · api · relationships · tokens · antiPatterns (mín. 3) · examples · a11y · aiHints · references`

---

## Setup (uma vez por sessão)

Para ler a **API real** e validar nomes, instalar no scratchpad:

```bash
npm i --legacy-peer-deps --ignore-scripts primeng@21.0.2 @primeuix/themes@2.0.2 @fortawesome/fontawesome-free@7
```

- API de cada componente: `node_modules/primeng/types/primeng-<componente>.d.ts` — a linha
  `ɵɵComponentDeclaration` traz **selector + inputs + outputs exatos**.
- Modelo `MenuItem` e afins: `node_modules/primeng/types/primeng-api.d.ts`.
- Tokens reais do Aura: `@primeuix/themes` (para citar valor de geometria quando preciso).
- Nomes de ícone FA: metadata `icons.yml` do pacote FontAwesome (kebab-case, FA7).

---

## O fluxo (nesta ordem)

1. **Ler o contexto do sistema.** Abrir `nephos-foundations.json` (ou `nephos_foundations()`):
   cor por papel+passo, tipografia nomeada, ícones FA7, multimarca, checagem de fidelidade.
2. **Ler o contrato.** Abrir `componentes/component-meta.type.ts` — os 10 blocos e o que cada
   campo exige (ex.: todo `input` tem `description` obrigatória; `antiPatterns` mín. 3).
3. **Ler 1–2 fichas-exemplo** próximas do que vai fazer, para calibrar tom e profundidade:
   - átomo/campo → `inputtext.meta.ts`, `select.meta.ts`
   - organismo → `datatable.meta.ts`, `card.meta.ts`
   - composição nossa → `login-form.block.meta.ts`
4. **Ler a API real** do componente no `.d.ts` do PrimeNG. Transcrever inputs/outputs/defaults
   **fiéis**. Onde o `.d.ts` não expõe um default, marcar no `note` que foi inferido — nunca
   chutar como se fosse oficial.
5. **Decidir o `origin`:** `primeng` (usar direto, ficha orienta a escolha) · `primeng-extended`
   (documentar só o delta em `references.deltaFromPrimeng`) · `nephos-own` (composição/primitivo
   nosso — doc completa).
6. **Preencher os 10 blocos** aplicando as convenções (§ abaixo).
7. **Registrar** no `componentes/index.ts` (import + entrada no array certo).
8. **Validar e fechar** (§ Validação).

---

## Convenções obrigatórias (o que faz a ficha ser "Nephos")

- **Tokens só por papel + passo:** `primary/500`, `surface/50`, `feedback.danger/500`.
  **Nunca hex, nunca px "no olho", nunca nome de marca.** Para `origin: primeng`, os tokens
  vêm do componente — a ficha documenta só o **mapeamento de papel** para o Moses raciocinar.
- **Ícones = Font Awesome 7** (`fa-solid fa-<nome>`), nomes validados no metadata. Nos exemplos,
  **não hardcodar `pi pi-*`**; onde o modelo aceita ícone (ex.: `MenuItem.icon`), apontar para a
  ficha `icon`. Zero PrimeIcons.
- **`antiPatterns` (mín. 3)** no formato `{ regra, porque, emVezDisso }` — a proibição vira
  decisão executável. Ex.: "dois botões primários lado a lado".
- **`aiHints.keywords` em PT + EN** (o requisito chega em PT, o código em EN). Preencher
  `selectionCriteria` e `disambiguation` (confundeCom/criterio) contra as peças-irmãs.
- **`examples`:** `angular` (como o dev escreve, componente PrimeNG real) · `html` (o que o Moses
  emite, **HTML semântico puro**) · `inContext` (composição real, ensina hierarquia).
- **`a11y` sempre preenchido:** role, teclado, ARIA obrigatório, contraste. Estado nunca só por
  cor — sempre texto/ARIA junto.
- **Reúso:** apontar peças relacionadas em `relationships` e reusar fichas existentes em vez de
  reescrever regra (ex.: um bloco de busca reusa `search-input`, `multiselect`, `chip`).
- **Partes não viram ficha órfã** (decisão do projeto): item de menu/breadcrumb/tab, "modo" de
  um componente (ex.: `timeOnly` do datepicker), spacer/overlay → documentar **dentro do pai**.

---

## Validação (fechar sempre)

```bash
# 1. o contrato passa? (garante os 10 blocos)
npx tsc --noEmit --strict componentes/*.ts       # exit 0

# 2. regenerar o índice do MCP
npm run build:index                              # deve contar a ficha nova

# 3. o MCP acha a peça e serve a ficha?
node mcp/test.mjs                                # 8/8
```

Depois, **teste manual de descoberta:** rodar `nephos_search` com 2–3 frases naturais que um
usuário usaria para pedir essa peça e confirmar que ela aparece no topo. Se não aparecer, o
problema é **keyword faltando** (não o algoritmo) — reforçar `aiHints.keywords`/`selectionCriteria`.

> ⚠️ O score da busca conta **por campo**: repetir a mesma keyword no mesmo campo não soma.
> Para desempatar, reforce o termo em **outro** campo (ex.: uma linha de `whenToUse`).

---

## Definition of Done

- [ ] Tipada por `NephosComponentMeta`, `tsc --strict` exit 0.
- [ ] API fiel ao `.d.ts` (inputs/outputs/defaults reais; inferências marcadas no `note`).
- [ ] Tokens por papel+passo; zero hex, zero px "no olho", zero nome de marca.
- [ ] Ícones FA7; zero `pi pi-*`.
- [ ] `antiPatterns` ≥ 3; `a11y` completo; `disambiguation` contra as irmãs.
- [ ] Registrada no `index.ts`; `build:index` conta a peça; `nephos_search` a encontra; MCP 8/8.
