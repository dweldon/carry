module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line
    require('@tailwindcss/forms'),
  ],
};
