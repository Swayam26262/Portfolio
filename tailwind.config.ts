import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			body: ['var(--font-body)', 'system-ui', 'sans-serif'],
  			display: ['var(--font-display)', 'var(--font-body)', 'sans-serif'],
  			mono: ['var(--font-mono)', 'monospace']
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			canvas: 'rgb(var(--canvas) / <alpha-value>)',
  			surface: 'rgb(var(--surface) / <alpha-value>)',
  			sunken: 'rgb(var(--sunken) / <alpha-value>)',
  			nav: 'rgb(var(--nav) / <alpha-value>)',
  			ink: {
  				DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
  				soft: 'rgb(var(--ink-soft) / <alpha-value>)',
  				mute: 'rgb(var(--ink-mute) / <alpha-value>)'
  			},
  			signal: {
  				DEFAULT: 'rgb(var(--signal) / <alpha-value>)',
  				deep: 'rgb(var(--signal-deep) / <alpha-value>)'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
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
  			'fade-up': {
  				from: { opacity: '0', transform: 'translateY(24px)' },
  				to: { opacity: '1', transform: 'translateY(0)' }
  			},
  			'slide-up': {
  				from: { opacity: '0', transform: 'translateY(60px)' },
  				to: { opacity: '1', transform: 'translateY(0)' }
  			},
  			float: {
  				'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
  				'50%': { transform: 'translateY(-22px) rotate(180deg)' }
  			},
  			'spin-slow': {
  				from: { transform: 'rotate(0deg)' },
  				to: { transform: 'rotate(360deg)' }
  			},
  			'bounce-slow': {
  				'0%, 100%': { transform: 'translateY(0)' },
  				'50%': { transform: 'translateY(-10px)' }
  			},
  			'pulse-glow': {
  				'0%, 100%': { boxShadow: '0 0 0 4px rgba(99,102,241,0.25)' },
  				'50%': { boxShadow: '0 0 0 9px rgba(99,102,241,0.04)' }
  			},
  			blink: {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0' }
  			},
  			marquee: {
  				from: { transform: 'translateX(0)' },
  				to: { transform: 'translateX(-50%)' }
  			},
  			'marquee-reverse': {
  				from: { transform: 'translateX(-50%)' },
  				to: { transform: 'translateX(0)' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-up': 'fade-up 0.8s ease-out forwards',
  			'slide-up': 'slide-up 0.9s ease-out forwards',
  			float: 'float linear infinite',
  			'spin-slow': 'spin-slow linear infinite',
  			'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
  			'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
  			blink: 'blink 1s step-end infinite',
  			marquee: 'marquee 38s linear infinite',
  			'marquee-reverse': 'marquee-reverse 38s linear infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
