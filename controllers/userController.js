import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      //console.log(user);await User로 database만드는 것임
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
    }
    // To Do: Log user in``
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  //console.log(accessToken, refreshToken, profile, cb);
  //_,__는 사용하지 않음을 나타냄
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.name = name;
      user.save();
      //console.log(user, "달팽이");
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    //console.log(newUser, "슬라임");
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  //passport때문에 req.logout()이 동작함
  res.redirect(routes.home);
};
export const getMe = (req, res) => {
  //console.log(req.user, "혼테일");
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
}; //req.user는 현재 로그인 되어 있는 사용자

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    console.log(user, "유저");
    //console.log(user, "발록");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "EditProfile" });
export const postEditProfile = async (req, res) => {
  const {
    user: { _id: id },
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};
export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  console.log(req.body.oldPassword);
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      //res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      console.log("슬라임");
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    //passport-local-mongoose때문에 사용가능
    console.log("와일드보어");
    res.redirect(routes.me);
  } catch (error) {
    //res.status(400);
    console.log("스텀프");
    res.redirect(`/users${routes.changePassword}`);
  }
};
