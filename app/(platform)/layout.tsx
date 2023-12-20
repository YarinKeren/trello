import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'

export default function platfromLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  )
}
