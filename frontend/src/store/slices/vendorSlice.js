import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { vendorService } from '../../services';

export const registerVendor = createAsyncThunk(
  'vendor/register',
  async (vendorData, { rejectWithValue }) => {
    try {
      const { data } = await vendorService.registerVendor(vendorData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to register vendor');
    }
  }
);

export const fetchVendorProfile = createAsyncThunk(
  'vendor/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await vendorService.getProfile();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const updateVendorProfile = createAsyncThunk(
  'vendor/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await vendorService.updateProfile(profileData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const fetchVendorStats = createAsyncThunk(
  'vendor/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await vendorService.getStats();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
    }
  }
);

export const fetchVendorOrders = createAsyncThunk(
  'vendor/fetchOrders',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await vendorService.getOrders(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'vendor/updateOrderStatus',
  async ({ orderId, statusData }, { rejectWithValue }) => {
    try {
      const { data } = await vendorService.updateOrderStatus(orderId, statusData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update status');
    }
  }
);

const initialState = {
  profile: null,
  stats: null,
  orders: [],
  pagination: {},
  loading: false,
  error: null,
  message: null,
};

const vendorSlice = createSlice({
  name: 'vendor',
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
      .addCase(registerVendor.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.message = 'Vendor registration submitted';
      })
      .addCase(fetchVendorProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(updateVendorProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.message = 'Profile updated successfully';
      })
      .addCase(fetchVendorStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(fetchVendorOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        state.message = 'Order status updated';
      });
  },
});

export const { clearError, clearMessage } = vendorSlice.actions;

export const selectVendorProfile = (state) => state.vendor.profile;
export const selectVendorStats = (state) => state.vendor.stats;
export const selectVendorOrders = (state) => state.vendor.orders;

export default vendorSlice.reducer;
