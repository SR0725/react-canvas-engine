/**
 * Loads an image from a given path
 */
export const loadImage = (src: string) => {
	const image = new Image();
	image.src = src;
	return image;
};
