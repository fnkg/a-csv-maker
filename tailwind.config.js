/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        apercu: ['ApercuPro', 'sans-serif'],
      },
      fontWeight: {
        light: 300,
        medium: 500,
      },
    },
  },
}