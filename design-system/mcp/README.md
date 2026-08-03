# Nephos DS — MCP (o "bibliotecário" do Moses)

Servidor **MCP** (Model Context Protocol) que serve o catálogo do Design System Nephos a qualquer IA cliente — o **Moses**, o Claude, etc. É a peça "bibliotecário" da arquitetura de entrega (ver `../Como o Moses usa o Nephos — arquitetura de entrega.md`): o Moses pergunta *"campo de senha"* e recebe a ficha certa, **sem o Claude no meio**.

## O que ele expõe (ferramentas)

| Ferramenta | Para quê |
|---|---|
| `nephos_search` | Descobrir QUAL peça usar por termo livre (PT/EN): *"aviso de erro"*, *"menu de navegação"*. Devolve os melhores resumos. |
| `nephos_get` | A **ficha completa** de um componente por `id` (API, anti-padrões, exemplo em HTML semântico, acessibilidade). Abrir ANTES de gerar HTML. |
| `nephos_list` | Listar o catálogo, filtrando por `category` / `origin` / `status`. |
| `nephos_foundations` | As **regras do sistema** (cor por papel+passo, tipografia, ícones Font Awesome 7, multimarca, e a **checagem de fidelidade** pré-geração). |

## Como funciona

```
componentes/*.meta.ts  ──(build)──►  nephos-index.json  ──(serve)──►  MCP  ──►  Moses
nephos-foundations.json ─┘
```

O servidor **não** lê os `.meta.ts` direto — lê o `nephos-index.json` já gerado (rápido, sem toolchain de TS em produção).

## 1. Gerar o índice (quando as fichas mudam)

Na raiz do Design System (a pasta acima desta):

```bash
npm install            # instala o esbuild (uma vez)
npm run build:index    # gera nephos-index.json a partir das fichas + fundações
```

## 2. Rodar o MCP

```bash
cd mcp
npm install            # instala @modelcontextprotocol/sdk + zod (uma vez)
npm start              # sobe o servidor (stdio)
npm test               # testa a lógica de busca/consulta (não precisa do SDK subir)
```

Por padrão o servidor lê `../nephos-index.json`. Para apontar outro caminho, use a variável `NEPHOS_INDEX`.

## 3. Registrar num cliente MCP

Config típica (formato usado por clientes MCP, ex.: Claude Desktop / o host do Moses):

```jsonc
{
  "mcpServers": {
    "nephos-ds": {
      "command": "node",
      "args": ["caminho/para/Nephos DS/mcp/server.mjs"],
      "env": { "NEPHOS_INDEX": "caminho/para/Nephos DS/nephos-index.json" }
    }
  }
}
```

No repositório final (`IATec.Nephos.Blocks.Angular`), isto vive junto do DS e o Moses é "plugado" aqui. A **skill do Moses** (próximo passo, o "cartão de regras") ensina o fluxo: *ler foundations → buscar peça → abrir a ficha → rodar a checagem de fidelidade → emitir HTML semântico*.

## Requisitos
- Node ≥ 18.
- Dependências: `@modelcontextprotocol/sdk` (^1) e `zod` (^3). **zod 3**, não 4 (o SDK espera 3).
