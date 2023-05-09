const User = require("../../models/User");
const Profile = require("../../models/Profile");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const bcryptjs = require("bcryptjs");
const sendToken = require("../../utils/sendToken");
const Contact = require("../../models/Contact");
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { password, ...others } = req.body;
  const user = new User({
    ...others,
    password: await bcryptjs.hash(password, 12),
  });
  await user.save();
  return res.status(201).json({ status: true, message: "User created" });
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ status: false, message: "User not authenticated" });
  }
  if (!(await bcryptjs.compare(password, user.password))) {
    return res
      .status(401)
      .json({ status: false, message: "User not authenticated" });
  }
  sendToken(user, 201, res);
});

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.cookie("io", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  return res.status(200).json({ status: true, message: "User logged out" });
});

exports.getCurrentUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  return res.status(200).json(user);
});

exports.getChatUser = catchAsyncErrors(async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const offset = page * 5;
  const search = req.query.search;
  if (!search) {
    return res.status(200).json({
      status: true,
      message: "Enter text in search box !",
    });
  }
  const totalCount = await User.find({ name: { $regex: search } }).count();
  const totalPages = totalCount > 0 ? Math.ceil(totalCount / 5) : 0;
  const users = await User.find(
    { email: { $regex: search }, _id: { $ne: req.user._id } },
    "name email avatar _id",
    { skip: offset, limit: 5 }
  );

  const chatIds = users.map(({ _id }) => {
    const chatId =
      _id < req.user._id ? _id + "_" + req.user._id : req.user._id + "_" + _id;
    return chatId;
  });
  const fetchedContacts = await Contact.find({
    chatId: { $in: chatIds },
    user: { $ne: req.user._id },
  });
  const contactsMap = {};
  const contacts = fetchedContacts
    .map((contact) => contact.user)
    .forEach((id) => {
      contactsMap[id] = true;
    });

  return res.status(200).json({
    status: true,
    users: users.map((user) => {
      return {
        ...user._doc,
        isContact: user._id in contactsMap,
      };
    }),
    contacts,
    meta: {
      totalCount,
      totalPages,
      currentPage: page + 1,
      currentTotal: users.length,
    },
  });
});
