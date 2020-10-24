import { videos } from "../db"; //개별 export는 중괄호 사용
import routes from "../routes"; //default export는 중괄호를 쓰지 않는다

export const home = (req, res) =>
  res.render("home", { pageTitle: "Home", videos });

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  //const searchingBy = req.query.term;위는 이것과 같다.
  //또한 첫번째 방법은 term을 searchingBy로 변경한다.
  //term이란 이름은 header.pug에서 설정함
  res.render("search", { pageTitle: "Search", searchingBy, videos });
  //searchingBy:searchingBy는 searchingBy와 같다.
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = (req, res) => {
  const {
    body: { file, title, description },
  } = req;
  res.redirect(routes.videoDetail(324393));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
