"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { upsertProject } from "@/lib/queries";
import { CreateFunnelFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import { useModal } from "../../../providers/model-provider";
import FileUpload from "../global/FileUpload";
import { Loader } from "../global/Loader";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { toast } from "sonner";

interface CreateProjectProps {
  defaultData?: Project;
  userId: string;
}

//CHALLENGE: Use favicons

const ProjectForm: React.FC<CreateProjectProps> = ({ defaultData, userId }) => {
  const { setClose } = useModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateFunnelFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(CreateFunnelFormSchema),
    defaultValues: {
      name: defaultData?.name || "",
      description: defaultData?.description || "",
      favicon: defaultData?.favicon || "",
      subDomainName: defaultData?.subDomainName?.toLowerCase() || "",
    },
  });

  

  useEffect(() => {
    if (defaultData) {
      form.reset({
        description: "",
        favicon: "",
        name: "",
        subDomainName: "",
      });
    }
  }, [defaultData]);

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values: z.infer<typeof CreateFunnelFormSchema>) => {
    if (!userId) return;
    

    const response = await upsertProject(userId, { ...values, liveProducts: defaultData?.liveProducts || "[]" }, defaultData?.id || v4());
    if (response)
      toast.success("Success", {
        description: "Saved project details",
      });
    else
      toast.error("Oppse!", {
        description: "Could not save project details",
      });
    setClose();
    router.refresh();
  };
  return (
    <div className="w-full border-none">
      <div className="border-none">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="favicon"
              render={({ field }) => (
                <FormItem className="flex gap-2">
                  <FormControl className="w-full">
                    <FileUpload
                      className="bg-[#202124] border border-[#2c2d30] mx-auto"
                      apiEndpoint="favicon"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex gap-2 items-center">
                  <FormLabel className="w-[200px]">Project Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#202124] border border-[#2c2d30]"
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex gap-2 items-center">
                  <FormLabel className="w-[200px]">Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-[#202124] border border-[#2c2d30]"
                      placeholder="Tell us a little bit more about this Project."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="subDomainName"
              render={({ field }) => (
                <FormItem className="flex gap-2 items-center">
                  <FormLabel className="w-[200px]">Sub domain</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#202124] border border-[#2c2d30]"
                      placeholder="Sub domain for funnel"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator className="mt-2" />

            <Button
              className="bg-main hover:bg-main/80 text-white w-full mt-2"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? <Loader loading={isLoading} /> : "Save"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProjectForm;
