import { ResponseL } from "../models/response";
import { User } from "../models/user";
import { request } from './api';

const authService = {
    // newUser: async (appUserData: User) => await request.post<User>("authenticate/NewUser", appUserData),
}

export default authService;