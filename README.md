# Nephos Blocks 3.0.0 - Biblioteca de Componentes Angular

> 🎉 **Nova Versão 3.0.0** - Reset completo com Storybook integrado e documentação visual completa!

Bem-vindo ao repositório oficial do **Nephos Blocks**, a biblioteca Angular que implementa o Design System do IATec, oferecendo um conjunto rico e coeso de componentes UI baseados em PrimeNG para desenvolvedores que buscam uniformidade, eficiência e facilidade de uso em suas aplicações.

## 🚀 Novidades da Versão 3.0.0

A versão 3.0.0 traz mudanças significativas:

- ✨ **Storybook Integrado**: Documentação visual e interativa de todos os componentes
- 📐 **Design System Estruturado**: Tokens, tipografia, cores e guidelines documentados
- 🧩 **3 Seções Claras**: Design System, Componentes PrimeNG e Blocos customizados
- 🎯 **Padrão de Qualidade**: Documentação inspirada no Canvas Kit da Workday
- 🔄 **Base Limpa**: Componentes reorganizados e padronizados
- 📦 **Nomes Mantidos**: Compatibilidade garantida (nephos-layout, nephos-pages, nephos-utils)

## 📚 Documentação Interativa

Execute o Storybook para explorar todos os componentes:

```bash
npm install
npm run storybook
```

Acesse: http://localhost:6006

## 🎯 Sobre o Projeto

O Nephos Blocks é uma iniciativa para proporcionar aos desenvolvedores Angular acesso direto aos componentes visuais e funcionalidades definidos pelo Design System do IATec. Nosso objetivo é facilitar a criação de interfaces de usuário consistentes e atraentes, seguindo as melhores práticas de design e desenvolvimento.

### Principais Características

- 📚 **Storybook Integrado**: Documentação visual interativa com exemplos ao vivo
- 🎨 **Design System Completo**: Tokens, tipografia, cores, espaçamentos e guidelines
- 🧱 **Blocos Documentados**: Componentes customizados com documentação completa
- 🧩 **PrimeNG Customizado**: Componentes base do PrimeNG com temas e customizações Nephos
- 📦 **3 Bibliotecas**:
  - **nephos-layout**: Componentes de layout, estrutura e navegação
  - **nephos-pages**: Páginas e templates pré-construídos
  - **nephos-utils**: Utilitários, helpers e serviços compartilhados
- 🔄 **Responsividade e Acessibilidade**: Componentes totalmente responsivos e acessíveis (WCAG 2.1 AA)
- 💻 **Angular 21+**: Suporte às últimas versões do Angular
- 🎯 **Padrão Canvas Kit**: Documentação de alta qualidade inspirada em líderes da indústria

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm 10+
- Angular 21+

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd IATec.Nephos.Blocks.Angular

# Checkout na branch 3.0.0
git checkout Versions/3.0.0

# Instale as dependências
npm install

# Execute o Storybook
npm run storybook

# Ou execute o projeto stage
npm start
```

📖 **[Guia Completo de Primeiros Passos](./PRIMEIROS-PASSOS.md)**

## 📖 Documentação

### Guias Disponíveis

- 📘 [**Visão Geral Completa**](./NEPHOS-3.0.0-README.md) - Documentação completa da versão 3.0.0
- 🚀 [**Primeiros Passos**](./PRIMEIROS-PASSOS.md) - Guia rápido para começar
- 📊 [**Status do Projeto**](./STATUS-PROJETO.md) - Status atual e próximos passos
- 🔄 [**Guia de Migração**](./MIGRATION-GUIDE.md) - Como migrar de versões anteriores
- 🏗️ [**Guia de Reset das Libs**](./GUIA-RESET-LIBS.md) - Estrutura das bibliotecas

### Storybook

O Storybook está organizado em 3 seções principais:

#### 1. 📐 Design System
Fundamentos de design:
- Tokens de design
- Tipografia
- Cores
- Espaçamentos
- Guidelines e princípios

#### 2. 🧩 Componentes PrimeNG
- Referências aos componentes PrimeNG
- Customizações aplicadas
- Temas e variações
- Links para documentação oficial

#### 3. 🧱 Blocos
Componentes customizados completos:
- Aparência exata funcionando
- Exemplos de uso
- Código de importação
- API completa (inputs/outputs)
- Variações disponíveis
- Considerações de acessibilidade

## 💻 Como Usar as Bibliotecas

### Instalação via npm

```bash
npm install @iatec/nephos-layout @iatec/nephos-pages @iatec/nephos-utils
```

### Importação em seu Projeto

```typescript
// Layout components
import { NephosLayoutModule } from '@iatec/nephos-layout';

// Page templates
import { NephosPagesModule } from '@iatec/nephos-pages';

// Utilities
import { NephosUtilsModule } from '@iatec/nephos-utils';

@NgModule({
  imports: [
    NephosLayoutModule,
    NephosPagesModule,
    NephosUtilsModule
  ]
})
export class AppModule { }
```

### Exemplo de Uso

```typescript
import { Component } from '@angular/core';
import { TopbarComponent, SidebarComponent } from '@iatec/nephos-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopbarComponent, SidebarComponent],
  template: `
    <nephos-topbar></nephos-topbar>
    <nephos-sidebar></nephos-sidebar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent { }
```

Para exemplos completos, consulte o Storybook.

## 🏗️ Estrutura do Projeto

