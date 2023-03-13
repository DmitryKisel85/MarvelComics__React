import { useState, useEffect, useRef } from "react";

import useMarvelService from "services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import { CharItem } from "components/charItem";

import { CharListType } from "types";

import "./charList.scss";

interface CharlistProps {
	onCharSelected: (id: number) => void;
}

const CharList = ({ onCharSelected }: CharlistProps) => {
	const [charList, setCharList] = useState<CharListType | []>([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);

	const { loading, error, getAllCharacters } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//  функция запроса дополнительных элементов для листа персонажей
	const onRequest = (offset: number, initial?: boolean) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllCharacters(offset).then(onCharListLoaded);
	};

	// загрузка данных листа персонажей в стейт и изменение статуса загрузки
	const onCharListLoaded = (newCharList: CharListType) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}

		setCharList((charList) => [...charList, ...newCharList]);
		setNewItemLoading(false);
		setOffset((offset) => offset + 9);
		setCharEnded(ended);
	};

	// добавление стилей при клике на персонажа
	const itemRefs = useRef<HTMLLIElement[] | []>([]);

	const focusOnItem = (id: number) => {
		if (!itemRefs.current) throw Error("itemRefs are not assigned");

		itemRefs.current.forEach((item) => item.classList.remove("char__item_selected"));
		itemRefs.current[id].classList.add("char__item_selected");
		itemRefs.current[id].focus();
	};

	function renderItems(arr: CharListType) {
		const items = arr.map((item, idx) => {
			return (
				<CharItem
					key={item.id}
					item={item}
					onCharSelected={onCharSelected}
					focusOnItem={focusOnItem}
					idx={idx}
				/>
			);
		});

		return <ul className='char__grid'>{items}</ul>;
	}

	const charListGrid = renderItems(charList);

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className='char__list'>
			{errorMessage}
			{spinner}
			{charListGrid}
			<button
				className='button button__main button__long'
				disabled={newItemLoading}
				onClick={() => onRequest(offset)}
				style={{ display: charEnded ? "none" : "block" }}>
				<div className='inner'>load more</div>
			</button>
		</div>
	);
};

export { CharList };
