const { Schema, model } = require("mongoose");
const messageSchema = new Schema(
  {
    isRead: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
        default: [],
      },
    ],
    sender: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    contact: {
      type: Schema.Types.ObjectId,
      ref: "contact",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = Message = model("message", messageSchema);
