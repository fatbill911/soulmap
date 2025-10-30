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
        "cosmic-navy": "#0B0F2F",
        "cosmic-purple": "#9B5DE5",
        "cosmic-pink": "#F72585",
        "cosmic-white": "#F0EFFF",
        "cosmic-gray": "#2A2E4F",
      },
      backgroundImage: {
        "cosmic-gradient": "linear-gradient(135deg, #0B0F2F 0%, #1a1f4d 50%, #2A2E4F 100%)",
        "star-gradient": "radial-gradient(circle at 50% 50%, #9B5DE5 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
