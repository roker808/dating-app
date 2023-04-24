import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile } from '../../services/Profile';

export interface IPeopleState {
  profiles?: IProfile[];
}

const initialState: IPeopleState = {
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    fetchProfiles: () => {},
    profilesFetched: (state, action: PayloadAction<IProfile[]>) => {state.profiles = action.payload;}
  },
});

export const { actions: peopleActions, reducer: peopleReducer } = peopleSlice;