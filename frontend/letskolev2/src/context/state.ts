import { ApplicationUserLogin } from '../models/aplication-user-login';

export enum Status {
    NotLogged = 'Not Logged',
    PartialLogged = 'Partial logged',
    Logged = 'Logged',
}

export interface LoginState {
    applicationUserLogin: ApplicationUserLogin | null;
    isLogged: Status;
}

export const InitialLoginState: LoginState = {
    applicationUserLogin: null,
    isLogged: Status.NotLogged
}