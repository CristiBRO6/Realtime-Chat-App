/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '640px',
        'tablet': '768px',
        'desktop': '1024px',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        cardForeground: 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        "popover-foreground": 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        "primary-foreground": 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        "secondary-foreground": 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        "muted-foreground": 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        "accent-foreground": 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        "destructive-foreground": 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart1: 'hsl(var(--chart-1))',
        chart2: 'hsl(var(--chart-2))',
        chart3: 'hsl(var(--chart-3))',
        chart4: 'hsl(var(--chart-4))',
        chart5: 'hsl(var(--chart-5))',
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
  ],
}
