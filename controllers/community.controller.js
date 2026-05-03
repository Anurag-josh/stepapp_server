const User = require("../models/User");
const Community = require("../models/Community");

const {
  createCommunity,
  joinCommunity,
  getCommunity,
} = require("../services/community.service");

// ✅ CREATE COMMUNITY
const create = async (req, res) => {
  try {

    const community =
      await createCommunity(
        req.user.id
      );

    // ✅ FETCH USER DOC
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ SAVE COMMUNITY CODE
    user.communityCode = community.code;
    await user.save();

    res.status(201).json({
      success: true,
      community,
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ JOIN COMMUNITY
const join = async (req, res) => {
  try {

    const { code } = req.body;

    const community =
      await joinCommunity(
        code,
        req.user.id
      );

    // ✅ FETCH USER DOC
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ SAVE COMMUNITY CODE
    user.communityCode = code;
    await user.save();

    res.status(200).json({
      success: true,
      community,
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ GET COMMUNITY
const getOne = async (req, res) => {
  try {

    const community =
      await getCommunity(
        req.params.code
      );

    res.status(200).json({
      success: true,
      community,
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ LEAVE COMMUNITY
const leaveCommunity = async (
  req,
  res
) => {

  try {

    const { code } = req.body;

    const community =
      await Community.findOne({
        code,
      });

    if (!community) {

      return res.status(404).json({
        success: false,
        message: "Community not found",
      });
    }

    community.members =
      community.members.filter(
        (member) =>
          member.toString() !==
          req.user.id
      );

    await community.save();

    // ✅ CLEAR COMMUNITY CODE
    const user = await User.findById(req.user.id);
    if (user) {
      user.communityCode = "";
      await user.save();
    }

    res.json({
      success: true,
      message: "Left community",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to leave room",
    });
  }
};

module.exports = {
  create,
  join,
  getOne,
  leaveCommunity,
};