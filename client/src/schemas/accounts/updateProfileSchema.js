import { z } from 'zod';

const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export default updateProfileSchema;
