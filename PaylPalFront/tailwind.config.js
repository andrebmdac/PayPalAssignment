/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  // content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      alata: ["Alata", "sans-serif"]
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

