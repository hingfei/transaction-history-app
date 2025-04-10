/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0000e6",
        black: {
          DEFAULT: "#000000",
          100: "#1a1a1a",
          200: "#333333",
        }
      },
    },
  },
  plugins: [],
}
