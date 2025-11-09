import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  mobileMenuOpen: false,
  theme: 'light',
  toast: {
    open: false,
    message: '',
    type: 'info', // success, error, warning, info
  },
  modal: {
    open: false,
    component: null,
    props: {},
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    showToast: (state, action) => {
      state.toast = {
        open: true,
        message: action.payload.message,
        type: action.payload.type || 'info',
      };
    },
    hideToast: (state) => {
      state.toast.open = false;
    },
    openModal: (state, action) => {
      state.modal = {
        open: true,
        component: action.payload.component,
        props: action.payload.props || {},
      };
    },
    closeModal: (state) => {
      state.modal = { open: false, component: null, props: {} };
    },
  },
});

export const {
  toggleSidebar,
  toggleMobileMenu,
  setTheme,
  showToast,
  hideToast,
  openModal,
  closeModal,
} = uiSlice.actions;

export const selectUI = (state) => state.ui;
export const selectToast = (state) => state.ui.toast;
export const selectModal = (state) => state.ui.modal;

export default uiSlice.reducer;
