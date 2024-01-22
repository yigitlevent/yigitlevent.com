import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { useToolsStore } from "./usetToolsStore";
import { CommonAngles } from "../../utils/Common";
import { FillMaker } from "../../utils/FillMaker";


interface HexmapState {
	map: HmHexmap;
	hexes: Map<HmHexId, HmHex>;
	areas: Map<HmAreaId, HmArea>;

	hexTypes: HmHexType[];
	areaTypes: HmAreaType[];

	loadHexmap: (hexmapId?: HmHexmapId) => void;

	calculateHexes: (width: number, height: number, hexRadius: number) => HmHex[];
	calculateAreas: (hexes: [HmHexId, HmHex][]) => HmArea[];
	calculatePoints: (point: HmPoint, radius: number) => HmPoints;
	calculateVertices: (points: [HmPoint, HmPoint, HmPoint, HmPoint] | [HmPoint, HmPoint, HmPoint, HmPoint, HmPoint, HmPoint]) => number[];

	applyHexPaint: (calculatedHexes: HmHex[], paintData: HmHex[] | HmHexResponseHexes[]) => [HmHexId, HmHex][];
	applyAreaPaint: (calculatedAreas: HmArea[], paintData: HmArea[] | HmHexResponseAreas[]) => [HmAreaId, HmArea][];

	recalculateHexes: (changedValues: { width?: number; height?: number; hexRadius?: number; }) => void;
	recalculateAreas: () => void;

	setHexHover: (hexId: HmHexId, isHovered: boolean) => void;
	setAreaHover: (areaId: HmAreaId, isHovered: boolean) => void;

	changeMapName: (name: string) => void;
	changeMapWidth: (width: number) => void;
	changeMapHeight: (height: number) => void;
	changeMapHexRadius: (hexRadius: number) => void;
	changeStrokeWidth: (width: number) => void;
	changeStrokeAlignment: (alignment: HmSurfaceStyleStrokeAlignments) => void;

	onHexPointerEvent: (event: PointerEvent, hex: HmHex) => void;
	onAreaPointerEvent: (event: PointerEvent, area: HmArea) => void;
}

