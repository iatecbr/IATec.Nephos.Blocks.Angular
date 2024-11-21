export abstract class FilterModel {
    page: number = 0;
    limit: number = 12;
    orderBy: string = '';
    orderDirection: 'asc' | 'desc' = 'asc';
}
