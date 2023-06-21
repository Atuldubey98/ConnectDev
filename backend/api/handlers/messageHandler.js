function messageHandler(socket, io) {
  function sendMessageHandler(data) {
    console.log(data);
  }
  return Object.freeze({ sendMessageHandler });
}
module.exports = messageHandler;
