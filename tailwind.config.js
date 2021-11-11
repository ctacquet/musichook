module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      "colors": {
        "Primary color": "#ffffff",
        "Primary text": "#000000",
        "Outline": "#9d9d9d",
        "Square above image": "#ffffff",
        "contour gris": "#dbdbdb"
       },
       fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
       },
       "boxShadow": {
        "customShadow": "5px 5px 3px 2px rgba(0,0,0,0.25)"
       },
       "borderRadius": {
        "none": "0",
        "xs": "0.0625rem",
        "sm": "0.3125rem",
        "default": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.625rem",
        "2xl": "0.75rem",
        "3xl": "0.9375rem",
        "4xl": "1.125rem",
        "5xl": "1.25rem",
        "6xl": "1.375rem",
        "7xl": "1.5rem",
        "8xl": "1.8125rem",
        "9xl": "3.0625rem",
        "10xl": "5.625rem",
        "full": "9999px"
       },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
    require("tailwind-scrollbar-hide"),
  ],
}
