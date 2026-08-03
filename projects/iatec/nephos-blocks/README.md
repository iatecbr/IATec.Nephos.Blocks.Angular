# @iatec/nephos-blocks

Os **blocos** do Design System **Nephos** — as composições prontas que a
organização repete: uma barra de busca com filtros, uma tabela gerenciável,
uma confirmação de exclusão.

> Um bloco **não é um componente novo**. É a forma de montar. O PrimeNG dá
> os componentes, o `@iatec/nephos-ui` dá os primitivos, e o bloco é o
> arranjo — com as regras de usabilidade e acessibilidade que a ficha exige
> já embutidas.

Cada bloco responde a uma ficha em `design-system/componentes/<id>.block.meta.ts`,
que é o **contrato de uso**: API, estados, combinações inválidas,
anti-padrões, a11y e desambiguação. Ao mexer no bloco, leia a ficha antes —
e se a mudança alterar a API, a ficha muda junto (e depois `npm run build:index`).

## Onde cada peça mora

| Biblioteca | O que guarda |
|---|---|
| `@iatec/nephos-ui` | os **primitivos** (título, texto, rótulo, ícone, link, logo) e a camada de token |
| **`@iatec/nephos-blocks`** | os **blocos** — este pacote |
| `@iatec/nephos-pages` | as **páginas** pré-configuradas (que são composições de blocos) |
| `@iatec/nephos-layout` | os **layouts** — a moldura da tela |

## Instalação no app

```scss
/* styles.scss — nesta ordem */
@use '@iatec/nephos-ui/lib/nephos-ui.scss';
@use '@iatec/nephos-blocks/lib/nephos-blocks.scss';
```

A ordem importa: o arquivo dos blocos consome os tokens (`--nph-*`) que o
`nephos-ui.scss` declara em `:root`. Sozinho, ele não tem de onde tirar
espaço nem escala tipográfica.

Nenhum bloco escreve px nem cor: o arranjo vem daqui e toda cor vem das
variáveis `--p-*` do preset Nephos.

## Os blocos

| Seletor | Ficha | A regra que ele existe para não deixar quebrar |
|---|---|---|
| `nph-blocks-empty-state` | `empty-state` | Vazio ≠ carregando ≠ erro; `sem-resultado` nunca oferece "criar" |
| `nph-blocks-destructive-confirm` | `destructive-confirm` | `alertdialog`, confirmar em `danger`, **foco inicial no Cancelar**, clique fora não responde |
| `nph-blocks-login-form` | `login-form` | Erro **geral** (nunca "este e-mail não existe"), senha sem medidor, `autocomplete` correto |
| `nph-blocks-search-filters` | `search-filters` | Todo filtro aplicado vira chip removível, e o botão de remover **cita o filtro** |
| `nph-blocks-data-table` | `data-table` | `<table>` de verdade, status com **texto**, ação de linha nomeia a linha, "selecionar todos" = a página |
| `nph-blocks-header` | `header` | Um `<header role="banner">`, `<nav>` "Navegação principal", nada só-ícone fica mudo |
| `nph-blocks-sidebar` | `sidebar` | `<nav>` "Seções" — rótulo **diferente** do header; recolhida mantém o nome de cada item |

## Quando o PrimeNG não entrega o que a ficha pede

Nesta ordem, e nunca mexendo no miolo do componente:

1. **`pt`** (o pass-through oficial) — foi assim que a `<table>` ganhou
   `aria-label` e o contador de notificações ganhou `aria-hidden`;
2. **uma classe nossa** na camada de estilo — foi assim que o chip de filtro
   ativo e a linha selecionada ganharam o realce da marca;
3. **registrar a divergência e não fazer nada.**

Duas divergências estão registradas hoje, ambas de menu: `p-menubar` e
`p-panelMenu` não emitem `aria-current="page"` no item ativo, e o cabeçalho
de seção do `p-panelMenu` não emite `aria-expanded`. Estão documentadas nos
componentes e nas stories.

## Banco de provas

Uma story por bloco, nas 7 marcas × 2 modos:

```bash
npx ng run stage:storybook
```

Em `Nephos Blocks/`. A barra de cima troca **Marca** e **Modo** — o seletor
de marca é andaime de teste, não produto.

## Build

```bash
npx ng build @iatec/nephos-blocks
```
