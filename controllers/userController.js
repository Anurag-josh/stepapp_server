const User = require("../models/User");

// ✅ UPDATE USER STEPS
exports.updateSteps = async (req, res) => {
  try {

    const { steps } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { steps },
      { new: true }
    );

    res.json({
      success: true,
      user,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to update steps",
    });
  }
};