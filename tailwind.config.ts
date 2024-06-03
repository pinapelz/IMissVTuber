import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent' : '#1A4A7F',
      },
      animation: {
        'shake': 'shake 1s infinite',
        'fadeout': 'fadeout 1s forwards'
      },
      keyframes: {
        shake: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        fadeout: {
          'from': { opacity: '1' },
          'to': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
