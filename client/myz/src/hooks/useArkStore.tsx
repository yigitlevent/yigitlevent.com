import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";


interface ArkStore {
	readonly ark: Ark | undefined;
}

export const useArkStore = create<ArkStore>()(
	persist(
		devtools(
			(set, get) => ({
				ark: undefined
			})
		),
		{ name: "ArkStore" }
	)
);
