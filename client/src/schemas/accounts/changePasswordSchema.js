import { z } from "zod";

const changePasswordSchema = z.object({
  currentPassword: z.string()
    .min(8, 'Current Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Current Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Current Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Current Password must contain at least one number')
    .regex(/[!@#$%^&*_-]/, 'Current Password must contain at least one special character: !@#$%^&*_-'),
  newPassword: z.string()
    .min(8, 'New Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'New Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'New Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'New Password must contain at least one number')
    .regex(/[!@#$%^&*_-]/, 'New Password must contain at least one special character: !@#$%^&*_-'),
  confirmPassword: z.string()
    .min(1, 'Confirm Password is required'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default changePasswordSchema;
