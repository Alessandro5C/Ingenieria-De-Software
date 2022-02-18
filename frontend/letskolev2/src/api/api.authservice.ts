import { ApplicationUserLogin } from "../models/aplication-user-login";
import { ApplicationUserResponse } from "../models/aplication-user-response";
import { User } from "../models/user";
import request from './api';

const authService = {
    login: async (appUserData: ApplicationUserLogin) =>
        await request.post<ApplicationUserResponse>("authenticate/login", appUserData),

    register: async (appUserData: ApplicationUserLogin) =>
        await request.postnoreturn<boolean>("authenticate/register", appUserData),

    newUser: async (appUserData: User) => await request.post<User>("authenticate/NewUser", appUserData),
}

export default authService;