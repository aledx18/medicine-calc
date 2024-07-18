'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { FormFieldType } from '@/lib/utils'
import CustomFormField from './customFormField'
import { useState } from 'react'
import { CircleXIcon } from 'lucide-react'

const formSchema = z.object({
  dosisMg: z.string().min(1, {
    message: 'dosisMg must be at least 1 characters.'
  }),
  pacientKg: z.string().min(1, {
    message: 'pacientKg must be at least 1 characters.'
  }),
  presentacionMg: z.string().min(1, {
    message: 'presentacionMg must be at least 1 characters.'
  }),
  presentacionMl: z.string().min(1, {
    message: 'presentacionMl must be at least 1 characters.'
  })
})

export default function PatientForm() {
  const [result, setResult] = useState<number | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dosisMg: '',
      pacientKg: '',
      presentacionMg: '',
      presentacionMl: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const result = parseInt(values.dosisMg) / parseInt(values.pacientKg)
    const presentacionMg = parseFloat(values.presentacionMg)
    const presentacionMl = parseFloat(values.presentacionMl)

    const re = (result * presentacionMl) / presentacionMg
    setResult(re)
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex-1 space-y-6'>
          <section className='mb-12 space-y-4'>
            <h1 className='header'>Hi there 👋</h1>
            <p className='text-dark-700'>Calculadora de Dosis</p>
            <div className='flex justify-between items-center'>
              {result && (
                <p className='text-dark-700'>
                  Resultado: {result.toFixed(2)} ml
                </p>
              )}
              <Button
                className='ml-auto'
                variant='secondary'
                type='button'
                size='sm'
                onClick={() => form.reset()}>
                <CircleXIcon className='h-4 w-4 mr-1' />
                Limpiar
              </Button>
            </div>
          </section>

          <div className='grid grid-cols-2 gap-4'>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='dosisMg'
              label='Dosis (Mg)'
              placeholder='36Mg.'
              iconSrc='Syringe'
              iconAlt='Syringe'
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='pacientKg'
              label='Kg. Paciente'
              placeholder='54Kg.'
              iconSrc='Weight'
              iconAlt='Weight'
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='presentacionMg'
              label='Presentación Mg'
              placeholder='273Mg.'
              iconSrc='Pill'
              iconAlt='Pill'
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='presentacionMl'
              label='Presentación Ml'
              placeholder='87Ml'
              iconSrc='PillBottleIcon'
              iconAlt='PillBottleIcon'
            />
          </div>

          <Button variant='shadow' type='submit' className='w-full'>
            Calcular
          </Button>
        </form>
      </Form>
    </>
  )
}
