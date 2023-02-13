import React from 'react';
import useOnUnmounted from './useOnUnmounted';

// 用來存放所有callback的陣列
const tasks: {
	id: string;
	callback: () => void;
}[] = [];

const useOnUpdated = (callback: () => void) => {
	const id = React.useRef(Math.random().toString(36).substr(2, 9));

	React.useEffect(() => {
		tasks.push({
			id: id.current,
			callback,
		});

		return () => {
      console.log(tasks.length)
			tasks.splice(
				tasks.findIndex((task) => task.id === id.current),
				1
			);
		};
	}, [callback]);

};

// 執行所有callback
export const runCallbacks = () => {

	tasks.forEach((task) => task.callback());
};

// 執行loop
export const loop = () => {
	runCallbacks();
	requestAnimationFrame(loop);
};

export default useOnUpdated;
