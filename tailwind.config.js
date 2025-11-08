module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF6F8',
          100: '#FFEFF2',
          DEFAULT: '#FF5A7A', // fallback
          dark: '#6C5CE7', // used in some accents
        },
        primary: {
          DEFAULT: '#0f3bbd',
          dark: '#0b2b87'
        },
        accentGradientStart: '#FF6A3D',
        accentGradientEnd: '#FF2DA8'
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'soft-lg': '0 10px 30px rgba(13, 30, 75, 0.08)',
        'card': '0 8px 20px rgba(9, 30, 66, 0.06)'
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px'
      },
    },
  },
  plugins: [],
};