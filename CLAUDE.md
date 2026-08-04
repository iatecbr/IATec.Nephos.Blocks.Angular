# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# ⛔ ANTES DE GERAR QUALQUER INTERFACE, LEIA O DESIGN SYSTEM

Este repositório carrega o **Nephos**, o Design System da IATec, construído para ser
consumido por IA. A documentação **é a fonte da verdade** — não há Figma no meio.

**Antes de gerar, compor ou alterar qualquer tela, página, componente, bloco ou trecho
de HTML, você é obrigado a consultar o Design System primeiro:**

1. **[`design-system/AGENTS.md`](./design-system/AGENTS.md)** — a regra de comportamento
   (o [`design-system/CLAUDE.md`](./design-system/CLAUDE.md) aponta para ele; a fonte é uma só);
2. **[`design-system/design.md`](./design-system/design.md)** — a especificação normativa:
   cor por papel+passo, escala tipográfica nomeada, ícones, multimarca;
3. **a ficha da peça** em `design-system/componentes/<id>.meta.ts` — o contrato de uso,
   com `antiPatterns`, `invalidCombinations` e `a11y`.

Com o MCP `nephos-ds` conectado, o mesmo caminho é
`nephos_foundations()` → `nephos_search()` → `nephos_get()`.

**Na dúvida: herdar ou perguntar — nunca inventar valor.** Valor de token não muda por
dedução.

---

## Comandos

```bash
npm install                      # ver o pré-requisito do Font Awesome abaixo
npm run storybook                # banco de provas em localhost:6006
npm run build                    # app `stage`
npx ng build @iatec/nephos-ui    # uma lib específica
```

### ⚠️ A ordem de build das libs importa

```bash
npx ng build @iatec/nephos-ui        # SEMPRE primeiro
npx ng build @iatec/nephos-blocks
npx ng build @iatec/nephos-pages
```

O `ng-packagr` **não compila o código-fonte de outra biblioteca** — ele resolve pelo
pacote já construído. Fora de ordem, a build quebra com
`Cannot destructure property 'pos' of 'file.referencedFiles[index]'`, que não diz nada
sobre a causa real.

### ⚠️ `npm install` exige credencial do Font Awesome

O `@fortawesome/fontawesome-pro` é **licenciado e não existe no npm público**. Numa
máquina nova, apontar o escopo **antes** do `npm install`, senão ele falha com 404:

```bash
npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" <TOKEN>
```

O token mora no `~/.npmrc`, fora do projeto. No CI ele entra pelo `.npmrc.pipeline`,
como a variável `FONTAWESOME_TOKEN`.

### Verificação do Design System

```bash
cd design-system && npm install && npm run build:index   # deve dizer 110 fichas
cd design-system/mcp && npm install && node test.mjs     # deve dizer 10/10
```

O `nephos-index.json` é **gerado** das fichas e **versionado**. Editou uma ficha, rode
`build:index` e commite o resultado — o pipeline confere e falha se estiver defasado.

---

## Arquitetura

Monorepo Angular 21 + PrimeNG 21 (preset **Aura**). Um app de demonstração e cinco
bibliotecas publicadas no feed privado `IATec.Community`.

| Pacote | O que guarda |
|---|---|
| `@iatec/nephos-ui` | os 8 **primitivos** + a camada de token (`--nph-*`) + **o tema das 7 marcas** |
| `@iatec/nephos-blocks` | os 7 **blocos** — composições prontas |
| `@iatec/nephos-pages` | as **páginas**: `listing`, `detail-form`, `dashboard` |
| `@iatec/nephos-layout` | os **layouts**: `auth`, `app-shell` — e as fontes |
| `@iatec/nephos-utils` | serviços e diretivas, sem componente visual |
| `projects/stage` | o app de demonstração e o **banco de provas** (Storybook) |
| `design-system/` | a documentação que a IA lê: `design.md`, 110 fichas, `AGENTS.md`, MCP, skills |

