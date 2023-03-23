// import cx from "classnames";

import { Button } from "components/button";

import { IMGNOTFND } from "constant";

import type { ITransformedChar } from "types";

import s from "./randomCharBox.module.scss";

interface IRandomCharBoxProps {
	char: ITransformedChar;
}

const RandomCharBox = ({ char }: IRandomCharBoxProps) => {
	const { thumbnail, name, description, homepage, wiki } = char;

	return (
		<div className={s.root}>
			<img
				src={thumbnail}
				alt='Random character'
				className={s.img}
				style={{ objectFit: thumbnail === IMGNOTFND ? "contain" : "cover" }}
			/>
			<div className={s.box}>
				<p className={s.name}>{name}</p>
				<p className={s.descr}>{description}</p>
				<div className={s.btns}>
					<Button href={homepage} isMain>
						Homepage
					</Button>
					<Button href={wiki} isSecondary>
						Wiki
					</Button>
				</div>
			</div>
		</div>
	);
};

export { RandomCharBox };
