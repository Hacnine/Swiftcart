/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "7rem",
      },
    },
  
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};








// /** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");
 
// module.exports = withMT({

//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
    
//     extend: {
//       fontSize: {
//         xs: ['12px', '16px'],
//         sm: ['14px', '20px'],
//         base: ['16px', '19.5px'],
//         lg: ['18px', '21.94px'],
//         xl: ['20px', '24.38px'],
//         '2xl': ['24px', '29.26px'],
//         '3xl': ['28px', '50px'],
//         '4xl': ['48px', '58px'],
//         '8xl': ['96px', '106px']
//       },

  
     

//       backgroundImage: {
//         'hero-img':  "url('/src/assets/heroImage.svg')",
//         'hero-two':  "url('/src/assets/office-bg.jpg')",
//         'profile':  "url('/src/assets/profile-bg.svg')",
//         'sevices': "url('/src/assets/servces-background.jpg')",
//         'feature': "url('/src/assets/feature.png')",
//         'about-bg': "url('/src/assets/about-bg.jpg')",
//         'testimonial-1': "url('/src/assets/testimonial (1).jpg')",
//         'testimonial-2': "url('/src/assets/testimonial (2).jpg')",
//         'testimonial-3': "url('/src/assets/testimonial (3).jpg')",
//         'singlecar': "url('/src/assets/singlecarbg.svg')",
//         'login': "url('/src/assets/singlecarbg.jpg')",
//         'office':  "url('/src/assets/office-bg.jpg')",


//       },
      
//       fontFamily: {
//         neon: ["Tilt Neon", "sans-serif"],
//         young: ["Young Serif", "serif"],
//         open: ["Open Sans", "sans-serif"],
       

//       },
//       colors: {
//         "primary-green": "#1fc916",
//         "light-green": "#1dd213",
//         "deep-green": "#179510",
//         "slate-blue":"#031b4e",
//         "white-green": "#eafae8ff",
        
//       },
//       screens: {
//         sm: "740px",
//         md:"968px",
//         lg: "1100px",
//         // xl: "1100px",
//         "wide": "1440px",


//       },
      
//     },
//   },
//   variants:{
//     extend: {
//       display:['group-focus']
//     },
//   },
//   plugins: [
//     require('@tailwindcss/forms'),
//   ],


// });

