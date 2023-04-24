import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISignInState {
  userName: string;
  password: string;
  loading: boolean;
  errorMessage?: string;
}

const initialState: ISignInState = {
  userName: '',
  password: '',
  loading: false
};

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      state.errorMessage = undefined;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
      state.errorMessage = undefined;
    },
    cleanFormData: (state) => {
      state.userName = '';
      state.password = '';
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    signIn: (state, action: PayloadAction<[string, string, (path: string) => void]>) => {},
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    // incrementAsync: (state) => {},
    // decrementAsync: (state) => {},
    // incrementByAmountAsync: (state, action: PayloadAction<number>) => {},
    // incrementByAmountAsyncSuccess: (state) => {},
    // incrementByAmountAsyncFailure: (state) => {},
  },
});

export const { actions: signInActions, reducer: signInReducer } =
signInSlice;