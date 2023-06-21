const Contact = require("../../models/Contact");
const ErrorHandler = require("../../utils/errorhandler");

function contactRepository() {
  const areMembersValid = (members) =>
    Array.isArray(members) &&
    members.every((member) => typeof member === "string");
  async function getContactByRecipientId(members) {
    if (!areMembersValid(members)) {
      throw new ErrorHandler("PAYLOAD_ERROR", 400);
    }
    const contact = await Contact.findOne({
      members: { $size: 2 },
      members: { $all: members },
    });
    return contact;
  }
  async function createContact({ members, isGroup = false, createdBy }) {
    if (!areMembersValid(members)) {
      throw new ErrorHandler("PAYLOAD_ERROR", 400);
    }
    const contact = new Contact({
      members,
      isGroup,
      createdBy,
    });
    await contact.save();
    return contact;
  }
  return Object.freeze({
    getContactByRecipientId,
    createContact,
  });
}
module.exports = contactRepository;
