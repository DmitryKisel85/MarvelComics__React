export interface ITransformedChar {
	id: number;
	name: string;
	description: string;
	thumbnail: string;
	homepage: string;
	wiki: string;
	comics: {
		resourceURI: string;
		name: string;
	}[];
}

export interface ITransformedComic {
	id: number;
	title: string;
	description: string;
	pageCount: number | string;
	thumbnail: string;
	language: string;
	price: string;
}

export type ComicsListType = ITransformedComic[];
export type CharListType = ITransformedChar[];

export interface ITransformedCharData {
	offset: number;
	results: CharListType;
}

export interface ITransformedComicData {
	offset: number;
	results: ComicsListType;
}
