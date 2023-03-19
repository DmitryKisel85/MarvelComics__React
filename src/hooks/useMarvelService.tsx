import { useHttp } from "./http.hook";

import {
	Char,
	Comics,
	ITransformedChar,
	ITransformedComic,
	CharListType,
	ComicsListType,
	ITransformedCharData,
	CharResponseType,
	CharDataType,
} from "types";

const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();

	const _apiBase = "https://gateway.marvel.com:443/v1/public/";
	const _apiKey = "apikey=aa0bc64c6fe58d8e64b31bec28af3b39";
	const _baseOffset = 210;

	const getAllChars = async ({ pageParam = _baseOffset }) => {
		const res = await fetch(`${_apiBase}characters?limit=9&offset=${pageParam}&${_apiKey}`);
		const { data }: { data: CharDataType } = await res.json();

		if (!data) throw new Error("No data!");

		return transformCharData(data);
	};

	const getChar = async (id: number | null) => {
		if (!id) return;

		const res = await fetch(`${_apiBase}characters/${id}?${_apiKey}`);
		const { data }: { data: CharDataType } = await res.json();

		if (!data) throw new Error("No data!");

		return transformChar(data.results[0]);
	};

	const getAllComics = async (offset = 0): Promise<ComicsListType> => {
		const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformComics);
	};

	const getComic = async (id: string): Promise<ITransformedComic> => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

	const transformChar = (char: Char): ITransformedChar => {
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

	// редактирование полученной информации из api и приведение её в нужный вид
	const _transformComics = (comics: Comics): ITransformedComic => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount ? `${comics.pageCount} p.` : "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects.language || "en-us",
			price: comics.prices.price ? `${comics.prices.price}$` : "not available",
		};
	};

	const transformCharData = (data: CharDataType): ITransformedCharData => {
		return {
			offset: data.offset,
			results: data.results.map((char: Char): ITransformedChar => transformChar(char)),
		};
	};

	return { loading, error, clearError, getAllComics, getComic, getAllChars, getChar };
};

export { useMarvelService };
