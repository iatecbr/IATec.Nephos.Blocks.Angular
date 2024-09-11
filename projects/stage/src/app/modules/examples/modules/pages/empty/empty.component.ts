import { Component } from '@angular/core';
import { nodeNameForError } from '@angular/compiler-cli/src/ngtsc/util/src/typescript';

@Component({
    selector: 'app-default',
    templateUrl: './empty.component.html'
})
export class EmptyComponent {

    protected readonly nodeNameForError = nodeNameForError;
}
