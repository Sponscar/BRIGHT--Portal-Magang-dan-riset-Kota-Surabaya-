/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./homepage.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#2563eb", // Blue-600
                "secondary": "#3b82f6", // Blue-500
                "background-light": "#eff6ff", // Blue-50
                "background-dark": "#101922",
            },
            fontFamily: {
                "display": ["Lexend", "sans-serif"],
                "body": ["Noto Sans", "sans-serif"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "full": "9999px"
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
