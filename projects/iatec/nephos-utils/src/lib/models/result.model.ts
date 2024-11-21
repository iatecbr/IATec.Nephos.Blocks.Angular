export interface ResultModel<T> {
    data: T;
    success: boolean;
    messages: string[];
    statusCode: number;
    dateTimeUtc: Date;
}
