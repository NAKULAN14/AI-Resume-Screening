/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#07080D',
          900: '#0B0E16',
          850: '#10131D',
          800: '#151926',
          700: '#1D2233',
          600: '#2A3145',
        },
        line: {
          soft: 'rgba(255,255,255,0.06)',
          med: 'rgba(255,255,255,0.10)',
        },
        ink: {
          DEFAULT: '#E8EAF2',
          dim: '#9CA3B8',
          faint: '#616A85',
        },
        signal: {
          indigo: '#6C6CF4',
          cyan: '#33D4E0',
          violet: '#B26CF4',
          mint: '#3CE0A6',
          amber: '#F2B84B',
          rose: '#F2607A',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'signal-gradient': 'linear-gradient(115deg, #6C6CF4 0%, #33D4E0 100%)',
        'signal-gradient-soft': 'linear-gradient(115deg, rgba(108,108,244,0.16) 0%, rgba(51,212,224,0.16) 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glass: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 8px 32px -8px rgba(0,0,0,0.5)',
        glow: '0 0 0 1px rgba(108,108,244,0.4), 0 0 24px -4px rgba(108,108,244,0.5)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        floatSlow: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite linear',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        scan: 'scan 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
