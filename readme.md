<h1>reat-canvas-engine</h1>

## 功能

這是一個可以使用 JSX 來描述 Canvas 的畫面元素的套件
在設計這是以小型遊戲或 60FPS 動畫為設計考量，所以介面上類似遊戲引擎

## 範例程式

```tsx
import * as React from 'react';
import Game from '../src/index';
import GameObject from '../src/components/GameObject';
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
```

## Component

#### Game

-   @input CanvasHTMLAttributes
-   @return HTMLCanvasElement

所有的遊戲物件都應該在 Game 以內，Game 裡頭也只能放 GameObject，正常的 UI 放在裡頭是不會被顯示的<br>
一個專案是允許有多個 Game，你可以透過不同的 Game 來滿足不同的顯示需求

#### GameObject

-   @input x [number] 圖片的絕對 x 軸位置
-   @input y [number] 圖片的絕對 y 軸位置
-   @input width [number] 圖片框度
-   @input height [number] 圖片高度
-   @input ?flipped [boolean] 圖像是否左右翻轉
-   @input ?rotate [number] 顯示角度，2\*Math.pi() 為 360 度
-   @input ?image [typeof Image()] 顯示的圖片 // todo: 未來會進一步整合，只需要傳入圖片的位置即可

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

### 待開發...

#### useOnTouched

當滑鼠或手指碰到該遊戲物件的瞬間執行指定 function

#### useWhenTouched

當滑鼠或手指碰到該遊戲物件時，執行指定 function，每 animationFrame 執行一次

### useLeaveTouched

當滑鼠或手指離開該遊戲物件的瞬間執行指定 function

### useOnColideWith

當與某遊戲物件碰撞的瞬間執行指定 function

### useWhenColideWith

當與某遊戲物件碰撞的每個 animationFrame 執行指定 function

### useLeaveColideWith

當與某遊戲物件碰撞結束的瞬間執行某個指定 function
