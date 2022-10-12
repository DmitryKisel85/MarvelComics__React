import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import { TransformedComic } from "types/generalTypes";

import "./singleComicPage.scss";

const SingleComicPage = () => {
    const { comicId } = useParams();
    console.log(comicId, typeof comicId);

    const [comic, setComic] = useState<TransformedComic | null>(null);

    const { loading, error, getComic, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicId]);

    // запрос на сервер и получение нового комикса
    const updateComic = () => {
        clearError();
        if (comicId) {
            getComic(comicId).then(onComicLoaded);
        }
    };

    // функция загрузки данных о комиксе в стейт
    const onComicLoaded = (comic: TransformedComic) => {
        setComic(comic);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

interface ViewProps {
    comic: TransformedComic;
}

const View = ({ comic }: ViewProps) => {
    const { title, description, pageCount, thumbnail, language, price } = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language:{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">
                Back to all
            </Link>
        </div>
    );
};

export default SingleComicPage;
