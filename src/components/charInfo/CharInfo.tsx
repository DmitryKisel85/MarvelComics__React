import { useState, useEffect } from "react";
import cx from "classnames";

import { Spinner } from "components/spinner";
import { ErrorMessage } from "components/errorMessage";
import { Skeleton } from "components/skeleton";

import { imageNotFoundUrl } from "services/imageNotFoundUrl";
import { useMarvelService } from "services/useMarvelService";

import type { ITransformedChar } from "types";

import s from "./charInfo.module.scss";

interface CharInfoProps {
	charId: number | null;
}

const CharInfo = ({ charId }: CharInfoProps) => {
	const [char, setChar] = useState<ITransformedChar | null>(null);

	const { loading, error, getCharacter, clearError } = useMarvelService();

	const onCharLoaded = (char: ITransformedChar) => {
		setChar(char);
	};

	useEffect(() => {
		if (!charId) return;
		clearError();
		getCharacter(charId).then(onCharLoaded);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [charId]);

	if (!char) return <Skeleton />;
	if (error) return <ErrorMessage />;
	if (loading) return <Spinner />;

	const { name, description, thumbnail, homepage, wiki, comics } = char;

	return (
		<div className={s.root}>
			<div className={s.container}>
				<img
					src={thumbnail}
					alt={name}
					style={{ objectFit: thumbnail === imageNotFoundUrl ? "contain" : "cover" }}
				/>
				<div>
					<div className={s.head}>{name}</div>
					<div className={s.btns}>
						<a href={homepage} className={cx(s.btn, s.btnMain)} target='_blank' rel='noreferrer'>
							<div className={s.btnInner}>homepage</div>
						</a>
						<a href={wiki} className={cx(s.btn, s.btnSecondary)} target='_blank' rel='noreferrer'>
							<div className={s.btnInner}>Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className={s.text}>{description}</div>
			<p className={s.box}>Comics:</p>
			<ul className={s.list}>
				{comics.length === 0 ? (
					<li className={s.item}>No comics for this character</li>
				) : (
					comics.map(({ name }, i) => {
						// eslint-disable-next-line array-callback-return
						if (i > 9) return;

						return (
							<li key={name} className={s.item}>
								{name}
							</li>
						);
					})
				)}
			</ul>
		</div>
	);
};

export { CharInfo };
