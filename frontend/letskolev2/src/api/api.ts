import axios, { AxiosResponse } from "axios";
import { ResponseL } from "../models/response";
 //axios.defaults.baseURL = "https://letskole.herokuapp.com/api/v1";
axios.defaults.baseURL = "https://localhost:5001/api/v2/";

let token = '';
let config = {
  headers: { Authorization: `bearer ${token}`},
}

export function setHeaderToken() {
  let aux = window.localStorage.getItem('token');
  token = aux ? aux : '';
  config = {
    headers: { Authorization: `bearer ${token}`},
  };
}

export const request = { 
  post: async <T>(url: string, body: {}) => await axios.post<T>(url, body),
  postwithheader: async <T>(url: string, body: {}) => await axios.post<T>(url, body, config),
  get: async <T>(url: string) => await axios.get<T>(url),
  getwithheader: async <T>(url: string) => await axios.get<T>(url, config),
}