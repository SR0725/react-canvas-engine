import React from 'react';
import useMousePosition from '@/hooks/useMousePosition';
import useTouchPosition from '@/hooks/useTouchPosition';
import useMouseClicked from '@/hooks/useMouseClicked';
import useTouchClicked from '@/hooks/useTouchClicked';

interface InteractionDataType {
	cursorPosition: {
		x: number;
		y: number;
	};
	cursorIsPressed: boolean;
}

const InteractionData = React.createContext<InteractionDataType>({
	cursorPosition: {
		x: 0,
		y: 0,
	},
	cursorIsPressed: false,
});

const InteractionDataProvider: React.FC<{
	readonly children: React.ReactNode;
}> = ({ children }) => {
	const mousePosition = useMousePosition();
	const touchPosition = useTouchPosition();
	const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 });

	React.useEffect(() => {
		if ('ontouchstart' in window) {
			setCursorPosition(touchPosition);
		} else {
			setCursorPosition(mousePosition);
		}
	}, [mousePosition, touchPosition]);

	const mouseIsPressed = useMouseClicked();
	const touchIsPressed = useTouchClicked();
	const cursorIsPressed = mouseIsPressed || touchIsPressed;

	return (
		<InteractionData.Provider
			value={{
				cursorPosition,
				cursorIsPressed,
			}}
		>
			{children}
		</InteractionData.Provider>
	);
};

const useInteractionData = () => React.useContext(InteractionData);

export { InteractionDataProvider, useInteractionData };
