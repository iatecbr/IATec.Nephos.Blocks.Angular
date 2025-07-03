import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {finalize, from, of, switchMap} from 'rxjs';
import {LoadingService} from "../../services";


let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

function isStaticAsset(url: string): boolean {
    const staticExtensions = [
        '.css', '.js', '.json', '.png', '.jpg', '.jpeg', '.gif', '.svg',
        '.woff', '.woff2', '.ttf', '.eot', '.otf', '.ico', '.webmanifest'
    ];

    const lowerCaseUrl = url.toLowerCase().split('?')[0];

    return staticExtensions.some(ext => lowerCaseUrl.endsWith(ext));
}

function isTokenValid(): boolean {
    return !!cachedToken && !!tokenExpiry && Date.now() < tokenExpiry;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(Auth);
    const loadingService = inject(LoadingService);

    const busyKey = `intercept:${req.url}`;

    if (!isStaticAsset(req.url))
        loadingService.isBusyFor = busyKey;

    const getToken$ = auth.currentUser
        ? (isTokenValid()
            ? of(cachedToken)
            : from(auth.currentUser.getIdTokenResult()).pipe(
                switchMap(tokenResult => {
                    cachedToken = tokenResult.token;
                    tokenExpiry = tokenResult.expirationTime ? new Date(tokenResult.expirationTime).getTime() : null;
                    return of(cachedToken);
                })
            ))
        : of(null);

    return getToken$.pipe(
        switchMap(token => {
            let currentHeaders = req.headers;

            const lang = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;

            if (lang) {
                currentHeaders = currentHeaders.set('Accept-Language', lang);
            }

            const shouldAddAuthHeader = token && !isStaticAsset(req.url);

            if (shouldAddAuthHeader) {
                currentHeaders = currentHeaders.set('Authorization', `Bearer ${token}`);
            }

            if (currentHeaders !== req.headers) {
                const modifiedReq = req.clone({
                    headers: currentHeaders
                });
                return next(modifiedReq);
            }

            return next(req);
        }),
        finalize(() => {
            if (!isStaticAsset(req.url))
                loadingService.doneFor = busyKey;
        })
    );
};
