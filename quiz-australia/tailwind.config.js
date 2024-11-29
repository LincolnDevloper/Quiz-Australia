/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#0E1C36",
				secondary: "#34A853",
				accent: "#FFD700",
				feedback: "#FFA000",
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			backgroundImage: {
				"testebg": "url('./assets/images/sydney bridge.jpg')",
			},
		},
	},
	plugins: [],
};
