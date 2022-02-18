import { User } from '../models/user';
import request from './api';
import authService from './api.authservice';

const apiUsers = {
    detail: async (id: string) => await request.get<User>(`User/GetItemById?id=${id}`),
    // Qts-ignore, student established as boolean
    // data.student = (data.student == "true");
    add: async (data: User) => await authService.newUser(data),
       
    
}

export default apiUsers;