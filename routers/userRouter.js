import express from "express";
import {
  changePassword,
  editProfile,
  userDetail,
  users,
} from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail);
//editProfile보다 userDetail먼저 오면 id로 인식하기 때문에 순서가 중요

export default userRouter;
