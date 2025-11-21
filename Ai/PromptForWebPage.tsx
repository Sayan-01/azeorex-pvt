// import dedent from "dedent";

// export const promptForFindType = ({ userInput }: { userInput: string }) => {
//   return dedent`
//     User Input: ${userInput}

//     Classification Rules:
//     - Now only return "txt" if user input is a greeting, conversation, asking questions, or making casual remarks (e.g., "Hi", "Hello", "How are you?") ". 
//     - And only return "code" if user input is a webpage, UI section, or component (examples: "Create a hero section", "Build a landing page", "Design a footer"). 

//     Examples of "code":
//     - "Create a hero section"
//     - "Build a landing page"
//     - "I need a contact form"
//     - "Show me a navbar"
//     - "Make a pricing table"
    
//     Examples of "txt":
//     - "Hi there"
//     - "How are you?"
//     - "What can you do?"
//     - "Explain recursion to me"
    
//     Return only "txt" or "code" with no additional text.
//   `;
// };

// export const promptForTextResponse = ({ userInput }: { userInput: string }) => {
//   return dedent`
//     You are a helpful AI assistant engaged in a natural conversation with a user.
    
//     User Message: ${userInput}
    

//     Instructions:
//     - Provide a friendly, conversational response and use bullet points if it is necessary.
//     - Be concise but informative
//     - If the user is greeting you, respond warmly and ask how you can help
//     - If the user asks what you can do, explain that you can help with:
//       * Building web components and UI elements
//       * Creating landing pages and website sections
//       * Designing interactive elements
//       * General conversation and answering questions
//     - Match the tone and formality level of the user's message
//     - If the user's request is unclear, ask clarifying questions
//     - Keep responses natural and engaging, avoid being overly formal unless the context requires it
    
//     Respond directly to the user's message now:
//   `;
// };

// export const PromptForWebPage = ({ userInput }: { userInput: string }) => {
//   return dedent`

// You are an expert web designer. Generate a JSON structure for a modern, responsive and visually stunning webpage.

// OUTPUT FORMAT - Return ONLY valid JSON (no markdown, no \`\`\`json blocks, no explanations, no comments):

// RULES:
// - Output ONLY JSON (no markdown, no commentary) *Strictly start with { and end with }* 
// - Keys use double quotes, no trailing commas
// - Every element has: id, type, styles?, attributes? (only src, className, href), content?
// - "content" = string OR array of *elements* do not use '
// - CSS in camelCase inside "styles"
// - Tailwind only inside attributes.className
// - Use semantic tags: section, div, header, footer, nav, h1-h6, p, button, article, img
// - Modern, clean design with spacing
// - Tailwind ONLY for responsive/utility classes in attributes.className
// - When using Tailwind for a property, do NOT add same property in styles
//   Example: If className="hidden md:flex", do NOT add "display" in styles
//   Example: If className="mx-auto", do NOT add "marginLeft/marginRight" in styles
// - Use img elements when they necessary and enhance design
// - For img: set attributes.src as "https://picsum.photos/800/500" (adjust dimensions as needed) and always add borderRadius in styles 
// - NO video, audio, iframe, canvas, input, textarea, label

// DESIGN PRINCIPLES:
// - Modern spacing (generous padding/margins)
// - Subtle shadows for depth
// - Consistent color palette (2-3 main colors)
// - Typography hierarchy (clear size/weight differences)
// - Hover effects on interactive elements
// - Responsive grid layouts
// - Visual balance and whitespace
// - Gradient accents where appropriate

// ROOT FORMAT:
// {
//   "id": "__root",
//   "type": "__body",
//   "styles": {
//     "minHeight": "100vh",
//     "padding": "10px"
//   },
//   "content": []
// }

// MINIMAL EXAMPLE:
// {
//   "id": "__root",
//   "type": "__body",
//   "styles": { "minHeight": "100vh", "backgroundColor": "#f3f4f6", "padding": "10px" },
//   "content": [
//     {
//       "id": "section-id",
//       "type": "section",
//       "styles": { "padding": "40px", "backgroundColor": "#ffffff", "borderRadius": "12px", "marginBottom": "20px", "boxShadow": "0 4px 6px rgba(0,0,0,0.1)" },
//       "attributes": { "className": "max-w-6xl mx-auto" },
//       "content": [
//         {
//           "id": "heading-id",
//           "type": "h1",
//           "styles": { "fontSize": "36px", "fontWeight": "bold", "color": "#1f2937", "marginBottom": "16px" },
//           "content": "Heading Text"
//         },
//         {
//           "id": "para-id",
//           "type": "p",
//           "styles": { "fontSize": "18px", "color": "#6b7280" },
//           "content": "Paragraph text"
//         }
//       ]
//     }
//   ]
// }


// Generate the JSON structure now for: ${userInput}
// `;
// };
