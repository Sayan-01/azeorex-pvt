import { EmailTemplate } from "@/components/emails/verification-email-tem";
import { resend } from "./resend";

export const verificationEmailSend = async ({ email, username, varifiedToken }) => {
  await resend.emails.send({
    from: "devsayan@azeorex.com",
    to: email,
    subject: "Azeorex",
    react: EmailTemplate({ firstName: username, varifiedToken }),
  });
  return (
    {
      success: true,
      message: "Varify email send successfully",
    },
    {
      status: 200,
    }
  );
};

export default verificationEmailSend;
