'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

export default function FormDelete() {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' disabled={pending} variant={'destructive'} size={'sm'}>
      x
    </Button>
  )
}
