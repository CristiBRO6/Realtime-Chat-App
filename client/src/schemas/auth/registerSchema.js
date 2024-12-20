import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*_-]/, 'Password must contain at least one special character: !@#$%^&*_'),
  confirmPassword: z.string()
    .min(1, 'Confirm Password is required'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default registerSchema;
