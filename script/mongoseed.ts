import connectDb from "@/lib/dbConnect";
import { Template } from "../models/template";

export const mainn = async () => {
  connectDb();
  const allTemplates = await Template.find();
  console.log(allTemplates);
  return { allTemplates };
};

