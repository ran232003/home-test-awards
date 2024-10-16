const MyError = require("../models/MyError");
const User = require("../models/user-schema");

const test = async (req, res, next) => {
  try {
    const user = new User({
      userName: "asd",
      password: "asd",
      email: "asd@email.com",
    });
    await user.save();
    return res.json({ status: "ok", user });
  } catch (error) {
    console.log(error);

    let err = new MyError("Internal Error", 500);
    return next(err);
  }
};

module.exports = {
  test,
};
