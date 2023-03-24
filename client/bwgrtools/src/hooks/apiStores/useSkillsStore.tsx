import produce from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { GenericGet } from "../stores/_genericRequests";

interface Skill {
	
}

interface SkillResponse {
	skills: { rows: SkillsDBO[]; };
}

interface SkillsState {
	fetching: boolean;
	skills: { [key: number]: Skill; };
	toggleFetching: () => void;
	fetchSkills: () => void;
}


export const useSkillsStore = create<SkillsState>()(
	devtools(
		(set, get) => ({
			fetching: false,
			skills: {},

			toggleFetching: () => {
				set(produce<SkillsState>((state) => { state.fetching = !state.fetching; }));
			},

			fetchSkills: () => {
				console.info("doing it");
				const toggleFetching = get().toggleFetching;

				toggleFetching();

				GenericGet<SkillResponse>("/skills/get")
					.then(response => {
						if (response.status === 200) {
							console.info(response.data.skills.rows);
						}
						else throw new Error();
					})
					.catch(reason => {
						console.error(reason);
					})
					.finally(() => toggleFetching());
			}
		})
	)
);
