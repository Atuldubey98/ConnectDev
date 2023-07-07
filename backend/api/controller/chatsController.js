const { getMessagesForContactById } =
  require("../repository/contactRepository")();
exports.getChatsByContactId = async (req, res, next) => {
  const { page: pageParams } = req.query;
  const page = isNaN(parseInt(pageParams)) ? 1 : parseInt(pageParams);
  const messages = await getMessagesForContactById(req.params.contactId, page);
  return res.status(200).send(messages);
};
