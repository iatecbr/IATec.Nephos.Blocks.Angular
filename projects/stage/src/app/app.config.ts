import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideTransloco} from '@jsverse/transloco';
import {ConfirmationService, MessageService} from 'primeng/api';
import {providePrimeNG} from 'primeng/config';
// O preset base do Nephos é o Aura (`design.md` › theme_preset). Até
// 03/08/2026 esta linha importava de `/lara` numa variável chamada `Aura`
// — quem lesse o `providePrimeNG` abaixo jurava que era Aura, e não era.
import Aura from '@primeuix/themes/aura';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        provideRouter(routes),
        provideHttpClient(withFetch()),
        provideTransloco({
            config: {
                availableLangs: ['pt-BR', 'en-US', 'es-ES'],
                defaultLang: localStorage.getItem('lang') ?? 'en-US',
                reRenderOnLangChange: true,
                prodMode: !isDevMode(),
            },
        }),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.app-dark'
                }
            }
        }),
        MessageService,
        ConfirmationService
    ]
};
