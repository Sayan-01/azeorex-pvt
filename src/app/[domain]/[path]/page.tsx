import { getDomainContent } from '@/lib/queries'
import { notFound } from 'next/navigation'
import React from 'react'
import EditorProvider from '../../../../providers/editor/editor-provider'
import FunnelEditor from '@/app/(software)/editor/[funnelPageId]/_components/funnel-editor'

const Page = async ({
  params,
}: {
  params: { domain: string; path: string }
}) => {
  //projects er khetre ekhane chage hobe
  const domainData = await getDomainContent(params.domain.slice(0, -1))
  const pageData = domainData?.FunnelPages.find(
    (page) => page.pathName === params.path
  )
console.log(params.domain, params.path);

  

  if (!pageData || !domainData) return notFound()

  return (
    <EditorProvider
     agencyId={domainData.agencyId}
      pageDetails={pageData}
      funnelId={domainData.id}
    >
      <FunnelEditor
        funnelPageId={pageData.id}
        liveMode={true}
      />
    </EditorProvider>
  )
}

export default Page
