"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

import { getProjects, upsertFunnelPageForProject } from "@/lib/queries";
import { FunnelPageSchema } from "@/types/types";
import { FunnelPage } from "@prisma/client";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import { Loader } from "../global/Loader";
import { Button } from "../ui/button";
import { useModal } from "../../../providers/model-provider";
import { DeleteFunnelPage } from "@/app/saas/projects/_components/delete-funnel-page";
import { toast } from "sonner";

interface CreateFunnelPageProps {
  defaultData?: FunnelPage;
  projectId: string | null;
  order: number;
  userId: string;
  className?: string;
}

const CreateFunnelPage: React.FC<CreateFunnelPageProps> = ({ defaultData, projectId, order, userId, className }) => {
  const router = useRouter();
  const { setClose } = useModal();
  if (!userId || !projectId) return null;

  const form = useForm<z.infer<typeof FunnelPageSchema>>({
    resolver: zodResolver(FunnelPageSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      pathName: "",
    },
  });

  useEffect(() => {
    if (defaultData) {
      form.reset({ name: defaultData.name, pathName: defaultData.pathName });
    }
  }, [defaultData]);

  const onSubmit = async (values: z.infer<typeof FunnelPageSchema>) => {
    try {
      console.log(values);
      const response = await upsertFunnelPageForProject(
        {
          ...values,
          id: defaultData?.id || v4(),
          order: defaultData?.order || order,
          pathName: values.pathName?.toLowerCase() || "",
        },
        projectId
      );
      router.refresh();

      toast.success("Success", {
        description: "Saves Funnel Page Details",
      });
      setClose();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Oppse!", {
        description: "Could Save Funnel Page Details",
      });
    }
  };

  return (
    <Card className={` ${className} py-5`}>
      <CardHeader className="border-b px-5 flex flex-col gap-2">
        <div className="flex items-center flex-row justify-between w-full">
          <h5 className="opacity-70 ">Webpage Settings</h5>
          {defaultData?.id && (
            <Button
              className="bg-zinc-700 rounded-full !mt-0 text-white/70"
              variant={"outline"}
              size="default"
              disabled={form.formState.isSubmitting}
              type="button"
              onClick={async () => {
                const response = await getProjects(userId);
                const lastFunnelPage = response?.find((funnel) => funnel.id === projectId)?.FunnelPages.length;

                await upsertFunnelPageForProject(
                  {
                    ...defaultData,
                    order: lastFunnelPage ? lastFunnelPage : 0,
                    visits: 0,
                    name: `${defaultData.name} Copy`,
                    pathName: `${defaultData.pathName?.toLowerCase()}copy`,
                    content: defaultData.content,
                  },
                  projectId
                );
                toast("Success", {
                  description: "Saves Funnel Page Details",
                });
                router.refresh();
              }}
            >
              {form.formState.isSubmitting ? <Loader loading={form.formState.isSubmitting} /> : <p>Copy and Pest</p>}
            </Button>
          )}
        </div>
        <CardDescription>
          <p className=" text-sm">Funnel pages are flow in the order they are created by default. You can move them around to change their order.</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="opacity-80">Name</FormLabel>
                  <FormControl>
                    <Input
                      className="!mt-0 outline-none rounded-lg text-zinc-400"
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={order === 0}
              control={form.control}
              name="pathName"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="opacity-80">Path Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Path for the page"
                      {...field}
                      value={field.value?.toLowerCase()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end gap-2">
              {defaultData?.id ? (
                <div className="flex flex-row w-full space-x-4">
                  <Button
                    className="flex-1 rounded-lg self-end"
                    disabled={form.formState.isSubmitting}
                    type="submit"
                  >
                    {form.formState.isSubmitting ? <Loader loading={form.formState.isSubmitting} /> : "Save Page"}
                  </Button>
                  <DeleteFunnelPage funnelPageId={defaultData?.id} />
                </div>
              ) : (
                <Button
                  className=" rounded-full self-end"
                  disabled={form.formState.isSubmitting}
                  type="submit"
                >
                  {form.formState.isSubmitting ? <Loader loading={form.formState.isSubmitting} /> : "Save Page"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateFunnelPage;
