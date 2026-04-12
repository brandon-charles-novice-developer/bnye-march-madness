/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        attain: {
          base:    '#1E1A2E',
          card:    '#252040',
          hover:   '#2D2750',
          primary: '#E91E8E',
          deep:    '#C2177A',
          magenta: '#E91E8E',
          cyan:    '#00E5FF',
          lilac:   '#C4B5FD',
          muted:   '#AFADAD',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
      },
      boxShadow: {
        card: 'rgba(0, 0, 0, 0.2) 0px 1px 30px 0px',
        'card-hover': 'rgba(0, 0, 0, 0.35) 0px 4px 40px 0px',
        'card-glow-magenta': '0 0 30px rgba(233, 30, 142, 0.15)',
        'card-glow-cyan': '0 0 30px rgba(0, 229, 255, 0.15)',
        'card-glow-green': '0 0 30px rgba(34, 197, 94, 0.15)',
        'card-glow-lilac': '0 0 30px rgba(196, 181, 253, 0.15)',
      },
    },
  },
  plugins: [],
}
