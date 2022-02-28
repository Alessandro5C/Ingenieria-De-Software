import { ApplicationUserResponse } from "./aplication-user-response";

export interface ResponseL {
    data: ApplicationUserResponse | null,
    status: string,
    code: number,
    message?: string,
}