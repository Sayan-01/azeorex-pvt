"use client";
import { getProject } from "@/lib/queries";
import React, { useEffect, useState } from "react";

type Props = {
  funnelId: string;
};

const Sayan = ({ funnelId }: Props) => {
  const [funnelPages, setFunnelPages] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProject(funnelId);
        setFunnelPages(data?.FunnelPages);
        console.log(data?.FunnelPages);
      } catch (error) {
        console.error("Error fetching funnel pages:", error);
      }
    };

    fetchData();
  }, [funnelId]);


  return (
    <div>
      {funnelPages ? (
        <div>
          {funnelPages.map((item) => {
            return <div>{item.id}</div>;
          })}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Sayan;
