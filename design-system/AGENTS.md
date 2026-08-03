# AGENTS.md · Regras do agente para o Design System Nephos

> **Este arquivo é lido por qualquer agente de IA que trabalhe neste repositório**
> (Moses, Claude Code, Codex e afins). É a regra de comportamento do Nephos.
> `CLAUDE.md` aponta para cá — a fonte é uma só.

O **Nephos** é o Design System da IATec / Educação Adventista, construído para ser
consumido por IA. Base: **PrimeNG (Angular)**. Saída de UI: **HTML semântico puro**.
Identidade por **tema multimarca** (7 verticais). A documentação é a **fonte da verdade** —
não há Figma no meio.

---

## ⛔ A regra que não se quebra

> **Antes de gerar, compor ou alterar QUALQUER interface (tela, página, componente,
> bloco ou trecho de HTML), o agente é OBRIGADO a consultar o Design System primeiro.**

Ordem obrigatória, toda vez:

1. **Ler as fundações** → `design.md` (a especificação normativa) **ou** a ferramenta
   `nephos_foundations()` do MCP `nephos-ds`. Traz: cor por papel+passo, tipografia nomeada,
   ícones Font Awesome 7, multimarca e a **checagem de fidelidade**.
2. **Descobrir a peça** → `nephos_search("<o que preciso>")` (PT ou EN). Em empate, prefira a
   peça menor (átomo) antes do bloco.
3. **Abrir a ficha** → `nephos_get(<id>)` **antes de emitir o HTML da peça**. Leia os 10 blocos —
   em especial `antiPatterns`, `api.invalidCombinations`, `a11y` e `aiHints.disambiguation`.
4. **Rodar o protocolo de simulação pré-geração** → *Guia de Heurísticas de Usabilidade*:
   rodar a checklist de julgamento sobre a composição antes de emitir. Em especial, **nenhuma
   ação da tela fica sem destino desenhado** — todo gatilho (botão, ação de linha, item de menu
   e as ações acrescentadas pelo contexto) leva a um resultado projetado na mesma entrega (toast,
   dialog, drawer, popover ou outra tela declarada). Fonte: `Heurísticas de Usabilidade — Guia
   para o Moses.md` (§6.7 e §8).
5. **Rodar a checagem de fidelidade** (abaixo) sobre o que vai emitir.
6. **Emitir HTML semântico puro**, vestido pela marca ativa (o **tema** resolve a cor).

Gerar UI sem ter passado por 1→4 é violação da regra. **Na dúvida: herdar ou perguntar —
nunca inventar valor.**

Sem MCP conectado, o mesmo conteúdo está em `nephos-index.json` (catálogo agregado) e
`nephos-foundations.json` (fundações). Ler esses arquivos e seguir o mesmo fluxo.

---

## Checagem de fidelidade (rodar ANTES de emitir)

1. **Cor** — só por **papel + passo** (`primary/500`, `surface/50`, `feedback.danger/500`).
   Nunca hex, nunca matiz cru ("blue"), nunca nome de marca. Na prática o **tema** aplica a cor;
   o HTML quase nunca escreve cor.
2. **Geometria** (raio, espaço, altura, densidade) — nunca fixar px "no olho": vem do componente
   PrimeNG. Em protótipo à mão, usar os valores reais (raio campo/botão 6px, card 12px).
3. **Tipografia** — só a **escala nomeada** (`button-lg`, `title-sm`…), família Noto Sans.
   Nunca tamanho cru. No máximo 2 pesos por região.
4. **Componente** — abriu a ficha? Respeite `states`, `invalidCombinations`, `antiPatterns` e o
   `origin`.
5. **Fora do catálogo** → **perguntar ao time de DS, não inventar** (nem hex novo, nem componente
   novo, nem outro set de ícones).
6. **Saída** → HTML semântico puro (`<button>` age, `<a>` navega, `<table>` é dado tabular,
   `<label for>` em todo campo), sem classes de framework.

---

## Piso ético (rodar junto com a fidelidade)

A fidelidade garante a tela **correta**; o piso ético garante que ela **trata com respeito** quem
usa — outro eixo. **Recusa automática** (gere sem o padrão e avise numa linha qual regra
protegeu): opt-in nunca pré-marcado · erro nunca esconde a causa · ação destrutiva sempre por
`destructive-confirm` · não confundir vazio (`empty-state`) com erro. **Perguntar antes** (zona
cinzenta): contador/prazo só se for limite real do sistema; dado sensível (CPF, nota, salário) —
mostrar o mínimo, completo atrás de ação explícita. Piso **mínimo**: cresce só com caso real.
Detalhe em `design.md` › "Piso ético" e no MCP `nephos_foundations("ethicalFloor")`.

## A11y da composição (a peça certa ≠ a tela certa)

