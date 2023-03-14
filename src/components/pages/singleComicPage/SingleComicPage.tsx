import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { useMarvelService } from "hooks/useMarvelService";

import { Spinner } from "components/spinner";
import { ErrorMessage } from "components/errorMessage";

import { ITransformedComic } from "types";

import s from "./singleComicPage.module.scss";

const SingleComicPage = () => {
	const { comicId } = useParams();
	const [comic, setComic] = useState<ITransformedComic | null>(null);

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
	const onComicLoaded = (comic: ITransformedComic) => {
		setComic(comic);
	};

	if (!comic) return null;
	if (error) return <ErrorMessage />;
	if (loading) return <Spinner />;

	const { title, description, pageCount, thumbnail, language, price } = comic;

	return (
		<div className={s.root}>
			<img src={thumbnail} alt={title} className={s.img} />
			<div className={s.box}>
				<h2 className={s.title}>{title}</h2>
				<p className={s.text}>{description}</p>
				<p className={s.text}>{pageCount}</p>
				<p className={s.text}>Language: {language}</p>
				<div className={s.priceText}>{price}</div>
			</div>
			<Link to='/comics' className={s.link}>
				Back to all
			</Link>
		</div>
	);
};

export { SingleComicPage };
