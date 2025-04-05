"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldType } from "@prisma/client";
import { createCMSField, updateCMSField } from "../../../../server/cms-field";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

type AddCMSFieldFormProps = {
  collectionId: string;
  initialData?: {
    id: string;
    name: string;
    type: FieldType;
    required: boolean;
    defaultValue?: string | null;
    options?: Record<string, any> | null;
  };
  isEditing?: boolean;
};

const FIELD_TYPE_OPTIONS = [
  { value: "TEXT", label: "Text" },
  { value: "TEXTAREA", label: "Text Area" },
  { value: "NUMBER", label: "Number" },
  { value: "BOOLEAN", label: "Boolean" },
  { value: "DATE", label: "Date" },
  { value: "SELECT", label: "Select (Dropdown)" },
  { value: "MULTI_SELECT", label: "Multi-Select" },
];

// Zod schema
const FormSchema = z.object({
  name: z.string().min(1, "Field name is required"),
  type: z.nativeEnum(FieldType),
  required: z.boolean(),
  defaultValue: z.string().optional(),
  selectOptions: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function AddCMSFieldForm({ collectionId, initialData, isEditing = false }: AddCMSFieldFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: initialData?.name || "",
      type: initialData?.type || "TEXT",
      required: initialData?.required || false,
      defaultValue: initialData?.defaultValue || "",
      selectOptions: initialData?.options?.items?.join("\n") || "",
    },
  });

  const selectedType = form.watch("type");
  const showOptionsInput = selectedType === "SELECT" || selectedType === "MULTI_SELECT";

  async function onSubmit(data: FormValues) {
    setIsLoading(true);

    try {
      const payload = {
        name: data.name,
        type: data.type,
        required: data.required,
      };
      const result = await createCMSField(collectionId, payload);

      if (!result.success) {
        toast("Error", {
          description: result.error || "Something went wrong",
        });
        return;
      }

      toast("Success", {
        description: isEditing ? "Field updated successfully" : "Field created successfully",
      });

      router.refresh();
      
    } catch (err) {
      toast("Error", {
        description: "An unexpected error occurred",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Field Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field Name</FormLabel>
              <FormControl>
                <Input
                  className="outline-none rounded-lg text-zinc-400 bg-[#272727]"
                  placeholder="Enter field name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Field Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Field Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="outline-none rounded-lg text-zinc-400 bg-[#272727]">
                    <SelectValue placeholder="Select a field type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="z-[200] mt-3 rounded-xl">
                  {FIELD_TYPE_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Required */}
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Required</FormLabel>
                <FormDescription>Whether this field is required when creating/editing content</FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Select Options */}
        {showOptionsInput && (
          <FormField
            control={form.control}
            name="selectOptions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Options (one per line)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter options, one per line"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Each line will become a selectable option</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : isEditing ? "Update Field" : "Add Field"}
        </Button>
      </form>
    </Form>
  );
}
