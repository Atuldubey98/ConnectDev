const { getContactByRecipientId, createContact } =
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
