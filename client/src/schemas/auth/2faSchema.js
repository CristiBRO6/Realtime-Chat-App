import { z } from "zod";

const twofaSchema = z.object({
  code: z.coerce
    .string()
    .nonempty('Code is required')
    .refine(value => value.length === 6, {
      message: 'The code must have exactly 6 digits',
    })
    .refine(value => !isNaN(Number(value)), {
      message: 'Code must be a valid number',
    }),
});

export default twofaSchema;
