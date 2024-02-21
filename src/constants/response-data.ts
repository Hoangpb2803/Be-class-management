export class ResponseData<T> {
    constructor(
        private readonly statusCode: number,
        private readonly msg?: string,
        private readonly data?: T | T[]
    ) { }
}