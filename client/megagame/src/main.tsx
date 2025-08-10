import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { THEME } from "./theme/theme";


ReactDOM
	.createRoot(document.getElementById("root") as HTMLElement)
	.render(
		<StrictMode>
			<ThemeProvider theme={THEME}>
				<CssBaseline />

				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</StrictMode>
	);
