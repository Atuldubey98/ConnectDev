const logger = require("../../utils/logger");

function disconnectHandler(socket) {
  return () => {
    logger.warn({ level: "info", message: `Disconnecting ---- >${socket.id}` });
  };
}

module.exports = disconnectHandler;
