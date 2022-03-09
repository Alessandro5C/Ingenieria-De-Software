import { ResponseL } from "../models/response";
import { User } from "../models/user";
import request from './api';
import { SignIn } from "../models/signin";
import { SignUp } from "../models/signup";

const authService = {
    login: async (appUserData: SignIn) =>
        await request.post<ResponseL>("User/SignIn", appUserData)
        .then( (response) => {
            if(response.data.code == 200){
                return response.data.data;
            }
            else {
                window.alert(response.data.message);
                return null;
            }
        })
        .catch(err => {
            window.alert("An unexpected error ocurred");
            return null;
        }),

    register: async (appUserData: SignUp) =>
        await request.post<ResponseL>("User/SignUp", appUserData)
        .then( (response) => {
            if(response.data.code == 200){
                return response.data.data;
            }
            else {
                window.alert(response.data.message);
                return null;
            }
        })
        .catch(err => {
            console.log(err);
            window.alert("An unexpected error ocurred");
            return null;
        }),
    // newUser: async (appUserData: User) => await request.post<User>("authenticate/NewUser", appUserData),
}

export default authService;