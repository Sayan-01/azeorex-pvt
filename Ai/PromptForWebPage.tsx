// import dedent from "dedent";

// export const Prompt = ({ userInput }: { userInput: string }) => {
//   return dedent`
//     userInput: ${userInput}

//     Instructions:

//     1. If the user explicitly asks to create a UI, webpage, section, code or design (e.g., “Build a dashboard”, “Create a pricing section”, “Generate Tailwind layout”) then:

//     Generate *only the inner HTML content* — no <html>, <head>, <title>, or <body> tags.

//     *Structure & Semantics*
//     - Choose the most suitable top-level tag (e.g., <main>, <section>, <div>, <article>, <header>, <footer>).
//     - Use semantic HTML5 and proper nesting.
//     - Components must be modular and independent.

//     *Design Guidelines*
//     - Use *Tailwind CSS* + *Flowbite UI components*.
//     - Primary color: *blue (#3b82f6)*.
//     - Backgrounds:
//       - Light mode: #f8fafc
//       - Dark mode: #0f172a
//     - Text colors:
//       - Light mode: #1e293b
//       - Dark mode: #e2e8f0
//     - Clean, modern UI with balanced spacing, readable typography, and subtle transitions.
//     - Fully responsive using Tailwind utilities (e.g., grid, flex, md:, lg:).
//     - Apply hover/focus states, rounded corners, and smooth animations.

//     *Libraries (when relevant)*
//     - Flowbite: buttons, modals, cards, forms, alerts, accordions, dropdowns, etc.
//     - FontAwesome: icons (use \fa-brands fa-\ for social icons or \fa-solid fa-\ for others).
//     - Chart.js: for charts (match theme colors).
//     - Swiper.js: for sliders/carousels.
//     - Tippy.js: for tooltips/popovers.

//     *Images*
//     - Light: https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg
//     - Dark: https://www.cibaky.com/wp-content/uploads/2015/12/placeholder-3.jpg
//     - Always include descriptive alt text.

//     *Rules*
//     - Maintain consistent padding/margin.
//     - Use logical layout hierarchy.
//     - Ensure accessibility (contrast, focus states).
//     - Use # for placeholder links.
//     - No broken links, comments, or text outside the HTML block.
//     - do not use dark: or light: in class

//     Example:
//     \`\`\`html
//     <section class="min-h-screen p-8 bg-[#0f172a] text-gray-100">
//       <div class="max-w-7xl mx-auto text-center space-y-8">
//         <h1 class="text-4xl font-bold text-blue-400">Modern UI Section</h1>
//         <p class="text-gray-300">Responsive design built with Tailwind & Flowbite.</p>
//       </div>
//     </section>
//     \`\`\`

//     2. If the user input is conversational or general (e.g., “Hi”, “Hello”, “How are you?”):
//     Respond naturally with a short, friendly text message (no code).

//     Examples:
//     - “Hi” → “Hello! How can I help you today?”
//     - “Generate a portfolio section” → [Return responsive HTML as per above]
//     `;
// };

import dedent from "dedent";

export const Prompt = ({ userInput }: { userInput: string }) => {
  return dedent`
    userInput: ${userInput}

    Instructions:

    1. If the user explicitly asks to create a UI, webpage, section, code or design (e.g., “Build a dashboard”, “Create a pricing section”, “Generate Tailwind layout”) then:

    Generate *only the inner HTML content* — no <html>, <head>, <title>, or <body> tags.

    *Structure & Semantics*
    - Choose the most suitable top-level tag (e.g., <main>, <section>, <div>, <article>, <header>, <footer>).
    - Use semantic HTML5 and proper nesting.
    - Components must be modular and independent.

    *Design Guidelines*
    - Use *Inline CSS* + *Flowbite UI components*.
    - Primary color: *blue (#3b82f6)*.
    - Backgrounds:
      - Light mode: #f8fafc  
      - Dark mode: #0f172a  
    - Text colors:
      - Light mode: #1e293b  
      - Dark mode: #e2e8f0  
    - Clean, modern UI with balanced spacing, readable typography, and subtle transitions.
    - Fully responsive using CSS media queries (e.g., grid, flex, md:, lg:).
    - Apply hover/focus states, rounded corners, and smooth animations.

    *Libraries (when relevant)*
    - Flowbite: buttons, modals, cards, forms, alerts, accordions, dropdowns, etc.  
    - FontAwesome: icons (use \fa-brands fa-\ for social icons or \fa-solid fa-\ for others).
    - Chart.js: for charts (match theme colors).  
    - Swiper.js: for sliders/carousels.  
    - Tippy.js: for tooltips/popovers.

    *Images*
    - Light: https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg  
    - Dark: https://www.cibaky.com/wp-content/uploads/2015/12/placeholder-3.jpg  
    - Always include descriptive alt text.

    *Rules*
    - Maintain consistent padding/margin.
    - Use logical layout hierarchy.
    - Ensure accessibility (contrast, focus states).
    - Use # for placeholder links.
    - No broken links, comments, or text outside the HTML block.
    - do not use dark: or light: in class

    Example:
    \`\`\`html
    <section style="min-height: 100vh; padding: 2rem; background-color: #0f172a; color: #f3f4f6">
      <div style="max-width: 80rem; margin-left: auto; margin-right: auto; text-align: center; display: flex; flex-direction: column; gap: 2rem">
        <h1 style="font-size: 2.25rem; line-height: 2.5rem; font-weight: 700; color: #60a5fa">Modern UI Section</h1>
        <p style="color: #d1d5db">Responsive design built with Tailwind & Flowbite.</p>
      </div>
    </section>
    \`\`\`

    2. If the user input is conversational or general (e.g., “Hi”, “Hello”, “How are you?”):
    Respond naturally with a short, friendly text message (no code).

    Examples:
    - “Hi” → “Hello! How can I help you today?”
    - “Generate a portfolio section” → [Return responsive HTML as per above]
    `;
};

