const User = require("../models/User");

// ✅ UPDATE USER STEPS
exports.updateSteps = async (req, res) => {

  try {

    const { steps } = req.body;

    const user =
      await User.findById(
        req.user.id
      );

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ TODAY DATE
    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    // ✅ LAST ACTIVE DATE
    const lastDate =
      user.lastActive
        ? new Date(user.lastActive)
            .toISOString()
            .split("T")[0]
        : null;

    // ✅ ALLOW:
    // 1. Higher steps
    // OR
    // 2. New day reset
    const shouldUpdate =
      steps > user.steps ||
      today !== lastDate;

    if (shouldUpdate) {

      user.steps = steps;

      // ✅ UPDATE LAST ACTIVE
      user.lastActive =
        new Date();

      await user.save();

      console.log(
        "✅ Steps updated:",
        steps
      );

    } else {

      console.log(
        "⚠️ Ignored outdated steps:",
        steps
      );
    }

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