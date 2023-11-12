import { create } from "zustand";
import { devtools } from "zustand/middleware";


export type CharacterBurnerMiscState = {
	resources: CharacterResource[];
	stockSpecific: CharacterStockSpecific;
	limits: CharacterStockLimits;
	questions: CharacterQuestion[];

	reset: () => void,

	hasQuestionTrue: (id: QuestionId) => boolean;
	hasQuestionTrueByName: (name: string) => boolean;
};

export const useCharacterBurnerMiscStore = create<CharacterBurnerMiscState>()(
	devtools(
		(set, get) => ({
			resources: [],
			stockSpecific: {},
			limits: {
				beliefs: 3,
				instincts: 3,
				stats: {
					Will: { min: 1, max: 8 },
					Perception: { min: 1, max: 8 },
					Power: { min: 1, max: 8 },
					Agility: { min: 1, max: 8 },
					Forte: { min: 1, max: 8 },
					Speed: { min: 1, max: 8 }
				},
				attributes: 9
			},
			questions: [],

			reset: (): void => {
				set({
					resources: [],
					stockSpecific: {},
					limits: {
						beliefs: 3,
						instincts: 3,
						stats: {
							Will: { min: 1, max: 8 },
							Perception: { min: 1, max: 8 },
							Power: { min: 1, max: 8 },
							Agility: { min: 1, max: 8 },
							Forte: { min: 1, max: 8 },
							Speed: { min: 1, max: 8 }
						},
						attributes: 9
					},
					questions: []
				});
			},

			hasQuestionTrue: (id: QuestionId): boolean => {
				return get().questions.some(v => v.id === id && v.answer);
			},

			hasQuestionTrueByName: (name: string): boolean => {
				return get().questions.some(v => v.name === name && v.answer);
			}
		})
	)
);
