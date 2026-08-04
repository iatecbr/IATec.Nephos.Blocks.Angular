export * from './default/layout.component';
export * from './compact/layout-compact.component';
export * from './slim/layout-slim.component';

/* Template do Design System Nephos — ficha em
   `design-system/componentes/auth.template.meta.ts`. Mora entre os
   layouts porque é o que ele é: a moldura de uma tela. A diferença para
   os três acima é que ele é a moldura de ANTES do acesso — sem sidebar,
   sem topbar, sem router-outlet. */
export * from './auth/layout-auth.component';
export * from './app-shell/layout-app-shell.component';
