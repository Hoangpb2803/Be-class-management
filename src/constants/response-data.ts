export class ResponseData<T> {
    constructor(
        public readonly statusCode: number,
        public readonly msg?: string,
        public readonly data?: T | T[]
    ) { }
}