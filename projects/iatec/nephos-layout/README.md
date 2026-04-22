# @iatec/nephos-layout

Biblioteca de layout para aplicações Angular baseada no tema **Apollo** da PrimeTek (v21.0.0).  
Fornece componentes de layout responsivos, múltiplos modos de menu (static, overlay, slim, slim-plus, horizontal, reveal, drawer) e suporte a temas claro/escuro.

---

## Instalação

```bash
npm install @iatec/nephos-layout
```

Dependências peer:
- `@angular/common` >= 21.0.0
- `@angular/core` >= 21.0.0
- `@jsverse/transloco` >= 8.0.0
- `primeng` >= 21.0.0
- `@primeuix/themes` >= 2.0.0

---

## Uso Básico

```typescript
import { Component } from '@angular/core';
import { LayoutComponent, LayoutService } from '@iatec/nephos-layout';

@Component({
    selector: 'app-root',
    imports: [LayoutComponent],
    template: `
        <nph-layout>
            <ng-template #logo>
                <img src="assets/logo.png" alt="Logo" />
            </ng-template>
            <ng-template #topbar>
                <button (click)="logout()">Sair</button>
            </ng-template>
        </nph-layout>
    `
})
export class AppComponent {
    constructor(private layoutService: LayoutService) {
        this.layoutService.layoutConfig.update(config => ({
            ...config,
            menuMode: 'static',
            menuTheme: 'colorScheme',
            darkTheme: false,
        }));
    }
}
```

### Prover menus dinamicamente

```typescript
import { MenuService } from '@iatec/nephos-layout';
import type { MenuItem } from 'primeng/api';

// Em um serviço ou componente
this.menuService.menus = [
    {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: ['/']
    },
    {
        label: 'Cadastros',
        icon: 'pi pi-users',
        items: [
            { label: 'Usuários', icon: 'pi pi-user', routerLink: ['/users'] }
        ]
    }
] as MenuItem[];
```

---

## Atualização Apollo 21.0.0 (Breaking Changes)

Se você está atualizando de uma versão anterior do `@iatec/nephos-layout`, **leia esta seção com atenção**.

### 1. Renomeações no `LayoutState`

| Antes (deprecated) | Depois (novo) | Notas |
|---|---|---|
| `layoutState.sidebarActive` | `layoutState.sidebarExpanded` | Usado em modos `drawer` e `reveal` |
| `layoutState.staticMenuDesktopInactive` | `layoutState.staticMenuInactive` | Controle do menu static em desktop |
| `layoutState.staticMenuMobileActive` | `layoutState.mobileMenuActive` | Controle do menu em mobile |

**Como atualizar:**
```typescript
// ❌ Antes
if (this.layoutService.layoutState().sidebarActive) { ... }

// ✅ Depois
if (this.layoutService.layoutState().sidebarExpanded) { ... }
```

### 2. Renomeações de métodos no `LayoutService`

| Antes (deprecated) | Depois (novo) | Comportamento |
|---|---|---|
| `layoutService.onMenuToggle()` | `layoutService.toggleMenu()` | **Mudou:** Agora toggle (abre/fecha), não abre sempre |
| `layoutService.showProfileSidebar()` | `layoutService.toggleProfileSidebar()` | **Mudou:** Agora toggle, não abre sempre |
| `layoutService.showConfigSidebar()` | `layoutService.toggleConfigSidebar()` | **Mudou:** Agora toggle, não abre sempre |

**Como atualizar:**
```typescript
// ❌ Antes
this.layoutService.onMenuToggle();
this.layoutService.showProfileSidebar();

// ✅ Depois
this.layoutService.toggleMenu();
this.layoutService.toggleProfileSidebar();
```

### 3. Novos métodos no `LayoutService`

| Método | Descrição |
|---|---|
| `layoutService.changeMenuMode(mode: string)` | Altera o modo do menu (static, overlay, slim, etc.) e reseta estados automaticamente |
| `layoutService.hasOverlaySubmenu` | `computed` — true se modo é slim, slim-plus ou horizontal |
| `layoutService.hasOpenOverlay` | `computed` — true se há overlay ativo (menu mobile ou submenu) |
| `layoutService.hasOpenOverlaySubmenu` | `computed` — true se há submenu overlay visível |

### 4. `layout.component.ts` — `containerClass`

Trocou de **getter** para **computed signal**.

```typescript
// ❌ Antes (HTML)
<div [ngClass]="containerClass">

// ✅ Depois (HTML)
<div [ngClass]="containerClass()">
```

### 5. Componente `nph-layout-menu-item`

- ⛔ Removida dependência de `@angular/animations`. Agora usa CSS puro.
- Removidas props `@Input()` `visible`, `badge` (use `item.visible` e `item.badgeClass` no objeto de menu).
- O submenu agora é controlado pela classe CSS `.active-menuitem` no `<li>`.

### 6. Fontes

As fontes Poppins agora são servidas de `assets/fonts/` (caminho absoluto).  
Se você tem uma aplicação host, **copie as fontes** do `nephos-layout` para seu projeto:

