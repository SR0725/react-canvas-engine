import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'react-canvas-engine',
			fileName: 'react-canvas-engine',
		},
		rollupOptions: {
			external: ['react'],
			output: {
				globals: {
					vue: 'react',
				},
			},
		},
	},
	plugins: [tsconfigPaths(), react()],
});
