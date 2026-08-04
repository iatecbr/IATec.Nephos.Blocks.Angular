# Nephos — Design System da IATec em Angular

Biblioteca de componentes Angular sobre **PrimeNG 21**, com tema multimarca (7
verticais) e uma camada de documentação escrita para ser lida por **IA**.

> 🤖 **Vai gerar interface neste repositório — você ou um agente?**
> Leia primeiro o **[`CLAUDE.md`](./CLAUDE.md)** / **[`AGENTS.md`](./AGENTS.md)** da raiz.
> A regra do projeto é consultar o Design System **antes** de emitir qualquer HTML.

---

## Os pacotes

Cinco bibliotecas publicadas no feed privado `IATec.Community`, mais um app de
demonstração que serve de banco de provas.

| Pacote | O que guarda |
|---|---|
| `@iatec/nephos-ui` | os 8 **primitivos**, a camada de token (`--nph-*`) e **o tema das 7 marcas** |
| `@iatec/nephos-blocks` | os 7 **blocos** — composições prontas (busca com filtros, tabela gerenciável, confirmação destrutiva…) |
| `@iatec/nephos-pages` | as **páginas**: `listing`, `detail-form`, `dashboard` |
| `@iatec/nephos-layout` | os **layouts**: `auth`, `app-shell` — e as fontes |
| `@iatec/nephos-utils` | serviços, diretivas e helpers, sem componente visual |

`@iatec/nephos-ui` é a base: os outros três pacotes visuais o declaram como
`peerDependency`. Quem instalar `layout`, `blocks` ou `pages` **precisa instalá-lo
junto** — sem ele a tela renderiza sem espaçamento nenhum, e sem erro.

## Rodando o repositório

### Pré-requisitos

Além de Node 18+ e Angular CLI, **duas credenciais** — sem elas o `npm install` falha:

**1. O feed `@iatec`.** No `.npmrc` do seu usuário (não do projeto), substituindo os
valores entre `#{}`:

```
registry=https://registry.npmjs.org/
@iatec:registry=#{NPM_iatec_host_community}#

always-auth=true

; begin auth token
//sda-iatec.pkgs.visualstudio.com/_packaging/IATec.Community/npm/registry/:username=#{NPM_Username}#
//sda-iatec.pkgs.visualstudio.com/_packaging/IATec.Community/npm/registry/:_password=#{Base64_Password}#
//sda-iatec.pkgs.visualstudio.com/_packaging/IATec.Community/npm/registry/:email=#{NPM_email}#
//sda-iatec.pkgs.visualstudio.com/_packaging/IATec.Community/npm/:username=#{NPM_Username}#
//sda-iatec.pkgs.visualstudio.com/_packaging/IATec.Community/npm/:_password=#{Base64_Password}#
//sda-iatec.pkgs.visualstudio.com/_packaging/IATec.Community/npm/:email=#{NPM_email}#
; end auth token
```

**2. O Font Awesome Pro**, que é licenciado e não existe no npm público:

```bash
npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" <TOKEN>
```

Sem esse segundo passo o `npm install` para com **404** no
`@fortawesome/fontawesome-pro`. No CI a credencial entra pelo `.npmrc.pipeline`,
como a variável `FONTAWESOME_TOKEN`.

### Comandos

```bash
npm install
npm run storybook     # banco de provas em localhost:6006
npm start             # app de demonstração `stage`
```

### ⚠️ A ordem de build das bibliotecas importa

```bash
npx ng build @iatec/nephos-ui        # SEMPRE primeiro
npx ng build @iatec/nephos-blocks
npx ng build @iatec/nephos-pages
npx ng build @iatec/nephos-layout
npx ng build @iatec/nephos-utils
```

O `ng-packagr` **não compila o código-fonte de outra biblioteca** — resolve pelo pacote
já construído. Fora de ordem, a build quebra com `Cannot destructure property 'pos' of
'file.referencedFiles[index]'`, mensagem que não diz nada sobre a causa.

