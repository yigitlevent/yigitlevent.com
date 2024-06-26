import { blue, green, grey, lightBlue, orange, purple, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

import text from "/src/assets/fonts/AlegreyaSans-Regular.woff";
import code from "/src/assets/fonts/PTMono-Regular.woff";


const White = "#ffffff";
const Black = "#000000";
const PrimaryTextColor = White;

export const THEME = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: `
				@font-face {
					font-family: 'text';
					src: url(${text}) format('woff');
				}
				@font-face {
					font-family: 'title';
					src: url(${text}) format('woff');
				}
				@font-face {
					font-family: 'code';
					src: url(${code}) format('woff');
				}
			`
		}
	},
	palette: {
		mode: "dark",
		common: {
			black: Black,
			white: White
		},
		primary: {
			main: blue[200],
			light: blue[50],
			dark: blue[400],
			contrastText: PrimaryTextColor
		},
		secondary: {
			main: purple[200],
			light: purple[50],
			dark: purple[400]
		},
		error: {
			main: red[500],
			light: red[300],
			dark: red[700]
		},
		info: {
			main: lightBlue[400],
			light: lightBlue[300],
			dark: lightBlue[700]
		},
		warning: {
			main: orange[400],
			light: orange[300],
			dark: orange[700]
		},
		success: {
			main: green[400],
			light: green[300],
			dark: green[700]
		},
		grey: grey,
		text: {
			primary: White,
			secondary: "rgba(255, 255, 255, 0.7)",
			disabled: "rgba(255, 255, 255, 0.5)"
		},
		divider: "rgba(255, 255, 255, 0.12)",
		background: {
			paper: grey[900],
			default: "#121212"
		},
		action: {
			active: White,
			hover: "rgba(255, 255, 255, 0.08)",
			hoverOpacity: 0.08,
			selected: "rgba(255, 255, 255, 0.16)",
			selectedOpacity: 0.16,
			disabled: "rgba(255, 255, 255, 0.3)",
			disabledBackground: "rgba(255, 255, 255, 0.12)",
			disabledOpacity: 0.38,
			focus: "rgba(255, 255, 255, 0.12)",
			focusOpacity: 0.12,
			activatedOpacity: 0.24
		}
	},
	shape: {
		borderRadius: 4
	},
	typography: {
		htmlFontSize: 16,
		fontFamily: "text",
		fontSize: 15,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
		subtitle1: {
			fontFamily: "code"
		},
		body1: {
			fontSizeAdjust: "200%"
		},
		body2: {
			marginTop: "8px"
		}
	}
});
