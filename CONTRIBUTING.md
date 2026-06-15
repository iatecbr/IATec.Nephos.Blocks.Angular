# Contribuindo para o Nephos

Obrigado pelo interesse em contribuir com o Nephos! Este documento descreve o processo de contribuição e as convenções do projeto.

## Requisitos

- **Node.js** >= 20.x
- **npm** >= 10.x
- **Angular CLI** 21.x (`npm install -g @angular/cli@21`)

## Primeiros Passos

```bash
# Clone o repositorio
git clone https://github.com/iatecbr/IATec.Nephos.Blocks.Angular.git
cd IATec.Nephos.Blocks.Angular

# Instale as dependencias
npm install

# Inicie o stage (aplicacao de demo)
npm start
# Acesse http://localhost:4201
```

## Estrutura do Projeto

```
projects/
├── iatec/
│   ├── nephos-layout/    # Componentes de layout (sidebar, topbar, breadcrumb, menu, profile-sidebar)
│   ├── nephos-pages/     # Paginas pre-construidas
│   └── nephos-utils/     # Utilitarios e helpers compartilhados
└── stage/                # Aplicacao de demonstracao e desenvolvimento
```

### Prefixos de Componentes

| Biblioteca        | Prefixo        |
|-------------------|----------------|
| nephos-layout     | `nph-layout`   |
| nephos-pages      | `nph-pages`    |
| nephos-utils      | `lib`          |
| stage (demo app)  | `app`          |

## Stack Tecnológica

- **Angular 21** — standalone components, signals, zoneless-ready
- **PrimeNG 21** + **PrimeIcons** — biblioteca de componentes UI
- **@primeuix/themes** — sistema de temas
- **Tailwind CSS 4** + **tailwindcss-primeui** — utilitarios CSS
- **Transloco** — internacionalizacao (i18n)
- **Angular Fire** — integracao Firebase
- **IndexedDB (idb)** — armazenamento client-side

## Fluxo de Trabalho

### 1. Crie uma branch

```bash
git checkout -b feat/nome-da-feature
# ou: fix/descricao-do-bug, docs/descricao, test/descricao
```

### 2. Desenvolva

Siga as convencoes de codigo (ver secao abaixo). Cada componente deve ter seu arquivo `.spec.ts` correspondente.

### 3. Teste

```bash
# Rodar todos os testes
npm test

# Rodar testes de uma biblioteca especifica
ng test @iatec/nephos-layout
ng test @iatec/nephos-pages
ng test @iatec/nephos-utils
```

### 4. Build

```bash
# Build do stage
npm run build

# Build de uma biblioteca
ng build @iatec/nephos-layout
```

### 5. Abra um Pull Request

- Use **conventional commits**: `feat:`, `fix:`, `docs:`, `test:`, `chore:`, `refactor:`
- Titulo do PR em portugues ou ingles, descritivo e conciso
- Inclua uma descricao do que foi alterado e por que
- Referencie issues relacionadas (ex: `Closes #123`)

## Convenções de Código

### TypeScript

- **Strict mode** ativado (`strict: true`, `strictTemplates: true`)
- **Standalone components** (sem NgModules para novos componentes)
- Use **signals** (`signal()`, `computed()`, `effect()`) para estado reativo
- Use `OnPush` change detection strategy
- Tipos explicitos em assinaturas de metodos publicos

### Estilos

- **SCSS** para estilos de componentes
- **Tailwind CSS** para utilitarios e layout
- Evite estilos inline; prefira `*.component.scss`
- Budgets: maximo 2kb por componente (warning), 4kb (error)

### Nomeação

- **Arquivos**: `kebab-case` (ex: `menu-item.component.ts`)
- **Classes**: `PascalCase` (ex: `MenuItemComponent`)
- **Seletores**: prefixo da biblioteca + `kebab-case` (ex: `nph-layout-menu-item`)
- **Servicos**: `*.service.ts` com sufixo `Service`
- **Modelos**: `*.model.ts`

### Estrutura de Diretorios por Componente

```
component-name/
├── component-name.component.ts
├── component-name.component.spec.ts
├── component-name.component.scss
├── component-name.component.html
└── index.ts               # Barrel export (opcional)
```

### Internacionalização

Use **Transloco** para qualquer texto visivel ao usuario:

```typescript
// No template
{{ 'components.menu.title' | transloco }}

// No componente
private translocoService = inject(TranslocoService);
```

## Reportando Bugs

Ao abrir uma issue de bug, inclua:

1. **Descricao clara** do problema
2. **Passos para reproduzir**
3. **Comportamento esperado** vs **comportamento atual**
4. **Versao do Angular**, **versao do Nephos** e **browser**
5. **Screenshots** ou GIFs (se aplicavel)

## Sugerindo Melhorias

Sugestoes de melhorias sao bem-vindas! Abra uma issue descrevendo:

1. **O problema** que a melhoria resolve
2. **A solucao proposta**
3. **Alternativas consideradas**

## Código de Conduta

Seja respeitoso e profissional em todas as interacoes. Contribuicoes devem promover um ambiente inclusivo e construtivo para todos os colaboradores.