export const useHexmapStore = create<HexmapState>()(
	devtools(
		(set, get) => ({
			map: {
				id: self.crypto.randomUUID() as HmHexmapId,
				name: "",
				settings: {
					mapSize: { height: 1, width: 1 },
					hexRadius: 1,
					strokeStyle: {
						width: 1,
						color: "rgba(10, 10, 10, 1.0)",
						alignment: 0
					}
				}
			},
			hexes: new Map(),
			areas: new Map(),

			hexTypes: [
				{ id: 0 as HmHexTypeId, name: "Empty", fill: FillMaker("rgba(25, 25, 25, 1.0)") },
				{ id: 1 as HmHexTypeId, name: "Plains", fill: FillMaker("rgba(118, 156, 110, 1.0)") },
				{ id: 2 as HmHexTypeId, name: "Hills", fill: FillMaker("rgba(143, 114, 81, 1.0)") },
				{ id: 3 as HmHexTypeId, name: "Mountains", fill: FillMaker("rgba(105, 79, 48, 1.0)") },
				{ id: 4 as HmHexTypeId, name: "Coast", fill: FillMaker("rgba(128, 185, 182, 1.0)") },
				{ id: 5 as HmHexTypeId, name: "Sea", fill: FillMaker("rgba(92, 146, 177, 1.0)") }
			],

			areaTypes: [
				{ id: 0 as HmAreaTypeId, name: "Empty", fill: FillMaker("rgba(60, 60, 60, 0.1)") },
				{ id: 1 as HmAreaTypeId, name: "Light Forest", fill: FillMaker("rgba(135, 110, 156, 1.0)") },
				{ id: 2 as HmAreaTypeId, name: "Medium Forest", fill: FillMaker("rgba(105, 110, 120, 1.0)") },
				{ id: 3 as HmAreaTypeId, name: "Heavy Forest", fill: FillMaker("rgba(185, 20, 240, 1.0)") }
			],

			loadHexmap: (mapId?: HmHexmapId) => {
				const state = get();

				// TODO: some loading api call
				mapId;
				const hexmapResponse: HmHexmapResponse = {
					map: {
						id: self.crypto.randomUUID() as HmHexmapId,
						name: "Test Map",
						settings: {
							mapSize: { width: 15, height: 15 },
							hexRadius: 60,
							strokeStyle: {
								width: 1,
								color: "rgba(10, 10, 10, 1.0)",
								alignment: 0
							}
						}
					},
					hexes: [
						{ id: "0,0.5" as HmHexId, name: "Hex 1", typeId: 1 as HmHexTypeId, position: { x: 0, y: 0.5 } }
					],
					areas: [
						{ id: "0,0.5,0" as HmAreaId, typeId: 0 as HmAreaTypeId, parentHexId: "0,0.5" as HmHexId, placement: 0, name: "Hex 0 Area 0" },
						{ id: "0,0.5,1" as HmAreaId, typeId: 0 as HmAreaTypeId, parentHexId: "0,0.5" as HmHexId, placement: 1, name: "Hex 0 Area 1" },
						{ id: "0,0.5,2" as HmAreaId, typeId: 0 as HmAreaTypeId, parentHexId: "0,0.5" as HmHexId, placement: 2, name: "Hex 0 Area 2" },
						{ id: "0,0.5,3" as HmAreaId, typeId: 0 as HmAreaTypeId, parentHexId: "0,0.5" as HmHexId, placement: 3, name: "Hex 0 Area 3" },
						{ id: "0,0.5,4" as HmAreaId, typeId: 0 as HmAreaTypeId, parentHexId: "0,0.5" as HmHexId, placement: 4, name: "Hex 0 Area 4" },
						{ id: "0,0.5,5" as HmAreaId, typeId: 0 as HmAreaTypeId, parentHexId: "0,0.5" as HmHexId, placement: 5, name: "Hex 0 Area 5" },
						{ id: "0,0.5,6" as HmAreaId, typeId: 0 as HmAreaTypeId, parentHexId: "0,0.5" as HmHexId, placement: 6, name: "Hex 0 Area 6" }
					]
				};

				const map: HmHexmap = {
					id: hexmapResponse.map.id,
					name: hexmapResponse.map.name,
					settings: {
						mapSize: hexmapResponse.map.settings.mapSize,
						hexRadius: hexmapResponse.map.settings.hexRadius,
						strokeStyle: {
							width: hexmapResponse.map.settings.strokeStyle.width,
							color: hexmapResponse.map.settings.strokeStyle.color,
							alignment: hexmapResponse.map.settings.strokeStyle.alignment
						}
					}
				};

				const calculatedHexes = state.calculateHexes(map.settings.mapSize.width, map.settings.mapSize.height, hexmapResponse.map.settings.hexRadius);
				const paintedHexes = state.applyHexPaint(calculatedHexes, hexmapResponse.hexes);
				const hexes = new Map(paintedHexes);

				const calculatedAreas = state.calculateAreas(paintedHexes);
				const paintedAreas = state.applyAreaPaint(calculatedAreas, hexmapResponse.areas);
				const areas = new Map(paintedAreas);

				set(produce<HexmapState>((state) => {
					state.map = map;
					state.hexes = hexes;
					state.areas = areas;
				}));
			},

			calculateHexes: (width: number, height: number, hexRadius: number): HmHex[] => {
				const state = get();
				const verticalDistance = Math.abs(2 * hexRadius * Math.sin(CommonAngles[120].radian));
				const horizontalDistance = 1.5 * hexRadius;
				const hexCount = width * height;

				const getXY = (index: number) => {
					const rowOrder = Math.floor(index / height);
					const columnOrder = (index % height);
					const rowOffset = Math.floor(width / 2);
					const columnOffset = Math.floor(height / 2);

					const isEvenRow = rowOrder % 2 === 0;
					const isEvenWidth = Math.floor(width / 2) % 2 === 0;

					const x = rowOrder - rowOffset;
					const y = columnOrder + (isEvenRow ? 0 : 0.5) + (isEvenWidth ? 0.5 : 0) - columnOffset;

					return { x, y };
				};

				return Array
					.from(Array(hexCount))
					.map((_, index) => {
						const position = getXY(index);
						const id = `${position.x},${position.y}` as HmHexId;

						const actualPosition = { x: position.x * horizontalDistance, y: -1.0 * position.y * verticalDistance };

						const outerVert = state.calculatePoints(actualPosition, hexRadius);
						const innerVert = state.calculatePoints(actualPosition, hexRadius / 2.5);

						const hex: HmHex = {
							id,
							name: "",
							typeId: 0 as HmHexTypeId,
							position,
							actualPosition: actualPosition,
							points: {
								outer: outerVert,
								inner: innerVert
							},
							vertices: state.calculateVertices([outerVert.topLeft, outerVert.topRight, outerVert.right, outerVert.bottomRight, outerVert.bottomLeft, outerVert.left]),
							state: {
								isPainted: false,
								isHovered: false
							}
						};

						return hex;
					});
			},

			calculateAreas: (hexes: [HmHexId, HmHex][]): HmArea[] => {
				const state = get();
				const paintedHexes = hexes.filter(keyValue => keyValue[1].state.isPainted);
				const areaCount = paintedHexes.length * 7;

				return Array
					.from(Array(areaCount))
					.map((_, index) => {
						const parentIndex = Math.floor(index / 7);
						const parentHex = paintedHexes[parentIndex][1];
						const placement = index % 7 as HmAreaPlacement;

						const id = `${parentHex.id},${placement}` as HmAreaId;
						const parentHexId = parentHex.id;

						const outerVert = parentHex.points.outer;
						const innerVert = parentHex.points.inner;
						let vertices: number[] = [];
						switch (placement) {
							case 1:
								vertices = state.calculateVertices([outerVert.topLeft, outerVert.topRight, innerVert.topRight, innerVert.topLeft]);
								break;
							case 2:
								vertices = state.calculateVertices([outerVert.topRight, outerVert.right, innerVert.right, innerVert.topRight]);
								break;
							case 3:
								vertices = state.calculateVertices([outerVert.right, outerVert.bottomRight, innerVert.bottomRight, innerVert.right]);
								break;
							case 4:
								vertices = state.calculateVertices([outerVert.bottomRight, outerVert.bottomLeft, innerVert.bottomLeft, innerVert.bottomRight]);
								break;
							case 5:
								vertices = state.calculateVertices([outerVert.bottomLeft, outerVert.left, innerVert.left, innerVert.bottomLeft]);
								break;
							case 6:
								vertices = state.calculateVertices([outerVert.left, outerVert.topLeft, innerVert.topLeft, innerVert.left]);
								break;
							default:
								vertices = state.calculateVertices([innerVert.topLeft, innerVert.topRight, innerVert.right, innerVert.bottomRight, innerVert.bottomLeft, innerVert.left]);
								break;
						}

						return {
							id,
							hexId: parentHexId,
							name: "",
							typeId: 0 as HmAreaTypeId,
							vertices,
							placement,
							state: {
								isPainted: false,
								isHovered: false
							}
						};
					});
			},

			calculatePoints: (point: HmPoint, radius: number): HmPoints => {
				const getXComponent = (degree: number) => radius * Math.cos(CommonAngles[degree].radian);
				const getYComponent = (degree: number) => radius * Math.sin(CommonAngles[degree].radian);

				return {
					topLeft: { x: point.x + getXComponent(120), y: -(point.y + getYComponent(120)) },
					topRight: { x: point.x + getXComponent(60), y: -(point.y + getYComponent(60)) },
					right: { x: point.x + radius, y: -point.y },
					bottomRight: { x: point.x + getXComponent(300), y: -(point.y + getYComponent(300)) },
					bottomLeft: { x: point.x + getXComponent(240), y: -(point.y + getYComponent(240)) },
					left: { x: point.x - radius, y: -point.y }
				};
			},

			calculateVertices: (points: [HmPoint, HmPoint, HmPoint, HmPoint] | [HmPoint, HmPoint, HmPoint, HmPoint, HmPoint, HmPoint]): number[] => {
				const temp: number[] = [];
				for (let i = 0; i < points.length; i++) {
					temp.push(points[i].x);
					temp.push(points[i].y);
				}
				return temp;
			},

			applyHexPaint: (calculatedHexes: HmHex[], paintData: HmHex[] | HmHexResponseHexes[]): [HmHexId, HmHex][] => {
				return calculatedHexes.map(eHex => {
					const rHex
						= paintData
							.filter(v => (!("state" in v) && v.typeId !== 0) || ("state" in v && (v as HmHex).state?.isPainted))
							.find(paintHex => paintHex.id === eHex.id);

					const hex: HmHex = {
						...eHex,
						name: rHex ? rHex.name : "",
						typeId: rHex ? rHex.typeId : 0 as HmHexTypeId,
						state: {
							isPainted: rHex !== undefined,
							isHovered: false
						}
					};
					return [hex.id, hex];
				});
			},

			applyAreaPaint: (calculatedAreas: HmArea[], paintData: HmArea[] | HmHexResponseAreas[]): [HmAreaId, HmArea][] => {
				return calculatedAreas.map(eArea => {
					const rHex
						= paintData
							.filter(v => (!("state" in v) && v.typeId !== 0) || ("state" in v && (v as HmArea).state?.isPainted))
							.find(paintArea => paintArea.id === eArea.id);

					const area: HmArea = {
						...eArea,
						name: rHex ? rHex.name : "",
						typeId: rHex ? rHex.typeId : 0 as HmAreaTypeId,
						state: {
							isPainted: rHex !== undefined,
							isHovered: false
						}
					};
					return [area.id, area];
				});
			},

			recalculateHexes: (changedValues: { width?: number; height?: number; hexRadius?: number; }): void => {
				const state = get();

				const width = changedValues.width ? changedValues.width : state.map.settings.mapSize.width;
				const height = changedValues.height ? changedValues.height : state.map.settings.mapSize.height;
				const hexRadius = changedValues.hexRadius ? changedValues.hexRadius : state.map.settings.hexRadius;

				const calculatedHexes = state.calculateHexes(width, height, hexRadius);
				const paintedHexes = state.applyHexPaint(calculatedHexes, Array.from(state.hexes).map(kv => kv[1]));

				set(produce<HexmapState>((state) => {
					state.hexes = new Map(paintedHexes);
				}));
			},

			recalculateAreas: (): void => {
				const state = get();

				const paintedHexes = Array.from(new Map(state.hexes)).filter(v => v[1].state.isPainted);

				const calculatedAreas = state.calculateAreas(paintedHexes);
				const paintedAreas = state.applyAreaPaint(calculatedAreas, Array.from(state.areas).map(kv => kv[1]));

				set(produce<HexmapState>((state) => {
					state.areas = new Map(paintedAreas);
				}));
			},

			setHexHover: (hexId: HmHexId, isHovered: boolean): void => {
				const hex = get().hexes.get(hexId);
				if (hex) {
					set(produce<HexmapState>((state) => {
						state.hexes = state.hexes.set(hexId, { ...hex, state: { ...hex.state, isHovered } });
					}));
				}
			},

			setAreaHover: (areaId: HmAreaId, isHovered: boolean): void => {
				const area = get().areas.get(areaId);
				if (area) {
					set(produce<HexmapState>((state) => {
						state.areas = state.areas.set(areaId, { ...area, state: { ...area.state, isHovered } });
					}));
				}
			},

			changeMapName: (name: string): void => {
				set(produce<HexmapState>((state) => {
					state.map.name = name;
				}));
			},

			changeMapWidth: (width: number): void => {
				set(produce<HexmapState>((state) => {
					state.map.settings.mapSize.width = width;
				}));

				get().recalculateHexes({ width });
			},

			changeMapHeight: (height: number): void => {
				set(produce<HexmapState>((state) => {
					state.map.settings.mapSize.height = height;
				}));

				get().recalculateHexes({ height });
			},

			changeMapHexRadius: (hexRadius: number): void => {
				set(produce<HexmapState>((state) => {
					state.map.settings.hexRadius = hexRadius;
				}));

				get().recalculateHexes({ hexRadius });
			},

			changeStrokeWidth: (width: number): void => {
				set(produce<HexmapState>((state) => {
					state.map.settings.strokeStyle.width = width;
				}));
			},

			changeStrokeAlignment: (alignment: HmSurfaceStyleStrokeAlignments): void => {
				set(produce<HexmapState>((state) => {
					state.map.settings.strokeStyle.alignment = alignment;
				}));
			},

			onHexPointerEvent: (event: PointerEvent, hex: HmHex): void => {
				console.log("onHexPointerEvent");

				const toolsState = useToolsStore.getState();
				const selectedTool = toolsState.selectedTool;
				const selectedPaintTool = toolsState.selectedPaintTool;

				const isMouse = event.pointerType === "mouse";
				const isTouch = event.pointerType === "touch";

				//const isNoClick = event.buttons === 0;
				const isLeftClick = event.buttons === 1;
				//const isRightClick = event.buttons === 2;
				//const isWheelClick = event.buttons === 4;

				if (selectedTool === "Paint" && selectedPaintTool === "Hex") {
					if ((isMouse && isLeftClick) || isTouch) {
						const selectedHexType = toolsState.hexPaintTool.selectedType;

						set(produce<HexmapState>((state) => {
							state.hexes.set(hex.id, { ...hex, typeId: selectedHexType, state: { ...hex.state, isPainted: true } });
						}));
						get().recalculateAreas();
					}
				}
			},

			onAreaPointerEvent: (event: PointerEvent, area: HmArea): void => {
				console.log("onAreaPointerEvent");

				const toolsState = useToolsStore.getState();
				const selectedTool = toolsState.selectedTool;
				const selectedPaintTool = toolsState.selectedPaintTool;

				const isMouse = event.pointerType === "mouse";
				const isTouch = event.pointerType === "touch";

				//const isNoClick = event.buttons === 0;
				const isLeftClick = event.buttons === 1;
				//const isRightClick = event.buttons === 2;
				//const isWheelClick = event.buttons === 4;

				if (selectedTool === "Paint" && selectedPaintTool === "Area") {
					if ((isMouse && isLeftClick) || isTouch) {
						const selectedAreaType = toolsState.areaPaintTool.selectedType;
						set(produce<HexmapState>((state) => {
							state.areas.set(area.id, { ...area, typeId: selectedAreaType, state: { ...area.state, isPainted: true } });
						}));
					}
				}
			}
		}),
		{ name: "useHexmapStore" }
	)
);
