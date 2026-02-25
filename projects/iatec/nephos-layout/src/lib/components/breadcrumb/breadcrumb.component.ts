import {Component} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

interface Breadcrumb {
    label: string;
    url?: string;
}

@Component({
    selector: 'nph-layout-breadcrumb',
    imports: [
    BreadcrumbModule
],
    templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {

    items: MenuItem[] = [];
    home: MenuItem | undefined;

    private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

    readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

    constructor(private router: Router) {
        // Set the home item
        this.home = { icon: 'pi pi-home', routerLink: '/' };

        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(event => {
            const root = this.router.routerState.snapshot.root;
            const breadcrumbs: Breadcrumb[] = [];
            this.addBreadcrumb(root, [], breadcrumbs);

            this._breadcrumbs$.next(breadcrumbs);

            // Convert breadcrumbs to PrimeNG MenuItem format
            this.items = breadcrumbs.map(breadcrumb => ({
                label: breadcrumb.label,
                routerLink: breadcrumb.url
            }));
        });
    }

    private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: Breadcrumb[]) {
        const routeUrl = parentUrl.concat(route.url.map(url => url.path));
        const breadcrumb = route.data['breadcrumb'];
        const parentBreadcrumb = route.parent && route.parent.data ? route.parent.data['breadcrumb'] : null;

        if (breadcrumb && breadcrumb !== parentBreadcrumb) {
            breadcrumbs.push({
                label: route.data['breadcrumb'],
                url: '/' + routeUrl.join('/')
            });
        }

        if (route.firstChild) {
            this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
        }
    }
}
