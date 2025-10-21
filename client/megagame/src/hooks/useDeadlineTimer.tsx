import { useCallback, useState, useEffect } from "react";

import { useMegagameStore } from "./useMegagameStore";


interface DeadlineCountdown {
	id: string;
	deadlinePassed: boolean;
	minutes: string;
	seconds: string;
}

interface Timer {
	deadlines: DeadlineCountdown[];
}

export const useDeadlineTimer = (): Timer => {
	const { megagame } = useMegagameStore();

	if (!megagame) throw new Error("Megagame data is not available.");

	const getDeadlineCountdowns = useCallback((): DeadlineCountdown[] => {
		const now = Date.now();

		return megagame.deadlineItems.map((item: MegagameDeadlineItem) => {
			const deadlineMs = new Date(item.deadlineAt).getTime();
			const remainingMs = deadlineMs - now;
			const minutes = Math.max(0, Math.floor(remainingMs / 60000));
			const seconds = Math.max(0, Math.floor((Math.abs(remainingMs) % 60000) / 1000));

			return {
				id: item.id,
				deadlinePassed: remainingMs <= 0,
				minutes: minutes > 9 ? `${minutes}` : `0${minutes}`,
				seconds: seconds > 9 ? `${seconds}` : `0${seconds}`
			};
		});
	}, [megagame]);

	const [deadlines, setDeadlines] = useState<DeadlineCountdown[]>(getDeadlineCountdowns());

	useEffect(() => {
		const i = setInterval(() => setDeadlines(getDeadlineCountdowns()), 100);
		return () => clearInterval(i);
	}, [getDeadlineCountdowns]);

	return { deadlines };
};
