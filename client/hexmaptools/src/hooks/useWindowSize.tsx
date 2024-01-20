import { useState, useLayoutEffect } from "react";


export function useWindowSize(): [number, number] {
	const [size, setSize] = useState<[number, number]>([0, 0]);

	const updateSize = (): void => {
		setSize([window.innerWidth, window.innerHeight]);
	};

	useLayoutEffect(() => {
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	return size;
}
