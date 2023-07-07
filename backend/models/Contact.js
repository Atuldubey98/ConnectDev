const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
contactSchema.plugin(mongoosePaginate);
module.exports = Contact = model("contact", contactSchema);
