import AddBoxIcon from "@mui/icons-material/AddBox";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionGroup from "@mui/joy/AccordionGroup";
import AccordionSummary from "@mui/joy/AccordionSummary";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Grid from "@mui/joy/Grid";
import List from "@mui/joy/List";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import { useState } from "react";

import { CategoryItem } from "./Drawer/CategoryItem";
import { ModalButton } from "./Drawer/ModalButton";
import { UserCard } from "./Drawer/UserCard";
import { useUserStore } from "../hooks/apiStores/useUserStore";
import { useDrawerStore } from "../hooks/useDrawerStore";


interface DrawerCategoryItem {
	title: string,
	icon: typeof SvgIcon;
	disabled: () => boolean;
}

interface DrawerCategory {
	title: string,
	items: DrawerCategoryItem[];
}


export function Drawer(): JSX.Element {
	const [openCategory, setOpenCategory] = useState<number | null>(0);
	const [open, width] = useDrawerStore(state => [state.isDrawerOpen, state.drawerWidth]);
	const user = useUserStore(state => state.user);

	const categories: DrawerCategory[] = [
		{
			title: "File",
			items: [
				{ title: "New", icon: AddBoxIcon, disabled: () => false },
				{ title: "Save", icon: CloudUploadIcon, disabled: () => user === undefined },
				{ title: "Load", icon: CloudDownloadIcon, disabled: () => user === undefined }
			]
		},
		{
			title: "Paint",
			items: [
				{ title: "New", icon: AddBoxIcon, disabled: () => false },
				{ title: "Save", icon: CloudUploadIcon, disabled: () => user === undefined },
				{ title: "Load", icon: CloudDownloadIcon, disabled: () => user === undefined }
			]
		},
		{
			title: "Map Settings", // map size, disable areas, map name, share button
			items: [
				{ title: "New", icon: AddBoxIcon, disabled: () => false },
				{ title: "Save", icon: CloudUploadIcon, disabled: () => user === undefined },
				{ title: "Load", icon: CloudDownloadIcon, disabled: () => user === undefined }
			]
		}
	];

	const modals: [string, () => void][] = [
		["Export map", () => { /** */ }],
		["Import map", () => { /** */ }]
	];

	return (
		<Sheet
			sx={{
				position: { xs: "fixed", md: "sticky" },
				transform: {
					xs: open ? "none" : "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
					md: "none"
				},
				transition: "transform 0.4s, width 0.4s",
				zIndex: 10000,
				width: `${width}px`,
				bottom: 0,
				padding: 2,
				display: "flex",
				flexDirection: "column",
				gap: 2
			}}
		>
			<Box>
				<Typography level="h3">Hexmap Tools</Typography>
			</Box>

			<Grid container flexGrow={1} flexDirection="column" justifyContent="space-between">
				<Grid>
					<AccordionGroup size="md" variant="plain">
						{categories.map((category, categoryIndex) => (
							<Accordion key={categoryIndex} expanded={openCategory === categoryIndex} onChange={(_, expanded) => { setOpenCategory(expanded ? categoryIndex : null); }}>
								<AccordionSummary>
									<Typography level="title-lg">{category.title}</Typography>
								</AccordionSummary>

								<AccordionDetails>
									<List size="sm">
										{category.items.map((item, itemIndex) => (
											<CategoryItem
												key={itemIndex}
												title={item.title}
												isFirst={itemIndex === 0}
												Icon={item.icon}
												disabled={item.disabled}
											/>
										))}
									</List>
								</AccordionDetails>
							</Accordion>
						))}
					</AccordionGroup>
				</Grid>

				<Grid>
					<List size="sm" sx={{ flexGrow: 0 }}>
						{modals.map((item, index) => <ModalButton key={index} title={item[0]} onClick={item[1]} />)}
					</List>
				</Grid>
			</Grid>

			<Divider />
			<UserCard />
		</Sheet>
	);
}
