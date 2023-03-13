import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import { imageNotFoundUrl } from "services/imageNotFoundUrl";

import { ITransformedChar } from "types";

import "./charInfo.scss";

interface CharInfoProps {
	charId: number | null;
}

const CharInfo = ({ charId }: CharInfoProps) => {
	const [char, setChar] = useState<ITransformedChar | null>(null);

	const { loading, error, getCharacter, clearError } = useMarvelService();

	useEffect(() => {
		updateChar();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [charId]);

	// запрос на сервер и получение нового персонажа
	const updateChar = () => {
		if (!charId) return;
		clearError();
		getCharacter(charId).then(onCharLoaded);
	};

	// функция загрузки данных о персонаже в стейт
	const onCharLoaded = (char: ITransformedChar) => {
		setChar(char);
	};

	const skeleton = char || loading || error ? null : <Skeleton />;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className='char__info'>
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	);
};

interface ViewProps {
	char: ITransformedChar;
}

const View = ({ char }: ViewProps) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;

	return (
		<>
			<div className='char__basics'>
				<img
					src={thumbnail}
					alt={name}
					style={{ objectFit: thumbnail === imageNotFoundUrl ? "contain" : "cover" }}
				/>
				<div>
					<div className='char__info-name'>{name}</div>
					<div className='char__btns'>
						<a href={homepage} className='button button__main'>
							<div className='inner'>homepage</div>
						</a>
						<a href={wiki} className='button button__secondary'>
							<div className='inner'>Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className='char__descr'>{description}</div>
			<div className='char__comics'>Comics:</div>
			<ul className='char__comics-list'>
				{comics.length === 0 ? (
					<li className='char__comics-item'>No comics for this character</li>
				) : (
					comics.map((comic, i) => {
						// ограничение на вывод кол-ва комиксов
						// eslint-disable-next-line array-callback-return
						if (i > 9) return;

						return (
							<li key={i} className='char__comics-item'>
								{comic.name}
							</li>
						);
					})
				)}
			</ul>
		</>
	);
};

export default CharInfo;
