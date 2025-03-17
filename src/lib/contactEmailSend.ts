import { EmailTemplate } from "@/components/emails/contact-email-tem";
import { resend } from "@/utils/resend";

type Props = {
  name: string
  email: string
  budget: number
  select: string[]
  description: string
  topic:string
}

export const contactEmailSend = async ({ name, email, budget, select, description, topic }:Props) => {
  await resend.emails.send({
    from: "devsayan@azeorex.com",
    to: "azeorex01@gmail.com",
    subject: "Contact Project",
    react: EmailTemplate({ firstName: name, email, budget, select, description, topic }),
  });

  return (
    // {
    //   success: true,
    //   message: "Varify email send successfully",
    // },
    {
      status: 200,
    }
  );
};

export default contactEmailSend;
