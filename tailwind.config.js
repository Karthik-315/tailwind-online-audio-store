module.exports = {
    content: ["./public/*.html", "./public/scripts/*.js"],
    theme: {
        extend: {
            fontFamily: {
                "font-nunito": ["Nunito", "sans-serif"],
            },

            borderWidth: {
                3: "3px",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/line-clamp"),
        require("@tailwindcss/forms"),
        require("@shrutibalasa/tailwind-grid-auto-fit"),
    ],
};
