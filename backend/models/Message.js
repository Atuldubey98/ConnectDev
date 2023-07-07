const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
messageSchema.plugin(mongoosePaginate);

module.exports = Message = model("message", messageSchema);