Cada ficha traz a a11y da SUA peça; a a11y real quebra na **composição**. Teste: alguém **só de
teclado** e alguém **ouvindo** a tela conseguem usar? Regras: ordem de foco/leitura = ordem visual
(não reordenar por CSS) · heading decidido no contexto da página (um `<h1>`, sem pular nível) · foco
vai pra lugar útil após cada ação · cor nunca é o único sinal · gráfico/tabela com alternativa
textual · `prefers-reduced-motion` · toast que some não é a única cópia · alvo de toque e zoom herdam
o mínimo do PrimeNG · **contraste por PAR de token verificado, nunca por dedução** (nunca
`contrastColor` sobre tom claro; AA 4,5:1 texto / 3:1 grande e ícone-com-significado). Detalhe em
`design.md` › "Acessibilidade da composição" e no MCP `nephos_foundations("a11yComposition")`.

## Fronteiras do sistema (o que é nosso × o que é herdado)

- **Componente NÃO se reescreve.** O PrimeNG é a base viva; ele já traz estrutura, spacing,
  raio, densidade e comportamento, e se atualiza sozinho no bump de versão. O trabalho de
  componente é **documentar** (`componentes/<id>.meta.ts`), nunca reimplementar.
- **O que é nosso:** identidade (**cor de marca + tipografia**) via tema, e a **composição**
  (blocos e templates). Só isso.
- **`origin` da ficha diz o regime:** `primeng` = usar direto (a ficha só orienta a escolha) ·
  `primeng-extended` = documentar só o delta · `nephos-own` = composição/primitivo nosso, doc
  completa.

## Multimarca (regra dura)

- Nenhum componente/HTML sabe em qual marca roda. **NUNCA escrever nome de marca** no código.
  Só o papel `primary` muda entre as 7 verticais; o resto é idêntico.
- **A vertical vem do CONTEXTO — não é escolha do usuário.** A saída nasce na cor da vertical
  ativa. **Nunca** gerar um seletor de marca no HTML para o usuário trocar de vertical.
  (O seletor das 7 marcas nos protótipos/galeria é andaime de teste, não produto.)
- **Claro/escuro** é a exceção: pode ser controle de produto (`theme-toggle`, seletor
  `.app-dark`), por ser preferência da pessoa.

## Ícones

- **Font Awesome** (última versão — hoje 7 Pro), sintaxe `<i class="fa-solid fa-<nome>"></i>`,
  nomes kebab-case do FA7. **Todos** os ícones são FA — inclusive os internos do PrimeNG
  (dropdown, X de dialog, toggler), sobrescritos via template/config de ícone. **Nunca PrimeIcons.**
- Decorativo = `aria-hidden="true"`; significativo = `aria-label`. Fora do set → pedir.

---

## Ao criar ou editar um `*.meta.ts`

- **Todo `*.meta.ts` é tipado por `NephosComponentMeta`** (`componentes/component-meta.type.ts`).
  O `tsc --strict` recusa uma ficha incompleta — é a garantia do schema. Não afrouxar o tipo.
- Preencher os **10 blocos**: `identity · purpose · api · relationships · tokens · antiPatterns
  (mín. 3) · examples · a11y · aiHints · references`.
- Ler a **API real** do componente no `.d.ts` do PrimeNG (`node_modules/primeng/types/…`) —
  **nunca inventar** input/output/default.
- Rodar as skills do próprio DS quando disponíveis: **`nephos-component-builder`** (andaime da
  ficha no schema certo) e **`nephos-token-audit`** (varre valores fixos fora dos tokens).

## Ciclo de vida — status e depreciação

Toda ficha tem `status` (`draft`/`beta`/`stable`/`deprecated`). **`deprecated` não entra em tela
nova** — usar o substituto que a peça nova declara em `replaces`; se a depreciada for a única opção
viável, **avisar** em vez de usar em silêncio. A busca do MCP rebaixa depreciadas (aparecem por
último). Ao criar uma peça que substitui outra: preencher `replaces` na nova e marcar a antiga
`deprecated`. Detalhe no MCP `nephos_foundations("lifecycle")`.

## Depois de qualquer mudança no catálogo

Regenerar o índice para o MCP servir o conteúdo novo:

```bash
npm run build:index
```

E validar: `tsc --strict` das fichas + `node mcp/test.mjs`.

---

## Mapa dos arquivos

| Arquivo | Papel |
|---|---|
| `design.md` | Especificação normativa (o agente lê primeiro) |
| `nephos-foundations.json` | As fundações em dados (espelho do `design.md`, servido pelo MCP) |
| `componentes/<id>.meta.ts` | Ficha de cada peça (110) — o contrato de uso |
| `componentes/component-meta.type.ts` | O schema como código (type-check garante completude) |
| `nephos-index.json` | Catálogo agregado (gerado por `build:index`) |
| `mcp/` | Servidor MCP `nephos-ds` (4 ferramentas) |
| `skill/` | Skills agênticas (consumo, builder, auditoria) |
| `_docs/` | Documentos de referência (Princípios, Inventário, Catálogo de blocos…) |
