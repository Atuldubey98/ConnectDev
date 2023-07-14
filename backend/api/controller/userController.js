const User = require("../../models/User");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const bcryptjs = require("bcryptjs");
const sendToken = require("../../utils/sendToken");
const { getPaginationFilter } = require("../../utils/sanitize");
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { password, ...others } = req.body;
  const user = new User({
    ...others,
    password: await bcryptjs.hash(password, await bcryptjs.genSalt(8)),
  });
  await user.save();
  return res.status(201).json({ status: true, message: "User created" });
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("PAYLOAD_ERROR");
  }
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
  sendToken(user, 200, res);
});

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("io", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.clearCookie("token", { path: "/" });
  return res.status(200).json({ status: true, message: "User logged out" });
});

exports.getCurrentUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  return res.status(200).json(user);
});

exports.searchUser = catchAsyncErrors(async (req, res, next) => {
  const { limit, page } = getPaginationFilter(req.query);
  const search = typeof req.params.search === "string" ? req.params.search : "";
  const query = {
    $text: {
      $search: search,
      $caseSensitive: false,
    },
  };
  const options = {
    limit,
    page,
    select: "_id name avatar email",
    customLabels: {
      docs: "users",
    },
  };
  const users = await User.paginate(query, options);
  return res.status(200).send(users);
});
