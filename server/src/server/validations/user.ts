import {z} from "zod";

export const userValidate = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
  status: z.boolean()
});

export const deleteValidate = z.object({
  id: z.number()
})

export const updateByIdValidation = z.object({
   id: z.number()
})