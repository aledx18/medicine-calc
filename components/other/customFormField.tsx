/* eslint-disable react/jsx-handler-names */
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { ReactNode } from 'react'
import { Control } from 'react-hook-form'

import {
  User2Icon,
  AlarmPlusIcon,
  Mail,
  Pill,
  Syringe,
  Weight,
  PillBottleIcon
} from 'lucide-react'
import { FormFieldType } from '@/lib/utils'

const Icons = {
  User2Icon,
  AlarmPlusIcon,
  Mail,
  Pill,
  Syringe,
  Weight,
  PillBottleIcon
}

interface CustomProps {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  iconSrc: string
  iconAlt?: string
  disabled?: boolean
  dateFormat?: string
  showTimeSelect?: boolean
  children?: ReactNode
  renderSkeleton?: (field: any) => ReactNode
  fieldType: FormFieldType
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const IconComponent = Icons[props.iconSrc as keyof typeof Icons]

  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border items-center border-dark-500 bg-dark-400'>
          {props.iconSrc && <IconComponent className=' h-5 w-5 m-2' />}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className='border-0'
            />
          </FormControl>
        </div>
      )

    case FormFieldType.TEXTAREA:
      return (
        <FormControl className='w-full'>
          <textarea
            placeholder={props.placeholder}
            {...field}
            disabled={props.disabled}
          />
        </FormControl>
      )

    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null
    default:
      return null
  }
}

export default function CustomFormField(props: CustomProps) {
  const { control, name, label } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className='shad-input-label'>{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage className='shad-error' />
        </FormItem>
      )}
    />
  )
}
