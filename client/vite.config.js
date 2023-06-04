import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import dotenv from 'dotenv';

dotenv.config(); // load environment variables from .env file

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		nodePolyfills({
			global: true,
		}),
	],
	define: {
		'process.env': {},
	},
});
