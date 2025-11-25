import dedent from "dedent";

export const PromptForWebPage = ({ userInput }: { userInput: string }) => {
  return dedent`

You are an expert web designer. Generate a JSON structure for a modern, responsive webpage.
🚨 CRITICAL OUTPUT RULES - FAILURE TO FOLLOW CAUSES ERRORS:

1. OUTPUT FORMAT:
  - Start with { and end with }
  - ONLY valid JSON, NO markdown, NO \`\`\`json blocks, NO explanations, NO comments

2. MANDATORY ELEMENT STRUCTURE (every element MUST have):
   {
     "id": "unique-id",        // REQUIRED - string, must be unique
     "type": "elementType",     // REQUIRED - string (html tag name)
     "styles": {},              // OPTIONAL - object with camelCase CSS
     "attributes": {},          // OPTIONAL - object (see allowed list below)
     "content": ""              // OPTIONAL - string OR array of complete element objects
   }

   CONTENT PROPERTY RULES (CRITICAL - READ CAREFULLY):
   - "content" MUST be EITHER:
     1. A string: "content": "Hello World"
     2. An array of COMPLETE element objects: "content": [{full element}, {full element}]
   
   - ✅ CORRECT Examples:
     "content": "This is text"
     "content": [
       {"id": "child1", "type": "p", "content": "Text"},
       {"id": "child2", "type": "div", "content": "More"}
     ]
   
   - ❌ WRONG Examples (NEVER do these):
     "content": ["string1", "string2"]           // NO string arrays!
     "content": [{"id": "x"}, "text"]            // NO mixing objects and strings!
     "content": ["text"]                         // NO single-item string array!
   
   - Simple Rule: 
     * Text only → use string
     * Child elements → use array of complete objects with all required properties (id, type, etc.)

3. ALLOWED ATTRIBUTES (attributes object can ONLY contain these):
  - "className": string value (Tailwind classes only). Use Tailwind classes only for layout utilities (flex, grid), responsive utilities (md:, lg:, xl:), grid column utilities (md:grid-cols-1, lg:grid-cols-2, xl:grid-cols-3), gap utilities (gap-*), and pseudo-classes (hover:, focus:, active:). Do not use Tailwind for spacing, max-width, centering, typography, colors or any other properties .
  - "src": string value (for img elements only)
  - "href": string value (for a elements only)
  - "alt": string value (for img elements only)
  - Alwase use cammelCase for attribute names
  ❌ NO OTHER ATTRIBUTES ALLOWED (no onClick, no style, no data-*, no aria-*, nothing else)

4. ALLOWED ELEMENT TYPES (type property must be ONE of these):
  __body, section, div, header, footer, nav, main, article, aside,
  h1, h2, h3, h4, h5, h6, p, span, a, button, img, ul, ol, li etc

5. TAILWIND + STYLES CONFLICT PREVENTION:
  - Use Tailwind only for psuedo classes like hover, active, focus etc
  - Use Tailwind only for responsive classes like md:, lg:, xl: etc. If you use Tailwind for a property, DO NOT add it to styles:
  - For responcive use flex, grid, md:flex, lg:flex, xl:flex, md:grid, lg:grid, xl:grid, md:grid-cols-1, lg:grid-cols-2, xl:grid-cols-3 gap-* etc in attributes.className only.
   
  ❌ WRONG:
  "attributes": { "className": "grid md:grid-cols-3 grid-cols-1 gap-2" },
  "styles": { "display": "flex" }  // DON'T DO THIS
  "styles": { "display": "grid" }  // DON'T DO THIS
   
  ✅ CORRECT:
  "attributes": { "className": "grid md:grid-cols-3 grid-cols-1 gap-2" },
  // No display in styles

6. IMAGE RULES:
  - Use img elements when they necessary and enhance design
  - For img: set attributes.src as "https://picsum.photos/800/500" (adjust dimensions as needed) and always add borderRadius in styles 
  - NO video, audio, iframe, canvas, input, textarea, label

7. DESIGN PRINCIPLES:
  - Modern spacing (generous padding/margins)
  - Subtle shadows for depth
  - Consistent color palette (2-3 main colors)
  - Typography hierarchy (clear size/weight differences)
  - Hover effects on interactive elements
  - Make responsive layouts with Tailwind classes
  - Visual balance and whitespace
  - Gradient accents where appropriate

8. ROOT STRUCTURE (always start with this):
{
  "id": "__root",
  "type": "__body",
  "styles": {
    "minHeight": "100vh",
    "backgroundColor": "#f5f5f5",
    "padding": "10px"
  },
  "content": [
    // your sections here
  ]
}

9. MODERN DESIGN PRINCIPLES (Apply for impressive results):

   A. VISUAL HIERARCHY & TYPOGRAPHY:
      - Hero headings: 48-64px, fontWeight: "700"
      - Section headings: 32-48px, fontWeight: "600-700"
      - Subheadings: 20-24px, fontWeight: "500-600"
      - Body text: 16-18px, fontWeight: "400"
      - Line height: 1.6-1.8 for body, 1.2-1.4 for headings
      - Color contrast: Use dark text (#1f2937, #111827) on light backgrounds
   
   B. SPACING & LAYOUT:
      - Section padding: 60-100px vertical, 40-60px horizontal
      - Card padding: 32-48px
      - Element spacing: 16-32px margins between elements
      - Use max-w-7xl or max-w-6xl with mx-auto for centered containers
      - Consistent gap values: 16px, 24px, 32px
   
   D. POLISH & REFINEMENT:
      - Border radius: 12-20px for cards, 8-12px for buttons
      - Smooth transitions: "all 0.3s ease" or "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      - Button padding: "14px 32px" or "16px 40px"
      - Hover effects on buttons: transform: "translateY(-2px)", increase shadow
   
  
10. COMMON MISTAKES TO AVOID:
  ❌ Missing "type" property
  ❌ Using string arrays in content: ["text1", "text2"]
  ❌ Adding random attributes like "data-*", "onClick", "role"
  ❌ Using both Tailwind and styles for same property
  ❌ Forgetting "id" on elements
  ❌ Using invalid element types
  ❌ Adding explanatory text before/after JSON
  ❌ Using single quotes instead of double quotes
  ❌ Poor color contrast (light text on light background)
  ❌ Trailing commas

MINIMAL EXAMPLE OUTPUT:
{
  "id": "__root",
  "type": "__body",
  "styles": { "minHeight": "100vh", "backgroundColor": "#f3f4f6", "padding": "10px" },
  "content": [
    {
      "id": "section-id",
      "type": "section",
      "styles": { "padding": "40px", "backgroundColor": "#ffffff", "borderRadius": "12px", "marginBottom": "20px", "boxShadow": "0 4px 6px rgba(0,0,0,0.1)", "marginLeft": "auto", "marginRight": "auto" },
      "attributes": { "className": "max-w-6xl" },
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

Now generate the JSON structure for: ${userInput}
FINAL REMINDERS:
- Output ONLY valid JSON (no markdown wrapper, no explanations)
- Output JSON not more than ~2500 lines
- Start with { and end with }
- Ensure "content" is string OR array of objects (never string array)
- Apply modern design principles for visually stunning results
- Double-check for trailing commas and proper quote usage`;
};
