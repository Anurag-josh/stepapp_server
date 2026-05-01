const Community = require("../models/Community");
const generateCode = require("../utils/roomCode");

const createCommunity = async (userId) => {
  const code = generateCode();

  const community = await Community.create({
    code,
    members: [userId],
  });

  return community;
};

const joinCommunity = async (code, userId) => {
  const community = await Community.findOne({ code });

  if (!community) {
    throw new Error("Community not found");
  }

  const alreadyJoined = community.members.includes(userId);

  if (!alreadyJoined) {
    community.members.push(userId);
    await community.save();
  }

  return community;
};

const getCommunity = async (code) => {
  const community = await Community.findOne({ code })
    .populate("members", "name steps");

  if (!community) {
    throw new Error("Community not found");
  }

  return community;
};

module.exports = {
  createCommunity,
  joinCommunity,
  getCommunity,
};