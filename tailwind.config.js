module.exports = {
	purge: [],
	darkMode: false,
	content: ['./src/frontend/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			minWidth: {
				36: '9rem',
				80: '20rem',
				96: '24rem',
				fit: 'fit-content',
			},
			width: {
				128: '32rem',
			},
			gridTemplateColumns: {
				'custom-01': 'min-content minmax(0, 1fr)',
			},
			colors: {
				foreground: 'var(--foreground)',
				background: 'var(--background)',
				muted: 'var(--muted)',
				'muted-background': 'var(--muted-background)',
				accent: 'var(--accent)',
				danger: 'var(--danger)',
			},
			fill: {
				inherit: 'inherit',
				transparent: 'transparent',
			},
			backgroundImage: {
				fade: 'linear-gradient(180deg,transparent 90%,var(--background) 100%)',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
