import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

const CharList = (props) => {
	const [charList, setCharList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);

	const { loading, error, getAllCharacters } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//  функция запроса дополнительных элементов для листа персонажей
	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllCharacters(offset).then(onCharListLoaded);
	};

	// загрузка данных листа персонажей в стейт и изменение статуса загрузки
	const onCharListLoaded = (newCharList) => {
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
	const itemRefs = useRef([]);
	const focusOnItem = (id) => {
		itemRefs.current.forEach((item) => item.classList.remove("char__item_selected"));
		itemRefs.current[id].classList.add("char__item_selected");
		itemRefs.current[id].focus();
	};

	function renderItems(arr) {
		const items = arr.map(({ id, thumbnail, name }, i) => {
			// меняем стиль изображения object-fit, если у персонажа нет изображения
			const imageNotFoundSrc = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

			return (
				<li
					className='char__item'
					key={id}
					onClick={() => {
						props.onCharSelected(id);
						focusOnItem(i);
					}}
					onKeyPress={(e) => {
						if (e.key === " " || e.key === "Enter") {
							props.onCharSelected(id);
							focusOnItem(i);
						}
					}}
					tabIndex={0}
					ref={(elem) => (itemRefs.current[i] = elem)}
				>
					<img src={thumbnail} alt={name} style={thumbnail === imageNotFoundSrc ? { objectFit: "contain" } : null} />
					<div className='char__name'>{name}</div>
				</li>
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
			<button className='button button__main button__long' disabled={newItemLoading} onClick={() => onRequest(offset)} style={{ display: charEnded ? "none" : "block" }}>
				<div className='inner'>load more</div>
			</button>
		</div>
	);
};

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