```bash
# Exemplo para stage
cp -r node_modules/@iatec/nephos-layout/lib/layout/fonts/* projects/stage/src/assets/fonts/
```

---

## Modos de Menu

Configure via `LayoutService.layoutConfig.update()`:

| Modo | Descrição |
|---|---|
| `static` | Sidebar fixo à esquerda (default) |
| `overlay` | Sidebar sobreposto, abre com botão hamburger |
| `slim` | Sidebar compacto (72px), ícones centrados |
| `slim-plus` | Sidebar compacto maior (112px), ícones + label |
| `horizontal` | Menu horizontal no topo |
| `reveal` | Sidebar escondido, revela com hover/click |
| `drawer` | Sidebar tipo gaveta, expande/colapsa |

```typescript
this.layoutService.changeMenuMode('slim'); // ou 'overlay', 'drawer', etc.
```

---

## Temas de Menu

| Tema | Descrição |
|---|---|
| `colorScheme` | Menu segue o tema claro/escuro do app |
| `primaryColor` | Menu usa a cor primária do tema |
| `transparent` | Menu transparente (não disponível em overlay/reveal/drawer) |

```typescript
this.layoutService.layoutConfig.update(c => ({ ...c, menuTheme: 'primaryColor' }));
```

---

## API do `LayoutService`

### Propriedades (Signals)

| Propriedade | Tipo | Descrição |
|---|---|---|
| `layoutConfig` | `Signal<LayoutConfig>` | Configuração do layout |
| `layoutState` | `Signal<LayoutState>` | Estado atual do layout |
| `profile` | `Signal<Profile>` | Dados do perfil do usuário |
| `isSlim` | `computed` | `true` se modo == 'slim' |
| `isSlimPlus` | `computed` | `true` se modo == 'slim-plus' |
| `isHorizontal` | `computed` | `true` se modo == 'horizontal' |
| `isOverlay` | `computed` | `true` se modo == 'overlay' |
| `hasOverlaySubmenu` | `computed` | `true` se modo é slim/slim-plus/horizontal |
| `hasOpenOverlay` | `computed` | `true` se overlay está aberto |
| `hasOpenOverlaySubmenu` | `computed` | `true` se submenu overlay está aberto |

### Métodos

| Método | Descrição |
|---|---|
| `toggleMenu()` | Alterna menu (static/overlay/mobile) |
| `toggleProfileSidebar()` | Alterna sidebar de perfil |
| `toggleConfigSidebar()` | Alterna sidebar de configuração |
| `toggleDarkMode(config?)` | Alterna tema claro/escuro |
| `changeMenuMode(mode)` | Altera modo do menu e reseta estado |
| `isDesktop()` | `true` se viewport > 991px |
| `isMobile()` | `true` se viewport < 992px |

### Estados (`LayoutState`)

```typescript
interface LayoutState {
    staticMenuInactive?: boolean;      // Menu static fechado
    overlayMenuActive?: boolean;       // Overlay aberto
    profileSidebarVisible?: boolean;    // Perfil visível
    configSidebarVisible?: boolean;     // Config visível
    mobileMenuActive?: boolean;         // Menu mobile aberto
    sidebarExpanded?: boolean;          // Sidebar expandido (drawer/reveal)
    menuHoverActive?: boolean;         // Hover ativo em submenu
    activePath?: string | null;        // Path ativo do menu
    anchored?: boolean;                 // Sidebar ancorado
}
```

---

## Content Projection (Slots)

`LayoutComponent` expõe três slots:

```html
<nph-layout>
    <!-- Logo na sidebar -->
    <ng-template #logo>
        <img src="assets/logo.png" />
    </ng-template>

    <!-- Conteúdo extra na topbar -->
    <ng-template #topbar>
        <button>Notificações</button>
    </ng-template>

    <!-- Conteúdo do profile sidebar -->
    <ng-template #profileSidebar>
        <div>Meu perfil</div>
    </ng-template>
</nph-layout>
```

---

## Build

```bash
# Build da biblioteca
npx ng build @iatec/nephos-layout

# Build do stage (demo)
npx ng build stage

# Dev server do stage
npx ng serve stage
```

---

## Testes

```bash
# Unit tests
npx ng test @iatec/nephos-layout

# Testes E2E (Playwright)
npx npx playwright test tests/layout-menu.spec.ts
```

---

## Troubleshooting

### Erro: `Could not resolve "@/assets/layout/fonts/..."`
**Causa:** O Apollo usa path alias `@/` que não existe no seu projeto.  
**Solução:** Copie as fontes para `src/assets/fonts/` e o SCSS aponta automaticamente para `/assets/fonts/`.

### Erro: `localStorage is not defined` (SSR)
**Causa:** Acesso a `localStorage` no renderizado servidor.  
**Solução:** Use `typeof localStorage !== 'undefined' ? localStorage.getItem(...) : 'default'`.

### Submenu não aparece ao clicar
**Causa:** Provavelmente classes CSS de animação conflitantes.  
**Solução:** Verifique se `li.active-menuitem` está presente no DOM e se o SCSS aplica `max-height: 1000px` ao `ul` filho.

---

## Licença

Apache-2.0
