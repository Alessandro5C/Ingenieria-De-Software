import request from "./api";
import { Game } from "../models/games";

const apiGames = {
    list: () => request.get<Game[]>("Game/GetAllByFilter"),
    byId: (data: Game) => request.get<Game[]>("Game/GetItemById"),
};

export default apiGames;
