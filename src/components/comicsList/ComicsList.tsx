/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import { ComicsListType } from "types/generalTypes";

import "./comicsList.scss";

const ComicsList = () => {
    const [comicsList, setComicsList] = useState<ComicsListType | []>([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // загрузка дополнительного списка комиксов по запросу
    const onRequest = (offset: number, initial?: boolean) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllComics(offset).then(onComicsListLoaded);
    };

    // если число оставшихся комиксов в api < 8, то убираем кнопку LOAD MORE
    const onComicsListLoaded = (newComicsList: ComicsListType) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setnewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    };

    function renderItems(arr: ComicsListType) {
        const items = arr.map(({ id, thumbnail, title, price }, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt={title} className="comics__item-img" />
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            );
        });

        return <ul className="comics__grid">{items}</ul>;
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                disabled={newItemLoading}
                style={{ display: comicsEnded ? "none" : "block" }}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
