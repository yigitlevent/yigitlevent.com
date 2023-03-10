import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "./theme/theme";

import { App } from "./App";


ReactDOM
	.createRoot(document.getElementById("root") as HTMLElement)
	.render(
		<StrictMode>
			<ThemeProvider theme={THEME}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</StrictMode>
	);