## Usando num projeto

A fonte da verdade é o **`design-system/design.md` › Instalação e configuração**, servido
também pelo MCP (`nephos_foundations("setup")`). O resumo:

```bash
npm install @iatec/nephos-ui @iatec/nephos-layout @iatec/nephos-blocks @iatec/nephos-pages
```

**No `styles.scss`, e a ordem importa** — o `nephos-ui.scss` declara os tokens `--nph-*`
em `:root` e os blocos só os gastam; invertido, ficam sem medida:

```scss
@use '@fortawesome/fontawesome-pro/css/all.css';
@use '@iatec/nephos-layout/lib/layout/layout.scss';
@use '@iatec/nephos-ui/lib/nephos-ui.scss';
@use '@iatec/nephos-blocks/lib/nephos-blocks.scss';
```

**Os dois providers.** Sem o tema, os componentes do PrimeNG renderizam sem nenhuma
variável `--p-*`; sem a marca, nenhum componente sabe qual logo mostrar:

```typescript
import { nephosPreset, provideNephosBrand } from '@iatec/nephos-ui';
import { providePrimeNG } from 'primeng/config';

providers: [
  providePrimeNG({
    theme: { preset: nephosPreset(marca), options: { darkModeSelector: '.app-dark' } }
  }),
  provideNephosBrand({ name, logoFull, logoSymbol }),
]
```

⚠️ **A vertical nunca é escolha do usuário** — vem do ambiente (domínio, tenant, sessão).
Não gere seletor de marca. Claro/escuro é a exceção: pode ser controle de produto, e o
seletor é a classe `.app-dark` na raiz.

As bibliotecas são **standalone** — importe os componentes direto, não há NgModule:

```typescript
import { Component } from '@angular/core';
import { LayoutComponent } from '@iatec/nephos-layout';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  template: `<nph-layout><router-outlet /></nph-layout>`
})
export class AppComponent {}
```

## O Design System

`design-system/` é a camada que a IA lê — **não é um site de documentação para humanos**:

- **`design.md`** — a especificação normativa (cor por papel+passo, escala tipográfica,
  ícones, multimarca, instalação);
- **`componentes/<id>.meta.ts`** — **110 fichas**, uma por peça, com API, estados,
  anti-padrões, acessibilidade e desambiguação;
- **`nephos-index.json`** — o catálogo agregado, **gerado** das fichas (`npm run
  build:index`) e versionado. O pipeline confere e falha se estiver defasado;
- **`mcp/`** — o servidor MCP `nephos-ds`, que serve tudo isso por ferramenta;
- **`skill/`** — as skills de construção e de auditoria de fidelidade.

## Estrutura

```
├── CLAUDE.md · AGENTS.md      # a porta de entrada para agentes
├── .storybook/                # config do Storybook (a da raiz é a usada)
├── design-system/             # a documentação que a IA lê
├── projects/
│   ├── iatec/                 # as 5 bibliotecas publicadas
│   └── stage/                 # app de demonstração + as stories do banco de provas
└── azure-pipelines.yml        # + um por biblioteca, dentro de cada pasta
```

## Contribuindo

- Branch a partir de `Versions/3.0.0`; `main`, `Versions/3.0.0` e
  `Versions/3.0.0_backup` **não se tocam**.
- Componentes standalone, `OnPush`, acessibilidade WCAG 2.1 AA.
- **Não reescreva componente do PrimeNG** — componha. Quando a API não cobre o
  requisito, o caminho é o `pt` (pass-through oficial), depois uma classe na camada de
  token, e por último registrar a divergência sem fazer nada.
- Toda peça nova ganha **uma story** no banco de provas e **uma ficha** em
  `design-system/componentes/`.
- Antes de entregar, rode a auditoria `design-system/skill/nephos-token-audit`.

## Links

- [Angular](https://angular.dev/) · [PrimeNG](https://primeng.org/) ·
  [Storybook](https://storybook.js.org/) · [Font Awesome](https://fontawesome.com/icons)
