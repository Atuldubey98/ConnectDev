function roomJoinHandler(socket) {
  return async (data) => {
    const { type, _id } = data;
    socket.join(`${type}:` + _id);
  };
}

module.exports = roomJoinHandler;
