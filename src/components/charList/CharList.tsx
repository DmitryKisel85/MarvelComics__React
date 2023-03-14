import { useState, useEffect } from "react";
import cx from "classnames";

import { useMarvelService } from "services/useMarvelService";

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
	const [charList, setCharList] = useState<CharListType | []>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [offset, setOffset] = useState(API_OFFSET);
	const [charListEnded, setCharListEnded] = useState(false);

	const { loading, error, getAllCharacters } = useMarvelService();

	useEffect(() => {
		loadMoreChars(offset, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const loadMoreChars = (offset: number, initial?: boolean) => {
		initial ? setIsLoading(false) : setIsLoading(true);
		getAllCharacters(offset).then(onCharListLoaded);
	};

	const onCharListLoaded = (loadedCharList: CharListType) => {
		let ended = false;
		if (loadedCharList.length < 9) {
			ended = true;
		}

		setCharList((charList) => [...charList, ...loadedCharList]);
		setIsLoading(false);
		setOffset((offset) => offset + 9);
		setCharListEnded(ended);
	};

	const handleCharClick = (id: number) => onCharSelected(id);
	const handleBtnClick = (offset: number) => loadMoreChars(offset);

	if (error) return <ErrorMessage />;
	if (loading && !isLoading) return <Spinner />;

	return (
		<div>
			<ul className={s.list}>
				{charList.map((char) => (
					<CharItem
						key={char.id}
						char={char}
						isActive={char.id === selectedChar}
						onClick={() => handleCharClick(char.id)}
					/>
				))}
			</ul>
			{!charListEnded && (
				<button
					className={cx(s.btn, s.btnMain, s.btnLong)}
					disabled={isLoading}
					onClick={() => handleBtnClick(offset)}>
					<div className={s.btnInner}>load more</div>
				</button>
			)}
		</div>
	);
};

export { CharList };
