# Skill `nephos-ui` — o "cartão de regras" do Moses

Esta é a **skill** da arquitetura de entrega (ver `../../Como o Moses usa o Nephos — arquitetura de entrega.md`):
a instrução **ativa** que ensina o Moses (ou qualquer IA cliente) a gerar UI com o Design System
Nephos **sozinho, sem o Claude no meio**.

Skill ≠ Markdown passivo. O host lê a `description` do frontmatter e **puxa a skill sozinho**
quando a tarefa é "gerar UI/HTML" para os produtos IATec / Educação Adventista.

## O que ela faz

Ensina o fluxo fixo:

```
nephos_foundations()  →  nephos_search()  →  nephos_get()  →  checagem de fidelidade  →  HTML semântico
   (as regras)            (qual peça)         (a ficha)         (não inventar)            (a saída)
```

Mapeia as **5 perguntas silenciosas** (§2 do DSIA) aos blocos da ficha e trava a saída em
**HTML semântico puro**, cor por papel, tipografia nomeada, ícones Font Awesome 7 e multimarca.

## Dependências

- O MCP **`nephos-ds`** conectado (ver `../../mcp/README.md`). É de onde a skill puxa o catálogo.
- Fallback sem MCP: os arquivos `../../nephos-index.json` (catálogo) e
  `../../nephos-foundations.json` (fundações) — a skill instrui a lê-los diretamente.

## Como registrar (host do Moses / cliente de skills)

1. Garanta o MCP `nephos-ds` no cliente (config em `../../mcp/README.md`).
2. Disponibilize esta pasta (`skill/nephos-ui/`) como skill no host do Moses — o host indexa a
   `description` do `SKILL.md` e a seleciona sozinho quando o pedido é de UI.
3. Nada mais: a skill referencia as ferramentas do MCP pelo nome (`nephos_search`, etc.).

## Manutenção

Quando um padrão do DS mudar: edite o `SKILL.md`, atualize as fichas (`../../componentes/*.meta.ts`)
e rode `npm run build:index` na raiz do DS para o MCP servir o catálogo novo.
