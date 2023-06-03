const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const NotificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    href: {
      type: String,
      default: "#",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);
NotificationSchema.plugin(mongoosePaginate);

module.exports = Notification = model("notification", NotificationSchema);
