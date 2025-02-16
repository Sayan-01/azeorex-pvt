import { EmailTemplate } from "@/components/emails/verification-email-tem";
import { resend } from "./resend";

type Props = {
  email: string;
  username: string;
  varifiedToken: string;
};
export const verificationEmailSend = async ({ email, username, varifiedToken }: Props) => {
  await resend.emails.send({
    from: "devsayan@azeorex.com",
    to: email,
    subject: "Azeorex",
    react: EmailTemplate({ firstName: username, varifiedToken }),
  });
  return {
    success: true,
    message: "Varify email send successfully",
    status: 200,
  };
};

export default verificationEmailSend;
