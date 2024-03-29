import { Spinner } from "components/spinner";
import { ErrorMessage } from "components/errorMessage";
import { CharItem } from "components/charItem";
import { Button } from "components/common/button";

import { useGetCharsQuery } from "hooks/useQueries";

import s from "./charList.module.scss";

interface CharlistProps {
	onCharSelected: (id: number) => void;
	selectedChar: number | null;
}

const CharList = ({ onCharSelected, selectedChar }: CharlistProps) => {
	const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, error, isSuccess } = useGetCharsQuery();

	const handleCharClick = (id: number) => onCharSelected(id);
	const handleLoadMoreBtnClick = () => fetchNextPage();

	if (error) return <ErrorMessage />;
	if (isLoading) return <Spinner />;

	return (
		<>
			{isSuccess && data && (
				<div className={s.root}>
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
						<Button isMain isLong disabled={isFetchingNextPage} onClick={handleLoadMoreBtnClick}>
							load more
						</Button>
					)}
				</div>
			)}
		</>
	);
};

export { CharList };
