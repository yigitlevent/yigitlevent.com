import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SvgIcon from "@mui/material/SvgIcon";
import { forwardRef, useMemo } from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps, useLocation } from "react-router-dom";

import { THEME } from "../../../theme/theme";


export function RouteButton({ title, route, Icon }: { title: string; route: string; Icon: typeof SvgIcon; }): JSX.Element {
	const location = useLocation();

	const renderLink = useMemo(() => forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>(function link(itemProps, ref) {
		return <RouterLink to={route} ref={ref} {...itemProps} role={undefined} />;
	}), [route]);

	return (
		<ListItem disablePadding>
			<ListItemButton component={renderLink}>
				<ListItemIcon sx={{ margin: 0 }}>
					<Icon color={location.pathname === route ? "primary" : undefined} />
				</ListItemIcon>

				<ListItemText primary={title} sx={{ margin: "0 0 2px -10px", color: location.pathname === route ? THEME.palette.primary.main : undefined }} />
			</ListItemButton>
		</ListItem>
	);
}
