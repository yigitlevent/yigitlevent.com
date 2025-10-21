import { createTheme, MantineProvider, Textarea } from "@mantine/core";
import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";


const Theme = createTheme({
	components: {
		Textarea: Textarea.extend({
			styles: {
				input: { paddingTop: 6, paddingBottom: 6 }
			}
		})
	}
});

createRoot(document.getElementById("root") as HTMLElement)
	.render(
		<StrictMode>
			<MantineProvider defaultColorScheme="dark" theme={Theme}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</MantineProvider>
		</StrictMode>
	);
