import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { LayoutService, LayoutComponent } from '@iatec/nephos-layout';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NephosTemplateComponent } from "../../projects/stage/src/app/templates/nephos/component/nephos-template.component";

const meta: Meta<LayoutComponent> = {
  title: 'Layout/Default',
  component: LayoutComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NephosTemplateComponent],
    }),
    applicationConfig({
      providers: [
        provideRouter([
          { path: '', component: LayoutComponent },
        ]),
        LayoutService,
        MessageService,
        ConfirmationService
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Layout Component

O \`LayoutComponent\` é o componente principal do sistema Nephos que fornece uma estrutura completa e responsiva de layout para aplicações empresariais, com sidebar vertical, topbar, área de conteúdo e múltiplas opções de customização.

---

## 📋 Recursos Principais

### 🎨 Interface Responsiva
- **Sidebar vertical** com múltiplos modos de exibição
- **Topbar** customizável com breadcrumb integrado
- **Profile sidebar** para informações do usuário
- **Layout container** com gap de 24px entre elementos
- **Suporte completo a mobile** e desktop

### ⚙️ Modos de Layout
- **Static**: Sidebar fixo sempre visível (padrão)
- **Static Inactive**: Sidebar recolhido (90px de largura)
- **Overlay**: Sidebar sobrepõe o conteúdo
- **Slim**: Sidebar compacto que expande ao hover
- **Slim Plus**: Versão otimizada do slim
- **Horizontal**: Menu horizontal no topo

### 🎨 Customização de Temas
- **Light Mode / Dark Mode**
- **Menu Theme**: Opções de cores para o menu
- **Primary Color**: Sistema de cores customizável
- **Configurador visual** integrado

### 📱 Responsividade
- **Desktop**: Sidebar com largura de 256px (expandido) ou 90px (recolhido)
- **Mobile**: Sidebar em modo overlay com width de 90px
- **Breakpoint**: 991px (configurável via \`_sass_variables.scss\`)

---

## 🚀 Instalação e Configuração

### 1. Instalar o Pacote

\`\`\`bash
npm install @iatec/nephos-layout
\`\`\`

### 2. Importar no Módulo/Component

\`\`\`typescript
import { LayoutComponent } from '@iatec/nephos-layout';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  providers: [provideAnimations()],
  template: \`
    <nph-layout>
      <ng-template #logo>
        <img src="assets/logo.svg" alt="Logo" />
      </ng-template>
    </nph-layout>
  \`
})
export class AppComponent {}
\`\`\`

### 3. Configurar Providers (necessário)

\`\`\`typescript
import { LayoutService } from '@iatec/nephos-layout';
import { MessageService, ConfirmationService } from 'primeng/api';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    LayoutService,
    MessageService,
    ConfirmationService
  ]
});
\`\`\`

---

## 📝 Uso Básico

### Layout padrão

\`\`\`typescript
<nph-layout>
  <ng-template #logo>
    <img src="assets/logo.svg" alt="Logo" />
  </ng-template>
</nph-layout>
\`\`\`

### Layout com Menu Customizado

\`\`\`typescript
import { LayoutService } from '@iatec/nephos-layout';

export class AppComponent {
  constructor(private layoutService: LayoutService) {
    this.layoutService.config.update((config) => ({
      ...config,
      menuMode: 'static',
      colorScheme: 'light',
      menuTheme: 'colorScheme'
    }));
  }
}
\`\`\`

---

## 🎯 Content Projection (Templates)

O componente aceita **três templates** via \`@ContentChild\` para customização:

### 1. **#logo** - Logo da Aplicação
Template para o logo exibido no topo do sidebar.

\`\`\`html
<ng-template #logo>
  <img src="assets/logo.svg" alt="Logo" />
</ng-template>
\`\`\`

**Quando usar**: Sempre que precisar de um logo customizado.

### 2. **#topbar** - Topbar Customizado
Template para substituir ou complementar o topbar padrão.

\`\`\`html
<ng-template #topbar>
  <div class="custom-topbar">
    <button (click)="onNotifications()">
      <i class="pi pi-bell"></i>
    </button>
  </div>
</ng-template>
\`\`\`

**Quando usar**: Para adicionar botões, notificações ou elementos customizados no topbar.

### 3. **#profileSidebar** - Profile Sidebar
Template para o conteúdo do sidebar de perfil do usuário.

\`\`\`html
<ng-template #profileSidebar>
  <div class="profile-content">
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
    <button (click)="logout()">Sair</button>
  </div>
</ng-template>
\`\`\`

**Quando usar**: Para exibir informações do usuário, configurações ou ações de perfil.

---

## 🎨 Configurações Disponíveis

### LayoutService Config

\`\`\`typescript
interface LayoutConfig {
  ripple: boolean;              // Efeito ripple nos botões
  inputStyle: 'outlined' | 'filled';
  menuMode: 'static' | 'overlay' | 'slim' | 'slim-plus' | 'horizontal';
  colorScheme: 'light' | 'dark';
  theme: string;                // Nome do tema
  scale: number;                // Escala da interface (12-16)
  menuTheme: 'colorScheme' | 'primaryColor' | 'transparent';
}
\`\`\`

### Exemplo de Uso

\`\`\`typescript
this.layoutService.config.update((config) => ({
  ...config,
  menuMode: 'static',
  colorScheme: 'light',
  menuTheme: 'colorScheme',
  scale: 14
}));
\`\`\`

---

## 🎨 Design Tokens

O layout utiliza design tokens SCSS para customização:

### Cores
- \`$sidebar-bg\`: #D8E6FD
- \`$sidebar-border\`: #B1CDFB
- \`$primary-blue\`: #3B82F6
- \`$icon-color\`: #64748B

### Espaçamentos
- \`$gap-xs\`: 8px
- \`$gap-sm\`: 12px
- \`$gap-md\`: 16px
- \`$gap-lg\`: 24px

### Dimensões
- \`$sidebar-width\`: 90px (recolhido) / 256px (expandido)
- \`$sidebar-item-size\`: 43px
- \`$breakpoint\`: 991px

---

## 📱 Comportamento Responsivo

### Desktop (≥ 991px)
- Sidebar com largura de **256px** (modo static)
- Botão de toggle para recolher/expandir
- Layout com gap de **24px** entre sidebar e content

### Tablet/Mobile (< 991px)
- Sidebar em modo **overlay** com width de 90px
- Menu toggle no topbar
- Elementos secundários ocultos automaticamente
- Breadcrumb "Todas as Aplicações" oculto

---

## 🔧 Personalização Avançada

### Customizar Cores do Sidebar

Edite o arquivo \`_sidebar_vertical.scss\`:

\`\`\`scss
$sidebar-bg: #1E293B;              // Dark mode
$sidebar-border: #334155;
$primary-blue: #0EA5E9;            // Custom blue
\`\`\`

### Customizar Breakpoints

Edite o arquivo \`_sass_variables.scss\`:

\`\`\`scss
$breakpoint: 1200px;  // Novo breakpoint
\`\`\`

---

## 📚 Exemplos de Uso

### Exemplo 1: Layout com Dark Mode

\`\`\`typescript
this.layoutService.config.update((config) => ({
  ...config,
  colorScheme: 'dark',
  menuTheme: 'colorScheme'
}));
\`\`\`

### Exemplo 2: Layout com Sidebar Overlay

\`\`\`typescript
this.layoutService.config.update((config) => ({
  ...config,
  menuMode: 'overlay'
}));
\`\`\`

### Exemplo 3: Layout Totalmente Customizado

\`\`\`html
<nph-layout>
  <ng-template #logo>
    <div class="custom-logo">
      <img src="assets/brand.svg" />
    </div>
  </ng-template>
  
  <ng-template #topbar>
    <app-custom-topbar />
  </ng-template>
  
  <ng-template #profileSidebar>
    <app-user-profile />
  </ng-template>
</nph-layout>
\`\`\`

---

## ⚠️ Troubleshooting

### Sidebar não aparece
- Verifique se \`LayoutService\` está nos providers
- Confirme que \`provideAnimations()\` está configurado

### Tema não muda
- Use \`LayoutService.config.update()\` ao invés de mutar diretamente
- Verifique se os arquivos de tema estão importados

### Responsividade não funciona
- Verifique o breakpoint em \`_sass_variables.scss\`
- Confirme que o CSS foi compilado corretamente

---

## 🔗 Links Úteis

- [Documentação do PrimeNG](https://primeng.org/)
- [Angular Signals](https://angular.io/guide/signals)
- [Guia de Estilos do Layout](./GuiaEstilos.mdx)
- [Configuração Avançada](./Configuracao.mdx)

---
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<LayoutComponent>;

export const Static: Story = {
  render: () => ({
    template: `
        <app-nephos-template>
        </app-nephos-template>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: `
### 📌 Layout Static (Fixo)

O modo **Static** é o layout padrão do Nephos, ideal para aplicações desktop com navegação frequente.

**Características:**
- ✅ Sidebar sempre visível em telas desktop (≥ 991px)
- ✅ Largura de 256px (expandido) ou 90px (recolhido)
- ✅ Botão de toggle para recolher/expandir
- ✅ Gap de 24px entre sidebar e conteúdo
- ✅ Transição suave de 0.3s ao expandir/recolher

**Quando usar:**
- Aplicações desktop-first
- Dashboards com navegação constante
- Sistemas administrativos

**Como configurar:**
\`\`\`typescript
this.layoutService.config.update((config) => ({
  ...config,
  menuMode: 'static'
}));
\`\`\`

**Dica:** Use o configurador visual (⚙️ no topbar) para testar outros modos.
        `
      }
    }
  }
};