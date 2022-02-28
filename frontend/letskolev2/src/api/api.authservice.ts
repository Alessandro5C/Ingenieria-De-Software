import { ApplicationUserLogin } from "../models/aplication-user-login";
import { ApplicationUserResponse } from "../models/aplication-user-response";
import { ResponseL } from "../models/response";
import { User } from "../models/user";
import request from './api';

const authService = {
    login: async (appUserData: ApplicationUserLogin) =>
        await request.post<ResponseL>("Identity/SignIn", appUserData)
        .then( (response) => {
            if(response.data.code == 200){
                return response.data.data;
            }
            else {
                window.alert(response.data.message);
            }
        })
        .catch(err => {
            window.alert("An unexpected error ocurred");
        }),

    // register: async (appUserData: ApplicationUserLogin) =>
    //     await request.postnoreturn<boolean | null>("authenticate/register", appUserData),

    // newUser: async (appUserData: User) => await request.post<User>("authenticate/NewUser", appUserData),
}

export default authService;