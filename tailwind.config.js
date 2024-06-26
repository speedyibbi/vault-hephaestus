module.exports = {
	purge: [],
	darkMode: false,
	content: ['./src/frontend/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				foreground: 'var(--foreground)',
				background: 'var(--background)',
				muted: 'var(--muted)',
				accent: 'var(--accent)',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
