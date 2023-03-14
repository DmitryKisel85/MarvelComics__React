export interface Urls {
	type: string;
	url: string;
}

export interface ComicItems {
	resourceURI: string;
	name: string;
}

export interface CharAndComics {
	id: number;
	description: string;
	thumbnail: {
		path: string;
		extension: string;
	};
}

export interface Char extends CharAndComics {
	name: string;
	urls: Urls[];
	comics: {
		items: ComicItems[];
	};
}

export interface Comics extends CharAndComics {
	title: string;
	pageCount: string;
	textObjects: {
		language: string;
	};
	prices: {
		type: string;
		price: string;
	};
}

export interface ITransformedChar {
	id: number;
	name: string;
	description: string;
	thumbnail: string;
	homepage: string;
	wiki: string;
	comics: ComicItems[];
}

export interface ITransformedComic {
	id: number;
	title: string;
	description: string;
	pageCount: string;
	thumbnail: string;
	language: string;
	price: string;
}

export type ComicsListType = ITransformedComic[];
export type CharListType = ITransformedChar[];
