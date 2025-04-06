"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";

import { useToast } from "@/hooks/use-toast";
import { upsertFunnelPageForProject } from "@/lib/queries";
import { CMSCollectionSchema, FunnelPageSchema } from "@/types/types";
import { useRouter } from "next/navigation";
import { useModal } from "../../../../providers/model-provider";
import { Loader } from "../../global/Loader";
import { Button } from "../../ui/button";
import { addCMSCOllection } from "../../../../server/cms";

interface AddCMSCollectionFormProps {
  projectId: string | null;
  className?: string;
}

const AddCMSCollectionForm: React.FC<AddCMSCollectionFormProps> = ({ projectId, className }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { setClose } = useModal();
  if (!projectId) return null;

  const form = useForm<z.infer<typeof CMSCollectionSchema>>({
    resolver: zodResolver(CMSCollectionSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CMSCollectionSchema>) => {
    const name = values.name;
    if (!name)
      return form.setError("name", {
        message: "Please enter CMS collection name.",
      });
    try {
      const response = await addCMSCOllection(name, projectId);
      if (response.data) {
        router.replace(`/saas/projects/${projectId}/cms?node=${response.data.id}`);
        router.refresh();
      }

      toast({
        title: "Success",
        description: "CMS collection created",
      });
      setClose();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Oppse!",
        description: "Could not create CMS collection",
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4"
        >
          <FormField
            disabled={form.formState.isSubmitting}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1 flex items-center gap-2 justify-between ">
                <FormControl>
                  <Input
                    className="!mt-0 outline-none rounded-lg text-zinc-400 bg-[#272727]"
                    placeholder="Cms collection name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end gap-2">
            <Button
              className="w-full rounded-lg self-end bg-green-500 hover:bg-gr-600 text-white"
              disabled={form.formState.isSubmitting}
              type="submit"
            >
              {form.formState.isSubmitting ? <Loader loading={form.formState.isSubmitting} /> : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddCMSCollectionForm;
