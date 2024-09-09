import defaultTheme from "tailwindcss/defaultTheme";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["poppins", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};
