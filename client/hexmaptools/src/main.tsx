import CssBaseline from "@mui/joy/CssBaseline";
import GlobalStyles from "@mui/joy/GlobalStyles";
import { CssVarsProvider, StyledEngineProvider } from "@mui/joy/styles";
import { enableMapSet } from "immer";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { THEME } from "./theme/theme";


enableMapSet();

ReactDOM
	.createRoot(document.getElementById("root") as HTMLElement)
	.render(
		<StrictMode>
			<StyledEngineProvider injectFirst>
				<CssVarsProvider defaultMode="dark" theme={THEME}>
					<CssBaseline />

					<GlobalStyles
						styles={{
							html: { margin: 0, padding: 0, height: "100vh", width: "100vw" },
							body: { margin: 0, padding: 0, height: "100vh", width: "100vw" }
						}}
					/>

					<BrowserRouter>
						<App />
					</BrowserRouter>
				</CssVarsProvider>
			</StyledEngineProvider>
		</StrictMode>
	);
