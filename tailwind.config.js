/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wa-green': '#00a884',
        'wa-green-dark': '#008069',
        'wa-teal': '#075e54',
        'wa-teal-dark': '#054640',
        'wa-light-green': '#d9fdd3',
        'wa-chat-bg': '#efeae2',
        'wa-panel-bg': '#f0f2f5',
        'wa-bubble-out': '#d9fdd3',
        'wa-bubble-in': '#ffffff',
        'wa-header': '#008069',
        'wa-text': '#111b21',
        'wa-text-secondary': '#667781',
        'wa-border': '#e9edef',
      },
    },
  },
  plugins: [],
}
