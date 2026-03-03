import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { LayoutService, LayoutComponent } from '@iatec/nephos-layout';
import { ConfirmationService, MessageService } from 'primeng/api';

const meta: Meta<LayoutComponent> = {
  title: 'Layout/Default',
  component: LayoutComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        provideRouter([
          { path: '', component: LayoutComponent },
          { path: '**', component: LayoutComponent }
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

O componente \`LayoutComponent\` fornece uma estrutura completa de layout com sidebar, topbar e área de conteúdo.

## Recursos

- Sidebar responsivo com múltiplos modos
- Topbar customizável
- Profile sidebar
- Breadcrumb integrado
- Configurador de layout
- Suporte a temas

## Uso

\`\`\`typescript
import { LayoutComponent } from '@iatec/nephos-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
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

## Content Projection

O componente aceita três templates via \`@ContentChild\`:

- **logo**: Template para o logo no sidebar
- **topbar**: Template customizado para o topbar
- **profileSidebar**: Template para o conteúdo do profile sidebar
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
      <nph-layout>
        <ng-template #logo>
          <div style="padding: 1rem; text-align: center;">
            <h2 style="color: var(--primary-color); margin: 0;">Nephos</h2>
          </div>
        </ng-template>
      </nph-layout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Layout com sidebar fixo (modo static). O sidebar permanece sempre visível no desktop. Use o configurador visual (ícone de engrenagem no topbar) para testar outros modos.'
      }
    }
  }
};

export const Overlay: Story = {
  render: () => ({
    template: `
      <nph-layout>
        <ng-template #logo>
          <div style="padding: 1rem; text-align: center;">
            <h2 style="color: var(--primary-color); margin: 0;">Nephos</h2>
          </div>
        </ng-template>
      </nph-layout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Layout com sidebar em overlay. Use o configurador (ícone ⚙️) para alterar o modo para "overlay". O sidebar sobrepõe o conteúdo quando aberto.'
      }
    }
  }
};

export const Slim: Story = {
  render: () => ({
    template: `
      <nph-layout>
        <ng-template #logo>
          <div style="padding: 1rem; text-align: center;">
            <h2 style="color: var(--primary-color); margin: 0;">N</h2>
          </div>
        </ng-template>
      </nph-layout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Layout com sidebar compacto (slim). Use o configurador para alterar para modo "slim". O menu expande ao passar o mouse.'
      }
    }
  }
};

export const SlimPlus: Story = {
  render: () => ({
    template: `
      <nph-layout>
        <ng-template #logo>
          <div style="padding: 1rem; text-align: center;">
            <h2 style="color: var(--primary-color); margin: 0;">N</h2>
          </div>
        </ng-template>
      </nph-layout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Layout com sidebar slim-plus. Use o configurador para alterar para modo "slim-plus". Exibe ícones e labels de forma compacta.'
      }
    }
  }
};

export const Horizontal: Story = {
  render: () => ({
    template: `
      <nph-layout>
        <ng-template #logo>
          <div style="padding: 1rem;">
            <h2 style="color: var(--primary-color); margin: 0;">Nephos</h2>
          </div>
        </ng-template>
      </nph-layout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Layout com menu horizontal no topo da página. Use o configurador para alterar para modo "horizontal".'
      }
    }
  }
};

export const DarkTheme: Story = {
  render: () => ({
    template: `
      <nph-layout>
        <ng-template #logo>
          <div style="padding: 1rem; text-align: center;">
            <h2 style="color: var(--primary-color); margin: 0;">Nephos</h2>
          </div>
        </ng-template>
      </nph-layout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Layout com tema escuro. Use o configurador (ícone ⚙️) e ative a opção "Dark Mode" para ver o tema escuro em ação.'
      }
    }
  }
};

export const PrimaryColorMenu: Story = {
  render: () => ({
    template: `
      <nph-layout>
        <ng-template #logo>
          <div style="padding: 1rem; text-align: center;">
            <h2 style="color: white; margin: 0;">Nephos</h2>
          </div>
        </ng-template>
      </nph-layout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Layout com menu usando a cor primária como tema. Use o configurador e altere "Menu Theme" para "Primary Color".'
      }
    }
  }
};

export const ComCustomizacao: Story = {
  render: () => ({
    template: `
      <nph-layout>
        <ng-template #logo>
          <div style="padding: 1.5rem; text-align: center; border-bottom: 1px solid var(--surface-border);">
            <img src="https://www.primefaces.org/cdn/primeng/images/primeng.svg" 
                 alt="PrimeNG Logo" 
                 style="height: 2rem;" />
          </div>
        </ng-template>
        
        <ng-template #topbar>
          <div style="display: flex; align-items: center; gap: 1rem; padding: 0 1rem;">
            <i class="pi pi-bell" style="font-size: 1.25rem; cursor: pointer;"></i>
            <i class="pi pi-cog" style="font-size: 1.25rem; cursor: pointer;"></i>
            <i class="pi pi-user" style="font-size: 1.25rem; cursor: pointer;"></i>
          </div>
        </ng-template>
        
        <ng-template #profileSidebar>
          <div style="padding: 2rem;">
            <div style="text-align: center; margin-bottom: 2rem;">
              <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary-color); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 2rem;">
                <i class="pi pi-user"></i>
              </div>
              <h3 style="margin: 0 0 0.5rem 0;">John Doe</h3>
              <p style="color: var(--text-color-secondary); margin: 0;">john.doe@example.com</p>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <button style="padding: 0.75rem; border: 1px solid var(--surface-border); background: transparent; border-radius: 6px; cursor: pointer; text-align: left;">
                <i class="pi pi-user" style="margin-right: 0.5rem;"></i> Meu Perfil
              </button>
              <button style="padding: 0.75rem; border: 1px solid var(--surface-border); background: transparent; border-radius: 6px; cursor: pointer; text-align: left;">
                <i class="pi pi-cog" style="margin-right: 0.5rem;"></i> Configurações
              </button>
              <button style="padding: 0.75rem; border: 1px solid var(--surface-border); background: transparent; border-radius: 6px; cursor: pointer; text-align: left;">
                <i class="pi pi-sign-out" style="margin-right: 0.5rem;"></i> Sair
              </button>
            </div>
          </div>
        </ng-template>
      </nph-layout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo completo de layout com customizações no logo, topbar e profile sidebar usando templates. Clique no ícone de usuário no topbar para ver o profile sidebar customizado.'
      }
    }
  }
};
