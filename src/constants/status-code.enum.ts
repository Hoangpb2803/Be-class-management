export enum E_StatusCode {
    SUCCESS = 200,
    CONFLICT = 409, //facing conflict when trying to add new data
    BAD_REQUEST = 400, //lack of necessary info from client
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
}