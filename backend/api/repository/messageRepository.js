const Message = require("../../models/Message");
const ErrorHandler = require("../../utils/errorhandler");

function messageRepository() {
  async function createMessage(message) {
    if (!message.contactId || !message.content || !message.sender) {
      throw new ErrorHandler("PAYLOAD_ERROR", 400);
    }
    const { contactId, ...restMessage } = message;
    const newMessage = new Message({ ...restMessage, contact: contactId });
    await (
      await newMessage.save()
    ).populate("sender", "avatar email name isActiveNow lastActive");
    return newMessage;
  }
  async function getMessagesByContactIdAndPaginate(contactId, page = 1) {
    if (typeof contactId !== "string" || typeof page !== "number")
      throw new ErrorHandler("PAYLOAD_ERROR", 404);
    const messagesPaginated = await Message.paginate(
      { contact: contactId },
      {
        page,
        limit: 10,
        sort: {
          createdAt: -1,
        },
        customLabels: {
          docs: "messages",
        },
        populate: [
          {
            path: "sender",
            select: "name email avatar _id",
          },
          {
            path: "isRead",
            select: "name email avatar _id",
          },
        ],
      }
    );
    return {
      contactId,
      messages: messagesPaginated.messages.reverse(),
      ...messagesPaginated,
    };
  }
  return Object.freeze({ createMessage, getMessagesByContactIdAndPaginate });
}
module.exports = messageRepository;
