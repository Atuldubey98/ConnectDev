const { createMessage } = require("../repository/messageRepository")();
const { updateContactWithMessage } =
  require("../repository/contactRepository")();
function messageHandler(socket, io) {
  async function sendMessageHandler(data) {
    const { contactId, content } = data;
    if (!contactId || !content) {
      return;
    }
    const message = await createMessage({
      contactId,
      sender: socket.user.id,
      content,
    });
    const isContactUpdated = await updateContactWithMessage(
      message._id,
      contactId
    );
    if (!isContactUpdated) {
      return;
    }
    io.to("contact:" + contactId).emit("message:received", message);
  }
  return Object.freeze({ sendMessageHandler });
}
module.exports = messageHandler;
