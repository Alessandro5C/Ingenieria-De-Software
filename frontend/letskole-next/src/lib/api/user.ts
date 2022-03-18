import AuthResponse from "../responses/Auth";
import UserResponse from "../responses/User";
import apiHandler from "./handler";

interface SignInData {
  email: string,
  password: string
}

interface SignUpData {
  displayedName: string,
  email: string,
  password: string,
  role: string
}

const baseURL = "User/";
const apiUser = {
  SignIn: async (headers: HeadersInit, data: SignInData) => {
    try {
      return await apiHandler.post<SignInData, AuthResponse>(
        baseURL + "SignIn", headers, data);
    } catch (error) {
      console.log("Error", error);
    }
  },
  SignUp: async (headers: HeadersInit, data: SignUpData) => {
    try {
      return await apiHandler.post<SignUpData, UserResponse>(
        baseURL + "SignUp", headers, data);
    } catch (error) {
      console.log("Error", error);
    }
  },
  GetItemById: async (headers: HeadersInit, id: string) => {
    try {
      return await apiHandler.get<UserResponse>(
        baseURL + `GetItemById?id=${id}`, headers);
    } catch (error) {
      console.log("Error", error);
    }
  },
  Put: async (headers: HeadersInit, data: UserResponse) => {
    try {
      return await apiHandler.put<UserResponse>(
        baseURL + `Put`, headers, data);
    } catch (error) {
      console.log("Error", error);
    }
  }
};

export default apiUser;