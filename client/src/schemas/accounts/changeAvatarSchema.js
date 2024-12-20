import { z } from 'zod';

import * as uploadConfig from '@/constants/uploadConfig';

const MAX_FILE_SIZE = uploadConfig.MAX_FILE_SIZE;
const ACCEPTED_FILE_TYPES = uploadConfig.ACCEPTED_FILE_TYPES.split(",");

const avatarSchema = z.object({
  avatar: z
    .instanceof(File)
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: `Invalid file type. Accepted types are: ${ACCEPTED_FILE_TYPES.join(", ")}`,
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    }),
});

export default avatarSchema;