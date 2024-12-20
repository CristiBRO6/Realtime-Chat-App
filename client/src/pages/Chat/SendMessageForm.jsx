import { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { useChatStore } from '@/stores/useChatStore';
import { useAuthStore } from '@/stores/useAuthStore';
import sendMessageSchema from '@/schemas/sendMessageSchema';

const SendMessageForm = () => {
  const { control, handleSubmit, formState: { isSubmitting }, setFocus, reset, watch } = useForm({
    resolver: zodResolver(sendMessageSchema)
  });
  const { selectedUser, sendGlobalMessage, sendMessage } = useChatStore();
  const socket = useAuthStore.getState().socket;

  const [isDisabled, setIsDisabled] = useState(true);
  const text = watch('text');

  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    setIsDisabled(text?.trim().length === 0 || isSubmitting);
  }, [text, isSubmitting]);

  const handleTyping = () => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    else socket.emit('typing', selectedUser);

    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping();
    }, 2000);
  };

  const handleStopTyping = () => {
    socket.emit('stopTyping', selectedUser);
    typingTimeoutRef.current = null;
  };

  const onSubmit = async (data) => {
    const { text } = data;

    try {
      if (selectedUser) await sendMessage({ text });
      else await sendGlobalMessage({ text });

      handleStopTyping();
      reset();

      setTimeout(() => setFocus("text"), 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-16 w-full flex items-center px-4 border-t">
      <form className="w-full flex items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="text"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              autoComplete="off"
              placeholder="Type a message..."
              className="flex-1"
              disabled={isSubmitting}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleTyping();
              }}
            />
          )}
        />
        <Button type="submit" variant="outline" size="icon" icon={Send} disabled={isDisabled} />
      </form>
    </div>
  );
};

export default SendMessageForm;
