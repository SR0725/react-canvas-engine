import { useEffect } from 'react';

const useOnUnmounted = (callback: () => void) => {
	useEffect(() => {
		return () => {
			callback();
		};
	}, []);
};

export default useOnUnmounted;
