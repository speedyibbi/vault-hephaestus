import type { Configuration } from 'webpack';
import path from 'path';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push(
	{
		test: /\.css$/,
		use: [
			{ loader: 'style-loader' },
			{ loader: 'css-loader' },
			{
				loader: 'postcss-loader',
				options: {
					postcssOptions: {
						plugins: [require('tailwindcss'), require('autoprefixer')],
					},
				},
			},
		],
	},
	{
		test: /\.(svg|png|jpg|gif)$/,
		use: [{ loader: 'file-loader' }],
	}
);

export const rendererConfig: Configuration = {
	module: {
		rules,
	},
	plugins,
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
	},
};
