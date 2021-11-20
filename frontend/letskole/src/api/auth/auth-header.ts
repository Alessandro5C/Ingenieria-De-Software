import { Customer } from "../../models/customer";
import { User } from "../../models/user";
import request from "../api";

const aut = {
    list: () => request.get<User[]>("User/GetAllByFilter"),
    add: (data: Customer) => request.post("/Customer", data),
    edit: (data: Customer) => request.put(`/Customer/${data.customerId}`, data),
    delete: (id: number) => request.delete(`/Customer/${id}`),
    detail: (id: string) => request.get<Customer>(`/Customer/${id}`),
};

export default aut;
