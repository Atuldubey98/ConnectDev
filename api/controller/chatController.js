const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Contact = require("../../models/Contact");
const Room = require("../../models/Room");
exports.getChatsByRoomId = catchAsyncErrors(async (req, res, next) => {
  const roomId = req.params.roomId;
  const user = req.user._id;
  if (typeof roomId !== "string") {
    throw new Error("Schema error");
  }
  const room = await Room.findById(roomId)
    .sort({
      date: "desc",
    })
    .limit(10)
    .populate({
      path: "users",
      select: "name avatar _id email",
      match: { _id: { $ne: user } },
    })
    .populate({
      path: "messages",
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
    throw new Error("Schema error");
  }
  const roomSize = users.length;
  if (roomSize <= 1) {
    throw new Error("Schema error");
  }
  if (roomSize === 2) {
    const chatId =
      users[1] < users[0]
        ? users[1] + "_" + users[0]
        : users[0] + "_" + users[1];
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
  } else {
    const room = new Room({ users, messages: [] });
    const { _id } = await room.save();
    const contacts = users.map((user) => {
      return {
        user,
        room: _id,
      };
    });
    await Contact.insertMany(contacts);
    return res
      .status(201)
      .json({ status: true, message: `New group created !` });
  }
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
