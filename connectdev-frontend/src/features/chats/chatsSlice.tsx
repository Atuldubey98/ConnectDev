import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "../../app/store"
import { loadChatsByContactId, loadUserContacts } from "./chatsAPI"
import { Contact, Message, MessagesResponse } from "./interface"
import { FriendActiveStatus } from "../friends/interface"
export type ChatsStateType = {
  connected: boolean
  contactsStatus: "loading" | "idle" | "failure" | "success"
  contacts: Contact[] | null
}
export type ContactFriendActiveStatus = {
  isActiveNow: FriendActiveStatus,
  friendId: string;
}
const initialState: ChatsStateType = {
  connected: false,
  contacts: null,
  contactsStatus: "idle",
}
const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setConnectionState: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload
    },
    setContactLoading: (state) => {
      state.contactsStatus = "loading"
    },
    setContactsSuccess: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload
      state.contactsStatus = "success"
    },
    
    setAddMessageToContactById: (state, action: PayloadAction<Message>) => {
      state.contacts = state.contacts
        ? state.contacts.map((contact) =>
          contact._id === action.payload.contact
            ? {
              ...contact,
              messagesResponse: contact.messagesResponse
                ? {
                  ...contact.messagesResponse,
                  messages: [
                    ...(contact.messagesResponse.messages || []),
                    action.payload,
                  ],
                }
                : null,
            }
            : contact,
        )
        : null
    },
    setContactMessagesResponse: (
      state,
      action: PayloadAction<MessagesResponse>,
    ) => {
      state.contacts = state.contacts
        ? state.contacts.map((contact) =>
          contact._id === action.payload.contactId
            ? {
              ...contact,
              messagesResponse: contact.messagesResponse
                ? {
                  messages: [
                    ...(contact.messagesResponse.messages || []),
                    ...(action.payload.messages || []),
                  ],
                  ...action.payload,
                }
                : action.payload,
            }
            : contact,
        )
        : null
    },
  },
})

export const {
  setContactLoading,
  setContactsSuccess,
  setConnectionState,
  setAddMessageToContactById,
  setContactMessagesResponse,
} = chatsSlice.actions
export default chatsSlice.reducer
export const loadUserContactsAction = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setContactLoading())
    const { data } = await loadUserContacts()
    dispatch(setContactsSuccess(data))
  } catch (error) { }
}
export const loadChatsByContactIdAction =
  (contactId: string): AppThunk =>
    async (dispatch) => {
      try {
        const { data } = await loadChatsByContactId(contactId)
        dispatch(setContactMessagesResponse(data))
      } catch (error) { }
    }
