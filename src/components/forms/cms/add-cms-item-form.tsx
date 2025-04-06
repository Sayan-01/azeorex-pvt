// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { CMSField, FieldType } from "@prisma/client";
// import { createCMSField, getAllCMSFields, updateCMSField } from "../../../../server/cms-field";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { createCMSItem } from "../../../../server/cms-item";

// type AddCMSItemFormProps = {
//   collectionId: string;
// };

// function createDynamicSchema(fields: any) {
//   const schemaObj: Record<string, any> = {};

//   fields.forEach((field :any) => {
//     let fieldSchema;

//     // Base validation based on field type
//     switch (field.type) {
//       case 'TEXT':
//       case 'TEXTAREA':
//       case 'RICH_TEXT':
//       case 'MARKDOWN':
//       case 'CODE':
//       case 'URL':
//         fieldSchema = z.string();
//         break;
//       case 'EMAIL':
//         fieldSchema = z.string().email('Invalid email address');
//         break;
//       case 'NUMBER':
//         fieldSchema = z.coerce.number();
//         break;
//       case 'BOOLEAN':
//         fieldSchema = z.boolean();
//         break;
//       case 'DATE':
//       case 'DATETIME':
//         fieldSchema = z.date().nullable();
//         break;
//       case 'SELECT':
//         if (field.options?.items && Array.isArray(field.options.items)) {
//           fieldSchema = z.string().refine(
//             value => field.options?.items.includes(value),
//             { message: 'Invalid selection' }
//           );
//         } else {
//           fieldSchema = z.string();
//         }
//         break;
//       case 'MULTI_SELECT':
//         if (field.options?.items && Array.isArray(field.options.items)) {
//           fieldSchema = z.array(z.string()).refine(
//             values => values.every(value => field.options?.items.includes(value)),
//             { message: 'Invalid selection' }
//           );
//         } else {
//           fieldSchema = z.array(z.string());
//         }
//         break;
//       default:
//         fieldSchema = z.string();
//     }

//     // Add required validation if needed
//     if (field.required) {
//       // if (field.type === 'NUMBER') {
//       //   fieldSchema = fieldSchema.refine(val => val !== undefined, {
//       //     message: `${field.name} is required`,
//       //   });
//       // } else if (field.type === 'BOOLEAN') {
//       //   // For boolean, we don't change the validation as it's inherently not nullable
//       // } else if (field.type === 'MULTI_SELECT') {
//       //   fieldSchema = fieldSchema.refine(val => val.length > 0, {
//       //     message: `Please select at least one option for ${field.name}`,
//       //   });
//       // } else if (field.type === 'DATE' || field.type === 'DATETIME') {
//       //   fieldSchema = z.date({
//       //     required_error: `${field.name} is required`,
//       //   });
//       // } else {
//       //   fieldSchema = fieldSchema.min(1, `${field.name} is required`);
//       // }
//     } else {
//       // If not required, make it optional (except for boolean which is always defined)
//       if (field.type !== 'BOOLEAN' && field.type !== 'DATE' && field.type !== 'DATETIME') {
//         fieldSchema = fieldSchema.optional();
//       }
//     }

//     schemaObj[field.key] = fieldSchema;
//   });

//   return z.object(schemaObj);
// }

// export default function AddCMSItemForm({ collectionId }: AddCMSItemFormProps) {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [cmsAllFields, setCmsAllFields] = useState<CMSField[] >([]);

//   const formSchema = createDynamicSchema(cmsAllFields);

//   useEffect(() => {
//     const getAllFields = async () => {
//       const cmsAllFields = await getAllCMSFields(collectionId);
//       setCmsAllFields(cmsAllFields?.data || []);
//     };
//     getAllFields();
//   }, []);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: cmsAllFields.reduce(
//       (acc: any, field: any) => {
//         if (field.defaultValue) {
//           switch (field.type) {
//             case "NUMBER":
//               acc[field.key] = parseFloat(field.defaultValue);
//               break;
//             case "BOOLEAN":
//               acc[field.key] = field.defaultValue === "true";
//               break;
//             case "MULTI_SELECT":
//               try {
//                 acc[field.key] = JSON.parse(field.defaultValue);
//               } catch {
//                 acc[field.key] = [];
//               }
//               break;
//             case "DATE":
//             case "DATETIME":
//               try {
//                 acc[field.key] = new Date(field.defaultValue);
//               } catch {
//                 acc[field.key] = null;
//               }
//               break;
//             default:
//               acc[field.key] = field.defaultValue;
//           }
//         } else {
//           // Set empty defaults based on type
//           switch (field.type) {
//             case "BOOLEAN":
//               acc[field.key] = false;
//               break;
//             case "MULTI_SELECT":
//               acc[field.key] = [];
//               break;
//             case "DATE":
//             case "DATETIME":
//               acc[field.key] = null;
//               break;
//             default:
//               acc[field.key] = "";
//           }
//         }
//         return acc;
//       },
//       {} as Record<string, any>
//     ),
//   });

//   const selectedType = form.watch("type");
//   const showOptionsInput = selectedType === "SELECT" || selectedType === "MULTI_SELECT";

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsLoading(true)

//     try {
//       const result = await createCMSItem(collectionId, values);

//       if (!result.success) {
//         return
//       }

