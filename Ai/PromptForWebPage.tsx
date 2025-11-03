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

userInput: ${userInput}

Instructions:
1. If the user explicitly asks to create a UI, webpage, section, code or design (e.g., “Build a dashboard”, “Create a pricing section”, “Generate Tailwind layout”) then:
You are an expert web designer. Generate a JSON structure for a modern, responsive webpage.

- OUTPUT FORMAT - Return ONLY valid JSON (no markdown, no \`\`\`json blocks, no explanations):
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

ELEMENT STRUCTURE:
- id: unique identifier (e.g., "hero-1", "button-2", "section-3")
- type: HTML tag (div, section, h1, h2, h3, p, button, article, header, footer, nav)
- styles: CSS properties in camelCase (backgroundColor, fontSize, fontWeight, padding, margin, borderRadius, boxShadow, color, minHeight)
- attributes: { "className": "tailwind utility classes" } (optional)
- content: string for text OR array for nested elements

STYLING RULES:
- Use Tailwind classes in attributes.className only for responsive classes or effects: "md:grid-cols-2 lg:grid-cols-3", "md:text-lg, "hover:bg-blue-700"
- Use CSS styles object for precise values: { "padding": "40px", "backgroundColor": "#ffffff" }
- Responsive classes: "grid md:grid-cols-2 lg:grid-cols-3", "text-base md:text-lg"
- Use morder design: follow proper spaccing between 2 elements, use proper color palettes.
- Give space between elements, text elements and cards 

DESIGN REQUIREMENTS:
- Clean, professional aesthetic with whitespace
- Semantic HTML5 elements (section, article, header, footer)
- Unique IDs for all major elements
- Proper nesting: sections contain divs, divs contain headings/paragraphs/buttons
- Color palette: Primary + Accent + neutrals (gray scale)
- Typography: Proper hierarchy (h1: 36px, h2: 28px, h3: 20px, p: 16px)

COMMON PATTERNS:

Hero Section:
{
  "id": "hero-1",
  "type": "section",
  "styles": { "padding": "60px 40px", "backgroundColor": "#ffffff", "borderRadius": "12px", "marginBottom": "20px", "boxShadow": "0 4px 6px rgba(0,0,0,0.1)" },
  "content": [
    { "id": "title-1", "type": "h1", "styles": { "fontSize": "48px", "fontWeight": "bold", "color": "#1f2937", "marginBottom": "16px" }, "content": "Main Headline" },
    { "id": "subtitle-1", "type": "p", "styles": { "fontSize": "20px", "color": "#6b7280", "marginBottom": "24px" }, "content": "Subheading text" },
    { "id": "btn-container-1", "type": "div", "attributes": { "className": "flex gap-4" }, "content": [
      { "id": "btn-1", "type": "button", "styles": { "padding": "12px 24px", "backgroundColor": "#3b82f6", "color": "#ffffff", "borderRadius": "8px", "fontSize": "16px", "fontWeight": "500", "border": "none", "cursor": "pointer" }, "content": "Get Started" }
    ]}
  ]
}

Card Grid:
{
  "id": "features-1",
  "type": "section",
  "styles": { "padding": "40px" },
  "content": [
    { "id": "heading-1", "type": "h2", "styles": { "fontSize": "32px", "fontWeight": "bold", "textAlign": "center", "marginBottom": "32px" }, "content": "Features" },
    { "id": "grid-1", "type": "div", "styles": { "display" : "flex", "flexWrap": "wrap", "justifyContent": "center", "gap": "20px" }, attributes: { "className": "max:flex-col" }, "content": [
      { "id": "card-1", "type": "div", "styles": { "padding": "24px", "backgroundColor": "#ffffff", "borderRadius": "8px", "boxShadow": "0 2px 4px rgba(0,0,0,0.1)" }, "content": [
        { "id": "card-title-1", "type": "h3", "styles": { "fontSize": "20px", "fontWeight": "600", "marginBottom": "8px" }, "content": "Feature Title" },
        { "id": "card-desc-1", "type": "p", "styles": { "fontSize": "14px", "color": "#6b7280" }, "content": "Description" }
      ]}
    ]}
  ]
}

CRITICAL RULES:
1. Return ONLY valid JSON - Start with { and end with }
2. No markdown, no code blocks, no explanations
3. All keys and string values use double quotes
4. No trailing commas
5. Proper nesting and brackets
6. Every element needs unique ID
7. Use camelCase for CSS properties in styles
8. Text content goes directly in "content" as string
9. Nested elements go in "content" as array
10. Include both styles object AND attributes.className when appropriate

Generate the JSON structure now for: ${userInput}

2. If user input is a greeting, conversation, asking questions, or making casual remarks (e.g., "Hi", "Hello", "How are you?") ". 

Respond naturally with a short, friendly text message (no json).

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
