---
name: nephos-token-audit
description: >-
  Audita código, HTML gerado ou uma ficha `.meta.ts` do Design System Nephos
  atrás de VALORES FIXOS fora do sistema (hex cru, px "no olho", nome de marca,
  PrimeIcons no lugar de Font Awesome, classes de framework no HTML, estado só
  por cor, <div> clicável, campo sem <label>). Use SEMPRE que precisar verificar
  se uma saída ou uma ficha está fiel ao Nephos, revisar HTML que o Moses gerou,
  ou fazer QA de fidelidade antes de entregar. Reporta cada achado com arquivo,
  linha, por que fere a regra e o conserto. É a skill de AUDITORIA (não gera UI).
---

# Nephos · auditoria de fidelidade (token audit)

Esta skill **varre** e **reporta** — não reescreve sozinha (a não ser que peçam). O objetivo é
garantir que **nenhum valor fixo entrou fora do sistema de tokens** e que a saída é HTML
semântico. É o mesmo rigor da "checagem de fidelidade" do `design.md`, agora como processo.

> **Régua:** cor por **papel + passo**, geometria **herdada**, ícones **Font Awesome**, saída
> **HTML semântico**. Tudo que foge disso é achado.

---

## O que auditar (as 8 violações)

| # | Violação | Regra ferida |
|---|---|---|
| 1 | **Hex cru** (`#RGB`/`#RRGGBB`) em código/HTML/ficha | Cor só por papel+passo, nunca hex |
| 2 | **Matiz cru** ("blue", "orange"…) descrevendo cor de UI | Cor por função, não por matiz |
| 3 | **px/rem "no olho"** para raio, espaço, tamanho, fonte | Geometria vem do componente PrimeNG |
| 4 | **Nome de marca** no código/HTML/ficha (Educação, Financeiro, RH…) | Nenhum componente sabe a marca |
| 5 | **`pi pi-*`** (PrimeIcons) | Todos os ícones são Font Awesome 7 |
| 6 | **Classe de framework** no HTML gerado (`class="p-…"`, utilitários) | Saída = HTML semântico puro |
| 7 | **`<div>`/`<span>` clicável** com handler no lugar de `<button>`/`<a>` | Tag semântica correta |
| 8 | **Campo sem `<label>`** associado, ou **estado só por cor** (sem texto/ARIA) | Acessibilidade obrigatória |

Exceções legítimas (não são achado):
- a **camada primitiva** de tokens (`tokens.core.json`, `nephos.palettes.ts`) — é onde o hex
  mora de propósito; e os **protótipos/galeria** (`prototipos/`), que citam valores reais e
  trazem o seletor de marca como andaime de teste;
- **hex como DADO, não como token de design:** o ColorPicker guarda uma cor arbitrária escolhida
  pelo usuário (`type="color" value="#000000"`, ou exibir o valor `#1E88E5` ao lado) — aí o hex
  é o dado, não uma decisão de estilo. Não é achado;
- **falso-positivo de `#` + dígitos:** um número de registro (`fatura #1032`, `pedido #42`) casa
  o padrão de hex mas **não é cor** — por isso a #1 exige **ler o contexto**, não corrigir cego;
- **exemplos que ILUSTRAM a própria peça de marca** (fichas `logo`, `header`, `auth`) podem
  citar um `src`/`alt` concreto — mas veja a nota abaixo: o ideal é usar placeholder da marca ativa.

---

## Como rodar

### 1. Definir o alvo
- HTML/código que o Moses gerou (colado ou em arquivo);
- uma ficha `componentes/<id>.meta.ts`;
- ou o catálogo inteiro (varredura ampla).

### 2. Varrer (padrões de busca)

```bash
# 1. hex cru — fora da camada primitiva permitida
grep -rniE "#[0-9a-f]{3,8}\b" <alvo> \
  | grep -viE "tokens\.core|nephos\.palettes|prototipos/"

# 3. px/rem soltos em código/HTML (geometria "no olho")
grep -rniE "[0-9]+(px|rem)\b" <alvo> | grep -viE "prototipos/|component-meta|\.d\.ts"

# 4. nome de marca no código/HTML/ficha
# ⚠️ NÃO usar classe de caractere com acento ([cç][aã]): em UTF-8 multibyte o grep
#    pode NÃO casar e sub-reportar (bug real já visto). Use as palavras LITERAIS.
for termo in "Educação" "educacao" "Financeiro" "Comercial" "Recursos Humanos" "Igrejas" "Gerencial"; do
  grep -rni "$termo" componentes/ <alvo>
done | grep -vi "keywords"   # keywords PT/EN podem citar contexto legitimamente

# 5. PrimeIcons
grep -rniE "pi pi-" <alvo>

# 6. classes de framework no HTML gerado
grep -rniE "class=\"[^\"]*\bp-[a-z]" <alvo>
```

> As violações 2, 7 e 8 (matiz cru, `<div>` clicável, campo sem label / estado só por cor)
> exigem **leitura**, não só grep — inspecionar o HTML e o contexto.

### 3. Para cada achado, checar a exceção
Está na camada primitiva permitida (`tokens.core`, `nephos.palettes`) ou num protótipo? Então
**não é achado**. Fora disso, é violação.

### 4. Reportar (um item por achado)

```
[Violação #<n>] <arquivo>:<linha>
  Trecho:  <o código/HTML exato>
  Por quê: <a regra ferida, em uma linha>
  Conserto: <o papel+passo / a tag / o token que deveria estar no lugar>
```

Ao final, um **placar**: total de achados por tipo, e o veredito
**✅ FIEL** (zero achados fora das exceções) ou **🔴 N achados a corrigir**.

---

## Conserto (só quando pedirem)

Por padrão a skill **reporta**. Se pedirem para corrigir:
- Hex/matiz → trocar pelo **papel + passo** correspondente (consultar `nephos_foundations`
  `colorModel`/`chartColors` para achar o papel certo — ex.: um vermelho de erro vira
  `feedback.danger`, não um hex).
- px "no olho" → remover o valor fixo e **deixar o componente PrimeNG aplicar**; em protótipo à
  mão, usar o número real da auditoria de geometria.
- Nome de marca → remover; a cor entra pelo **tema** (papel `primary`).
- `pi pi-*` → o ícone Font Awesome equivalente (`fa-solid fa-<nome>`, validado no metadata FA7).
- Classe de framework / `<div>` clicável → reemitir com a **tag semântica** certa.
- Campo sem label / estado só por cor → adicionar `<label for>` e reforço textual/ARIA.

Depois de corrigir uma ficha: `tsc --strict` → `npm run build:index` → `node mcp/test.mjs`.

---

## Definition of Done

- [ ] Alvo varrido pelas 8 violações (grep + leitura onde exige).
- [ ] Exceções legítimas (camada primitiva, protótipos) descontadas.
- [ ] Cada achado reportado com arquivo:linha, motivo e conserto.
- [ ] Placar final com veredito FIEL / N achados.
- [ ] Se corrigido: revalidado (tsc + build:index + MCP test).
