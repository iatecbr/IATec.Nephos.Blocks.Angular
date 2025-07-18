import {TranslocoTestingModule, TranslocoTestingOptions} from '@jsverse/transloco';

export function GetTranslocoModule(options: TranslocoTestingOptions = {}) {
    return TranslocoTestingModule.forRoot({
        langs: {
            ptBr: {
                'title': 'Título'
            }
        },
        translocoConfig: {
            availableLangs: ['pt-BR'],
            defaultLang: 'pt',
        },
        preloadLangs: true,
        ...options
    });
}
