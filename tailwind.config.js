const Colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js",
    "./screens/**/*.js",
    "./components/**/*.js"

  ],
  theme: {
    extend: {

      colors: {
        'color1': Colors.orange[500],
        'colorLight': '#E7EBF0',
        'colorDark': '#18140f',
        'Color2': {
          50: '#DDD',
        },
      },

    },
  },
  plugins: [],
}
