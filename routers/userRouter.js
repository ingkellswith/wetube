import express from "express";
import {
  getChangePassword,
  getEditProfile,
  postChangePassword,
  postEditProfile,
  userDetail,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), userDetail);
//editProfile보다 userDetail먼저 오면 id로 인식하기 때문에 순서가 중요
//userDetail()에서 :id를 express는 이해할 수 있지만 html은 이해할 수 없다.
//js는 매개변수 없어도 인식하는 건가? userDetail()에 매개변수 없어도 인식한다라?
//userDetail(number)와 userDetail()중에서 userDetail()을 디폴트로 설정해 routes.js의 else문이 실행된다.

export default userRouter;
