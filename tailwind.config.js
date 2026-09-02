/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        headernav: "#192841",
        "headernav-dark": "#10192b",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        panel: "hsl(var(--panel) / <alpha-value>)",
        "panel-foreground": "hsl(var(--panel-foreground) / <alpha-value>)",
        card: "hsl(var(--card) / <alpha-value>)",
        "card-foreground": "hsl(var(--card-foreground) / <alpha-value>)",
        popover: "hsl(var(--popover) / <alpha-value>)",
        "popover-foreground": "hsl(var(--popover-foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        primary: "hsl(var(--primary) / <alpha-value>)",
        "primary-foreground": "hsl(var(--primary-foreground) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
        "secondary-foreground": "hsl(var(--secondary-foreground) / <alpha-value>)",
        destructive: "hsl(var(--destructive) / <alpha-value>)",
        "destructive-foreground": "hsl(var(--destructive-foreground) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        "muted-foreground": "hsl(var(--muted-foreground) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        "accent-foreground": "hsl(var(--accent-foreground) / <alpha-value>)",
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "SF Mono", "Menlo", "Consolas", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "sky-blue": "0 4px 24px 0 rgba(56, 189, 248, 0.25)",
        panel: "0 24px 60px -30px rgba(2, 12, 27, 0.55)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-40" },
        },
        "draw-line": {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" },
        },
        "pulse-node": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.12)" },
        },
        "caret-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "none" },
        },
        "phone-scene-a": {
          "0%, 27%": { opacity: "1", transform: "none" },
          "33%, 97%": { opacity: "0", transform: "translateY(-6px)" },
          "100%": { opacity: "1", transform: "none" },
        },
        "phone-scene-b": {
          "0%, 30%, 66%, 100%": { opacity: "0", transform: "translateY(6px)" },
          "36%, 60%": { opacity: "1", transform: "none" },
        },
        "phone-scene-c": {
          "0%, 63%, 100%": { opacity: "0", transform: "translateY(6px)" },
          "69%, 93%": { opacity: "1", transform: "none" },
        },
        "card-scene-a": {
          "0%, 45%": { opacity: "1", transform: "none" },
          "50%, 100%": { opacity: "0", transform: "translateY(-6px)" },
        },
        "card-scene-b": {
          "0%, 45%, 100%": { opacity: "0", transform: "translateY(6px)" },
          "50%, 95%": { opacity: "1", transform: "none" },
        },
        "tablet-check": {
          "0%": { opacity: "0", transform: "translateX(-8px)" },
          "6%, 85%": { opacity: "1", transform: "none" },
          "95%, 100%": { opacity: "0", transform: "translateX(-8px)" },
        },
        "bar-grow": {
          "0%, 100%": { transform: "scaleX(0)" },
          "20%, 90%": { transform: "scaleX(1)" },
        },
        "count-hold": {
          "0%, 8%": { opacity: "0", transform: "translateY(4px)" },
          "16%, 92%": { opacity: "1", transform: "none" },
          "100%": { opacity: "0", transform: "translateY(4px)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "dash-flow": "dash-flow 1.2s linear infinite",
        "pulse-node": "pulse-node 2.6s ease-in-out infinite",
        "caret-blink": "caret-blink 1s step-end infinite",
        "fade-up": "fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "phone-scene-a": "phone-scene-a 9s ease-in-out infinite",
        "phone-scene-b": "phone-scene-b 9s ease-in-out infinite",
        "phone-scene-c": "phone-scene-c 9s ease-in-out infinite",
        "card-scene-a": "card-scene-a 7s ease-in-out infinite",
        "card-scene-b": "card-scene-b 7s ease-in-out infinite",
        "tablet-check": "tablet-check 6s ease-in-out infinite",
        "bar-grow": "bar-grow 8s ease-in-out infinite",
        "count-hold": "count-hold 8s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
