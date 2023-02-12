import React from 'react';
import { InteractionDataProvider } from '@/components/Providers/InteractionDataProvider';
import Canvas from '@/components/Canvas';

interface GameType extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
	children?: React.ReactNode;
}
const Game: React.FC<Readonly<GameType>> = ({ children, ...canvasProps }) => {
	return (
		<InteractionDataProvider>
			<Canvas {...canvasProps}>{children}</Canvas>
		</InteractionDataProvider>
	);
};

export default Game;
