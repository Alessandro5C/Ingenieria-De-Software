import request from "../api";
import {User} from "../../models/user";
import {ApplicationUserLogin} from "../../models/auth/application-user-login";
import {ApplicationUserResponse} from "../../models/auth/application-user-response";

const authService = {
    register: (appUserData: ApplicationUserLogin) => request.post("authenticate/register", appUserData),
    newUser: (appUserData: User) => request.post<User>("authenticate/NewUser", appUserData),
    login: (appUserData: ApplicationUserLogin) =>
        request.post<ApplicationUserResponse>("authenticate/login", appUserData)
            .then( (appUserResponse) => {
                console.log(appUserResponse);
                if (appUserResponse.token) {
                    localStorage.setItem("appUserData", JSON.stringify(appUserResponse));
                }
                return appUserResponse;
            }),
    logout: () => localStorage.removeItem("appUserData"),
}

export default authService;
