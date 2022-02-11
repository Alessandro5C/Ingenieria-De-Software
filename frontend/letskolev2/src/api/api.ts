import axios, { AxiosResponse } from "axios";

 axios.defaults.baseURL = "https://letskole.herokuapp.com/api/v1";
//axios.defaults.baseURL = "https://localhost:5001/api/v1/";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    post: async <T>(url: string, body: {}) => await axios.post<T>(url, body).then(responseBody).catch(error => null),
    get: async <T>(url: string) => await axios.get<T>(url).then(responseBody).catch(error => null),
}

export default request;