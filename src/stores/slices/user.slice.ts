import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { userService } from '../../services/api/user.service';
import type { RootState } from '../index';
import { User } from '../../types/user.type';
import { UserState } from 'types';



const initialState: UserState = {
  entities: {
    byId: {},
    allIds: [],
  },
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getAllUsers();
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/update',
  async (userData: User, { rejectWithValue }) => {
    try {
      return await userService.updateUser(userData.id, userData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to update user');
    }
  }
);
export const deleteUser = createAsyncThunk(
  'users/delete',
  async (userId: number, { rejectWithValue }) => {
    try {
      return await userService.deleteUser(userId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete user');
    }
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;

        // Normalize data
        const byId: Record<number, User> = {};
        const allIds: number[] = [];

        action.payload.forEach(user => {
          byId[user.id] = user;
          allIds.push(user.id);
        });

        state.entities = { byId, allIds };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const existingUser = state.entities.byId[action.payload.id];
        if (existingUser && JSON.stringify(existingUser) !== JSON.stringify(action.payload)) {
          state.entities.byId[action.payload.id] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        const userId = action.payload;
        delete state.entities.byId[userId];
        state.entities.allIds = state.entities.allIds.filter(id => id !== userId);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export default userSlice.reducer;

// Selectors
export const selectUserEntities = (state: RootState) => state.user.entities.byId;
export const selectUserIds = (state: RootState) => state.user.entities.allIds;
;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectAllUsers = (state: RootState) => Object.values(state.user.entities.byId);
export const selectUserById = (state: RootState, userId: number) => state.user.entities.byId[userId];
export const selectUserList = (state: RootState) =>
  state.user.entities.allIds.map(id => state.user.entities.byId[id]);
export const makeSelectUserById = () => createSelector(
  [(state: RootState) => state.user.entities.byId, (_, userId: number) => userId],
  (byId, userId) => byId[userId]
);

