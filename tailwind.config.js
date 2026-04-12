/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        attain: {
          base:    '#121828',
          card:    '#182030',
          hover:   '#1E2840',
          primary: '#38BDF8',
          deep:    '#0EA5E9',
          magenta: '#38BDF8',
          cyan:    '#34D399',
          lilac:   '#93C5FD',
          muted:   '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
      },
      boxShadow: {
        card: 'rgba(0, 0, 0, 0.2) 0px 1px 30px 0px',
        'card-hover': 'rgba(0, 0, 0, 0.35) 0px 4px 40px 0px',
        'card-glow-magenta': '0 0 30px rgba(56, 189, 248, 0.15)',
        'card-glow-cyan': '0 0 30px rgba(52, 211, 153, 0.15)',
        'card-glow-green': '0 0 30px rgba(34, 197, 94, 0.15)',
        'card-glow-lilac': '0 0 30px rgba(147, 197, 253, 0.15)',
      },
    },
  },
  plugins: [],
}
