import { createTheme, MantineProvider, Textarea } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";


const Root = document.getElementById("root");

if (!Root) throw new Error("Root element not found");

const Theme = createTheme({
	components: {
		Textarea: Textarea.extend({
			styles: {
				input: { paddingTop: 6, paddingBottom: 6 }
			}
		})
	}
});

createRoot(Root)
	.render(
		<StrictMode>
			<MantineProvider defaultColorScheme="dark" theme={Theme}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</MantineProvider>
		</StrictMode>
	);
