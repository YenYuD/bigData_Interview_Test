/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            tablet: "900px",
        },
        extend: {
            fontFamily: {
                ubuntu: '"Ubuntu", sans-serif',
            },
            boxShadow: {
                gray: "0px 7px 10px rgba(0, 0, 0, 0.2)",
            },
        },
    },
    plugins: [],
};
