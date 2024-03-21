/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

const newScreens = Object.entries(defaultTheme.screens).reduce(
  (breakpoints, [label, value]) => {
    if (label == 'lg') {
      breakpoints['sm-upper'] = '500px';
    }
    breakpoints[label] = value;
    return breakpoints;
  },
  {},
);

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'bebas-neue': ['"Bebas Neue"', ...defaultTheme.fontFamily.sans],
        hanken: ['"Hanken Grotesk"', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'home-hero': "url('/src/assets/backgrounds/hero-home.webp')",
        'hero-jobs': "url('/src/assets/backgrounds/hero-jobs.webp')",
        'hero-companies': "url('/src/assets/backgrounds/hero-companies.webp')",
        'hero-blogs': "url('/src/assets/backgrounds/hero-blogs.webp')",
        'hero-purpies': "url('/src/assets/backgrounds/hero-purpies.webp')",
        'bg-newsletter': "url('/src/assets/backgrounds/bg-newsletter.webp')",
        'bg-bluish': "url('/src/assets/backgrounds/bg-bluish.webp')",
        'bg-purblue': "url('/src/assets/backgrounds/bg-purblue.webp')",
      },
    },
    screens: newScreens,
  },
  plugins: [],
};
