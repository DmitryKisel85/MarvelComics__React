import { useInfiniteQuery } from "@tanstack/react-query";
import cx from "classnames";

import { useMarvelService } from "hooks/useMarvelService";

import { Spinner } from "components/spinner";
import { ErrorMessage } from "components/errorMessage";
import { CharItem } from "components/charItem";

import s from "./charList.module.scss";

interface CharlistProps {
	onCharSelected: (id: number) => void;
	selectedChar: number | null;
}

const CharList = ({ onCharSelected, selectedChar }: CharlistProps) => {
	const { getAllChars } = useMarvelService();

	const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useInfiniteQuery(
		["chars"],
		getAllChars,
		{
			getNextPageParam: (lastPage) => lastPage.offset + 9,
		}
	);

	const handleCharClick = (id: number) => onCharSelected(id);
	const handleLoadMoreBtnClick = () => fetchNextPage();

	if (error) return <ErrorMessage />;
	if (isLoading) return <Spinner />;

	return (
		<>
			{data && (
				<div>
					<ul className={s.list}>
						{data.pages.map((page) =>
							page.results.map((char) => (
								<CharItem
									key={char.id}
									char={char}
									isActive={char.id === selectedChar}
									onClick={() => handleCharClick(char.id)}
								/>
							))
						)}
					</ul>
					{hasNextPage && (
						<button
							className={cx(s.btn, s.btnMain, s.btnLong)}
							disabled={isFetchingNextPage}
							onClick={handleLoadMoreBtnClick}>
							<div className={s.btnInner}>load more</div>
						</button>
					)}
				</div>
			)}
		</>
	);
};

export { CharList };
