import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
//import { userRouter } from "./userRouter";
//default로 router를 export하지 않고 그냥 export 했기 때문에 {}사용
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use(localsMiddleware);

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://archive.org"
  );
  return next();
});

app.use("/", globalRouter); //'/'는 routes.home과 같음
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;

/*const handleHome = (req, res) => res.send("Hello from my ass");
const handleProfile = (req, res) => res.send("You are on my profile");
app.get("/", handleHome);
app.get("/profile", handleProfile);*/
//const middleware = (req, res, next) => res.send("kill connection");
//app.use(middleware);
