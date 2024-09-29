import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email inválido'
  }),
  password: z.string().min(1, {
    message: 'Senha inválida'
  })
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email inválido'
  }),
  password: z.string().min(6, {
    message: 'Mínimo de 6 caracteres'
  }),
  name: z.string().min(1, {
    message: 'Nome inválido'
  })
});