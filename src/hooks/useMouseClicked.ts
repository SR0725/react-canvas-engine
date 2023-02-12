import React from 'react';

const useMouseClicked = () => {
	const [isClicked, setIsClicked] = React.useState<boolean>(false);

	React.useEffect(() => {
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
