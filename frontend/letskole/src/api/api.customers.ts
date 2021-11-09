import { Customer } from "../models/customer";
import request from "./api";

const apiCustomers = {
  list: () => request.get<Customer[]>("/Customer"),
  add: (data: Customer) => request.post("/Customer", data),
  edit: (data: Customer) => request.put(`/Customer/${data.customerId}`, data),
  delete: (id: number) => request.delete(`/Customer/${id}`),
  detail: (id: string) => request.get<Customer>(`/Customer/${id}`),
};

export default apiCustomers;
