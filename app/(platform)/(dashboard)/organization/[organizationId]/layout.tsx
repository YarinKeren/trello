import { startCase } from 'lodash'

import { OrgControl } from './_components/org-control'
import { auth } from '@clerk/nextjs'

export async function generateMetadata() {
  const { orgSlug } = auth()

  return { title: startCase(orgSlug || 'Organization') }
}

export default function OraganizationIdLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  )
}
