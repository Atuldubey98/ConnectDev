const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Contact = require("../../models/Contact");
const User = require("../../models/User");

const Room = require("../../models/Room");
const ErrorHandler = require("../../utils/errorhandler");
exports.getChatsByRoomId = catchAsyncErrors(async (req, res, next) => {
  const roomId = req.params.roomId;
  const user = req.user._id;
  if (typeof roomId !== "string") {
    throw new Error("Schema error");
  }
  const room = await Room.findById(roomId)
    .populate({
      path: "users",
      select: "name avatar _id email",
      match: { _id: { $ne: user } },
    })
    .populate({
      path: "messages",
      options: {
        limit: 10,
      },
      populate: {
        path: "user",
        select: "name email avatar _id",
      },
    });

  if (!room) {
    throw new Error("Room doesnt exist !");
  }
  return res.status(200).json(room);
});
exports.createContact = catchAsyncErrors(async (req, res, next) => {
  const users = req.body;
  if (!Array.isArray(users)) {
    throw new ErrorHandler("PAYLOAD_ERROR", 400);
  }
  const roomSize = users.length;
  if (roomSize !== 2) {
    throw new ErrorHandler("Chat id cannot be created !", 400);
  }
  const checkIfStrs = users.some((u) => typeof u !== "string");
  if (checkIfStrs) {
    throw new ErrorHandler("PAYLOAD_ERROR", 400);
  }
  const chatId =
    users[1] < users[0] ? users[1] + "_" + users[0] : users[0] + "_" + users[1];
  const existingContact = await Contact.findOne({ chatId });
  if (existingContact) {
    return res.status(201).json({
      status: true,
      message: `The chat id ${chatId} already exists`,
      room: existingContact.room,
    });
  }
  const room = new Room({ users, messages: [] });
  const newRoom = await room.save();
  const contacts = users.map((user) => {
    return {
      user,
      room: newRoom._id,
      chatId,
    };
  });
  await Contact.insertMany(contacts);
  return res.status(201).json({
    status: true,
    message: `New contact created !`,
    roomId: newRoom._id,
  });
});
exports.getContacts = catchAsyncErrors(async (req, res, next) => {
  const user = req.user._id;
  const contacts = await Contact.find({ user }).populate({
    path: "room",
    populate: {
      path: "users",
      select: "name avatar _id email",
      match: { _id: { $ne: user } },
    },
  });
  return res.status(200).json(contacts);
});

exports.getAllChatsByUserId = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
});
