---
tipo: arquitetura
tags: [trabalho, nephos, moses, mcp, entrega, arquitetura]
---

# Como o Moses usa o Nephos — arquitetura de entrega

O Nephos é o Design System que o **Moses** consulta para gerar telas em HTML semântico. Ele herda o Prime UI como base de componente e acrescenta uma camada de documentação legível por IA. Este documento descreve as partes que compõem o sistema e como elas viram algo que o Moses usa sozinho no repositório.

## A ideia em uma imagem

Pensa numa **cozinha**:

- **O manual de receitas** = a documentação (`design.md` + as fichas + os tokens). São **arquivos de texto** que **qualquer IA lê** — inclusive o Moses.
- **O bibliotecário** = o **MCP** (um programinha). Quando o Moses pergunta *"preciso de um campo de senha"*, o bibliotecário entrega a ficha certa.
- **O cartão de regras** = a **skill do Moses** (a instrução): *"antes de desenhar, leia o manual; para cada peça, abra a ficha; rode a checagem de fidelidade; entregue HTML."*
- **A cozinha** = o **repositório**. Tudo isso mora lá, versionado. O Moses é "plugado" no bibliotecário.

Com o manual + o bibliotecário + o cartão de regras na cozinha, **qualquer cozinheiro (o Moses) cozinha sozinho.** A documentação é autoral; o Moses é quem executa lendo os mesmos arquivos.

---

## As quatro camadas do sistema

### 1. Fundação

A base visual: cor, tipografia e geometria.

- **Cor e tema multimarca.** As paletas das 7 marcas ficam em `nephos.palettes.ts` e o tema em `nephos.preset.ts`. A fábrica `nephosPreset(theme)` pluga cada marca no motor de temas: trocar de marca troca o tema ativo e um único papel de cor varia — `primary`. O tema é hand-written sobre o preset **Aura**, sem Theme Designer. Feedback e neutros seguem o padrão do PrimeNG; marca e tipografia são próprias.
- **Tipografia.** Uma família (**Noto Sans**), quatro pesos e uma escala nomeada por função (`button-sm`, `title-lg`), idêntica nas sete marcas.
- **Geometria.** Raio, espaçamento, densidade e foco herdados do PrimeNG. Cada componente já aplica esses valores automaticamente.

> Detalhe normativo em [[design.md]].

### 2. Documentação agêntica

A fonte de verdade que a IA lê para saber o que o sistema é e como usá-lo.

- **`design.md`** é o mapa lido primeiro por qualquer agente: fundação de cor, tipografia, geometria, ícones, regras do sistema e a checagem de fidelidade.
- **Contrato de metadados por componente.** Todo componente preenche um modelo fixo de 10 blocos, definido como código em `componentes/component-meta.type.ts`. É o contrato que o Moses lê para saber quando e como usar cada componente.

> Estrutura do contrato em [[Schema de metadados de componente]].

### 3. Componentes, blocos e layouts

O que o sistema oferece para montar telas, e a fronteira entre Prime UI e o que é próprio.

- **Fronteira Prime UI vs. próprio.** O componente é PrimeNG; o que é próprio é a composição (blocos) e a identidade (tema). Poucos componentes são "composição Nephos" (tabela, formulário, toolbar, stepper, megamenu, upload); o restante é PrimeNG puro. Ver [[Inventário de componentes]].
- **Catálogo de fichas `.meta.ts`.** Cada ficha descreve um componente do PrimeNG (mais blocos e primitivos próprios) no contrato de metadados. O catálogo é validado por `tsc --strict` e agregado em `nephos-index.json` pelo build (`npm run build:index`).
- **Blocos e templates.** Organizados em Atomic Design — blocos compostos e templates que servem de base para o Moses gerar telas. Ver [[Catálogo de blocos e templates (Atomic Design)]].

### 4. Camada de consulta da IA

Como a documentação vira algo que o Moses usa sozinho.

