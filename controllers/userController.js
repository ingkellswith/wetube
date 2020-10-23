import routes from "../routes";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = (req, res) => {
  //req.body에 오브젝트 형태로 아래 4개 값이 들어 있음
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    // To Do: Register User
    // To Do: Log user in
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = (req, res) => res.redirect(routes.home);
export const logout = (req, res) => {
  res.redirect(routes.home);
};
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "UserDetail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "EditProfile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "ChangePassword" });
