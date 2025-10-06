export const EmailTemplate = ({ firstName, email, budget, select, description, topic }: any) => `
  <div style="font-family: Arial, sans-serif; width: 100%; padding: 20px; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      
      <h2 style="color: #333;">Topic: <span style="color: #555;">${topic}</span></h2>
      
      <h3 style="margin: 8px 0; color: #333;">Name: ${firstName}</h3>
      <h3 style="margin: 8px 0; color: #333;">Email: ${email}</h3>
      <h4 style="margin: 8px 0; color: #333;">Budget: ${budget}</h4>
      
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
      
      <div style="margin-bottom: 20px;">
        User interested in: <span style="color: #555;">${Array.isArray(select) ? select.join(", ") : select}</span>
      </div>
      
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
      
      <div style="margin-bottom: 20px;">
        Description: <span style="color: #555;">${description}</span>
      </div>
      
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
      
      <p style="color: #333;">Thanks,<br />The DevSayan Team</p>
    </div>
  </div>
`;
