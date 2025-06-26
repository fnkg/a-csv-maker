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
      colors: {
        background: 'var(--c-background)',
        surface: 'var(--c-surface)',

        primary: {
          DEFAULT: 'var(--c-primary)',
          dark: 'var(--c-primary-dark)',
        },
        clear: {
          DEFAULT: 'var(--c-clear)',
          dark: 'var(--c-clear-dark)',
        },
        success: {
          DEFAULT: 'var(--c-success)',
          dark: 'var(--c-success-dark)',
        },
        tab: {
          DEFAULT: 'var(--c-tab)',
          hover: 'var(--c-tab-hover)',
        },
        scroll: {
          DEFAULT: 'var(--c-scroll)',
          hover: 'var(--c-scroll-hover)',
        },
        focus: {
          DEFAULT: 'var(--c-focus)',
        },
        hover: {
          DEFAULT: 'var(--c-hover)',
        },
      }
    },
  },
}