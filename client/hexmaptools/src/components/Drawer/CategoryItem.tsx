import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import SvgIcon from "@mui/material/SvgIcon";
import { Fragment } from "react";


export function CategoryItem({ title, isFirst, Icon, disabled }: { title: string; isFirst: boolean; Icon: typeof SvgIcon; disabled: () => boolean; }): JSX.Element {
	return (
		<Fragment>
			{!isFirst && <ListDivider />}

			<ListItem>
				<ListItemButton disabled={disabled()}>
					<ListItemDecorator><Icon /></ListItemDecorator>
					<ListItemContent>{title}</ListItemContent>
				</ListItemButton>
			</ListItem>
		</Fragment>
	);
}
