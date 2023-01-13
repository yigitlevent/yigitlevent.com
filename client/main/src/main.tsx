import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { THEME } from "./theme/theme";

import { AuthProvider } from "./utils/auth";

import { App } from "./App";


ReactDOM
	.createRoot(document.getElementById("root") as HTMLElement)
	.render(
		<StrictMode>
			<ThemeProvider theme={THEME}>
				<CssBaseline />
				<BrowserRouter>
					<AuthProvider>
						<App />
					</AuthProvider>
				</BrowserRouter>
			</ThemeProvider >
		</StrictMode>
	);
