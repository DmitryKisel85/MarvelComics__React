import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMarvelService } from "hooks/useMarvelService";
import { useViewport } from "hooks/useViewport";

export const useGetCharsQuery = () => {
	const { getAllChars } = useMarvelService();
	const { isMobile } = useViewport();

	return useInfiniteQuery(["chars"], getAllChars, {
		getNextPageParam: (lastPage) => lastPage.offset + (isMobile ? 6 : 9),
	});
};

export const useGetCharQuery = (charId: number | null) => {
	const { getChar } = useMarvelService();

	return useQuery(["char", charId], () => getChar(charId), {
		enabled: !!charId,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
};

export const useGetComicsQuery = () => {
	const { getAllComics } = useMarvelService();
	const { isMobile } = useViewport();

	return useInfiniteQuery(["comics"], getAllComics, {
		getNextPageParam: (lastPage) => lastPage.offset + (isMobile ? 4 : 8),
	});
};

export const useGetComicQuery = (comicId: string | undefined) => {
	const { getComic } = useMarvelService();

	return useQuery(["comic", comicId], () => getComic(comicId!), {
		enabled: !!comicId,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
};

export const useGetRandomCharQuery = () => {
	const { getChar } = useMarvelService();

	return useQuery(["randomchar"], () => getChar(Math.floor(Math.random() * (1011400 - 1011000) + 1011000)), {
		keepPreviousData: true,
		refetchOnWindowFocus: false,
		refetchInterval: 100000,
	});
};
