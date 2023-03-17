import { useState } from "react";
import cx from "classnames";
import { useQuery } from "@tanstack/react-query";

import { useMarvelService } from "hooks/useMarvelService";

import { Spinner } from "components/spinner";
import { ErrorMessage } from "components/errorMessage";
import { CharItem } from "components/charItem";

import { API_OFFSET } from "constant";

import type { CharListType } from "types";

import s from "./charList.module.scss";

interface CharlistProps {
	onCharSelected: (id: number) => void;
	selectedChar: number | null;
}

const CharList = ({ onCharSelected, selectedChar }: CharlistProps) => {
	const [offset, setOffset] = useState(API_OFFSET);
	const [charListEnded, setCharListEnded] = useState(false);

	const { loading, error, getAllCharacters } = useMarvelService();

	const { data, refetch, isLoading, isSuccess } = useQuery({
		queryFn: () => getAllCharacters(offset).then(onCharListLoaded),
		queryKey: ["char"],
	});

	const onCharListLoaded = (result: CharListType) => {
		let ended = false;
		if (result.length < 9) {
			ended = true;
		}
		setOffset((offset) => offset + 9);
		setCharListEnded(ended);

		return result;
	};

	const handleCharClick = (id: number) => onCharSelected(id);
	// const handleBtnClick = (offset: number) => onRequest(offset);
	const handleBtnClick = () => refetch();

	if (error) return <ErrorMessage />;
	if (loading && !isLoading) return <Spinner />;

	return (
		<div>
			<ul className={s.list}>
				{isSuccess &&
					data.map((char) => (
						<CharItem
							key={char.id}
							char={char}
							isActive={char.id === selectedChar}
							onClick={() => handleCharClick(char.id)}
						/>
					))}
			</ul>
			{!charListEnded && (
				<button className={cx(s.btn, s.btnMain, s.btnLong)} disabled={isLoading} onClick={handleBtnClick}>
					<div className={s.btnInner}>load more</div>
				</button>
			)}
		</div>
	);
};

export { CharList };
