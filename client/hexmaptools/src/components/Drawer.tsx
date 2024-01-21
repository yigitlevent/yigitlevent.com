import AddBoxIcon from "@mui/icons-material/AddBox";
import BrushIcon from "@mui/icons-material/Brush";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ColorizeIcon from "@mui/icons-material/Colorize";
import LaunchIcon from "@mui/icons-material/Launch";
import NearMeIcon from "@mui/icons-material/NearMe";
import PanToolIcon from "@mui/icons-material/PanTool";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionGroup from "@mui/joy/AccordionGroup";
import AccordionSummary from "@mui/joy/AccordionSummary";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Grid from "@mui/joy/Grid";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/material/SvgIcon";


import { CategoryItem } from "./Drawer/CategoryItem";
import { DrawerButton } from "./Drawer/DrawerButton";
import { ModalButton } from "./Drawer/ModalButton";
import { PaintTool } from "./Drawer/PaintTool";
import { UserCard } from "./Drawer/UserCard";
import { useHexmapStore } from "../hooks/apiStores/useHexmapStore";
import { useUserStore } from "../hooks/apiStores/useUserStore";
import { useDrawerStore } from "../hooks/useDrawerStore";


interface DrawerButton {
	title: HmDrawerTools,
	callback: () => void;
	icon: typeof SvgIcon;
	hotkey: string;
}

interface DrawerCategoryItem {
	title: string,
	icon: typeof SvgIcon;
	disabled: () => boolean;
}

interface DrawerCategory {
	title: HmDrawerCategories,
	items?: DrawerCategoryItem[];
	element?: JSX.Element;
}

interface DrawerModal {
	title: string,
	callback: () => void;
}

export function Drawer(): JSX.Element {
	const [open, width, openCategory, setOpenCategory]
		= useDrawerStore(state => [state.isDrawerOpen, state.drawerWidth, state.openCategory, state.setOpenCategory]);
	const [tools, setSelectedTool] = useHexmapStore(state => [state.tools, state.setSelectedTool]);
	const user = useUserStore(state => state.user);

	const buttons: DrawerButton[] = [
		{ title: "Pointer", callback: () => setSelectedTool("Pointer"), icon: NearMeIcon, hotkey: "v" },
		{ title: "Pan", callback: () => setSelectedTool("Pan"), icon: PanToolIcon, hotkey: "p" },
		{ title: "Paint", callback: () => setSelectedTool("Paint"), icon: BrushIcon, hotkey: "b" },
		{ title: "Eyedropper", callback: () => setSelectedTool("Eyedropper"), icon: ColorizeIcon, hotkey: "i" }
	];

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
			element: <PaintTool />
		},
		{
			title: "Settings", // map size, disable areas, map name, share button
			items: [
				{ title: "New", icon: AddBoxIcon, disabled: () => false },
				{ title: "Save", icon: CloudUploadIcon, disabled: () => user === undefined },
				{ title: "Load", icon: CloudDownloadIcon, disabled: () => user === undefined }
			]
		}
	];

	const modals: DrawerModal[] = [
		{ title: "Export map", callback: () => { /** */ } },
		{ title: "Import map", callback: () => { /** */ } }
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

			<Grid container columns={4} justifyContent="space-between">
				{buttons.map((button, index) => (
					<Grid key={index} xs={1} sx={{ width: "min-content" }}>
						<DrawerButton
							title={`${button.title} (${button.hotkey})`}
							callback={button.callback}
							Icon={button.icon}
							noText
							selected={tools.selectedTool === button.title}
						/>
					</Grid>
				))}
			</Grid>

			<Grid container flexGrow={1} flexDirection="column" justifyContent="space-between">
				<Grid>
					<AccordionGroup size="md" variant="plain">
						{categories.map((category, categoryIndex) => (
							<Accordion key={categoryIndex} expanded={openCategory === category.title} onChange={(_, expanded) => { setOpenCategory(expanded ? category.title : undefined); }}>
								<AccordionSummary>
									<Typography level="title-lg">{category.title}</Typography>
								</AccordionSummary>

								<AccordionDetails>
									<List size="sm">
										{category.items
											&& category.items.map((item, itemIndex) => (
												<CategoryItem
													key={itemIndex}
													title={item.title}
													isFirst={itemIndex === 0}
													Icon={item.icon}
													disabled={item.disabled}
												/>
											))}

										{category.element}
									</List>
								</AccordionDetails>
							</Accordion>
						))}
					</AccordionGroup>
				</Grid>

				<Grid>
					<List size="sm" sx={{ flexGrow: 0 }}>
						{modals.map((item, index) => <ModalButton key={index} title={item.title} onClick={item.callback} />)}

						<ListItem>
							<ListItemButton component="a" target="_blank" href="https://github.com/yigitlevent/yigitlevent.com">
								GitHub
								<ListItemDecorator>
									<LaunchIcon fontSize="inherit" />
								</ListItemDecorator>
							</ListItemButton>
						</ListItem>
					</List>
				</Grid>
			</Grid>

			<Divider />
			<UserCard />
		</Sheet>
	);
}
