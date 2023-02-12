import React from 'react';

type TouchPosition = {
	x: number;
	y: number;
};

const useTouchPosition = () => {
	const [touchPosition, setTouchPosition] = React.useState<TouchPosition>({
		x: NaN,
		y: NaN,
	});

	React.useEffect(() => {
		const updateTouchPosition = (event: TouchEvent) => {
			const touch = event.touches[0];
			setTouchPosition({
				x: touch.clientX,
				y: touch.clientY,
			});
		};
		window.addEventListener('touchmove', updateTouchPosition);
		return () => {
			window.removeEventListener('touchmove', updateTouchPosition);
		};
	}, []);
	return touchPosition;
};

export default useTouchPosition;
