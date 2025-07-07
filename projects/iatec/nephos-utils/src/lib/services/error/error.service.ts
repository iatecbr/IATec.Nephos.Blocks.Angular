import {inject, Injectable} from '@angular/core';
import {ToastMessageOptions} from "primeng/api/toastmessage";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {GeneralTranslationKeys, MessageSeverities, WaringMessages} from "../../constants";
import {TranslocoService} from "@jsverse/transloco";

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    private readonly _messageService = inject(MessageService);
    private readonly _router = inject(Router);
    private readonly _translateService = inject(TranslocoService);

    // The public API overloads for the service remain the same
    public handler(route: Array<string>, callback?: () => void): Promise<void>;
    public handler(error: HttpErrorResponse, callback?: () => void): Promise<void>;
    public handler(message: ToastMessageOptions, callback?: () => void): Promise<void>;
    public handler(error: HttpErrorResponse, route: Array<string>, callback?: () => void): Promise<void>;
    public handler(message: ToastMessageOptions, route: Array<string>, callback?: () => void): Promise<void>;

    /**
     * Centralized handler for HTTP errors, custom messages, navigation, and callbacks.
     * @param args - A list of arguments that can include HttpErrorResponse, ToastMessageOptions, a route (string[]), and/or a callback function.
     */
    public async handler(...args: any[]): Promise<void> {
        // 1. Parse and identify all passed arguments
        let error: HttpErrorResponse | undefined;
        let customMessage: ToastMessageOptions | undefined;
        let route: string[] | undefined;
        let callback: (() => void) | undefined;

        for (const arg of args) {
            if (arg instanceof HttpErrorResponse) {
                error = arg;
            } else if (Array.isArray(arg)) {
                route = arg;
            } else if (typeof arg === 'function') {
                callback = arg as () => void;
            } else if (typeof arg === 'object' && (arg.severity || arg.summary || arg.detail)) {
                // Heuristic to identify a ToastMessageOptions object
                customMessage = arg;
            }
        }

        // 2. Process the HTTP error to generate a Toast message, if an error is provided
        let finalMessage: ToastMessageOptions | undefined = customMessage;

        if (error) {
            console.error('An error was intercepted by ErrorService:', error);

            // Handle 401 Unauthorized
            if (error.status === 401) {
                console.warn(`Authentication Error (401):`, error);
                this._messageService.add({
                    severity: MessageSeverities.warn,
                    summary: this._translateService.translate('Session Expired'),
                    detail: this._translateService.translate('Please sign in again.'),
                    life: 5000
                });
                // Navigate and then execute callback if it exists
                await this._router.navigate(['./auth/sign-out']).then(() => {
                    if (callback) {
                        callback();
                    }
                });
                return; // Terminate execution
            }

            // Handle 403 Forbidden
            if (error.status === 403) {
                console.warn(`Authorization Error (403): Forbidden`, error);
                // Navigate and then execute callback if it exists
                await this._router.navigate(['./noty/error/forbidden']).then(() => {
                    if (callback) {
                        callback();
                    }
                });
                return; // Terminate execution
            }

            // Build the toast message for other error statuses
            let summary = '';
            let detail = '';

            // Correctly initialize severity as a string
            let severity: string;

            switch (error.status) {
                case 400: // Bad Request (Business logic/validation errors)
                    severity = MessageSeverities.warn;
                    summary = this._translateService.translate(WaringMessages.notPossibleToProceed);
                    detail = this.extractErrorMessage(error);
                    break;
                case 404: // Not Found
                    severity = MessageSeverities.warn;
                    summary = this._translateService.translate('Resource Not Found');
                    detail = this._translateService.translate('The requested resource could not be found on the server.');
                    break;
                case 500: // Internal Server Error
                default: // Other 4xx or 5xx errors
                    severity = MessageSeverities.error;
                    summary = this._translateService.translate(WaringMessages.notPossibleToProceed);
                    detail = this._translateService.translate(GeneralTranslationKeys.message.error.contactSupportTeam);
                    break;
            }

            finalMessage = {
                key: 'default',
                severity,
                summary,
                detail,
                life: 5000
            };
        }

        // 3. Display the final message (either from an error or a custom one)
        if (finalMessage) {
            this._messageService.add(finalMessage);
        }

        // 4. Execute navigation and/or callback (for non-redirect error cases)
        if (route) {
            await this._router.navigate(route).then(() => {
                if (callback) {
                    callback();
                }
            });
        } else if (callback) {
            // If only a callback was provided (without a route), execute it
            callback();
        }
    }

    /**
     * Extracts the error message from the body of an HttpErrorResponse.
     * The backend can return the error in different formats.
     * @param error - The HttpErrorResponse object.
     * @returns The error message string.
     */
    private extractErrorMessage(error: HttpErrorResponse): string {
        if (error.error) {
            // E.g., { "message": "Error text" }
            if (typeof error.error.message === 'string') {
                return error.error.message;
            }
            // E.g., { "errors": ["First error"] }
            if (Array.isArray(error.error.errors) && typeof error.error.errors[0] === 'string') {
                return error.error.errors[0];
            }
            // E.g., "The response body itself is an error string"
            if (typeof error.error === 'string') {
                return error.error;
            }
        }
        // Fallback to the default HTTP client status message
        return error.message || this._translateService.translate(GeneralTranslationKeys.message.error.contactSupportTeam);
    }
}
