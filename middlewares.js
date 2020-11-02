import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" });
//dest는 파일이 저장될 위치
//folder내의 저장소를 의미함
//>>/uploads/videos/라고 하면 안됨 3.7강 참고
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: false,
    id: 1,
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
//videoFile은 upload.pug에 있는 input의 name과 같다.
