import { User } from "./user";

export interface ResponseL {
    data?:  User | null,
    status: string,
    code: number,
    message?: string,
}