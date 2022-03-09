import { SignInResponse } from "./signin-response";
import { User } from "./user";

export interface ResponseL {
    data?:  SignInResponse | User | null,
    status: string,
    code: number,
    message?: string,
}