import { CanvasHTMLAttributes, FC, useRef } from 'react';
import { NilNode, render } from 'react-nil';
import useOnMounted from '@/hooks/useOnMounted';
import useOnUpdated, { loop } from '@/hooks/useOnUpdated';
import { GameObject as GameObjectType } from '@/types/GameObject';

// Clear canvas before drawing a new frame
function clearCanvas(ctx: CanvasRenderingContext2D) {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// Resize canvas to match the size of the canvas container
function resizeCanvas(ctx: CanvasRenderingContext2D) {
	const { canvas } = ctx;

	const { width, height } = canvas.getBoundingClientRect();

	if (canvas.width !== width || canvas.height !== height) {
		const { devicePixelRatio: ratio = 1 } = window;

		canvas.width = width * ratio;
		canvas.height = height * ratio;

		ctx.scale(ratio, ratio);
	}
}

// Render all game objects to the canvas
function renderCanvas(ctx: CanvasRenderingContext2D, list: GameObjectType[]) {
	clearCanvas(ctx);

	list.forEach((gameObject) => {
		const { x, y, width, height, flipped, rotate, image } = gameObject;

		ctx.save();

		if (!image) return;

		if (flipped) {
			ctx.translate(x + width, y);
			ctx.scale(-1, 1);
		} else {
			ctx.translate(x, y);
		}

		if (rotate) {
			ctx.rotate(rotate);
		}

		ctx.drawImage(image, 0, 0, width, height);

		ctx.restore();
	});
}

// Get all game objects from the node tree
function getGameObjects(
	node: NilNode<Record<string, unknown>> | null
): GameObjectType[] {
	const gameObjects: GameObjectType[] = [];

	if (node) {
		const { type, props } = node;

		if (type === 'gameObject') {
			gameObjects.push(props as unknown as GameObjectType);
		}

		if (node.children) {
			node.children.forEach((child) => {
				gameObjects.push(...getGameObjects(child));
			});
		}
	}

	return gameObjects;
}

interface CanvasType extends CanvasHTMLAttributes<HTMLCanvasElement> {
	children?: React.ReactNode;
}
const Canvas: FC<Readonly<CanvasType>> = ({ children, ...canvasProps }) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const container = render(children);

	useOnMounted(() => {
		const ctx = canvasRef.current?.getContext('2d');

		if (ctx) {
			loop();
		}

		function handleResize() {
			if (ctx) {
				resizeCanvas(ctx);
			}
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	useOnUpdated(() => {
		const ctx = canvasRef.current?.getContext('2d');
		let gameObjectList = getGameObjects(container.head);

		if (ctx) {
			clearCanvas(ctx);
			renderCanvas(ctx, gameObjectList);
		}
	});

	return (
		<canvas
			{...canvasProps}
			ref={canvasRef}
		/>
	);
};

export default Canvas;
