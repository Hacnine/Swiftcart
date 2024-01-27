/** @type {import('tailwindcss').Config} */
export default {

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    corePlugins: {
      preflight: false,
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "7rem",
      },
    },
  
    extend: {
      backgroundImage: {
        'about': "url('src/assets/about-us.svg')",
        'testimonial':"url('src/assets/testimonial.svg')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};





