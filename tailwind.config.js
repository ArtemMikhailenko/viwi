import plugin from "tailwindcss/plugin";
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    'border-input-outer-default',
    'border-input-inner-default',
    'border-input-outer-hover',
    'border-input-inner-hover',
    'border-input-outer-focus',
    'border-input-inner-focus',
    'bg-input-default',
    'bg-input-hover',
    'bg-input-focus',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#BFC4CD',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
        violet: {
          50: '#eeefff',
          100: '#e0e2ff',
          200: '#c7cafe',
          300: '#a6a7fb',
          400: '#8882f7',
          500: '#7664f0',
          600: '#6747e4',
          700: '#5939c9',
          800: '#4931a2',
          900: '#3e2f80',
          950: '#2d215a',
        },
        sky: {
          50: '#E3F3FF',
          100: '#D1ECFF',
          200: '#B6E1FF',
          300: '#A0D7FF',
          400: '#7BC8FF',
          500: '#67BFFF',
          600: '#56B1F3',
          700: '#3193DA',
          800: '#1C71AE',
          900: '#124D79',
          950: '#0B324F',
        },
        green: {
          50: '#D2FFE2',
          100: '#B1FDCD',
          200: '#8BF0B0',
          300: '#67E294',
          400: '#4BD37D',
          500: '#3EC972',
          600: '#34BD68',
          700: '#239F52',
          800: '#15773A',
          900: '#0F5429',
          950: '#0A3F1E',
        },
        red: {
          50: '#FFE8E8',
          100: '#FFD1D1',
          200: '#FFB2B2',
          300: '#FF9494',
          400: '#FF7474',
          500: '#FF5656',
          600: '#FA4949',
          700: '#E63939',
          800: '#C52727',
          900: '#941818',
          950: '#600F0F',
        },
        yellow: {
          50: '#FFF2C9',
          100: '#FFE7A0',
          200: '#FFE081',
          300: '#FFD968',
          400: '#F7CD4C',
          500: '#F0BB33',
          600: '#DFAD2B',
          700: '#BC9021',
          800: '#816316',
          900: '#4F3D0E',
          950: '#342809',
        },
        selago: {
          50: '#f7f8fb',
          100: '#efeff8',
          200: '#e6e6f4',
          300: '#cbcae8',
          400: '#afacd9',
          500: '#928ac8',
          600: '#7d6fb8',
          700: '#6c5ca5',
          800: '#5a4d8a',
          900: '#4b4072',
          950: '#2f294c',
        },
        whisper: {
          50: '#f7f8fb',
          100: '#f2f2f9',
          200: '#e2e2f2',
          300: '#cbcae8',
          400: '#aeacd9',
          500: '#918ac8',
          600: '#7c6fb8',
          700: '#6b5da4',
          800: '#594d8a',
          900: '#4b4171',
          950: '#2e294c',
        },
        helper: 'rgba(45, 33, 90, 0.6)',
        input: {
          outer: {
            default: 'transparent',
            hover: '#DDDDFD',
            focus: '#DDDDFD',
            hfocus: '#DDDDFD',
          },
          inner: {
            default: '#D6D6ED',
            hover: '#6B6BFF',
            focus: '#6B6BFF',
            hfocus: '#6B6BFF',
          },
        },
        switch: {
          outer: {
            off: {
              default: '#E6E6F4',
              hover: '#DADAEF',
            },
            on: {
              default: '#DADAEF',
              hover: '#E6E6F4',
            },
          },
          inner: {
            off: {
              default: '#777098',
              hover: '#726B96',
            },
            on: {
              default: '#2D215A',
              hover: '#2D215A',
            },
          },
        },
        button: {
          border: {
            default: '#E6E6F4',
            hover: '#DCDCEE',
            focus: '#7FC9FF',
          }
        }
      },
      backgroundColor: {
        landing: {
          active: 'rgba(218, 218, 239, 1)',
          field: '#E6E6F4',
          wrapper: '#F2F2F9',
          menu: '#EBEBFF',
          button: {
            default: '#E6E6F4',
            hover: '#DCDCEE',
            focus: '#E6E6F4',
          },
        },
        input: {
          default: 'transparent',
          hover: 'transparent',
          focus: '#F9F9FC',
        }
      },
      textColor: {
        primary: '#2D215A',
        landing: {
          primary: '#2D215A',
          light: '#6B6BFF',
          secondary: 'rgba(45, 33, 90, 0.6)',
        },
      },
      stroke: {
        primary: '#2D215A',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        unbounded: ['Unbounded', 'sans-serif', 'system-ui'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5715' }],
        base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '3xl': ['1.88rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      screens: {
        xs: '480px',
      },
      borderWidth: {
        3: '3px',
      },
      minWidth: {
        36: '9rem',
        44: '11rem',
        56: '14rem',
        60: '15rem',
        72: '18rem',
        80: '20rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        60: '60',
      },
      backgroundImage: {  // nested props doesn't work
        'reg-button-default': 'linear-gradient(180deg, #6B6BFF 0%, #8C8CFF 100%)',
        'reg-button-hover': 'linear-gradient(180deg, #9D9DFF 0%, #5353EB 100%)',
        'reg-button-focus': 'linear-gradient(180deg, #6B6BFF 0%, #8C8CFF 100%)',
        'reg-back': 'linear-gradient(180deg, #6B6BFF 0%, #8C8CFF 100%)',
        'story-border': 'linear-gradient(180deg, #6C6CFF 0%, #A7A7FF 100%)'
      },
      boxShadow: {
        'chip': '0px 1px 1px 0px #2B225B33',
      }
    },
  },
  plugins: [
    forms,
    ({ addUtilities }) => {
      const newUtilities = {
        '.border-gradient': {
          'border': '1px solid',
          'border-image-source': 'linear-gradient(180deg, #9D9DFF 0%, #5353EB 100%)',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}

