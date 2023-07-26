function subscribeToContactHandler(io, socketUserIdsMap) {
    function getSocketIdsByUserIds(members) {
        if (!Array.isArray(members)) {
            return [];
        }
        const socketIds = members.map(member => socketUserIdsMap.get(member) || "");
        return socketIds;
    }
    return (data) => {
        const socketIds = getSocketIdsByUserIds(data.members);
        socketIds.forEach(socketId => {
            if (socketId) {
                io.sockets.sockets.get(socketId).join(`contact:${data._id}`,)
            }
        })
    }
}

module.exports = subscribeToContactHandler;