import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ["var(--font-dm-sans)", "sans-serif"],
  			serif: ["var(--font-lora)", "serif"],
  			mono: ["var(--font-jetbrains-mono)", "monospace"],
  		},
  		colors: {
  			background: "var(--background)",
  			foreground: "var(--foreground)",
  			primary: {
  				DEFAULT: "var(--primary)",
  				foreground: "var(--primary-foreground)",
  			},
  			secondary: {
  				DEFAULT: "var(--secondary)",
  				foreground: "var(--secondary-foreground)",
  			},
  			terracotta: {
  				DEFAULT: "#C2522B",
  			},
  			sage: {
  				DEFAULT: "#5C7A5C",
  			},
  			amber: {
  				DEFAULT: "#B8860B",
  			},
  			cream: {
  				DEFAULT: "#F8F5F0",
  			},
  			card: {
  				DEFAULT: "var(--card)",
  				foreground: "var(--card-foreground)",
  			},
  			popover: {
  				DEFAULT: "var(--popover)",
  				foreground: "var(--popover-foreground)",
  			},
  			muted: {
  				DEFAULT: "var(--muted)",
  				foreground: "var(--muted-foreground)",
  			},
  			accent: {
  				DEFAULT: "var(--accent)",
  				foreground: "var(--accent-foreground)",
  			},
  			destructive: {
  				DEFAULT: "var(--destructive)",
  				foreground: "var(--destructive-foreground)",
  			},
  			border: "var(--border)",
  			input: "var(--input)",
  			ring: "var(--ring)",
  		},
  		borderRadius: {
  			lg: "var(--radius)",
  			md: "calc(var(--radius) - 2px)",
  			sm: "calc(var(--radius) - 4px)",
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