- **MCP `nephos-ds`** (em `mcp/`) serve o `nephos-index.json` por quatro ferramentas (abaixo). A lógica pura vive em `mcp/lib.mjs` e tem testes (`mcp/test.mjs`); ver `mcp/README.md` para rodar e registrar num cliente MCP.
- **Skill do Moses** (`skill/nephos-ui/SKILL.md` + README) é a instrução ativa que o host puxa pela descrição. Ela trava o fluxo `foundations → search → get → checagem → HTML`, mapeia as perguntas comuns aos blocos das fichas e fixa a saída em HTML semântico. Sem MCP, a skill lê o `nephos-index.json` como fallback.

#### As ferramentas do MCP (`mcp/server.mjs`)

- `nephos_search(query, limit?)` — descobre a peça por termo livre (PT/EN). Busca com remoção de palavras-vazias, bônus de cobertura e desempate por categoria (peça menor antes do bloco).
- `nephos_get(id)` — a ficha completa (10 blocos).
- `nephos_list(category?, origin?, status?)` — lista o catálogo.
- `nephos_foundations(section?)` — regras do sistema + checagem de fidelidade.

---

## O fluxo do Moses

1. Recebe o pedido (ex.: *"tela de login da Educação"*).
2. Lê o `design.md` (as regras do sistema).
3. Pergunta ao **bibliotecário (MCP)** as peças que precisa → recebe as **fichas**.
4. Roda a **checagem de fidelidade** (abaixo).
5. Gera **HTML semântico puro**, vestido pela marca ativa (o tema resolve a cor).
6. (Opcional) valida contra o protótipo/checklist.

O Moses lê os mesmos arquivos do repositório — nenhum passo depende de um agente externo montando a tela por ele.

---

## Estrutura no repositório

Tudo dentro do repo `IATec.Nephos.Blocks.Angular`, numa pasta própria (ex.: `design-system/`), versionada com o resto:

```
design-system/
  design.md                     ← lê primeiro (inclui a checagem de fidelidade)
  tokens.core.json / tokens.roles.json
  nephos.preset.ts / nephos.palettes.ts     ← tema das 7 marcas
  nephos-foundations.json       ← espelho legível por máquina das fundações
  componentes/
    component-meta.type.ts       ← contrato
    *.meta.ts                    ← fichas
    index.ts                     ← agrega as fichas
  nephos-index.json              ← GERADO no build (o catálogo)
  build/                         ← gera o índice a partir das fichas + fundações
mcp/                             ← o bibliotecário (servidor MCP)
skill/nephos-ui/                 ← o cartão de regras (skill do Moses)
```

E o **`CLAUDE.md` / `agents.md` do repo apontam, no topo, para o `design.md`** — senão a IA ignora tudo. (O próprio `design.md` já pede isso.)

---

## Checagem de fidelidade — a regra que o Moses roda ANTES de gerar

O Moses (e qualquer IA) roda esta checagem antes de emitir qualquer protótipo/HTML:

1. **Cor** — só por **papel + passo** (`primary/500`, `surface/50`, `feedback.danger/500`). **Nunca** hex. **Nunca** nome de marca. Cor que não cabe nos papéis → **pedir, não inventar**.
2. **Geometria** (raio, espaçamento, tamanho, altura) — **nunca fixar em px "no olho"**. Ela **vem pronta do componente PrimeNG**. Se precisar citar valor (protótipo à mão), usar os números reais das fundações (raio campo/botão 6px, card 12px, etc.).
3. **Tipografia** — só a **escala nomeada** (`button-lg`, `title-sm`…), família Noto Sans. Nunca tamanho cru.
4. **Componente** — **abrir a ficha** (`.meta.ts`) e respeitar `states`, `invalidCombinations` e `antiPatterns`. Usar o campo `origin` (primeng = usar direto; nephos-own = composição nossa).
5. **Fora do catálogo?** Se a peça/cor/padrão não está nas fichas nem nos tokens → **perguntar ao time de DS, não inventar**.
6. **Saída** — **HTML semântico puro** (a tag certa: `<button>` age, `<a>` navega, `<label>` no campo), sem classes de framework.

> Regra-mãe: **na dúvida, herdar ou perguntar — nunca inventar valor.** É isso que mantém as 7 marcas consistentes e o resultado fiel ao PrimeNG.
