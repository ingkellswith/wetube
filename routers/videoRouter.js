import express from "express";
import {
  deleteVideo,
  editVideo,
  upload,
  videoDetail,
  videos,
} from "../controllers/videoController";
import routes from "../routes";

const videoRouter = express.Router();

//videoRouter.get(routes.videos, videos);
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail, videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
//export는 하나의 변수만 export하고
//export deafult는 파일을 export한다.
