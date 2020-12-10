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
