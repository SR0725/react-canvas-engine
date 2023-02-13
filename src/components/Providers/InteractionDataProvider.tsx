import {
	createContext,
	useState,
	FC,
	useEffect,
	useContext,
	ReactNode,
} from 'react';
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

const InteractionData = createContext<InteractionDataType>({
	cursorPosition: {
		x: 0,
		y: 0,
	},
	cursorIsPressed: false,
});

const InteractionDataProvider: FC<{
	readonly children: ReactNode;
}> = ({ children }) => {
	const mousePosition = useMousePosition();
	const touchPosition = useTouchPosition();
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
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

const useInteractionData = () => useContext(InteractionData);

export { InteractionDataProvider, useInteractionData };
