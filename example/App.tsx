import * as React from 'react';
import Game from '../src/index';
import GameObject from '../src/components/GameObject';
import useOnUpdated from '../src/hooks/useOnUpdated';
import { GameObject as GameObjectType } from '../src/types/GameObject';
import { loadImage } from '../src/utils/loadImage';
function App() {
	return (
		<div id='app'>
			<Game
				width={500}
				height={500}
			>
				<Cat />
			</Game>
		</div>
	);
}

function Cat() {
	const [x, setX] = React.useState(64);
	const [y, setY] = React.useState(64);
	const [width, setWidth] = React.useState(50);
	const [height, setHeight] = React.useState(50);
	const [flipped, setFlipped] = React.useState(false);
	const [rotate, setRotate] = React.useState(0);
	const [image, setImage] = React.useState(loadImage('/cat.png'));
  

	useOnUpdated(() => {
		setX(x + 1);
	});

	return (
		<GameObject
			x={x}
			y={y}
			width={width}
			height={height}
			flipped={flipped}
			rotate={rotate}
			image={image}
		/>
	);
}

export default App;
