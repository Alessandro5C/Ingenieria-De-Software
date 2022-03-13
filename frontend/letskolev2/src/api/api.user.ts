import { ResponseL } from '../models/response';
import { User } from '../models/user';
import { request } from './api';
import authService from './api.authservice';

const apiUsers = {
    get: async (id: string) =>
    await request.getwithheader<ResponseL>(`User/GetItemById?id=${id}`)
    .then( (response) => {
        if(response.data.code == 200){
            return response.data.data;
        }
        else if(response.data.message) {
            window.alert(response.data.message);
            return null;
        } 
    })
    .catch(err => {
        if(err.response.data){
            window.alert(err.response.data);
        }
        else { 
            window.alert("Invalid token, need to login before using this app");
        }
        return null;
    }),

    put: async (user: User) => await request.putwithheader<ResponseL>('User/Put', user)
    .then( (response) => {
        if(response.data.data) {
            return response.data.data;
        }
        else if(response.data.message) {
            window.alert(response.data.message);
            return null;
        }
    })
    .catch(err => {
        if(err.response.data){
            window.alert(err.response.data);
        }
        else { 
            window.alert("Invalid token, need to login before using this app");
        }
        return null;
    }),
    // detail: async (id: string) => await request.get<User>(`User/GetItemById?id=${id}`),
    // // Qts-ignore, student established as boolean
    // // data.student = (data.student == "true");
    // add: async (data: User) => await authService.newUser(data),
}

export default apiUsers;