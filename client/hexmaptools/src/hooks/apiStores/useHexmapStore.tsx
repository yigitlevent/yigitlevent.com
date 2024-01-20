import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { CommonAngles } from "../../utils/Common";


interface HexmapState {
	currentMapId: HmHexmapId | undefined;
	map: Map<HmHexmapId, HmHexmap>;
	hexes: Map<HmHexId, HmHex>;
	areas: Map<HmHexAreaId, HmHexArea>;

	showInnerRegions: boolean;

	styles: {
		hex: HmHexStyle;
		area: HmHexStyle;
		emptyHex: HmHexStyle;
	};

	loadHexmap: (hexmapId?: HmHexmapId) => void;
	calculatePoints: (point: HmPoint, radius: number) => HmHexPoints;
	calculateVertices: (points: [HmPoint, HmPoint, HmPoint, HmPoint] | [HmPoint, HmPoint, HmPoint, HmPoint, HmPoint, HmPoint]) => number[];

	setHexHover: (hexId: HmHexId, isHovered: boolean) => void;
	setAreaHover: (areaId: HmHexAreaId, isHovered: boolean) => void;
}

export const useHexmapStore = create<HexmapState>()(
	devtools(
		(set, get) => ({
			currentMapId: undefined,
			map: new Map(),
			hexes: new Map(),
			areas: new Map(),

			showInnerRegions: true,

			styles: {
				hex: {
					stroke: { width: 1, color: "rgba(200, 0, 0, 1.0)", alignment: 0 },
					fill: { color: "rgba(70, 0, 0, 1.0)", hoverColor: "rgba(120, 0, 0, 1.0)" }
				},
				area: {
					fill: { color: "rgba(0, 0, 0, 0.00001)", hoverColor: "rgba(255, 255, 255, 0.2)" }
				},
				emptyHex: {
					stroke: { width: 1, color: "rgba(20, 20, 20, 1.0)", alignment: 0 },
					fill: { color: "rgba(25, 25, 25, 1.0)", hoverColor: "rgba(60, 60, 60, 1.0)" }
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
						{ id: "0,0.5" as HmHexId, name: "Hex 1", position: { x: 0, y: 0.5 } }
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

				const map = new Map([[
					hexResponses.map.id,
					{
						id: hexResponses.map.id,
						name: hexResponses.map.name,
						constants: {
							mapSize: hexResponses.map.constants.mapSize,
							hexRadius: hexResponses.map.constants.hexRadius
						}
					}
				]]);

				const thisMap = map.get(hexResponses.map.id) as HmHexmap;
				const hexCount = thisMap.constants.mapSize.width * thisMap.constants.mapSize.height;

				const hexes = new Map(
					Array
						.from(Array(hexCount))
						.map((_, index) => {
							const rowOrder = Math.floor(index / thisMap.constants.mapSize.height);
							const columnOrder = (index % thisMap.constants.mapSize.height);
							const rowOffset = Math.floor(thisMap.constants.mapSize.width / 2);
							const columnOffset = Math.floor(thisMap.constants.mapSize.height / 2);
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
								},
								style: rHex ? state.styles.hex : state.styles.emptyHex
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
								parentHexId,
								name: rArea ? rArea.name : "",
								vertices,
								placement,
								state: {
									isPainted: rArea !== undefined,
									isHovered: false
								},
								style: state.styles.area
							}];
						})
				);

				set(produce<HexmapState>((state) => {
					state.currentMapId = thisMap.id;
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
			}
		}),
		{ name: "useHexmapStore" }
	)
);
