export class NotFoundError extends Error{
    status: number;

    constructor(message: string, status: number = 404){
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, NotFoundError)
    }
}