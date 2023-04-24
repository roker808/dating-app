import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProfile } from "../../services/Profile";
import { IDialog } from "../../services/IDialog";

interface IDialogsState {
  dialogs?: IDialog[];
}

const initialState: IDialogsState = {
};

export const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    fetchDialogs: (state, action: PayloadAction<string>) => {
      state.dialogs = undefined;
    },
    dialogsFetched: (state, action: PayloadAction<IDialog[]>) => { state.dialogs = action.payload; }
  },
});

export const { actions: dialogsActions, reducer: dialogsReducer } =
dialogsSlice;