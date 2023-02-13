import { CanvasHTMLAttributes, ReactNode, FC } from 'react';
import { InteractionDataProvider } from '@/components/Providers/InteractionDataProvider';
import Canvas from '@/components/Canvas';

interface GameType extends CanvasHTMLAttributes<HTMLCanvasElement> {
	children?: ReactNode;
}
const CanvasEngine: FC<Readonly<GameType>> = ({ children, ...canvasProps }) => {
	return (
		<InteractionDataProvider>
			<Canvas {...canvasProps}>{children}</Canvas>
		</InteractionDataProvider>
	);
};

export default CanvasEngine;
