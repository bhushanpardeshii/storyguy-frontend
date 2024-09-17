
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const { Dancing_Script } = require("next/font/google");
/** @type {import('tailwindcss').Config} */

module.exports = {

	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)'
			},
			fontFamily: {
				Dancing_Script: ["Dancing Script", "cursive"],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'torch-man': "url('../lib/torch-man.jpg')",
				'city': "url('../lib/city.jpg')",
				'notebook': "url('../lib/notebook.jpg')",
				'characters': "url('../lib/characters.jpg')",
				'page': "url('../lib/page.jpg')"

			},
			animation: {
				shimmer: "shimmer 2s linear infinite",
			},
			keyframes: {
				shimmer: {
					from: {
						backgroundPosition: "0 0",
					},
					to: {
						backgroundPosition: "-200% 0",
					},
				},
			},
		}
	},
	plugins: [
		require("tailwindcss-animate", 'tailwind-scrollbar'),
		addVariablesForColors,
	],
};
// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}