// tailwind.config.ts

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Path to your page components
    './components/**/*.{js,ts,jsx,tsx}', // Path to your component files
    './app/**/*.{js,ts,jsx,tsx}', // Path to your app directory (if using Next.js app directory)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
