import AddBoxIcon from "@mui/icons-material/AddBox";
import BrushIcon from "@mui/icons-material/Brush";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import LaunchIcon from "@mui/icons-material/Launch";
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
import { Settings } from "./Drawer/Settings";
import { UserCard } from "./Drawer/UserCard";
import { useUserStore } from "../hooks/apiStores/useUserStore";
import { useToolsStore } from "../hooks/featureStores/useToolsStore";
import { useDrawerStore } from "../hooks/useDrawerStore";
import { THEME } from "../theme/theme";


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
	disable: boolean;
}

interface DrawerModal {
	title: string,
	callback: () => void;
}

export function Drawer(): JSX.Element {
	const user = useUserStore(state => state.user);
	const [selectedTool, setSelectedTool] = useToolsStore(state => [state.selectedTool, state.setSelectedTool]);
	const [open, width, openCategory, setOpenCategory]
		= useDrawerStore(state => [state.isDrawerOpen, state.drawerWidth, state.openCategory, state.setOpenCategory]);

	const buttons: DrawerButton[] = [
		{ title: "Pan", callback: () => setSelectedTool("Pan"), icon: PanToolIcon, hotkey: "p" },
		{ title: "Hex Paint", callback: () => setSelectedTool("Hex Paint"), icon: BrushIcon, hotkey: "h" },
		{ title: "Area Paint", callback: () => setSelectedTool("Area Paint"), icon: FormatPaintIcon, hotkey: "a" }
	];

	const categories: DrawerCategory[] = [
		{
			title: "File",
			items: [
				{ title: "New", icon: AddBoxIcon, disabled: () => false },
				{ title: "Save", icon: CloudUploadIcon, disabled: () => user === undefined },
				{ title: "Load", icon: CloudDownloadIcon, disabled: () => user === undefined }
			],
			disable: false
		},
		{
			title: "Hex Paint",
			element: <PaintTool />,
			disable: selectedTool !== "Hex Paint"
		},
		{
			title: "Area Paint",
			element: <PaintTool />,
			disable: selectedTool !== "Area Paint"
		},
		{
			title: "Settings",
			element: <Settings />,
			disable: false
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
				height: "100vh",
				overflow: "auto",
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

			<Grid container columns={4} justifyContent="space-around">
				{buttons.map((button, index) => (
					<Grid key={index} xs={1} sx={{ width: "min-content" }}>
						<DrawerButton
							title={`${button.title} (${button.hotkey})`}
							callback={button.callback}
							Icon={button.icon}
							noText
							selected={selectedTool === button.title}
						/>
					</Grid>
				))}
			</Grid>

			<Grid container flexGrow={1} flexDirection="column" justifyContent="space-between">
				<Grid>
					<AccordionGroup size="md" variant="plain">
						{categories
							.map((category, categoryIndex) => (
								<Accordion
									key={categoryIndex}
									disabled={category.disable}
									expanded={openCategory === category.title}
									onChange={(_, expanded) => { setOpenCategory(expanded ? category.title : undefined); }}
									sx={{ background: openCategory === category.title ? THEME.colorSchemes.dark.palette.background.level1 : "none" }}
								>
									<AccordionSummary>
										<Typography level="h3">{category.title}</Typography>
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
