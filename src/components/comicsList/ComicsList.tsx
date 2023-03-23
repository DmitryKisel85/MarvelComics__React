import { useInfiniteQuery } from "@tanstack/react-query";

import { useMarvelService } from "hooks/useMarvelService";
import { useViewport } from "hooks/useViewport";

import { Spinner } from "components/spinner";
import { ErrorMessage } from "components/errorMessage";
import { ComicsItem } from "components/comicsItem";
import { Button } from "components/common/button";

import s from "./comicsList.module.scss";

const ComicsList = () => {
	const { getAllComics } = useMarvelService();
	const { isMobile } = useViewport();

	const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, error, isSuccess } = useInfiniteQuery(
		["comics"],
		getAllComics,
		{
			getNextPageParam: (lastPage) => lastPage.offset + (isMobile ? 4 : 8),
		}
	);

	const handleLoadMoreBtnClick = () => fetchNextPage();

	if (error) return <ErrorMessage />;
	if (isLoading) return <Spinner />;

	return (
		<>
			{isSuccess && (
				<div className={s.root}>
					<ul className={s.list}>
						{data.pages.map((page) =>
							page.results.map((comic) => <ComicsItem key={comic.id} comic={comic} />)
						)}
					</ul>
					{hasNextPage && (
						<Button isMain isLong disabled={isFetchingNextPage} onClick={handleLoadMoreBtnClick}>
							load more
						</Button>
					)}
				</div>
			)}
		</>
	);
};

export { ComicsList };
