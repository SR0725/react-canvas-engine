import { CanvasHTMLAttributes, ReactNode, FC } from 'react';
import Canvas from '@/components/Canvas';
import { InteractionDataProvider } from '@/components/Providers/InteractionDataProvider';

interface GameType extends CanvasHTMLAttributes<HTMLCanvasElement> {
	children?: ReactNode;
}
const CanvasEngine: FC<Readonly<GameType>> = ({ children, ...canvasProps }) => {
	return (
		<Canvas {...canvasProps}>
			<InteractionDataProvider>{children}</InteractionDataProvider>
		</Canvas>
	);
};

export default CanvasEngine;
