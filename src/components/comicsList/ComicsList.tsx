/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";

import cx from "classnames";

import { useMarvelService } from "services/useMarvelService";

import { Spinner } from "components/spinner";
import { ErrorMessage } from "components/errorMessage";
import { ComicsItem } from "components/comicsItem";

import type { ComicsListType } from "types";

import s from "./comicsList.module.scss";

const ComicsList = () => {
	const [comicsList, setComicsList] = useState<ComicsListType | []>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [comicsListEnded, setComicsListEnded] = useState(false);

	const { loading, error, getAllComics } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// загрузка дополнительного списка комиксов по запросу
	const onRequest = (offset: number, initial?: boolean) => {
		initial ? setIsLoading(false) : setIsLoading(true);
		getAllComics(offset).then(onComicsListLoaded);
	};

	// если число оставшихся комиксов в api < 8, то убираем кнопку LOAD MORE
	const onComicsListLoaded = (newComicsList: ComicsListType) => {
		let ended = false;
		if (newComicsList.length < 8) {
			ended = true;
		}
		setComicsList([...comicsList, ...newComicsList]);
		setIsLoading(false);
		setOffset(offset + 8);
		setComicsListEnded(ended);
	};

	if (error) return <ErrorMessage />;
	if (loading && !isLoading) return <Spinner />;

	return (
		<div className={s.root}>
			<ul className={s.list}>
				{comicsList.map((comic) => {
					return <ComicsItem key={comic.id} comic={comic} />;
				})}
			</ul>
			{!comicsListEnded && (
				<button
					disabled={isLoading}
					className={cx(s.btn, s.btnMain, s.btnLong)}
					onClick={() => onRequest(offset)}>
					<div className={s.btnInner}>load more</div>
				</button>
			)}
		</div>
	);
};

export { ComicsList };
