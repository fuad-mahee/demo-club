module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5636A7',
        secondary: '#3E2C6B',
        dark: '#1E1E1E',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(180deg, #5636A7 0%, #3E2C6B 50%, #1E1E1E 100%)',
      },
    },
  },
  plugins: [],
};