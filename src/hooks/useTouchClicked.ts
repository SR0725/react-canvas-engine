import { useState, useEffect } from 'react';

const useTouchClicked = () => {
	const [isClicked, setIsClicked] = useState<boolean>(false);

	useEffect(() => {
		const handleClicked = () => {
			setIsClicked(true);
		};
		const handleUnClicked = () => {
			setIsClicked(false);
		};

		window.addEventListener('touchstart', handleClicked);
		window.addEventListener('touchend', handleUnClicked);

		return () => {
			window.removeEventListener('touchstart', handleClicked);
			window.removeEventListener('touchend', handleUnClicked);
		};
	}, []);
	return isClicked;
};

export default useTouchClicked;
