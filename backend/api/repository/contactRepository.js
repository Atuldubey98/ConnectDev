const Contact = require("../../models/Contact");
const ErrorHandler = require("../../utils/errorhandler");
const { getMessagesByContactIdAndPaginate } =
  require("../repository/messageRepository")();
function contactRepository() {
  const areMembersValid = (members) =>
    Array.isArray(members) &&
    members.every((member) => typeof member === "string");
  async function getMessagesForContactById(contactId, page = 1) {
    if (typeof contactId !== "string" || typeof page !== "number")
      throw new ErrorHandler("PAYLOAD_ERROR", 400);
    const messages = await getMessagesByContactIdAndPaginate(contactId, page);
    return messages;
  }
  async function updateContactWithMessage(messageId, contactId = "") {
    if (typeof messageId !== "object" || typeof contactId !== "string") {
      throw new ErrorHandler("PAYLOAD_ERROR", 400);
    }
    await Contact.updateOne(
      { _id: contactId },
      { $push: { messages: messageId } }
    );
    return true;
  }
  async function getContactByRecipientId(members) {
    if (!areMembersValid(members)) {
      throw new ErrorHandler("PAYLOAD_ERROR", 400);
    }
    const contact = await Contact.findOne({
      members: { $size: 2 },
      members: { $all: members },
      isGroup: false,
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
  async function getContactIdsOfCurrentUserToSubscribe(userId) {
    if (!userId) {
      throw new ErrorHandler("PAYLOAD_ERROR", 400);
    }
    const contactIds = await Contact.find({
      members: { $in: [userId] },
    }).select("_id");
    return contactIds;
  }
  /// Complete this function check contact table
  async function getContactsOfCurrentUser(userId) {
    if (!userId) {
      throw new ErrorHandler("PAYLOAD_ERROR", 400);
    }
    const contacts = await Contact.aggregate([
      { $match: { members: { $in: [userId] } } },
      {
        $lookup: {
          from: "users",
          localField: "members",
          foreignField: "_id",
          as: "members",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "messages",
          foreignField: "_id",
          as: "messages",
        },
      },
      {
        $unwind: "$createdBy",
      },
      {
        $project: {
          createdBy: {
            name: "$createdBy.name",
            _id: "$createdBy._id",
            avatar: "$createdBy.avatar",
            email: "$createdBy.email",
          },
          members: {
            $map: {
              input: "$members",
              as: "member",
              in: {
                name: "$$member.name",
                _id: "$$member._id",
                avatar: "$$member.avatar",
                email: "$$member.email",
                isActiveNow: "$$member.isActiveNow",
                lastActive: "$$member.lastActive",
              },
            },
          },
          messageResponse: {
            messages: [],
            totalDocs: { $ifNull: ["$totalDocs", 0] },
            limit: { $ifNull: ["$limit", 0] },
            totalPages: { $ifNull: ["$totalPages", 0] },
            page: 1,
            pagingCounter: 1,
            hasPrevPage: { $ifNull: ["$hasPrevPage", false] },
            hasNextPage: { $ifNull: ["$hasNextPage", false] },
            prevPage: null,
            nextPage: null,
          },
          isGroup: "$isGroup",
          createdAt: "$createdAt",
          updatedAt: "$updatedAt",
        },
      },
    ]);
    return contacts;
  }
  return Object.freeze({
    getContactByRecipientId,
    createContact,
    getContactsOfCurrentUser,
    updateContactWithMessage,
    getContactIdsOfCurrentUserToSubscribe,
    getMessagesForContactById,
  });
}
module.exports = contactRepository;
