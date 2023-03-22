import { useInfiniteQuery } from "@tanstack/react-query";
import cx from "classnames";

import { useMarvelService } from "hooks/useMarvelService";

import { Spinner } from "components/spinner";
import { ErrorMessage } from "components/errorMessage";
import { ComicsItem } from "components/comicsItem";

import s from "./comicsList.module.scss";

const ComicsList = () => {
	const { getAllComics } = useMarvelService();

	const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, error, isSuccess } = useInfiniteQuery(
		["comics"],
		getAllComics,
		{
			getNextPageParam: (lastPage) => lastPage.offset + 8,
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
						<button
							disabled={isFetchingNextPage}
							className={cx(s.btn, s.btnMain, s.btnLong, s.btnLoadMore)}
							onClick={handleLoadMoreBtnClick}>
							<div className={s.btnInner}>load more</div>
						</button>
					)}
				</div>
			)}
		</>
	);
};

export { ComicsList };
