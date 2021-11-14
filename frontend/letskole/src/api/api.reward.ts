import { Customer } from "../models/customer";
import { Reward } from "../models/reward";
import { User } from "../models/user";
import request from "./api";

const apiCustomers = {
    list: () => request.get<User[]>("User/GetAllByFilter"),
    add: (data: Customer) => request.post("/Customer", data),
    edit: (data: Customer) => request.put(`/Customer/${data.customerId}`, data),
    delete: (id: number) => request.delete(`/Customer/${id}`),
    detail: (id: string) => request.get<Reward[]>(`/Reward/GetAllByFilterRewardsUser?userId=${Number(id)}`),
};

export default apiCustomers;
