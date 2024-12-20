import { z } from 'zod';

const sendMessageSchema = z.object({
  text: z.string().trim().min(1, 'Text is required'),
});

export default sendMessageSchema;