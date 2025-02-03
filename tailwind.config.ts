const defaultTheme = require("tailwindcss/defaultTheme");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");
const colors = require("tailwindcss/colors");
import { withUt } from "uploadthing/tw";
import tailwindcssAnimate from "tailwindcss-animate"; // Import the plugin

/** @type {import('tailwindcss').Config} */
module.exports = withUt({
  darkMode: ["class"],
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        themeBlack: "#09090B",
        themeGray: "#27272A",
        themeDarkGray: "#27272A",
        themeTextGray: "#B4B0AE",
        themeTextWhite: "#F7ECE9",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        main: {
          DEFAULT: "#726fff",
          black: "#272727",
          az: "#363636"
        },
        editor: {
          bcgc: "#111111"
        },
        bcgc: {
  				'100': '#04071d',
  				'150': '#02031C',
  				'200': '#0c0e23',
  				'300': '#2b2b3b',
  				'400': '#00020f',
  				DEFAULT: '#000319'
  			},
  			bor: {
  				'100': '#17192d',
  				'200': '#212121',
  				DEFAULT: '#6971a2'
  			},
  			black: {
  				'100': '#101010',
  				'200': '#191919',
  				'300': '',
  				DEFAULT: '#050505'
  			},
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "image-glow": {
          "0%": {
            opacity: "0",
            "animation-timing-function": "cubic-bezier(.74, .25, .76, 1)",
          },
          "10%": {
            opacity: "0.5",
            "animation-timing-function": "cubic-bezier(.12, .01, .08, .99)",
          },
          "100%": {
            opacity: "0.7",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "image-glow": "image-glow 4s ease-out 0.6s forwards",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      boxShadow: {
        "inner-border-main": "inset 0 0 0 1px #726FFF66",
        "inner-border-blue-500": "inset 0 0 0 1px #726fff",
        "inner-border-blue-500-500": "inset 0 0 0 1px #ff0130",
        "inner-border-slate-500": "inset 0 0 0 1px #64748b22",
        "inner-border-red-500": "inset 0 0 0 1px #e73927",
        "inner-border-empty": "inset 0 0 0 4px #ffffff33",
      },
    },
  },
  plugins: [tailwindcssAnimate],
});

// function addVariablesForColors({ addBase, theme }) {
//   let allColors = flattenColorPalette(theme("colors"));
//   let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

//   addBase({
//     ":root": newVars,
//   });
// }
