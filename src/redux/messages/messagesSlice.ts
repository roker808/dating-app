import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProfile } from "../../services/Profile";
import { IDialog } from "../../services/IDialog";
import { IMessage } from "../../services/IMessage";

interface IMessagesState {
  messages?: IMessage[];
  otherProfilie?: IProfile;
  newMessage: string;
}

const initialState: IMessagesState = {
  newMessage: ''
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessages: (state, action: PayloadAction<[string, string]>) => {
      state.messages = undefined;
    },
    messagesFetched: (state, action: PayloadAction<IMessage[]>) => { state.messages = action.payload; },
    fetchOtherProfile: (state, action: PayloadAction<string>) => { state.otherProfilie = undefined; },
    otherProfileFetched: (state, action: PayloadAction<IProfile>) => { state.otherProfilie = action.payload; },
    newMessageChanged: (state, action: PayloadAction<string>) => { state.newMessage = action.payload; },
    addNewMessage: (state, action: PayloadAction<[string, string, string]>) => { state.newMessage = ''; },
    newMessageAdded: (state, action: PayloadAction<IMessage>) => { state.messages?.push(action.payload); },
  },
});

export const { actions: messagesActions, reducer: messagesReducer } = messagesSlice;