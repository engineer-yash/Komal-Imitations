/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37',
        'primary-foreground': '#FFFFFF',
        secondary: '#F9F5F0',
        'secondary-foreground': '#1A1A1A',
        background: '#FFFFFF',
        foreground: '#1A1A1A',
        muted: '#F5F5F5',
        'muted-foreground': '#666666',
        accent: '#D4AF37',
        border: '#E5E5E5',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        lato: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
