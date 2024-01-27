import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { CommonAngles } from "../../utils/Common";
import { FillMaker } from "../../utils/FillMaker";
import { useToolsStore } from "../featureStores/useToolsStore";


interface HexmapState {
	map: HmHexmap;
	hexes: Map<HmHexId, HmHex>;
	areas: Map<HmAreaId, HmArea>;

	biomes: HmBiome[];
	terrains: HmTerrain[];

	showNames: "Hex" | "Area" | "Both" | "None";

	loadSurfaceTypes: () => void;
	loadHexmap: (hexmapId?: HmHexmapId) => void;

	calculateHexes: (width: number, height: number, hexRadius: number) => HmHex[];
	calculateAreas: (hexes: [HmHexId, HmHex][]) => HmArea[];
	calculatePoints: (point: HmPoint, radius: number) => HmHexPoints;
	calculateVertices: (points: [HmPoint, HmPoint, HmPoint, HmPoint] | [HmPoint, HmPoint, HmPoint, HmPoint, HmPoint, HmPoint]) => number[];

	applyHexPaint: (calculatedHexes: HmHex[], paintData: HmHex[] | HmHexResponseHexes[]) => [HmHexId, HmHex][];
	applyAreaPaint: (calculatedAreas: HmArea[], paintData: HmArea[] | HmHexResponseAreas[]) => [HmAreaId, HmArea][];

	recalculateHexes: (changedValues: { width?: number; height?: number; hexRadius?: number; }) => void;
	recalculateAreas: () => void;
	getCenter: (vertices: number[]) => HmPoint;

	setHexHover: (hexId: HmHexId, isHovered: boolean) => void;
	setAreaHover: (areaId: HmAreaId, isHovered: boolean) => void;

	changeMapName: (name: string) => void;
	changeMapWidth: (width: number) => void;
	changeMapHeight: (height: number) => void;
	changeMapHexRadius: (hexRadius: number) => void;
	changeStrokeWidth: (type: "Hex" | "Area", width: number) => void;
	changeStrokeAlignment: (type: "Hex" | "Area", alignment: HmSurfaceStyleStrokeAlignments) => void;

	onHexPointerEvent: (event: PointerEvent, hex: HmHex) => void;
	onAreaPointerEvent: (event: PointerEvent, area: HmArea) => void;

	switchShowNames: () => void;
}

