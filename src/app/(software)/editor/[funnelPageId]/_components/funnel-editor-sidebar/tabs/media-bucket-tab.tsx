"use client";
import MediaComponent from "@/components/media";
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
    <div className="h-[900px] bg-editor-bcgc overflow-x-scroll box-1 p-4 select-none">
      <MediaComponent
        data={data}
        projectId={props.projectId}
      />
    </div>
  );
};

export default MediaBucketTab;
