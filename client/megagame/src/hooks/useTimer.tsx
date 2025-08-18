import { useCallback, useState, useEffect } from "react";

import { useMegagameStore } from "./useMegagameStore";


export interface Countdown {
	minutes: number;
	seconds: number;
}

interface Timer {
	cycleCount: number;
	countdown: Countdown;
}

export const useTimer = (): Timer => {
	const { megagame } = useMegagameStore();

	if (!megagame) throw new Error("Megagame data is not available.");

	const getSecondsSinceStart = useCallback(() => {
		const start = new Date(megagame.timing.start).getTime();
		const current = new Date();
		return Math.floor((current.getTime() - start) / 1000);
	}, [megagame.timing.start]);

	const getCycleCount = useCallback(() => {
		const secondsSinceStart = getSecondsSinceStart();
		return Math.floor(secondsSinceStart / 60 / megagame.cycle.minutes);
	}, [getSecondsSinceStart, megagame.cycle.minutes]);

	const getMinutesAndSecondsUntilNextCycle = useCallback((): Countdown => {
		const secondsUntilNextCycle = (megagame.cycle.minutes * 60 * (getCycleCount() + 1)) - getSecondsSinceStart();

		return {
			minutes: Math.floor(secondsUntilNextCycle / 60),
			seconds: Math.floor(secondsUntilNextCycle % 60)
		};
	}, [getCycleCount, getSecondsSinceStart, megagame.cycle.minutes]);

	const [cycleCount, setCycleCount] = useState(getCycleCount());
	const [countdown, setCountdown] = useState(getMinutesAndSecondsUntilNextCycle());

	useEffect(() => {
		const i = setInterval(() => {
			setCycleCount(getCycleCount());
			setCountdown(getMinutesAndSecondsUntilNextCycle());
		}, 100);

		return () => clearInterval(i);
	}, [getCycleCount, getMinutesAndSecondsUntilNextCycle]);

	return {
		cycleCount,
		countdown
	};
};
