import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {finalize, from, of, switchMap} from 'rxjs';
import {LoadingService} from "../../services";


let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

function isTokenValid(): boolean {
    return !!cachedToken && !!tokenExpiry && Date.now() < tokenExpiry;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(Auth);
    const loadingService = inject(LoadingService);

    const busyKey = `intercept:${req.url}`;

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

            if (token) {
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
            loadingService.doneFor = busyKey;
        })
    );
};