**`nephos-ui` é a base.** Os outros três pacotes visuais o declaram como
`peerDependency` — inclusive o `nephos-layout`, que não o importa em TypeScript: o
acoplamento é por CSS (a camada de token `--nph-*`). Sem ele instalado, a tela renderiza
sem espaçamento nenhum, sem erro.

**Template é MOLDURA, não tela pronta.** Um template dá estrutura, região com nome, um
`<h1>` só e a grade; as peças entram por **slot**, já ligadas por quem as tem. Ele não
reemite evento de conteúdo projetado.

**A marca nunca é escolha do usuário** — vem do ambiente (domínio, tenant, sessão).
Nenhum componente sabe a vertical; quem resolve a cor é o tema. Escrever nome de marca
num template é violação.

### Composição sobre reescrita

Nenhum componente do PrimeNG é reescrito. Quando um requisito da ficha não cabe na API
dele, o caminho é, nesta ordem: **(1)** o `pt` (pass-through oficial); **(2)** uma classe
nossa na camada de token; **(3)** registrar a divergência e não fazer nada. Nunca mexer
no miolo do componente.

### Duas decisões de fundação que surpreendem

- **`html { font-size: 14px }`** (em `nephos-layout/lib/layout/_main.scss`) é
  intencional. Por isso a escala tipográfica do Nephos é entregue **em px**: `rem` não
  reproduz os valores declarados nesse root. Efeito colateral aceito: a geometria do
  PrimeNG roda a 87,5% do nominal.
- **Ícones são Font Awesome 7 Pro**, nunca PrimeIcons. Os ícones *internos* do PrimeNG 21
  não são PrimeIcons — são SVG embutido (`<svg data-p-icon>`), não há o que sobrescrever.

---

## Como se prova uma mudança aqui

O meio de validação é o **Storybook dentro do repo** (`npm run storybook`), não HTML
solto — HTML à mão não prova como o Angular/PrimeNG renderiza. O padrão em uso:

- toda story carregada num iframe, capturando `console.error` + `onerror` +
  `unhandledrejection` — o alvo é **zero erro** nas 67;
- **7 marcas × 2 modos** medidos com `getComputedStyle` contra o `nephos.palettes.ts`;
- a11y medida no **DOM real**, não deduzida: um `<h1>` por tela, `label[for]` em todo
  campo, `aria-describedby` que resolve, landmarks com rótulos distintos.

⚠️ **Duas coisas que a bancada não consegue medir**, e não são defeito: o `:focus` do
skip link (a página do automatismo nunca recebe foco do sistema) e qualquer `transform`
animado (a aba não compõe quadros). Conferir à mão ou desligar a transição antes de medir.

### A regra que o projeto aprendeu errando

Se uma configuração existe **só** no `storybook-styles.scss`, a pergunta não é *"está
funcionando?"* — é **"a produção faz assim também?"**. Duas vezes a prova mentiu por
isso: a fonte (Storybook carregava Noto Sans num arquivo só dele enquanto o produto
entregava Poppins) e os ícones (Storybook usava o pacote npm enquanto o app usava um kit
de CDN). Hoje aquele arquivo está vazio de propósito.

---

## Convenções

- Seletores: `nph-ui-*` (primitivos), `nph-blocks-*`, `nph-pages-*`, `nph-layout-*`.
- Commits em português, no padrão convencional (`feat(escopo):`, `fix(escopo):`).
- `main`, `Versions/3.0.0` e `Versions/3.0.0_backup` **não se tocam**. O trabalho do
  Design System vive em `feature/nephos-design-system`.
- Auditoria de fidelidade: a skill `design-system/skill/nephos-token-audit` varre as 8
  violações (hex cru, px "no olho", nome de marca, PrimeIcons, `<div>` clicável, campo
  sem label…).

O [`README.md`](./README.md) cobre o uso das bibliotecas **em outro projeto** (pacotes,
ordem do `styles.scss`, os dois providers). Este arquivo cobre o trabalho **dentro** deste
repositório. Foi reescrito em 04/08/2026 — antes disso ele descrevia três bibliotecas
(são cinco), mandava importar NgModules que não existem e linkava cinco documentos
apagados.
