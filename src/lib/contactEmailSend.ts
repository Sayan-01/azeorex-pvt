import nodemailer from "nodemailer";

type Props = {
  name: string
  email: string
  budget: number
  select: string[]
  description: string
  topic:string
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const contactEmailSend = async (name: string, email: string, budget: number, select: string[], description: string, topic: string) => {
  const mailOptions = {
    from: "lier9980@gmail.com",
    to: "azeorex01@gmail.com",
    subject: "Contact Project",
    text: `name: ${name}, email: ${email}, budget: ${budget}, select: ${select}, description: ${description}, topic: ${topic}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email error is" };
  } catch (error) {
    console.log("Email error is");
    return { success: false, message: "Email error is" };
  }
};