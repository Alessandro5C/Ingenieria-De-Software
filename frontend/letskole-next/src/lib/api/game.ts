import GameResponse from "@/responses/Game";
import apiHandler from "./handler";

const baseURL = "Game/"
const apiGame = {
  GetAll: async (headers: HeadersInit) => {
    try {
      return await apiHandler.get<GameResponse[]>(
        baseURL + `GetAll`, headers);
    } catch (error) {
      console.log("Error", error)
    }
  },
}

export  default  apiGame;