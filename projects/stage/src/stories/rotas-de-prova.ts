import type { Routes } from '@angular/router';

/**
 * Rota curinga para as stories que usam `routerLink`.
 *
 * Sem ela o roteador tenta casar a URL do próprio Storybook
 * (`iframe.html`), não acha rota e joga `NG04002: Cannot match any routes`
 * no console. É ruído da bancada, não do componente — e ruído de bancada
 * é caro: com ele no console, um erro de verdade passa despercebido.
 *
 * Não é arquivo de story (não termina em `.stories.ts`), então o
 * Storybook não o carrega como tal.
 */
export const ROTAS_DE_PROVA: Routes = [{ path: '**', children: [] }];
