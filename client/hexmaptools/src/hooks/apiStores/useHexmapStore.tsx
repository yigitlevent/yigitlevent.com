import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { CommonAngles } from "../../utils/Common";
import { FillMaker } from "../../utils/FillMaker";


interface HexmapState {
	map: HmHexmap;
	hexes: Map<HmHexId, HmHex>;
	areas: Map<HmHexAreaId, HmHexArea>;

	hexTypes: HmHexType[];

	settings: {
		strokeStyle: HmHexStyleStroke;
		showInnerRegions: boolean;
	};

	tools: {
		selectedTool: HmDrawerTools;
		paintTool: {
			selectedType: HmHexTypeId;
		};
	};

	loadHexmap: (hexmapId?: HmHexmapId) => void;
	calculatePoints: (point: HmPoint, radius: number) => HmHexPoints;
	calculateVertices: (points: [HmPoint, HmPoint, HmPoint, HmPoint] | [HmPoint, HmPoint, HmPoint, HmPoint, HmPoint, HmPoint]) => number[];

	setHexHover: (hexId: HmHexId, isHovered: boolean) => void;
	setAreaHover: (areaId: HmHexAreaId, isHovered: boolean) => void;

	setSelectedTool: (tool: HmDrawerTools) => void;
	setSelectedHexType: (typeId: HmHexTypeId) => void;

	onHexClick: (event: HmHex) => void;
	onHexRightClick: (event: HmHex) => void;
}

