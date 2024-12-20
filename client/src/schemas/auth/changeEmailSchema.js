import { z } from "zod";

const changeEmailSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email format')
});

export default changeEmailSchema;
