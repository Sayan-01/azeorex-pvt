import dedent from "dedent";

export const promptForFindType = ({ userInput }: { userInput: string }) => {
  return dedent`
    User Input: ${userInput}

    Classification Rules:
    - Now only return "txt" if user input is a greeting, conversation, asking questions, or making casual remarks (e.g., "Hi", "Hello", "How are you?") ". 
    - And only return "code" if user input is a webpage, UI section, or component (examples: "Create a hero section", "Build a landing page", "Design a footer"). 

    Examples of "code":
    - "Create a hero section"
    - "Build a landing page"
    - "I need a contact form"
    - "Show me a navbar"
    - "Make a pricing table"
    
    Examples of "txt":
    - "Hi there"
    - "How are you?"
    - "What can you do?"
    - "Explain recursion to me"
    
    Return only "txt" or "code" with no additional text.
  `;
};

export const promptForTextResponse = ({ userInput }: { userInput: string }) => {
  return dedent`
    You are a helpful AI assistant engaged in a natural conversation with a user.
    
    User Message: ${userInput}
    

    Instructions:
    - Provide a friendly, conversational response and use bullet points if it is necessary.
    - Be concise but informative
    - If the user is greeting you, respond warmly and ask how you can help
    - If the user asks what you can do, explain that you can help with:
      * Building web components and UI elements
      * Creating landing pages and website sections
      * Designing interactive elements
      * General conversation and answering questions
    - Match the tone and formality level of the user's message
    - If the user's request is unclear, ask clarifying questions
    - Keep responses natural and engaging, avoid being overly formal unless the context requires it
    
    Respond directly to the user's message now:
  `;
};

export const PromptForWebPage = ({ userInput }: { userInput: string }) => {
  return dedent`

You are a web designer. Generate a JSON structure for a modern, responsive webpage.

OUTPUT FORMAT - Return ONLY valid JSON (no markdown, no \`\`\`json blocks, no explanations):

RULES:
- Output ONLY JSON (no markdown, no commentary)
- Keys use double quotes
- No trailing commas
- Every element has: id, type, styles?, attributes?, content?
- "content" = string OR array of child elements
- CSS in camelCase inside "styles"
- Tailwind only inside attributes.className
- Use semantic tags: section, div, header, footer, nav, h1-h6, p, button, article
- Modern, clean design with spacing
- Use tailwind classes only for responsive design. Example: "md:flex hidden"
- Use images (hero banner image) if it is necessary or improve design. Use "/image-placeholder.png" in attributes.src 

ROOT FORMAT:
{
  "id": "__root",
  "type": "__body",
  "styles": {
    "minHeight": "100vh",
    "padding": "20px"
  },
  "content": []
}

MINIMAL EXAMPLE:
{
  "id": "__body",
  "type": "__body",
  "styles": { "minHeight": "100vh", "backgroundColor": "#f3f4f6", "padding": "20px" },
  "content": [
    {
      "id": "section-id",
      "type": "section",
      "styles": { "padding": "40px", "backgroundColor": "#ffffff", "borderRadius": "12px", "marginBottom": "20px", "boxShadow": "0 4px 6px rgba(0,0,0,0.1)" },
      "attributes": { "className": "max-w-6xl mx-auto" },
      "content": [
        {
          "id": "heading-id",
          "type": "h1",
          "styles": { "fontSize": "36px", "fontWeight": "bold", "color": "#1f2937", "marginBottom": "16px" },
          "content": "Heading Text"
        },
        {
          "id": "para-id",
          "type": "p",
          "styles": { "fontSize": "18px", "color": "#6b7280" },
          "content": "Paragraph text"
        }
      ]
    }
  ]
}


Generate the JSON structure now for: ${userInput}
`;

};