export const useHexmapStore = create<HexmapState>()(
	devtools(
		(set, get) => ({
			map: {
				id: -1 as HmHexmapId,
				name: "",
				constants: {
					mapSize: { height: 15, width: 15 },
					hexRadius: 60
				}
			},
			hexes: new Map(),
			areas: new Map(),

			hexTypes: [
				{ id: 0 as HmHexTypeId, name: "Empty", fill: FillMaker("rgba(25, 25, 25, 1.0)") },
				{ id: 1 as HmHexTypeId, name: "Plains", fill: FillMaker("rgba(118, 156, 110, 1.0)") },
				{ id: 2 as HmHexTypeId, name: "Forests", fill: FillMaker("rgba(55, 92, 47, 1.0)") },
				{ id: 3 as HmHexTypeId, name: "Hills", fill: FillMaker("rgba(143, 114, 81, 1.0)") },
				{ id: 4 as HmHexTypeId, name: "Mountains", fill: FillMaker("rgba(105, 79, 48, 1.0)") },
				{ id: 5 as HmHexTypeId, name: "Coast", fill: FillMaker("rgba(128, 185, 182, 1.0)") },
				{ id: 6 as HmHexTypeId, name: "Sea", fill: FillMaker("rgba(92, 146, 177, 1.0)") },
				{ id: 7 as HmHexTypeId, name: "Ocean", fill: FillMaker("rgba(51, 78, 128, 1.0)") }
			],

			settings: {
				showInnerRegions: false,
				strokeStyle: {
					width: 1,
					color: "rgba(10, 10, 10, 1.0)",
					alignment: 0
				}
			},

			tools: {
				selectedTool: "Pan",
				paintTool: {
					selectedType: 0 as HmHexTypeId
				}
			},

			loadHexmap: (mapId?: HmHexmapId) => {
				const state = get();
				mapId;

				// TODO: some loading api call

				const hexResponses: HmHexmapResponse = {
					map: {
						id: 0 as HmHexmapId,
						name: "Test Map",
						constants: {
							mapSize: { height: 15, width: 15 },
							hexRadius: 60
						}
					},
					hexes: [
						{ id: "0,0.5" as HmHexId, name: "Hex 1", typeId: 1 as HmHexTypeId, position: { x: 0, y: 0.5 } }
					],
					areas: [
						{ id: "0,0.5,0" as HmHexAreaId, parentHexId: "0,0.5" as HmHexId, placement: 0, name: "Hex 0 Area 0" },
						{ id: "0,0.5,1" as HmHexAreaId, parentHexId: "0,0.5" as HmHexId, placement: 1, name: "Hex 0 Area 1" },
						{ id: "0,0.5,2" as HmHexAreaId, parentHexId: "0,0.5" as HmHexId, placement: 2, name: "Hex 0 Area 2" },
						{ id: "0,0.5,3" as HmHexAreaId, parentHexId: "0,0.5" as HmHexId, placement: 3, name: "Hex 0 Area 3" },
						{ id: "0,0.5,4" as HmHexAreaId, parentHexId: "0,0.5" as HmHexId, placement: 4, name: "Hex 0 Area 4" },
						{ id: "0,0.5,5" as HmHexAreaId, parentHexId: "0,0.5" as HmHexId, placement: 5, name: "Hex 0 Area 5" },
						{ id: "0,0.5,6" as HmHexAreaId, parentHexId: "0,0.5" as HmHexId, placement: 6, name: "Hex 0 Area 6" }
					]
				};

				const hexRadius = hexResponses.map.constants.hexRadius;
				const verticalDistance = Math.abs(2 * hexRadius * Math.sin(CommonAngles[120].radian));
				const horizontalDistance = 1.5 * hexRadius;

				const map = {
					id: hexResponses.map.id,
					name: hexResponses.map.name,
					constants: {
						mapSize: hexResponses.map.constants.mapSize,
						hexRadius: hexResponses.map.constants.hexRadius
					}
				};

				const hexCount = map.constants.mapSize.width * map.constants.mapSize.height;

				const hexes = new Map(
					Array
						.from(Array(hexCount))
						.map((_, index) => {
							const rowOrder = Math.floor(index / map.constants.mapSize.height);
							const columnOrder = (index % map.constants.mapSize.height);
							const rowOffset = Math.floor(map.constants.mapSize.width / 2);
							const columnOffset = Math.floor(map.constants.mapSize.height / 2);
							const x = rowOrder - rowOffset;
							const y = columnOrder + (rowOrder % 2 === 0 ? 0 : 0.5) - columnOffset;
							const position = { x, y };
							const id = `${x},${y}` as HmHexId;

							const actualPosition = { x: position.x * horizontalDistance, y: -1.0 * position.y * verticalDistance };

							const outerVert = state.calculatePoints(actualPosition, hexRadius);
							const innerVert = state.calculatePoints(actualPosition, hexRadius / 2.5);

							const rHex = hexResponses.hexes.find(value => value.id === id);

							const hex: HmHex = {
								id,
								name: rHex ? rHex.name : "",
								typeId: rHex ? rHex.typeId : 0 as HmHexTypeId,
								position,
								actualPosition: actualPosition,
								points: {
									outer: outerVert,
									inner: innerVert
								},
								vertices: state.calculateVertices([outerVert.topLeft, outerVert.topRight, outerVert.right, outerVert.bottomRight, outerVert.bottomLeft, outerVert.left]),
								state: {
									isPainted: rHex !== undefined,
									isHovered: false
								}
							};

							return [id, hex];
						})
				);

				const paintedAreas = Array.from(hexes).filter(keyValue => keyValue[1].state.isPainted);
				const areaCount = paintedAreas.length * 7;

				const areas = new Map(
					Array
						.from(Array(areaCount))
						.map((_, index): [HmHexAreaId, HmHexArea] => {
							const parentIndex = Math.floor(index / 7);
							const parentHex = paintedAreas[parentIndex][1];
							const placement = index % 7 as HmHexAreaPlacement;

							const id = `${parentHex.id},${placement}` as HmHexAreaId;
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

							const rArea = hexResponses.areas.find(value => value.id === id);

							return [id, {
								id,
								hexId: parentHexId,
								name: rArea ? rArea.name : "",
								vertices,
								placement,
								state: {
									isPainted: rArea !== undefined,
									isHovered: false
								}
							}];
						})
				);

				set(produce<HexmapState>((state) => {
					state.map = map;
					state.hexes = hexes;
					state.areas = areas;
				}));
			},

			calculatePoints: (point: HmPoint, radius: number): HmHexPoints => {
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

			setHexHover: (hexId: HmHexId, isHovered: boolean): void => {
				const hex = get().hexes.get(hexId);
				if (hex) {
					set(produce<HexmapState>((state) => {
						state.hexes = state.hexes.set(hexId, { ...hex, state: { ...hex.state, isHovered } });
					}));
				}
			},

			setAreaHover: (areaId: HmHexAreaId, isHovered: boolean): void => {
				const area = get().areas.get(areaId);
				if (area) {
					set(produce<HexmapState>((state) => {
						state.areas = state.areas.set(areaId, { ...area, state: { ...area.state, isHovered } });
					}));
				}
			},

			setSelectedTool: (tool: "Pointer" | "Pan" | "Paint" | "Eyedropper"): void => {
				set(produce<HexmapState>((state) => {
					state.tools.selectedTool = tool;
				}));
			},

			setSelectedHexType: (typeId: HmHexTypeId): void => {
				set(produce<HexmapState>((state) => {
					state.tools.paintTool.selectedType = typeId;
				}));
			},

			onHexClick: (event: HmHex): void => {
				const selectedTool = get().tools.selectedTool;

				if (selectedTool === "Paint") {
					const typeId = get().tools.paintTool.selectedType;
					set(produce<HexmapState>((state) => { state.hexes.set(event.id, { ...event, typeId }); }));
				}

				console.log({ event });
			},

			onHexRightClick: (event: HmHex): void => {
				console.log({ event });
			}
		}),
		{ name: "useHexmapStore" }
	)
);
