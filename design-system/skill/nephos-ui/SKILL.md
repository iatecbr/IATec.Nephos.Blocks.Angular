---
name: nephos-ui
description: >-
  Gera qualquer interface (tela, página, componente, bloco ou trecho de HTML)
  dos produtos da IATec / Educação Adventista usando o Design System Nephos.
  Use SEMPRE que o pedido for criar, montar, prototipar ou alterar UI/HTML para
  esses produtos — inclusive quando "Nephos", "Moses", "PrimeNG" ou uma das 7
  marcas (Educação, Financeiro, Comercial, RH, Igrejas, Gerencial, Global) for
  citada. A skill consulta o catálogo Nephos pelo MCP, aplica as fundações (cor
  por papel+passo, tipografia nomeada, ícones Font Awesome 7, multimarca) e emite
  HTML SEMÂNTICO PURO fiel ao PrimeNG. Sem ela, a IA inventa cor/medida/componente
  e quebra a consistência das 7 marcas.
---

# Nephos · gerar UI com o Design System

Você está desenhando interface para os produtos da **IATec / Educação Adventista**.
O Design System é o **Nephos**: base **PrimeNG (Angular)**, saída **HTML semântico puro**,
identidade por **tema multimarca** (7 verticais). A documentação é a **fonte da verdade** —
não há Figma no meio. Sua régua é **fidelidade**: nunca inventar cor, medida ou componente.

> **Regra-mãe:** na dúvida, **herdar ou perguntar — nunca inventar valor.**
> É isso que mantém as 7 marcas consistentes e o resultado fiel ao PrimeNG.

---

## As ferramentas (MCP `nephos-ds`)

O catálogo vive num servidor MCP chamado **`nephos-ds`**. Ele expõe 4 ferramentas:

| Ferramenta | Quando chamar |
|---|---|
| `nephos_foundations(section?)` | **Primeiro passo de toda tarefa.** Devolve as regras do sistema: cor por papel+passo, tipografia, ícones FA7, multimarca e a **checagem de fidelidade**. `section` opcional: `colorModel`, `typography`, `icons`, `multibrand`, `geometry`, `fidelityChecklist`, `globalRules`. |
| `nephos_search(query, limit?)` | Descobrir **qual peça** usar por termo livre (PT ou EN): *"campo de senha"*, *"aviso de erro"*, *"tabela de dados"*, *"antes e depois"*. Devolve os melhores resumos, já ordenados. |
| `nephos_get(id)` | A **ficha completa** de um componente (os 10 blocos). **Abrir ANTES de emitir o HTML da peça.** |
| `nephos_list(category?, origin?, status?)` | Listar/filtrar o catálogo. `category`: atom/molecule/organism/block/layout. `origin`: primeng/primeng-extended/nephos-own. |

> **Se o MCP não estiver conectado:** o mesmo conteúdo está no arquivo `nephos-index.json`
> (catálogo agregado) e em `nephos-foundations.json` (fundações). Leia esses arquivos e
> siga o mesmo fluxo. Nunca gere sem ter lido as fundações e as fichas das peças.

---

## O fluxo obrigatório (nesta ordem)

1. **Ler as fundações** → `nephos_foundations()`. Entenda cor por papel, tipografia nomeada,
   regra de ícones (FA7), multimarca e a checagem de fidelidade **antes de escolher qualquer peça**.
2. **Descobrir as peças** → para cada elemento do pedido, `nephos_search("<o que preciso>")`.
   Pegue o `id` do melhor resultado. Em caso de empate, prefira a **peça menor** (átomo) antes do bloco.
3. **Abrir cada ficha** → `nephos_get(id)`. **Não gere HTML de uma peça sem abrir a ficha dela.**
   Leia os blocos e responda às **5 perguntas silenciosas** (§ abaixo).
4. **Rodar o protocolo de simulação pré-geração** → *Guia de Heurísticas de Usabilidade*:
   rodar a checklist de julgamento sobre a composição antes de emitir. Em especial, **nenhuma
   ação da tela fica sem destino desenhado** — todo gatilho (botão, ação de linha, item de menu
   e as ações acrescentadas pelo contexto) leva a um resultado projetado na mesma entrega (toast,
   dialog, drawer, popover ou outra tela declarada). Fonte: `Heurísticas de Usabilidade — Guia
   para o Moses.md` (§6.7 e §8).
5. **Rodar a checagem de fidelidade**, **o piso ético** e a **a11y da composição** (§§ abaixo) sobre o que você vai emitir.
6. **Emitir HTML semântico puro**, vestido pela marca ativa (o **tema** resolve a cor — você
   não escreve cor). Use o campo `examples.html` da ficha como referência do que sai.
7. **(Opcional) auto-revisar** contra os `antiPatterns` e `invalidCombinations` de cada ficha.

Em nenhum passo você inventa. Você **lê** (foundations + fichas + heurísticas) e **compõe**.

---

## As 5 perguntas silenciosas → onde a ficha responde

