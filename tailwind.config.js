/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: [
    'font-sans',
    'aspect-[3/2]',
    'object-cover',
    'hover:text-[#315AB0]',
    'duration-150',
    'ease-in'
  ],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
            "primary"   : "#292929",
            "secondary" : "#f3f4f6",
            "accent"    : "#315bb0",
            "neutral"   : "#363636",
            "base-100"  : "#ffffff",
            "info"      : "#ff00ff",
            "success"   : "#1D92D9",
            "warning"   : "#00ff00",
            "error"     : "#ff0000",
          },
        },
    ]
  },
};