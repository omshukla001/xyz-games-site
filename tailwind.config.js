/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gl: {
          bg:      '#080C14',
          bg2:     '#0E1420',
          card:    '#131B2A',
          border:  '#1E2A3E',
          blue:    '#0066FF',
          blueHi:  '#3388FF',
          cyan:    '#00D4FF',
          orange:  '#FF6B00',
          orangeHi:'#FF8C33',
          green:   '#00E676',
          text:    '#FFFFFF',
          muted:   '#8899BB',
          dim:     '#445566',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'blue':   '0 0 24px rgba(0,102,255,.6), 0 0 60px rgba(0,102,255,.2)',
        'orange': '0 0 24px rgba(255,107,0,.6),  0 0 60px rgba(255,107,0,.2)',
        'card':   '0 8px 40px rgba(0,0,0,.7)',
        'hero':   '0 20px 80px rgba(0,0,0,.9)',
      },
      animation: {
        'float':   'floatUp 6s ease-in-out infinite',
        'float2':  'floatUp2 8s ease-in-out infinite',
        'scan':    'scanLine 6s linear infinite',
        'shimmer': 'shimmerX 3s linear infinite',
        'ticker':  'ticker 20s linear infinite',
      },
      keyframes: {
        floatUp:  { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-12px)' } },
        floatUp2: { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-18px)' } },
        scanLine: { '0%':{ transform:'translateY(-100%)' }, '100%':{ transform:'translateY(110vh)' } },
        shimmerX: { '0%':{ backgroundPosition:'-400% 0' }, '100%':{ backgroundPosition:'400% 0' } },
        ticker:   { '0%':{ transform:'translateX(0)' }, '100%':{ transform:'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
}
