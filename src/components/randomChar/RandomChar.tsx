import { useState, useEffect } from "react"; /* eslint-disable jsx-a11y/anchor-is-valid */

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import { TransformedChar } from "types/generalTypes";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
    const [char, setChar] = useState<TransformedChar | null>(null);
    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 200000);

        return () => {
            clearInterval(timerId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // функция загрузки данных о персонаже в стейт
    const onCharLoaded = (char: TransformedChar) => {
        setChar(char);
    };

    const updateChar = () => {
        clearError();
        // выбираем рандомного персонажа из этого диапазона id
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        // получаем данные из api
        getCharacter(id).then(onCharLoaded);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    );
};

interface ViewProps {
    char: TransformedChar;
}

const View = ({ char }: ViewProps) => {
    const { name, description, thumbnail, homepage, wiki } = char;

    // меняем стиль изображения object-fit, если у персонажа нет изображения
    const imageNotFoundSrc = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

    let imageStyle = thumbnail === imageNotFoundSrc ? "contain" : "fill";
    const img = document.getElementById("randomcharImage");
    img?.style.setProperty("objectFit", imageStyle);

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" id="randomcharImage" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;