Toda peça precisa responder, sem ambiguidade (é o que evita alucinação):

| Pergunta | Bloco da ficha (`nephos_get`) |
|---|---|
| 1. **Devo usar este componente?** | `purpose.whenToUse` / `whenNotToUse` + `aiHints.selectionCriteria` |
| 2. **Qual variante?** | `api.inputs` (ex.: `severity`, `variant`, `size`) |
| 3. **O que vai dentro dele?** | `api.slots` + `relationships.children` |
| 4. **Quais regras devo obedecer?** | `api.states`, `api.invalidCombinations`, `tokens`, `a11y` |
| 5. **O que eu NUNCA devo fazer?** | `antiPatterns` ← a mais importante |

Se está em dúvida entre duas peças, leia `aiHints.disambiguation` (ex.: Tree vs TreeTable
vs TreeSelect; SplitButton vs Menu vs SpeedDial). A ficha diz o critério de desempate.

---

## Checagem de fidelidade — rode ANTES de emitir

1. **Cor** — só por **papel + passo** (`primary/500`, `surface/50`, `feedback.danger/500`).
   **Nunca** hex. **Nunca** matiz cru ("blue"). **Nunca** nome de marca. Papéis válidos:
   `primary` (varia por tema) · `surface` (=slate) · `neutral` (=gray) ·
   `feedback.{info,success,warn,danger,help}`. Na prática, o **tema** aplica a cor — você
   quase nunca escreve cor no HTML; quando precisar citar, use o papel.
2. **Geometria** (raio, espaçamento, altura, densidade) — **nunca fixar px "no olho"**.
   Vem pronta do componente PrimeNG. Se tiver mesmo que citar valor (protótipo à mão),
   use os números reais da auditoria (raio campo/botão 6px, card 12px).
3. **Tipografia** — só a **escala nomeada** (`button-lg`, `title-sm`, `body-lg`…), família
   **Noto Sans**. Nunca tamanho cru. No máximo 2 pesos por região.
4. **Componente** — **abriu a ficha?** Respeite `states`, `invalidCombinations`, `antiPatterns`
   e o `origin` (`primeng` = usar direto; `nephos-own` = composição/primitivo nosso).
5. **Fora do catálogo?** Peça, cor ou padrão que **não** está nas fichas nem nas fundações →
   **perguntar ao time de DS, não inventar** (nem hex novo, nem componente novo, nem misturar
   outro set de ícones).
6. **Saída** — **HTML semântico puro**: a tag certa (`<button>` age, `<a>` navega, `<table>`
   é dado tabular, `<label for>` em todo campo, `<nav>`/`<ul>` em navegação), **sem classes de
   framework** e sem `<div>` clicável no lugar de `<button>`.

---

## Piso ético — rode junto com a fidelidade

A fidelidade garante a tela **correta**; o piso ético garante que ela **trata com respeito**
quem usa. Outro eixo — dá para ter uma tela 100% fiel e ainda assim confundir/pressionar.

**Recusa automática** (gere sem o padrão e avise numa linha qual regra protegeu):
- **Opt-in nunca pré-marcado** — caixa de newsletter/consentimento/compartilhar dado nasce
  **desmarcada**.
- **Erro nunca esconde a causa** — dizer o que falhou e o que fazer (via `message`/`toast`),
  nunca "algo deu errado" genérico quando o sistema sabe.
- **Ação destrutiva sempre com fricção** — passa por `destructive-confirm` (foco no cancelar,
  verbo real, nunca "OK").
- **Não confundir vazio com erro** — `empty-state` é vazio de verdade; erro é estado de erro.

**Perguntar antes** (zona cinzenta — não recusar nem gerar sem checar):
- **Contador/prazo/"restam X"** só se for um limite **real** do sistema; senão, perguntar.
- **Dado sensível** (CPF, nota, salário, histórico) — mostrar o **mínimo**; completo atrás de
  ação explícita de abrir. Na dúvida, perguntar antes de expor.

> Consulte pelo MCP: `nephos_foundations("ethicalFloor")`.

---

## A11y da composição — a peça certa não garante a TELA certa

Cada ficha já traz a a11y da SUA peça. A a11y real quebra na **composição**. Teste mental antes
de emitir: **alguém só de teclado** e **alguém ouvindo** a tela conseguem usar?

- **Ordem** de foco/leitura (Tab + leitor) = ordem visual. Não reordenar por CSS sem reordenar o HTML.
- **Heading** decidido no contexto da PÁGINA (um `<h1>`, sem pular nível) — não o nível "de exemplo"
  da ficha.
- **Foco após ação** (enviar/abrir modal/filtrar) vai pra confirmação, 1º erro ou título novo —
  nunca fica perdido.
- **Cor nunca é o único sinal**; gráfico/tabela com **alternativa textual**; erro/rótulo **sem
  jargão** ("erro 4022"); **`prefers-reduced-motion`**; toast que some **não é a única cópia**;
  **alvo de toque** e **zoom** herdam o mínimo do PrimeNG (não apertar).
