import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import { forwardRef, useMemo } from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps, useLocation } from "react-router-dom";


export function RouteButton({ title, route, Icon }: { title: string; route: string; Icon: typeof SvgIcon; }): JSX.Element {
	const location = useLocation();

	const renderLink = useMemo(() => forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>(function link(itemProps, ref) {
		return <RouterLink to={route} ref={ref} {...itemProps} role={undefined} />;
	}), [route]);

	return (
		<ListItem>
			<ListItemButton component={renderLink}>
				<Icon color={location.pathname === route ? "primary" : undefined} />

				<ListItemContent>
					<Typography level="title-sm">{title}</Typography>
				</ListItemContent>
			</ListItemButton>
		</ListItem>
	);
}
