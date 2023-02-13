import { useState, useEffect } from 'react';

type MousePosition = {
	x: number;
	y: number;
};

const useMousePosition = () => {
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: NaN,
		y: NaN,
	});

	useEffect(() => {
		const updateMousePosition = (event: MouseEvent) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};
		window.addEventListener('mousemove', updateMousePosition);
		return () => {
			window.removeEventListener('mousemove', updateMousePosition);
		};
	}, []);
	return mousePosition;
};

export default useMousePosition;
