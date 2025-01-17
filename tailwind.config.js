/** @type {import('tailwindcss').Config} */
export default {

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '640px',  
      'md': '768px',  
      'lg': '1124px',
      'min-lg': '1024px',
      'xl': '1280px', 
      '2xl': '1536px', 
      'custom': '904px', 
    },
  
    extend: {
      colors: {
        darkpurple: '#47244c',
        lightPurple:'#6b1396ff',
        orchid:'#DA70D6'
      },
      backgroundImage: {
        'header':"url('src/assets/header-bg.svg')",
        'about': "url('src/assets/about-us.png')",
        'testimonial':"url('src/assets/testimonial.png')",

      },

      fontFamily:{
        poppins:"'Poppins', sans-serif",
        // roboto: "'Roboto', sans-serif"
      }
      
    },
  },
  plugins: [
    require('@tailwindcss/forms'),

  ],
};





