import { create } from 'zustand';
import { toast } from 'sonner';
import { io } from 'socket.io-client';

import authService from '@/services/api/authService';
import userService from '@/services/api/userService';

const BASE_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = create((set, get) => ({
  user: null,
  onlineUsers: [],
  isLoadingUser: false,

  socket: null,

  fetchUser: async () => {
    const { connectSocket } = get();

    set({ isLoadingUser: true });
    try {
      const res = await userService.getProfile();
      set({ user: res.data });
      connectSocket();
    } catch {
      set({ user: null });
    } finally {
      set({ isLoadingUser: false });
    }
  },

  updateUser: (newUserData) => {
    set((state) => ({ user: { ...state.user, ...newUserData } }));
  },

  refreshUser: () => {
    const { fetchUser } = useAuthStore.getState();
    fetchUser();
  },

  isLoadingLogin: false,
  isLoadingRegister: false,
  isLoadingEmailVerification: false,
  isLoadingForgotPassword: false,
  isLoadingResetPassword: false,
  isLoadingResendCode: false,
  isLoadingLogout: false,

  login: async (data) => {
    const { refreshUser, connectSocket } = get();

    set({ isLoadingLogin: true });
    try {
      const res = await authService.login(data);
      if(res.data.status) {
        refreshUser();
        connectSocket();
      }
      return res;
    } catch (err) {
      toast.error(err.response.data.message || 'A problem occurred');
    } finally {
      set({ isLoadingLogin: false });
    }
  },

  register: async (data) => {
    set({ isLoadingRegister: true });
    try {
      const res = await authService.register(data);
      return res;
    } catch (err) {
      toast.error(err.response.data.message || 'A problem occurred');
    } finally {
      set({ isLoadingRegister: false });
    }
  },

  emailVerification: async (id, data) => {
    const { refreshUser, connectSocket } = get();

    set({ isLoadingEmailVerification: true });
    try {
      const res = await authService.emailVerification(id, data);
      if(res.data.status) {
        refreshUser();
        connectSocket();
      }
      return res;
    } catch (err) {
      toast.error(err.response.data.message || 'A problem occurred');
    } finally {
      set({ isLoadingEmailVerification: false });
    }
  },

  forgotPassword: async (data) => {
    set({ isLoadingForgotPassword: true });
    try {
      const res = await authService.forgotPassword(data);
      return res;
    } catch (err) {
      toast.error(err.response.data.message || 'A problem occurred');
    } finally {
      set({ isLoadingForgotPassword: false });
    }
  },

  resetPassword: async (id, data) => {
    const { refreshUser, connectSocket } = get();

    set({ isLoadingResetPassword: true });
    try {
      const res = await authService.resetPassword(id, data);
      if(res.data.status) {
        refreshUser();
        connectSocket();
      }
      return res;
    } catch (err) {
      toast.error(err.response.data.message || 'A problem occurred');
    } finally {
      set({ isLoadingResetPassword: false });
    }
  },

  resendCode: async (id) => {
    const { refreshUser, connectSocket } = get();

    set({ isLoadingResendCode: true });
    try {
      const res = await authService.resendCode(id);
      if(res.data.status) {
        refreshUser();
        connectSocket();
      }
      return res;
    } catch (err) {
      toast.error(err.response.data.message || 'A problem occurred');
    } finally {
      set({ isLoadingResendCode: false });
    }
  },
  
  logout: async () => {
    const { disconnectSocket } = get();

    set({ isLoadingLogout: true });
    try {
      const res = await authService.logout();
      if(res.data.status) {
        set({ user: null });
        disconnectSocket();
      }
      return res;
    } catch (err) {
      toast.error(err.response.data.message || 'A problem occurred');
    } finally {
      set({ isLoadingLogout: false });
    }
  },

  connectSocket: () => {
    const { user } = get();
    if(!user || get().socket?.connected) return;
    
    const socket = io(BASE_URL, {
      query: {
        userId: user.id,
      }
    });
    socket.connect();

    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if(get().socket?.connected) get().socket.disconnect();
  }

}));