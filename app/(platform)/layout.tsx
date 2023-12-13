import { ClerkProvider } from '@clerk/nextjs'

export default function platfromLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>
}
