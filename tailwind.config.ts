import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "custom-blue": {
                    "100": "rgb(188,222,243)",
                    "300": "#546e7a",
                    "400": "#196999",
                    "450": "#0a4169",
                    "500": "#0d2f4b"
                },
                "custom-red": {
                    "100": "#ff2d2d",
                    "200": "#e53935",
                }

            }
        },
    },
    plugins: [],
};
export default config;
