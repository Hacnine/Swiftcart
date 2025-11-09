import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminService } from '../../services';

export const fetchAdminStats = createAsyncThunk(
  'admin/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await adminService.getStats();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await adminService.getUsers(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const approveVendor = createAsyncThunk(
  'admin/approveVendor',
  async (vendorId, { rejectWithValue }) => {
    try {
      const { data } = await adminService.approveVendor(vendorId);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to approve vendor');
    }
  }
);

export const rejectVendor = createAsyncThunk(
  'admin/rejectVendor',
  async ({ vendorId, reason }, { rejectWithValue }) => {
    try {
      const { data } = await adminService.rejectVendor(vendorId, reason);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reject vendor');
    }
  }
);

const initialState = {
  stats: null,
  users: [],
  pagination: {},
  loading: false,
  error: null,
  message: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(approveVendor.fulfilled, (state, action) => {
        state.message = 'Vendor approved successfully';
      })
      .addCase(rejectVendor.fulfilled, (state, action) => {
        state.message = 'Vendor rejected';
      });
  },
});

export const { clearError, clearMessage } = adminSlice.actions;

export const selectAdminStats = (state) => state.admin.stats;
export const selectAdminUsers = (state) => state.admin.users;

export default adminSlice.reducer;
