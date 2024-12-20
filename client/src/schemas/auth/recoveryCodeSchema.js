import { z } from "zod";

const recoveryCodeSchema = z.object({
  recoveryCode: z.string()
    .min(1, 'Recovery code is required')
});

export default recoveryCodeSchema;
