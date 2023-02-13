import { useState, useEffect } from 'react';

const useMouseClicked = () => {
	const [isClicked, setIsClicked] = useState<boolean>(false);

	useEffect(() => {
		const handleClicked = () => {
			setIsClicked(true);
		};
		const handleUnClicked = () => {
			setIsClicked(false);
		};

		window.addEventListener('mousedown', handleClicked);
		window.addEventListener('mouseup', handleUnClicked);
		return () => {
			window.removeEventListener('mousedown', handleClicked);
			window.removeEventListener('mouseup', handleUnClicked);
		};
	}, []);
	return isClicked;
};

export default useMouseClicked;
