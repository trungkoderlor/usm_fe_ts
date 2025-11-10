/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // đường dẫn đến các file chứa class Tailwind
  ],
  theme: {
    extend: {
      // bạn có thể custom màu, font, spacing ở đây
    },
  },
  plugins: [],
};
