import { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services';

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      };
    
    case 'LOAD_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    
    case 'UPDATE_USER':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    
    case 'AUTH_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.token) {
      loadUser();
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const loadUser = async () => {
    try {
      const { data } = await authService.getMe();
      dispatch({ type: 'LOAD_USER', payload: data.data });
    } catch (error) {
      console.error('Load user error:', error);
      dispatch({ type: 'LOGOUT' });
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { data } = await authService.register(userData);
      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { data } = await authService.login(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: 'LOGOUT' });
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const { data } = await authService.updateProfile(profileData);
      dispatch({ type: 'UPDATE_USER', payload: data.data });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed';
      return { success: false, message };
    }
  };

  const isRole = (role) => {
    return state.user?.role === role;
  };

  const isBuyer = () => isRole('BUYER');
  const isSeller = () => isRole('SELLER');
  const isAdmin = () => isRole('ADMIN');

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        updateProfile,
        loadUser,
        isRole,
        isBuyer,
        isSeller,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
