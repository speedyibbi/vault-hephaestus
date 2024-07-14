module.exports = {
	purge: [],
	darkMode: false,
	content: ['./src/frontend/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			minWidth: {
				80: '20rem',
				96: '24rem',
				fit: 'fit-content',
			},
			width: {
				128: '32rem',
			},
			colors: {
				foreground: 'var(--foreground)',
				background: 'var(--background)',
				muted: 'var(--muted)',
				accent: 'var(--accent)',
				danger: 'var(--danger)',
			},
			fill: {
				inherit: 'inherit',
				transparent: 'transparent',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
