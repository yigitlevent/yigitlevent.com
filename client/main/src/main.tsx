import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { StrictMode } from "react";

import { App } from "./App";
import { THEME } from "./theme/theme";
import { createRoot } from "react-dom/client";


const Root = document.getElementById("root");

if (!Root) throw new Error("Root element not found");

createRoot(Root)
	.render(
		<StrictMode>
			<ThemeProvider theme={THEME}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</StrictMode>
	);
