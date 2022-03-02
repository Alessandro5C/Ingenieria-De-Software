import axios, { AxiosResponse } from "axios";
import { ResponseL } from "../models/response";
 //axios.defaults.baseURL = "https://letskole.herokuapp.com/api/v1";
axios.defaults.baseURL = "https://localhost:5001/api/v2/";

const request = {
  post: async <T>(url: string, body: {}) => await axios.post<T>(url, body),
  get: async <T>(url: string) => await axios.get<T>(url),
}

export default request;