const { getContactByRecipientId, createContact, getContactsOfCurrentUser } =
  require("../repository/contactRepository")();
exports.getExistingOrCreateContact = async (req, res, next) => {
  const recipientUserId = req.body.recipientUserId || "";
  const memberUserIds = [recipientUserId, req.user._id.toString()];
  let contact = await getContactByRecipientId(memberUserIds);
  if (!contact) {
    contact = await createContact({
      members: memberUserIds,
      createdBy: req.user._id.toString(),
    });
  }
  return res.status(201).json(contact);
};

exports.getContactsOfCurrentUser = async (req, res, next) => {
  const contacts = await getContactsOfCurrentUser(req.user._id);
  return res.status(200).json(contacts);
};