```
IATec.Nephos.Blocks.Angular/
├── .storybook/              # Configuração do Storybook
├── stories/                 # Documentação Storybook
│   ├── design-system/      # Design System (tokens, cores, etc)
│   ├── components-primeng/ # Componentes PrimeNG
│   └── blocos/             # Blocos customizados
├── projects/
│   ├── iatec/
│   │   ├── nephos-layout/  # 📦 Biblioteca de layout
│   │   ├── nephos-pages/   # 📦 Biblioteca de páginas
│   │   └── nephos-utils/   # 📦 Biblioteca de utilitários
│   └── stage/              # Projeto de validação
├── PRIMEIROS-PASSOS.md     # Guia de início rápido
├── NEPHOS-3.0.0-README.md  # Documentação completa
├── MIGRATION-GUIDE.md      # Guia de migração
└── package.json
```

## 🧩 Bibliotecas

### @iatec/nephos-layout
Componentes de layout e estrutura visual:
- Topbar (barra superior)
- Sidebar (menu lateral com variações)
- Breadcrumb (trilha de navegação)
- Footer (rodapé)
- Layouts completos

### @iatec/nephos-pages
Páginas e templates pré-construídos:
- Página vazia
- Headers customizados
- Páginas de erro (404, 500)
- Templates de autenticação
- Dashboards

### @iatec/nephos-utils
Utilitários e recursos compartilhados:
- Constantes globais
- Diretivas customizadas
- Helpers e funções utilitárias
- HTTP interceptors
- Serviços compartilhados
- Tipos TypeScript

## 🎨 Design System

O Nephos Blocks 3.0.0 implementa um design system completo:

- **Tokens**: Valores reutilizáveis para cores, espaçamentos, tipografia
- **Componentes Base**: PrimeNG customizado com tema Nephos
- **Blocos**: Componentes de alto nível compostos

Tudo documentado visualmente no Storybook.

## 🔧 Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
npm start              # Executa projeto stage
npm run storybook      # Executa Storybook

# Build
npm run build          # Build de todas as libs
npm run build-storybook # Build do Storybook

# Testes
npm test               # Executa todos os testes
```

### Criar Novo Componente

1. Use o template: [stories/blocos/TEMPLATE.stories.ts](./stories/blocos/TEMPLATE.stories.ts)
2. Adapte para seu componente
3. Siga o padrão de documentação
4. Inclua exemplos práticos

## 🤝 Contribuindo

1. Clone o repositório
2. Crie uma branch a partir de `Versions/3.0.0`
3. Desenvolva seguindo os padrões estabelecidos
4. Documente no Storybook
5. Teste completamente
6. Crie um Pull Request

### Padrões de Código

- Angular best practices
- Componentes standalone quando possível
- OnPush change detection
- Acessibilidade WCAG 2.1 AA
- Documentação completa no Storybook

## 📞 Equipe e Contatos

### Alinhamentos Necessários

- **Design System**: Ziza (tokens, cores, tipografia, guidelines)
- **Customizações PrimeNG**: Indiane (validação de customizações)
- **Desenvolvimento**: Time Nephos

## 🔗 Recursos Externos

- [Angular](https://angular.dev/)
- [PrimeNG](https://primeng.org/)
- [Storybook](https://storybook.js.org/)
- [Canvas Kit (Referência)](https://workday.github.io/canvas-kit/)
- [Tailwind CSS](https://tailwindcss.com/)

## ⚠️ Importante

### Versão 3.0.0 - Breaking Changes

Esta é uma versão major com mudanças significativas. Se você está migrando de uma versão anterior:

📖 **Consulte o [Guia de Migração](./MIGRATION-GUIDE.md)**

### Próximos Passos Após Instalação

1. ✅ Execute `npm install`
2. ✅ Execute `npm run storybook` para ver a documentação
3. ✅ Leia os [Primeiros Passos](./PRIMEIROS-PASSOS.md)
4. ✅ Consulte o [Status do Projeto](./STATUS-PROJETO.md)

## 📄 Licença

[Incluir informações de licença]

---

## 🎯 Status Atual

**Versão**: 3.0.0  
**Branch**: Versions/3.0.0  
**Status**: ✅ Estrutura Base Implementada

### O que está pronto:
- ✅ Storybook configurado
- ✅ Estrutura das 3 seções criada
- ✅ Documentação base completa
- ✅ Templates e guias disponíveis
- ✅ Padrões estabelecidos

### Próximos passos:
- Alinhamento com Ziza (Design System)
- Validação com Indiane (PrimeNG)
- Reset completo das libs
- Documentação de todos os blocos

📊 **Progresso Geral**: ~38%

Consulte [STATUS-PROJETO.md](./STATUS-PROJETO.md) para detalhes completos.

---

## 📝 Configuração Inicial (Primeira Vez)

1. **Instale o Node.js e npm:**
Certifique-se de ter o Node.js e npm instalados em sua máquina. Você pode baixar a versão mais recente do Node.js em [nodejs.org](https://nodejs.org/).


2. **Configure as credências npm:**
Na raiz do usuário, edite o arquivo `.npmrc` e adicione as credenciais do IATec subistituindo os valores entre `#{}`:
```.npmrc
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
## Contribuindo

A contribuição para o Nephos é muito bem-vinda! Seja adicionando novos componentes, melhorando a documentação ou reportando bugs, sua ajuda é fundamental para o crescimento deste projeto. Veja nosso guia de contribuição para saber como começar.