export const useHexmapStore = create<HexmapState>()(
	devtools(
		(set, get) => ({
			map: {
				id: self.crypto.randomUUID() as HmHexmapId,
				name: "",
				settings: {
					mapSize: { width: 15, height: 15 },
					hexRadius: 120,
					hexStrokeStyle: {
						width: 1.5,
						color: "rgba(10, 10, 10, 0.3)",
						alignment: 0.5
					},
					areaStrokeStyle: {
						width: 0.5,
						color: "rgba(10, 10, 10, 0.2)",
						alignment: 0.5
					},
					fill: {
						color: "rgba(255, 255, 25, 0.0000001)",
						hover: "rgba(255, 255, 255, 0.1)"
					}
				}
			},
			hexes: new Map(),
			areas: new Map(),

			biomes: [],
			terrains: [],

			showNames: "None",

			loadSurfaceTypes: () => {
				// TODO: some loading api call
				const surfaceTypesResponse: HmSurfacesResponse = {
					biomes: [
						{
							id: 0 as HmBiomeId,
							name: "None",
							fill: "rgba(40, 40, 40, 1.0)"
						},
						{
							id: 1 as HmBiomeId,
							name: "Grasslands",
							fill: "rgba(141, 179, 137, 1.0)"
						},
						{
							id: 2 as HmBiomeId,
							name: "Desert",
							fill: "rgba(246, 243, 207, 1.0)"
						},
						{
							id: 3 as HmBiomeId,
							name: "Snow",
							fill: "rgba(241, 243, 248, 1.0)"
						},
						{
							id: 4 as HmBiomeId,
							name: "Water",
							fill: "rgba(187, 213, 231, 1.0)"
						}
					],
					terrains: [
						{
							id: 0 as HmTerrainId,
							name: "None",
							type: "Any",
							textures: ["nothing"]
						},
						{
							id: 1 as HmTerrainId,
							name: "Plains",
							type: "Hex",
							textures: ["plains_hex"]
						},
						{
							id: 2 as HmTerrainId,
							name: "Hills",
							type: "Hex",
							textures: ["hills_hex"]
						},
						{
							id: 3 as HmTerrainId,
							name: "Mountains",
							type: "Hex",
							textures: ["mountains_hex"]
						},
						{
							id: 4 as HmTerrainId,
							name: "Forest",
							type: "Area",
							textures: [
								"forest_0_center",
								"forest_1_center",
								"forest_2_center",
								"forest_3_center",
								"forest_4_center",
								"forest_5_center",
								"forest_6_center",
								"forest_7_center",
								"forest_8_center",
								"forest_9_center",
								"forest_10_center",
								"forest_11_center",
								"forest_12_center",
								"forest_13_center",
								"forest_14_center",
								"forest_15_center",
								"forest_16_center",
								"forest_17_center",
								"forest_18_center",
								"forest_19_center",
								"forest_20_center",
								"forest_21_center",
								"forest_22_center",
								"forest_23_center",
								"forest_24_center",
								"forest_25_center",
								"forest_26_center",
								"forest_27_center",
								"forest_28_center",
								"forest_29_center",
								"forest_30_center",
								"forest_31_center",
								"forest_32_center",
								"forest_0_side",
								"forest_1_side",
								"forest_2_side",
								"forest_3_side",
								"forest_4_side",
								"forest_5_side",
								"forest_6_side",
								"forest_7_side",
								"forest_8_side",
								"forest_9_side",
								"forest_10_side",
								"forest_11_side",
								"forest_12_side"
							]
						}
					]
				};

				const biomes: HmBiome[] = surfaceTypesResponse.biomes.map(biome => {
					return { id: biome.id, name: biome.name, fill: FillMaker(biome.fill) };
				});

				const terrains: HmTerrain[] = surfaceTypesResponse.terrains.map(terrain => {
					return { id: terrain.id, name: terrain.name, type: terrain.type, textures: terrain.textures };
				});

				set(produce<HexmapState>((state) => {
					state.biomes = biomes;
					state.terrains = terrains;
				}));
			},

			loadHexmap: (mapId?: HmHexmapId) => {
				const state = get();
				state.loadSurfaceTypes();

				// TODO: some loading api call
				mapId;
				const hexmapResponse: HmHexmapResponse = {
					map: {
						id: self.crypto.randomUUID() as HmHexmapId,
						name: "Test Map",
						settings: {
							mapSize: { width: 15, height: 15 },
							hexRadius: 120,
							hexStrokeStyle: {
								width: 1.5,
								color: "rgba(10, 10, 10, 0.3)",
								alignment: 0.5
							},
							areaStrokeStyle: {
								width: 0.5,
								color: "rgba(10, 10, 10, 0.2)",
								alignment: 0.5
							},
							fill: {
								color: "rgba(255, 255, 25, 0.0000001)",
								hover: "rgba(255, 255, 255, 0.1)"
							}
						}
					},
					hexes: [
						{ id: "0,0.5" as HmHexId, name: "Hex 1", position: { x: 0, y: 0.5 }, type: { biomeId: 2 as HmBiomeId, terrainId: 0 as HmTerrainId } },
						{ id: "0,1.5" as HmHexId, name: "Hex 2", position: { x: 0, y: 1.5 }, type: { biomeId: 1 as HmBiomeId, terrainId: 0 as HmTerrainId } },
						{ id: "0,-0.5" as HmHexId, name: "Hex 3", position: { x: 0, y: -0.5 }, type: { biomeId: 1 as HmBiomeId, terrainId: 0 as HmTerrainId } },
						{ id: "1,0" as HmHexId, name: "Hex 4", position: { x: 1, y: 0 }, type: { biomeId: 1 as HmBiomeId, terrainId: 0 as HmTerrainId } },
						{ id: "1,1" as HmHexId, name: "Hex 5", position: { x: 1, y: 1 }, type: { biomeId: 1 as HmBiomeId, terrainId: 0 as HmTerrainId } },
						{ id: "-1,0" as HmHexId, name: "Hex 6", position: { x: -1, y: 0 }, type: { biomeId: 1 as HmBiomeId, terrainId: 0 as HmTerrainId } },
						{ id: "-1,1" as HmHexId, name: "Hex 7", position: { x: -1, y: 1 }, type: { biomeId: 1 as HmBiomeId, terrainId: 0 as HmTerrainId } }
					],
					areas: [
						{ id: "0,0.5,0" as HmAreaId, name: "H0A0", hexId: "0,0.5" as HmHexId, placement: 0, type: { terrainId: 0 as HmTerrainId, texture: "nothing" } },
						{ id: "0,0.5,1" as HmAreaId, name: "H0A1", hexId: "0,0.5" as HmHexId, placement: 1, type: { terrainId: 0 as HmTerrainId, texture: "nothing" } },
						{ id: "0,0.5,2" as HmAreaId, name: "H0A2", hexId: "0,0.5" as HmHexId, placement: 2, type: { terrainId: 0 as HmTerrainId, texture: "nothing" } },
						{ id: "0,0.5,3" as HmAreaId, name: "H0A3", hexId: "0,0.5" as HmHexId, placement: 3, type: { terrainId: 0 as HmTerrainId, texture: "nothing" } },
						{ id: "0,0.5,4" as HmAreaId, name: "H0A4", hexId: "0,0.5" as HmHexId, placement: 4, type: { terrainId: 0 as HmTerrainId, texture: "nothing" } },
						{ id: "0,0.5,5" as HmAreaId, name: "H0A5", hexId: "0,0.5" as HmHexId, placement: 5, type: { terrainId: 0 as HmTerrainId, texture: "nothing" } },
						{ id: "0,0.5,6" as HmAreaId, name: "H0A6", hexId: "0,0.5" as HmHexId, placement: 6, type: { terrainId: 0 as HmTerrainId, texture: "nothing" } }
					]
				};

				const map: HmHexmap = {
					id: hexmapResponse.map.id,
					name: hexmapResponse.map.name,
					settings: {
						mapSize: hexmapResponse.map.settings.mapSize,
						hexRadius: hexmapResponse.map.settings.hexRadius,
						hexStrokeStyle: {
							width: hexmapResponse.map.settings.hexStrokeStyle.width,
							color: hexmapResponse.map.settings.hexStrokeStyle.color,
							alignment: hexmapResponse.map.settings.hexStrokeStyle.alignment
						},
						areaStrokeStyle: {
							width: hexmapResponse.map.settings.areaStrokeStyle.width,
							color: hexmapResponse.map.settings.areaStrokeStyle.color,
							alignment: hexmapResponse.map.settings.areaStrokeStyle.alignment
						},
						fill: {
							color: hexmapResponse.map.settings.fill.color,
							hover: hexmapResponse.map.settings.fill.hover
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

						const vertices = state.calculateVertices([outerVert.topLeft, outerVert.topRight, outerVert.right, outerVert.bottomRight, outerVert.bottomLeft, outerVert.left]);

						const hex: HmHex = {
							id,
							name: "",
							type: {
								biomeId: 0 as HmBiomeId,
								terrainId: 0 as HmTerrainId
							},
							coordinates: {
								position,
								actualPosition: actualPosition,
								points: {
									outer: outerVert,
									inner: innerVert
								},
								center: state.getCenter(vertices),
								vertices
							},
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

						const outerVert = parentHex.coordinates.points.outer;
						const innerVert = parentHex.coordinates.points.inner;

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
							name: "",
							hexId: parentHexId,
							placement,
							type: {
								terrainId: 0 as HmTerrainId,
								texture: "nothing"
							},
							coordinates: {
								center: state.getCenter(vertices),
								vertices
							},
							state: {
								isPainted: false,
								isHovered: false
							}
						};
					});
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

			applyHexPaint: (calculatedHexes: HmHex[], paintData: HmHex[] | HmHexResponseHexes[]): [HmHexId, HmHex][] => {
				return calculatedHexes.map(eHex => {
					const rHex = paintData.find(paintHex => paintHex.id === eHex.id);

					const hex: HmHex = {
						...eHex,
						name: rHex ? rHex.name : "",
						type: {
							biomeId: rHex ? rHex.type.biomeId : 0 as HmBiomeId,
							terrainId: rHex ? rHex.type.terrainId : 0 as HmTerrainId
						},
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
					const rArea = paintData.find(paintArea => paintArea.id === eArea.id);

					const area: HmArea = {
						...eArea,
						name: rArea ? rArea.name : "",
						type: {
							terrainId: rArea ? rArea.type.terrainId : 0 as HmTerrainId,
							texture: rArea ? rArea.type.texture : "nothing"
						},
						state: {
							isPainted: rArea !== undefined,
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

			getCenter: (vertices: number[]): HmPoint => {
				const pointCount = vertices.length / 2;
				const sumX = vertices.filter((_, i) => i % 2 === 0).reduce((p, c) => p + c);
				const sumY = vertices.filter((_, i) => i % 2 === 1).reduce((p, c) => p + c);
				return { x: sumX / pointCount, y: sumY / pointCount };
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

			changeStrokeWidth: (type: "Hex" | "Area", width: number): void => {
				if (type === "Hex") {
					set(produce<HexmapState>((state) => {
						state.map.settings.hexStrokeStyle.width = width;
					}));
				}
				else {
					set(produce<HexmapState>((state) => {
						state.map.settings.areaStrokeStyle.width = width;
					}));
				}
			},

			changeStrokeAlignment: (type: "Hex" | "Area", alignment: HmSurfaceStyleStrokeAlignments): void => {
				if (type === "Hex") {
					set(produce<HexmapState>((state) => {
						state.map.settings.hexStrokeStyle.alignment = alignment;
					}));
				}
				else {
					set(produce<HexmapState>((state) => {
						state.map.settings.areaStrokeStyle.alignment = alignment;
					}));
				}
			},

			onHexPointerEvent: (event: PointerEvent, hex: HmHex): void => {
				console.log("onHexPointerEvent");

				const toolsState = useToolsStore.getState();
				const selectedTool = toolsState.selectedTool;

				const isMouse = event.pointerType === "mouse";
				const isTouch = event.pointerType === "touch";

				//const isNoClick = event.buttons === 0;
				const isLeftClick = event.buttons === 1;
				//const isRightClick = event.buttons === 2;
				//const isWheelClick = event.buttons === 4;

				if (selectedTool === "Hex Paint") {
					if ((isMouse && isLeftClick) || isTouch) {
						set(produce<HexmapState>((state) => {
							const biomeId = toolsState.selectedBiome;
							const terrainId = toolsState.selectedTerrain;
							state.hexes.set(
								hex.id,
								{ ...hex, type: { biomeId: biomeId, terrainId: terrainId }, state: { ...hex.state, isPainted: biomeId !== 0 } }
							);
						}));
						get().recalculateAreas();
					}
				}
			},

			onAreaPointerEvent: (event: PointerEvent, area: HmArea): void => {
				console.log("onAreaPointerEvent");

				const state = get();
				const toolsState = useToolsStore.getState();
				const selectedTool = toolsState.selectedTool;

				const isMouse = event.pointerType === "mouse";
				const isTouch = event.pointerType === "touch";

				//const isNoClick = event.buttons === 0;
				const isLeftClick = event.buttons === 1;
				const isRightClick = event.buttons === 2;
				//const isWheelClick = event.buttons === 4;

				const getNextTexture = (terrainId: HmTerrainId, placement: HmAreaPlacement, currentTextureName: HmTextureName, backwards: boolean): HmTextureName => {
					if (terrainId === 0) return "nothing";

					const ending = placement === 0 ? "center" : "side";
					const possibilities = state.terrains[terrainId].textures.filter(v => v.endsWith(ending));

					console.log(state.terrains[terrainId].textures);
					console.log(possibilities);

					if (currentTextureName === "nothing") {
						if (!backwards) return possibilities[0];
						else return possibilities[possibilities.length - 1];
					}

					const currentIndex = possibilities.findIndex(v => v === currentTextureName);
					if (!backwards) {
						if (currentIndex === possibilities.length - 1) return possibilities[0];
						else return possibilities[currentIndex + 1];
					}
					else {
						if (currentIndex === 0) return possibilities[possibilities.length - 1];
						else return possibilities[currentIndex - 1];
					}
				};

				if (selectedTool === "Area Paint") {
					if ((isMouse && (isLeftClick || isRightClick)) || isTouch) {
						const terrainId = toolsState.selectedTerrain;
						set(produce<HexmapState>((state) => {
							state.areas.set(
								area.id,
								{
									...area,
									type: { terrainId, texture: getNextTexture(terrainId, area.placement, area.type.texture, isRightClick) },
									state: { ...area.state, isPainted: terrainId !== 0 }
								}
							);
						}));
					}
				}
			},

			switchShowNames: (): void => {
				const state = get();

				switch (state.showNames) {
					case "None":
						set(produce<HexmapState>((state) => { state.showNames = "Hex"; }));
						break;
					case "Hex":
						set(produce<HexmapState>((state) => { state.showNames = "Area"; }));
						break;
					case "Area":
						set(produce<HexmapState>((state) => { state.showNames = "Both"; }));
						break;
					case "Both":
						set(produce<HexmapState>((state) => { state.showNames = "None"; }));
						break;
				}
			}
		}),
		{ name: "useHexmapStore" }
	)
);
