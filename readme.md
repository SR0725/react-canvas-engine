[![version](https://img.shields.io/npm/v/react-canvas-engine)](https://www.npmjs.com/package/react-canvas-engine?activeTab=readme)

<h1>react-canvas-engine</h1>

## 功能

這是一個可以使用 JSX 來描述 Canvas 的畫面元素的套件
在設計這是以小型遊戲或 60FPS 動畫為設計考量，所以介面上類似遊戲引擎

## 範例程式

```tsx
import * as React from 'react';
import {
	CanvasEngine,
	GameObject,
	useOnUpdated,
} from '../dist/react-canvas-engine';
import { loadImage } from '../src/utils/loadImage';
function App() {
	return (
		<div id='app'>
			<CanvasEngine
				width={500}
				height={500}
			>
				<Cat />
			</CanvasEngine>
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
	const [imageSrc, setimageSrc] = React.useState('/cat.png');

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
			imageSrc={image}
		/>
	);
}

export default App;
```

## Component

#### CanvasEngine

-   @input CanvasHTMLAttributes
-   @return HTMLCanvasElement

所有的遊戲物件都應該在 CanvasEngine 以內，CanvasEngine 裡頭也只能放 GameObject，正常的 UI 放在裡頭是不會被顯示的<br>
一個專案是允許有多個 CanvasEngine，你可以透過不同的 CanvasEngine 來滿足不同的顯示需求

#### GameObject

-   @input x [number] 圖片的絕對 x 軸位置
-   @input y [number] 圖片的絕對 y 軸位置
-   @input width [number] 圖片框度
-   @input height [number] 圖片高度
-   @input ?flipped [boolean] 圖像是否左右翻轉
-   @input ?rotate [number] 顯示角度，2\*Math.pi() 為 360 度
-   @input ?imageSrc [string] 顯示的圖片位置

## Hook

#### useOnMounted

-   @input callback [() => void]
    當元件建立時，執行傳入 function
    等同 `React.useEffect(callback, [])`

#### useOnUpdated

-   @input callback [() => void]
    每 animationFrame 會執行一次 callback

#### useOnUnmounted

-   @input callback [() => void]
    當元件銷毀時，執行傳入 function
    等同 `React.useEffect(()=>{return callback}, [])`

### useInteractionData

-   @return

```ts
{
	// 手指或滑鼠當前位置
	cursorPosition: {
		x: number;
		y: number;
	}
	// 當前手指或滑鼠是否碰觸螢幕
	cursorIsPressed: boolean;
}
```
