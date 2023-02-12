import React from 'react';
// 一個紀錄所有callback的陣列
const callbacks: (() => void)[] = [];

const useOnUpdated = (callback: () => void) => {
	React.useEffect(() => {
		callbacks.push(callback);
		return () => {
			const index = callbacks.indexOf(callback);
			callbacks.splice(index, 1);
		};
	}, []);
};

// 一個執行所有callback的方法
export const runCallbacks = () => {
	callbacks.forEach((callback) => callback());
};

// 每Frame執行一次
export const loop = () => {
	runCallbacks();
	requestAnimationFrame(loop);
};

export default useOnUpdated;
