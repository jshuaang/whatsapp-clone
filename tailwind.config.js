module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          light: '#25D366',
          teal: '#128C7E',
          darkteal: '#075E54'
        }
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus', 'active', 'visited'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
