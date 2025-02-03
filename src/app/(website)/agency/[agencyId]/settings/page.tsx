import React from "react";
import { auth } from "../../../../../../auth";

type Props = { params: { agencyId: string } };

const page = async ({ params }: Props) => {
  const session = await auth();
  
  if (session?.user) return null;

  return <div>page</div>;
};

export default page;
