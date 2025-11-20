import React from 'react'
import MediaUploadButton from './upload-buttons'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import MediaCard from './media-card'
import { FolderSearch } from 'lucide-react'
import { GetMediaFiles } from '@/types/types'

type Props = {
  data: GetMediaFiles
  projectId: string
}

const MediaComponent = ({ data, projectId }: Props) => {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="">
        <h3 className="text-lg font-semibold mb-4">Media Bucket</h3>
        <MediaUploadButton projectId={projectId} />
      </div>
      <Command className="bg-transparent">
        <CommandInput placeholder="Search for file name..." className='h-8'/>
        <CommandList className="pb-40 max-h-full mt-2">
          <CommandGroup heading="Media Files" className='p-0'>
            <div className="flex flex-wrap gap-4 pt-3">
              {data?.Media.map((file) => (
                <CommandItem
                  key={file.id}
                  className="p-0 max-w-[300px] w-full rounded-lg !bg-transparent !font-medium !text-white"
                >
                  <MediaCard file={file} />
                </CommandItem>
              ))}
              {!data?.Media.length && (
                <div className="flex items-center justify-center w-full flex-col">
                  <FolderSearch
                    size={200}
                    className="dark:text-muted text-slate-300"
                  />
                  <p className="text-muted-foreground ">
                    Empty! no files to show.
                  </p>
                </div>
              )}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

export default MediaComponent
