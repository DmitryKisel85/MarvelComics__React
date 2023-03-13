import { useHttp } from "../hooks/http.hook";

import { Char, Comics, ITransformedChar, TransformedComic, CharListType } from "types";

// функция запроса к api и получения нужных персонажей/комиксов
const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();

	const _apiBase = "https://gateway.marvel.com:443/v1/public/";
	const _apiKey = "apikey=aa0bc64c6fe58d8e64b31bec28af3b39";
	const _baseOffset = 210;

	const getAllCharacters = async (offset = _baseOffset): Promise<CharListType> => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

	const getCharacter = async (id: number): Promise<ITransformedChar> => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};

	const getAllComics = async (offset = 0): Promise<TransformedComic[]> => {
		const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformComics);
	};

	const getComic = async (id: string): Promise<TransformedComic> => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

	// редактирование полученной информации из api и приведение её в нужный вид
	const _transformCharacter = (char: Char): ITransformedChar => {
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
	const _transformComics = (comics: Comics): TransformedComic => {
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

	return { loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic };
};

export default useMarvelService;
