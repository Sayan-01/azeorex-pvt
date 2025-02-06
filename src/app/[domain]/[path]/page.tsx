import { getDomainContent } from '@/lib/queries'
import { notFound } from 'next/navigation'
import React from 'react'
import EditorProvider from '../../../../providers/editor/editor-provider'

const Page = async ({
  params,
}: {
  params: { domain: string; path: string }
}) => {
  const domainData = await getDomainContent(params.domain.slice(0, -1))
  const pageData = domainData?.FunnelPages.find(
    (page) => page.pathName === params.path
  )
console.log(params.domain, params.path);

  

  if (!pageData || !domainData) return notFound()

  return (
    <EditorProvider
      subaccountId={domainData.subAccountId}
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
