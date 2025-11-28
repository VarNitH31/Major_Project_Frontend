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
    extend: {
       colors: {
        charcoal: {
          DEFAULT: "#0D1117",
          light: "#161B22",
          hover: "#1F2937",
        },
        mint: {
          DEFAULT: "#2EEA9A",
          soft: "#A7F3D0",
          mid: "#6EE7B7",
        },
        neutralgray: {
          light: "#F9FAFB",
          mid: "#D1D5DB",
          textmute: "#9CA3AF",
        },
      },
    },
  },
  plugins: [],




}