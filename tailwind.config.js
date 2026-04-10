module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
  		},
  		colors: {
  			gold: {
  				50: '#FFF9F0',
  				100: '#FFF4E6',
  				200: '#FFE5CC',
  				300: '#F0D9B5',
  				400: '#E8C98A',
  				500: '#D4A574',
  				600: '#C6934F',
  				700: '#B8854A',
  				800: '#9A6F3A',
  				900: '#7C592E',
  			},
  		},
  		animation: {
  			'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
  			'bounce-slow': 'bounce 3s infinite',
  			blob: 'blob 7s infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			shimmer: 'shimmer 3s ease-in-out infinite',
  			float: 'float 6s ease-in-out infinite',
  			'float-slow': 'float 10s ease-in-out infinite',
  			'float-delayed': 'float 8s ease-in-out 2s infinite',
  			'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
  			'gradient-shift': 'gradient-shift 8s ease infinite',
  			sparkle: 'sparkle 2s ease-in-out infinite',
  			blink: 'blink 1s step-end infinite',
  			'rotate-slow': 'rotate-slow 30s linear infinite',
  		},
  		keyframes: {
  			fadeInUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			blob: {
  				'0%': {
  					transform: 'translate(0px, 0px) scale(1)'
  				},
  				'33%': {
  					transform: 'translate(30px, -50px) scale(1.1)'
  				},
  				'66%': {
  					transform: 'translate(-20px, 20px) scale(0.9)'
  				},
  				'100%': {
  					transform: 'translate(0px, 0px) scale(1)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			shimmer: {
  				'0%': { backgroundPosition: '-200% 0' },
  				'100%': { backgroundPosition: '200% 0' },
  			},
  			float: {
  				'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
  				'33%': { transform: 'translateY(-20px) rotate(2deg)' },
  				'66%': { transform: 'translateY(10px) rotate(-1deg)' },
  			},
  			'pulse-glow': {
  				'0%, 100%': { boxShadow: '0 0 20px rgba(198, 147, 79, 0.2)' },
  				'50%': { boxShadow: '0 0 40px rgba(198, 147, 79, 0.4), 0 0 60px rgba(198, 147, 79, 0.1)' },
  			},
  			'gradient-shift': {
  				'0%': { backgroundPosition: '0% 50%' },
  				'50%': { backgroundPosition: '100% 50%' },
  				'100%': { backgroundPosition: '0% 50%' },
  			},
  			sparkle: {
  				'0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
  				'50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' },
  			},
  			blink: {
  				'0%, 50%': { opacity: '1' },
  				'51%, 100%': { opacity: '0' },
  			},
  			'rotate-slow': {
  				from: { transform: 'rotate(0deg)' },
  				to: { transform: 'rotate(360deg)' },
  			},
  		},
  		boxShadow: {
  			'3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
  			'glow': '0 0 30px rgba(198, 147, 79, 0.3)',
  			'glow-lg': '0 0 60px rgba(198, 147, 79, 0.4)',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
