import { useEffect } from 'react';

const useOnMounted = (callback: () => void) => {
	useEffect(() => {
		callback();
	}, []);
};

export default useOnMounted;
