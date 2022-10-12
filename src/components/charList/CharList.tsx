import { useState, useEffect, useRef } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import { Charlist } from "types/generalTypes";

import "./charList.scss";

interface CharlistProps {
    onCharSelected: (id: number) => void;
}

const CharList = (props: CharlistProps) => {
    const [charList, setCharList] = useState<Charlist | []>([]);
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
    const onCharListLoaded = (newCharList: Charlist) => {
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
    const itemRefs = useRef<HTMLLIElement[]>([]);
    const focusOnItem = (id: number) => {
        itemRefs.current.forEach((item) => item.classList.remove("char__item_selected"));
        itemRefs.current[id].classList.add("char__item_selected");
        itemRefs.current[id].focus();
    };

    function renderItems(arr: Charlist) {
        const items = arr.map(({ id, thumbnail, name }, i) => {
            // меняем стиль изображения object-fit, если у персонажа нет изображения
            const imageNotFoundSrc = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

            let imageStyle = thumbnail === imageNotFoundSrc ? "contain" : "fill";
            const img = document.getElementById("charlistElementImage");
            img?.style.setProperty("objectFit", imageStyle);

            return (
                <li
                    className="char__item"
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
                    ref={(elem: HTMLLIElement) => {
                        if (itemRefs.current !== null) {
                            itemRefs.current[i] = elem;
                            return itemRefs.current[i];
                        }
                    }}
                >
                    <img src={thumbnail} alt={name} id="charlistElementImage" />
                    <div className="char__name">{name}</div>
                </li>
            );
        });

        return <ul className="char__grid">{items}</ul>;
    }

    const charListGrid = renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {charListGrid}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{ display: charEnded ? "none" : "block" }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default CharList;
