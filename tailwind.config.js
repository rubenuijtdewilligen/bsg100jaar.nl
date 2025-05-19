/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {}
  },

  plugins: [require('daisyui')],

  daisyui: {
    themes: [
      {
        corporate: {
          ...require('daisyui/src/theming/themes')['[data-theme=corporate]'],
          primary: '#ff0000',
          black: '#000000',
          'neutral-content': '#1a1a1a',
          yellow: '#ff9800',
          lightyellow: '#f4c983',
          green1: '#5f8670',
          green2: '#5b6d5b',
          neutral: '#fefdf8',
          white: '#ffffff'
        }
      }
    ]
  }
};
