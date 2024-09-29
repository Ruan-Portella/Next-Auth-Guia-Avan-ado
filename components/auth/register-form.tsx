'use client';

import * as z from 'zod'

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '@/schemas'
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import React from 'react'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { register } from '@/actions/register';

export function RegisterForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError(undefined)
    setSuccess(undefined)

    startTransition(() => {
      register(values)
       .then((data) => {
          setError(data.error)
          setSuccess(data.success)
       })
    })
  };

  return (
    <CardWrapper
      headerLabel='Crie sua conta'
      backButtonLabel='Já tem uma conta?'
      backButtonHref='/auth/login'
      showSocial
    >
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
                <FormField control={form.control} name='email' render={({field}) => (
                  <FormItem>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder='ruan@gmail.com' type='email' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name='password' render={({field}) => (
                  <FormItem>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder='******' type='password' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name='name' render={({field}) => (
                  <FormItem>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder='Ruan Portella' type='text' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type='submit' disabled={isPending} className='w-full'>
                Criar conta
            </Button>
          </form>
      </Form>
    </CardWrapper>
  )
}
