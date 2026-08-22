export default class AppError extends Error {
    public details: {}
    constructor(message: string, details: Record<string, string>) {
        super(message)
        this.details = details

        Object.setPrototypeOf(this, AppError.prototype)
    }
}