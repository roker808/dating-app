import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../../services/AuthService';
import { IProfile } from '../../services/Profile';

export interface IAppState {
  profileId?: string;
  token?: string;
  profile?: IProfile;
  appName: string;
}

const data = authService.getData();

const initialState: IAppState = {
  profileId: data?.profileId,
  token: data?.token,
  appName: 'Date Me App'
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<[string, string]>) => {
      state.profileId = action.payload[0];
      state.token = action.payload[1];
    },
    authenticated: (_, __: PayloadAction<[string, string, (path: string) => void]>) => {},
    signOut: (_, __: PayloadAction<(path: string) => void>) => {},
    clearData: (state) => {
      state.profileId = undefined;
      state.token = undefined;
    },
    fetchAppProfile: (state, action: PayloadAction<string>) => {},
    appProfileFetched: (state, action: PayloadAction<IProfile>) => {
      state.profile = action.payload;
    },
    init: () => {}
  },
});

export const { actions: appActions, reducer: appReducer } =
  appSlice;