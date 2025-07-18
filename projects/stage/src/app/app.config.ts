import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideTransloco} from '@jsverse/transloco';
import {ConfirmationService, MessageService} from 'primeng/api';
import {providePrimeNG} from 'primeng/config';
import Lara from '@primeng/themes/lara';
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
                preset: Lara,
                options: {
                    darkModeSelector: '.app-dark'
                }
            }
        }),
        MessageService,
        ConfirmationService
    ]
};
