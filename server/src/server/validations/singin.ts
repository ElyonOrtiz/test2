import {z} from "zod";

export const singInValidate = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});