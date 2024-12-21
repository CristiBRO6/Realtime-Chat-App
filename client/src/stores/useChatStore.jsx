import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';

import { useAuthStore } from '@/stores/useAuthStore';

import messageService from '@/services/api/messageService';

export const useChatStore = create(
  persist(
    (set, get) => ({
      globalMessages: [],
      messages: [],
      users: [],
      typing: false,
      
      selectedUser: null,

      getUsers: async () => {
        try {
          const res = await messageService.getUsers();
          
          set({ users: res.data });
        } catch (err) {
          set({ users: [] });

          toast.error(err.response.data.message);
          throw new Error(err.response.data.message);
        }
      },

      getGlobalMessages: async () => {
        try {
          const res = await messageService.getGlobalMessages();

          set({ globalMessages: res.data });
        } catch (err) {
          set({ globalMessages: [] });
          toast.error(err.response.data.message);
          throw new Error(err.response.data.message);
        }
      },

      getMessages: async (userId) => {
        try {
          const res = await messageService.getMessages(userId);

          set({ messages: res.data });
        } catch (err) {
          set({ messages: [] });

          toast.error(err.response.data.message);
          throw new Error(err.response.data.message);
        }
      },

      setTyping: (isTyping) => {
        set({ typing: isTyping });
      },

      sendGlobalMessage: async (messageData) => {
        const { globalMessages } = get();

        try {
          const res = await messageService.sendGlobalMessage(messageData);
          
          set({ globalMessages: [...globalMessages, res.data] });
        } catch (err) {
          toast.error(err.response.data.message); 
          throw new Error(err.response.data.message);
        }
      },

      sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();

        try {
          const res = await messageService.sendMessage(selectedUser, messageData);
          
          set({ messages: [...messages, res.data] });
        } catch (err) {
          toast.error(err.response.data.message);
          throw new Error(err.response.data.message);
        }
      },

      subscribeToGlobalMessages: () => {
        const socket = useAuthStore.getState().socket;

        socket.on("newGlobalMessage", (newMessage) => {
          set((state) => ({ globalMessages: [...state.globalMessages, newMessage] }));
        });
      },

      unsubscribeToGlobalMessages: () => {
        const socket = useAuthStore.getState().socket;

        socket.off("newGlobalMessage");
      },

      subscribeToMessages: () => {
        const { selectedUser } = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
          if(newMessage.senderId !== selectedUser) return;
          set((state) => ({ messages: [...state.messages, newMessage] }));
        });
      },

      unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;

        socket.off("newMessage");
      },

      subscribeToTyping: () => {
        const socket = useAuthStore.getState().socket;
      
        socket.on('typing', () => {
          const { selectedUser } = get();

          if (selectedUser) get().setTyping(true);
        });
      
        socket.on('stopTyping', () => {
          const { selectedUser } = get();
          
          if (selectedUser) get().setTyping(false);
        });
      },

      setSelectedUser: (selectedUser) => set({ selectedUser }),
    }),
    {
      name: 'chat-store',
      partialize: (state) => ({ selectedUser: state.selectedUser }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);