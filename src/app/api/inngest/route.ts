import { inngest } from "@/inngest/client";
import { serve } from "inngest/next";
import { GenerateWebpage } from "@/inngest/function";


// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [GenerateWebpage],
});
