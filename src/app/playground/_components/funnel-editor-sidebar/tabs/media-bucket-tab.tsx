"use client";
import MediaComponent from "@/components/media";
import MediaUploadButton from "@/components/media/upload-buttons";
import { getMedia } from "@/lib/queries";
import { GetMediaFiles } from "@/types/types";
import React, { useEffect, useState } from "react";

type Props = {
  projectId: string;
};

const MediaBucketTab = (props: Props) => {
  const [data, setdata] = useState<GetMediaFiles>(null);
  // const data = null;
  useEffect(() => {
    const fetchData = async () => {
      const response = await getMedia(props.projectId);
      setdata(response);
    };
    fetchData();
  }, []);

  return (
    <div className="h-[calc(100%-0px)] bg-editor-bcgc overflow-y-hidden box-1 pt-3 select-none">
      <div className="border-b px-4">
        <h3 className="text font-semibold mb-4">Media Bucket</h3>
      </div>
      <MediaComponent
        data={data}
        projectId={props.projectId}
      />
    </div>
  );
};

export default MediaBucketTab;
