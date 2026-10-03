/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#f2f6fa",
        muted: "#aebbc8",
        line: "#2b3a49",
        biometric: "#2779f5",
      },
      fontFamily: {
        sans: ["Manrope", "Arial", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
