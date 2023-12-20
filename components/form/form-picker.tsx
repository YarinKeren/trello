'use client'

import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { unsplash } from '@/lib/unsplash'
import { defaultImages } from '@/constants/images'
import Link from 'next/link'

interface FormPickerProps {
  id: string
  errors?: Record<string, string[] | undefined>
}

export default function FormPicker({ id, errors }: FormPickerProps) {
  const { pending } = useFormStatus()
  const [images, setImages] = useState<Array<Record<string, any>>>([defaultImages])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImageId, setSelectedImageId] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        })
        console.log(result)

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>
          setImages(newImages)
        } else {
          console.error('Failed to get images from Unsplash')
        }
      } catch (error) {
        console.log(error)
        setImages(defaultImages)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (isLoading) {
    return (
      <div className='p-6 flex items-center justify-center'>
        <Loader2 className='h-6 w-6 text-sky-700 animate-spin' />
      </div>
    )
  }

  return (
    <div className='relative'>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {images.map(image => (
          <div
            key={image.id}
            onClick={() => (pending ? null : setSelectedImageId(image.id))}
            className={cn(
              'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
              pending && 'opacity-50 hover:opacity-50 cursor-auto'
            )}
          >
            <Image fill alt='unsplash image' className='object-cover rounded-sm' src={image.urls.thumb} />
            <Link
              href={image.links.html}
              target='_blank'
              className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50'
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
