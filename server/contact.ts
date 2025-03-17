"use server";

import contactEmailSend from "@/lib/contactEmailSend";

export const emailsend = async (fromdata:any) => {
  const name = await fromdata.get("name");
  const email = await fromdata.get("email");
  const budget = await fromdata.get("budget");
  const select = await fromdata.get("select");
  const description = await fromdata.get("description"); 
  const topic = await fromdata.get("topic"); 

  if(!name || !email || !budget || !select || !description) return { error: "Fill all filds for submition" }

  //send verification email
  const emailRes = await contactEmailSend({ name, email, budget, select, description, topic });
  if (emailRes.status != 200) {
    return { error: "Something was wrong via send email" }
  } else return { message: "Something was wrong via send email" };
};
