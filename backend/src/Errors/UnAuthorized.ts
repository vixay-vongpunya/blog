export class UnAuthorizedError extends Error{
    status: number;

    constructor(message: string, status: number = 401){
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, UnAuthorizedError.prototype)
    }
}