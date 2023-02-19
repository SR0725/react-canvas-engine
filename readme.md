[![version](https://img.shields.io/npm/v/react-canvas-engine)](https://www.npmjs.com/package/react-canvas-engine?activeTab=readme)

<h1>react-canvas-engine</h1>

#### English

A library that allows you to describe canvas graphics elements using JSX. It is designed for small games or 60 FPS animations, with an interface similar to a game engine.

#### 中文

React Canvas Engine 是一個 React 套件，可以使用 JSX 來描述 Canvas 的畫面元素。它被設計用於小型遊戲或 60FPS 動畫，因此它的介面與遊戲引擎類似。

## Features / 功能

#### English

React Canvas Engine offers the following features:

-   Ability to use JSX to describe canvas elements
-   Designed for small games or 60FPS animations
-   Ability to nest multiple GameObjects in a CanvasEngine
-   Supports properties such as position, size, rotation, and flip for elements
-   Supports drawing of images
-   Supports using Hooks to listen for the component's lifecycle and interaction events

#### 中文

React Canvas Engine 提供了以下功能：

-   可以使用 JSX 來描述 Canvas 的畫面元素
-   設計用於小型遊戲或 60FPS 動畫
-   可以在 CanvasEngine 中嵌套多個 GameObject
-   支援元素的位置、大小、旋轉、翻轉等屬性
-   支援繪製圖像
-   支援使用 Hook 來監聽元件的生命週期和互動事件

## Installation / 安裝

You can install React Canvas Engine using either npm or yarn:

您可以使用 npm 或 yarn 來安裝 React Canvas Engine：

```sh
npm install react-canvas-engine
```

or

```ssh
yarn add react-canvas-engine
```

## Example / 使用範例

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
	const [imageSrc, setImageSrc] = React.useState('/cat.png');

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

## Components

### CanvasEngine

##### English

This component allows you to render graphics elements in a canvas using JSX syntax. You can only place GameObjects inside the CanvasEngine. Normal UI elements will not be displayed. You can use multiple CanvasEngine components in a single project to meet different display requirements.

##### Chinese

CanvasEngine 是一個容器元件，所有的遊戲物件都應該在 CanvasEngine 以內，CanvasEngine 裡頭也只能放 GameObject，正常的 UI 放在裡頭是不會被顯示的。您可以在單個項目中使用多個 CanvasEngine 組件來滿足不同的顯示需求

#### Props

-   `CanvasHTMLAttributes`

#### Children

-   `GameObject`

#### Returns

-   `HTMLCanvasElement`

---

### GameObject

##### English

This component represents a game object to be rendered in the canvas. It supports the following props:

##### 中文

這個元件代表一個在畫布中要被渲染的遊戲物件，它支援以下屬性：

#### Props

-   `x (number)`: the absolute x-axis position of the image
-   `y (number)`: the absolute y-axis position of the image
-   `width (number)`: the width of the image
-   `height (number)`: the height of the image
-   `flipped (boolean, optional)`: whether the image should be horizontally flipped
-   `rotate (number, optional)`: the angle of the image in radians, where 2\*Math.PI is 360 degrees
-   `imageSrc (string, optional)`: the file path of the image to display

## Hooks

### useOnMounted

##### English

It allows you to run a callback function when the component is mounted.

##### 中文

當元件建立時，執行傳入 function

-   Input: `callback (() => void)`

---

### useOnUpdated

##### English

This hook runs a callback function on every animation frame.

##### 中文

每 animationFrame 會執行一次 callback

-   Input: `callback (() => void)`

---

### useOnUnmounted

##### English

It allows you to run a callback function when the component is unmounted.

##### 中文

當元件銷毀時，執行傳入 function

-   Input: `callback (() => void)`

---

### useInteractionData

##### English

This hook returns an object containing information about the current position and touch status of the cursor or mouse.

##### 中文

這個 Hook 返回一個包含有關當前游標或滑鼠位置和觸控狀態信息的對象。

-   Returns

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
