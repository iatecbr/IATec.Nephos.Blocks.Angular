# AGENTS.md · a porta de entrada do repositório

> Lido por qualquer agente de IA que trabalhe aqui (Moses, Claude Code, Codex e afins).
> O [`CLAUDE.md`](./CLAUDE.md) da raiz traz o mesmo conteúdo em detalhe — arquitetura,
> comandos e as armadilhas conhecidas. **A fonte de comportamento é uma só, e não é este
> arquivo: é [`design-system/AGENTS.md`](./design-system/AGENTS.md).**

## ⛔ A regra que não se quebra

**Antes de gerar, compor ou alterar QUALQUER interface** — tela, página, componente,
bloco ou trecho de HTML — consulte o Design System **Nephos** primeiro:

1. [`design-system/AGENTS.md`](./design-system/AGENTS.md) — a regra de autoria;
2. [`design-system/design.md`](./design-system/design.md) — a especificação normativa;
3. `design-system/componentes/<id>.meta.ts` — a ficha da peça, que é o contrato de uso.

Com o MCP `nephos-ds` conectado: `nephos_foundations()` → `nephos_search()` →
`nephos_get()`. Sem MCP, o mesmo conteúdo está em `design-system/nephos-index.json` e
`design-system/nephos-foundations.json`.

**Na dúvida: herdar ou perguntar — nunca inventar valor.**

## O mínimo para não errar feio

- **Cor** só por papel + passo (`primary/500`, `surface/50`). Nunca hex, nunca matiz
  cru, **nunca nome de marca** — a vertical vem do ambiente, não é escolha de ninguém.
- **Geometria e tipografia** vêm do componente e da escala nomeada. Nunca px "no olho".
- **Ícones são Font Awesome 7**, nunca PrimeIcons.
- **Saída é HTML semântico puro**: `<button>` age, `<a>` navega, `<label for>` em todo
  campo. Sem classes de framework.
- **Não reescrever componente do PrimeNG.** Compor.

Antes de entregar, rode a auditoria: `design-system/skill/nephos-token-audit`.
