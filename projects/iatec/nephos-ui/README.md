# @iatec/nephos-ui

Os primitivos do Design System **Nephos** — as peças `origin: nephos-own`,
isto é, as que o PrimeNG **não** tem.

> **Componente do PrimeNG não se reescreve.** O que é nosso é a identidade
> (cor de marca + tipografia) e a composição. Se a peça existe no PrimeNG,
> ela se usa direto e só se **documenta** na ficha — ver
> `design-system/AGENTS.md` › Fronteiras do sistema.

Cada componente daqui responde a uma ficha em
`design-system/componentes/<id>.meta.ts`, que é o **contrato de uso**: API,
estados, anti-padrões, a11y e desambiguação. Ao mexer no componente, leia a
ficha antes — e se a mudança alterar a API, a ficha muda junto (e depois
`npm run build:index`).

## Instalação no app

```scss
/* styles.scss */
@use '@iatec/nephos-ui/lib/nephos-ui.scss';
```

Esse arquivo é a **camada de token** do pacote: escala tipográfica nomeada,
`visually-hidden`, e as classes de link, rótulo, texto de apoio, logo e
botão de ícone. Nenhum componente escreve px nem cor — todos consomem
daqui, e as cores vêm das variáveis `--p-*` do preset Nephos.

Dois pré-requisitos que o pacote **não** embute, porque são configuração do
app:

| | O que o Nephos declara | Estado no repositório |
|---|---|---|
| Ícones | **Font Awesome** (`fa-solid fa-<nome>`), nunca PrimeIcons | Só no Storybook, edição Free. O kit **Pro** e a sobrescrita dos ícones internos do PrimeNG seguem em aberto |
| Fonte | **Noto Sans** | O layout do repo entrega **Poppins** — conflito em aberto |

## A vertical ativa

```ts
providers: [provideNephosBrand({ name, logoFull, logoSymbol })]
```

Nenhum componente sabe em qual das 7 verticais roda. Nome e logo chegam
pelo token `NEPHOS_BRAND`, como o `primary` chega pelo tema. **Nunca**
escreva o nome de uma marca num template, e **nunca** ofereça um seletor de
vertical ao usuário — o único eixo que a pessoa escolhe é claro/escuro.

## Componentes

| Seletor | Ficha | Para quê |
|---|---|---|
| `nph-ui-heading` | `heading` | Título — nível é hierarquia, tamanho é aparência |
| `nph-ui-text` | `text` | Corpo de texto; ênfase é significado, não estética |
| `nph-ui-label` | `label` | Rótulo de campo (associação `for`/`id` obrigatória) |
| `nph-ui-helper-text` | `helper-text` | Ajuda/erro do campo, ligados por `aria-describedby` |
| `nph-ui-link` | `link` | Navegação — `<a>` navega, `<button>` age |
| `nph-ui-icon` | `icon` | Ícone Font Awesome, decorativo ou significativo |
| `nph-ui-logo` | `logo` | Marca da vertical ativa, servida pelo contexto |
| `nph-ui-theme-toggle` | `theme-toggle` | Claro/escuro via `.app-dark` |

## Banco de provas

Uma story por componente, nas 7 marcas × 2 modos:

```bash
npx ng run stage:storybook
```

Em `Nephos UI/Átomos/`. A barra de cima troca **Marca** e **Modo** — o
seletor de marca é andaime de teste, não produto.

## Build

```bash
npx ng build @iatec/nephos-ui
```
