import type { Config } from 'tailwindcss';

// https://uicolors.app/create

const config = {
  darkMode: ['class'], // or 'media' or 'class'. This is used to enable dark mode in the app by adding the class 'dark' to the body tag
  content: [
    // Where to look for the CSS classes to figure out what to purge and what to keep in the final
    // CSS file that is generated
    // this is used to scan the files and extract the classes used in these files
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // colors(theme) {
      //   return {
      //     border: theme.colors.gray[200],
      //     input: theme.colors.gray[100],
      //     ring: theme.colors.blue[500],
      //     background: theme.colors.white,
      //     foreground: theme.colors.black,
      //     primary: theme.colors.blue,
      //     secondary: theme.colors.green,
      //     destructive: theme.colors.red,
      //     muted: theme.colors.gray[300],
      //     accent: theme.colors.yellow,
      //     popover: theme.colors.white,
      //     card: theme.colors.gray[50],
      //     primary : {
      //      ...theme.colors.purple,
      //       DEFAULT: theme.colors.purple[500],
      //     }
      //   };
      // },
      colors: {
        // used as -> text-{color} or bg-{color} or border-{color} or placeholder-{color} or caret-{color} or accent-{color} or decoration-{color}
        // e.g. text-primary, text-secondary, text-destructive, text-muted-foreground, bg-primary.foreground, border-primary-foreground
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        customGreen: '#32a852', // Adding a custom color then you can use it as text-customGreen or bg-customGreen in the classes
      },
      borderRadius: {
        // used as -> rounded-{size} e.g. rounded-lg, rounded-md, rounded-sm
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // spacing: {
      //   '72': '18rem', // Adding a custom spacing value. You can use it as m-72, p-72 in the classes
      // },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

      // screens: {
      //   'sm': '640px',
      //   'md': '768px',
      //   'lg': '1024px',
      //   'xl': '1280px',
      //   '2xl': '1536px',
      // }
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;

/*
Out of the box, Tailwind comes with the following breakpoints.
Size	Minimum Width
sm	  640px
md	  768px
lg	  1024px
xl	  1280px
2xl	  1536px

You can customize these breakpoints by adding a theme section to your tailwind.config.js file:

module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  }
}
*/
