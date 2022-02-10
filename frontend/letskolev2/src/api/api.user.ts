import { User } from '../models/user';
import request from './api';

const apiUsers = {
    detail: async (id: string) => await request.get<User>(`User\GetItemById?id=${id}`),
}

export default apiUsers;