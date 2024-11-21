import { PagedResultModel } from './paged.result.model';

export class PageModel<H, I> {
    filter: H = {} as H;
    length: number = 0;
    rows: I[] = [];

    constructor(filterFactory: () => H) {
        this.filter = filterFactory();
    }

    public patch(result: PagedResultModel<I>): void {
        this.length = result.length;
        this.rows = result.rows;
    }
}
