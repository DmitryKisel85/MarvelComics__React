import { useState, useEffect } from "react"; /* eslint-disable jsx-a11y/anchor-is-valid */
import cx from "classnames";

import { Spinner } from "components/spinner";
import { ErrorMessage } from "components/errorMessage";

import { useMarvelService } from "hooks/useMarvelService";

import { IMGNOTFND } from "constant";

import type { ITransformedChar } from "types";

import mjolnir from "resources/img/mjolnir.png";

import s from "./randomChar.module.scss";

const RandomChar = () => {
	const [char, setChar] = useState<ITransformedChar | null>(null);
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
	const onCharLoaded = (char: ITransformedChar) => {
		setChar(char);
	};

	const updateChar = () => {
		clearError();

		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		getCharacter(id).then(onCharLoaded);
	};

	if (!char) return null;
	if (error) return <ErrorMessage />;
	if (loading) return <Spinner />;

	const { name, description, thumbnail, homepage, wiki } = char;

	return (
		<div className={s.root}>
			<div className={s.randomBlock}>
				<img
					src={thumbnail}
					alt='Random character'
					className={s.img}
					style={{ objectFit: thumbnail === IMGNOTFND ? "contain" : "cover" }}
				/>
				<div className={s.info}>
					<p className={s.name}>{name}</p>
					<p className={s.descr}>{description}</p>
					<div className={s.btns}>
						<a href={homepage} className={cx(s.btn, s.btnMain)} target='_blank' rel='noreferrer'>
							<div className={s.btnInner}>Homepage</div>
						</a>
						<a href={wiki} className={cx(s.btn, s.btnSecondary)} target='_blank' rel='noreferrer'>
							<div className={s.btnInner}>Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className={s.infoBlock}>
				<p className={s.title}>
					Random character for today!
					<br />
					Do you want to get to know him better?
				</p>
				<p className={s.title}>Or choose another one</p>
				<button className={cx(s.btn, s.btnMain)} onClick={updateChar}>
					<div className={s.btnInner}>try it</div>
				</button>
				<img src={mjolnir} alt='mjolnir' className={s.decorImg} />
			</div>
		</div>
	);
};

export { RandomChar };
