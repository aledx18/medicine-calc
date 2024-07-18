'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { FormFieldType } from '@/lib/utils'
import CustomFormField from './customFormField'

const formSchema = z.object({
  dosisMg: z.string().min(1, {
    message: 'dosisMg must be at least 1 characters.'
  }),
  pacientKg: z.string().min(1, {
    message: 'pacientKg must be at least 1 characters.'
  })
})

export default function PatientForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dosisMg: '',
      pacientKg: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex-1 space-y-6'>
        <section className='mb-12 space-y-4'>
          <h1 className='header'>Hi there 👋</h1>
          <p className='text-dark-700'>Get started.</p>
        </section>

        <div className='grid grid-cols-2 gap-4'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='dosisMg'
            label='Dosis (mg)'
            placeholder='36'
            iconSrc='Syringe'
            iconAlt='Syringe'
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='pacientKg'
            label='Kg. Paciente'
            placeholder='34kg'
            iconSrc='Weight'
            iconAlt='Weight'
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='presentacionMg'
            label='Presentacion Mg'
            placeholder='273mg'
            iconSrc='Pill'
            iconAlt='Pill'
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='presentacionMl'
            label='Presentacion Ml'
            placeholder='87ml'
            iconSrc='PillBottleIcon'
            iconAlt='PillBottleIcon'
          />
        </div>

        <Button variant='shadow' type='submit' className='w-full'>
          Calcular
        </Button>
      </form>
    </Form>
  )
}
