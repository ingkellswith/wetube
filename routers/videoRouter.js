import express from "express";
import {
  deleteVideo,
  getEditVideo,
  getUpload,
  postEditVideo,
  postUpload,
  videoDetail,
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";
import routes from "../routes";

const videoRouter = express.Router();

//videoRouter.get(routes.videos, videos);
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);
videoRouter.get(routes.deleteVideo(), deleteVideo);
//deleteVideo()는 string을 리턴하는 함수
export default videoRouter;
//export는 하나의 변수만 export하고
//export default는 파일을 export한다.
