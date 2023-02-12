import React from 'react';

const useOnMounted = (callback: () => void) => {
	React.useEffect(() => {
		callback();
	}, []);
};

export default useOnMounted;
