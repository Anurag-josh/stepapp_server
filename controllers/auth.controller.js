const {
  registerUser,
  loginUser,
} = require("../services/auth.service");

// ✅ REGISTER
const register = async (req, res) => {

  try {

    const user =
      await registerUser(
        req.body
      );

    // ✅ RETURN FULL USER STATE
    res.status(201).json({
      success: true,
      user: {
        ...user.toObject(),
        steps: user.steps,
        communityCode:
          user.communityCode,
      },
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ LOGIN
const login = async (req, res) => {

  try {

    const data =
      await loginUser(
        req.body
      );

    // ✅ RETURN FULL USER STATE
    res.status(200).json({
      success: true,

      token: data.token,

      user: {
        ...data.user.toObject(),
        steps:
          data.user.steps,
        communityCode:
          data.user.communityCode,
      },
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  register,
  login,
};