export interface MagicFacet {
	type: "Original" | "Alternative";
	group: string;
	name: string;
	obstacle: number;
	actions: number;
	resource: number;
}

export const MagicData: MagicFacet[][] = [
	[ // 3 origin
		{ type: "Original", group: "Origin", name: "Personal", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Origin", name: "Presence", obstacle: 2, actions: 2, resource: 2 },
		{ type: "Original", group: "Origin", name: "Sight", obstacle: 4, actions: 4, resource: 4 }
	],
	[ // 4 duration
		{ type: "Original", group: "Duration", name: "Instantaneous", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Duration", name: "Sustained", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Duration", name: "Elapsed Time", obstacle: 2, actions: 2, resource: 2 },
		{ type: "Original", group: "Duration", name: "Permanent", obstacle: 0, actions: 1, resource: 0 }
	],
	[ // 7 impetus
		{ type: "Original", group: "Impetus", name: "Create", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Impetus", name: "Destroy", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Impetus", name: "Tax", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Impetus", name: "Transmute", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Impetus", name: "Control", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Impetus", name: "Influence", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Impetus", name: "Enhance", obstacle: 0, actions: 1, resource: 0 }
	],
	[ // 8 elements
		{ type: "Original", group: "Element", name: "Anima", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Element", name: "Arcana", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Element", name: "Heaven", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Element", name: "White", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Element", name: "Fire", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Element", name: "Air", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Element", name: "Earth", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Element", name: "Water", obstacle: 0, actions: 1, resource: 0 }
	],
	[ // 11 area of effect
		{ type: "Original", group: "Area of Effect", name: "Caster", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Area of Effect", name: "Double Area", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Area of Effect", name: "Measured Area", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Area of Effect", name: "Half Area", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Area of Effect", name: "Dbl. Nat. Eff.", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Area of Effect", name: "Nat. Effect", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Area of Effect", name: "Half Nat. Eff.", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Area of Effect", name: "Dbl. Presence", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Area of Effect", name: "Presence", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Area of Effect", name: "Half Presence", obstacle: 0, actions: 1, resource: 0 },
		{ type: "Original", group: "Area of Effect", name: "Single Target", obstacle: 0, actions: 1, resource: 0 }
	]
];

export const MiscMagicFacets: MagicFacet[][] = [
	[ // 3 origin
		{ type: "Alternative", group: "Origin", name: "Personal", obstacle: 2, actions: 1, resource: 3 },
		{ type: "Alternative", group: "Origin", name: "Presence", obstacle: 3, actions: 3, resource: 9 },
		{ type: "Alternative", group: "Origin", name: "Sight", obstacle: 4, actions: 5, resource: 15 }
	],
	[ // 4 duration
		{ type: "Alternative", group: "Duration", name: "Instantaneous", obstacle: 1, actions: 1, resource: 3 },
		{ type: "Alternative", group: "Duration", name: "Sustained", obstacle: 2, actions: 2, resource: 4 },
		{ type: "Alternative", group: "Duration", name: "Elapsed Time", obstacle: -1, actions: -1, resource: -1 },
		{ type: "Alternative", group: "Duration", name: "Permanent", obstacle: 10, actions: 500, resource: 1302 }
	],
	[ // 7 impetus
		{ type: "Alternative", group: "Impetus", name: "Alteration", obstacle: 8, actions: 4, resource: 42 },
		{ type: "Alternative", group: "Impetus", name: "Assertion", obstacle: 6, actions: 7, resource: 32 },
		{ type: "Alternative", group: "Impetus", name: "Conjuration", obstacle: 9, actions: 33, resource: 117 },
		{ type: "Alternative", group: "Impetus", name: "Destruction", obstacle: 5, actions: 1, resource: 15 },
		{ type: "Alternative", group: "Impetus", name: "Exaltation", obstacle: 7, actions: 13, resource: 48 },
		{ type: "Alternative", group: "Impetus", name: "Reduction", obstacle: 4, actions: 1, resource: 9 },
		{ type: "Alternative", group: "Impetus", name: "Transmutation", obstacle: 10, actions: 27, resource: 120 }
	],
	[],
	[ // 5 area of effect
		{ type: "Alternative", group: "Area of Effect", name: "Caster", obstacle: 1, actions: 1, resource: 3 },
		{ type: "Alternative", group: "Area of Effect", name: "Single Target", obstacle: 2, actions: 2, resource: 6 },
		{ type: "Alternative", group: "Area of Effect", name: "Presence", obstacle: 3, actions: 4, resource: 9 },
		{ type: "Alternative", group: "Area of Effect", name: "Nat. Effect", obstacle: 4, actions: 8, resource: 18 },
		{ type: "Alternative", group: "Area of Effect", name: "Measured Area", obstacle: -1, actions: -1, resource: -1 }
	]
];


export const MiscMagicElements: MagicFacet[][] = [
	[ // 5 Prime Elements
		{ type: "Alternative", group: "Prime Element", name: "Air", obstacle: 4, actions: 2, resource: 12 },
		{ type: "Alternative", group: "Prime Element", name: "Earth", obstacle: 3, actions: 8, resource: 12 },
		{ type: "Alternative", group: "Prime Element", name: "Fire", obstacle: 5, actions: 2, resource: 15 },
		{ type: "Alternative", group: "Prime Element", name: "Water", obstacle: 4, actions: 6, resource: 15 },
		{ type: "Alternative", group: "Prime Element", name: "White", obstacle: 5, actions: 4, resource: 18 }
	],
	[ // 4 Lower Elements
		{ type: "Alternative", group: "Lower Element", name: "Anima", obstacle: 5, actions: 9, resource: 24 },
		{ type: "Alternative", group: "Lower Element", name: "Leta", obstacle: 3, actions: 19, resource: 21 },
		{ type: "Alternative", group: "Lower Element", name: "Simulacra", obstacle: 6, actions: 9, resource: 33 },
		{ type: "Alternative", group: "Lower Element", name: "Vita", obstacle: 4, actions: 13, resource: 21 }
	],
	[ // 3 Higher Elements
		{ type: "Alternative", group: "Higher Element", name: "Arcane", obstacle: 5, actions: 24, resource: 45 },
		{ type: "Alternative", group: "Higher Element", name: "Light", obstacle: 4, actions: 30, resource: 39 },
		{ type: "Alternative", group: "Higher Element", name: "Shadow", obstacle: 6, actions: 20, resource: 48 }
	]
];
