"use client";
import React, { useEffect } from "react";
import { AlertDialog } from "../ui/alert-dialog";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FileUpload from "../global/FileUpload";
import { Loader } from "../global/Loader";
import GlassCard from "../global/glass-card";
import { Agency, SubAccount } from "@prisma/client";
import { saveActivityLogsNotification, upsertSubAccount } from "@/lib/queries";
import { v4 } from "uuid";
import { useModal } from "../../../providers/model-provider";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Agency name must be at least 2 characters.",
  }),
  companyEmail: z.string(),
  companyPhone: z.string().min(1),
  address: z.string(),
  city: z.string(),
  subAccountLogo: z.string(),
  zipCode: z.string(),
  state: z.string(),
  country: z.string(),
});

interface SubAccountDetailsProps {
  //To add the sub account to the agency
  agencyDetails: Agency;
  details?: Partial<SubAccount>;
  userId: string;
  userName: string;
}

const SubAccountDetails: React.FC<SubAccountDetailsProps> = ({ details, agencyDetails, userName }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { setClose } = useModal();

  console.log(agencyDetails);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: details?.name,
      companyEmail: details?.companyEmail,
      companyPhone: details?.companyPhone,
      address: details?.address,
      city: details?.city,
      zipCode: details?.zipCode,
      state: details?.state,
      country: details?.country,
      subAccountLogo: details?.subAccountLogo,
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {

      const response = await upsertSubAccount({
        id: details?.id ? details.id : v4(),
        address: values.address,
        subAccountLogo: values.subAccountLogo,
        city: values.city,
        companyPhone: values.companyPhone,
        country: values.country,
        name: values.name,
        state: values.state,
        zipCode: values.zipCode,
        createdAt: new Date(),
        updatedAt: new Date(),
        companyEmail: values.companyEmail,
        agencyId: agencyDetails.id,
        connectAccountId: "",
        goal: 5000,
      });
      if (!response) throw new Error("No response from server");
      await saveActivityLogsNotification({
        agencyId: response.agencyId,
        description: `${userName} | updated sub account | ${response.name}`,
        subAccountId: response.id,
      });

      toast({
        title: "Subaccount details saved",
        description: "Successfully saved your subaccount details.",
      });
      setClose();
      router.refresh();
    } catch (error) {
      console.log("errrrror", error);
      toast({
        variant: "destructive",
        title: "😫 Oppse!",
        description: "Could not create your subaccount",
      });
    }
  };

  useEffect(() => {
    if (details) {
      form.reset(details);
    }
  }, [details]);

  return (
    <AlertDialog>
      <GlassCard className="w-full">
        <CardHeader>
          <CardTitle className="">Subaccount Information</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta consequatur veniam, error id maiores iusto incidunt rem maxime? Expedita deserunt libero voluptas quasi repellendus quaerat
            accusantium officia tenetur, repudiandae quia?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="subAccountLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subaccount Logo</FormLabel>
                    <FormControl>
                      <FileUpload
                        className="w-full"
                        apiEndpoint="subaccountLogo"
                        onChange={field.onChange}
                        value={field.value}
                      ></FileUpload>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex flex-col gap-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Subaccount Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter subaccount name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Subaccount name must be at least 2 characters.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyEmail"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Company Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter company email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>This should be a valid email address.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter company phone"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Provide your company&apos;s contact number.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter address"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Full street address.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter city"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Your city name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter zip code"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Your postal code.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter state"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Your state or region.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter country"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your country.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? (
                  <>
                    <Loader loading={isLoading} />
                  </>
                ) : (
                  <p>Save subaccount information</p>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </GlassCard>
    </AlertDialog>
  );
};

export default SubAccountDetails;
