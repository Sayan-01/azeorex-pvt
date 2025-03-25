import { EmailTemplate } from "@/components/emails/verification-email-tem";
import { resend } from "../utils/resend";

type Props = {
  email: string;
  username: string;
  varifiedToken: string;
};

export const sendOtpViaResend = async ({ email, username, varifiedToken }: Props) => {
  try {
    await resend.emails.send({
      // from: "devsayan@azeorex.com",
      from: "onboarding@resend.dev",
      to: email,
      subject: "Azeorex",
      react: EmailTemplate({ firstName: username, varifiedToken }),
    });
    return { success: true, message: "Email error is" };
  } catch (error) {
    console.log("Email error is");
    return {success: false, message: "Email error is"};
  }
};

export default sendOtpViaResend;
