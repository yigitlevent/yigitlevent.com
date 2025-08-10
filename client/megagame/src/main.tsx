import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";


createRoot(document.getElementById("root") as HTMLElement)
	.render(
		<StrictMode>
			<MantineProvider defaultColorScheme="dark">
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</MantineProvider>
		</StrictMode>
	);
