'use client'
import React from 'react'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { createMedia, saveActivityLogsNotification } from '@/lib/queries'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useToast } from '@/hooks/use-toast'
import FileUpload from '../global/FileUpload'

type Props = {
  agencyId: string
}

const formSchema = z.object({
  link: z.string().min(1, { message: 'Media File is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
})

const UploadMediaForm = ({ agencyId }: Props) => {
  console.log(agencyId);
  
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      link: '',
      name: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await createMedia(agencyId, values)

      toast({ title: 'Succes', description: 'Uploaded media' })
      router.refresh()
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Failed',
        description: 'Could not uploaded media',
      })
    }
  }

  return (
    <div className="w-full">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex gap-2 items-center">
                  <FormLabel className="w-[200px]">File Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#202124] border border-[#2c2d30]"
                      placeholder="Your assets name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Media File</FormLabel>
                  <FormControl>
                    <FileUpload
                      className="bg-[#202124] border border-[#2c2d30]"
                      apiEndpoint="agencyLogo"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-4"
            >
              Upload Media
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UploadMediaForm
