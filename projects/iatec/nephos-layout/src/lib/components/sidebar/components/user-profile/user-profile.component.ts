import { Component, DestroyRef, effect, ElementRef, inject, signal } from '@angular/core';
import { LayoutService } from "@iatec/nephos-layout";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { fromEvent } from "rxjs";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'nph-layout-sidebar-user-profile',
    imports: [
        RouterLink
    ],
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {

    urlAvatar: string | undefined;
    name: string | undefined;
    letters: string | undefined;

    isDesktopView = signal(globalThis.innerWidth > 991);

    private destroyRef = inject(DestroyRef);

    constructor(
        public layoutService: LayoutService,
        public el: ElementRef) {
        effect(() => {
            const profile = this.layoutService.profile();
            this.urlAvatar = profile.urlAvatar;

            if (profile.name) {
                const names = profile.name.split(' ');
                const firstName = names[0].charAt(0);
                const lastName = names[names.length - 1].charAt(0);
                this.letters = `${firstName} ${lastName}`;
                this.name = profile.name;
            }
        });

        fromEvent(globalThis, 'resize')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.isDesktopView.set(globalThis.innerWidth > 991);
            });
    }

    onProfileButtonClick() {
        this.layoutService.showProfileSidebar();
    }

}
