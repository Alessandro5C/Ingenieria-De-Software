import { ApplicationUserLogin } from "../models/aplication-user-login";
import { ApplicationUserResponse } from "../models/aplication-user-response";
import request from './api';

const authService = {
    
    login: async (appUserData: ApplicationUserLogin) =>
        await request.post<ApplicationUserResponse>("authenticate/login", appUserData)
        .then( (appUserResponse: ApplicationUserResponse | null) => {
            console.log(appUserResponse);
            if(appUserResponse && appUserResponse.token){
                localStorage.setItem("appUserData", JSON.stringify(appUserResponse));
            }
            return appUserResponse;
        }),
    register: async (appUserData: ApplicationUserLogin)=>
        await request.post<ApplicationUserResponse>("authenticate/register", appUserData)
        
}

export default authService;