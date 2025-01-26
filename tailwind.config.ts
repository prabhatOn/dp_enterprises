import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
      addUtilities({
        ".text-stroke-gray-800": {
          "-webkit-text-stroke": "1px #1f2937", // Add outline color here
        },
      });
    },
  ],
};

export default config;
