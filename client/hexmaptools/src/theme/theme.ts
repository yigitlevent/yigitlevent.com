import { extendTheme } from "@mui/joy";


declare module "@mui/joy/styles" {
	// No custom tokens found, you can skip the theme augmentation.
}

export const THEME = extendTheme({
	components: {
		JoySelect: {
			styleOverrides: {
				listbox: () => ({
					zIndex: 10001
				})
			}
		}
	}
});
