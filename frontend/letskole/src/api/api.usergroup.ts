import { Customer } from "../models/customer";
import { userGroup } from "../models/user-groups";
import request from "./api";

const apiCustomers = {
    list: () => request.get<userGroup[]>("User/GetAllByFilter"),
    add: (data: userGroup) => request.post("Customer", data),
    edit: (data: userGroup) => request.put(`userGroup/Put`, data),
    delete: (id: number) => request.delete(`Customer/${id}`),
    detail: (id: string) => request.get<Customer>(`Customer/${id}`),
};

export default apiCustomers;
