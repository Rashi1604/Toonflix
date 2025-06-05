/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { colors: {
        richblue: {
          light: '#5C78D5',
          DEFAULT: '#1338BE',
          darker: '#0A1F6B',
        },
      },
  },
  plugins: [],
 
}
}
