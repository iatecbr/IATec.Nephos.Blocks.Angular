import {InjectionToken, Provider, Type} from '@angular/core';
import {Observable} from 'rxjs';

import {UserAppModel} from '../models';

/**
 * ─────────────────────────────────────────────────────────────
 * De onde a sidebar tira a lista de aplicações do usuário
 * ─────────────────────────────────────────────────────────────
 * ⚠️ POR QUE ISTO EXISTE. Até 03/08/2026 a `SidebarComponent` importava
 * o `HttpAppService` do aplicativo de demonstração:
 *
 *   import {HttpAppService} from "../../../../../../../stage/src/app/services";
 *
 * Isso é um ciclo de manual: a biblioteca dependia do app, e o serviço do
 * app importava o `UserAppModel` de volta da biblioteca. O resultado era
 * que **`@iatec/nephos-layout` não compilava como pacote** — o
 * `ng-packagr` parava em "Entry point has a circular dependency on
 * itself". Só o app subia, porque ali os dois vivem no mesmo bundle.
 *
 * A dependência agora vai no sentido certo: a biblioteca declara o que
 * PRECISA e quem a consome decide de onde vem. Buscar a lista é decisão
 * de aplicação (endpoint, autenticação, cache); a lib só a mostra.
 *
 * É OPCIONAL de propósito: sem o provider, a sidebar simplesmente não
 * mostra o menu de aplicações. Ninguém quebra por não ter configurado.
 * ─────────────────────────────────────────────────────────────
 */
export interface UserAppsSource {
    getApps(): Observable<UserAppModel[]>;
}

export const NEPHOS_USER_APPS = new InjectionToken<UserAppsSource>('NEPHOS_USER_APPS');

/**
 * Liga a sidebar ao serviço que já busca as aplicações:
 *
 *   providers: [provideNephosUserApps(HttpAppService)]
 *
 * Qualquer classe com `getApps(): Observable<UserAppModel[]>` serve.
 */
export function provideNephosUserApps(source: Type<UserAppsSource>): Provider {
    return {provide: NEPHOS_USER_APPS, useExisting: source};
}
