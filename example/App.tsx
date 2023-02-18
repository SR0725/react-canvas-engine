import * as React from 'react';
import {
	CanvasEngine,
	GameObject,
	useOnMounted,
	useOnUpdated,
	useOnUnmounted,
	useInteractionData,
	isCollide,
	getDistance,
} from '../src/index';
// '../dist/react-canvas-engine';

function App() {
	return (
		<div
			id='app'
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
			}}
		>
			<CanvasEngine
				width={window.innerWidth}
				height={window.innerHeight}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
        }}
			>
				<Cat />
			</CanvasEngine>
		</div>
	);
}
function Cat() {
	const rotate = 0;
	const { x, y, width, height, state, flipped } = useCatAction();

	const imageSrc = useCatImage(state);
	return (
		<GameObject
			x={x}
			y={y}
			width={width}
			height={height}
			flipped={flipped}
			rotate={rotate}
			imageSrc={imageSrc}
		/>
	);
}

// Frame
function useFrame() {
	const [frame, setFrame] = React.useState(0);
	// 每次更新差距時間
	const [deltaTime, setDeltaTime] = React.useState(0);
	// 上一次更新時間
	const [lastTime, setLastTime] = React.useState(0);

	useOnUpdated(() => {
		setFrame((prev) => prev + 1);

		// 每次更新差距時間
		const now = Date.now();
		const deltaTime = now - lastTime;
		setDeltaTime(deltaTime);
		setLastTime(now);
	});

	return { frame, deltaTime };
}

// 貓貓行為
function useCatAction() {
	const { frame, deltaTime } = useFrame();
	const { cursorPosition, cursorIsPressed } = useInteractionData();

	const [state, setState] = React.useState('idle');

	const [x, setX] = React.useState(64);
	const [y, setY] = React.useState(64);
	const [width] = React.useState(50);
	const [height] = React.useState(50);
	const [flipped, setFlipped] = React.useState(false);

	useOnUpdated(() => {
		if (
			isCollide(
				x,
				y,
				width,
				height,
				cursorPosition.x,
				cursorPosition.y,
				64,
				64
			)
		) {
			state === 'rest' || setState('rest');
		} else if (state === 'rest') {
			setState('idle');
		}

		if (state === 'idle' && frame >= 15) {
			let random = Math.random();

			if (random < 0.7 && random >= 0.2) {
				setState('sleep');
			} else if (random < 0.2) {
				setState('walk');
			}
		}

		if (state === 'walk') {
			const { x: newX, y: newY } = moveToMouse({
				nowX: x,
				nowY: y,
				speed: 100,
				cursorPosition,
				deltaTime,
			});
			setX(newX);
			setY(newY);

			if (x > cursorPosition.x) {
				flipped === true || setFlipped(true);
			} else {
				flipped === false || setFlipped(false);
			}
		}
	});

	return { x, y, width, height, state, flipped };
}

function moveToMouse({
	nowX,
	nowY,
	speed,
	cursorPosition,
	deltaTime,
}: {
	nowX: number;
	nowY: number;
	speed: number;
	cursorPosition: { x: number; y: number };
	deltaTime: number;
}) {
	const { x, y } = cursorPosition;
	const distance = getDistance(x, y, nowX, nowY);
	const moveX = ((x - nowX) / distance) * speed;
	const moveY = ((y - nowY) / distance) * speed;

	return {
		x: nowX + (moveX * deltaTime) / 1000,
		y: nowY + (moveY * deltaTime) / 1000,
	};
}

// 貓貓圖片
function useCatImage(state: string) {
	const { frame } = useFrame();
	const [imageSrc, setImageSrc] = React.useState('/cat/idle/0.png');

	useOnUpdated(() => {
		setImageSrc(getCatStateImage(state, frame));
	});

	return imageSrc;
}

function getCatStateImage(state: string, frame: number) {
	// state idle, walk, jump, rest, sleep
	// frame idle=16, walk=9, jump=7, rest=3, sleep=4
	const stateFrame = {
		idle: 16,
		walk: 9,
		jump: 7,
		rest: 3,
		sleep: 4,
	};
	const loopFrame = Math.floor(frame / 16) % stateFrame[state];

	return `/cat/${state}/${loopFrame}.png`;
}

export default App;
