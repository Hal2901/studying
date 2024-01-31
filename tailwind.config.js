/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: 'var(--main-color)',
        defaultText: 'var(--default-text)',
        disabled: 'var(--disable-color)',
        danger: 'var(--danger-color)',
        whiteFFF: 'var(----FFF-color)',
        whiteFAFAFA: 'var(--FAFAFA)',
        F5F5F5: 'var(--F5F5F5-color)',
        hover: 'var(--hover-color)',
        color_cyan: 'var(--color-cyan)',
        border: 'var(--border-color)',
        overlay: 'rgba(0, 0, 0, 0.30)',
        active: 'var(--color-active)',
        gray01: 'var(--gray01)',
        bg03: 'rgba(1, 55, 117, 0.03)',
        bg_varian: 'rgba(0, 130, 197, 0.10)',
        bgProject: 'rgba(1, 55, 117, 0.03)',
        bgPinkOpacity: 'rgba(237, 22, 75, 0.03)',
        bgDistributor: 'rgba(154, 129, 67, 0.03)',
        bgGuaratee: 'rgba(144, 151, 157, 0.03)',
      },
      boxShadow: {
        normal: '0px 4px 24px 0px rgba(1, 55, 117, 0.12)',
        medium: '0px 4px 4px 0px rgba(0,0,0,.25)',
      },
      borderRadius: {
        '1/2': '50%',
        10: '10px',
      },
      fontSize: {
        40: ['40px', '130%'],
      },
      spacing: {
        88: '88px',
        100: '100px',
        124: '124px',
        160: '160px',
        200: '200px',
        250: '250px',
        270: '270px',
        300: '300px',
        320: '320px',
        400: '400px',
        420: '420px',
        500: '500px',
        600: '600px',
      },
      zIndex: {
        max: 999,
      },
      screens: {
        sc1920: '1920px',
        sc1800: '1800px',
        sc1660: '1660px',
        sc1360: '1360px',
        sc1176: '1176px',
        sc868: '868px',
        xs: '480px',
        xs360: '360px',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {};
      const spacing = theme('spacing');

      for (let space in spacing) {
        newUtilities[`.grid-auto-fit-${space}`] = {
          'grid-template-columns': `repeat(auto-fit, minmax(${spacing[space]}, 1fr))`,
        };
        newUtilities[`.grid-auto-fill-${space}`] = {
          'grid-template-columns': `repeat(auto-fill, minmax(${spacing[space]}, 1fr))`,
        };
      }

      addUtilities(newUtilities);
    },
  ],
};
