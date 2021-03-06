import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

//const multerVideo = multer({ dest: "uploads/videos/" });
//const multerAvatar = multer({ dest: "uploads/avatars/" });
//dest는 파일이 저장될 위치
//folder내의 저장소를 의미함
//>>/uploads/videos/라고 하면 안됨 3.7강 참고
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube-ingkellswith/video",
  }),
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube-ingkellswith/avatar",
  }),
});
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  //비어있으면 빈 객체 전달
  //console.log(req.user,"reqUser");
  //여기에서 req.user는 Mongo에 저장된 User database를 말함, 로그인하면 passport가 자동으로 전달해주는것
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
//videoFile은 upload.pug에 있는 input의 name과 같다.
