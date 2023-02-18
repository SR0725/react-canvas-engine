export interface GameObject {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	flipped?: boolean;
	rotate?: number;
  imageElement?: HTMLImageElement;
	imageSrc?: string;
}
