import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { messageService } from '../../services';

export const fetchConversations = createAsyncThunk(
  'message/fetchConversations',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await messageService.getConversations();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch conversations');
    }
  }
);

export const fetchConversation = createAsyncThunk(
  'message/fetchConversation',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await messageService.getConversation(id);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch conversation');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'message/sendMessage',
  async ({ conversationId, messageData }, { rejectWithValue }) => {
    try {
      const { data } = await messageService.sendMessage(conversationId, messageData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

const initialState = {
  conversations: [],
  currentConversation: null,
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      if (state.currentConversation?.id === action.payload.conversationId) {
        state.currentConversation.messages.push(action.payload);
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
      })
      .addCase(fetchConversation.fulfilled, (state, action) => {
        state.currentConversation = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        if (state.currentConversation) {
          state.currentConversation.messages.push(action.payload);
        }
      });
  },
});

export const { addMessage, clearError } = messageSlice.actions;

export const selectConversations = (state) => state.message.conversations;
export const selectCurrentConversation = (state) => state.message.currentConversation;

export default messageSlice.reducer;
