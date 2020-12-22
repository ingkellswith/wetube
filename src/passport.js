import passport from "passport";
import User from "./models/User";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import {
  githubLoginCallback,
  facebookLoginCallback,
} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());
//strategy는 로그인 시키는 방법인데 이건 local으로 이메일,패스워드 입력하면 로그인해주는 방식
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `https://immense-badlands-13704.herokuapp.com${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://immense-badlands-13704.herokuapp.com${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"],
    },
    facebookLoginCallback
  )
);

//passport.serializeUser(User.serializeUser());
//쿠키에게 정보를 줌 ex)useremail
//passport.deserializeUser(User.deserializeUser());
//쿠키의 정보를 사용자로 전환함
passport.serializeUser(function (user, done) {
  done(null, user);
});

/*passport.deserializeUser(function (user, done) {
  done(null, user);
});*/
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
/*
- local passport 인증과정
1.mongodb model만들기
2.createStrategy(strategy란 로그인하는 방식)
3.serialize,deserialize설정(보안된 쿠키와 세션을 읽어들이는 방법)
4.postJoin controller만들기
const user = await User({
        name,
        email
      });
      await User.register(user, password);

5.
import "./passport";
app.use(passport.initialize(세션 설정도 해줘야 함)

6.postJoin을 postLogin을 위한 미들웨어로 만들고
postLogin controller만들기(이 과정에서 로그인되면 req.user가
passport에 의해 전달된다 로그인된 유저를 뜻함)
export const postLogin = passport.authenticate("local", {
	  failureRedirect: routes.login,
  successRedirect: routes.home
});

7.mongoStore로 서버가 꺼져도 세션 저장
8. 보안을 위해 onlyPrivate,onlyPublic미들웨어 생성

- js github passport 인증과정
1. github에서 인증과정을 거친 후 wetube로 돌아오기 위해서
콜백 url이 필요하다.
2.이를 위해서 github strategy를 설정해준다.
github strategy안에는 callbackURL로 돌아온후 실행되는
githubLoginCallback이 포함되어 있다.
export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
};
3.githubLoginCallback함수를 실행한 후 
routes.githubCallback로 돌아오면 
passport.authenticate("github", { failureRedirect: "/login" }),
이렇게 인증과정을 진행한다.
4.한번 깃허브로 인증을 하면 다음부터는 로그인 할 때
githubLoginCallback함수를 실행할 필요 없이
passport.authenticate만 진행하면 된다.
5.local과의 차이점은 콜백이 포함되어 있다는 것 이것 외에는 비슷하다.
*/
