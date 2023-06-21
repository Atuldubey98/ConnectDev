const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
        default: [],
      },
    ],
    name: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "message",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = Contact = model("contact", contactSchema);