- **Contraste por PAR de token verificado, nunca por dedução:** só pares garantidos pelo tema
  (`primary.contrastColor` sobre `primary.color`; `text.color`/`mutedColor` sobre `surface`).
  **Nunca** `contrastColor` sobre tom claro (`primary/50`, `feedback/50`, `highlight.background`) —
  ali usa `text.color`/`mutedColor`. Mínimos AA: **4,5:1** texto normal, **3:1** texto grande e
  ícone/borda com significado. Placeholder segue o mesmo mínimo. Sem par definido → o par testado
  mais próximo ou **perguntar**.

> Consulte pelo MCP: `nephos_foundations("a11yComposition")`.

---

## Regras que valem para TODA geração

- **Multimarca:** nenhum componente/HTML sabe em qual marca roda. **NUNCA escreva nome de
  marca** no código. Só o papel `primary` muda entre as 7 verticais — o resto é idêntico. A
  troca de marca é feita pelo **tema** (troca de `primary`); claro/escuro pelo `surface`
  (seletor `.app-dark`).
- **A vertical vem do CONTEXTO — não é escolha do usuário.** Você já sabe, pelo contexto do
  produto, em qual vertical está gerando: a saída nasce **na cor daquela vertical** e pronto.
  **NUNCA** gere um seletor de marca/vertical no HTML para o usuário trocar. (O seletor das 7
  marcas dos protótipos/galeria é andaime de teste, não produto.) O **claro/escuro** é a
  exceção: esse **pode** ser um controle de produto (`theme-toggle`), por ser preferência da pessoa.
- **Ícones:** **Font Awesome** (sempre a última versão — hoje 7 Pro), sintaxe
  `<i class="fa-solid fa-<nome>"></i>`. Nomes em kebab-case do FA7 (atenção às renomeações:
  search→`magnifying-glass`, times→`xmark`, trash→`trash-can`, pencil→`pen-to-square`,
  home→`house`, info-circle→`circle-info`). Ícone **decorativo** = `aria-hidden="true"`;
  **significativo** = `aria-label`. Fora do set → pedir, não inventar nem misturar com PrimeIcons.
  **TODOS os ícones são Font Awesome — inclusive os INTERNOS dos componentes PrimeNG** (setinha
  de dropdown, X de dialog, toggler da árvore): são sobrescritos para FA via os templates de
  ícone de cada componente e/ou a config de ícone do tema. **Nunca PrimeIcons, em lugar nenhum.**
- **Ciclo de vida:** nunca usar uma peça com `status: deprecated` em tela nova — ela declara o
  substituto em `replaces`; siga pra ele. Se a depreciada for a única opção viável, **avise** em
  vez de usar em silêncio. A busca já rebaixa depreciadas (aparecem por último). Confira o `status`
  na ficha (`nephos_get`) antes de emitir.
- **Acessibilidade não é opcional:** todo campo com `<label>` associado; contraste mínimo
  4.5:1 em texto; foco visível; estado (erro, selecionado, expandido) nunca só por cor —
  sempre com texto/ARIA junto. Cada ficha traz o bloco `a11y` com o que é obrigatório.

---

## Exemplo de uma passada completa

**Pedido:** *"monta a tela de login da Educação"*

1. `nephos_foundations()` → confirmo cor por papel, FA7, multimarca (não vou escrever "Educação"
   em lugar nenhum; o tema resolve).
2. `nephos_search("bloco de login")` → acho o bloco `login-form`. `nephos_search("campo de senha")`
   → `password`. `nephos_search("botão de ação")` → `button`.
3. `nephos_get("login-form")`, `nephos_get("password")`, `nephos_get("button")` → leio as 5
   perguntas de cada. A ficha do `password` me lembra: sempre `<label for>`, botão de mostrar
   senha com `aria-label`, erro por texto + `aria-invalid` (não só borda vermelha).
4. Checagem de fidelidade: sem hex, sem "Educação" no HTML, tipografia nomeada, tags certas.
5. Emito o HTML semântico (baseado no `examples.html`/`inContext` das fichas): `<form>` com
   `<label>`+`<input type="email">`, `<label>`+`<input type="password">` + botão mostrar,
   `<button type="submit">Entrar</button>`. A cor da marca entra pelo **tema**, não pelo HTML.

**Resultado:** o mesmo HTML serve as 7 marcas — só o tema troca o `primary`. É a prova de que
a cadeia tokens → tema → bloco está sendo respeitada.

---

## Quando NÃO usar esta skill

- O pedido não é UI/HTML para os produtos IATec/Educação Adventista (ex.: lógica de backend,
  consulta a banco) — aí o Nephos não se aplica.
- Precisa de um componente/padrão que **não existe** no catálogo → **pare e pergunte ao time
  de DS** em vez de inventar. Sinalizar a falta é o comportamento correto, não improvisar.

> Manutenção: quando um padrão do DS mudar, **atualize esta skill** e regenere o
> `nephos-index.json` (`npm run build:index`) para o MCP servir o catálogo novo.
