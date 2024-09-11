/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      customFontEn: ["IBM Plex Mono", "monospace"],
      customFontKr: ["IBM Plex Sans KR", "sans-serif"],
    },
  },
  plugins: [],
};
