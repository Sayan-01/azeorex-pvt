import dedent from "dedent";
import { EditorContentNames, EditorContentTypes } from "./AI_constant";

export const AiForFindType = ({ userInput }: { userInput: string }) => {
  return dedent`
    User Input: ${userInput}

    Now only return "txt" if user input is a greeting or general message (e.g., "Hi", "Hello", "How are you?") or doesn’t ask for a webpage. 

    And only return "code" if user input is a webpage, UI section, or component (examples: "Create a hero section", "Build a landing page", "Design a footer"). 
  `;
};

export const AiPromptForCode = ({ userInput }: { userInput: string }) => {
  return dedent`
    You are a professional Webpage JSON Generator AI Assistant for Azeorex SaaS.

    User Input: ${userInput}
    Type: code.

    IMPORTENT: Your task is to generate highly professional webpage component generator with greate UIUX design in JSON schema format , based on ${userInput}. Follow these instructions carefully -->

    Schema Rules:
      - Root: only one "__body" object.
      - Hierarchy: Body → Section → Container → Elements.
      - Each element object must include:
        {
          "id": "uuid-like string",
          "name": ${EditorContentNames} as string,
          "type": ${EditorContentTypes} as string,
          "styles": React.CSSProperties,
          "content": EditorElement[] | { "href"?: string; "innerText"?: string; "src"?: string }
        }
      - Each id must be unique.
      - JSON must be **strictly valid and parsable** — no comments, markdown, or trailing commas.
      - Return **only** the JSON array — no explanations, no extra text.

    Design Guidelines:
      - Clean, modern layout (flex-based alignment, consistent spacing, and clear hierarchy).
      - Default background: light tone (#f8f8f8).
      - Include common webpage elements: headings, text, images, links, CTAs.
      - For images, use placeholder: "/image-placeholder.png".
      - Maintain readability: contrast text color with background.
      - Each element's style keys must use **correct spelling** (example: "backgroundColor", not "backgrondColor").
      - Make it fully responsive for all screen sizes.  
      - All primary components must match the theme color.  
      - Add proper padding and margin for each element and also use rounded corners.  
      - Components should be independent; do not connect them.  
      - Ensure proper spacing, alignment, hierarchy, and theme consistency.  
      - Ensure charts are visually appealing and match the theme color.  
      - Do not include broken links.  
        
    Output Rules:
      - Output **only valid JSON array** (no code fences, no markdown).
      - Must start with "[" and end with "]".
      - No explanations or greetings after output.
      - Ensure proper nesting and valid syntax and follow proper Schema Rules.
      - Output a **single valid JSON array** following this schema:

        [
          {
            "id": "__body",
            "name": "Body",
            "type": "__body",
            "styles": {
              "backgroundColor": "#f8f8f8"
            },
            "content": [...]
          }
        ]
  `;
};

export const AiPromptForText = ({ userInput }: { userInput: string }) => {
  return dedent`
    User Input: ${userInput}
    Type: text.

      - Respond naturally with text only (no JSON).
      - Example: "Hi" → "Hello! How can I help you today?"
  `;
}