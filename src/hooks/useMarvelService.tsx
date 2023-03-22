import {
	ITransformedChar,
	ITransformedComic,
	ITransformedCharData,
	ITransformedComicData,
	CharFromApiType,
	ComicFromApiType,
	CharDataType,
	ComicDataType,
} from "types";

const useMarvelService = () => {
	const _apiBase = "https://gateway.marvel.com:443/v1/public/";
	const _apiKey = "apikey=aa0bc64c6fe58d8e64b31bec28af3b39";
	const _baseOffset = 210;
	const _comicsLimit = 8;

	const getAllChars = async ({ pageParam = _baseOffset }) => {
		const res = await fetch(`${_apiBase}characters?limit=9&offset=${pageParam}&${_apiKey}`);

		if (!res.ok) throw new Error("No data!");

		const { data }: { data: CharDataType } = await res.json();

		return transformCharData(data);
	};

	const getChar = async (id: number | null) => {
		if (!id) return;

		const res = await fetch(`${_apiBase}characters/${id}?${_apiKey}`);

		if (!res.ok) throw new Error("No data!");

		const { data }: { data: CharDataType } = await res.json();

		return transformChar(data.results[0]);
	};

	const getAllComics = async ({ pageParam = 0 }) => {
		const res = await fetch(
			`${_apiBase}comics?orderBy=issueNumber&limit=${_comicsLimit}&offset=${pageParam}&${_apiKey}`
		);

		if (!res.ok) throw new Error("No data!");

		const { data }: { data: ComicDataType } = await res.json();

		return transformComicData(data);
	};

	const getComic = async (id: string) => {
		const res = await fetch(`${_apiBase}comics/${id}?${_apiKey}`);

		if (!res.ok) throw new Error("No data!");

		const { data }: { data: ComicDataType } = await res.json();

		return transformComics(data.results[0]);
	};

	const transformChar = (char: CharFromApiType): ITransformedChar => {
		return {
			id: char.id,
			name: char.name,
			description: char.description
				? `${char.description.slice(0, 210)}...`
				: "No available data for this character",
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		};
	};

	const transformComics = (comics: ComicFromApiType): ITransformedComic => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount ? `${comics.pageCount} p.` : "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			price: comics.prices[0]?.price ? `${comics.prices[0].price}$` : "not available",
		};
	};

	const transformCharData = (data: CharDataType): ITransformedCharData => {
		return {
			offset: data.offset,
			results: data.results.map((char: CharFromApiType): ITransformedChar => transformChar(char)),
		};
	};

	const transformComicData = (data: ComicDataType): ITransformedComicData => {
		return {
			offset: data.offset,
			results: data.results.map((comic: ComicFromApiType): ITransformedComic => transformComics(comic)),
		};
	};

	return { getAllComics, getComic, getAllChars, getChar };
};

export { useMarvelService };
