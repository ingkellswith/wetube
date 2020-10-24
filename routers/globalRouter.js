import express from "express";
import {
  getJoin,
  postJoin,
  logout,
  getLogin,
  postLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin); //post방식으로 전달되면 실행되는 문장인듯

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);

export default globalRouter;
