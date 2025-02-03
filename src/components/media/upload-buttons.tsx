'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useModal } from '../../../providers/model-provider'
import CustomModal from '../global/CustomModal'
import UploadMediaForm from '../forms/upload-media'

type Props = {
  agencyId: string
}

const MediaUploadButton = ({ agencyId }: Props) => {
  const {  setOpen } = useModal()

  return (
    <Button
      size="sm"
      className="bg-[#0099ff26] hover:bg-[#0099ff26]  text-[#0ABBFF] w-full editor_text rounded-lg"
      onClick={() => {
        setOpen(
          <CustomModal
            title="Upload Media"
            subheading="Upload a file to your media bucket"
          >
            <UploadMediaForm agencyId={agencyId}></UploadMediaForm>
          </CustomModal>
        );
      }}
    >
      Upload
    </Button>
  );
}

export default MediaUploadButton
