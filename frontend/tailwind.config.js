module.exports = {
	content: [
	  "./app/**/*.{js,ts,jsx,tsx}",
	  "./pages/**/*.{js,ts,jsx,tsx}",
	  "./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  indigo: {
			DEFAULT: '#6366F1',
			dark: '#4F46E5',
			light: '#818CF8',
		  },
		},
	  },
	},
	plugins: [],
  };