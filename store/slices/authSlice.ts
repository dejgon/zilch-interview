import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import {
  RequestStatus,
  SecureStoreKeys,
  UserData,
  UserFormFields,
} from '../../types';
import type { RootState } from '../store';

type AuthState = UserData & {
  loading: RequestStatus;
};

const initialState: AuthState = {
  userId: null,
  email: undefined,
  token: undefined,
  loading: RequestStatus.Idle,
};

export const signIn = createAsyncThunk(
  'users/sign-in',
  async (data: UserFormFields) => {
    let response;
    /* Small snippet to easily enable local tests using the specific email, all other emails works as a normal login,
         purely for the presentational purposes */
    if (data.email === 'test@test.com') {
      response = await new Promise<{ data: any }>((resolve, reject) => {
        // Randomize if request resolves or rejects
        if (Math.floor(Math.random() * 2) % 2) {
          resolve({
            data: {
              userId: 'testUser333',
              token: '234ghfgZsskd',
              email: 'test@test.com',
            },
          });
        } else {
          reject(new Error('Rejected'));
        }
      });
    } else {
      response = await axios.post('auth/sign-in', data);
    }
    await SecureStore.setItemAsync(
      SecureStoreKeys.User,
      JSON.stringify(response.data)
    );
    return response.data;
  }
);

export const signUp = createAsyncThunk(
  'users/sign-up',
  async (data: UserFormFields) => {
    const response = await axios.post('auth/sign-up', data);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setUser: (state, action: PayloadAction<UserData>) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    signOut: (state) => {
      state.userId = null;
      state.email = undefined;
      state.token = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state, action) => {
      state.loading = RequestStatus.Pending;
    });
    builder.addCase(
      signIn.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.loading = RequestStatus.Succeeded;
        state.userId = action.payload.userId;
        state.email = action.payload.email;
        state.token = action.payload.token;
      }
    );
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = RequestStatus.Failed;
    });
    builder.addCase(signUp.pending, (state, action) => {
      state.loading = RequestStatus.Pending;
    });
    builder.addCase(
      signUp.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.loading = RequestStatus.Succeeded;
        state.userId = action.payload.userId;
        state.email = action.payload.email;
      }
    );
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = RequestStatus.Failed;
    });
  },
});

export const { setUser, setUserId, signOut } = authSlice.actions;

export const selectUserId = (state: RootState) => state.auth.userId;
export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
