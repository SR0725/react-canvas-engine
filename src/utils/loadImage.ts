/**
 * Loads an image from a given path
 */
const imageCache: { [key: string]: HTMLImageElement } = {};

export const loadImage = (src: string) => {
	if (imageCache[src]) {
		return imageCache[src];
	}

	const imageElement = new Image();
	imageElement.src = src;
	imageCache[src] = imageElement;

	return imageElement;
};
