import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) return "modules";
				}
			}
		}
	},
	resolve: {
		alias: {
			"@utility": path.resolve(__dirname, '../../utility/src')
		}
	}
});
