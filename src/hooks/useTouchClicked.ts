import React from 'react';

const useTouchClicked = () => {
	const [isClicked, setIsClicked] = React.useState<boolean>(false);

	React.useEffect(() => {
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
