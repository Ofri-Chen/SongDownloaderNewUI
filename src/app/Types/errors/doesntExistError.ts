class DoesntExistsError extends Error {
    constructor(message: string){
        super(message);
        Object.setPrototypeOf(this, DoesntExistsError.prototype);
    }
}   