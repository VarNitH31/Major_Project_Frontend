module.exports = {
  // ... your other Tailwind config ...
  darkMode: 'class', // enable toggling dark mode via the "dark" class
  content: [
    // ensure you include your app and components paths
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}