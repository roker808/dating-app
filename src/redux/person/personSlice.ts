import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProfile } from "../../services/Profile";

interface IPersonState {
  loadingProfile: boolean;
  profile?: IProfile;
}

const initialState: IPersonState = {
  loadingProfile: false
};

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    loading: (state, action: PayloadAction<boolean>) => {
      state.loadingProfile = action.payload;
    },
    fetchProfile: (state, action: PayloadAction<string>) => {
      state.profile = undefined;
    },
    profileFetched: (state, action: PayloadAction<IProfile>) => { state.profile = action.payload; }
  },
});

export const { actions: personActions, reducer: personReducer } =
  personSlice;