//       // Navigate back to the collection items page on success
//       router.push(`/collections/${collectionId}/items`);
//       router.refresh();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }
//   const InputComponents = {
//     TEXT: ({ field }: any) => <Input {...field} />,
//     TEXTAREA: ({ field }: any) => (
//       <Textarea
//         {...field}
//         className="min-h-32"
//       />
//     ),
//     NUMBER: ({ field }: any) => (
//       <Input
//         type="number"
//         {...field}
//         onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
//       />
//     ),
//     BOOLEAN: ({ field }: any) => (
//       <div className="flex items-center space-x-2 pt-2">
//         <Checkbox
//           checked={field.value}
//           onCheckedChange={field.onChange}
//         />
//         <label className="text-sm font-medium leading-none">Yes</label>
//       </div>
//     ),
//     SELECT: ({ field, options }: any) => (
//       <Select
//         onValueChange={field.onChange}
//         value={field.value}
//       >
//         <SelectTrigger>
//           <SelectValue placeholder="Select an option" />
//         </SelectTrigger>
//         <SelectContent>
//           {options?.items?.map((option: string) => (
//             <SelectItem
//               key={option}
//               value={option}
//             >
//               {option}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     ),
//     MULTI_SELECT: ({ field, options }: any) => (
//       <div className="space-y-2">
//         {options?.items?.map((option: string) => (
//           <div
//             key={option}
//             className="flex items-center space-x-2"
//           >
//             <Checkbox
//               checked={field.value?.includes(option)}
//               onCheckedChange={(checked) => {
//                 const values = [...(field.value || [])];
//                 field.onChange(checked ? [...values, option] : values.filter((v) => v !== option));
//               }}
//             />
//             <label className="text-sm font-medium leading-none">{option}</label>
//           </div>
//         ))}
//       </div>
//     ),
//     EMAIL: ({ field }: any) => (
//       <Input
//         type="email"
//         placeholder="email@example.com"
//         {...field}
//       />
//     ),
//     URL: ({ field }: any) => (
//       <Input
//         type="url"
//         placeholder="https://example.com"
//         {...field}
//       />
//     ),
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex flex-col gap-4"
//       >
//         {(cmsAllFields || []).map((field) => {
//           const InputComponent = InputComponents[field.type] || Input;
//           return (
//             <FormField
//               key={field.id}
//               control={form.control}
//               name={field.name as string}
//               render={({ field: formField }) => (
//                 <FormItem>
//                   <FormLabel>
//                     {field.name}
//                     {field.isRequired && <span className="text-red-500 ml-1">*</span>}
//                   </FormLabel>
//                   <FormControl>
//                     <InputComponent field={formField} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           );
//         })}

//         <Button
//           type="submit"
//           disabled={isLoading}
//         >
//           {isLoading ? "Processing..." : "Add Field"}
//         </Button>
//       </form>
//     </Form>
//   );
// }
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { getAllCMSFields } from "../../../../server/cms-field";
import { CMSField } from "@prisma/client";
import { createCMSItem } from "../../../../server/cms-item";

type CMSItemInput = {
  [fieldId: string]: string | number | boolean | string[];
};

const AddCMSItemForm = ({ collectionId }: { collectionId: string }) => {
  const router = useRouter()
  const [formData, setFormData] = useState<CMSItemInput>({});
  const [cmsAllFields, setCmsAllFields] = useState<CMSField[]>([]);

  useEffect(() => {
    const getAllFields = async () => {
      const cmsAllFields = await getAllCMSFields(collectionId);
      setCmsAllFields(cmsAllFields?.data || []);
    };
    if (collectionId) {
      getAllFields();
    }
  }, []);

  const handleChange = (field: CMSField, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field.name]: value,
    }));
  };

  const handleMultiSelect = (field: CMSField, option: string) => {
    const current = (formData[field.id] as string[]) || [];
    const updated = current.includes(option) ? current.filter((val) => val !== option) : [...current, option];
    handleChange(field, updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createCMSItem(collectionId, formData)
    if (response.success === true) {
      router.refresh();
    }
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {cmsAllFields
        .sort((a, b) => a.order - b.order)
        .map((field) => (
          <div
            key={field.id}
            className="flex flex-col gap-2"
          >
            <label className="font-medium text-white-800 text-sm">
              {field.name}
              {field.isRequired && <span className="text-red-500">*</span>}
            </label>

            {field.type === "TEXT" && (
              <input
                type="text"
                className="border-none outline-none h-10 bg-[#272727] text-white/80 text-sm p-2 rounded-lg"
                required={field.isRequired}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            )}

            {field.type === "TEXTAREA" && (
              <textarea
                className="border-none outline-none h-10 bg-[#272727] text-white/80 text-sm p-2 rounded-lg"
                required={field.isRequired}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            )}

            {field.type === "NUMBER" && (
              <input
                type="number"
                className="border-none outline-none h-10 bg-[#272727] text-white/80 text-sm p-2 rounded-lg"
                required={field.isRequired}
                onChange={(e) => handleChange(field, parseFloat(e.target.value))}
              />
            )}

            {field.type === "BOOLEAN" && (
              <input
                type="checkbox"
                className="w-5 h-5"
                onChange={(e) => handleChange(field, e.target.checked)}
              />
            )}

            {/* {field.type === "SELECT" && field.options && (
              <select
                className="border border-gray-300 p-2 rounded"
                required={field.isRequired}
                onChange={(e) => handleChange(field, e.target.value)}
              >
                <option value="">Select an option</option>
                {field.options.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>
            )}

            {field.type === "MULTI_SELECT" && field.options && (
              <div className="flex flex-wrap gap-2">
                {field.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-1"
                  >
                    <input
                      type="checkbox"
                      checked={(formState[field.id] as string[])?.includes(option) || false}
                      onChange={() => handleMultiSelect(field, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )} */}
          </div>
        ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default AddCMSItemForm;
