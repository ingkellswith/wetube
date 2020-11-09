import routes from "../routes"; //default export는 중괄호를 쓰지 않는다
//db에서 videos를 import하던 것을 삭제함(fake db)
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    //database의 모든 video를 가져옴
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
}; //throw Error('asd')하면 에러 강제 발생 파이썬은 raise
//async를 사용해야 await을 사용할 수 있고 await은 에러가 발생하든 안하든 끝나면 다음 문장 실행

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  //header.pug에 있는 input의 name인 term을 searchingBy로 바꿈
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
  } = req;
  //console.log(body, file);
  //file:{path}는 multer 때문에 사용가능한 것
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo._id);
  req.user.save();
  //console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo._id));
  //id->every object created to mongoDB will be given an automatic ID
  //newVideo._id도 되고 newVideo.id도 되는듯? console.log상에는 _id로 나옴
};

/*const {
    body: { file, title, description },
  } = req;
  console.dir(file, title, description);
  res.redirect(routes.videoDetail(324393));*/

export const videoDetail = async (req, res) => {
  //console.log(req.params);
  //console.log(req.body, "루디브리엄");
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    console.log(video, "비디오디테일");
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    //id로 찾고 req활용해서 update한 것
    //위의 _id는 mongoose는 _id를 사용하지만 req.params(routes에서 /:id로 설정)는 id를 사용하기 때문
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    //console.log(video, "비디오세이브");
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment

export const postAddComment = async (req, res) => {
  console.log(req, "포스트애드커멘트");
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
