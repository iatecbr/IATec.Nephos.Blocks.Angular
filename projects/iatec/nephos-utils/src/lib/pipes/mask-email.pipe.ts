import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'maskEmail'})
export class MaskEmailPipe implements PipeTransform {
    transform(email: string): string {
        if (!email) return '';
        const [user, domain] = email.split('@');
        if (user.length <= 2) {
            return user[0] + '*'.repeat(user.length - 1) + '@' + domain;
        }
        return user[0] + '*'.repeat(user.length - 2) + user[user.length - 1] + '@' + domain;
    }
}
